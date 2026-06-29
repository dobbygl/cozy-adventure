import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CompanionAnimator } from './companion/CompanionAnimator.js';
import { CompanionPhysics } from './companion/CompanionPhysics.js';
import { CompanionLocomotion } from './companion/CompanionLocomotion.js';
import { CarryVisual } from './companion/fetch/CarryVisual.js';
import { DeliveryService } from './companion/fetch/DeliveryService.js';
import { findNearestDroppedItem, hasItemBeenDroppedLongEnough } from './companion/fetch/fetchQueries.js';
import type { DroppedItemsPort } from './companion/ports.js';
import { companionUiPort, droppedItemsPort, inventoryPort } from './companion/gameInstancePorts.js';

export class DogCompanion {
  scene: THREE.Scene;
  player: any;
  // Assigned in load() (or its fallback); always present by the time AI methods run.
  mesh!: THREE.Object3D;
  animator!: CompanionAnimator;
  physics: CompanionPhysics;
  locomotion: CompanionLocomotion;
  followDistance: number;
  minFollowDistance: number;
  wanderRadius: number;
  speed: number;
  state: string;
  target: any;
  wanderTarget: THREE.Vector3 | null;
  wanderTimer: number;
  wanderCooldown: number;
  barkTimer: number;
  barkCooldown: number;
  fetchedItems: any[];
  fetchTargets: any[];
  maxCarryCapacity: number;
  returnToPlayer: boolean;
  // The items the dog visibly carries in its mouth (assigned in load()).
  carry!: CarryVisual;
  delivery: DeliveryService;
  droppedItems: DroppedItemsPort;
  loader: GLTFLoader;

  constructor(scene: THREE.Scene, player: any) {
    this.scene = scene;
    this.player = player;

    // AI behavior properties
    this.followDistance = 3;
    this.minFollowDistance = 1.5;
    this.wanderRadius = 5;
    this.speed = 5;
    this.locomotion = new CompanionLocomotion({ rotationSpeed: 8 });

    // All access to the rest of the game goes through ports, resolved lazily via
    // this getter so each frame sees the live systems (the collision system,
    // inventory, etc. may be created after the dog and swapped at runtime — the
    // late-binding the old per-frame window.gameInstance lookups relied on).
    // TODO(phase 7): inject the game systems instead of reading the global here.
    const getGame = () => (window as any).gameInstance;
    this.physics = new CompanionPhysics(() => getGame()?.collisionSystem ?? null);
    this.delivery = new DeliveryService(inventoryPort(getGame), companionUiPort(getGame));
    this.droppedItems = droppedItemsPort(getGame, scene);

    // Behavior states
    this.state = 'following'; // 'following', 'wandering', 'fetching', 'idle'
    this.target = null;
    this.wanderTarget = null;
    this.wanderTimer = 0;
    this.wanderCooldown = 0;
    this.barkTimer = 0;
    this.barkCooldown = 0;
    
    // Item fetching - Enhanced for multiple items
    this.fetchedItems = [];
    this.fetchTargets = []; // Array to hold multiple fetch targets
    this.maxCarryCapacity = 15; // Dog can carry up to 15 items at once
    this.returnToPlayer = false;

    this.loader = new GLTFLoader();
  }

  async load() {
    try {
      const gltf = await this.loader.loadAsync('assets/dog_001.glb');
      
      this.mesh = gltf.scene;
      this.mesh.scale.setScalar(2.0);
      this.mesh.position.set(0, 0, 0);
      
      // Enable shadows
      this.mesh.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Set up animations (inert if the model ships none)
      this.animator = new CompanionAnimator(this.mesh, gltf.animations ?? []);
      this.animator.playDefault();

      this.scene.add(this.mesh);

      // Container for items the dog carries in its mouth
      this.carry = new CarryVisual(this.mesh);

      console.log('Dog companion loaded successfully');
      
      return this.mesh;
    } catch (error) {
      console.error('Failed to load dog companion:', error);
      // Create a simple box as fallback
      const geometry = new THREE.BoxGeometry(0.5, 0.3, 0.8);
      const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(0, 0.15, 0);
      this.scene.add(this.mesh);

      // Fallback mesh has no clips: an inert animator keeps later play()/update() safe.
      this.animator = new CompanionAnimator(this.mesh);

      // Carry container for the fallback mesh too
      this.carry = new CarryVisual(this.mesh);

      return this.mesh;
    }
  }

