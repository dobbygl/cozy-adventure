import type * as THREE from 'three';

/**
 * The seams a companion needs into the rest of the game. They exist so the
 * companion never reaches for the `window.gameInstance` global directly: the
 * game wires concrete implementations in, and tests pass fakes.
 *
 * Each port is resolved through a GETTER, not a captured instance, because the
 * dependencies a companion needs (collision system, inventory, ...) may be
 * created after the companion and may be swapped at runtime. Capturing them in
 * the constructor would reintroduce the init-order fragility the old per-frame
 * `window.gameInstance.collisionSystem` lookup quietly avoided.
 */

/** The slice of CollisionSystem a companion uses to stay on the ground. */
export interface GroundCollider {
  checkGroundCollision(
    position: THREE.Vector3,
    height?: number,
    rayOffset?: number,
  ): { hasCollision: boolean; groundHeight: number | null };
}

/** Lazily resolves the active ground collider, or null when none exists yet. */
export type GroundProvider = () => GroundCollider | null;
