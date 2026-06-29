import * as THREE from 'three';
import { RESOURCE_NODES, type ResourceNodeKind } from '@cozy/shared';
import type { Inventory, Item } from './inventory.js';
import type { ItemDropSystem } from './ItemDropSystem.js';

export class TreeChoppingSystem {
  scene: THREE.Scene;
  camera: THREE.Camera;
  inventory: Inventory;
  itemRegistry: Record<string, Item>;
  // environment is not yet migrated (Ola 5); typed loosely.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  environment: any;
  itemDropSystem: ItemDropSystem;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  treeHealth: Map<THREE.Object3D, number>;
  maxTreeHealth: number;
  woodPerHit: number;
  appleTreeDrops: Map<THREE.Object3D, number>;
  maxApplesPerTree: number;
  choppingRange: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any;
  hitEffects: { particles: THREE.Group; startTime: number }[];
  mouseIndicator: HTMLElement | null;
  hoveredTree: THREE.Object3D | null;
  /**
   * In multiplayer, Game sets this to send a harvest_node command (one per axe swing).
   * When present, harvesting is server-authoritative: emit the hit (with the node's kind
   * and world position) and let the confirmed node_damaged/node_depleted events drive the
   * tree's reaction and removal, while the server spawns the yielded wood/apples as ground
   * drops at that position. Null = local (single-player) mode.
   */
  requestHarvest: ((networkId: number, kind: ResourceNodeKind, position: THREE.Vector3) => void) | null = null;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    inventory: Inventory,
    itemRegistry: Record<string, Item>,
    environment: any,
    itemDropSystem: ItemDropSystem
  ) {
    this.scene = scene;
    this.camera = camera;
    this.inventory = inventory;
    this.itemRegistry = itemRegistry;
    this.environment = environment;
    this.itemDropSystem = itemDropSystem;
    
    // Raycaster for mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Tree health tracking. The per-tree economy (hits, wood-per-hit, felling bonus)
    // is sourced from the shared resource-node registry so single-player and the
    // server's network-mode grant cannot drift apart.
    this.treeHealth = new Map(); // tree mesh -> health
    this.maxTreeHealth = RESOURCE_NODES.tree.maxHealth; // Trees take 5 hits to chop
    this.woodPerHit = RESOURCE_NODES.tree.yieldPerHit; // Wood given per hit
    
    // Apple tree tracking - each apple tree can only drop 3 apples total
    this.appleTreeDrops = new Map(); // tree mesh -> number of apples already dropped
    this.maxApplesPerTree = 3; // Maximum apples per apple tree
    
    // Proximity settings
    this.choppingRange = 4.0; // Maximum distance to chop trees
    this.player = null; // Reference to player object
    
    // Visual feedback
    this.hitEffects = [];
    this.mouseIndicator = null; // Text indicator that follows mouse
    this.hoveredTree = null; // Currently hovered tree
    
    // Create mouse indicator element
    this.createMouseIndicator();
    
    // Bind mouse move handler
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mousemove', this.handleMouseMove);
    
    console.log('TreeChoppingSystem initialized');
  }
  
  setPlayer(player: any): void {
    this.player = player;
    console.log('Player reference set for tree chopping system');
  }
  
  handleClick(event: MouseEvent): void {
    // Only process clicks if player is holding an axe
    const selectedItem = this.inventory.getSelectedItem();
    if (!selectedItem || selectedItem.item.id !== 'axe') {
      return;
    }
    
    // Check if player reference is available
    if (!this.player || !this.player.mesh) {
      console.warn('Player reference not available for tree chopping');
      return;
    }
    
    // Check if player can perform axe hit (not already animating)
    if (!this.player.canPerformAxeHit()) {
      console.log('Cannot chop tree - axe animation in progress');
      return;
    }
    
    // Calculate mouse position in normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Get all tree meshes from the environment
    const treeMeshes = this.getAllTreeMeshes();
    
    // Check for intersections
    const intersects = this.raycaster.intersectObjects(treeMeshes, true);
    
    if (intersects.length > 0) {
      const hitObject = intersects[0].object;
      const treeMesh = this.findTreeRoot(hitObject);
      
      if (treeMesh) {
        // Check if tree is within chopping range
        const playerPosition = this.player.mesh.position;
        const treePosition = treeMesh.position;
        const distance = playerPosition.distanceTo(treePosition);
        
        if (distance <= this.choppingRange) {
          // Play axe hit animation first
          const animationStarted = this.player.playAxeHitAnimation();
          if (animationStarted) {
            // Delay tree chopping to sync with animation peak
            setTimeout(() => {
              this.chopTree(treeMesh, intersects[0].point);
            }, 300); // 300ms delay to sync with animation timing
          }
        } else {
          console.log(`Tree is too far away! Distance: ${distance.toFixed(2)}, Max range: ${this.choppingRange}`);
          // Could add UI feedback here for "too far" message
        }
      }
    }
  }
  
  getAllTreeMeshes() {
    const treeMeshes: THREE.Object3D[] = [];

    // Look for trees in the scene
    this.scene.traverse((child) => {
      // Skip tree colliders completely - they should not be clickable
      if (child.name && child.name.includes('treeCollider')) {
        return;
      }
      
      // Check if this is a tree by looking at its parent structure or name
      if (this.isTreeMesh(child)) {
        treeMeshes.push(child);
      }
    });
    
    return treeMeshes;
  }
  
  isTreeMesh(mesh: any): boolean {
    if (!mesh.isMesh) return false;
    
    // Explicitly exclude tree colliders - they should never be considered tree meshes for clicking
    if (mesh.name && mesh.name.includes('treeCollider')) {
      return false;
    }
    
    // Check if tree is being destroyed (falling animation)
    if (mesh.userData && mesh.userData.isBeingDestroyed) {
      return false;
    }
    
    // Also check parent objects for destruction state
    let current = mesh.parent;
    while (current && current !== this.scene) {
      if (current.userData && current.userData.isBeingDestroyed) {
        return false;
      }
      current = current.parent;
    }
    
    // Check if the mesh or its ancestors have tree-like properties
    let currentNode = mesh;
    while (currentNode) {
      // Skip if this is a collider
      if (currentNode.name && currentNode.name.includes('treeCollider')) {
        return false;
      }
      
      // Check for tree-related names or properties
      if (currentNode.name && (
        currentNode.name.includes('tree') || 
        currentNode.name.includes('Tree') ||
        currentNode.name.includes('apple') ||
        currentNode.name.includes('Apple')
      )) {
        return true;
      }
      
      // Check if parent is a tree group
      if (currentNode.parent && currentNode.parent.name && (
        currentNode.parent.name.includes('tree') ||
        currentNode.parent.name.includes('Tree') ||
        currentNode.parent.name.includes('apple') ||
        currentNode.parent.name.includes('Apple')
      )) {
        return true;
      }
      
      currentNode = currentNode.parent;
      
      // Stop at scene level
      if (currentNode === this.scene) break;
    }
    
    return false;
  }
  
  findTreeRoot(hitMesh: any): any {
    // Find the root tree object (usually a Group containing the tree model)
    let current = hitMesh;
    let treeRoot = null;
    
    while (current && current !== this.scene) {
      // Look for a tree group or the tree mesh itself
      if (current.type === 'Group' || (current.isMesh && this.isTreeMesh(current))) {
        treeRoot = current;
      }
      current = current.parent;
    }
    
    return treeRoot || hitMesh;
  }
  
  chopTree(treeMesh: any, hitPoint: THREE.Vector3): void {
    console.log('🪓 CHOP TREE DEBUG - Starting chopTree method');
    console.log('Tree being chopped:', treeMesh.name || 'unnamed');
    console.log('Tree position:', treeMesh.position);
    console.log('Tree type:', treeMesh.type);
    
    // Check if tree is already being destroyed (falling animation)
    if (treeMesh.userData.isBeingDestroyed) {
      console.log('❌ Tree is already being destroyed, canceling chop');
      return; // Don't allow chopping trees that are falling
    }

    // Multiplayer: harvesting is server-authoritative and multi-hit. Emit ONE
    // harvest_node command per swing and return; the server tracks the tree's health
    // and the confirmed node_damaged/node_depleted events drive its reaction (shake +
    // darkening) and removal, while it spawns the yielded wood (and apples, for an apple
    // tree) as ground drops at the tree — so every client sees the same thing. We do NOT
    // touch local health, drop items, or mark the tree destroyed here: it stays choppable
    // until the server confirms depletion. The player's axe-swing animation already fired
    // in handleClick, so the swing still feels immediate.
    if (this.requestHarvest) {
      const networkId = treeMesh.userData?.networkId;
      if (typeof networkId === 'number') {
        const kind: ResourceNodeKind = this.isAppleTree(treeMesh) ? 'apple_tree' : 'tree';
        this.requestHarvest(networkId, kind, treeMesh.position);
        return;
      }
    }

    // Initialize tree health if not tracked yet
    if (!this.treeHealth.has(treeMesh)) {
      this.treeHealth.set(treeMesh, this.maxTreeHealth);
    }
    
    // Reduce tree health
    let currentHealth = this.treeHealth.get(treeMesh)!;
    currentHealth--;
    this.treeHealth.set(treeMesh, currentHealth);
    
    console.log(`Tree health: ${currentHealth}/${this.maxTreeHealth}`);
    
    // Check if this is an apple tree and drop apples if it has any left
    console.log('🍎 Checking if tree is an apple tree...');
    const isApple = this.isAppleTree(treeMesh);
    console.log('Apple tree detection result:', isApple);
    
    if (isApple) {
      // Check how many apples this tree has already dropped
      const applesDropped = this.appleTreeDrops.get(treeMesh) || 0;
      const applesRemaining = this.maxApplesPerTree - applesDropped;
      
      console.log(`🍎 APPLE TREE - Apples dropped: ${applesDropped}/${this.maxApplesPerTree}, Remaining: ${applesRemaining}`);
      
      if (applesRemaining > 0) {
        // Drop 1-2 apples, but not more than remaining
        const appleCount = Math.min(applesRemaining, Math.ceil(Math.random() * 2));
        console.log(`🍎 DROPPING ${appleCount} apples from apple tree`);
        
        // Update the count of apples dropped from this tree
        this.appleTreeDrops.set(treeMesh, applesDropped + appleCount);
        
        this.dropAppleItems(hitPoint, appleCount);
      } else {
        console.log('❌ Apple tree has no more apples to drop');
      }
    } else {
      console.log('❌ Not an apple tree, no apples will drop');
    }
    
    // Drop wood items on ground instead of adding to inventory
    const woodItem = this.itemRegistry['wood'];
    if (woodItem && this.itemDropSystem) {
      this.dropWoodItems(hitPoint, this.woodPerHit);
      console.log(`Chopped tree! Dropped ${this.woodPerHit} wood items. Tree health: ${currentHealth}/${this.maxTreeHealth}`);
    }
    
    // Create hit effect
    this.createHitEffect(hitPoint);
    
    // Apply tree hit animation
    this.playTreeHitAnimation(treeMesh);
    
    // Apply tree damage visual effect
    this.applyTreeDamageEffect(treeMesh, currentHealth);
    
    // Check if tree should be destroyed
    if (currentHealth <= 0) {
      this.destroyTree(treeMesh);
    }
  }
  
  createHitEffect(position: THREE.Vector3): void {
    // Create particle effect at hit location
    const particleCount = 10;
    const particles = new THREE.Group();
    
    for (let i = 0; i < particleCount; i++) {
      // Create wood chip particles
      const chipGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
      const chipMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x8B4513 // Brown color for wood chips
      });
      const chip = new THREE.Mesh(chipGeometry, chipMaterial);
      
      // Random position around hit point
      chip.position.copy(position);
      chip.position.x += (Math.random() - 0.5) * 0.5;
      chip.position.y += (Math.random() - 0.5) * 0.5;
      chip.position.z += (Math.random() - 0.5) * 0.5;
      
      // Random rotation
      chip.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Add physics-like motion
      chip.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 2
      );
      
      chip.userData.life = 1.0; // Particle life
      
      particles.add(chip);
    }
    
    this.scene.add(particles);
    this.hitEffects.push({
      particles: particles,
      startTime: Date.now()
    });
    
    // Clean up old effects
    this.cleanupOldEffects();
  }
  
  applyTreeDamageEffect(treeMesh: any, health: number): void {
    // Only apply damage effects if tree has actually taken damage
    if (health >= this.maxTreeHealth) {
      return; // Tree is at full health, no damage effects needed
    }
    
    // Apply visual damage to tree based on health
    const damageRatio = 1 - (health / this.maxTreeHealth);
    
    treeMesh.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // Darken the tree as it takes damage
        const originalColor = child.userData.originalColor || child.material.color.clone();
        if (!child.userData.originalColor) {
          child.userData.originalColor = originalColor.clone();
        }
        
        // Interpolate towards darker brown
        const damagedColor = originalColor.clone().lerp(new THREE.Color(0x4A3A2A), damageRatio * 0.5);
        child.material.color.copy(damagedColor);
        
        // Add slight transparency for heavily damaged trees (only when health is very low)
        if (damageRatio > 0.6) {
          child.material.transparent = true;
          child.material.opacity = 1 - (damageRatio - 0.6) * 0.5;
        } else {
          // Reset transparency for lightly damaged trees
          child.material.transparent = false;
          child.material.opacity = 1.0;
        }
      }
    });
  }
  
  destroyTree(treeMesh: any): void {
    console.log('Tree destroyed!');

    // Mark tree as being destroyed to prevent further chopping
    treeMesh.userData.isBeingDestroyed = true;

    // Record the chop so it persists: the saved game stores these ids and excludes
    // these trees when the world regenerates from its seed on reload.
    const treeId = treeMesh.userData.treeId;
    if (this.environment && treeId) {
      this.environment.choppedTreeIds?.add(treeId);
      if (Array.isArray(this.environment.loadedTrees)) {
        this.environment.loadedTrees = this.environment.loadedTrees.filter(
          (t: any) => t.mesh !== treeMesh
        );
      }
    }
    
    // Remove tree health tracking
    this.treeHealth.delete(treeMesh);
    
    // Remove apple tracking for this tree
    this.appleTreeDrops.delete(treeMesh);
    
    // Drop bonus wood items for fully chopping the tree
    const bonus = RESOURCE_NODES.tree.yieldBonusOnDeplete;
    const woodItem = this.itemRegistry['wood'];
    if (woodItem && this.itemDropSystem) {
      this.dropWoodItems(treeMesh.position, bonus); // Bonus wood for fully chopping
      console.log(`Tree fully chopped! Dropped ${bonus} bonus wood items!`);
    }
    
    // Play tree break animation before removing
    this.playTreeBreakAnimation(treeMesh, () => {
      // Create destruction effect
      this.createDestructionEffect(treeMesh.position);
      
      // Remove tree from scene after animation
      this.scene.remove(treeMesh);
    });
    
    // Remove associated tree collider immediately
    this.removeTreeCollider(treeMesh);
  }

  /**
   * Apply a server-confirmed hit to a base tree by networkId (multiplayer). Sets the
   * persistent damage visual (a pure function of remaining health, so it stays correct
   * for a late-joiner replaying the world snapshot) and, only for a live event, plays
   * the transient hit shake. The tree is removed separately, on node_depleted.
   */
  applyNetworkNodeDamage(networkId: number, health: number, animate: boolean): void {
    const mesh = this.environment?.getTreeMeshByNetworkId?.(networkId);
    if (!mesh) return;
    this.applyTreeDamageEffect(mesh, health);
    if (animate) this.playTreeHitAnimation(mesh);
  }

  removeTreeCollider(treeMesh: any): void {
    // Find and remove the associated tree collider
    const collidersToRemove: THREE.Object3D[] = [];
    
    this.scene.traverse((child) => {
      if (child.name && child.name.includes('treeCollider') && 
          child.userData.associatedTree === treeMesh) {
        collidersToRemove.push(child);
      }
    });
    
    collidersToRemove.forEach(collider => {
      this.scene.remove(collider);
      // Also remove from collision system
      if (this.environment && this.environment.collisionSystem) {
        this.environment.collisionSystem.removeCollider(collider);
      }
      console.log('Removed tree collider:', collider.name);
    });
  }
  
  playTreeHitAnimation(treeMesh: any): void {
    // Store original rotation for restoration
    if (!treeMesh.userData.originalRotation) {
      treeMesh.userData.originalRotation = treeMesh.rotation.clone();
    }
    
    // Cancel any existing hit animation
    if (treeMesh.userData.hitAnimationId) {
      cancelAnimationFrame(treeMesh.userData.hitAnimationId);
    }
    
    // Hit animation parameters
    const hitIntensity = 0.1; // Shake intensity
    const hitDuration = 300; // Animation duration in milliseconds
    const startTime = Date.now();
    
    const animateHit = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / hitDuration;
      
      if (progress < 1) {
        // Create shake effect with decreasing intensity
        const currentIntensity = hitIntensity * (1 - progress);
        const shakeX = (Math.random() - 0.5) * currentIntensity;
        const shakeZ = (Math.random() - 0.5) * currentIntensity;
        
        // Apply shake to original rotation
        treeMesh.rotation.x = treeMesh.userData.originalRotation.x + shakeX;
        treeMesh.rotation.z = treeMesh.userData.originalRotation.z + shakeZ;
        
        treeMesh.userData.hitAnimationId = requestAnimationFrame(animateHit);
      } else {
        // Animation complete - restore original rotation
        treeMesh.rotation.copy(treeMesh.userData.originalRotation);
        treeMesh.userData.hitAnimationId = null;
      }
    };
    
    animateHit();
  }
  
  playTreeBreakAnimation(treeMesh: any, onComplete: () => void): void {
    // Store original values
    if (!treeMesh.userData.originalScale) {
      treeMesh.userData.originalScale = treeMesh.scale.clone();
    }
    if (!treeMesh.userData.originalPosition) {
      treeMesh.userData.originalPosition = treeMesh.position.clone();
    }
    
    // Cancel any existing animations
    if (treeMesh.userData.breakAnimationId) {
      cancelAnimationFrame(treeMesh.userData.breakAnimationId);
    }
    
    // Break animation parameters
    const fallDuration = 800; // Animation duration in milliseconds
    const startTime = Date.now();
    
    // Random fall direction
    const fallDirection = Math.random() * Math.PI * 2;
    const fallIntensity = 1.2;
    
    const animateBreak = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / fallDuration, 1);
      
      if (progress < 1) {
        // Easing function for natural fall
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        // Apply falling rotation
        treeMesh.rotation.z = treeMesh.userData.originalRotation.z + (easeOutQuart * fallIntensity * Math.cos(fallDirection));
        treeMesh.rotation.x = treeMesh.userData.originalRotation.x + (easeOutQuart * fallIntensity * Math.sin(fallDirection));
        
        // Apply slight downward movement
        treeMesh.position.y = treeMesh.userData.originalPosition.y - (easeOutQuart * 0.5);
        
        // Apply scale shrinking effect
        const scaleMultiplier = 1 - (progress * 0.2);
        treeMesh.scale.copy(treeMesh.userData.originalScale).multiplyScalar(scaleMultiplier);
        
        treeMesh.userData.breakAnimationId = requestAnimationFrame(animateBreak);
      } else {
        // Animation complete
        treeMesh.userData.breakAnimationId = null;
        if (onComplete) {
          onComplete();
        }
      }
    };
    
    animateBreak();
  }
  
  createDestructionEffect(position: THREE.Vector3): void {
    // Create larger particle effect for tree destruction
    const particleCount = 25;
    const particles = new THREE.Group();
    
    for (let i = 0; i < particleCount; i++) {
      // Mix of wood chips and leaves
      const isLeaf = Math.random() < 0.4;
      
      let geometry, material;
      if (isLeaf) {
        geometry = new THREE.PlaneGeometry(0.1, 0.1);
        material = new THREE.MeshLambertMaterial({ 
          color: 0x228B22, // Green for leaves
          transparent: true,
          opacity: 0.8
        });
      } else {
        geometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
        material = new THREE.MeshLambertMaterial({ 
          color: 0x8B4513 // Brown for wood
        });
      }
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Position around tree base
      particle.position.copy(position);
      particle.position.x += (Math.random() - 0.5) * 3;
      particle.position.y += Math.random() * 2;
      particle.position.z += (Math.random() - 0.5) * 3;
      
      // Random rotation
      particle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Add physics-like motion
      particle.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 3 + 2,
        (Math.random() - 0.5) * 4
      );
      
      particle.userData.life = 2.0; // Longer life for destruction effect
      
      particles.add(particle);
    }
    
    this.scene.add(particles);
    this.hitEffects.push({
      particles: particles,
      startTime: Date.now()
    });
  }
  
  cleanupOldEffects() {
    const currentTime = Date.now();
    
    for (let i = this.hitEffects.length - 1; i >= 0; i--) {
      const effect = this.hitEffects[i];
      const age = (currentTime - effect.startTime) / 1000; // Age in seconds
      
      if (age > 3) { // Remove effects older than 3 seconds
        this.scene.remove(effect.particles);
        this.hitEffects.splice(i, 1);
      } else {
        // Update particle positions
        effect.particles.children.forEach((particle: any) => {
          if (particle.userData.velocity) {
            particle.position.add(particle.userData.velocity.clone().multiplyScalar(0.016)); // ~60fps
            particle.userData.velocity.y -= 0.05; // Gravity
            particle.userData.life -= 0.016;
            
            // Fade out particle
            if (particle.material.transparent) {
              particle.material.opacity = Math.max(0, particle.userData.life);
            }
          }
        });
      }
    }
  }
  
  update() {
    // Update particle effects
    this.cleanupOldEffects();
    
    // Update tree highlighting based on proximity
    this.updateTreeHighlighting();
  }
  
  updateTreeHighlighting() {
    // Mouse indicator system handles visual feedback now
    // This method can be simplified or removed if no other highlighting is needed
  }
  
  createMouseIndicator() {
    this.mouseIndicator = document.createElement('div');
    this.mouseIndicator!.style.cssText = `
      position: absolute;
      color: white;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
      display: none;
    `;
    this.mouseIndicator.textContent = 'Click to chop tree';
    document.body.appendChild(this.mouseIndicator);
  }
  
  handleMouseMove(event: MouseEvent): void {
    const selectedItem = this.inventory.getSelectedItem();
    const hasAxe = selectedItem && selectedItem.item.id === 'axe';
    
    if (!hasAxe || !this.player || !this.player.mesh) {
      this.hideMouseIndicator();
      return;
    }
    
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const treeMeshes = this.getAllTreeMeshes();
    const intersects = this.raycaster.intersectObjects(treeMeshes, true);
    
    if (intersects.length > 0) {
      const treeMesh = this.findTreeRoot(intersects[0].object);
      if (treeMesh) {
        const distance = this.player.mesh.position.distanceTo(treeMesh.position);
        if (distance <= this.choppingRange) {
          this.showMouseIndicator(event.clientX, event.clientY);
          this.hoveredTree = treeMesh;
        } else {
          this.hideMouseIndicator();
          this.hoveredTree = null;
        }
      } else {
        this.hideMouseIndicator();
        this.hoveredTree = null;
      }
    } else {
      this.hideMouseIndicator();
      this.hoveredTree = null;
    }
  }
  
  showMouseIndicator(x: number, y: number): void {
    this.mouseIndicator!.style.display = 'block';
    this.mouseIndicator!.style.left = x + 10 + 'px';
    this.mouseIndicator!.style.top = y - 20 + 'px';
  }
  
  hideMouseIndicator() {
    this.mouseIndicator!.style.display = 'none';
  }
  
  destroy() {
    // Clean up all effects
    this.hitEffects.forEach(effect => {
      this.scene.remove(effect.particles);
    });
    this.hitEffects = [];
    this.treeHealth.clear();
    this.appleTreeDrops.clear();
    
    // Clean up mouse indicator
    if (this.mouseIndicator) {
      document.body.removeChild(this.mouseIndicator);
      this.mouseIndicator = null;
    }
    
    // Remove mouse move event listener
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    // Cancel any ongoing animations
    this.scene.traverse((child) => {
      if (child.userData && child.userData.hitAnimationId) {
        cancelAnimationFrame(child.userData.hitAnimationId);
      }
      if (child.userData && child.userData.breakAnimationId) {
        cancelAnimationFrame(child.userData.breakAnimationId);
      }
    });
    
    console.log('TreeChoppingSystem destroyed');
  }
  
  isAppleTree(treeMesh: any): boolean {
    // Check the entire tree hierarchy for apple tree indicators
    let isApple = false;
    
    // First check if the tree mesh itself or its parents contain "apple"
    let current = treeMesh;
    while (current && current !== this.scene) {
      if (current.name && current.name.toLowerCase().includes('apple')) {
        isApple = true;
        break;
      }
      current = current.parent;
    }
    
    // Also traverse all children to check for apple tree components
    if (!isApple) {
      treeMesh.traverse((child: any) => {
        if (child.name && child.name.toLowerCase().includes('apple')) {
          isApple = true;
        }
      });
    }
    
    // Enhanced detection: Check the loaded tree assets from environment.js
    // The apple tree assets are: env_apple_tree.glb, env_apple_tree2.glb, env_apple_tree3.glb
    if (!isApple && this.environment && this.environment.loadedTrees) {
      // Find this tree in the loaded trees array
      const treeData = this.environment.loadedTrees.find((treeInfo: any) => treeInfo.mesh === treeMesh);
      if (treeData) {
        // Check the tree type index against known apple tree types
        // From environment.js: apple trees are at indices 3, 4, and 8 (env_apple_tree variants)
        const appleTreeIndices = [3, 4, 8]; // Positions of apple tree assets in treeAssets array
        if (appleTreeIndices.includes(treeData.typeIndex)) {
          isApple = true;
          console.log(`🍎 Found apple tree via type index: ${treeData.typeIndex}`);
        }
      }
    }
    
    // Alternative method: Check environment loaded trees by examining the tree position
    if (!isApple && this.environment && this.environment.loadedTrees) {
      // Find trees at same position as this mesh
      const treePosition = treeMesh.position;
      const matchingTree = this.environment.loadedTrees.find((treeInfo: any) => {
        const distance = treeInfo.mesh.position.distanceTo(treePosition);
        return distance < 0.1; // Very close position match
      });
      
      if (matchingTree) {
        const appleTreeIndices = [3, 4, 8]; // Apple tree indices from environment.js
        if (appleTreeIndices.includes(matchingTree.typeIndex)) {
          isApple = true;
          console.log(`🍎 Found apple tree via position matching: type ${matchingTree.typeIndex}`);
        }
      }
    }
    
    // Debug logging to help identify what makes a tree an apple tree
    console.log('🌳 Tree Detection Debug:');
    console.log('Tree name:', treeMesh.name || 'unnamed');
    console.log('Tree position:', treeMesh.position);
    console.log('Is apple tree:', isApple);
    
    if (isApple) {
      console.log('🍎 APPLE TREE CONFIRMED!');
    }
    
    return isApple;
  }
  
  dropAppleItems(position: THREE.Vector3, quantity: number): void {
    const appleItem = this.itemRegistry['apple'];
    if (!appleItem || !this.itemDropSystem) return;
    
    // Drop each apple item with physics-based ejection
    for (let i = 0; i < quantity; i++) {
      // Calculate random ejection direction and force
      const angle = Math.random() * Math.PI * 2;
      const force = 2 + Math.random() * 3; // Random force between 2-5
      const upwardForce = 3 + Math.random() * 2; // Random upward force between 3-5
      
      // Calculate initial velocity vector
      const velocity = new THREE.Vector3(
        Math.cos(angle) * force,
        upwardForce,
        Math.sin(angle) * force
      );
      
      // Start position slightly above the hit point
      const startPosition = new THREE.Vector3(
        position.x,
        position.y + 1, // Start higher for better pop effect
        position.z
      );
      
      // Add slight delay between drops for natural effect
      setTimeout(() => {
        this.itemDropSystem.dropItemWithPhysics(appleItem, startPosition, velocity);
      }, i * 75); // 75ms delay between each apple drop
    }
    
    console.log(`Dropped ${quantity} apples from apple tree`);
  }
  
  dropWoodItems(position: THREE.Vector3, quantity: number): void {
    const woodItem = this.itemRegistry['wood'];
    if (!woodItem || !this.itemDropSystem) return;
    
    // Drop each wood item with physics-based ejection
    for (let i = 0; i < quantity; i++) {
      // Calculate random ejection direction and force
      const angle = Math.random() * Math.PI * 2;
      const force = 2 + Math.random() * 3; // Random force between 2-5
      const upwardForce = 3 + Math.random() * 2; // Random upward force between 3-5
      
      // Calculate initial velocity vector
      const velocity = new THREE.Vector3(
        Math.cos(angle) * force,
        upwardForce,
        Math.sin(angle) * force
      );
      
      // Start position slightly above the hit point
      const startPosition = new THREE.Vector3(
        position.x,
        position.y + 1, // Start higher for better pop effect
        position.z
      );
      
      // Add slight delay between drops for natural effect
      setTimeout(() => {
        this.itemDropSystem.dropItemWithPhysics(woodItem, startPosition, velocity);
      }, i * 50); // 50ms delay between each drop
    }
  }
}