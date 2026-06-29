import * as THREE from 'three';

export interface CompanionLocomotionOptions {
  /** Max turn rate in radians/s when facing the movement direction. */
  rotationSpeed?: number;
}

/**
 * Horizontal steering for a companion body: move toward a point and turn to face
 * it. Extracted from the movement blocks repeated across DogCompanion's state
 * methods plus rotateTowards (Fase 3). Vertical motion stays with
 * CompanionPhysics; this only touches x/z position and rotation.y.
 *
 * Pure and companion-agnostic, so every companion (and its tests) shares the
 * same turn/step math.
 */
export class CompanionLocomotion {
  private readonly rotationSpeed: number;

  constructor(options: CompanionLocomotionOptions = {}) {
    this.rotationSpeed = options.rotationSpeed ?? 8;
  }

  /**
   * Step `body` horizontally toward `target` at `speed` units/s and rotate it to
   * face the movement. Returns the unit direction used (zero-length when already
   * on top of the target).
   */
  moveToward(
    body: THREE.Object3D,
    target: THREE.Vector3,
    speed: number,
    deltaTime: number,
  ): THREE.Vector3 {
    const direction = new THREE.Vector3().subVectors(target, body.position).normalize();

    // Only move horizontally, let physics handle vertical movement
    const movement = new THREE.Vector3(
      direction.x * speed * deltaTime,
      0,
      direction.z * speed * deltaTime,
    );
    body.position.add(movement);

    this.rotateTowards(body, direction, deltaTime);
    return direction;
  }

  rotateTowards(body: THREE.Object3D, direction: THREE.Vector3, deltaTime: number): void {
    if (direction.length() > 0) {
      const targetRotation = Math.atan2(direction.x, direction.z);
      const currentRotation = body.rotation.y;

      let rotationDiff = targetRotation - currentRotation;

      // Normalize rotation difference to [-π, π]
      while (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
      while (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;

      const rotationStep =
        Math.sign(rotationDiff) * Math.min(Math.abs(rotationDiff), this.rotationSpeed * deltaTime);
      body.rotation.y += rotationStep;
    }
  }
}
