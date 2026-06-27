import * as THREE from 'three';
import type { CollisionSystem } from './CollisionSystem.js';

/**
 * ThirdPersonCharacterController - A clean, focused character controller
 */
export class ThirdPersonCharacterController {
  character: THREE.Object3D;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  moveSpeed: number;
  runSpeed: number;
  rotationSpeed: number;
  gravity: number;
  velocity: THREE.Vector3;
  isGrounded: boolean;
  isRunning: boolean;
  collisionSystem: CollisionSystem | null;
  colliderOffset: number;
  keys: Record<string, boolean>;
  mouseInput: { x: number; y: number };
  isMouseDown: boolean;
  cameraDistance: number;
  cameraHeight: number;
  cameraAngleH: number;
  cameraAngleV: number;
  mouseSensitivity: number;
  cameraCollisionRadius: number;
  minCameraDistance: number;
  cameraRaycaster: THREE.Raycaster;

  constructor(character: THREE.Object3D, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.character = character;
    this.camera = camera;
    this.renderer = renderer;

    // Movement settings
    this.moveSpeed = 5;
    this.runSpeed = 10;
    this.rotationSpeed = 12;
    this.gravity = 25;

    // State
    this.velocity = new THREE.Vector3();
    this.isGrounded = false; // Start with player falling until they hit ground
    this.isRunning = false;
    this.collisionSystem = null;
    this.colliderOffset = 0.0; // Default collider offset (feet position relative to character center)

    // Input state
    this.keys = {};
    this.mouseInput = { x: 0, y: 0 };
    this.isMouseDown = false;

    // Camera settings
    this.cameraDistance = 8;
    this.cameraHeight = 4;
    this.cameraAngleH = 0; // Horizontal rotation
    this.cameraAngleV = 0.3; // Vertical angle (looking down slightly)
    this.mouseSensitivity = 0.003;

    // Camera collision properties
    this.cameraCollisionRadius = 0.5; // Radius around camera for collision detection
    this.minCameraDistance = 1.5; // Minimum distance camera can be from player
    this.cameraRaycaster = new THREE.Raycaster();

    this.setupInput();
  }

  setCollisionSystem(collisionSystem: CollisionSystem): void {
    this.collisionSystem = collisionSystem;
  }

  setupInput(): void {
    // Keyboard input
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse input for camera
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.mouseInput.x = e.clientX;
      this.mouseInput.y = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isMouseDown) return;

      const deltaX = e.clientX - this.mouseInput.x;
      const deltaY = e.clientY - this.mouseInput.y;

      this.cameraAngleH -= deltaX * this.mouseSensitivity;
      this.cameraAngleV += deltaY * this.mouseSensitivity;

