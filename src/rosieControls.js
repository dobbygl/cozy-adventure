import * as THREE from 'three';
import { MobileControls } from './rosieMobileControls.js';

/**
 * PlayerController - Handles player movement and physics
 */
class PlayerController {
  constructor(player, options = {}) {
    this.player = player;

    // Configuration
    this.moveSpeed = options.moveSpeed || 10;
    this.runSpeed = options.runSpeed || 18;
    this.jumpForce = options.jumpForce || 15;
    this.gravity = options.gravity || 30;
    this.groundLevel = options.groundLevel || 0; // Ground level at y=0
    // State
    this.velocity = new THREE.Vector3();
    this.isOnGround = true;
    this.canJump = true;
    this.keys = {};
    this.cameraMode = 'third-person'; // Default camera mode
    this.isRunning = false;

    // Setup input handlers
    this.setupInput();
    // Mobile controls disabled
    this.mobileControls = null;
  }

  setupInput() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  setCameraMode(mode) {
    this.cameraMode = mode;
  }

  /**
   * Updates the player's state, velocity, and position.
   * @param {number} deltaTime Time elapsed since the last frame.
   * @param {number} cameraRotation The current horizontal rotation (yaw) of the active camera.
   * @param {THREE.Vector3} cameraPosition The current position of the camera.
   */
  update(deltaTime, cameraRotation, cameraPosition) {
    // Apply gravity
    // Check if the player's base (accounting for model offset) is above ground
    // Player model is positioned at y = -0.5, so the actual base is at player.position.y + 0.5
    const playerBaseY = this.player.position.y + 0.5;
    if (playerBaseY > this.groundLevel) {
      this.velocity.y -= this.gravity * deltaTime;
      this.isOnGround = false;
    } else {
      // Clamp player to ground level and reset vertical velocity
      this.velocity.y = Math.max(0, this.velocity.y); // Stop downward velocity, allow upward (jump)
      this.player.position.y = this.groundLevel - 0.5; // Account for model offset
      this.isOnGround = true;
      this.canJump = true; // Can jump again once grounded
    }

    // Jumping functionality removed

    // --- Horizontal Movement ---

    // Reset horizontal velocity each frame
    // We calculate desired movement directly based on input and camera
    let moveX = 0;
    let moveZ = 0;

    // Calculate movement direction vectors relative to the camera's horizontal rotation
    // Forward direction (local -Z) rotated by camera yaw
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotation);
    // Right direction (local +X) rotated by camera yaw
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotation);

    // Check if running (Shift key held)
    this.isRunning = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
    
    // Apply movement based on keys pressed
    const currentMoveSpeed = this.isRunning ? this.runSpeed : this.moveSpeed;
    if (this.keys['KeyW']) { // Forward
      moveX += forward.x;
      moveZ += forward.z;
    }
    if (this.keys['KeyS']) { // Backward
      moveX -= forward.x;
      moveZ -= forward.z;
    }
    if (this.keys['KeyA']) { // Left
      moveX -= right.x;
      moveZ -= right.z;
    }
    if (this.keys['KeyD']) { // Right
      moveX += right.x;
      moveZ += right.z;
    }

    // Normalize the movement vector if moving diagonally
    const moveDirection = new THREE.Vector3(moveX, 0, moveZ);
    if (moveDirection.lengthSq() > 0) { // Check if there's any horizontal movement input
        moveDirection.normalize();
    }

    // Apply speed and deltaTime to get the displacement for this frame
    this.velocity.x = moveDirection.x * currentMoveSpeed;
    this.velocity.z = moveDirection.z * currentMoveSpeed;


    // --- Update Player Position ---
    // Apply calculated velocity scaled by deltaTime
    this.player.position.x += this.velocity.x * deltaTime;
    this.player.position.y += this.velocity.y * deltaTime; // Vertical velocity already includes gravity effect
    this.player.position.z += this.velocity.z * deltaTime;


    // --- Update Player Rotation ---
    // Rotate player model to face movement direction (only in third-person mode)
    // In first-person mode, the FirstPersonCameraController handles player rotation.
    // Check for movement patterns
    const isOnlyMovingLeft = this.keys['KeyA'] && !this.keys['KeyD'] && !this.keys['KeyW'] && !this.keys['KeyS'];
    const isOnlyMovingRight = this.keys['KeyD'] && !this.keys['KeyA'] && !this.keys['KeyW'] && !this.keys['KeyS'];
    const isOnlyMovingSideways = isOnlyMovingLeft || isOnlyMovingRight;
    const isOnlyMovingForward = this.keys['KeyW'] && !this.keys['KeyS'] && !this.keys['KeyA'] && !this.keys['KeyD'];
    const isOnlyMovingBackward = this.keys['KeyS'] && !this.keys['KeyW'] && !this.keys['KeyA'] && !this.keys['KeyD'];
    
    // Check if moving diagonally (multiple movement keys pressed)
    const movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
    const pressedMovementKeys = movementKeys.filter(key => this.keys[key]);
    const isDiagonalMovement = pressedMovementKeys.length > 1;
    
    if (this.cameraMode === 'third-person' && (this.velocity.x !== 0 || this.velocity.z !== 0)) {
      // Check if moving forward or backward (W or S key pressed)
      const isMovingForward = this.keys['KeyW'];
      const isMovingBackward = this.keys['KeyS'];
      const isMovingLeft = this.keys['KeyA'];
      const isMovingRight = this.keys['KeyD'];
      
      // Check for diagonal movement
      const isDiagonalMovement = (isMovingForward || isMovingBackward) && (isMovingLeft || isMovingRight) &&
                                !(isMovingForward && isMovingBackward) && !(isMovingLeft && isMovingRight);
      
      if (isDiagonalMovement) {
        // For diagonal movement, don't rotate - just keep current rotation
        // The player animation system will handle facing direction
      } else if (isMovingForward) {
        // Pure forward movement - rotate instantly to face movement direction
        const angle = Math.atan2(this.velocity.x, this.velocity.z);
        this.player.rotation.y = angle;
      } else if (isMovingBackward) {
        // Pure backward movement - handle camera relationship
        const playerToCameraDirection = new THREE.Vector3()
          .subVectors(cameraPosition, this.player.position)
          .normalize();
        
        // Get player's current forward direction
        const playerForward = new THREE.Vector3(0, 0, -1)
          .applyQuaternion(this.player.quaternion);
        
        // Check if camera is behind player (dot product > 0 means camera is behind)
        const isCameraBehind = playerForward.dot(playerToCameraDirection) > 0;
        
        if (isCameraBehind) {
          // Rotate player instantly to face the camera when moving backward and camera is behind
          const angle = Math.atan2(playerToCameraDirection.x, playerToCameraDirection.z);
          this.player.rotation.y = angle;
        } else {
          // Camera is in front, use normal movement direction
          const angle = Math.atan2(this.velocity.x, this.velocity.z);
          this.player.rotation.y = angle;
        }
      }
      // Don't rotate for pure sideways movement (A or D only)
    }
     // If not moving in third-person, the player keeps their last rotation.
     // In first-person mode, the player's rotation is handled entirely by
     // the FirstPersonCameraController synchronizing with the mouse look.
  }

  destroy() {
    // Clean up mobile controls
    if (this.mobileControls) {
      this.mobileControls.destroy();
    }
  }
}

