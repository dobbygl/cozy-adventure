import { PROTOCOL_VERSION } from '@cozy/shared';
import type {
  ClientMessage,
  ServerMessage,
  WorldCommand,
  AvatarSnapshot,
  PeerInfo,
  WorldDiff,
  Vec3,
  MovementState,
  PlayerState,
  WorldSnapshot,
  WorldClockState,
  RejectReason,
  KickReason,
  ErrorCode,
} from '@cozy/shared';

// The client's single network entry point (Constitution Principle III/IV). DOM-free
// and three-free on purpose: it uses only the global WebSocket (present in the
// browser and in Node 22+), so it runs unchanged in headless tests against an
// in-process @cozy/server. The Game layer consumes its callbacks to render remote
// players and apply world events; this module renders nothing itself.

export interface AvatarStateInput {
  position: Vec3;
  rotation: Vec3;
  movement: MovementState;
  heldItemId: string | null;
}

export interface NetworkHandlers {
  onPeerJoined?(peer: PeerInfo): void;
  onPeerLeft?(playerId: string): void;
  onAvatarSnapshots?(players: AvatarSnapshot[], serverTime: number): void;
  onWorldEvent?(diff: WorldDiff): void;
  onWorldSnapshot?(world: WorldSnapshot): void;
  onCommandRejected?(seq: number, reason: RejectReason): void;
  onWorldTime?(clock: WorldClockState): void;
  onInventoryDelta?(itemId: string, delta: number): void;
  onError?(code: ErrorCode, message: string): void;
  onKick?(reason: KickReason): void;
  onClose?(): void;
}

export interface NetworkConfig {
  url: string;
  password?: string;
  playerId?: string;
  displayName?: string;
  modelId?: string;
  /** Avatar send rate (Hz). Default 15. */
  avatarHz?: number;
  /** Keepalive interval (ms). Default 20000. */
  keepaliveMs?: number;
}

export interface JoinResult {
  playerId: string;
  worldId: string;
  seed: number;
  world: WorldSnapshot;
  player: PlayerState;
  peers: PeerInfo[];
}

export class NetworkSystem {
  private ws: WebSocket | null = null;
  private readonly handlers: NetworkHandlers;
  private readonly config: NetworkConfig;
  private readonly avatarHz: number;
  private readonly keepaliveMs: number;
  private readonly abort = new AbortController();

  private seq = 0;
  private latestAvatar: AvatarStateInput | null = null;
  private avatarTimer: ReturnType<typeof setInterval> | null = null;
  private keepaliveTimer: ReturnType<typeof setInterval> | null = null;
  private joined = false;
  private closed = false;

  constructor(config: NetworkConfig, handlers: NetworkHandlers = {}) {
    this.config = config;
    this.handlers = handlers;
    this.avatarHz = config.avatarHz ?? 15;
    this.keepaliveMs = config.keepaliveMs ?? 20000;
  }

  /** Open the connection and complete the join handshake. Resolves on `joined`. */
  connect(timeoutMs = 8000): Promise<JoinResult> {
    return new Promise<JoinResult>((resolve, reject) => {
      let settled = false;
      const ws = new WebSocket(this.config.url);
      this.ws = ws;
      const opts = { signal: this.abort.signal };

      const fail = (err: Error): void => {
        if (settled) return;
        settled = true;
        reject(err);
      };
      const timer = setTimeout(() => {
        fail(new Error('connection timeout'));
        ws.close();
      }, timeoutMs);

      ws.addEventListener(
        'open',
        () => {
          const join: ClientMessage = {
            t: 'join',
            protocolVersion: PROTOCOL_VERSION,
            ...(this.config.password ? { password: this.config.password } : {}),
            ...(this.config.playerId ? { playerId: this.config.playerId } : {}),
            ...(this.config.displayName ? { displayName: this.config.displayName } : {}),
            ...(this.config.modelId ? { modelId: this.config.modelId } : {}),
          };
          ws.send(JSON.stringify(join));
        },
        opts
      );

      ws.addEventListener(
        'message',
        (ev: MessageEvent) => {
          const msg = parseServerMessage(ev.data);
          if (!msg) return;
          if (!settled) {
            if (msg.t === 'joined') {
              settled = true;
              clearTimeout(timer);
              this.joined = true;
              this.startLoops();
              resolve({
                playerId: msg.playerId,
                worldId: msg.worldId,
                seed: msg.seed,
                world: msg.world,
                player: msg.player,
                peers: msg.peers,
              });
            } else if (msg.t === 'error') {
              clearTimeout(timer);
              fail(new Error(`${msg.code}: ${msg.message}`));
            } else if (msg.t === 'kick') {
              clearTimeout(timer);
              fail(new Error(`kicked: ${msg.reason}`));
            }
            return;
          }
          this.dispatch(msg);
        },
        opts
      );

      ws.addEventListener('error', () => fail(new Error('connection error')), opts);
      ws.addEventListener(
        'close',
        () => {
          clearTimeout(timer);
          this.stopLoops();
          if (!settled) fail(new Error('connection closed before join'));
          else if (!this.closed) this.handlers.onClose?.();
        },
        opts
      );
    });
  }

