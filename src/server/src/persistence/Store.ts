import type { WorldDocument, PlayerState } from '@cozy/shared';

/** Persistence of the canonical world document (keyed by worldId). */
export interface WorldStore {
  loadWorld(worldId: string): Promise<WorldDocument | null>;
  saveWorld(doc: WorldDocument): Promise<void>;
}

/** Persistence of per-player documents (keyed by playerId). */
export interface PlayerStore {
  loadPlayer(playerId: string): Promise<PlayerState | null>;
  savePlayer(worldId: string, player: PlayerState): Promise<void>;
}

/**
 * The combined store the server depends on. Concrete adapters: MemoryStore
 * (tests/dev, zero deps) and PostgresStore (managed/self-hosted).
 */
export interface Store extends WorldStore, PlayerStore {
  /** Apply schema/migrations and open connections. */
  init(): Promise<void>;
  /** Liveness check for the /healthz and metrics path. */
  healthy(): Promise<boolean>;
  /** Flush and release resources. */
  close(): Promise<void>;
}
