import pg from 'pg';
import type { Store } from './Store';
import type { WorldDocument, PlayerState } from '@cozy/shared';

const { Pool } = pg;

// Schema kept inline (mirrors sql/001_init.sql) so the bundled server can apply
// it on startup without reading a file from the bundle. Idempotent.
const SCHEMA = `
CREATE TABLE IF NOT EXISTS worlds (
  world_id   TEXT PRIMARY KEY,
  doc        JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS players (
  player_id  TEXT PRIMARY KEY,
  world_id   TEXT NOT NULL,
  doc        JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS players_world_id_idx ON players (world_id);
`;

/**
 * PostgreSQL-backed store (managed/self-hosted persistence). Documents are stored
 * as JSONB. NOTE: written and typechecked, but exercised against a real database
 * only via docker-compose / deployment — the automated tests use MemoryStore.
 */
export class PostgresStore implements Store {
  private readonly pool: pg.Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  async init(): Promise<void> {
    await this.pool.query(SCHEMA);
  }

  async healthy(): Promise<boolean> {
    try {
      await this.pool.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async loadWorld(worldId: string): Promise<WorldDocument | null> {
    const res = await this.pool.query<{ doc: WorldDocument }>(
      'SELECT doc FROM worlds WHERE world_id = $1',
      [worldId]
    );
    return res.rows[0]?.doc ?? null;
  }

  async saveWorld(doc: WorldDocument): Promise<void> {
    await this.pool.query(
      `INSERT INTO worlds (world_id, doc, updated_at) VALUES ($1, $2::jsonb, now())
       ON CONFLICT (world_id) DO UPDATE SET doc = EXCLUDED.doc, updated_at = now()`,
      [doc.worldId, JSON.stringify(doc)]
    );
  }

  async loadPlayer(playerId: string): Promise<PlayerState | null> {
    const res = await this.pool.query<{ doc: PlayerState }>(
      'SELECT doc FROM players WHERE player_id = $1',
      [playerId]
    );
    return res.rows[0]?.doc ?? null;
  }

  async savePlayer(worldId: string, player: PlayerState): Promise<void> {
    await this.pool.query(
      `INSERT INTO players (player_id, world_id, doc, updated_at) VALUES ($1, $2, $3::jsonb, now())
       ON CONFLICT (player_id) DO UPDATE SET world_id = EXCLUDED.world_id, doc = EXCLUDED.doc, updated_at = now()`,
      [player.playerId, worldId, JSON.stringify(player)]
    );
  }
}
