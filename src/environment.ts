import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { createWorldRng, toNumericSeed, type Rng } from './shared/rng';
import type { CollisionSystem } from './CollisionSystem.js';

/** A placed tree instance and where it sits. */
export interface TreeData {
  mesh: THREE.Object3D;
  typeIndex: number;
  instanceIndex: number;
  position: { x: number; y: number; z: number };
}

export class Environment {
  scene: THREE.Scene;
  collisionSystem: CollisionSystem | null;
  /** The 32-bit numeric seed this world was generated from (persisted in the save). */
  seed: number;
  /** Stable ids ("typeIndex-instanceIndex") of trees chopped down; excluded on (re)generation. */
  choppedTreeIds: Set<string>;
  rng: Rng;
  treePositions!: { x: number; z: number; scale: number }[];
  loadedTrees!: TreeData[];
  waterMesh!: THREE.Mesh;
  waveTime!: number;
  waveSpeed!: number;
  wavesPaused!: boolean;
  waveAnimationId!: number | null;
  originalWaterPositions!: ArrayLike<number>;

  constructor(
    scene: THREE.Scene,
    collisionSystem: CollisionSystem | null = null,
    seed: number | string | undefined = undefined
  ) {
    this.scene = scene;
    this.collisionSystem = collisionSystem;
    // Deterministic world RNG: the same seed always yields the same layout.
    // In multiplayer the server owns this seed; for now it defaults to a fixed one.
    this.seed = toNumericSeed(seed);
    this.rng = createWorldRng(this.seed);
    this.choppedTreeIds = new Set();
  }

  create() {
    this.createLighting();
    this.createBasePlate();
    this.createIsland();
    this.createWater();
    
    // Load trees asynchronously and create colliders after
    this.addEnvironmentTrees();
  }

  createLighting() {
    // Neutral ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    // Main directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 80, 30);
    directionalLight.target.position.set(0, 0, 0);
    
    // Enable shadows
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.bias = -0.001;
    
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
  }

