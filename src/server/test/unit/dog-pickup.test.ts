import { describe, it, expect } from 'vitest';
import { World } from '../../src/world/World';
import { runDogPickups, DOG_PICKUP_GRACE_MS, type DogPlayer } from '../../src/world/dog';
import { countItem } from '../../src/world/inventory';
import type { InventoryState } from '@cozy/shared';

function emptyInventory(): InventoryState {
  return { backpack: {}, hotbar: {}, selectedSlot: 0 };
}

function spawnDrop(world: World, networkId: number, pos: { x: number; z: number }, spawnedAt: number): void {
  world.recordDiff({
    type: 'drop_spawned',
    entity: { networkId, itemId: 'wood', quantity: 1, position: { x: pos.x, y: 0, z: pos.z }, spawnedAt },
    at: spawnedAt,
  });
}

describe('dog auto-pickup', () => {
  it("the nearest player's dog collects an eligible drop", () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 5, z: 0 }, 0);
    const near: DogPlayer = { playerId: 'p-near', position: { x: 4, y: 0, z: 0 }, inventory: emptyInventory() };
    const far: DogPlayer = { playerId: 'p-far', position: { x: 100, y: 0, z: 0 }, inventory: emptyInventory() };

    const diffs = runDogPickups(world, [far, near], DOG_PICKUP_GRACE_MS + 1);

    expect(diffs).toHaveLength(1);
    expect(diffs[0].type).toBe('drop_removed');
    if (diffs[0].type === 'drop_removed') expect(diffs[0].byDogOf).toBe('p-near');
    expect(countItem(near.inventory, 'wood')).toBe(1);
    expect(countItem(far.inventory, 'wood')).toBe(0);
    expect(world.getDrop(1_000_000)).toBeUndefined();
  });

  it('leaves a freshly-dropped item alone during the grace period', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 0, z: 0 }, 0);
    const p: DogPlayer = { playerId: 'p', position: { x: 0, y: 0, z: 0 }, inventory: emptyInventory() };

    const diffs = runDogPickups(world, [p], DOG_PICKUP_GRACE_MS - 1);

    expect(diffs).toHaveLength(0);
    expect(world.getDrop(1_000_000)).toBeDefined();
  });

  it('breaks ties by ascending playerId (deterministic)', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 0, z: 0 }, 0);
    const b: DogPlayer = { playerId: 'b', position: { x: 1, y: 0, z: 0 }, inventory: emptyInventory() };
    const a: DogPlayer = { playerId: 'a', position: { x: -1, y: 0, z: 0 }, inventory: emptyInventory() };

    const diffs = runDogPickups(world, [b, a], DOG_PICKUP_GRACE_MS + 1);

    expect(diffs).toHaveLength(1);
    expect(countItem(a.inventory, 'wood')).toBe(1);
    expect(countItem(b.inventory, 'wood')).toBe(0);
  });

  it('ignores drops with no player in range', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 0, z: 0 }, 0);
    const p: DogPlayer = { playerId: 'p', position: { x: 1000, y: 0, z: 0 }, inventory: emptyInventory() };

    const diffs = runDogPickups(world, [p], DOG_PICKUP_GRACE_MS + 1);

    expect(diffs).toHaveLength(0);
    expect(world.getDrop(1_000_000)).toBeDefined();
  });
});
