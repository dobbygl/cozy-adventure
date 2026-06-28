// The world-diff reducer, shared by client and server so they CANNOT drift. The
// server records an ordered list of diffs over the seeded base world; every client
// replays the SAME diffs to derive the SAME collections (chopped trees, placed
// buildings, active drops). THREE-free and DOM-safe.
//
// Applying a diff is idempotent (replaying is safe), which is what makes reconnect
// and "apply on confirmed event" work: the placing client renders a mutation only
// when its confirmed diff arrives, exactly like every other client.

import type { WorldDiff, BuildingState, DropState, BuildingCell } from './state';

/** Conflict key for a building cell. One building per (level, gx, gz). */
export function cellKey(cell: BuildingCell): string {
  return `${cell.level}:${cell.gx}:${cell.gz}`;
}

/** Collections derived by replaying world diffs over the seeded base world. */
export interface WorldDerivedState {
  /**
   * Remaining health of resource nodes that have been hit but not yet depleted,
   * by networkId. Absent = untouched (full health, per the node's definition).
   */
  nodeHealth: Map<number, number>;
  /** networkIds of resource nodes harvested to depletion (excluded from the seeded layout). */
  depletedNodes: Set<number>;
  /** placed buildings by networkId. */
  buildings: Map<number, BuildingState>;
  /** occupied cell keys, derived from placed buildings (the conflict set). */
  occupiedCells: Set<string>;
  /** active ground drops by networkId. */
  drops: Map<number, DropState>;
}

export function createWorldDerivedState(): WorldDerivedState {
  return {
    nodeHealth: new Map<number, number>(),
    depletedNodes: new Set<number>(),
    buildings: new Map<number, BuildingState>(),
    occupiedCells: new Set<string>(),
    drops: new Map<number, DropState>(),
  };
}

/**
 * Apply one diff to the derived collections and report whether it CHANGED the
 * state. Idempotent: a diff already reflected in the state (a replayed terminal
 * diff, or a stale `node_damaged` whose health is no longer the lowest seen)
 * returns `false` and mutates nothing — this is what lets a client fire a scene
 * handler exactly once and reconnect re-replay safely. Entity-id bookkeeping
 * (allocator restore) is the caller's concern, kept out of this pure reducer.
 */
export function applyWorldDiff(state: WorldDerivedState, diff: WorldDiff): boolean {
  switch (diff.type) {
    case 'node_damaged': {
      // Once depleted, damage is moot. Health is monotonically decreasing, so only
      // a strictly lower value is a real change (replayed/out-of-order diffs no-op).
      if (state.depletedNodes.has(diff.networkId)) return false;
      const current = state.nodeHealth.get(diff.networkId) ?? Infinity;
      if (diff.health >= current) return false;
      state.nodeHealth.set(diff.networkId, diff.health);
      return true;
    }
    case 'node_depleted': {
      if (state.depletedNodes.has(diff.networkId)) return false;
      state.depletedNodes.add(diff.networkId);
      state.nodeHealth.delete(diff.networkId);
      return true;
    }
    case 'building_placed':
      if (state.buildings.has(diff.entity.networkId)) return false;
      state.buildings.set(diff.entity.networkId, diff.entity);
      state.occupiedCells.add(cellKey(diff.entity.cell));
      return true;
    case 'building_removed': {
      const existing = state.buildings.get(diff.networkId);
      if (!existing) return false;
      state.occupiedCells.delete(cellKey(existing.cell));
      state.buildings.delete(diff.networkId);
      return true;
    }
    case 'drop_spawned':
      if (state.drops.has(diff.entity.networkId)) return false;
      state.drops.set(diff.entity.networkId, diff.entity);
      return true;
    case 'drop_removed':
      if (!state.drops.has(diff.networkId)) return false;
      state.drops.delete(diff.networkId);
      return true;
  }
}

/** Replay an ordered list of diffs into a fresh derived state. */
export function replayWorldDiffs(diffs: readonly WorldDiff[]): WorldDerivedState {
  const state = createWorldDerivedState();
  for (const diff of diffs) applyWorldDiff(state, diff);
  return state;
}