  createBasePlate() {
    // Base plate removed as requested
    console.log('Base plate creation skipped');
  }
  createIsland() {
    // Create island base with multiple levels
    const islandGroup = new THREE.Group();
    islandGroup.name = 'island';
    
    // Main island base (dirt/grass) - enormous size
    const islandGeometry = new THREE.CylinderGeometry(120, 135, 6, 64);
    const islandMaterial = new THREE.MeshLambertMaterial({ color: 0x4a7c4a });
    const islandMesh = new THREE.Mesh(islandGeometry, islandMaterial);
    islandMesh.position.y = 3;
    islandMesh.receiveShadow = true;
    islandMesh.castShadow = true;
    islandMesh.name = 'islandBase';
    
    // Mark as collider
    islandMesh.userData = {
      isCollider: true,
      colliderType: 'ground'
    };
    
    islandGroup.add(islandMesh);
    
    // Sandy shore ring around island - enormous size
    const shoreGeometry = new THREE.RingGeometry(120, 150, 64);
    const shoreMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf4e4bc,
      side: THREE.DoubleSide
    });
    const shoreMesh = new THREE.Mesh(shoreGeometry, shoreMaterial);
    shoreMesh.rotation.x = -Math.PI / 2;
    shoreMesh.position.y = 0.3;
    shoreMesh.receiveShadow = true;
    shoreMesh.name = 'sandyShore';
    
    // Mark shore as collider
    shoreMesh.userData = {
      isCollider: true,
      colliderType: 'ground'
    };
    
    islandGroup.add(shoreMesh);
    
    // Create beach sand mounds for visual interest - even more and larger
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const radius = 122 + this.rng() * 18;
      
      const sandMoundGeometry = new THREE.SphereGeometry(4 + this.rng() * 3, 24, 20);
      const sandMoundMaterial = new THREE.MeshLambertMaterial({ color: 0xf4e4bc });
      const sandMound = new THREE.Mesh(sandMoundGeometry, sandMoundMaterial);
      
      sandMound.position.set(
        Math.cos(angle) * radius,
        0.7,
        Math.sin(angle) * radius
      );
      sandMound.scale.y = 0.2; // Flatten the mounds
      sandMound.receiveShadow = true;
      
      islandGroup.add(sandMound);
    }
    
    // Add some rocks along the shore - more rocks for enormous island
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2 + this.rng() * 0.5;
      const radius = 148 + this.rng() * 8;
      
      const rockGeometry = new THREE.DodecahedronGeometry(2 + this.rng() * 1.5);
      const rockMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      
      rock.position.set(
        Math.cos(angle) * radius,
        0.5,
        Math.sin(angle) * radius
      );
      rock.rotation.set(
        this.rng() * Math.PI,
        this.rng() * Math.PI,
        this.rng() * Math.PI
      );
      rock.castShadow = true;
      rock.receiveShadow = true;
      
      islandGroup.add(rock);
    }
    
    // Position island in the scene
    islandGroup.position.set(0, 0, 0);
    
    this.scene.add(islandGroup);
    
    console.log('Created massive tropical island with sandy shore');
  }
  async addEnvironmentTrees() {
    const loader = new GLTFLoader();
    
    // Array to track all tree positions for collision detection
    this.treePositions = [];
    this.loadedTrees = [];
    
    // Tree asset URLs and configurations - updated with new corrected pivot models
    const treeAssets = [
      { url: 'assets/env_round_tree3.glb', scale: 6.5, count: 15 },
      { url: 'assets/env_tree2.glb', scale: 7.8, count: 12 },
      { url: 'assets/env_round_tree2.glb', scale: 7.2, count: 14 },
      { url: 'assets/env_apple_tree.glb', scale: 5.8, count: 8 },
      { url: 'assets/env_apple_tree2.glb', scale: 6.2, count: 10 },
      { url: 'assets/env_tree3.glb', scale: 8.2, count: 13 },
      { url: 'assets/env_round_tree.glb', scale: 6.7, count: 16 },
      { url: 'assets/env_tree.glb', scale: 7.5, count: 11 },
      { url: 'assets/env_apple_tree3.glb', scale: 5.9, count: 9 }
    ];
    console.log('Starting tree loading process...');
    // Load all tree types and wait for them to complete
    for (const [typeIndex, treeConfig] of treeAssets.entries()) {
      try {
        const gltf = await this.loadTreeModel(loader, treeConfig.url);
        const treeModel = gltf.scene;
        
        // Place multiple instances of this tree type
        for (let i = 0; i < treeConfig.count; i++) {
          // Always run createTreeInstance so its rng draws and treePositions stay
          // identical: that keeps the surviving trees in their exact spots. A tree
          // chopped in the saved game is placed deterministically, then dropped here.
          const treeData = this.createTreeInstance(treeModel, treeConfig, typeIndex, i);
          if (treeData) {
            if (this.choppedTreeIds.has(`${typeIndex}-${i}`)) {
              this.scene.remove(treeData.mesh);
            } else {
              this.loadedTrees.push(treeData);
            }
          }
        }
        
        console.log(`Completed loading ${treeConfig.count} instances of tree type ${typeIndex + 1}`);
      } catch (error) {
        console.error(`Failed to load tree type ${typeIndex + 1}:`, error);
      }
    }
    
    // Now create all colliders after all trees are loaded and positioned
    this.createAllTreeColliders();
    
    console.log(`Finished loading ${this.loadedTrees.length} trees with colliders`);
  }
  loadTreeModel(loader: GLTFLoader, url: string): Promise<GLTF> {
    return new Promise<GLTF>((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
  }
  createTreeInstance(
    treeModel: THREE.Object3D,
    treeConfig: any,
    typeIndex: number,
    instanceIndex: number
  ): TreeData | null {
    const treeClone = treeModel.clone();
    
    // Find a valid position that doesn't overlap with existing trees
    let validPosition = false;
    let attempts = 0;
    let x = 0;
    let z = 0;
    
    while (!validPosition && attempts < 50) {
      // Random position within the island bounds (avoiding center and edges)
      const angle = this.rng() * Math.PI * 2;
      const radius = 20 + this.rng() * 80; // Keep trees on the island surface
      
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
      
      // Check if this position is too close to existing trees
      const minDistance = treeConfig.scale * 2; // Minimum distance based on tree size
      validPosition = true;
      
      for (const existingPos of this.treePositions) {
        const distance = Math.sqrt(
          Math.pow(x - existingPos.x, 2) + Math.pow(z - existingPos.z, 2)
        );
        
        if (distance < minDistance) {
          validPosition = false;
          break;
        }
      }
      
      attempts++;
    }
    
    // Only place tree if we found a valid position
    if (validPosition) {
      // Set tree position
      treeClone.position.set(x, 6, z); // Y=6 to place on island surface
      
      // Store this position for future collision checks
      this.treePositions.push({ x: x, z: z, scale: treeConfig.scale });
    
      // Random rotation for natural variation
      treeClone.rotation.y = this.rng() * Math.PI * 2;
      
      // Scale variation for natural look
      const scaleVariation = 0.8 + this.rng() * 0.4; // 0.8x to 1.2x
      const finalScale = treeConfig.scale * scaleVariation;
      treeClone.scale.set(finalScale, finalScale, finalScale);
      
      // Enable shadows and remove shine
      treeClone.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Remove shine by making materials matte
          if (child.material) {
            if (Array.isArray(child.material)) {
              // Handle multiple materials
              child.material.forEach((mat: any) => {
                if (mat.roughness !== undefined) mat.roughness = 1.0;
                if (mat.metalness !== undefined) mat.metalness = 0.0;
              });
            } else {
              // Handle single material
              if (child.material.roughness !== undefined) child.material.roughness = 1.0;
              if (child.material.metalness !== undefined) child.material.metalness = 0.0;
            }
          }
        }
      });
      
      // Stable, deterministic id so a chopped tree can be excluded on reload.
      treeClone.userData.treeId = `${typeIndex}-${instanceIndex}`;

      // Add tree to scene
      this.scene.add(treeClone);

      // Return tree data for collider creation
      return {
        mesh: treeClone,
        typeIndex: typeIndex,
        instanceIndex: instanceIndex,
        position: { x: x, y: 6, z: z }
      };
    } else {
      console.warn(`Could not find valid position for tree ${typeIndex}_${instanceIndex} after ${attempts} attempts`);
      return null;
    }
  }
  createAllTreeColliders() {
    if (!this.collisionSystem) {
      console.warn('No collision system available for tree colliders');
      return;
    }
    
    console.log(`Creating colliders for ${this.loadedTrees.length} trees...`);
    
    this.loadedTrees.forEach((treeData) => {
      this.createTreeCollider(treeData);
    });
    
    console.log('All tree colliders created successfully');
  }
  createTreeCollider(treeData: TreeData) {
    if (!this.collisionSystem) return;
    const trunkRadius = 0.6; // Reduced from 0.8 to minimize visual interference
    const trunkHeight = 3.0; // Reduced from 4.0 to stay closer to actual trunk
    
    const treeColliderGeometry = new THREE.CylinderGeometry(
      trunkRadius,
      trunkRadius,
      trunkHeight,
      8
    );
    const treeColliderMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff0000, 
      transparent: true, 
      opacity: 0, // Completely invisible
      depthTest: false, // Don't interfere with depth testing
      depthWrite: false // Don't write to depth buffer
    });
    const treeCollider = new THREE.Mesh(treeColliderGeometry, treeColliderMaterial);
    // Collider is for hit-testing only; never render it (saves ~1 draw call per tree).
    treeCollider.visible = false;

    // Position collider slightly lower and closer to actual trunk base
    treeCollider.position.copy(treeData.mesh.position);
    treeCollider.position.y = treeData.position.y + (trunkHeight * 0.3); // Lower position
    treeCollider.name = `treeCollider_${treeData.typeIndex}_${treeData.instanceIndex}`;
    
    // Store collider data
    treeCollider.userData.trunkRadius = trunkRadius;
    treeCollider.userData.trunkHeight = trunkHeight;
    treeCollider.userData.associatedTree = treeData.mesh;
    
    // Make collider non-raycastable to prevent visual interference
    treeCollider.raycast = function() {}; // Override raycast to do nothing
    
    // Add to scene and collision system
    this.scene.add(treeCollider);
    this.collisionSystem.addCollider(treeCollider, 'mesh');
    
    console.log(`Tree collider created at (${treeCollider.position.x.toFixed(1)}, ${treeCollider.position.y.toFixed(1)}, ${treeCollider.position.z.toFixed(1)})`);
  }
  createWater() {
    // Create massive water plane that extends far beyond the island.
    // 64x64 segments (~4k verts) instead of 128x128 (~16k): the per-frame wave
    // loop and computeVertexNormals cost scale with vertex count, and the long
    // wavelengths still sample fine at this resolution.
    const waterGeometry = new THREE.PlaneGeometry(800, 800, 64, 64);
    
    // Create realistic water material with blue-green ocean color
    const waterMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x1e6091,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = 0.3; // Set water level at Y=0.3 as requested
    waterMesh.receiveShadow = true;
    waterMesh.name = 'oceanWater';
    
    // Mark water as collider for physics
    waterMesh.userData = {
      isCollider: true,
      colliderType: 'ground'
    };
    
    this.scene.add(waterMesh);
    
    // Start wave animation system
    this.initializeWaveAnimation(waterMesh);
    
    console.log('Created expansive ocean water with animated waves');
  }
  initializeWaveAnimation(waterMesh: THREE.Mesh) {
    // Store animation properties
    this.waterMesh = waterMesh;
    this.waveTime = 0;
    this.waveSpeed = 0.008;
    this.wavesPaused = false;
    this.waveAnimationId = null;
    
    // Store original vertex positions for wave calculations
    const geometry = waterMesh.geometry;
    const positionAttribute = geometry.attributes.position;
    this.originalWaterPositions = positionAttribute.array.slice();
    
    // Start the wave animation loop
    this.startWaveAnimation();
  }
  startWaveAnimation() {
    const animateOceanWaves = () => {
      if (!this.waterMesh) return;
      // While paused, stay subscribed but skip the expensive 16k-vertex recompute.
      if (this.wavesPaused) {
        this.waveAnimationId = requestAnimationFrame(animateOceanWaves);
        return;
      }

      this.waveTime += this.waveSpeed;
      
      const positions = this.waterMesh.geometry.attributes.position;
      const positionArray = positions.array;
      
      // Create multiple overlapping wave patterns for realistic ocean movement
      for (let i = 0; i < positionArray.length; i += 3) {
        const x = this.originalWaterPositions[i];
        const z = this.originalWaterPositions[i + 2];
        
        // Large rolling waves (primary wave system)
        const primaryWave = Math.sin(x * 0.015 + this.waveTime * 2) * 0.12;
        const secondaryWave = Math.cos(z * 0.018 + this.waveTime * 1.5) * 0.08;
        
        // Medium frequency waves for texture
        const mediumWave1 = Math.sin((x + z) * 0.025 + this.waveTime * 2.5) * 0.05;
        const mediumWave2 = Math.cos((x - z) * 0.022 + this.waveTime * 1.8) * 0.04;
        
        // Small ripples for fine detail
        const ripple1 = Math.sin(x * 0.045 + this.waveTime * 3.2) * 0.02;
        const ripple2 = Math.cos(z * 0.038 + this.waveTime * 2.8) * 0.015;
        
        // Combine all wave components
        const finalWaveHeight = primaryWave + secondaryWave + mediumWave1 + mediumWave2 + ripple1 + ripple2;
        
        // Apply the wave height to the Y position
        positionArray[i + 1] = finalWaveHeight;
      }
      
      // Update geometry
      positions.needsUpdate = true;
      this.waterMesh.geometry.computeVertexNormals();
      
      // Continue animation
      this.waveAnimationId = requestAnimationFrame(animateOceanWaves);
    };

    // Start the animation
    this.waveAnimationId = requestAnimationFrame(animateOceanWaves);
  }

  pauseWaves() {
    this.wavesPaused = true;
  }

  resumeWaves() {
    this.wavesPaused = false;
  }
}