import type { Store } from './Store';
import type { WorldDocument, PlayerState } from '@shared/state';

/**
 * In-memory store for tests and local dev (no external dependency). Deep-clones
 * on read/write so callers can't mutate stored state by reference.
 */
export class MemoryStore implements Store {
  private worlds = new Map<string, WorldDocument>();
  private players = new Map<string, PlayerState>();

  async init(): Promise<void> {}

  async healthy(): Promise<boolean> {
    return true;
  }

  async close(): Promise<void> {}

  async loadWorld(worldId: string): Promise<WorldDocument | null> {
    const doc = this.worlds.get(worldId);
    return doc ? structuredClone(doc) : null;
  }

  async saveWorld(doc: WorldDocument): Promise<void> {
    this.worlds.set(doc.worldId, structuredClone(doc));
  }

  async loadPlayer(playerId: string): Promise<PlayerState | null> {
    const p = this.players.get(playerId);
    return p ? structuredClone(p) : null;
  }

  async savePlayer(_worldId: string, player: PlayerState): Promise<void> {
    this.players.set(player.playerId, structuredClone(player));
  }
}
