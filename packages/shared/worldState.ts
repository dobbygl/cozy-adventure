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
  /** networkIds of base trees that have been chopped (excluded from the seeded layout). */
  choppedTrees: Set<number>;
  /** placed buildings by networkId. */
  buildings: Map<number, BuildingState>;
  /** occupied cell keys, derived from placed buildings (the conflict set). */
  occupiedCells: Set<string>;
  /** active ground drops by networkId. */
  drops: Map<number, DropState>;
}

export function createWorldDerivedState(): WorldDerivedState {
  return {
    choppedTrees: new Set<number>(),
    buildings: new Map<number, BuildingState>(),
    occupiedCells: new Set<string>(),
    drops: new Map<number, DropState>(),
  };
}

/**
 * Apply one diff to the derived collections. Idempotent: applying the same diff
 * twice leaves the state unchanged. Mirrors exactly the five diff types in
 * {@link WorldDiff}; entity-id bookkeeping (allocator restore) is the caller's
 * concern, kept out of this pure reducer.
 */
export function applyWorldDiff(state: WorldDerivedState, diff: WorldDiff): void {
  switch (diff.type) {
    case 'tree_chopped':
      state.choppedTrees.add(diff.networkId);
      break;
    case 'building_placed':
      state.buildings.set(diff.entity.networkId, diff.entity);
      state.occupiedCells.add(cellKey(diff.entity.cell));
      break;
    case 'building_removed': {
      const existing = state.buildings.get(diff.networkId);
      if (existing) {
        state.occupiedCells.delete(cellKey(existing.cell));
        state.buildings.delete(diff.networkId);
      }
      break;
    }
    case 'drop_spawned':
      state.drops.set(diff.entity.networkId, diff.entity);
      break;
    case 'drop_removed':
      state.drops.delete(diff.networkId);
      break;
  }
}

/** Replay an ordered list of diffs into a fresh derived state. */
export function replayWorldDiffs(diffs: readonly WorldDiff[]): WorldDerivedState {
  const state = createWorldDerivedState();
  for (const diff of diffs) applyWorldDiff(state, diff);
  return state;
}