      // Clamp vertical angle
      this.cameraAngleV = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.cameraAngleV));

      this.mouseInput.x = e.clientX;
      this.mouseInput.y = e.clientY;
    });

    // Touch controls for mobile
    let touchStartPos: { x: number; y: number } | null = null;

    this.renderer.domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    });

    this.renderer.domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && touchStartPos) {
        e.preventDefault();

        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartPos.x;
        const deltaY = touch.clientY - touchStartPos.y;

        this.cameraAngleH -= deltaX * this.mouseSensitivity * 2;
        this.cameraAngleV += deltaY * this.mouseSensitivity * 2;

        // Clamp vertical angle
        this.cameraAngleV = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.cameraAngleV));

        touchStartPos = { x: touch.clientX, y: touch.clientY };
      }
    });

    this.renderer.domElement.addEventListener('touchend', () => {
      touchStartPos = null;
    });
  }

  update(deltaTime: number): void {
    this.handleInput(deltaTime);
    this.updatePhysics(deltaTime);
    this.updateCamera();

    // Check for camera collisions and adjust position
    this.handleCameraCollision();
  }

  handleInput(deltaTime: number): void {
    // Check if running
    this.isRunning = this.keys['ShiftLeft'] || this.keys['ShiftRight'];

    // Calculate movement direction relative to camera
    const moveDirection = new THREE.Vector3();

    if (this.keys['KeyW']) moveDirection.z -= 1;
    if (this.keys['KeyS']) moveDirection.z += 1;
    if (this.keys['KeyA']) moveDirection.x -= 1;
    if (this.keys['KeyD']) moveDirection.x += 1;

    // Normalize diagonal movement
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();

      // Rotate movement direction based on camera angle
      moveDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.cameraAngleH);

      // Apply movement speed
      const speed = this.isRunning ? this.runSpeed : this.moveSpeed;
      this.velocity.x = moveDirection.x * speed;
      this.velocity.z = moveDirection.z * speed;

      // Rotate character to face movement direction
      const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);
      const currentAngle = this.character.rotation.y;
      const angleDiff = targetAngle - currentAngle;

      // Normalize angle difference to [-π, π]
      const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

      // Smoothly rotate towards target
      this.character.rotation.y += normalizedDiff * this.rotationSpeed * deltaTime;
    } else {
      // Stop horizontal movement when no input
      this.velocity.x = 0;
      this.velocity.z = 0;
    }

    // Jumping removed
  }

  updatePhysics(deltaTime: number): void {
    // Always apply gravity when not grounded
    if (!this.isGrounded) {
      this.velocity.y -= this.gravity * deltaTime;
    } else {
      // When grounded, ensure no upward velocity remains
      if (this.velocity.y < 0) {
        this.velocity.y = 0;
      }
    }

    // Calculate horizontal movement vector
    const horizontalMovement = new THREE.Vector3(
      this.velocity.x * deltaTime,
      0,
      this.velocity.z * deltaTime
    );

    // Handle horizontal movement with collision detection
    if (this.collisionSystem && horizontalMovement.lengthSq() > 0) {
      const collision = this.collisionSystem.checkHorizontalCollision(
        this.character.position,
        horizontalMovement,
        0.5 // Character radius
      );

      if (collision.hasCollision) {
        this.character.position.copy(collision.correctedPosition);
      } else {
        this.character.position.add(horizontalMovement);
      }
    } else {
      // No collision system or no movement - apply movement directly
      this.character.position.add(horizontalMovement);
    }

    // Apply vertical movement separately (gravity/jumping)
    this.character.position.y += this.velocity.y * deltaTime;

    // Ground collision using collision system
    if (this.collisionSystem) {
      const collisionData = this.collisionSystem.checkGroundCollision(
        this.character.position,
        2.0, // Character height
        0.1 // Ray offset above character position
      );

      if (collisionData.hasCollision) {
        // Calculate distance from character feet to ground using adjustable offset
        // groundHeight is non-null whenever hasCollision is true.
        const characterFeetY = this.character.position.y - this.colliderOffset;
        const distanceToGround = characterFeetY - collisionData.groundHeight!;

        // Ground detection threshold - allow small tolerance for floating point precision
        const groundThreshold = 0.1;

        // Character is on ground if feet are at or below ground level and falling/stationary
        if (distanceToGround <= groundThreshold && this.velocity.y <= 0) {
          // Snap character to ground position using adjustable offset
          this.character.position.y = collisionData.groundHeight! + this.colliderOffset;
          this.velocity.y = 0;
          this.isGrounded = true;
        } else {
          // Character is above ground - continue falling
          this.isGrounded = false;
        }
      } else {
        // No ground detected - character is falling
        this.isGrounded = false;
      }
    } else {
      // No collision system available - default to falling
      this.isGrounded = false;
    }
  }

  updateCamera(): void {
    // Calculate camera position based on character position and angles
    const characterPos = this.character.position.clone();

    // Calculate horizontal distance accounting for vertical angle
    const horizontalDistance = this.cameraDistance * Math.cos(this.cameraAngleV);
    const verticalOffset = this.cameraHeight + this.cameraDistance * Math.sin(this.cameraAngleV);

    // Position camera behind and above character
    const cameraOffset = new THREE.Vector3(
      Math.sin(this.cameraAngleH) * horizontalDistance,
      verticalOffset,
      Math.cos(this.cameraAngleH) * horizontalDistance
    );

    this.camera.position.copy(characterPos).add(cameraOffset);

    // Look at character with slight upward offset
    const lookAtTarget = characterPos.clone();
    lookAtTarget.y += 1.5;
    this.camera.lookAt(lookAtTarget);
  }

  handleCameraCollision(): void {
    // Safety checks to prevent runtime errors
    if (
      !this.collisionSystem ||
      !this.collisionSystem.colliders ||
      !Array.isArray(this.collisionSystem.colliders) ||
      this.collisionSystem.colliders.length === 0
    ) {
      return;
    }

    // Extract mesh objects from collider objects and flatten into array
    const meshesToTest: THREE.Object3D[] = [];

    for (const collider of this.collisionSystem.colliders) {
      if (collider && collider.mesh) {
        // Add the collider mesh and all its children to the test array
        collider.mesh.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh && mesh.geometry && mesh.layers !== undefined) {
            meshesToTest.push(mesh);
          }
        });
      }
    }

    if (meshesToTest.length === 0) return;

    const playerPosition = this.character.position.clone();
    const cameraPosition = this.camera.position.clone();

    // Calculate direction from player to camera
    const cameraDirection = cameraPosition.clone().sub(playerPosition).normalize();
    const originalDistance = playerPosition.distanceTo(cameraPosition);

    // Cast ray from player to camera to check for obstacles
    this.cameraRaycaster.set(playerPosition, cameraDirection);

    // Check collision with extracted meshes
    const intersections = this.cameraRaycaster.intersectObjects(meshesToTest, false);

    if (intersections.length > 0) {
      // Find the closest intersection
      const closestIntersection = intersections[0];
      const intersectionDistance = closestIntersection.distance;

      // If there's an obstacle between player and camera, move camera closer
      if (intersectionDistance < originalDistance) {
        // Calculate new camera position, slightly closer to player than the intersection
        const safeDistance = Math.max(
          intersectionDistance - this.cameraCollisionRadius,
          this.minCameraDistance
        );

        const newCameraPosition = playerPosition.clone().add(cameraDirection.multiplyScalar(safeDistance));

        // Immediately set camera position when collision detected (no lerp delay)
        this.camera.position.copy(newCameraPosition);

        // Update look-at target to maintain proper camera orientation
        const lookAtTarget = playerPosition.clone();
        lookAtTarget.y += 1.5;
        this.camera.lookAt(lookAtTarget);
      }
    }
  }

  getMovementState(): 'idle' | 'running' | 'walking' {
    const horizontalSpeed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z
    );

    if (horizontalSpeed < 0.1) return 'idle';
    if (this.isRunning) return 'running';
    return 'walking';
  }

  destroy(): void {
    // Clean up event listeners if needed
  }
}
