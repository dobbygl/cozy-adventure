import { WorldClock } from './WorldClock';
import { NetworkIdAllocator } from './networkId';
import {
  randomWorldSeed,
  cellKey,
  createWorldDerivedState,
  applyWorldDiff,
  type WorldDerivedState,
} from '@cozy/shared';
import type { WorldDocument, WorldSnapshot, WorldDiff, DropState, BuildingCell, BuildingState } from '@cozy/shared';

/**
 * The canonical, server-authoritative world: seed + an ordered list of diffs.
 * Derived collections (chopped trees, placed buildings, active drops) are rebuilt
 * by replaying the diffs, so persistence is just "seed + diffs + clock +
 * nextNetworkId". The server owns the seed (clients regenerate the same base
 * world deterministically via the shared rng) and arbitrates every mutation.
 */
export class World {
  readonly worldId: string;
  readonly seed: number;
  readonly createdAt: number;
  readonly clock: WorldClock;
  private readonly ids: NetworkIdAllocator;

  private diffs: WorldDiff[] = [];
  // Collections derived by replaying diffs, via the shared reducer so the client
  // (spec 003) derives byte-identical state from the same diffs.
  private readonly derived: WorldDerivedState = createWorldDerivedState();

  constructor(opts: {
    worldId: string;
    seed: number;
    createdAt: number;
    clock: WorldClock;
    ids: NetworkIdAllocator;
    diffs?: WorldDiff[];
  }) {
    this.worldId = opts.worldId;
    this.seed = opts.seed;
    this.createdAt = opts.createdAt;
    this.clock = opts.clock;
    this.ids = opts.ids;
    if (opts.diffs && opts.diffs.length > 0) {
      this.diffs = [...opts.diffs];
      for (const diff of this.diffs) this.applyDiff(diff);
    }
  }

  static createFresh(worldId: string, now: number): World {
    return new World({
      worldId,
      seed: randomWorldSeed(),
      createdAt: now,
      clock: new WorldClock(),
      ids: new NetworkIdAllocator(),
    });
  }

  static fromDocument(doc: WorldDocument): World {
    return new World({
      worldId: doc.worldId,
      seed: doc.seed,
      createdAt: doc.createdAt,
      clock: new WorldClock(doc.clock),
      ids: new NetworkIdAllocator(doc.nextNetworkId),
      diffs: doc.diffs,
    });
  }

  tick(deltaMs: number): void {
    this.clock.tick(deltaMs);
  }

  get gameTime(): number {
    return this.clock.snapshot().gameTime;
  }

  allocateNetworkId(): number {
    return this.ids.allocate();
  }

  // --- queries used by command validation ---

  isNodeDepleted(networkId: number): boolean {
    return this.derived.depletedNodes.has(networkId);
  }

  /** Remaining health of a hit-but-not-depleted resource node, or undefined if untouched. */
  nodeHealth(networkId: number): number | undefined {
    return this.derived.nodeHealth.get(networkId);
  }

  isCellOccupied(cell: BuildingCell): boolean {
    return this.derived.occupiedCells.has(cellKey(cell));
  }

  getDrop(networkId: number): DropState | undefined {
    return this.derived.drops.get(networkId);
  }

  getBuilding(networkId: number): BuildingState | undefined {
    return this.derived.buildings.get(networkId);
  }

  listDrops(): DropState[] {
    return [...this.derived.drops.values()];
  }

  // --- mutation ---

  /** Apply a diff to derived state. Idempotent (safe to replay). Does NOT record. */
  private applyDiff(diff: WorldDiff): void {
    // Collection changes via the shared reducer (client/server parity); the server
    // additionally advances its id allocator past any persisted dynamic entity.
    applyWorldDiff(this.derived, diff);
    if (diff.type === 'building_placed' || diff.type === 'drop_spawned') {
      this.ids.restore(diff.entity.networkId + 1);
    }
  }

  /** Apply AND append a live diff (the canonical record grows). */
  recordDiff(diff: WorldDiff): void {
    this.applyDiff(diff);
    this.diffs.push(diff);
  }

  snapshot(): WorldSnapshot {
    return {
      worldId: this.worldId,
      seed: this.seed,
      clock: this.clock.snapshot(),
      nextNetworkId: this.ids.peek(),
      diffs: [...this.diffs],
      buildings: [...this.derived.buildings.values()],
      drops: [...this.derived.drops.values()],
    };
  }

  toDocument(): WorldDocument {
    return {
      worldId: this.worldId,
      seed: this.seed,
      createdAt: this.createdAt,
      clock: this.clock.snapshot(),
      nextNetworkId: this.ids.peek(),
      diffs: [...this.diffs],
    };
  }
}