  update(deltaTime: number, droppedItems: any[] = []): void {
    if (!this.mesh || !this.player?.mesh) return;
    
    // Update animations
    this.animator.update(deltaTime);
    
    // Apply gravity and ground collision
    this.physics.update(this.mesh, deltaTime);
    
    // Update timers
    this.wanderTimer -= deltaTime;
    this.wanderCooldown -= deltaTime;
    this.barkTimer -= deltaTime;
    this.barkCooldown -= deltaTime;
    
    const playerPosition = this.player.mesh.position.clone();
    const dogPosition = this.mesh.position.clone();
    const distanceToPlayer = dogPosition.distanceTo(playerPosition);
    
    // ALWAYS check for items to fetch - Enhanced for multiple items with REALLY FAR detection
    // Only pick up items that have been on the ground for at least 15 seconds
    if (droppedItems.length > 0 && this.fetchedItems.length < this.maxCarryCapacity) {
      const nearestItem = findNearestDroppedItem(droppedItems, dogPosition);
      if (nearestItem && this.validateItemExists(nearestItem, droppedItems) &&
          dogPosition.distanceTo(nearestItem.position) < 150 && !this.isAlreadyTargeted(nearestItem) &&
          hasItemBeenDroppedLongEnough(nearestItem, Date.now())) {
        
        // If not already fetching, start fetching
        if (this.state !== 'fetching') {
          this.startFetching(nearestItem);
        } else {
          // If already fetching, add to targets
          this.addFetchTarget(nearestItem);
        }
      }
    }
    
    // Additional check: Continue scanning for more items if dog isn't at capacity and isn't returning
    if (this.state === 'fetching' && !this.returnToPlayer && this.fetchedItems.length < this.maxCarryCapacity) {
      const additionalItem = this.findNextFetchTarget(droppedItems, dogPosition);
      if (additionalItem && this.validateItemExists(additionalItem, droppedItems) &&
          dogPosition.distanceTo(additionalItem.position) < 150 && hasItemBeenDroppedLongEnough(additionalItem, Date.now())) {
        this.addFetchTarget(additionalItem);
      }
    }
    
    // State machine
    switch (this.state) {
      case 'following':
        this.updateFollowing(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
      case 'wandering':
        this.updateWandering(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
      case 'fetching':
        this.updateFetching(deltaTime, playerPosition, dogPosition, droppedItems);
        break;
      case 'idle':
        this.updateIdle(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
    }
    
    // Random barking
    if (this.barkCooldown <= 0 && Math.random() < 0.001) {
      this.bark();
      this.barkCooldown = Math.random() * 10 + 5; // 5-15 seconds
    }
  }
  updateFollowing(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    if (distanceToPlayer > this.followDistance) {
      // Move towards player
      this.locomotion.moveToward(this.mesh, playerPosition, this.speed, deltaTime);
      this.animator.playWalk();

    } else if (distanceToPlayer < this.minFollowDistance) {
      // Too close, maybe wander or sit
      if (Math.random() < 0.1 && this.wanderCooldown <= 0) {
        this.startWandering();
      } else {
        this.state = 'idle';
        this.animator.playIdle();
      }
    } else {
      // Within follow range but not too close - idle
      this.animator.playIdle();
    }
  }

  updateWandering(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    // If too far from player, return to following
    if (distanceToPlayer > this.wanderRadius) {
      this.state = 'following';
      return;
    }
    
    // Set wander target if needed
    if (!this.wanderTarget || this.wanderTimer <= 0) {
      this.setRandomWanderTarget(playerPosition);
      this.wanderTimer = Math.random() * 3 + 2; // 2-5 seconds
    }
    
    // Move towards wander target
    const distanceToTarget = dogPosition.distanceTo(this.wanderTarget!);
    if (distanceToTarget > 0.5) {
      // Wander at half speed
      this.locomotion.moveToward(this.mesh, this.wanderTarget!, this.speed * 0.5, deltaTime);
      this.animator.playWalk();
    } else {
      // Reached target, maybe go back to following
      this.animator.playIdle();
      if (Math.random() < 0.3) {
        this.state = 'following';
      } else {
        this.setRandomWanderTarget(playerPosition);
      }
    }
  }

  updateFetching(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    droppedItems: any[]
  ): void {
    // Clean up fetch targets that no longer exist
    this.fetchTargets = this.fetchTargets.filter(target => this.validateItemExists(target, droppedItems));
    
    if (this.fetchTargets.length === 0 && this.fetchedItems.length === 0) {
      // No items to fetch or deliver, return to following
      console.log('🚫 No valid items to fetch or deliver - returning to following state');
      this.state = 'following';
      this.returnToPlayer = false;
      return;
    }
    
    if (!this.returnToPlayer && this.fetchTargets.length > 0) {
      // Moving to fetch the next item
      const currentTarget = this.fetchTargets[0];
      
      // Double-check that current target still exists before processing
      if (!this.validateItemExists(currentTarget, droppedItems)) {
        console.log('🚫 Current fetch target no longer exists - removing from targets');
        this.fetchTargets.shift();
        return;
      }
      
      const itemPosition = currentTarget.position;
      const distanceToItem = dogPosition.distanceTo(itemPosition);
      
      if (distanceToItem > 0.8) {
        // Sprint to the item (1.2x speed)
        this.locomotion.moveToward(this.mesh, itemPosition, this.speed * 1.2, deltaTime);
        this.animator.playWalk();
      } else {
        // Reached item, "pick it up"
        console.log(`Dog reached item ${this.fetchedItems.length + 1}/${this.maxCarryCapacity} - storing item data for delivery`);
        console.log('Item data:', currentTarget.userData);
        
        // Store the item data before removing from ground
        this.fetchedItems.push({
            userData: {
                itemId: currentTarget.userData.itemId,
                quantity: currentTarget.userData.quantity || 1
            }
        });
        
        // Remove this target from the list
        this.fetchTargets.shift();
        
        // Remove item from ground immediately when dog picks it up
        this.droppedItems.remove(currentTarget);
        
        // Create visual item in mouth
        this.carry.add(currentTarget.userData.itemId);
        
        // Check if dog should return to player or continue fetching
        if (this.fetchedItems.length >= this.maxCarryCapacity || this.fetchTargets.length === 0) {
          console.log(`Dog carrying ${this.fetchedItems.length} items - returning to player`);
          this.returnToPlayer = true;
        }
        
        this.animator.playIdle();
        this.bark(); // Excited bark when fetching item
      }
    } else if (this.returnToPlayer) {
      // Returning to player with item
      const distanceToPlayer = dogPosition.distanceTo(playerPosition);
      
      if (distanceToPlayer > 1.8) {
        // Carry the haul back to the player
        this.locomotion.moveToward(this.mesh, playerPosition, this.speed, deltaTime);
        this.animator.playWalk();
      } else {
        // Close enough to player - deliver items
        console.log(`🎉 Dog close enough to deliver! Items to deliver: ${this.fetchedItems.length}`);

        const deliverySuccess = this.delivery.deliver(this.fetchedItems, () => this.carry.removeLatest());
        
        if (deliverySuccess) {
          console.log('🎉 Multi-item delivery completed successfully!');
          
          // Clean up state after successful delivery
          this.state = 'following';
          this.fetchedItems = [];
          this.returnToPlayer = false;
          
          // Remove all visual items from mouth
          this.carry.clear();
          
          this.animator.playIdle();
          this.bark(); // Happy bark after successful delivery
          
        } else {
          console.log('❌ Multi-item delivery failed - dog will keep trying');
          // Dog will continue trying to deliver on next update
        }
      }
    }
  }

  updateIdle(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    // Ensure idle animation is playing
    this.animator.playIdle();
    
    // If player moves away, start following
    if (distanceToPlayer > this.followDistance * 1.5) {
      this.state = 'following';
    } else if (Math.random() < 0.05 && this.wanderCooldown <= 0) {
      this.startWandering();
    }
  }

  startWandering() {
    this.state = 'wandering';
    this.wanderCooldown = Math.random() * 10 + 5; // 5-15 seconds before next wander
  }

  setRandomWanderTarget(playerPosition: THREE.Vector3): void {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * this.wanderRadius * 0.5 + 1;
    
    this.wanderTarget = new THREE.Vector3(
      playerPosition.x + Math.cos(angle) * distance,
      playerPosition.y,
      playerPosition.z + Math.sin(angle) * distance
    );
  }

  startFetching(item: any): void {
    this.state = 'fetching';
    this.fetchTargets = [item]; // Initialize with first item
    this.returnToPlayer = false;
    console.log('Dog started fetching items, starting with:', item.userData?.itemId);
  }
  addFetchTarget(item: any): void {
    if (!this.isAlreadyTargeted(item) && this.fetchTargets.length < this.maxCarryCapacity) {
      this.fetchTargets.push(item);
      console.log('Dog added fetch target:', item.userData?.itemId, 'Total targets:', this.fetchTargets.length);
    }
  }
  isAlreadyTargeted(item: any): boolean {
    return this.fetchTargets.includes(item);
  }
  findNextFetchTarget(droppedItems: any[], dogPosition: THREE.Vector3): any {
    const maxSearchDistance = 200; // EXTREMELY FAR search radius for multiple items
    
    for (const item of droppedItems) {
      const distance = dogPosition.distanceTo(item.position);
      if (distance <= maxSearchDistance && !this.isAlreadyTargeted(item) && hasItemBeenDroppedLongEnough(item, Date.now())) {
        return item;
      }
    }
    
    return null;
  }
  // Enhanced validation method to ensure items exist in both arrays and scene
  validateItemExists(item: any, droppedItems: any[]): boolean {
    if (!item) {
      console.log('🚫 Item validation failed: item is null/undefined');
      return false;
    }
    
    // Check if item exists in the dropped items array
    const existsInDroppedItems = droppedItems.includes(item);
    
    // Check if item still exists in the scene
    const existsInScene = this.scene.children.includes(item);
    
    // Check if item exists in game's pickupable items array
    const gameInstance = (window as any).gameInstance;
    const existsInPickupable = gameInstance?.pickupableItems?.includes(item) || false;
    
    const isValid = existsInDroppedItems && existsInScene;
    
    if (!isValid) {
      console.log(`🚫 Item validation failed for ${item.userData?.itemId}:`, {
        existsInDroppedItems,
        existsInScene,
        existsInPickupable,
        hasUserData: !!item.userData
      });
    }
    
    return isValid;
  }

  bark() {
    console.log('🐕 Woof!');
    
    // Play bark animation briefly
    const barkPlayed = this.animator.playBark();

    // Return to previous animation after bark
    setTimeout(() => {
      this.restorePreviousAnimation();
    }, barkPlayed ? 1000 : 100); // Shorter timeout if no bark animation

    // You could add sound effects here in the future
  }
  restorePreviousAnimation() {
    if (this.state === 'idle') {
      this.animator.playIdle();
    } else if (this.state === 'following' || this.state === 'wandering' || this.state === 'fetching') {
      // Check if dog is actually moving before playing walk animation
      const isMoving = this.state === 'fetching' || 
                      (this.state === 'following' && this.player?.mesh && 
                       this.mesh.position.distanceTo(this.player.mesh.position) > this.followDistance) ||
                      (this.state === 'wandering' && this.wanderTarget && 
                       this.mesh.position.distanceTo(this.wanderTarget) > 0.5);
      
      if (isMoving) {
        this.animator.playWalk();
      } else {
        this.animator.playIdle();
      }
    }
  }

  destroy() {
    // Remove all carried items before destroying
    this.carry.clear();

    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
    this.animator.stop();
  }
}