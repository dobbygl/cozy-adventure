import { describe, it, expect } from 'vitest';
import {
  createWorldDerivedState,
  applyWorldDiff,
  replayWorldDiffs,
  cellKey,
  type WorldDiff,
  type BuildingState,
  type DropState,
} from '@cozy/shared';

// The shared world-diff reducer is the client/server parity contract: replaying the
// same diffs must yield the same derived state on both sides. (The server exercises
// it too, via its integration tests; this pins the pure semantics.)
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

describe('shared world-diff reducer', () => {
  it('records a chopped tree by networkId', () => {
    const s = createWorldDerivedState();
    applyWorldDiff(s, { type: 'tree_chopped', networkId: 42, byPlayerId: 'p1', at: 0 });
    expect(s.choppedTrees.has(42)).toBe(true);
  });

  it('places a building and occupies its cell', () => {
    const s = createWorldDerivedState();
    const b = building(1_000_000);
    applyWorldDiff(s, { type: 'building_placed', entity: b, at: 0 });
    expect(s.buildings.get(1_000_000)).toEqual(b);
    expect(s.occupiedCells.has(cellKey(b.cell))).toBe(true);
  });

  it('removes a building and frees its cell', () => {
    const s = createWorldDerivedState();
    const b = building(1_000_001);
    applyWorldDiff(s, { type: 'building_placed', entity: b, at: 0 });
    applyWorldDiff(s, { type: 'building_removed', networkId: 1_000_001, byPlayerId: 'p1', at: 1 });
    expect(s.buildings.has(1_000_001)).toBe(false);
    expect(s.occupiedCells.has(cellKey(b.cell))).toBe(false);
  });

  it('spawns and removes drops', () => {
    const s = createWorldDerivedState();
    applyWorldDiff(s, { type: 'drop_spawned', entity: drop(1_000_002), at: 0 });
    expect(s.drops.has(1_000_002)).toBe(true);
    applyWorldDiff(s, {
      type: 'drop_removed',
      networkId: 1_000_002,
      byPlayerId: 'p1',
      byDogOf: null,
      at: 1,
    });
    expect(s.drops.has(1_000_002)).toBe(false);
  });

  it('is idempotent: replaying a diff twice changes nothing', () => {
    const diffs: WorldDiff[] = [
      { type: 'tree_chopped', networkId: 7, byPlayerId: 'p1', at: 0 },
      { type: 'building_placed', entity: building(1_000_000), at: 1 },
    ];
    const once = replayWorldDiffs(diffs);
    const twice = replayWorldDiffs([...diffs, ...diffs]);
    expect([...twice.choppedTrees]).toEqual([...once.choppedTrees]);
    expect(twice.buildings.size).toBe(once.buildings.size);
    expect(twice.occupiedCells.size).toBe(once.occupiedCells.size);
  });

  it('replays an ordered diff list into the expected derived state', () => {
    const s = replayWorldDiffs([
      { type: 'tree_chopped', networkId: 3, byPlayerId: 'p1', at: 0 },
      { type: 'drop_spawned', entity: drop(1_000_005), at: 1 },
      { type: 'drop_removed', networkId: 1_000_005, byPlayerId: null, byDogOf: 'p1', at: 2 },
    ]);
    expect(s.choppedTrees.has(3)).toBe(true);
    expect(s.drops.size).toBe(0); // spawned then removed
  });
});
