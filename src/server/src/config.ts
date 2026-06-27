import { z } from 'zod';

/**
 * Server configuration, parsed and validated from the environment.
 * Every value has a sensible default; nothing is required, so a bare
 * `node dist/index.js` runs an open, in-memory, single-world server.
 */
const EnvSchema = z.object({
  // 0 is allowed: it asks the OS for a free ephemeral port (used in tests).
  PORT: z.coerce.number().int().nonnegative().default(8080),
  ALLOWED_ORIGINS: z.string().default('*'),
  SERVER_PASSWORD: z.string().default(''),
  WORLD_ID: z.string().min(1).default('default'),
  MAX_PLAYERS: z.coerce.number().int().positive().default(8),
  DATABASE_URL: z.string().default(''),
  AVATAR_TICK_HZ: z.coerce.number().int().positive().default(15),
  SAVE_INTERVAL_MS: z.coerce.number().int().positive().default(30_000),
  RECONNECT_WINDOW_MS: z.coerce.number().int().nonnegative().default(30_000),
  KEEPALIVE_TIMEOUT_MS: z.coerce.number().int().positive().default(60_000),
  LOG_LEVEL: z.string().default('info'),
});

export interface Config {
  port: number;
  /** Parsed origin allowlist; `allowAnyOrigin` is true when configured as `*`. */
  allowedOrigins: string[];
  allowAnyOrigin: boolean;
  /** null => open server (no password required). */
  serverPassword: string | null;
  worldId: string;
  maxPlayers: number;
  /** null => use the in-memory store (dev/test). */
  databaseUrl: string | null;
  avatarTickHz: number;
  saveIntervalMs: number;
  reconnectWindowMs: number;
  keepaliveTimeoutMs: number;
  logLevel: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const e = EnvSchema.parse(env);
  const allowAnyOrigin = e.ALLOWED_ORIGINS.trim() === '*';
  return {
    port: e.PORT,
    allowedOrigins: allowAnyOrigin
      ? ['*']
      : e.ALLOWED_ORIGINS.split(',')
          .map((s) => s.trim())
          .filter(Boolean),
    allowAnyOrigin,
    serverPassword: e.SERVER_PASSWORD.length > 0 ? e.SERVER_PASSWORD : null,
    worldId: e.WORLD_ID,
    maxPlayers: e.MAX_PLAYERS,
    databaseUrl: e.DATABASE_URL.length > 0 ? e.DATABASE_URL : null,
    avatarTickHz: e.AVATAR_TICK_HZ,
    saveIntervalMs: e.SAVE_INTERVAL_MS,
    reconnectWindowMs: e.RECONNECT_WINDOW_MS,
    keepaliveTimeoutMs: e.KEEPALIVE_TIMEOUT_MS,
    logLevel: e.LOG_LEVEL,
  };
}
