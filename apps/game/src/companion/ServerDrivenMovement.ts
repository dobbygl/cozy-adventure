import * as THREE from 'three';
import type { Companion, CompanionMovement } from './Companion.js';
import type { CarryVisual } from './fetch/CarryVisual.js';
import type { DogStateInput } from '../net/NetworkSystem.js';

// How fast the rendered dog eases toward the authoritative server position when it has drifted
// (per second). Prediction toward the target keeps motion smooth between the sparse server
// updates; this only pulls the dog back in when client and server diverge beyond the deadzone.
const CORRECTION_RATE = 3;
// Don't correct sub-this drift — avoids fighting the prediction every frame when in sync.
const CORRECTION_DEADZONE = 0.5;
// Close enough (XZ) to the steer destination to stop walking (play idle).
const ARRIVAL_EPS = 0.2;
// Placeholder mouth visual: the server sends a carry COUNT, not item ids; the exact prop in the
// dog's mouth is cosmetic, so render a generic one. (Mirrors single-player's mouth visuals.)
const CARRY_ITEM_ID = 'wood';

export interface ServerDrivenMovementDeps {
  /** The dog's mouth visual, so the carry count can be mirrored from the server state. */
  carry: CarryVisual;
  /** Fired when the dog finishes delivering its haul (carry count returns to 0): popup + bark. */
  onDeliver?: () => void;
}

/**
 * Renders the server-authoritative companion dog in network mode (the "DI para controlar los
 * movimientos" implementation injected via Companion.setMovement). The SERVER owns the dog's
 * decisions, simulated position and pickups; this only DRAWS it and never mutates the world.
 *
 * Each frame it steers the mesh toward the server's current target (a drop, or the owner when
 * the target is null) so motion stays smooth between the sparse dog_state messages, then gently
 * eases the rendered position toward the latest authoritative position to correct drift
 * (interpolation). It plays walk/idle from whether it is moving and mirrors the mouth carry
 * count, firing onDeliver when the haul reaches the owner (carry -> 0).
 */
export class ServerDrivenMovement implements CompanionMovement {
  private received = false;
  private readonly serverPos = new THREE.Vector3();
  private readonly target = new THREE.Vector3();
  private hasTarget = false;
  private targetCarrying = 0;
  private carrying = 0;

  constructor(private readonly deps: ServerDrivenMovementDeps) {}

  /** Apply the latest server dog_state (call from the network onDogState handler). */
  setState(state: DogStateInput): void {
    this.received = true;
    this.serverPos.set(state.position.x, state.position.y, state.position.z);
    if (state.target) {
      this.target.set(state.target.x, state.target.y, state.target.z);
      this.hasTarget = true;
    } else {
      this.hasTarget = false;
    }
    this.targetCarrying = state.carrying;
  }

  update(companion: Companion, deltaTime: number): void {
    if (!this.received) return; // nothing from the server yet; leave the dog where it spawned
    const mesh = companion.mesh;
    const player = companion.player?.mesh as THREE.Object3D | undefined;

    // Steer destination: the server's fetch target, else follow the owner (target === null).
    const dest = this.hasTarget ? this.target : player?.position;
    let moving = false;
    if (dest) {
      const dist = Math.hypot(dest.x - mesh.position.x, dest.z - mesh.position.z);
      if (dist > ARRIVAL_EPS) {
        companion.locomotion.moveToward(mesh, dest, companion.speed, deltaTime);
        moving = true;
      }
    }

    // Drift correction toward the authoritative position (XZ only; CompanionPhysics owns Y).
    const dx = this.serverPos.x - mesh.position.x;
    const dz = this.serverPos.z - mesh.position.z;
    if (dx * dx + dz * dz > CORRECTION_DEADZONE * CORRECTION_DEADZONE) {
      const k = Math.min(1, CORRECTION_RATE * deltaTime);
      mesh.position.x += dx * k;
      mesh.position.z += dz * k;
    }

    if (moving) companion.animator.playWalk();
    else companion.animator.playIdle();

    this.syncCarry();
  }

  /** Mirror the mouth carry count from the server, firing onDeliver on the carry -> 0 drop. */
  private syncCarry(): void {
    while (this.deps.carry.count < this.targetCarrying) this.deps.carry.add(CARRY_ITEM_ID);
    while (this.deps.carry.count > this.targetCarrying) this.deps.carry.removeLatest();
    if (this.carrying > 0 && this.targetCarrying === 0) this.deps.onDeliver?.();
    this.carrying = this.targetCarrying;
  }
}
