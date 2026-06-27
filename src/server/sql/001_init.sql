-- cozy-adventure server schema. Applied idempotently on startup by PostgresStore.
-- Document model: one row per world (keyed by world_id) and one per player
-- (keyed by player_id), each storing the serialized state as JSONB.

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
