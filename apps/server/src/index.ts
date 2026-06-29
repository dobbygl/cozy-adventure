import { loadConfig } from './config';
import { logger } from './log';
import { Metrics } from './metrics';
import { WebSocketTransport } from './transport/WebSocketTransport';
import { MemoryStore } from './persistence/MemoryStore';
import { PostgresStore } from './persistence/PostgresStore';
import type { Store } from './persistence/Store';
import { SessionManager } from './session/SessionManager';
import { createAuthProvider } from './auth/createAuthProvider';
import { GameServer } from './server';

function createStore(databaseUrl: string | null): Store {
  if (databaseUrl) {
    logger.info('using PostgreSQL store');
    return new PostgresStore(databaseUrl);
  }
  logger.info('no DATABASE_URL set; using in-memory store (dev/test, non-durable)');
  return new MemoryStore();
}

async function main(): Promise<void> {
  const config = loadConfig();
  const metrics = new Metrics();
  const store = createStore(config.databaseUrl);
  const transport = new WebSocketTransport(config, metrics, logger);
  const sessions = new SessionManager();
  const auth = createAuthProvider(config);
  const server = new GameServer({ config, transport, store, metrics, logger, sessions, auth });

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
