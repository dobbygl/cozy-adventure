import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class DogCompanion {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.mesh = null;
    this.mixer = null;
    this.animations = {};
    this.currentAnimation = null;
    this.currentAnimationName = null;
    
    // AI behavior properties
    this.followDistance = 3;
    this.minFollowDistance = 1.5;
    this.wanderRadius = 5;
    this.speed = 5;
    this.rotationSpeed = 8;
    
    // Ground collision properties
    this.groundLevel = 0;
    this.gravity = -15;
    this.velocity = new THREE.Vector3();
    this.isOnGround = false;
    
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
    
    // Visual items in mouth - now an array
    this.itemsInMouth = [];
    this.mouthContainer = null;
    
    this.loader = new GLTFLoader();
  }

  async load() {
    try {
      const gltf = await this.loader.loadAsync('assets/dog_001.glb');
      
      this.mesh = gltf.scene;
      this.mesh.scale.setScalar(2.0);
      this.mesh.position.set(0, 0, 0);
      
      // Enable shadows
      this.mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Set up animations if available
      if (gltf.animations && gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.mesh);
        
        gltf.animations.forEach((clip) => {
          const action = this.mixer.clipAction(clip);
          this.animations[clip.name] = action;
          console.log('Available animation:', clip.name); // Debug log
        });
        
        // Play idle animation by default - try common variations
        if (this.animations['idle']) {
          this.playAnimation('idle');
        } else if (this.animations['Idle']) {
          this.playAnimation('Idle');
        } else if (this.animations['T-Pose']) {
          this.playAnimation('T-Pose');
        } else {
          // Play the first available animation
          const firstAnimation = Object.keys(this.animations)[0];
          if (firstAnimation) {
            this.playAnimation(firstAnimation);
            console.log('Playing first available animation:', firstAnimation);
          }
        }
      }
      
      this.scene.add(this.mesh);
      
      // Create mouth container for holding items
      this.createMouthContainer();
      
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
      
      // Create mouth container for fallback mesh too
      this.createMouthContainer();
      
      return this.mesh;
    }
  }

  playAnimation(animationName) {
    if (!this.mixer || !this.animations[animationName]) {
      console.log('Animation not found:', animationName, 'Available:', Object.keys(this.animations));
      return false;
    }
    
    // Don't switch if already playing the same animation
    if (this.currentAnimationName === animationName) {
      return true;
    }
    
    if (this.currentAnimation) {
      this.currentAnimation.fadeOut(0.2);
    }
    
    this.currentAnimation = this.animations[animationName];
    this.currentAnimationName = animationName;
    this.currentAnimation.reset().fadeIn(0.2).play();
    console.log('Playing animation:', animationName);
    return true;
  }

  update(deltaTime, droppedItems = []) {
    if (!this.mesh || !this.player?.mesh) return;
    
    // Update animations
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }
    
    // Apply gravity and ground collision
    this.updatePhysics(deltaTime);
    
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
      const nearestItem = this.findNearestDroppedItem(droppedItems, dogPosition);
      if (nearestItem && this.validateItemExists(nearestItem, droppedItems) && 
          dogPosition.distanceTo(nearestItem.position) < 150 && !this.isAlreadyTargeted(nearestItem) &&
          this.hasItemBeenDroppedLongEnough(nearestItem)) {
        
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
          dogPosition.distanceTo(additionalItem.position) < 150 && this.hasItemBeenDroppedLongEnough(additionalItem)) {
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
  updatePhysics(deltaTime) {
    // Use collision system for proper ground detection if available
    const gameInstance = window.gameInstance;
    if (gameInstance?.collisionSystem) {
      const groundCheck = gameInstance.collisionSystem.checkGroundCollision(
        this.mesh.position, 
        1.0, // character height
        0.1  // ray offset
      );
      
      if (groundCheck.hasCollision) {
        // Set dog position to ground height
        this.mesh.position.y = groundCheck.groundHeight;
        this.velocity.y = 0;
        this.isOnGround = true;
      } else {
        // Apply gravity if no ground found
        if (!this.isOnGround) {
          this.velocity.y += this.gravity * deltaTime;
        }
        
        // Apply vertical velocity
        this.mesh.position.y += this.velocity.y * deltaTime;
        
        // Fallback ground level check
        if (this.mesh.position.y <= this.groundLevel) {
          this.mesh.position.y = this.groundLevel;
          this.velocity.y = 0;
          this.isOnGround = true;
        } else {
          this.isOnGround = false;
        }
      }
    } else {
      // Fallback: simple ground level enforcement
      this.mesh.position.y = Math.max(this.mesh.position.y, this.groundLevel);
      this.velocity.y = 0;
      this.isOnGround = true;
    }
  }

  updateFollowing(deltaTime, playerPosition, dogPosition, distanceToPlayer) {
    if (distanceToPlayer > this.followDistance) {
      // Move towards player
      const direction = new THREE.Vector3()
        .subVectors(playerPosition, dogPosition)
        .normalize();
      
      // Only move horizontally, let physics handle vertical movement
      const movement = new THREE.Vector3(
        direction.x * this.speed * deltaTime,
        0,
        direction.z * this.speed * deltaTime
      );
      this.mesh.position.add(movement);
      
      // Play walk animation when moving
      this.tryPlayWalkAnimation();
      
      // Rotate to face movement direction
      this.rotateTowards(direction, deltaTime);
      
    } else if (distanceToPlayer < this.minFollowDistance) {
      // Too close, maybe wander or sit
      if (Math.random() < 0.1 && this.wanderCooldown <= 0) {
        this.startWandering();
      } else {
        this.state = 'idle';
        this.tryPlayIdleAnimation();
      }
    } else {
      // Within follow range but not too close - idle
      this.tryPlayIdleAnimation();
    }
  }

  updateWandering(deltaTime, playerPosition, dogPosition, distanceToPlayer) {
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
    const distanceToTarget = dogPosition.distanceTo(this.wanderTarget);
    if (distanceToTarget > 0.5) {
      const direction = new THREE.Vector3()
        .subVectors(this.wanderTarget, dogPosition)
        .normalize();
      
      // Only move horizontally during wandering
      const movement = new THREE.Vector3(
        direction.x * this.speed * 0.5 * deltaTime,
        0,
        direction.z * this.speed * 0.5 * deltaTime
      );
      this.mesh.position.add(movement);
      
      // Play walk animation when wandering
      this.tryPlayWalkAnimation();
      
      this.rotateTowards(direction, deltaTime);
    } else {
      // Reached target, maybe go back to following
      this.tryPlayIdleAnimation();
      if (Math.random() < 0.3) {
        this.state = 'following';
      } else {
        this.setRandomWanderTarget(playerPosition);
      }
    }
  }

  updateFetching(deltaTime, playerPosition, dogPosition, droppedItems) {
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
        const direction = new THREE.Vector3()
          .subVectors(itemPosition, dogPosition)
          .normalize();
        
        // Only move horizontally when fetching
        const movement = new THREE.Vector3(
          direction.x * this.speed * 1.2 * deltaTime,
          0,
          direction.z * this.speed * 1.2 * deltaTime
        );
        this.mesh.position.add(movement);
        
        // Play walk animation when fetching
        this.tryPlayWalkAnimation();
        
        this.rotateTowards(direction, deltaTime);
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
        this.removeItemFromGround(currentTarget);
        
        // Create visual item in mouth
        this.createItemInMouth(currentTarget.userData.itemId);
        
        // Check if dog should return to player or continue fetching
        if (this.fetchedItems.length >= this.maxCarryCapacity || this.fetchTargets.length === 0) {
          console.log(`Dog carrying ${this.fetchedItems.length} items - returning to player`);
          this.returnToPlayer = true;
        }
        
        this.tryPlayIdleAnimation();
        this.bark(); // Excited bark when fetching item
      }
    } else if (this.returnToPlayer) {
      // Returning to player with item
      const distanceToPlayer = dogPosition.distanceTo(playerPosition);
      
      if (distanceToPlayer > 1.8) {
        const direction = new THREE.Vector3()
          .subVectors(playerPosition, dogPosition)
          .normalize();
        
        // Only move horizontally when returning to player
        const movement = new THREE.Vector3(
          direction.x * this.speed * deltaTime,
          0,
          direction.z * this.speed * deltaTime
        );
        this.mesh.position.add(movement);
        
        // Play walk animation when returning to player
        this.tryPlayWalkAnimation();
        
        this.rotateTowards(direction, deltaTime);
      } else {
        // Close enough to player - deliver items
        console.log(`🎉 Dog close enough to deliver! Items to deliver: ${this.fetchedItems.length}`);
        
        const deliverySuccess = this.deliverMultipleItems();
        
        if (deliverySuccess) {
          console.log('🎉 Multi-item delivery completed successfully!');
          
          // Clean up state after successful delivery
          this.state = 'following';
          this.fetchedItems = [];
          this.returnToPlayer = false;
          
          // Remove all visual items from mouth
          this.removeItemFromMouth();
          
          this.tryPlayIdleAnimation();
          this.bark(); // Happy bark after successful delivery
          
        } else {
          console.log('❌ Multi-item delivery failed - dog will keep trying');
          // Dog will continue trying to deliver on next update
        }
      }
    }
  }

  updateIdle(deltaTime, playerPosition, dogPosition, distanceToPlayer) {
    // Ensure idle animation is playing
    this.tryPlayIdleAnimation();
    
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

  setRandomWanderTarget(playerPosition) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * this.wanderRadius * 0.5 + 1;
    
    this.wanderTarget = new THREE.Vector3(
      playerPosition.x + Math.cos(angle) * distance,
      playerPosition.y,
      playerPosition.z + Math.sin(angle) * distance
    );
  }

  startFetching(item) {
    this.state = 'fetching';
    this.fetchTargets = [item]; // Initialize with first item
    this.returnToPlayer = false;
    console.log('Dog started fetching items, starting with:', item.userData?.itemId);
  }
  addFetchTarget(item) {
    if (!this.isAlreadyTargeted(item) && this.fetchTargets.length < this.maxCarryCapacity) {
      this.fetchTargets.push(item);
      console.log('Dog added fetch target:', item.userData?.itemId, 'Total targets:', this.fetchTargets.length);
    }
  }
  isAlreadyTargeted(item) {
    return this.fetchTargets.includes(item);
  }
  findNextFetchTarget(droppedItems, dogPosition) {
    const maxSearchDistance = 200; // EXTREMELY FAR search radius for multiple items
    
    for (const item of droppedItems) {
      const distance = dogPosition.distanceTo(item.position);
      if (distance <= maxSearchDistance && !this.isAlreadyTargeted(item) && this.hasItemBeenDroppedLongEnough(item)) {
        return item;
      }
    }
    
    return null;
  }
  // Check if an item has been on the ground for at least 15 seconds
  hasItemBeenDroppedLongEnough(item) {
    if (!item.userData || !item.userData.dropTime) {
      console.log(`⏰ Item ${item.userData?.itemId} has no drop time - assuming it's been there long enough`);
      return true; // If no drop time is recorded, assume it's been there long enough
    }
    
    const currentTime = Date.now();
    const dropTime = item.userData.dropTime;
    const timeOnGround = currentTime - dropTime;
    const minimumWaitTime = 10000; // 15 seconds in milliseconds
    
    const isReady = timeOnGround >= minimumWaitTime;
    
    if (!isReady) {
      const remainingTime = Math.ceil((minimumWaitTime - timeOnGround) / 1000);
      console.log(`⏰ Item ${item.userData.itemId} needs ${remainingTime} more seconds before dog pickup`);
    } else {
      console.log(`✅ Item ${item.userData.itemId} has been on ground for ${Math.floor(timeOnGround / 1000)} seconds - ready for pickup`);
    }
    
    return isReady;
  }

  findNearestDroppedItem(droppedItems, dogPosition) {
    let nearestItem = null;
    let nearestDistance = Infinity;
    
    for (const item of droppedItems) {
      const distance = dogPosition.distanceTo(item.position);
      if (distance < nearestDistance) {
        nearestItem = item;
        nearestDistance = distance;
      }
    }
    
    return nearestItem;
  }

  itemExists(item, droppedItems) {
    return droppedItems.includes(item);
  }
  // Enhanced validation method to ensure items exist in both arrays and scene
  validateItemExists(item, droppedItems) {
    if (!item) {
      console.log('🚫 Item validation failed: item is null/undefined');
      return false;
    }
    
    // Check if item exists in the dropped items array
    const existsInDroppedItems = droppedItems.includes(item);
    
    // Check if item still exists in the scene
    const existsInScene = this.scene.children.includes(item);
    
    // Check if item exists in game's pickupable items array
    const gameInstance = window.gameInstance;
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

  deliverMultipleItems() {
    console.log('🚀 Multi-item delivery system started');
    console.log('Items to deliver:', this.fetchedItems.length);
    
    if (this.fetchedItems.length === 0) {
      console.log('❌ No items to deliver');
      return false;
    }
    
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventory || !gameInstance?.itemRegistry) {
      console.log('❌ Missing game instance, inventory, or item registry');
      return false;
    }
    
    let deliveredItems = [];
    let totalDelivered = 0;
    
    // Deliver each item one by one
    for (let i = 0; i < this.fetchedItems.length; i++) {
      const fetchedItem = this.fetchedItems[i];
      const itemId = fetchedItem.userData.itemId;
      const quantity = fetchedItem.userData.quantity || 1;
      const item = gameInstance.itemRegistry[itemId];
      
      if (!item) {
        console.warn(`❌ Item ${itemId} not found in registry, skipping`);
        continue;
      }
      
      console.log(`📦 Delivering item ${i + 1}/${this.fetchedItems.length}: ${item.name} x${quantity}`);
      
      // Try to add the item to inventory
      const addedQuantity = gameInstance.inventory.addItem(item, quantity);
      
      if (addedQuantity > 0) {
        deliveredItems.push({ item, quantity: addedQuantity });
        totalDelivered += addedQuantity;
        console.log(`✅ Successfully delivered ${addedQuantity} ${item.name}(s)`);
        
        // Remove one visual item from mouth after each successful delivery
        this.removeLatestItemFromMouth();
        
        // Small delay between deliveries for visual effect
        if (i < this.fetchedItems.length - 1) {
          setTimeout(() => {
            // Visual feedback for sequential delivery
            console.log(`🔄 Delivered ${i + 1}/${this.fetchedItems.length} items so far`);
          }, i * 100);
        }
      } else {
        console.warn(`❌ Could not deliver ${item.name} - inventory may be full`);
      }
    }
    
    // Force comprehensive UI update after all deliveries
    this.forceInventoryUIUpdate();
    
    // Show delivery message with summary using pickup popup system
    if (deliveredItems.length > 0) {
      this.showDeliveryPopup(deliveredItems, totalDelivered);
      
      // Trigger inventory change callbacks
      if (gameInstance.inventory.onInventoryChange) {
        gameInstance.inventory.onInventoryChange();
      }
      
      // Update player held item
      setTimeout(() => {
        if (gameInstance.player && gameInstance.inventory) {
          const selectedItem = gameInstance.inventory.getSelectedItem();
          gameInstance.player.updateHeldItem(selectedItem);
        }
      }, 100);
      
      console.log(`🎉 Multi-item delivery completed! Delivered ${totalDelivered} items total`);
      return true;
    }
    
    console.log('❌ No items were successfully delivered');
    return false;
  }
