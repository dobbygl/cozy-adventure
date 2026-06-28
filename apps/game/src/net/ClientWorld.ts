import {
  createWorldDerivedState,
  applyWorldDiff,
  type WorldDerivedState,
  type WorldDiff,
  type WorldSnapshot,
  type BuildingState,
  type DropState,
  type ResourceNodeKind,
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
  /**
   * A resource node took a confirmed hit (still alive). `health` is the remaining
   * health; `animate` is true for a live event (play the transient hit reaction) and
   * false during snapshot replay (a late-joiner should see the damaged STATE — e.g.
   * the darker trunk — without spurious shake animations for hits it never witnessed).
   */
  onNodeDamaged?(networkId: number, kind: ResourceNodeKind, health: number, animate: boolean): void;
  /** A resource node was harvested to depletion (remove it from the scene). */
  onNodeDepleted?(networkId: number, kind: ResourceNodeKind): void;
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
   * reflects the current world (depleted nodes removed, damaged nodes shown,
   * buildings/drops present). Replayed in "cold" mode (animate=false) so a
   * late-joiner sees damaged STATE without transient hit animations for hits it
   * never witnessed. The snapshot's resolved buildings[]/drops[] are redundant
   * with replaying diffs[], so the diffs are the single source of truth.
   */
  loadSnapshot(snapshot: WorldSnapshot): void {
    for (const diff of snapshot.diffs) this.applyDiff(diff, false);
  }

  /**
   * Apply one diff: fold it into derived state and, IF that actually changed the
   * state (the reducer's return value centralizes idempotency), fire its scene
   * handler exactly once. `animate` is true for live events and false for snapshot
   * replay; it only affects transient feedback (a node's hit reaction).
   */
  applyDiff(diff: WorldDiff, animate = true): void {
    if (!applyWorldDiff(this.state, diff)) return;
    switch (diff.type) {
      case 'node_damaged':
        this.handlers.onNodeDamaged?.(diff.networkId, diff.nodeKind, diff.health, animate);
        break;
      case 'node_depleted':
        this.handlers.onNodeDepleted?.(diff.networkId, diff.nodeKind);
        break;
      case 'building_placed':
        this.handlers.onBuildingPlaced?.(diff.entity);
        break;
      case 'building_removed':
        this.handlers.onBuildingRemoved?.(diff.networkId);
        break;
      case 'drop_spawned':
        this.handlers.onDropSpawned?.(diff.entity);
        break;
      case 'drop_removed':
        this.handlers.onDropRemoved?.(diff.networkId);
        break;
    }
  }

  isNodeDepleted(networkId: number): boolean {
    return this.state.depletedNodes.has(networkId);
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
