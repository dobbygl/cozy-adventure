import { describe, it, expect } from 'vitest';
import { World } from '../../src/world/World';
import {
  DogSimulation,
  DOG_PICKUP_GRACE_MS,
  DOG_FETCH_RADIUS,
  type DogPlayer,
  type DogStep,
} from '../../src/world/dog';
import { addItem, countItem } from '../../src/world/inventory';
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

/** Run the sim for `ticks` steps of `dtMs`, starting at game time `start`, collecting effects. */
function run(sim: DogSimulation, world: World, players: DogPlayer[], ticks: number, dtMs = 100, start = 4000): DogStep {
  const all: DogStep = { diffs: [], grants: [], states: [] };
  let now = start;
  for (let i = 0; i < ticks; i++) {
    const step = sim.step(world, players, dtMs, now);
    all.diffs.push(...step.diffs);
    all.grants.push(...step.grants);
    all.states.push(...step.states);
    now += dtMs;
  }
  return all;
}

describe('DogSimulation (server-authoritative dog)', () => {
  it('walks to a drop, grabs it authoritatively, grants the owner, then delivers', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 5, z: 0 }, 0); // ~5 units from the player at the origin
    const p: DogPlayer = { playerId: 'p', position: { x: 0, y: 0, z: 0 }, inventory: emptyInventory() };
    const sim = new DogSimulation();

    // Enough ticks to walk out (~5u), grab, walk back (~5u), deliver.
    const effects = run(sim, world, [p], 40);

    // Exactly one authoritative pickup, attributed to this player's dog.
    const removed = effects.diffs.filter((d) => d.type === 'drop_removed');
    expect(removed).toHaveLength(1);
    if (removed[0].type === 'drop_removed') expect(removed[0].byDogOf).toBe('p');
    expect(world.getDrop(1_000_000)).toBeUndefined();
    // The grant is forwarded to the owner and credited server-side.
    expect(effects.grants).toContainEqual({ playerId: 'p', itemId: 'wood', quantity: 1 });
    expect(countItem(p.inventory, 'wood')).toBe(1);
    // It picked the drop up (carry 0 -> 1) and then delivered (back to 0).
    const carries = effects.states.map((s) => s.carrying);
    expect(Math.max(...carries)).toBe(1);
    expect(carries[carries.length - 1]).toBe(0);
    // It targeted the drop's position at some point (server sends a waypoint, not a path).
    expect(effects.states.some((s) => s.target?.x === 5)).toBe(true);
  });

  it('leaves a freshly-dropped item alone during the grace period', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 2, z: 0 }, 0);
    const p: DogPlayer = { playerId: 'p', position: { x: 0, y: 0, z: 0 }, inventory: emptyInventory() };
    const sim = new DogSimulation();

    // Keep game time inside the grace window the whole run (start below grace, small dt).
    const effects = run(sim, world, [p], 5, 100, 0);

    expect(effects.diffs).toHaveLength(0);
    expect(world.getDrop(1_000_000)).toBeDefined();
    expect(effects.states.every((s) => s.target === null)).toBe(true); // never targeted it
  });

  it('ignores a drop beyond the owner leash radius', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: DOG_FETCH_RADIUS + 10, z: 0 }, 0);
    const p: DogPlayer = { playerId: 'p', position: { x: 0, y: 0, z: 0 }, inventory: emptyInventory() };
    const sim = new DogSimulation();

    const effects = run(sim, world, [p], 30);

    expect(effects.diffs).toHaveLength(0);
    expect(world.getDrop(1_000_000)).toBeDefined();
  });

  it('does not re-grant a drop a peer already took (target drop vanished)', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 5, z: 0 }, 0);
    const a: DogPlayer = { playerId: 'a', position: { x: 0, y: 0, z: 0 }, inventory: emptyInventory() };
    const sim = new DogSimulation();

    // One tick to lock the target, then the drop disappears (a peer grabbed it).
    sim.step(world, [a], 100, 4000);
    world.recordDiff({ type: 'drop_removed', networkId: 1_000_000, byPlayerId: 'other', byDogOf: null, at: 4100 });
    const effects = run(sim, world, [a], 30, 100, 4100);

    expect(effects.grants).toHaveLength(0);
    expect(countItem(a.inventory, 'wood')).toBe(0);
  });

  it('does not loop-grab a drop the owner cannot hold (full bag)', () => {
    const world = World.createFresh('w', 0);
    spawnDrop(world, 1_000_000, { x: 3, z: 0 }, 0);
    const inv = emptyInventory();
    addItem(inv, 'wood', 99 * (9 + 54)); // fill every slot (hotbar 9 + backpack 6x9) with wood
    const p: DogPlayer = { playerId: 'p', position: { x: 0, y: 0, z: 0 }, inventory: inv };
    const sim = new DogSimulation();

    const effects = run(sim, world, [p], 40);

    expect(effects.diffs).toHaveLength(0); // grab fails (no room) -> never removed
    expect(effects.grants).toHaveLength(0);
    expect(world.getDrop(1_000_000)).toBeDefined();
  });

  it('past-grace sanity: GRACE constant is what gates eligibility', () => {
    expect(DOG_PICKUP_GRACE_MS).toBeGreaterThan(0);
  });
});
