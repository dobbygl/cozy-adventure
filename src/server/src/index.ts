import { loadConfig } from './config';
import { logger } from './log';
import { Metrics } from './metrics';
import { WebSocketTransport } from './transport/WebSocketTransport';
import { MemoryStore } from './persistence/MemoryStore';
import type { Store } from './persistence/Store';
import { SessionManager } from './session/SessionManager';
import { GameServer } from './server';

function createStore(databaseUrl: string | null): Store {
  // PostgresStore is wired in US2 (T047); until then (or with no DATABASE_URL)
  // the in-memory store runs the world.
  if (databaseUrl) {
    logger.warn('DATABASE_URL set but PostgresStore not yet wired; using in-memory store');
  }
  return new MemoryStore();
}

async function main(): Promise<void> {
  const config = loadConfig();
  const metrics = new Metrics();
  const store = createStore(config.databaseUrl);
  const transport = new WebSocketTransport(config, metrics, logger);
  const sessions = new SessionManager();
  const server = new GameServer({ config, transport, store, metrics, logger, sessions });

  await server.start();

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'shutting down');
    await server.stop();
    process.exit(0);
  };
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((err) => {
  logger.error({ err }, 'fatal startup error');
  process.exit(1);
});