/**
 * ThirdPersonCameraController - Handles third-person camera positioning and rotation
 */
class ThirdPersonCameraController {
  constructor(camera, target, domElement, options = {}) {
    this.camera = camera;
    this.target = target;
    this.domElement = domElement;
    // Configuration
    this.distance = options.distance || 7;
    this.height = options.height || 3;
    this.rotationSpeed = options.rotationSpeed || 0.003;
    this.minVerticalAngle = -Math.PI / 3; // -60 degrees
    this.maxVerticalAngle = Math.PI / 3;  // 60 degrees
    // State
    this.horizontalRotation = 0;
    this.verticalRotation = 0;
    this.isDragging = false;
    this.enabled = true;
    // Setup mouse controls
    this.setupMouseControls();
  }

  setupMouseControls() {
    // Mouse drag controls
    this.domElement.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      this.isDragging = true;
      this.mousePosition = { x: e.clientX, y: e.clientY };
    });
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || !this.isDragging) return;
      const deltaX = e.clientX - this.mousePosition.x;
      const deltaY = e.clientY - this.mousePosition.y;
      this.horizontalRotation -= deltaX * this.rotationSpeed;
      this.verticalRotation += deltaY * this.rotationSpeed;
      // Clamp vertical rotation
      this.verticalRotation = Math.max(
        this.minVerticalAngle,
        Math.min(this.maxVerticalAngle, this.verticalRotation)
      );
      this.mousePosition = { x: e.clientX, y: e.clientY };
    });
    // Touch controls for mobile (only if mobile)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      let touchStart = null;
      
      this.domElement.addEventListener('touchstart', (e) => {
        if (!this.enabled || e.touches.length !== 1) return;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
      });
      this.domElement.addEventListener('touchmove', (e) => {
        if (!this.enabled || !touchStart || e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        
        this.horizontalRotation -= deltaX * this.rotationSpeed * 2;
        this.verticalRotation += deltaY * this.rotationSpeed * 2;
        // Clamp vertical rotation
        this.verticalRotation = Math.max(
          this.minVerticalAngle,
          Math.min(this.maxVerticalAngle, this.verticalRotation)
        );
        
        touchStart = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
      });
      this.domElement.addEventListener('touchend', (e) => {
        touchStart = null;
        e.preventDefault();
      });
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    this.isDragging = false;
  }

  update() {
    if (!this.enabled) return 0;
    // Calculate camera position with both horizontal and vertical rotation
    const horizontalDistance = this.distance * Math.cos(this.verticalRotation);
    const verticalOffset = this.height + (this.distance * Math.sin(this.verticalRotation));
    const offset = new THREE.Vector3(
      Math.sin(this.horizontalRotation) * horizontalDistance,
      verticalOffset,
      Math.cos(this.horizontalRotation) * horizontalDistance
    );
    // Position camera
    this.camera.position.copy(this.target.position).add(offset);
    // Look at target with slight upward offset
    const lookAtTarget = new THREE.Vector3(
      this.target.position.x,
      this.target.position.y + 1,
      this.target.position.z
    );
    this.camera.lookAt(lookAtTarget);
    return this.horizontalRotation; // Return horizontal rotation for player movement
  }

  destroy() {
    // Camera cleanup if needed
  }
}