// NEW METHOD: Force delivery directly by finding empty slot
forceDeliveryDirectly() {
    console.log('🔧 FORCE DELIVERY DIRECTLY METHOD');
    
    if (!this.fetchTarget?.userData?.itemId) {
        console.log('❌ No valid item to deliver');
        return false;
    }
    
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventory) {
        console.log('❌ No game instance or inventory');
        return false;
    }
    
    const itemId = this.fetchTarget.userData.itemId;
    const quantity = this.fetchTarget.userData.quantity || 1;
    const item = gameInstance.itemRegistry[itemId];
    
    if (!item) {
        console.log('❌ Item not found in registry:', itemId);
        return false;
    }
    
    console.log('🔧 Direct delivery attempt:', item.name, 'x', quantity);
    
    // Create ItemStack manually
    const ItemStack = class {
        constructor(item, quantity) {
            this.item = item;
            this.quantity = quantity;
        }
    };
    
    const newStack = new ItemStack(item, quantity);
    
    // Find empty slot and force it in
    const inventory = gameInstance.inventory;
    
    // Try hotbar first
    for (let i = 0; i < inventory.hotbar.length; i++) {
        if (!inventory.hotbar[i]) {
            inventory.hotbar[i] = newStack;
            console.log('✅ Forced item into hotbar slot', i);
            
            // Force UI update
            if (gameInstance.inventoryUI) {
                gameInstance.inventoryUI.updateHotbar();
                gameInstance.inventoryUI.updateUI();
            }
            
            return true;
        }
    }
    
    // Try backpack
    for (let i = 0; i < inventory.backpack.length; i++) {
        if (!inventory.backpack[i]) {
            inventory.backpack[i] = newStack;
            console.log('✅ Forced item into backpack slot', i);
            
            // Force UI update
            if (gameInstance.inventoryUI) {
                gameInstance.inventoryUI.updateBackpack();
                gameInstance.inventoryUI.updateUI();
            }
            
            return true;
        }
    }
    
    console.log('❌ No empty slots found');
    return false;
}
// NEW METHOD: Emergency delivery - create fresh item
emergencyDelivery() {
    console.log('🚨 EMERGENCY DELIVERY METHOD');
    
    if (!this.fetchTarget?.userData?.itemId) {
        console.log('❌ No valid item to deliver');
        return false;
    }
    
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventory) {
        console.log('❌ No game instance or inventory');
        return false;
    }
    
    const itemId = this.fetchTarget.userData.itemId;
    const quantity = this.fetchTarget.userData.quantity || 1;
    const item = gameInstance.itemRegistry[itemId];
    
    if (!item) {
        console.log('❌ Item not found in registry:', itemId);
        return false;
    }
    
    console.log('🚨 Emergency delivery attempt:', item.name, 'x', quantity);
    
    // Use the inventory's own addItem method with force
    try {
        const added = gameInstance.inventory.addItem(item, quantity);
        console.log('Emergency delivery added:', added, 'items');
        
        if (added > 0) {
            // Force all possible UI updates
            if (gameInstance.inventoryUI) {
                gameInstance.inventoryUI.updateUI();
                gameInstance.inventoryUI.updateHotbar();
                gameInstance.inventoryUI.updateBackpack();
            }
            
            // Force inventory callbacks
            if (gameInstance.inventory.onInventoryChange) {
                gameInstance.inventory.onInventoryChange();
            }
            
            return true;
        }
    } catch (error) {
        console.error('Emergency delivery error:', error);
    }
    
    return false;
}
// NEW METHOD: Absolute brute force delivery
absoluteBruteForceDelivery() {
    console.log('💀 ABSOLUTE BRUTE FORCE DELIVERY METHOD');
    
    if (!this.fetchTarget?.userData?.itemId) {
        console.log('❌ No valid item to deliver');
        return false;
    }
    
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventory || !gameInstance?.itemRegistry) {
        console.log('❌ Missing game instance, inventory, or item registry');
        return false;
    }
    
    const itemId = this.fetchTarget.userData.itemId;
    const quantity = this.fetchTarget.userData.quantity || 1;
    const item = gameInstance.itemRegistry[itemId];
    
    if (!item) {
        console.log('❌ Item not found in registry:', itemId);
        return false;
    }
    
    console.log('💀 Brute force delivery attempt:', item.name, 'x', quantity);
    
    // BRUTE FORCE 1: Directly modify the first empty hotbar slot
    const inventory = gameInstance.inventory;
    for (let i = 0; i < inventory.hotbar.length; i++) {
        if (!inventory.hotbar[i]) {
            // Create ItemStack using the exact same class as the inventory system
            const ItemStack = window.ItemStack || gameInstance.inventory.constructor.ItemStack || class {
                constructor(item, quantity) {
                    this.item = item;
                    this.quantity = quantity;
                }
            };
            
            const newStack = new ItemStack(item, quantity);
            inventory.hotbar[i] = newStack;
            
            console.log('💀 BRUTE FORCE: Placed item in hotbar slot', i);
            console.log('💀 Slot content after placement:', inventory.hotbar[i]);
            
            // Force all callbacks and updates immediately
            if (inventory.onInventoryChange) {
                console.log('💀 Calling onInventoryChange callback');
                inventory.onInventoryChange();
            }
            if (inventory.notifyChange) {
                console.log('💀 Calling notifyChange');
                inventory.notifyChange();
            }
            
            // Force UI updates
            if (gameInstance.inventoryUI) {
                console.log('💀 Forcing inventoryUI updates');
                if (gameInstance.inventoryUI.updateUI) gameInstance.inventoryUI.updateUI();
                if (gameInstance.inventoryUI.updateHotbar) gameInstance.inventoryUI.updateHotbar();
                if (gameInstance.inventoryUI.createHotbar) gameInstance.inventoryUI.createHotbar();
            }
            
            return true;
        }
    }
    
    // BRUTE FORCE 2: Try backpack if hotbar failed
    for (let i = 0; i < inventory.backpack.length; i++) {
        if (!inventory.backpack[i]) {
            const ItemStack = window.ItemStack || gameInstance.inventory.constructor.ItemStack || class {
                constructor(item, quantity) {
                    this.item = item;
                    this.quantity = quantity;
                }
            };
            
            const newStack = new ItemStack(item, quantity);
            inventory.backpack[i] = newStack;
            
            console.log('💀 BRUTE FORCE: Placed item in backpack slot', i);
            console.log('💀 Slot content after placement:', inventory.backpack[i]);
            
            // Force all callbacks and updates
            if (inventory.onInventoryChange) inventory.onInventoryChange();
            if (inventory.notifyChange) inventory.notifyChange();
            if (gameInstance.inventoryUI) {
                if (gameInstance.inventoryUI.updateUI) gameInstance.inventoryUI.updateUI();
                if (gameInstance.inventoryUI.updateBackpack) gameInstance.inventoryUI.updateBackpack();
            }
            
            return true;
        }
    }
    
    console.log('💀 BRUTE FORCE FAILED: No empty slots found');
    return false;
}
// NEW METHOD: Nuclear UI update sequence
performNuclearUIUpdate() {
    const gameInstance = window.gameInstance;
    if (!gameInstance) return;
    
    console.log('💥 Performing nuclear UI update sequence...');
    
    // Update cycle 1: Immediate
    if (gameInstance.inventoryUI) {
        try {
            console.log('💥 Cycle 1: Immediate updates');
            gameInstance.inventoryUI.updateUI();
            gameInstance.inventoryUI.updateHotbar();
            if (gameInstance.inventoryUI.refresh) gameInstance.inventoryUI.refresh();
        } catch (error) {
            console.warn('💥 Cycle 1 error:', error);
        }
    }
    
    // Update cycle 2-6: Delayed updates
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
            try {
                console.log(`💥 Cycle ${i + 1}: Delayed update`);
                if (gameInstance.inventoryUI) {
                    gameInstance.inventoryUI.updateUI();
                    gameInstance.inventoryUI.updateHotbar();
                }
                if (gameInstance.inventory) {
                    if (gameInstance.inventory.onInventoryChange) {
                        gameInstance.inventory.onInventoryChange();
                    }
                    if (gameInstance.inventory.notifyChange) {
                        gameInstance.inventory.notifyChange();
                    }
                }
                
                // Force held item update
                if (gameInstance.player && gameInstance.inventory) {
                    const selectedItem = gameInstance.inventory.getSelectedItem();
                    gameInstance.player.updateHeldItem(selectedItem);
                }
            } catch (error) {
                console.warn(`💥 Cycle ${i + 1} error:`, error);
            }
        }, i * 100);
    }
  }
  
  showDeliveryPopup(deliveredItems, totalDelivered) {
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventoryUI) {
      console.warn('No inventory UI available for delivery popup');
      return;
    }
    
    // Group items by type for cleaner display
    const itemSummary = {};
    deliveredItems.forEach(({ item, quantity }) => {
      if (itemSummary[item.id]) {
        itemSummary[item.id].quantity += quantity;
      } else {
        itemSummary[item.id] = { item, quantity };
      }
    });
    
    // Show popup for each unique item type delivered
    const summaryEntries = Object.values(itemSummary);
    
    if (summaryEntries.length === 1) {
      // Single item type - show as dog delivery
      const { item, quantity } = summaryEntries[0];
      this.showDogDeliveryPopup(item, quantity);
    } else {
      // Multiple item types - show summary
      this.showMultiItemDeliveryPopup(summaryEntries, totalDelivered);
    }
  }
  
  showDogDeliveryPopup(item, quantity) {
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventoryUI) return;
    
    // Create a custom popup element similar to pickup popup
    const popup = document.createElement('div');
    popup.className = 'pickup-popup';
    popup.style.background = 'linear-gradient(145deg, #90EE90, #98FB98)';
    popup.style.borderColor = '#32CD32';
    
    // Get item icon
    const iconInfo = gameInstance.inventoryUI.getItemIcon(item);
    
    // Create popup content with dog emoji
    popup.innerHTML = `
      <div class="item-icon" style="background-color: ${iconInfo.color};">
        ${iconInfo.icon}
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>${item.name}
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${quantity > 1 ? `${quantity} items` : '1 item'}
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(popup);
    
    // Remove popup after animation
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 3000);
  }
  
  showMultiItemDeliveryPopup(summaryEntries, totalDelivered) {
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventoryUI) return;
    
    // Create a custom popup for multiple items
    const popup = document.createElement('div');
    popup.className = 'pickup-popup';
    popup.style.background = 'linear-gradient(145deg, #90EE90, #98FB98)';
    popup.style.borderColor = '#32CD32';
    popup.style.width = 'auto';
    popup.style.minWidth = '200px';
    
    // Create content with multiple item summary
    let itemIcons = '';
    const maxShow = 3;
    for (let i = 0; i < Math.min(summaryEntries.length, maxShow); i++) {
      const { item } = summaryEntries[i];
      const iconInfo = gameInstance.inventoryUI.getItemIcon(item);
      itemIcons += `<div class="item-icon" style="background-color: ${iconInfo.color}; width: 32px; height: 32px; font-size: 16px; margin: 2px;">${iconInfo.icon}</div>`;
    }
    
    if (summaryEntries.length > maxShow) {
      itemIcons += `<div style="color: #8B4513; font-size: 12px; font-weight: bold;">+${summaryEntries.length - maxShow} more</div>`;
    }
    
    popup.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2px;">
          ${itemIcons}
        </div>
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>Multiple Items
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${totalDelivered} items
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(popup);
    
    // Remove popup after animation
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 3000);
  }
  
  forceInventoryUIUpdate() {
    const gameInstance = window.gameInstance;
    if (!gameInstance?.inventoryUI) return;
    
    console.log('🔄 Forcing comprehensive inventory UI update');
    
    try {
      // Update all UI components
      if (gameInstance.inventoryUI.updateUI) {
        gameInstance.inventoryUI.updateUI();
      }
      if (gameInstance.inventoryUI.updateHotbar) {
        gameInstance.inventoryUI.updateHotbar();
      }
      if (gameInstance.inventoryUI.updateBackpack) {
        gameInstance.inventoryUI.updateBackpack();
      }
      
      // Force recreation of hotbar if possible
      if (gameInstance.inventoryUI.createHotbar && gameInstance.inventoryUI.hotbarContainer) {
        gameInstance.inventoryUI.hotbarContainer.innerHTML = '';
        gameInstance.inventoryUI.createHotbar();
      }
      
      console.log('✅ Inventory UI update completed');
    } catch (error) {
      console.warn('⚠️ Inventory UI update error:', error);
    }
    
    // Delayed updates for reliability
    setTimeout(() => {
      try {
        if (gameInstance.inventoryUI.updateUI) {
          gameInstance.inventoryUI.updateUI();
        }
        if (gameInstance.inventory.onInventoryChange) {
          gameInstance.inventory.onInventoryChange();
        }
      } catch (error) {
        console.warn('⚠️ Delayed inventory update error:', error);
      }
    }, 50);
  }

  rotateTowards(direction, deltaTime) {
    if (direction.length() > 0) {
      const targetRotation = Math.atan2(direction.x, direction.z);
      const currentRotation = this.mesh.rotation.y;
      
      let rotationDiff = targetRotation - currentRotation;
      
      // Normalize rotation difference to [-π, π]
      while (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
      while (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;
      
      const rotationStep = Math.sign(rotationDiff) * Math.min(Math.abs(rotationDiff), this.rotationSpeed * deltaTime);
      this.mesh.rotation.y += rotationStep;
    }
  }

  bark() {
    console.log('🐕 Woof!');
    
    // Play bark animation briefly
    const barkPlayed = this.tryPlayBarkAnimation();
    
    // Return to previous animation after bark
    setTimeout(() => {
      this.restorePreviousAnimation();
    }, barkPlayed ? 1000 : 100); // Shorter timeout if no bark animation
    
    // You could add sound effects here in the future
  }
  tryPlayIdleAnimation() {
    return this.playAnimation('idle') || this.playAnimation('Idle');
  }
  tryPlayWalkAnimation() {
    return this.playAnimation('walk') || this.playAnimation('Walk') || this.playAnimation('run');
  }
  tryPlayBarkAnimation() {
    return this.playAnimation('bark') || this.playAnimation('Bark');
  }
  restorePreviousAnimation() {
    if (this.state === 'idle') {
      this.tryPlayIdleAnimation();
    } else if (this.state === 'following' || this.state === 'wandering' || this.state === 'fetching') {
      // Check if dog is actually moving before playing walk animation
      const isMoving = this.state === 'fetching' || 
                      (this.state === 'following' && this.player?.mesh && 
                       this.mesh.position.distanceTo(this.player.mesh.position) > this.followDistance) ||
                      (this.state === 'wandering' && this.wanderTarget && 
                       this.mesh.position.distanceTo(this.wanderTarget) > 0.5);
      
      if (isMoving) {
        this.tryPlayWalkAnimation();
      } else {
        this.tryPlayIdleAnimation();
      }
    }
  }

  createMouthContainer() {
    // Create a container for items in the dog's mouth
    this.mouthContainer = new THREE.Group();
    
    // Position the mouth container relative to the dog's head
    // Adjust these values based on the dog model's proportions
    this.mouthContainer.position.set(0, 0.2, 0.4); // Forward and up from center
    this.mouthContainer.rotation.set(0, 0, 0);
    this.mouthContainer.scale.set(0.5, 0.5, 0.5); // Scale down items in mouth
    
    // Add the mouth container to the dog mesh
    this.mesh.add(this.mouthContainer);
    
    console.log('Dog mouth container created');
  }
  
  async createItemInMouth(itemId) {
    if (!itemId || !this.mouthContainer) return;
    
    console.log('Creating visual item in dog mouth:', itemId);
    console.log('Current items in mouth:', this.itemsInMouth.length);
    
    // Create a smaller version of the fetched item for the mouth
    let itemMesh;
    
    switch (itemId) {
      case 'apple':
        // Create apple geometry (simplified for mouth)
        const appleGeometry = new THREE.SphereGeometry(0.12, 8, 6);
        const appleMaterial = new THREE.MeshLambertMaterial({ color: 0xFF4444 });
        itemMesh = new THREE.Mesh(appleGeometry, appleMaterial);
        break;
        
      case 'wood':
        // Create wood log geometry
        const woodGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 6);
        const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        itemMesh = new THREE.Mesh(woodGeometry, woodMaterial);
        itemMesh.rotation.z = Math.PI / 2; // Rotate to be horizontal in mouth
        break;
        
      case 'stone':
        // Create stone geometry
        const stoneGeometry = new THREE.DodecahedronGeometry(0.06);
        const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        itemMesh = new THREE.Mesh(stoneGeometry, stoneMaterial);
        break;
        
      default:
        // Default cube for other items
        const defaultGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
        itemMesh = new THREE.Mesh(defaultGeometry, defaultMaterial);
        break;
    }
    
    // Configure the item mesh
    itemMesh.castShadow = true;
    itemMesh.receiveShadow = false;
    
    // Position items in a stacked arrangement
    const itemCount = this.itemsInMouth.length;
    this.positionItemInMouth(itemMesh, itemCount);
    
    // Add to mouth container and tracking array
    this.mouthContainer.add(itemMesh);
    this.itemsInMouth.push(itemMesh);
    
    // Add slight random rotation for natural look
    itemMesh.rotation.x += (Math.random() - 0.5) * 0.3;
    itemMesh.rotation.y += (Math.random() - 0.5) * 0.3;
    itemMesh.rotation.z += (Math.random() - 0.5) * 0.3;
    
    console.log(`Item ${itemCount + 1} created in dog mouth:`, itemId);
    console.log(`Total items in mouth: ${this.itemsInMouth.length}`);
  }
  
  positionItemInMouth(itemMesh, itemIndex) {
    // Base position in the mouth
    const baseX = 0;
    const baseY = -0.08;
    const baseZ = 0.15;
    
    // Stacking arrangement - items get stacked vertically and slightly forward
    const stackOffset = itemIndex * 0.08; // Vertical stacking distance
    const forwardOffset = itemIndex * 0.05; // Slight forward progression
    const sideOffset = (itemIndex % 2) * 0.05 - 0.025; // Alternate left/right slightly
    
    itemMesh.position.set(
      baseX + sideOffset,
      baseY + stackOffset,
      baseZ + forwardOffset
    );
    
    // Scale down items slightly as they stack up (makes it look more natural)
    const scaleReduction = Math.min(itemIndex * 0.1, 0.3);
    const finalScale = 1.0 - scaleReduction;
    itemMesh.scale.setScalar(finalScale);
    
    console.log(`Positioned item ${itemIndex + 1} at:`, itemMesh.position);
  }
  
  removeItemFromMouth() {
    // Remove all items from mouth
    if (this.itemsInMouth.length > 0 && this.mouthContainer) {
      console.log(`Removing ${this.itemsInMouth.length} items from dog mouth`);
      
      for (const itemMesh of this.itemsInMouth) {
        this.mouthContainer.remove(itemMesh);
        
        // Dispose of geometry and material
        if (itemMesh.geometry) itemMesh.geometry.dispose();
        if (itemMesh.material) itemMesh.material.dispose();
      }
      
      this.itemsInMouth = [];
      console.log('All items removed from dog mouth');
    }
  }
  
  removeLatestItemFromMouth() {
    // Remove only the most recently added item (for single item delivery)
    if (this.itemsInMouth.length > 0 && this.mouthContainer) {
      const latestItem = this.itemsInMouth.pop();
      this.mouthContainer.remove(latestItem);
      
      // Dispose of geometry and material
      if (latestItem.geometry) latestItem.geometry.dispose();
      if (latestItem.material) latestItem.material.dispose();
      
      console.log(`Removed latest item from mouth. Remaining: ${this.itemsInMouth.length}`);
      
      // Reposition remaining items for better visual arrangement
      this.repositionRemainingItems();
    }
  }
  
  repositionRemainingItems() {
    // Reposition all remaining items to close gaps after removal
    for (let i = 0; i < this.itemsInMouth.length; i++) {
      this.positionItemInMouth(this.itemsInMouth[i], i);
    }
  }
  removeItemFromGround(targetItem) {
    const itemToRemove = targetItem || this.fetchTarget;
    if (!itemToRemove) return;
    
    console.log('Dog is picking up item - removing item from world');
    
    // Trigger pickup UI fade-out BEFORE removing the item
    if (window.gameInstance && window.gameInstance.inventoryUI && itemToRemove.userData.itemId) {
      window.gameInstance.inventoryUI.cleanupWorldPickupPrompts(itemToRemove.userData.itemId);
    }
    
    // Remove item from scene
    this.scene.remove(itemToRemove);
    
    // Remove from game's pickupable items array
    if (window.gameInstance && window.gameInstance.pickupableItems) {
      const index = window.gameInstance.pickupableItems.indexOf(itemToRemove);
      if (index !== -1) {
        window.gameInstance.pickupableItems.splice(index, 1);
        console.log('Dog removed item from ground:', itemToRemove.userData.itemId);
      }
    }
    
    // Remove from item drop system's tracking array
    if (window.gameInstance && window.gameInstance.itemDropSystem) {
      const dropSystemIndex = window.gameInstance.itemDropSystem.droppedItems.indexOf(itemToRemove);
      if (dropSystemIndex !== -1) {
        window.gameInstance.itemDropSystem.droppedItems.splice(dropSystemIndex, 1);
      }
    }
  }
  
  destroy() {
    // Remove all items from mouth before destroying
    this.removeItemFromMouth();
    
    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
    if (this.mixer) {
      this.mixer.stopAllAction();
    }
  }
}