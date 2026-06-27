import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import type { Item } from './inventory.js';

// window.gameInstance is the Game singleton (game.js, not yet migrated); access loosely.
type WindowWithGame = Window & { gameInstance?: { pickupableItems?: THREE.Object3D[] } };

export class ItemDropSystem {
  scene: THREE.Scene;
  droppedItems: THREE.Object3D[];
  bobSpeed: number;
  bobAmount: number;
  rotationSpeed: number;
  glowIntensity: number;
  loader: GLTFLoader;
  loadedModels: Record<string, THREE.Object3D>;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.droppedItems = [];
    this.bobSpeed = 0.002;
    this.bobAmount = 0.1;
    this.rotationSpeed = 0.01;
    this.glowIntensity = 0.3;

    // Asset loader for 3D models
    this.loader = new GLTFLoader();
    this.loadedModels = {}; // Cache for loaded models

    console.log('ItemDropSystem initialized');
  }

  async dropItem(item: Item, position: THREE.Vector3, quantity = 1): Promise<THREE.Object3D> {
    // Create visual representation of the dropped item
    const itemMesh = await this.createItemMesh(item);

    // Position the item
    itemMesh.position.copy(position);

    // Store item data
    itemMesh.userData = {
      itemId: item.id,
      quantity: quantity,
      bobOffset: Math.random() * Math.PI * 2, // Random phase for bobbing
      initialY: position.y,
      dropTime: Date.now(),
      isPhysicsItem: false,
    };

    // Add to scene and tracking array
    this.scene.add(itemMesh);
    this.droppedItems.push(itemMesh);

    // Add to game's pickupable items array if available
    const game = (window as WindowWithGame).gameInstance;
    if (game && game.pickupableItems) {
      game.pickupableItems.push(itemMesh);
    }

    console.log(`Dropped ${quantity} ${item.name}(s) at position:`, position);

    return itemMesh;
  }

  async dropItemWithPhysics(
    item: Item,
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    quantity = 1
  ): Promise<THREE.Object3D> {
    // Create visual representation of the dropped item
    const itemMesh = await this.createItemMesh(item);

    // Position the item
    itemMesh.position.copy(position);

    // Store item data with physics properties
    itemMesh.userData = {
      itemId: item.id,
      quantity: quantity,
      bobOffset: Math.random() * Math.PI * 2,
      initialY: position.y,
      dropTime: Date.now(),
      isPhysicsItem: true,
      velocity: velocity.clone(),
      gravity: -35.0, // Much heavier - items fall very fast
      bounceCount: 0,
      maxBounces: 1, // Only one small bounce
      bounceDamping: 0.1, // Very minimal bounce (was 0.3)
      groundY: 6.3, // Ground level (island surface)
      hasLanded: false,
    };

    // Add to scene and tracking array
    this.scene.add(itemMesh);
    this.droppedItems.push(itemMesh);

    // Add to game's pickupable items array if available
    const game = (window as WindowWithGame).gameInstance;
    if (game && game.pickupableItems) {
      game.pickupableItems.push(itemMesh);
    }

    console.log(`Dropped ${quantity} ${item.name}(s) with physics at position:`, position);

    return itemMesh;
  }

  async createItemMesh(item: Item): Promise<THREE.Object3D> {
    // Handle apple items with 3D model
    if (item.id === 'apple') {
      return await this.createAppleMesh();
    }

    // Handle other items with procedural geometry
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    switch (item.id) {
      case 'wood':
        // Create a larger log shape for wood
        geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 8);
        material = new THREE.MeshLambertMaterial({
          color: 0x8b4513, // Brown color
          emissive: 0x2a1a0a,
          emissiveIntensity: this.glowIntensity,
        });
        break;

      case 'stone':
        // Create irregular shape for stone
        geometry = new THREE.DodecahedronGeometry(0.12);
        material = new THREE.MeshLambertMaterial({
          color: 0x666666, // Gray color
          emissive: 0x222222,
          emissiveIntensity: this.glowIntensity,
        });
        break;

      default:
        // Default cube shape for other items
        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        material = new THREE.MeshLambertMaterial({
          color: 0x4caf50, // Green color
          emissive: 0x1a4a1a,
          emissiveIntensity: this.glowIntensity,
        });
        break;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    // Add slight random rotation
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    return mesh;
  }

  async createAppleMesh(): Promise<THREE.Object3D> {
    // Check if apple model is already cached
    if (this.loadedModels.apple) {
      const appleMesh = this.loadedModels.apple.clone();
      this.setupAppleMesh(appleMesh);
      return appleMesh;
    }

    // Load apple model from assets
    try {
      const gltf = await this.loadModel('assets/apple.glb');
      const appleMesh = gltf.scene.clone();

      // Cache the loaded model for future use
      this.loadedModels.apple = gltf.scene;

      this.setupAppleMesh(appleMesh);
      return appleMesh;
    } catch (error) {
      console.error('Failed to load apple model, falling back to sphere:', error);

      // Fallback to sphere geometry if model loading fails
      const geometry = new THREE.SphereGeometry(0.15, 12, 8);
      const material = new THREE.MeshLambertMaterial({
        color: 0xff4444, // Red color
        emissive: 0x441111,
        emissiveIntensity: this.glowIntensity,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = false;

      return mesh;
    }
  }

  setupAppleMesh(appleMesh: THREE.Object3D): void {
    // Scale the apple to smaller size for pickup
    appleMesh.scale.set(0.4, 0.4, 0.4);

    // Enable shadows and adjust materials
    appleMesh.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = false;

        // Add slight emissive glow to make it stand out
        const material = mesh.material;
        if (material) {
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              const standard = mat as THREE.MeshStandardMaterial;
              if (standard.emissive) {
                standard.emissive.setHex(0x441111);
                standard.emissiveIntensity = this.glowIntensity;
              }
            });
          } else {
            const standard = material as THREE.MeshStandardMaterial;
            if (standard.emissive) {
              standard.emissive.setHex(0x441111);
              standard.emissiveIntensity = this.glowIntensity;
            }
          }
        }
      }
    });

    // Add slight random rotation
    appleMesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
  }

  loadModel(url: string): Promise<GLTF> {
    return new Promise<GLTF>((resolve, reject) => {
      this.loader.load(url, resolve, undefined, reject);
    });
  }

  update(): void {
    const currentTime = Date.now();
    const deltaTime = 1 / 60; // Approximate 60 FPS

    // Update all dropped items
    for (let i = this.droppedItems.length - 1; i >= 0; i--) {
      const item = this.droppedItems[i];
      const userData = item.userData;

      if (userData.isPhysicsItem && !userData.hasLanded) {
        // Apply physics simulation
        this.updatePhysicsItem(item, userData, deltaTime);
      } else {
        // Apply bobbing animation for landed items
        const bobPhase = currentTime * this.bobSpeed + userData.bobOffset;
        if (userData.hasLanded) {
          item.position.y = userData.groundY + Math.sin(bobPhase) * this.bobAmount;
        } else {
          item.position.y = userData.initialY + Math.sin(bobPhase) * this.bobAmount;
        }
      }

      // Rotation animation for all items
      item.rotation.y += this.rotationSpeed;

      // Optional: Remove items after a certain time (5 minutes)
      const itemAge = currentTime - userData.dropTime;
      if (itemAge > 300000) {
        // 5 minutes in milliseconds
        this.removeItem(item, i);
      }
    }
  }

  // userData is the mesh's dynamic Object3D.userData; kept loose.
  updatePhysicsItem(item: THREE.Object3D, userData: any, deltaTime: number): void {
    // Apply gravity to velocity
    userData.velocity.y += userData.gravity * deltaTime;

    // Update position based on velocity
    item.position.x += userData.velocity.x * deltaTime;
    item.position.y += userData.velocity.y * deltaTime;
    item.position.z += userData.velocity.z * deltaTime;

    // Check for ground collision
    if (item.position.y <= userData.groundY) {
      item.position.y = userData.groundY;

      // Handle bouncing
      if (userData.bounceCount < userData.maxBounces && Math.abs(userData.velocity.y) > 0.1) {
        // Very small bounce due to heavy weight
        userData.velocity.y = -userData.velocity.y * userData.bounceDamping;
        userData.velocity.x *= userData.bounceDamping;
        userData.velocity.z *= userData.bounceDamping;
        userData.bounceCount++;
      } else {
        // Item has landed - stop physics and start bobbing
        userData.hasLanded = true;
        userData.velocity.set(0, 0, 0);
        userData.initialY = userData.groundY;
        console.log(`Item ${userData.itemId} has landed at position:`, item.position);
      }
    }
  }

  removeItem(itemMesh: THREE.Object3D, index = -1): void {
    console.log(`Removing item: ${itemMesh.userData?.itemId} from all tracking systems`);

    // Remove from scene
    this.scene.remove(itemMesh);

    // Remove from tracking array
    if (index >= 0) {
      this.droppedItems.splice(index, 1);
    } else {
      const trackingIndex = this.droppedItems.indexOf(itemMesh);
      if (trackingIndex !== -1) {
        this.droppedItems.splice(trackingIndex, 1);
      }
    }

    // Remove from game's pickupable items array
    const game = (window as WindowWithGame).gameInstance;
    if (game && game.pickupableItems) {
      const pickupIndex = game.pickupableItems.indexOf(itemMesh);
      if (pickupIndex !== -1) {
        game.pickupableItems.splice(pickupIndex, 1);
        console.log(`Removed item from pickupableItems array at index ${pickupIndex}`);
      }
    }

    // Mark item as removed to prevent save system from serializing it
    itemMesh.userData.isRemoved = true;
    itemMesh.userData.removeTime = Date.now();

    // Dispose of geometry and material
    const mesh = itemMesh as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    }

    console.log(`Item ${itemMesh.userData?.itemId} successfully removed from all systems`);
  }

  destroy(): void {
    // Clean up all dropped items
    for (const item of this.droppedItems) {
      this.scene.remove(item);
      const mesh = item as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) (mesh.material as THREE.Material).dispose();
    }
    this.droppedItems = [];

    console.log('ItemDropSystem destroyed');
  }
}
