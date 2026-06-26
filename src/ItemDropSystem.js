import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ItemDropSystem {
  constructor(scene) {
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
  
  async dropItem(item, position, quantity = 1) {
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
      isPhysicsItem: false
    };
    
    // Add to scene and tracking array
    this.scene.add(itemMesh);
    this.droppedItems.push(itemMesh);
    
    // Add to game's pickupable items array if available
    if (window.gameInstance && window.gameInstance.pickupableItems) {
      window.gameInstance.pickupableItems.push(itemMesh);
    }
    
    console.log(`Dropped ${quantity} ${item.name}(s) at position:`, position);
    
    return itemMesh;
  }
  
  async dropItemWithPhysics(item, position, velocity, quantity = 1) {
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
      hasLanded: false
    };
    
    // Add to scene and tracking array
    this.scene.add(itemMesh);
    this.droppedItems.push(itemMesh);
    
    // Add to game's pickupable items array if available
    if (window.gameInstance && window.gameInstance.pickupableItems) {
      window.gameInstance.pickupableItems.push(itemMesh);
    }
    
    console.log(`Dropped ${quantity} ${item.name}(s) with physics at position:`, position);
    
    return itemMesh;
  }
  
  async createItemMesh(item) {
    // Handle apple items with 3D model
    if (item.id === 'apple') {
      return await this.createAppleMesh();
    }
    
    // Handle other items with procedural geometry
    let geometry, material;
    
    switch (item.id) {
      case 'wood':
        // Create a larger log shape for wood
        geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 8);
        material = new THREE.MeshLambertMaterial({ 
          color: 0x8B4513, // Brown color
          emissive: 0x2A1A0A,
          emissiveIntensity: this.glowIntensity
        });
        break;
      
      case 'stone':
        // Create irregular shape for stone
        geometry = new THREE.DodecahedronGeometry(0.12);
        material = new THREE.MeshLambertMaterial({ 
          color: 0x666666, // Gray color
          emissive: 0x222222,
          emissiveIntensity: this.glowIntensity
        });
        break;
      
      default:
        // Default cube shape for other items
        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        material = new THREE.MeshLambertMaterial({ 
          color: 0x4CAF50, // Green color
          emissive: 0x1A4A1A,
          emissiveIntensity: this.glowIntensity
        });
        break;
    }
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    
    // Add slight random rotation
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    
    return mesh;
  }
  
  async createAppleMesh() {
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
        color: 0xFF4444, // Red color
        emissive: 0x441111,
        emissiveIntensity: this.glowIntensity
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      
      return mesh;
    }
  }
  
  setupAppleMesh(appleMesh) {
    // Scale the apple to smaller size for pickup
    appleMesh.scale.set(0.4, 0.4, 0.4);
    
    // Enable shadows and adjust materials
    appleMesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
        
        // Add slight emissive glow to make it stand out
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.emissive) {
                mat.emissive.setHex(0x441111);
                mat.emissiveIntensity = this.glowIntensity;
              }
            });
          } else {
            if (child.material.emissive) {
              child.material.emissive.setHex(0x441111);
              child.material.emissiveIntensity = this.glowIntensity;
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
  
  loadModel(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, resolve, undefined, reject);
    });
  }
  
  update() {
    const currentTime = Date.now();
    const deltaTime = 1/60; // Approximate 60 FPS
    
    // Update all dropped items
    for (let i = this.droppedItems.length - 1; i >= 0; i--) {
      const item = this.droppedItems[i];
      const userData = item.userData;
      
      if (userData.isPhysicsItem && !userData.hasLanded) {
        // Apply physics simulation
        this.updatePhysicsItem(item, userData, deltaTime);
      } else {
        // Apply bobbing animation for landed items
        const bobPhase = (currentTime * this.bobSpeed) + userData.bobOffset;
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
      if (itemAge > 300000) { // 5 minutes in milliseconds
        this.removeItem(item, i);
      }
    }
  }
  
  updatePhysicsItem(item, userData, deltaTime) {
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
  
  removeItem(itemMesh, index = -1) {
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
    if (window.gameInstance && window.gameInstance.pickupableItems) {
      const pickupIndex = window.gameInstance.pickupableItems.indexOf(itemMesh);
      if (pickupIndex !== -1) {
        window.gameInstance.pickupableItems.splice(pickupIndex, 1);
        console.log(`Removed item from pickupableItems array at index ${pickupIndex}`);
      }
    }
    
    // Mark item as removed to prevent save system from serializing it
    itemMesh.userData.isRemoved = true;
    itemMesh.userData.removeTime = Date.now();
    
    // Dispose of geometry and material
    if (itemMesh.geometry) itemMesh.geometry.dispose();
    if (itemMesh.material) {
      if (Array.isArray(itemMesh.material)) {
        itemMesh.material.forEach(mat => mat.dispose());
      } else {
        itemMesh.material.dispose();
      }
    }
    
    console.log(`Item ${itemMesh.userData?.itemId} successfully removed from all systems`);
  }
  
  destroy() {
    // Clean up all dropped items
    for (const item of this.droppedItems) {
      this.scene.remove(item);
      if (item.geometry) item.geometry.dispose();
      if (item.material) item.material.dispose();
    }
    this.droppedItems = [];
    
    console.log('ItemDropSystem destroyed');
  }
}