  /** Set the latest local avatar state; sent at the avatar rate (not per frame). */
  setAvatarState(state: AvatarStateInput): void {
    this.latestAvatar = state;
  }

  /** Send a discrete world command; returns the assigned per-session seq. */
  sendCommand(cmd: WorldCommand): number {
    const seq = ++this.seq;
    this.send({ t: 'command', seq, cmd });
    return seq;
  }

  get isConnected(): boolean {
    return this.joined && !this.closed && this.ws?.readyState === WebSocket.OPEN;
  }

  /** Close the connection and release every timer and listener (symmetric teardown). */
  destroy(): void {
    this.closed = true;
    this.stopLoops();
    this.abort.abort();
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED && this.ws.readyState !== WebSocket.CLOSING) {
      this.ws.close();
    }
    this.ws = null;
  }

  private dispatch(msg: ServerMessage): void {
    switch (msg.t) {
      case 'peer_joined':
        this.handlers.onPeerJoined?.({ playerId: msg.playerId, displayName: msg.displayName, modelId: msg.modelId });
        break;
      case 'peer_left':
        this.handlers.onPeerLeft?.(msg.playerId);
        break;
      case 'avatar_snapshots':
        this.handlers.onAvatarSnapshots?.(msg.players, msg.serverTime);
        break;
      case 'event':
        this.handlers.onWorldEvent?.(msg.diff);
        break;
      case 'world_snapshot':
        this.handlers.onWorldSnapshot?.(msg.world);
        break;
      case 'command_rejected':
        this.handlers.onCommandRejected?.(msg.seq, msg.reason);
        break;
      case 'world_time':
        this.handlers.onWorldTime?.({ dayTime: msg.dayTime, gameTime: msg.gameTime, weather: msg.weather });
        break;
      case 'inventory_delta':
        this.handlers.onInventoryDelta?.(msg.itemId, msg.delta);
        break;
      case 'error':
        this.handlers.onError?.(msg.code, msg.message);
        break;
      case 'kick':
        this.handlers.onKick?.(msg.reason);
        break;
      case 'pong':
      case 'joined':
        break;
    }
  }

  private startLoops(): void {
    const avatarMs = Math.max(1, Math.round(1000 / this.avatarHz));
    this.avatarTimer = setInterval(() => {
      if (this.latestAvatar) this.send({ t: 'avatar_state', ...this.latestAvatar });
    }, avatarMs);
    this.keepaliveTimer = setInterval(() => this.send({ t: 'keepalive' }), this.keepaliveMs);
  }

  private stopLoops(): void {
    if (this.avatarTimer) {
      clearInterval(this.avatarTimer);
      this.avatarTimer = null;
    }
    if (this.keepaliveTimer) {
      clearInterval(this.keepaliveTimer);
      this.keepaliveTimer = null;
    }
  }

  private send(msg: ClientMessage): void {
    const ws = this.ws;
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg));
  }
}

/**
 * Parse an inbound frame into a ServerMessage. The client trusts the server (the
 * authority), so this is a lenient JSON parse + cast, not full validation.
 */
function parseServerMessage(data: unknown): ServerMessage | null {
  const text = typeof data === 'string' ? data : null;
  if (text === null) return null;
  try {
    return JSON.parse(text) as ServerMessage;
  } catch {
    return null;
  }
}
