import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CompanionLocomotion } from '../../src/companion/CompanionLocomotion.js';

// Characterization tests for the steering lifted from DogCompanion's repeated
// movement blocks + rotateTowards (Fase 3). The fiddly part is rotateTowards:
// the [-π, π] normalization and the per-frame turn cap, which are easy to break
// when moving code.

function body(x = 0, y = 0, z = 0): THREE.Object3D {
  const o = new THREE.Object3D();
  o.position.set(x, y, z);
  return o;
}

describe('CompanionLocomotion', () => {
  it('steps horizontally toward the target without changing y', () => {
    const loco = new CompanionLocomotion({ rotationSpeed: 1000 }); // snap rotation, focus on translation
    // Target at the same height: in-game the companion and its target sit on the
    // ground, so the horizontal step is the full speed*dt. (The direction is
    // normalized in 3D, so a y-offset would shorten the horizontal component —
    // faithful to the original movement blocks.)
    const b = body(0, 7, 0);
    loco.moveToward(b, new THREE.Vector3(10, 7, 0), 5, 0.1); // 5 u/s * 0.1s = 0.5 along +x
    expect(b.position.x).toBeCloseTo(0.5, 5);
    expect(b.position.z).toBeCloseTo(0, 5);
    expect(b.position.y).toBe(7); // vertical untouched (physics owns it)
  });

  it('returns the unit direction toward the target', () => {
    const loco = new CompanionLocomotion();
    const dir = loco.moveToward(body(), new THREE.Vector3(0, 0, 4), 0, 0.016); // speed 0: pure direction
    expect(dir.x).toBeCloseTo(0, 5);
    expect(dir.z).toBeCloseTo(1, 5);
  });

  it('faces +x (yaw = π/2) when moving along +x with enough turn budget', () => {
    const loco = new CompanionLocomotion({ rotationSpeed: 1000 });
    const b = body();
    loco.rotateTowards(b, new THREE.Vector3(1, 0, 0), 1);
    expect(b.rotation.y).toBeCloseTo(Math.PI / 2, 5); // atan2(1, 0)
  });

  it('caps the turn to rotationSpeed * dt per frame', () => {
    const loco = new CompanionLocomotion({ rotationSpeed: 2 });
    const b = body(); // facing yaw 0, target is +x (yaw π/2 ≈ 1.571)
    loco.rotateTowards(b, new THREE.Vector3(1, 0, 0), 0.1); // budget 0.2 rad < 1.571
    expect(b.rotation.y).toBeCloseTo(0.2, 5);
  });

  it('turns the short way across the ±π seam instead of unwinding', () => {
    const loco = new CompanionLocomotion({ rotationSpeed: 1000 });
    const b = body();
    b.rotation.y = Math.PI - 0.1; // just shy of +π
    // Target yaw atan2(-1, 0) = -π/2; naive diff would be a big negative sweep,
    // but normalized it should step the short way (increasing past +π).
    loco.rotateTowards(b, new THREE.Vector3(-1, 0, 0), 1);
    // Short path from (π - 0.1) to -π/2 wraps forward; assert it did NOT unwind backwards.
    expect(b.rotation.y).toBeGreaterThan(Math.PI - 0.1);
  });
});
