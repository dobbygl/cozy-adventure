import {
  createWorldDerivedState,
  applyWorldDiff,
  type WorldDerivedState,
  type WorldDiff,
  type WorldSnapshot,
  type BuildingState,
  type DropState,
} from '@cozy/shared';

// The client's view of the server-authoritative world: it owns the same derived
// state the server does (via the shared reducer) and turns each confirmed diff into
// a scene-change callback. THREE-free: the Game layer supplies handlers that
// actually add/remove meshes, so this routing is unit-testable headlessly.
//
// Handler firing is idempotent — a diff already reflected in the state fires no
// handler — so replaying the join snapshot, or re-receiving an event after a
// reconnect, never double-adds or double-removes a mesh.

export interface WorldChangeHandlers {
  onTreeChopped?(networkId: number): void;
  onBuildingPlaced?(building: BuildingState): void;
  onBuildingRemoved?(networkId: number): void;
  onDropSpawned?(drop: DropState): void;
  onDropRemoved?(networkId: number): void;
}

export class ClientWorld {
  private readonly state: WorldDerivedState = createWorldDerivedState();
  private readonly handlers: WorldChangeHandlers;

  constructor(handlers: WorldChangeHandlers = {}) {
    this.handlers = handlers;
  }

  /**
   * Replay the join/reconnect snapshot's diffs, firing handlers so the scene
   * reflects the current world (chopped trees removed, buildings/drops present).
   * The snapshot's resolved buildings[]/drops[] are redundant with replaying
   * diffs[], so we replay the diffs as the single source of truth.
   */
  loadSnapshot(snapshot: WorldSnapshot): void {
    for (const diff of snapshot.diffs) this.applyDiff(diff);
  }

  /** Apply one diff: update derived state and fire its scene handler exactly once. */
  applyDiff(diff: WorldDiff): void {
    switch (diff.type) {
      case 'tree_chopped':
        if (this.state.choppedTrees.has(diff.networkId)) return;
        applyWorldDiff(this.state, diff);
        this.handlers.onTreeChopped?.(diff.networkId);
        break;
      case 'building_placed':
        if (this.state.buildings.has(diff.entity.networkId)) return;
        applyWorldDiff(this.state, diff);
        this.handlers.onBuildingPlaced?.(diff.entity);
        break;
      case 'building_removed':
        if (!this.state.buildings.has(diff.networkId)) return;
        applyWorldDiff(this.state, diff);
        this.handlers.onBuildingRemoved?.(diff.networkId);
        break;
      case 'drop_spawned':
        if (this.state.drops.has(diff.entity.networkId)) return;
        applyWorldDiff(this.state, diff);
        this.handlers.onDropSpawned?.(diff.entity);
        break;
      case 'drop_removed':
        if (!this.state.drops.has(diff.networkId)) return;
        applyWorldDiff(this.state, diff);
        this.handlers.onDropRemoved?.(diff.networkId);
        break;
    }
  }

  isTreeChopped(networkId: number): boolean {
    return this.state.choppedTrees.has(networkId);
  }

  /** Whether a building cell key (cellKey from @cozy/shared) is occupied. */
  isCellOccupied(key: string): boolean {
    return this.state.occupiedCells.has(key);
  }

  listBuildings(): BuildingState[] {
    return [...this.state.buildings.values()];
  }

  listDrops(): DropState[] {
    return [...this.state.drops.values()];
  }
}
