import { WorldClock } from './WorldClock';
import { NetworkIdAllocator } from './networkId';
import { randomWorldSeed } from '@shared/rng';
import type { WorldDocument, WorldSnapshot } from '@shared/state';

/**
 * The canonical, server-authoritative world. The server owns the seed (clients
 * regenerate the same base world deterministically via the shared rng) and, from
 * P2, the list of applied diffs. For P1 it holds seed + clock + id allocation.
 */
export class World {
  readonly worldId: string;
  readonly seed: number;
  readonly createdAt: number;
  readonly clock: WorldClock;
  private readonly ids: NetworkIdAllocator;

  constructor(opts: {
    worldId: string;
    seed: number;
    createdAt: number;
    clock: WorldClock;
    ids: NetworkIdAllocator;
  }) {
    this.worldId = opts.worldId;
    this.seed = opts.seed;
    this.createdAt = opts.createdAt;
    this.clock = opts.clock;
    this.ids = opts.ids;
  }

  /** A brand-new world with a freshly chosen seed (seed selection is the one place rng randomness is allowed). */
  static createFresh(worldId: string, now: number): World {
    return new World({
      worldId,
      seed: randomWorldSeed(),
      createdAt: now,
      clock: new WorldClock(),
      ids: new NetworkIdAllocator(1),
    });
  }

  /** Reconstruct a persisted world. (P2 will replay doc.diffs to rebuild entities.) */
  static fromDocument(doc: WorldDocument): World {
    return new World({
      worldId: doc.worldId,
      seed: doc.seed,
      createdAt: doc.createdAt,
      clock: new WorldClock(doc.clock),
      ids: new NetworkIdAllocator(doc.nextNetworkId),
    });
  }

  tick(deltaMs: number): void {
    this.clock.tick(deltaMs);
  }

  allocateNetworkId(): number {
    return this.ids.allocate();
  }

  snapshot(): WorldSnapshot {
    return {
      worldId: this.worldId,
      seed: this.seed,
      clock: this.clock.snapshot(),
      nextNetworkId: this.ids.peek(),
      diffs: [],
      buildings: [],
      drops: [],
    };
  }

  toDocument(): WorldDocument {
    return {
      worldId: this.worldId,
      seed: this.seed,
      createdAt: this.createdAt,
      clock: this.clock.snapshot(),
      nextNetworkId: this.ids.peek(),
      diffs: [],
    };
  }
}
