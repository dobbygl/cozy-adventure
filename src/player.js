import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.mixer = null;
    this.animations = {};
    this.currentAction = null;
    this.isMoving = false;
    this.moveIntensity = 0;
    this.heldItemMesh = null;
    this.heldItemContainer = null;
    this.debugTracerLine = null;
    this.preloadedAxeModel = null;
    this.preloadedAppleModel = null;
    this.isPlayingAxeAnimation = false;
    this.axeHitAction = null;
  }

async load() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      
      loader.load(
        'assets/Player_Model_New.glb',
        async (gltf) => {
          this.mesh = gltf.scene;
          this.mesh.position.set(0, 6.1, 0); // Spawn at Y 6.1 as requested
          this.mesh.scale.setScalar(2.2);
          
          // Set up height adjustment slider
          this.setupHeightSlider();
          
          // Enable shadows and make non-reflective
          this.mesh.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Make materials non-reflective
              if (child.material) {
                if (Array.isArray(child.material)) {
                  // Handle multi-material objects
                  child.material.forEach(mat => {
                    if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                      mat.metalness = 0;
                      mat.roughness = 1;
                    }
                  });
                } else {
                  // Handle single material
                  if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                    child.material.metalness = 0;
                    child.material.roughness = 1;
                  }
                }
              }
            }
          });
          
          // Setup animations
          this.mixer = new THREE.AnimationMixer(this.mesh);
          
          // Only load FBX animations - skip GLTF animations
          try {
            await this.loadFBXAnimations();
          } catch (error) {
            console.error('Failed to load FBX animations:', error);
            reject(error);
            return;
          }
          
          // Start with idle animation
          this.playAnimation('Player_Idle', true);
          
          this.scene.add(this.mesh);
          
          // Create container for held items
          this.createHeldItemContainer();
          
          // Preload both axe and apple models for instant use
          Promise.all([
            this.preloadAxeModel(),
            this.preloadAppleModel()
          ]).then(() => {
            console.log('Axe and apple models preloaded successfully');
            resolve();
          }).catch((error) => {
            console.warn('Failed to preload some models, will load on demand:', error);
            resolve(); // Don't fail player loading if preload fails
          });
        },
        (progress) => {
          // Loading progress
        },
        (error) => {
          console.error('Error loading player model:', error);
          reject(error);
        }
      );
    });
  }
  async loadFBXAnimations() {
    // Load idle first so the character can stand as soon as possible.
    await this.loadFBXAnimation('assets/Player_Idle.fbx', 'Player_Idle');
    // Load the remaining clips in parallel (FBX parsing is the slow part of startup).
    await Promise.all([
      this.loadFBXAnimation('assets/Player_Walking.fbx', 'Player_Walking'),
      this.loadFBXAnimation('assets/Player_Walking_Right.fbx', 'Player_Walking_Right'),
      this.loadFBXAnimation('assets/Player_Walking_Left.fbx', 'Player_Walking_Left'),
      this.loadFBXAnimation('assets/Player_Run.fbx', 'Player_Run'),
      this.loadFBXAnimation('assets/Player_Run_Right.fbx', 'Player_Run_Right'),
      this.loadFBXAnimation('assets/Player_Run_Left.fbx', 'Player_Run_Left'),
      this.loadFBXAnimation('assets/Item_Player_Axe_Hit.fbx', 'Player_Axe_Hit'),
    ]);
  }
  async loadFBXAnimation(url, animationName) {
    return new Promise((resolve, reject) => {
      const fbxLoader = new FBXLoader();
      
      fbxLoader.load(
        url,
        (fbx) => {
          // Extract animation from FBX
          if (fbx.animations && fbx.animations.length > 0) {
            const clip = fbx.animations[0];
            clip.name = animationName;
            
            // Create action for the FBX animation
            const action = this.mixer.clipAction(clip);
            this.animations[animationName] = action;
            
            console.log(`Successfully loaded ${animationName} FBX animation`);
          }
          resolve();
        },
        (progress) => {
          // Loading progress
        },
        (error) => {
          console.error(`Error loading ${animationName} FBX animation:`, error);
          reject(error);
        }
      );
    });
  }
  getAnimationName(fullName) {
    // Extract simple animation name from the full animation path
    const parts = fullName.split('|');
    return parts[parts.length - 1] || fullName;
  }

  playAnimation(animationName, loop = false) {
    if (!this.animations[animationName]) {
      console.warn(`Animation ${animationName} not found`);
      return;
    }

    // Fade out current animation
    if (this.currentAction) {
      this.currentAction.fadeOut(0.2);
    }

    // Fade in new animation
    const action = this.animations[animationName];
    action.reset();
    action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);
    action.fadeIn(0.2);
    action.play();

    this.currentAction = action;
  }
  update(deltaTime, playerController, cameraPosition) {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }
    
    // Update held item visibility and position after animation update
    this.updateHeldItemVisibility();
    if (playerController) {
      // Calculate movement intensity
      const horizontalVelocity = Math.sqrt(
        playerController.velocity.x * playerController.velocity.x +
        playerController.velocity.z * playerController.velocity.z
      );
      const wasMoving = this.isMoving;
      this.isMoving = horizontalVelocity > 0.1;
      
      // Calculate movement intensity based on current speed (walking vs running)
      const baseSpeed = playerController.isRunning ? playerController.runSpeed : playerController.moveSpeed;
      this.moveIntensity = horizontalVelocity / baseSpeed;
      
      // Calculate if camera is behind the player
      const playerToCamera = new THREE.Vector3()
        .subVectors(cameraPosition, this.mesh.position)
        .normalize();
      
      // Get player's forward direction (negative Z in local space)
      const playerForward = new THREE.Vector3(0, 0, -1)
        .applyQuaternion(this.mesh.quaternion);
      
      // Check if camera is behind player (dot product > 0 means camera is behind)
      const isCameraBehind = playerForward.dot(playerToCamera) > 0;
      
      // Check if camera is to the side (low dot product means perpendicular)
      const dotProduct = Math.abs(playerForward.dot(playerToCamera));
      const isCameraAtSide = dotProduct < 0.5; // Camera is roughly perpendicular to player
      
      // Get movement direction based on keys
      const isMovingRight = playerController.keys['KeyD'] && !playerController.keys['KeyA'];
      const isMovingLeft = playerController.keys['KeyA'] && !playerController.keys['KeyD'];
      const isOnlyMovingSideways = (isMovingLeft || isMovingRight) && !playerController.keys['KeyW'] && !playerController.keys['KeyS'];
      
      // Check for diagonal movement
      const isMovingForward = playerController.keys['KeyW'];
      const isMovingBackward = playerController.keys['KeyS'];
      const isDiagonalMovement = (isMovingForward || isMovingBackward) && (isMovingLeft || isMovingRight);
      
      // Store current animation type to prevent unwanted transitions
      const getCurrentAnimationType = () => {
        if (!this.currentAction) return null;
        // Walking animations
        if (this.currentAction === this.animations['Player_Walking_Left']) return 'walk-left';
        if (this.currentAction === this.animations['Player_Walking_Right']) return 'walk-right';
        if (this.currentAction === this.animations['Player_Walking']) return 'walk-forward';
        // Running animations
        if (this.currentAction === this.animations['Player_Run_Left']) return 'run-left';
        if (this.currentAction === this.animations['Player_Run_Right']) return 'run-right';
        if (this.currentAction === this.animations['Player_Run']) return 'run-forward';
        // Idle
        if (this.currentAction === this.animations['Player_Idle']) return 'idle';
        return null;
      };
      // Determine movement direction for animation selection
      if (this.isMoving) {
        // Use standard walk/run animations for all movement types
        const targetAnimation = playerController.isRunning ? 'Player_Run' : 'Player_Walking';
        if (!this.currentAction || this.currentAction !== this.animations[targetAnimation]) {
          this.playAnimation(targetAnimation, true);
        }
      } else {
        // Standing still - maintain the same scale (always normal, no flipping)
        this.mesh.scale.x = Math.abs(this.mesh.scale.x); // Always normal scale
        
        if (wasMoving || !this.currentAction || this.currentAction !== this.animations['Player_Idle']) {
          this.playAnimation('Player_Idle', true);
        }
      }
      
      // Adjust animation speed based on movement type and intensity
      if (this.currentAction) {
        const isWalkingAnimation = (
          this.currentAction === this.animations['Player_Walking'] ||
          this.currentAction === this.animations['Player_Walking_Right'] ||
          this.currentAction === this.animations['Player_Walking_Left']
        );
        
        const isRunningAnimation = (
          this.currentAction === this.animations['Player_Run'] ||
          this.currentAction === this.animations['Player_Run_Right'] ||
          this.currentAction === this.animations['Player_Run_Left']
        );
        
        if (isWalkingAnimation) {
          // Walking animations: slower base speed, scale with movement intensity
          this.currentAction.setEffectiveTimeScale(0.7 + this.moveIntensity * 0.3);
        } else if (isRunningAnimation) {
          // Running animations: keep natural speed without scaling
          this.currentAction.setEffectiveTimeScale(1.0);
        }
      }
    }
  }
  createHeldItemContainer() {
    // Create a container that will be attached to the player's hand bone
    this.heldItemContainer = new THREE.Group();
    
    // Try to find the specific hand bone
    let handBone = null;
    
    // More comprehensive list of possible hand bone names
    const handBoneNames = [
      // Mixamo standard names
      'mixamorig:RightHand',
      'mixamorig:LeftHand',
      'mixamorigRightHand',
      'mixamorigLeftHand',
      // Common variations
      'RightHand', 
      'LeftHand',
      'Right_Hand',
      'Left_Hand',
      'hand_r',
      'hand_l',
      'hand.R',
      'hand.L',
      'HandR',
      'HandL',
      'RHand',
      'LHand',
      // Blender/Generic names
      'Hand_R',
      'Hand_L',
      'hand.r',
      'hand.l',
      // Maya/3ds Max variations
      'R_Hand',
      'L_Hand',
      'RightHandBone',
      'LeftHandBone',
      // Index finger bones (closer to where items should be held)
      'mixamorig:RightHandIndex1',
      'mixamorig:LeftHandIndex1',
      'mixamorigRightHandIndex1',
      'mixamorigLeftHandIndex1',
      'RightHandIndex1',
      'LeftHandIndex1',
      // Wrist bones as fallback
      'mixamorig:RightForeArm',
      'mixamorig:LeftForeArm',
      'RightForeArm',
      'LeftForeArm'
    ];
    
    const allBones = [];
    
    if (this.mesh) {
      this.mesh.traverse((child) => {
        if (child.isBone || child.type === 'Bone') {
          allBones.push(child.name);
          
          // Check for exact matches first
          for (const handName of handBoneNames) {
            if (child.name === handName) {
              handBone = child;
              break;
            }
          }
          
          // If no exact match, check for partial matches
          if (!handBone) {
            const boneName = child.name.toLowerCase();
            if ((boneName.includes('hand') && (boneName.includes('right') || boneName.includes('left') || boneName.includes('r') || boneName.includes('l'))) ||
                (boneName.includes('righthand') || boneName.includes('lefthand')) ||
                (boneName.includes('hand_r') || boneName.includes('hand_l')) ||
                (boneName.includes('hand.r') || boneName.includes('hand.l'))) {
              handBone = child;
            }
            
            // If still no hand bone found, try any bone with 'hand' in the name
            if (!handBone && boneName.includes('hand')) {
              handBone = child;
            }
          }
        }
      });
    }
    
    // Always attach to the player mesh instead of hand bone
    this.mesh.add(this.heldItemContainer);
    
    // Position the held item container at approximate hand location
    this.heldItemContainer.position.set(0.12, 0.85, 0.25);
    this.heldItemContainer.rotation.set(0, 0, 0);
    this.heldItemContainer.scale.set(1.0, 1.0, 1.0);
    
    // Store reference for consistency (but not using hand bone)
    this.handBone = handBone;
  }
  updateHeldItem(itemStack) {
    console.log('Updating held item:', itemStack);
    
    // Remove existing held item
    if (this.heldItemMesh) {
      this.heldItemContainer.remove(this.heldItemMesh);
      this.heldItemMesh = null;
      console.log('Removed previous held item');
    }
    
    // If no item to hold, return
    if (!itemStack || !itemStack.item) {
      console.log('No item to hold');
      return;
    }
    
    // Ensure held item container exists
    if (!this.heldItemContainer) {
      console.log('Held item container not found, recreating...');
      this.createHeldItemContainer();
    }
    
    // Create mesh based on item type
    const item = itemStack.item;
    let geometry, material;
    
    console.log('Creating held item for:', item.name, 'type:', item.type);
    
    switch (item.type) {
      case 'weapon':
        if (item.id === 'sword') {
          geometry = new THREE.BoxGeometry(0.1, 0.04, 1.2);
          material = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 });
        } else if (item.id === 'bow') {
          geometry = new THREE.BoxGeometry(0.1, 1.6, 0.04);
          material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        } else {
          geometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
          material = new THREE.MeshLambertMaterial({ color: 0x666666 });
        }
        break;
        
      case 'tool':
        if (item.id === 'pickaxe') {
          geometry = new THREE.BoxGeometry(0.1, 0.04, 1.0);
          material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        } else if (item.id === 'axe') {
          // Use preloaded axe model for instant display
          if (this.preloadedAxeModel) {
            this.heldItemMesh = this.preloadedAxeModel.clone();
            this.heldItemMesh.castShadow = true;
            this.heldItemMesh.receiveShadow = true;
            this.heldItemMesh.userData.itemName = item.name;
            
            // Position and rotate the axe for natural holding
            this.heldItemMesh.rotation.set(Math.PI, -35 * Math.PI / 180, -105 * Math.PI / 180);
            this.heldItemMesh.position.set(-0.06, 0.02, 0.06);
            this.heldItemMesh.scale.set(0.05, 0.05, 0.05);
            
            this.heldItemContainer.add(this.heldItemMesh);
            console.log('Added preloaded 3D axe model to container (instant)');
            return; // Exit early since we have the model ready
          } else {
            console.warn('Axe model not preloaded, using fallback geometry');
            geometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
            material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
          }
        } else {
          geometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
          material = new THREE.MeshLambertMaterial({ color: 0xFF9800 });
        }
        break;
        
      case 'consumable':
        if (item.id === 'apple') {
          // Use preloaded apple model for instant display
          console.log('Attempting to use preloaded apple model');
          console.log('Player reference:', this.player);
          console.log('Preloaded apple model:', this.preloadedAppleModel);
          
          if (this.preloadedAppleModel) {
            this.heldItemMesh = this.preloadedAppleModel.clone();
            this.heldItemMesh.castShadow = true;
            this.heldItemMesh.receiveShadow = true;
            this.heldItemMesh.userData.itemName = item.name;
            
            // Scale and position the apple appropriately for holding
            this.heldItemMesh.scale.set(0.15, 0.15, 0.15);
            this.heldItemMesh.position.set(0.07, 0.11, 0);
            this.heldItemMesh.rotation.set(180 * Math.PI / 180, 135 * Math.PI / 180, 40 * Math.PI / 180);
            
            this.heldItemContainer.add(this.heldItemMesh);
            console.log('Added preloaded 3D apple model to container (instant)');
            return; // Exit early since we have the model ready
          } else {
            console.warn('Apple model not preloaded, using fallback geometry');
            geometry = new THREE.SphereGeometry(0.16, 12, 8);
            material = new THREE.MeshLambertMaterial({ color: 0xFF4444 });
          }
        } else if (item.id === 'potion') {
          geometry = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 8);
          material = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
        } else {
          geometry = new THREE.SphereGeometry(0.12, 8, 6);
          material = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
        }
        break;
        
      case 'material':
        if (item.id === 'wood') {
          geometry = new THREE.BoxGeometry(0.3, 0.1, 0.6);
          material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        } else if (item.id === 'stone') {
          geometry = new THREE.SphereGeometry(0.16, 8, 6);
          material = new THREE.MeshLambertMaterial({ color: 0x696969 });
        } else if (item.id === 'cube') {
          geometry = new THREE.BoxGeometry(0.24, 0.24, 0.24);
          material = new THREE.MeshLambertMaterial({ color: 0x9E9E9E });
        } else {
          geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
          material = new THREE.MeshLambertMaterial({ color: 0x9E9E9E });
        }
        break;
        
      case 'armor':
        geometry = new THREE.BoxGeometry(0.24, 0.16, 0.24);
        material = new THREE.MeshLambertMaterial({ color: 0x2196F3 });
        break;
        
      default:
        geometry = new THREE.BoxGeometry(0.16, 0.16, 0.16);
        material = new THREE.MeshLambertMaterial({ color: 0x666666 });
    }
    
    // Create the held item mesh
    this.heldItemMesh = new THREE.Mesh(geometry, material);
    this.heldItemMesh.castShadow = true;
    this.heldItemMesh.receiveShadow = true;
    
    // Store item name for UI display
    this.heldItemMesh.userData.itemName = item.name;
    
    // Position and rotate based on item type for natural hand holding - much closer to hand
    if (item.type === 'weapon' && item.id === 'sword') {
      // Sword held like a weapon, pointing upward and slightly forward
      this.heldItemMesh.rotation.set(-Math.PI/4, 0, Math.PI/12);
      this.heldItemMesh.position.set(0.05, 0.02, 0.08);
    } else if (item.type === 'weapon' && item.id === 'bow') {
      // Bow held vertically in hand
      this.heldItemMesh.rotation.set(0, 0, 0);
      this.heldItemMesh.position.set(0.03, 0, 0.02);
    } else if (item.type === 'tool' && item.id === 'pickaxe') {
      // Pickaxe held like a tool, angled naturally
      this.heldItemMesh.rotation.set(-Math.PI/3, 0, Math.PI/8);
      this.heldItemMesh.position.set(0.04, 0.02, 0.08);
    } else if (item.type === 'consumable') {
      // Apple gets specific positioning
      if (item.id === 'apple') {
        this.heldItemMesh.position.set(0.07, 0.11, 0);
        this.heldItemMesh.rotation.set(180 * Math.PI / 180, 135 * Math.PI / 180, 40 * Math.PI / 180);
      } else {
        // Other consumables held close to hand
        this.heldItemMesh.position.set(0.02, 0.01, 0.03);
        this.heldItemMesh.rotation.set(0, 0, 0);
      }
    } else if (item.type === 'material') {
      // Materials held naturally in palm
      this.heldItemMesh.position.set(0.03, 0.015, 0.04);
      this.heldItemMesh.rotation.set(Math.PI/12, 0, 0);
    } else {
      // Default positioning for other items
      this.heldItemMesh.position.set(0.02, 0.01, 0.03);
      this.heldItemMesh.rotation.set(0, 0, 0);
    }
    
    this.heldItemContainer.add(this.heldItemMesh);
    console.log('Added held item to container. Container children:', this.heldItemContainer.children.length);
    console.log('Held item mesh position:', this.heldItemMesh.position);
    console.log('Container world position:', this.heldItemContainer.getWorldPosition(new THREE.Vector3()));
    
    // Make sure the held item is visible
    this.heldItemMesh.visible = true;
    this.heldItemContainer.visible = true;
    
    // Create debug tracer if it doesn't exist
    if (!this.debugTracerLine) {
      this.createDebugTracer();
    }
  }
    
  createDebugTracer() {
    // Create a line geometry for debugging held item position
    const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color: 0xff0000, // Red color for visibility
      linewidth: 5
    });
    
    this.debugTracerLine = new THREE.Line(geometry, material);
    this.debugTracerLine.visible = false; // Hide debug tracer by default
    this.scene.add(this.debugTracerLine);
    console.log('Created debug tracer line (hidden) and added to scene');
  }
  
  updateDebugTracer() {
    if (!this.debugTracerLine || !this.mesh) {
      return;
    }
    
    if (!this.heldItemMesh) {
      // Hide tracer if no held item
      this.debugTracerLine.visible = false;
      return;
    }
    
    // Show tracer when held item exists
    this.debugTracerLine.visible = true;
    
    // Get player chest position (approximate center of body)
    const chestPosition = new THREE.Vector3();
    chestPosition.copy(this.mesh.position);
    chestPosition.y += 1.2; // Chest height
    
    // Get held item world position
    const itemPosition = new THREE.Vector3();
    this.heldItemMesh.getWorldPosition(itemPosition);
    
    // Update line geometry
    const positions = this.debugTracerLine.geometry.attributes.position;
    positions.setXYZ(0, chestPosition.x, chestPosition.y, chestPosition.z);
    positions.setXYZ(1, itemPosition.x, itemPosition.y, itemPosition.z);
    positions.needsUpdate = true;
    
    // Force geometry update
    this.debugTracerLine.geometry.computeBoundingSphere();
    
    // Debug logging
    console.log('Debug tracer updated - Chest:', chestPosition, 'Item:', itemPosition);
    console.log('Tracer visible:', this.debugTracerLine.visible);
  }
  
  updateHeldItemVisibility() {
    // Ensure held item container and its contents remain visible after animation updates
    if (this.heldItemContainer) {
      this.heldItemContainer.visible = true;
      
      // Make sure all children (held items) are visible
      this.heldItemContainer.traverse((child) => {
        if (child.isMesh) {
          child.visible = true;
        }
      });
      
      // Ensure proper scaling is maintained
      this.heldItemContainer.scale.set(1.0, 1.0, 1.0);
      
      // Position the held item container at the hand bone's world position
      if (this.handBone) {
        // Get hand bone world position
        const handWorldPosition = new THREE.Vector3();
        this.handBone.getWorldPosition(handWorldPosition);
        
        // Convert world position to local position relative to player mesh
        const localPosition = new THREE.Vector3();
        this.mesh.worldToLocal(localPosition.copy(handWorldPosition));
        
        // Update held item container position
        this.heldItemContainer.position.copy(localPosition);
        
        // Get hand bone world rotation
        const handWorldQuaternion = new THREE.Quaternion();
        this.handBone.getWorldQuaternion(handWorldQuaternion);
        
        // Convert world quaternion to local quaternion relative to player mesh
        const playerWorldQuaternion = new THREE.Quaternion();
        this.mesh.getWorldQuaternion(playerWorldQuaternion);
        
        // Calculate relative rotation
        const localQuaternion = new THREE.Quaternion();
        localQuaternion.copy(handWorldQuaternion).premultiply(playerWorldQuaternion.invert());
        
        // Update held item container rotation
        this.heldItemContainer.quaternion.copy(localQuaternion);
      }
      
      // Debug: Log hand bone position if available (less frequently)
      if (this.handBone && this.heldItemMesh && Math.random() < 0.001) {
        const worldPos = new THREE.Vector3();
        this.handBone.getWorldPosition(worldPos);
        console.log('Hand bone world position:', worldPos);
        console.log('Held item container visible:', this.heldItemContainer.visible);
        console.log('Held item mesh visible:', this.heldItemMesh.visible);
      }
    }
    
    // Update held item position display
    this.updateHeldItemPositionDisplay();
  }
  
  updateHeldItemPositionDisplay() {
    const itemCoordsElement = document.getElementById('itemCoords');
    if (!itemCoordsElement) {
      return;
    }
    
    // Check if hand bone exists
    if (!this.handBone) {
      itemCoordsElement.innerHTML = `<span style="color: #FFA500;">No hand bone found</span>`;
      return;
    }
    
    // Force update of world matrices to ensure accurate positions
    this.scene.updateWorldMatrix(true, true);
    
    // Get hand bone world position
    let handBonePosition = new THREE.Vector3();
    this.handBone.getWorldPosition(handBonePosition);
    
    // Get player position for reference
    let playerPosition = new THREE.Vector3();
    this.mesh.getWorldPosition(playerPosition);
    
    // Calculate relative position from player
    let relativePosition = new THREE.Vector3();
    relativePosition.subVectors(handBonePosition, playerPosition);
    
    const handBoneName = this.handBone.name || 'unknown';
    
    // Update display with both world and relative coordinates
    itemCoordsElement.innerHTML = `
      <div style="margin-bottom: 8px;">
        <strong>Hand Bone World Position:</strong><br>
        X: ${handBonePosition.x.toFixed(3)}, Y: ${handBonePosition.y.toFixed(3)}, Z: ${handBonePosition.z.toFixed(3)}
      </div>
      <div style="margin-bottom: 8px;">
        <strong>Relative to Player:</strong><br>
        X: ${relativePosition.x.toFixed(3)}, Y: ${relativePosition.y.toFixed(3)}, Z: ${relativePosition.z.toFixed(3)}
      </div>
      <small style="color: #888;">Bone: ${handBoneName}</small>
    `;
    
    // Update player coordinates display
    this.updatePlayerCoordsDisplay();
  }
  
  setupHeightSlider() {
    const slider = document.getElementById('playerHeightSlider');
    const valueDisplay = document.getElementById('playerHeightValue');
    
    if (slider && valueDisplay) {
      // Set initial value to current collider offset
      slider.value = '0.0';
      valueDisplay.textContent = '0.0';
      
      // Store reference to character controller for collider adjustment
      this.colliderOffset = 0.0;
      
      // Add event listener for slider changes
      slider.addEventListener('input', (e) => {
        const newOffset = parseFloat(e.target.value);
        this.colliderOffset = newOffset;
        valueDisplay.textContent = newOffset.toFixed(1);
        
        // Update the character controller's collider offset if it exists
        if (window.gameInstance && window.gameInstance.characterController) {
          window.gameInstance.characterController.colliderOffset = newOffset;
        }
        
        console.log('Collider offset updated to:', newOffset);
      });
      
      console.log('Player collider height slider set up successfully');
    } else {
      console.warn('Height slider elements not found');
    }
  }
  
  updatePlayerCoordsDisplay() {
    const playerCoordsElement = document.getElementById('playerCoords');
    if (!playerCoordsElement || !this.mesh) {
      return;
    }
    
    // Get player world position
    const playerPosition = new THREE.Vector3();
    this.mesh.getWorldPosition(playerPosition);
    
    // Update the display
    playerCoordsElement.textContent = `X: ${playerPosition.x.toFixed(3)}, Y: ${playerPosition.y.toFixed(3)}, Z: ${playerPosition.z.toFixed(3)}`;
  }
  
  async preloadAxeModel() {
    try {
      const loader = new GLTFLoader();
      
      return new Promise((resolve, reject) => {
        loader.load(
          'assets/axe.glb',
          (gltf) => {
            this.preloadedAxeModel = gltf.scene;
            
            // Configure the model
            this.preloadedAxeModel.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Keep original material settings - don't modify metalness/roughness
              }
            });
            
            console.log('Axe model preloaded and configured');
            resolve(this.preloadedAxeModel);
          },
          (progress) => {
            // Loading progress
          },
          (error) => {
            console.error('Error preloading axe model:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Failed to create axe model preloader:', error);
      throw error;
    }
  }
  
  async loadAxeModel() {
    try {
      const loader = new GLTFLoader();
      
      return new Promise((resolve, reject) => {
        loader.load(
          'assets/axe.glb',
          (gltf) => {
            const axeModel = gltf.scene.clone();
            
            // Configure the model
            axeModel.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Keep original material settings - don't modify metalness/roughness
              }
            });
            
            resolve(axeModel);
          },
          (progress) => {
            // Loading progress
          },
          (error) => {
            console.error('Error loading axe model:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Failed to create axe model loader:', error);
      throw error;
    }
  }
  
  async loadAppleModel() {
    try {
      const loader = new GLTFLoader();
      
      return new Promise((resolve, reject) => {
        loader.load(
          'assets/apple.glb',
          (gltf) => {
            const appleModel = gltf.scene.clone();
            
            // Configure the model
            appleModel.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Apply the same material settings as the player model
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    // Handle multi-material objects
                    child.material.forEach(mat => {
                      if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                        mat.metalness = 0;
                        mat.roughness = 1;
                      }
                    });
                  } else {
                    // Handle single material
                    if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                      child.material.metalness = 0;
                      child.material.roughness = 1;
                    }
                  }
                }
              }
            });
            
            resolve(appleModel);
          },
          (progress) => {
            // Loading progress
          },
          (error) => {
            console.error('Error loading apple model:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Failed to create apple model loader:', error);
      throw error;
    }
  }
  
  async preloadAppleModel() {
    try {
      const loader = new GLTFLoader();
      
      return new Promise((resolve, reject) => {
        loader.load(
          'assets/apple.glb',
          (gltf) => {
            this.preloadedAppleModel = gltf.scene;
            
            // Configure the model
            this.preloadedAppleModel.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Apply the same material settings as the player model
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    // Handle multi-material objects
                    child.material.forEach(mat => {
                      if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                        mat.metalness = 0;
                        mat.roughness = 1;
                      }
                    });
                  } else {
                    // Handle single material
                    if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                      child.material.metalness = 0;
                      child.material.roughness = 1;
                    }
                  }
                }
              }
            });
            
            console.log('Apple model preloaded and configured');
            resolve(this.preloadedAppleModel);
          },
          (progress) => {
            // Loading progress
          },
          (error) => {
            console.error('Error preloading apple model:', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Failed to create apple model preloader:', error);
      throw error;
    }
  }
  
  playAxeHitAnimation() {
    // Don't start new animation if already playing
    if (this.isPlayingAxeAnimation) {
      return false;
    }
    
    // Check if axe hit animation is available
    if (!this.animations['Player_Axe_Hit']) {
      console.warn('Axe hit animation not found');
      return false;
    }
    
    // Set animation lock
    this.isPlayingAxeAnimation = true;
    
    // Stop current animation temporarily
    if (this.currentAction) {
      this.currentAction.fadeOut(0.1);
    }
    
    // Play axe hit animation once
    const axeHitAction = this.animations['Player_Axe_Hit'];
    axeHitAction.reset();
    axeHitAction.setLoop(THREE.LoopOnce);
    axeHitAction.clampWhenFinished = true;
    axeHitAction.fadeIn(0.1);
    axeHitAction.play();
    
    // Store reference to axe hit action
    this.axeHitAction = axeHitAction;
    
    // Set up animation finished callback
    const mixer = this.mixer;
    const onAnimationFinished = (event) => {
      if (event.action === axeHitAction) {
        // Animation finished, remove lock
        this.isPlayingAxeAnimation = false;
        this.axeHitAction = null;
        
        // Fade out axe animation and return to appropriate idle/movement animation
        axeHitAction.fadeOut(0.2);
        
        // Resume appropriate animation based on current state
        if (this.isMoving) {
          const targetAnimation = this.moveIntensity > 0.7 ? 'Player_Run' : 'Player_Walking';
          if (this.animations[targetAnimation]) {
            this.playAnimation(targetAnimation, true);
          }
        } else {
          this.playAnimation('Player_Idle', true);
        }
        
        // Remove this specific event listener
        mixer.removeEventListener('finished', onAnimationFinished);
        
        console.log('Axe hit animation completed');
      }
    };
    
    // Add event listener for animation completion
    mixer.addEventListener('finished', onAnimationFinished);
    
    console.log('Playing axe hit animation');
    return true;
  }
  
  canPerformAxeHit() {
    return !this.isPlayingAxeAnimation;
  }
  
}