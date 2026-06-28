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

describe('shared world-diff reducer', () => {
  it('records a depleted node by networkId and reports the change', () => {
    const s = createWorldDerivedState();
    expect(applyWorldDiff(s, depleted(42))).toBe(true);
    expect(s.depletedNodes.has(42)).toBe(true);
  });

  it('damages a node with monotonically decreasing health', () => {
    const s = createWorldDerivedState();
    expect(applyWorldDiff(s, damaged(5, 4))).toBe(true);
    expect(s.nodeHealth.get(5)).toBe(4);
    expect(applyWorldDiff(s, damaged(5, 2))).toBe(true);
    expect(s.nodeHealth.get(5)).toBe(2);
    // A stale / out-of-order higher (or equal) health is ignored — keeps replay safe.
    expect(applyWorldDiff(s, damaged(5, 3))).toBe(false);
    expect(applyWorldDiff(s, damaged(5, 2))).toBe(false);
    expect(s.nodeHealth.get(5)).toBe(2);
  });

  it('depletion clears health and ignores any later damage/re-depletion', () => {
    const s = createWorldDerivedState();
    applyWorldDiff(s, damaged(5, 2));
    expect(applyWorldDiff(s, depleted(5))).toBe(true);
    expect(s.depletedNodes.has(5)).toBe(true);
    expect(s.nodeHealth.has(5)).toBe(false);
    expect(applyWorldDiff(s, depleted(5))).toBe(false); // already depleted
    expect(applyWorldDiff(s, damaged(5, 1))).toBe(false); // damage after depletion is moot
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
    const diffs: WorldDiff[] = [depleted(7), { type: 'building_placed', entity: building(1_000_000), at: 1 }];
    const once = replayWorldDiffs(diffs);
    const twice = replayWorldDiffs([...diffs, ...diffs]);
    expect([...twice.depletedNodes]).toEqual([...once.depletedNodes]);
    expect(twice.buildings.size).toBe(once.buildings.size);
    expect(twice.occupiedCells.size).toBe(once.occupiedCells.size);
  });

  it('replays an ordered diff list into the expected derived state', () => {
    const s = replayWorldDiffs([
      depleted(3),
      { type: 'drop_spawned', entity: drop(1_000_005), at: 1 },
      { type: 'drop_removed', networkId: 1_000_005, byPlayerId: null, byDogOf: 'p1', at: 2 },
    ]);
    expect(s.depletedNodes.has(3)).toBe(true);
    expect(s.drops.size).toBe(0); // spawned then removed
  });
});
