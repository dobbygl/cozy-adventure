import * as THREE from 'three';
import type { GroundProvider } from './ports.js';

export interface CompanionPhysicsOptions {
  /** Downward acceleration while airborne (units/s²). */
  gravity?: number;
  /** Fallback floor height when no ground collider resolves. */
  groundLevel?: number;
}

/**
 * Gravity + ground following for a companion body, extracted verbatim from
 * DogCompanion.updatePhysics (Fase 2). It owns the vertical state (velocity,
 * isOnGround) and mutates a body's position.y in place each frame.
 *
 * The ground collider is resolved lazily through a GroundProvider every frame,
 * preserving the original late-binding: detection works the instant the
 * collision system exists, tolerates it being absent, and picks up a swap.
 */
export class CompanionPhysics {
  readonly velocity = new THREE.Vector3();
  isOnGround = false;
  private readonly gravity: number;
  private readonly groundLevel: number;
  private readonly ground: GroundProvider;

  constructor(ground: GroundProvider, options: CompanionPhysicsOptions = {}) {
    this.ground = ground;
    this.gravity = options.gravity ?? -15;
    this.groundLevel = options.groundLevel ?? 0;
  }

  update(body: THREE.Object3D, deltaTime: number): void {
    // Use collision system for proper ground detection if available
    const collider = this.ground();
    if (collider) {
      const groundCheck = collider.checkGroundCollision(
        body.position,
        1.0, // character height
        0.1, // ray offset
      );

      if (groundCheck.hasCollision) {
        // Set companion position to ground height
        body.position.y = groundCheck.groundHeight!;
        this.velocity.y = 0;
        this.isOnGround = true;
      } else {
        // Apply gravity if no ground found
        if (!this.isOnGround) {
          this.velocity.y += this.gravity * deltaTime;
        }

        // Apply vertical velocity
        body.position.y += this.velocity.y * deltaTime;

        // Fallback ground level check
        if (body.position.y <= this.groundLevel) {
          body.position.y = this.groundLevel;
          this.velocity.y = 0;
          this.isOnGround = true;
        } else {
          this.isOnGround = false;
        }
      }
    } else {
      // Fallback: simple ground level enforcement
      body.position.y = Math.max(body.position.y, this.groundLevel);
      this.velocity.y = 0;
      this.isOnGround = true;
    }
  }
}
