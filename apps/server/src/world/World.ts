import { WorldClock } from './WorldClock';
import { NetworkIdAllocator } from './networkId';
import { randomWorldSeed } from '@cozy/shared';
import type {
  WorldDocument,
  WorldSnapshot,
  WorldDiff,
  BuildingState,
  DropState,
  BuildingCell,
} from '@cozy/shared';

function cellKey(cell: BuildingCell): string {
  return `${cell.level}:${cell.gx}:${cell.gz}`;
}

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
  private readonly choppedTrees = new Set<number>();
  private readonly buildings = new Map<number, BuildingState>();
  private readonly occupiedCells = new Set<string>();
  private readonly drops = new Map<number, DropState>();

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

  isTreeChopped(networkId: number): boolean {
    return this.choppedTrees.has(networkId);
  }

  isCellOccupied(cell: BuildingCell): boolean {
    return this.occupiedCells.has(cellKey(cell));
  }

  getDrop(networkId: number): DropState | undefined {
    return this.drops.get(networkId);
  }

  listDrops(): DropState[] {
    return [...this.drops.values()];
  }

  // --- mutation ---

  /** Apply a diff to derived state. Idempotent (safe to replay). Does NOT record. */
  private applyDiff(diff: WorldDiff): void {
    switch (diff.type) {
      case 'tree_chopped':
        this.choppedTrees.add(diff.networkId);
        break;
      case 'building_placed':
        this.buildings.set(diff.entity.networkId, diff.entity);
        this.occupiedCells.add(cellKey(diff.entity.cell));
        this.ids.restore(diff.entity.networkId + 1);
        break;
      case 'building_removed': {
        const b = this.buildings.get(diff.networkId);
        if (b) {
          this.occupiedCells.delete(cellKey(b.cell));
          this.buildings.delete(diff.networkId);
        }
        break;
      }
      case 'drop_spawned':
        this.drops.set(diff.entity.networkId, diff.entity);
        this.ids.restore(diff.entity.networkId + 1);
        break;
      case 'drop_removed':
        this.drops.delete(diff.networkId);
        break;
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
      buildings: [...this.buildings.values()],
      drops: [...this.drops.values()],
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
