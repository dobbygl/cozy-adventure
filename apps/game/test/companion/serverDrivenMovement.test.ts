import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { ServerDrivenMovement } from '../../src/companion/ServerDrivenMovement.js';
import { CompanionLocomotion } from '../../src/companion/CompanionLocomotion.js';
import type { Companion } from '../../src/companion/Companion.js';

// The client-side renderer for the server-authoritative dog (network mode). It must NEVER
// mutate the world — it only steers the mesh toward the server's target, corrects toward the
// authoritative position, and mirrors the mouth carry count. These pin that contract with a
// fake companion + fake carry (no scene, no network).

/** Minimal mouth-visual stand-in: tracks a count the way CarryVisual does. */
class FakeCarry {
  private n = 0;
  get count() {
    return this.n;
  }
  add() {
    this.n++;
  }
  removeLatest() {
    if (this.n > 0) this.n--;
  }
}

function fakeCompanion(playerAt = new THREE.Vector3(0, 0, 0)) {
  const playerMesh = new THREE.Object3D();
  playerMesh.position.copy(playerAt);
  const animator = { playWalk: vi.fn(), playIdle: vi.fn() };
  const companion = {
    mesh: new THREE.Object3D(),
    player: { mesh: playerMesh },
    locomotion: new CompanionLocomotion(),
    speed: 5,
    animator,
  } as unknown as Companion;
  return { companion, animator };
}

describe('ServerDrivenMovement', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carryDep = (c: FakeCarry) => ({ carry: c as any });

  it('does nothing before any server state arrives', () => {
    const { companion } = fakeCompanion();
    const m = new ServerDrivenMovement(carryDep(new FakeCarry()));
    m.update(companion, 0.1);
    expect(companion.mesh.position.x).toBe(0);
    expect(companion.mesh.position.z).toBe(0);
  });

  it('steers toward the server target and plays the walk animation', () => {
    const { companion, animator } = fakeCompanion();
    const m = new ServerDrivenMovement(carryDep(new FakeCarry()));
    m.setState({ position: { x: 5, y: 0, z: 0 }, target: { x: 5, y: 0, z: 0 }, carrying: 0 });

    m.update(companion, 0.1);

    expect(companion.mesh.position.x).toBeGreaterThan(0); // moved toward the target
    expect(animator.playWalk).toHaveBeenCalled();
    expect(animator.playIdle).not.toHaveBeenCalled();
  });

  it('follows the owner when the target is null', () => {
    const { companion, animator } = fakeCompanion(new THREE.Vector3(10, 0, 0));
    const m = new ServerDrivenMovement(carryDep(new FakeCarry()));
    // No fetch target, server position drifts toward the owner; the dog should walk owner-ward.
    m.setState({ position: { x: 1, y: 0, z: 0 }, target: null, carrying: 0 });

    m.update(companion, 0.1);

    expect(companion.mesh.position.x).toBeGreaterThan(0); // toward the owner at x=10
    expect(animator.playWalk).toHaveBeenCalled();
  });

  it('idles when already at the destination', () => {
    const { companion, animator } = fakeCompanion();
    const m = new ServerDrivenMovement(carryDep(new FakeCarry()));
    m.setState({ position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 }, carrying: 0 });

    m.update(companion, 0.1);

    expect(animator.playIdle).toHaveBeenCalled();
    expect(animator.playWalk).not.toHaveBeenCalled();
  });

  it('mirrors the mouth carry count and fires onDeliver on the carry -> 0 drop', () => {
    const carry = new FakeCarry();
    const onDeliver = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const m = new ServerDrivenMovement({ carry: carry as any, onDeliver });
    const { companion } = fakeCompanion();

    m.setState({ position: { x: 0, y: 0, z: 0 }, target: null, carrying: 3 });
    m.update(companion, 0.016);
    expect(carry.count).toBe(3);
    expect(onDeliver).not.toHaveBeenCalled();

    m.setState({ position: { x: 0, y: 0, z: 0 }, target: null, carrying: 0 });
    m.update(companion, 0.016);
    expect(carry.count).toBe(0);
    expect(onDeliver).toHaveBeenCalledOnce(); // delivered the haul to the owner
  });
});
