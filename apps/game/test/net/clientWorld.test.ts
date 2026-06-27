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

function spy() {
  const calls: Record<string, number[]> = { chopped: [], placed: [], removedB: [], spawned: [], removedD: [] };
  const handlers: WorldChangeHandlers = {
    onTreeChopped: (id) => calls.chopped.push(id),
    onBuildingPlaced: (b) => calls.placed.push(b.networkId),
    onBuildingRemoved: (id) => calls.removedB.push(id),
    onDropSpawned: (d) => calls.spawned.push(d.networkId),
    onDropRemoved: (id) => calls.removedD.push(id),
  };
  return { calls, handlers };
}

describe('ClientWorld', () => {
  it('fires onTreeChopped once and removes the tree from state', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    w.applyDiff({ type: 'tree_chopped', networkId: 5, byPlayerId: 'p1', at: 0 });
    expect(calls.chopped).toEqual([5]);
    expect(w.isTreeChopped(5)).toBe(true);
  });

  it('does not re-fire a handler for an already-applied diff (idempotent)', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    const diff: WorldDiff = { type: 'tree_chopped', networkId: 5, byPlayerId: 'p1', at: 0 };
    w.applyDiff(diff);
    w.applyDiff(diff); // replay
    expect(calls.chopped).toEqual([5]); // fired only once
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

  it('loadSnapshot materializes the current world by replaying its diffs', () => {
    const { calls, handlers } = spy();
    const w = new ClientWorld(handlers);
    const snapshot: WorldSnapshot = {
      worldId: 'w',
      seed: 1,
      clock: { dayTime: 0, gameTime: 0, weather: 'clear' },
      nextNetworkId: 1_000_002,
      diffs: [
        { type: 'tree_chopped', networkId: 7, byPlayerId: 'p1', at: 0 },
        { type: 'building_placed', entity: building(1_000_000), at: 1 },
        { type: 'drop_spawned', entity: drop(1_000_001), at: 2 },
      ],
      buildings: [],
      drops: [],
    };
    w.loadSnapshot(snapshot);
    expect(calls.chopped).toEqual([7]);
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
