import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CompanionPhysics } from '../../src/companion/CompanionPhysics.js';
import type { GroundCollider } from '../../src/companion/ports.js';

// Characterization tests for the gravity + ground-following lifted out of
// DogCompanion.updatePhysics (Fase 2). The notable case is the GroundProvider
// getter: it must pick up a collision system that appears AFTER the companion,
// which is the late-binding the old per-frame window lookup gave for free.

/** Flat ground plane at y = 0, mimicking CollisionSystem's downward-ray semantics. */
function flatGround(): GroundCollider {
  return {
    checkGroundCollision(position, _height = 1.0, rayOffset = 0.1) {
      const rayOriginY = position.y + rayOffset;
      if (rayOriginY >= 0) {
        return { hasCollision: true, groundHeight: 0 };
      }
      return { hasCollision: false, groundHeight: null };
    },
  };
}

function bodyAt(y: number): THREE.Object3D {
  const o = new THREE.Object3D();
  o.position.set(0, y, 0);
  return o;
}

describe('CompanionPhysics', () => {
  it('snaps to ground height and grounds the body when a collider reports a hit', () => {
    const physics = new CompanionPhysics(() => flatGround());
    const body = bodyAt(5);
    physics.update(body, 0.016);
    expect(body.position.y).toBe(0);
    expect(physics.isOnGround).toBe(true);
    expect(physics.velocity.y).toBe(0);
  });

  it('falls under gravity while the collider reports no ground below', () => {
    const noGround: GroundCollider = {
      checkGroundCollision: () => ({ hasCollision: false, groundHeight: null }),
    };
    // Start above the fallback groundLevel so gravity has room to act.
    const physics = new CompanionPhysics(() => noGround, { groundLevel: -100 });
    const body = bodyAt(10);
    physics.update(body, 0.1); // first frame: still grounded flag false -> accel applies
    expect(physics.isOnGround).toBe(false);
    expect(body.position.y).toBeLessThan(10);
    expect(physics.velocity.y).toBeLessThan(0);
  });

  it('clamps to groundLevel and grounds the body when no collider resolves', () => {
    const physics = new CompanionPhysics(() => null, { groundLevel: 2 });
    const below = bodyAt(-3);
    physics.update(below, 0.016);
    expect(below.position.y).toBe(2); // raised to the floor
    expect(physics.isOnGround).toBe(true);
  });

  it('late-binds the collider: a provider that returns null then a collider works once it appears', () => {
    let collider: GroundCollider | null = null;
    const physics = new CompanionPhysics(() => collider, { groundLevel: -100 });
    const body = bodyAt(5);

    physics.update(body, 0.016); // no collider yet -> clamp path, stays put (above -100)
    expect(body.position.y).toBe(5);

    collider = flatGround(); // collision system comes online
    physics.update(body, 0.016); // now the getter resolves it
    expect(body.position.y).toBe(0);
    expect(physics.isOnGround).toBe(true);
  });
});
