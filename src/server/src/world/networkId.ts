/**
 * Allocates stable, monotonic networkIds for synchronized entities (players,
 * buildings, trees, drops, dogs). Server-assigned and persisted with the world
 * so ids are never reused across reloads. Never derived from mesh.uuid
 * (Constitution Principle II): a uuid is not stable across clients.
 */
export class NetworkIdAllocator {
  private next: number;

  constructor(start = 1) {
    this.next = start;
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