/**
 * FirstPersonCameraController - Handles first-person camera controls
 */
class FirstPersonCameraController {
  constructor(camera, player, domElement, options = {}) {
    this.camera = camera;
    this.player = player;
    this.domElement = domElement;

    // Configuration
    this.eyeHeight = options.eyeHeight || 1.6;
    this.mouseSensitivity = options.mouseSensitivity || 0.002;

    // State
    this.enabled = false;
    this.rotationY = 0;
    this.rotationX = 0;

    // Setup mouse controls
    this.setupMouseControls();
  }

  setupMouseControls() {
    // Desktop pointer lock
    this.domElement.addEventListener('click', () => {
      if (this.enabled && document.pointerLockElement !== this.domElement) {
        this.domElement.requestPointerLock();
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || document.pointerLockElement !== this.domElement) return;

      this.rotationY -= e.movementX * this.mouseSensitivity;
      this.rotationX -= e.movementY * this.mouseSensitivity;

      // Limit vertical rotation
      this.rotationX = Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, this.rotationX));
    });

    // Touch controls for mobile (only if mobile)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      let touchStart = null;
      
      // Helper function to check if touch is over mobile UI elements
      const isTouchOverMobileUI = (touch) => {
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        return element && (
          element.id === 'mobile-game-controls' ||
          element.id === 'virtual-joystick' ||
          element.id === 'virtual-joystick-knob' ||
          element.id === 'jump-button' ||
          element.closest('#mobile-game-controls')
        );
      };
      
      this.domElement.addEventListener('touchstart', (e) => {
        if (!this.enabled || e.touches.length !== 1) return;
        
        // Don't handle touch if it's over mobile UI
        if (isTouchOverMobileUI(e.touches[0])) return;
        
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
      });

      this.domElement.addEventListener('touchmove', (e) => {
        if (!this.enabled || !touchStart || e.touches.length !== 1) return;
        
        // Don't handle touch if it started over mobile UI
        if (isTouchOverMobileUI(e.touches[0])) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        
        this.rotationY -= deltaX * this.mouseSensitivity * 2;
        this.rotationX -= deltaY * this.mouseSensitivity * 2;
        this.rotationX = Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, this.rotationX));
        
        touchStart = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
      });

      this.domElement.addEventListener('touchend', (e) => {
        touchStart = null;
        e.preventDefault();
      });
    }
  }

  enable() {
    this.enabled = true;

    // Note: rotationY will be set by setCameraMode before this is called
    this.rotationX = 0;

    // Hide player when in first-person mode
    this.hidePlayer();
  }

  disable() {
    this.enabled = false;

    // Show player when exiting first-person mode
    this.showPlayer();

    if (document.pointerLockElement === this.domElement) {
      document.exitPointerLock();
    }
  }

  hidePlayer() {
    // Store current player model visibility state
    this.originalVisibility = [];
    this.player.traverse(child => {
      if (child.isMesh) {
        this.originalVisibility.push({
          object: child,
          visible: child.visible
        });
        child.visible = false;
      }
    });
  }

  showPlayer() {
    // Restore player model visibility
    if (this.originalVisibility) {
      this.originalVisibility.forEach(item => {
        item.object.visible = item.visible;
      });
      this.originalVisibility = null;
    }
  }

  update() {
    if (!this.enabled) return 0;

    // Set player rotation to match camera's horizontal rotation
    this.player.rotation.y = this.rotationY;

    // Position camera at player eye height
    this.camera.position.x = this.player.position.x;
    this.camera.position.y = this.player.position.y + this.eyeHeight;
    this.camera.position.z = this.player.position.z;

    // Set camera rotation
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.x = this.rotationX;
    this.camera.rotation.y = this.rotationY;

    return this.rotationY;
  }
}

export { PlayerController, ThirdPersonCameraController, FirstPersonCameraController };