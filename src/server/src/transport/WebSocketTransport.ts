import { createServer, type IncomingMessage, type ServerResponse, type Server as HttpServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { WebSocketServer, WebSocket } from 'ws';
import type { Transport, TransportHandlers, TransportConnection, ConnectionId } from './Transport';
import type { Config } from '../config';
import type { Metrics } from '../metrics';
import type { Logger } from '../log';

class WsConnection implements TransportConnection {
  constructor(
    readonly id: ConnectionId,
    readonly origin: string | undefined,
    private readonly ws: WebSocket
  ) {}

  send(data: string): void {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(data);
  }

  close(code?: number, reason?: string): void {
    this.ws.close(code, reason);
  }
}

/**
 * WebSocket transport over an HTTP server. The HTTP server also serves
 * GET /healthz and GET /metrics. Implements the Transport boundary so the
 * game server never touches `ws` directly (Principle IV).
 */
export class WebSocketTransport implements Transport {
  private http: HttpServer | null = null;
  private wss: WebSocketServer | null = null;
  private _port = 0;

  constructor(
    private readonly config: Config,
    private readonly metrics: Metrics,
    private readonly logger: Logger
  ) {}

  get port(): number {
    return this._port;
  }

  async start(handlers: TransportHandlers): Promise<void> {
    const http = createServer((req, res) => this.handleHttp(req, res));
    const wss = new WebSocketServer({ noServer: true });

    http.on('upgrade', (req, socket, head) => {
      const origin = req.headers.origin;
      if (!this.originAllowed(origin)) {
        this.logger.warn({ origin }, 'rejected ws upgrade: origin not allowed');
        socket.destroy();
        return;
      }
      wss.handleUpgrade(req, socket, head, (ws) => {
        const conn = new WsConnection(randomUUID(), origin, ws);
        handlers.onConnection(conn);
        ws.on('message', (data) => {
          this.metrics.incMessagesIn();
          handlers.onMessage(conn, data.toString());
        });
        ws.on('close', () => handlers.onClose(conn));
        ws.on('error', (err) => this.logger.debug({ err: err.message }, 'ws error'));
      });
    });

    this.http = http;
    this.wss = wss;

    await new Promise<void>((resolve) => http.listen(this.config.port, () => resolve()));
    const addr = http.address();
    this._port = addr && typeof addr === 'object' ? addr.port : this.config.port;
  }

  async stop(): Promise<void> {
    this.wss?.clients.forEach((c) => c.terminate());
    await new Promise<void>((resolve) => {
      if (!this.wss) return resolve();
      this.wss.close(() => resolve());
    });
    await new Promise<void>((resolve) => {
      if (!this.http) return resolve();
      this.http.close(() => resolve());
    });
    this.http = null;
    this.wss = null;
  }

  private originAllowed(origin: string | undefined): boolean {
    if (this.config.allowAnyOrigin) return true;
    // Non-browser clients (e.g. native/self-hosted tools) send no Origin header.
    if (!origin) return true;
    return this.config.allowedOrigins.includes(origin);
  }

  private handleHttp(req: IncomingMessage, res: ServerResponse): void {
    if (req.url === '/healthz') {
      const snap = this.metrics.snapshot();
      res.writeHead(snap.persistenceHealthy ? 200 : 503, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: snap.persistenceHealthy ? 'ok' : 'degraded' }));
      return;
    }
    if (req.url === '/metrics') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(this.metrics.snapshot()));
      return;
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
}
