// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { ThirdPersonCharacterController } from '../src/CharacterController.js';

// A faithful stand-in for CollisionSystem with a flat ground plane at y = 0.
// Crucially it mimics the REAL raycast semantics: checkGroundCollision casts a
// ray straight down from (position.y + rayOffset), so the ground is only
// detected when that origin is above the plane. A naive landing check can
// therefore lose the ground entirely if the character overshoots below it in a
// single frame — which is exactly the floor-tunnelling bug this guards against.
function flatGround() {
  const up = new THREE.Vector3(0, 1, 0);
  return {
    colliders: [],
    checkGroundCollision(position: THREE.Vector3, _height = 2.0, rayOffset = 0.1) {
      const rayOriginY = position.y + rayOffset;
      if (rayOriginY >= 0) {
        return { hasCollision: true, groundHeight: 0, distance: rayOriginY, normal: up.clone(), collider: null };
      }
      return { hasCollision: false, groundHeight: null, distance: Infinity, normal: up.clone(), collider: null };
    },
    checkHorizontalCollision(position: THREE.Vector3) {
      return { hasCollision: false, correctedPosition: position.clone(), normal: up.clone() };
    },
  };
}

function makeController() {
  const character = new THREE.Object3D();
  const camera = new THREE.PerspectiveCamera();
  // updatePhysics/handleInput never touch WebGL; a canvas stub satisfies setupInput.
  const renderer = { domElement: document.createElement('canvas') };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controller = new ThirdPersonCharacterController(character, camera, renderer as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller.setCollisionSystem(flatGround() as any);
  return controller;
}

describe('ThirdPersonCharacterController vertical physics', () => {
  let controller: ThirdPersonCharacterController;

  beforeEach(() => {
    controller = makeController();
  });

  it('never tunnels through the floor on a fast fall, even at a low framerate', () => {
    controller.character.position.set(0, 3, 0);
    controller.velocity.set(0, 0, 0);
    controller.isGrounded = false;

    let minY = Infinity;
    // dt = 0.1s (10 fps) is extreme on purpose: gravity builds enough speed to
    // overshoot the old ~0.2u landing window in a single step.
    for (let i = 0; i < 80; i++) {
      controller.updatePhysics(0.1);
      minY = Math.min(minY, controller.character.position.y);
    }

    expect(minY).toBeGreaterThanOrEqual(-0.001); // never crossed the ground
    expect(controller.isGrounded).toBe(true); // actually landed
    expect(controller.character.position.y).toBeCloseTo(0, 5);
  });

  it('jumps with an upward impulse, arcs over, and lands without tunnelling', () => {
    controller.character.position.set(0, 0, 0);
    controller.velocity.set(0, 0, 0);
    controller.isGrounded = true;

    // Press jump for one frame. The impulse is DEFERRED by the windup, so the
    // first frame only arms it — no upward velocity, still grounded.
    controller.keys['Space'] = true;
    controller.handleInput(0.1);
    expect(controller.velocity.y).toBe(0); // windup armed, impulse not applied yet
    expect(controller.isGrounded).toBe(true);
    controller.keys['Space'] = false;

    let maxY = -Infinity;
    let minY = Infinity;
    let launched = false;
    controller.updatePhysics(0.1);
    for (let i = 0; i < 60; i++) {
      controller.handleInput(0.1);
      controller.updatePhysics(0.1);
      if (controller.velocity.y > 0) launched = true; // windup fired the impulse
      maxY = Math.max(maxY, controller.character.position.y);
      minY = Math.min(minY, controller.character.position.y);
    }

    expect(launched).toBe(true); // the deferred impulse did fire after the windup
    expect(maxY).toBeGreaterThan(0.5); // it left the ground (a real hop)
    expect(minY).toBeGreaterThanOrEqual(-0.001); // never fell through on the way down
    expect(controller.isGrounded).toBe(true); // landed cleanly
    expect(controller.character.position.y).toBeCloseTo(0, 5);
  });

  it('does not re-jump while airborne (single impulse per press)', () => {
    controller.character.position.set(0, 0, 0);
    controller.velocity.set(0, 0, 0);
    controller.isGrounded = true;

    // Hold Space and step through the windup until the impulse launches us.
    controller.keys['Space'] = true;
    let guard = 0;
    while (controller.isGrounded && guard++ < 20) {
      controller.handleInput(0.1);
      controller.updatePhysics(0.1);
    }
    expect(controller.isGrounded).toBe(false); // launched
    const vAfterLaunch = controller.velocity.y;

    // Release and re-press mid-air: a fresh press must NOT start a new jump.
    controller.keys['Space'] = false;
    controller.handleInput(0.1);
    controller.keys['Space'] = true;
    controller.handleInput(0.1);
    controller.updatePhysics(0.1);
    expect(controller.velocity.y).toBeLessThan(vAfterLaunch); // still falling, no re-launch
    expect(controller.isJumpWindup).toBe(false); // no windup re-armed in the air
  });

  it('does not auto-rejump when the jump key is held through the landing', () => {
    controller.character.position.set(0, 0, 0);
    controller.velocity.set(0, 0, 0);
    controller.isGrounded = true;

    // Hold Space for the entire sequence.
    controller.keys['Space'] = true;
    for (let i = 0; i < 60; i++) {
      controller.handleInput(0.1);
      controller.updatePhysics(0.1);
    }
    expect(controller.isGrounded).toBe(true);

    // A few more held-key frames after landing — it must stay put (no edge).
    const yAfterLanding = controller.character.position.y;
    for (let i = 0; i < 5; i++) {
      controller.handleInput(0.1);
      controller.updatePhysics(0.1);
    }
    expect(controller.velocity.y).toBe(0);
    expect(controller.character.position.y).toBeCloseTo(yAfterLanding, 5);
  });
});
