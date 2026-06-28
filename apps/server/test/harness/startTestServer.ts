import { GameServer } from '../../src/server';
import { WebSocketTransport } from '../../src/transport/WebSocketTransport';
import { MemoryStore } from '../../src/persistence/MemoryStore';
import type { Store } from '../../src/persistence/Store';
import { SessionManager } from '../../src/session/SessionManager';
import { Metrics } from '../../src/metrics';
import { loadConfig, type Config } from '../../src/config';
import { logger } from '../../src/log';

// Keep test output clean.
logger.level = 'silent';

export interface TestServer {
  server: GameServer;
  url: string;
  store: Store;
  config: Config;
  metrics: Metrics;
}

/** Start a server on an ephemeral port for a test. Caller must `server.stop()`. */
export async function startTestServer(
  env: NodeJS.ProcessEnv = {},
  store: Store = new MemoryStore()
): Promise<TestServer> {
  // Fixed AUTH_SECRET by default so reconnect tokens stay valid across an in-process
  // server restart (e.g. the persistence test); a test can still override it via env.
  const config = loadConfig({ PORT: '0', AUTH_SECRET: 'test-auth-secret', ...env });
  const metrics = new Metrics();
  const transport = new WebSocketTransport(config, metrics, logger);
  const sessions = new SessionManager();
  const server = new GameServer({ config, transport, store, metrics, logger, sessions });
  await server.start();
  return { server, url: `ws://127.0.0.1:${server.port}`, store, config, metrics };
}
