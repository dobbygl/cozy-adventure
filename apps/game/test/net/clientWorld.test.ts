import { describe, it, expect } from 'vitest';
import { ClientWorld, type WorldChangeHandlers } from '../../src/net/ClientWorld';
import { cellKey, type WorldDiff, type BuildingState, type DropState, type WorldSnapshot } from '@cozy/shared';

const building = (networkId: number, cell = { level: 0, gx: 1, gz: 2 }): BuildingState => ({
  networkId,
  registryType: 'wall',
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  level: cell.level,
  cell,
  ownerPlayerId: 'p1',
});
const drop = (networkId: number): DropState => ({
  networkId,
  itemId: 'wood',
  quantity: 1,
  position: { x: 0, y: 0, z: 0 },
  spawnedAt: 0,
});
const damaged = (networkId: number, health: number): WorldDiff => ({
  type: 'node_damaged',
  networkId,
  nodeKind: 'tree',
  health,
  byPlayerId: 'p1',
  at: 0,
});
const depleted = (networkId: number): WorldDiff => ({
  type: 'node_depleted',
  networkId,
  nodeKind: 'tree',
  byPlayerId: 'p1',
  at: 0,
});

function spy() {
  const calls = {
    damaged: [] as Array<{ id: number; health: number; animate: boolean }>,
    depleted: [] as number[],
    placed: [] as number[],
    removedB: [] as number[],
    spawned: [] as number[],
    removedD: [] as number[],
  };
  const handlers: WorldChangeHandlers = {
    onNodeDamaged: (id, _kind, health, animate) => calls.damaged.push({ id, health, animate }),
    onNodeDepleted: (id) => calls.depleted.push(id),
    onBuildingPlaced: (b) => calls.placed.push(b.networkId),
    onBuildingRemoved: (id) => calls.removedB.push(id),
    onDropSpawned: (d) => calls.spawned.push(d.networkId),
    onDropRemoved: (id) => calls.removedD.push(id),
  };
  return { calls, handlers };
}

describe('ClientWorld', () => {
  it('fires onNodeDepleted once and marks the node depleted', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff(depleted(5));
    expect(calls.depleted).toEqual([5]);
    expect(w.isNodeDepleted(5)).toBe(true);
  });

  it('fires onNodeDamaged with the live animate flag and remaining health', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff(damaged(5, 4)); // live event
    expect(calls.damaged).toEqual([{ id: 5, health: 4, animate: true }]);
  });

  it('does not re-fire onNodeDamaged for a stale/replayed hit (monotonic)', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff(damaged(5, 4));
    w.applyDiff(damaged(5, 4)); // exact replay -> no-op
    w.applyDiff(damaged(5, 5)); // higher (stale) health -> no-op
    expect(calls.damaged).toEqual([{ id: 5, health: 4, animate: true }]);
  });

  it('does not re-fire a handler for an already-applied diff (idempotent)', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    const diff = depleted(5);
    w.applyDiff(diff);
    w.applyDiff(diff); // replay
    expect(calls.depleted).toEqual([5]); // fired only once
  });

  it('places and removes a building, tracking the occupied cell', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    const b = building(1_000_000);
    w.applyDiff({ type: 'building_placed', entity: b, at: 0 });
    expect(calls.placed).toEqual([1_000_000]);
    expect(w.isCellOccupied(cellKey(b.cell))).toBe(true);
    w.applyDiff({ type: 'building_removed', networkId: 1_000_000, byPlayerId: 'p1', at: 1 });
    expect(calls.removedB).toEqual([1_000_000]);
    expect(w.isCellOccupied(cellKey(b.cell))).toBe(false);
  });

  it('spawns and removes a drop', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff({ type: 'drop_spawned', entity: drop(1_000_001), at: 0 });
    w.applyDiff({ type: 'drop_removed', networkId: 1_000_001, byPlayerId: 'p1', byDogOf: null, at: 1 });
    expect(calls.spawned).toEqual([1_000_001]);
    expect(calls.removedD).toEqual([1_000_001]);
    expect(w.listDrops()).toHaveLength(0);
  });

  it('loadSnapshot materializes the world by replaying diffs, without transient damage animations', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    const snapshot: WorldSnapshot = {
      worldId: 'w',
      seed: 1,
      clock: { dayTime: 0, gameTime: 0, weather: 'clear' },
      nextNetworkId: 1_000_002,
      diffs: [
        depleted(7),
        damaged(8, 3), // a half-chopped tree present at join time
        { type: 'building_placed', entity: building(1_000_000), at: 1 },
        { type: 'drop_spawned', entity: drop(1_000_001), at: 2 },
      ],
      buildings: [],
      drops: [],
    };
    w.loadSnapshot(snapshot);
    expect(calls.depleted).toEqual([7]);
    // The damaged node's STATE is applied, but with animate=false (no spurious shake
    // for a hit this late-joiner never witnessed).
    expect(calls.damaged).toEqual([{ id: 8, health: 3, animate: false }]);
    expect(calls.placed).toEqual([1_000_000]);
    expect(calls.spawned).toEqual([1_000_001]);
    expect(w.listBuildings()).toHaveLength(1);
  });

  it('ignores a removal for an entity it never had', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff({ type: 'building_removed', networkId: 999, byPlayerId: 'p1', at: 0 });
    w.applyDiff({ type: 'drop_removed', networkId: 999, byPlayerId: 'p1', byDogOf: null, at: 0 });
    expect(calls.removedB).toEqual([]);
    expect(calls.removedD).toEqual([]);
  });
});
