import { DYNAMIC_NETWORK_ID_BASE } from '@cozy/shared';

/**
 * Allocates stable, monotonic networkIds for server-created dynamic entities
 * (buildings, drops, dogs). Starts at DYNAMIC_NETWORK_ID_BASE so allocated ids
 * are provably disjoint from base-tree ids (which use the deterministic
 * generation index, below the base). Server-assigned and persisted with the
 * world so ids are never reused across reloads. Never derived from mesh.uuid
 * (Constitution Principle II): a uuid is not stable across clients.
 */
export class NetworkIdAllocator {
  private next: number;

  constructor(start = DYNAMIC_NETWORK_ID_BASE) {
    this.next = Math.max(start, DYNAMIC_NETWORK_ID_BASE);
  }

  /** Allocate the next id. */
  allocate(): number {
    return this.next++;
  }

  /** The next id that would be allocated (for persistence). */
  peek(): number {
    return this.next;
  }

  /** Restore the counter after loading a persisted world. */
  restore(next: number): void {
    if (next > this.next) this.next = next;
  }
}
