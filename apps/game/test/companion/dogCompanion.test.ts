// @vitest-environment jsdom
// jsdom for the delivery popup DOM. The host game is INJECTED (() => fakeGame),
// so no window global is needed.
import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { DogCompanion } from '../../src/DogCompanion.js';

// End-to-end smoke tests that construct and tick a REAL DogCompanion. The rest of
// the suite proves the collaborators in isolation; these are the only tests that
// exercise the dog's constructor (port wiring via gameInstancePorts), its
// updateBehavior + state machine, and the full fetch->carry->deliver path through
// the real ports. They guard against a runtime cabling break that typecheck/build
// can't see — not behavior coverage of every transition.

/** A DogCompanion whose model load always falls back to the box (no asset in tests). */
async function loadDog(player: unknown, getGame: () => unknown): Promise<DogCompanion> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dog = new DogCompanion(new THREE.Scene(), player as any, getGame as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (dog as any).loader = { loadAsync: () => Promise.reject(new Error('no asset in test')) };
  await dog.load();
  return dog;
}

describe('DogCompanion (end-to-end smoke)', () => {
  it('constructs, loads (fallback), and follows the player without throwing', async () => {
    const player = { mesh: new THREE.Object3D() };
    player.mesh.position.set(20, 0, 0); // far enough that the dog must walk over
    const dog = await loadDog(player, () => ({})); // bare game: no collision system

    const startX = dog.mesh.position.x;
    expect(() => {
      for (let i = 0; i < 5; i++) dog.update(0.1, []);
    }).not.toThrow();

    expect(dog.state).toBe('following');
    expect(dog.mesh.position.x).toBeGreaterThan(startX); // moved toward the player
  });

  it('runs the whole fetch cycle through the real ports: pick up a drop and deliver it', async () => {
    const player = { mesh: new THREE.Object3D() };
    player.mesh.position.set(0, 0, 0);

    const scene = new THREE.Scene();

    // A wood drop that has rested long enough (dropTime 0 -> always ready).
    const drop = new THREE.Object3D();
    drop.position.set(5, 0.15, 0);
    drop.userData = { itemId: 'wood', quantity: 1, dropTime: 0 };
    scene.add(drop);

    const inventory = {
      addItem: vi.fn(() => 1),
      getSelectedItem: () => null,
      onInventoryChange: vi.fn(),
    };
    const fakeGame = {
      collisionSystem: undefined,
      itemRegistry: { wood: { id: 'wood', name: 'Wood' } },
      inventory,
      inventoryUI: {
        updateUI() {},
        updateHotbar() {},
        updateBackpack() {},
        getItemIcon: () => ({ color: '#fff', icon: '🪵' }),
        cleanupWorldPickupPrompts() {},
      },
      player: { updateHeldItem: vi.fn() },
      pickupableItems: [drop],
      itemDropSystem: { droppedItems: [drop] },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dog = new DogCompanion(scene, player as any, () => fakeGame as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dog as any).loader = { loadAsync: () => Promise.reject(new Error('no asset in test')) };
    await dog.load();
    dog.mesh.position.set(0, 0.15, 0);

    // Drive enough frames to walk to the drop, pick it up, return, and deliver.
    expect(() => {
      for (let i = 0; i < 80; i++) dog.update(0.1, fakeGame.pickupableItems);
    }).not.toThrow();

    expect(inventory.addItem).toHaveBeenCalled(); // delivery routed through InventoryPort
    expect(fakeGame.pickupableItems).toHaveLength(0); // drop was removed from the world
    expect(scene.children).not.toContain(drop);
  });
});
