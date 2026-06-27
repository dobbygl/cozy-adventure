import { WebSocket } from 'ws';
import type { ClientMessage, ServerMessage, ServerMessageType } from '@cozy/shared';

type ByType<T extends ServerMessageType> = Extract<ServerMessage, { t: T }>;

interface Waiter {
  type: ServerMessageType;
  resolve: (m: ServerMessage) => void;
  timer: ReturnType<typeof setTimeout>;
}

/**
 * Simulated WebSocket client for server-side integration tests. Exercises the
 * real wire protocol (the verification ceiling of the server spec; the full
 * visual experience needs the real client, spec 003).
 */
export class MockClient {
  private inbox: ServerMessage[] = [];
  private waiters: Waiter[] = [];

  private closed = false;
  private closeWaiters: Array<() => void> = [];

  private constructor(private readonly ws: WebSocket) {
    ws.on('message', (data) => this.onMessage(data.toString()));
    ws.on('close', () => {
      this.closed = true;
      for (const r of this.closeWaiters) r();
      this.closeWaiters = [];
    });
  }

  /** Resolves when the server closes the connection; rejects if still open after timeoutMs. */
  waitForClose(timeoutMs = 5000): Promise<void> {
    if (this.closed) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const i = this.closeWaiters.indexOf(onClose);
        if (i >= 0) this.closeWaiters.splice(i, 1);
        reject(new Error('connection did not close'));
      }, timeoutMs);
      const onClose = (): void => {
        clearTimeout(timer);
        resolve();
      };
      this.closeWaiters.push(onClose);
    });
  }

  get isClosed(): boolean {
    return this.closed;
  }

  static connect(url: string, timeoutMs = 5000): Promise<MockClient> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      const timer = setTimeout(() => {
        ws.terminate();
        reject(new Error('connect timeout'));
      }, timeoutMs);
      ws.on('open', () => {
        clearTimeout(timer);
        resolve(new MockClient(ws));
      });
      ws.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  private onMessage(data: string): void {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(data) as ServerMessage;
    } catch {
      return;
    }
    const idx = this.waiters.findIndex((w) => w.type === msg.t);
    if (idx >= 0) {
      const [w] = this.waiters.splice(idx, 1);
      clearTimeout(w.timer);
      w.resolve(msg);
    } else {
      this.inbox.push(msg);
    }
  }

  send(msg: ClientMessage): void {
    this.ws.send(JSON.stringify(msg));
  }

  /** Send arbitrary text (for malformed-message tests). */
  sendRaw(data: string): void {
    this.ws.send(data);
  }

  /** Resolve with the next message of `type` (checking already-buffered first). */
  waitFor<T extends ServerMessageType>(type: T, timeoutMs = 5000): Promise<ByType<T>> {
    const buffered = this.inbox.findIndex((m) => m.t === type);
    if (buffered >= 0) {
      const [m] = this.inbox.splice(buffered, 1);
      return Promise.resolve(m as ByType<T>);
    }
    return new Promise<ByType<T>>((resolve, reject) => {
      const timer = setTimeout(() => {
        const i = this.waiters.findIndex((w) => w.timer === timer);
        if (i >= 0) this.waiters.splice(i, 1);
        reject(new Error(`timeout waiting for '${type}'`));
      }, timeoutMs);
      this.waiters.push({ type, resolve: resolve as (m: ServerMessage) => void, timer });
    });
  }

  /** Collect all messages of `type` received within a time window. */
  async collect<T extends ServerMessageType>(type: T, windowMs: number): Promise<ByType<T>[]> {
    const out: ByType<T>[] = [];
    this.inbox = this.inbox.filter((m) => {
      if (m.t === type) {
        out.push(m as ByType<T>);
        return false;
      }
      return true;
    });
    const start = Date.now();
    for (;;) {
      const remaining = windowMs - (Date.now() - start);
      if (remaining <= 0) break;
      try {
        out.push(await this.waitFor(type, remaining));
      } catch {
        break;
      }
    }
    return out;
  }

  close(): void {
    this.ws.close();
  }
}
