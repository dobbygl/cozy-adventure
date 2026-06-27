import { randomUUID } from 'node:crypto';
import type { Config } from './config';
import type { Transport, TransportConnection } from './transport/Transport';
import type { Store } from './persistence/Store';
import type { Metrics } from './metrics';
import type { Logger } from './log';
import { SessionManager } from './session/SessionManager';
import { Session } from './session/Session';
import { parseClientMessage } from './protocol/schemas';
import { World } from './world/World';
import type { AuthProvider } from './auth/AuthProvider';
import { NullAuthProvider } from './auth/NullAuthProvider';
import { PasswordAuthProvider } from './auth/PasswordAuthProvider';
import { createDefaultPlayer } from './player';
import { validateAvatarMove } from './session/avatarRelay';
import { PROTOCOL_VERSION } from '@cozy/shared';
import type {
  ClientMessage,
  ServerMessage,
  ErrorCode,
  JoinMessage,
  AvatarStateMessage,
  AvatarSnapshot,
  PeerInfo,
} from '@cozy/shared';

export interface GameServerDeps {
  config: Config;
  transport: Transport;
  store: Store;
  metrics: Metrics;
  logger: Logger;
  sessions: SessionManager;
}

/**
 * Orchestrates transport + world + sessions + persistence for a single shared
 * world (one world per process). US1 implements presence + avatar relay; the
 * world-command path (US2) and reconnection hardening (US3) build on this.
 */
export class GameServer {
  private readonly config: Config;
  private readonly transport: Transport;
  private readonly store: Store;
  private readonly metrics: Metrics;
  private readonly logger: Logger;
  private readonly sessions: SessionManager;
  private readonly auth: AuthProvider;

  private world: World | null = null;
  private tickTimer: ReturnType<typeof setInterval> | null = null;
  private lastTickAt = 0;
  private msSinceWorldTime = 0;

  constructor(deps: GameServerDeps) {
    this.config = deps.config;
    this.transport = deps.transport;
    this.store = deps.store;
    this.metrics = deps.metrics;
    this.logger = deps.logger;
    this.sessions = deps.sessions;
    this.auth = this.config.serverPassword
      ? new PasswordAuthProvider(this.config.serverPassword)
      : new NullAuthProvider();
  }

  get port(): number {
    return this.transport.port;
  }

  async start(): Promise<void> {
    await this.store.init();
    this.metrics.setPersistenceHealthy(await this.store.healthy());

    const doc = await this.store.loadWorld(this.config.worldId);
    this.world = doc ? World.fromDocument(doc) : World.createFresh(this.config.worldId, Date.now());

    await this.transport.start({
      onConnection: (conn) => this.onConnection(conn),
      onMessage: (conn, data) => this.onMessage(conn, data),
      onClose: (conn) => this.onClose(conn),
    });

    this.lastTickAt = performance.now();
    const intervalMs = Math.max(1, Math.round(1000 / this.config.avatarTickHz));
    this.tickTimer = setInterval(() => this.tick(), intervalMs);

    this.logger.info(
      {
        port: this.transport.port,
        worldId: this.world.worldId,
        seed: this.world.seed,
        maxPlayers: this.config.maxPlayers,
        passwordProtected: this.config.serverPassword !== null,
      },
      'server started'
    );
  }

  async stop(): Promise<void> {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
      this.tickTimer = null;
    }
    await this.transport.stop();
    await this.store.close();
    this.logger.info('server stopped');
  }

  // --- world simulation loop (never paused) ---

  private tick(): void {
    if (!this.world) return;
    const now = performance.now();
    const delta = now - this.lastTickAt;
    this.lastTickAt = now;
    this.world.tick(delta);
    this.relayAvatars(now);
    this.msSinceWorldTime += delta;
    if (this.msSinceWorldTime >= 1000) {
      this.broadcastWorldTime();
      this.msSinceWorldTime = 0;
    }
  }

  private relayAvatars(now: number): void {
    const active = this.sessions.activeSessions();
    if (active.length < 2) return;
    const t0 = performance.now();
    const withAvatar = active.filter((s) => s.avatar);
    if (withAvatar.length === 0) return;
    for (const recipient of active) {
      const players: AvatarSnapshot[] = [];
      for (const s of withAvatar) {
        if (s !== recipient && s.avatar) players.push(s.avatar);
      }
      if (players.length === 0) continue;
      recipient.send({ t: 'avatar_snapshots', serverTime: Math.round(now), players });
      this.metrics.incMessagesOut();
    }
    this.metrics.recordRelayLatency(performance.now() - t0);
  }

  private broadcastWorldTime(): void {
    if (!this.world) return;
    const c = this.world.clock.snapshot();
    const msg: ServerMessage = {
      t: 'world_time',
      dayTime: c.dayTime,
      gameTime: c.gameTime,
      weather: c.weather,
    };
    this.broadcast(msg);
  }

  // --- connection lifecycle ---

  private onConnection(conn: TransportConnection): void {
    this.sessions.add(new Session(conn, Date.now()));
  }

  private onMessage(conn: TransportConnection, data: string): void {
    const session = this.sessions.getByConnection(conn.id);
    if (!session) return;

    let raw: unknown;
    try {
      raw = JSON.parse(data);
    } catch {
      this.sendError(conn, 'bad_message', 'invalid JSON');
      return;
    }

    const msg = parseClientMessage(raw);
    if (!msg) {
      this.sendError(conn, 'bad_message', 'unrecognized or malformed message');
      return;
    }

    this.route(session, msg);
  }

  private route(session: Session, msg: ClientMessage): void {
    switch (msg.t) {
      case 'keepalive':
        this.onKeepalive(session);
        break;
      case 'join':
        void this.onJoin(session, msg);
        break;
      case 'avatar_state':
        this.onAvatarState(session, msg);
        break;
      case 'command':
        // Implemented in US2 (authoritative world).
        break;
    }
  }

  private async onJoin(session: Session, msg: JoinMessage): Promise<void> {
    if (session.state === 'active') return;
    if (!this.world) {
      this.sendError(session.conn, 'internal', 'world not ready');
      return;
    }
    if (msg.protocolVersion !== PROTOCOL_VERSION) {
      this.sendError(session.conn, 'protocol_version', `server speaks protocol ${PROTOCOL_VERSION}`);
      session.conn.close();
      return;
    }
    const auth = this.auth.authenticate({ password: msg.password });
    if (!auth.ok) {
      this.sendError(session.conn, 'auth', auth.reason ?? 'unauthorized');
      session.conn.close();
      return;
    }
    if (this.sessions.activeCount() >= this.config.maxPlayers) {
      this.sendError(session.conn, 'world_full', 'world is full');
      session.conn.close();
      return;
    }

    const playerId = msg.playerId ?? randomUUID();
    const player = (await this.store.loadPlayer(playerId)) ?? createDefaultPlayer(playerId, msg.displayName, msg.modelId);

    // The connection may have dropped during the await.
    if (this.sessions.getByConnection(session.conn.id) !== session) return;

    session.state = 'active';
    session.info = { playerId, displayName: player.displayName, modelId: player.modelId };
    this.sessions.bindPlayer(session, playerId);

    const peers: PeerInfo[] = this.sessions
      .activeSessions()
      .filter((s) => s !== session && s.info)
      .map((s) => s.info as PeerInfo);

    session.send({
      t: 'joined',
      playerId,
      worldId: this.world.worldId,
      protocolVersion: PROTOCOL_VERSION,
      seed: this.world.seed,
      world: this.world.snapshot(),
      player,
      peers,
    });
    this.metrics.incMessagesOut();

    this.broadcastExcept(session, {
      t: 'peer_joined',
      playerId,
      displayName: session.info.displayName,
      modelId: session.info.modelId,
    });
    this.metrics.setConnectedPlayers(this.sessions.activeCount());
    this.logger.info({ playerId }, 'player joined');
  }

  private onAvatarState(session: Session, msg: AvatarStateMessage): void {
    if (session.state !== 'active' || !session.playerId) return;
    const now = Date.now();
    const prev =
      session.avatar && session.lastAvatarAt !== null
        ? { position: { x: session.avatar.position.x, z: session.avatar.position.z }, at: session.lastAvatarAt }
        : null;
    if (!validateAvatarMove(prev, msg, now)) {
      this.logger.debug({ playerId: session.playerId }, 'dropped avatar state: failed sanity check');
      return;
    }
    session.avatar = {
      playerId: session.playerId,
      position: msg.position,
      rotation: msg.rotation,
      movement: msg.movement,
      heldItemId: msg.heldItemId,
    };
    session.lastAvatarAt = now;
  }

  private onKeepalive(session: Session): void {
    session.lastKeepaliveAt = Date.now();
    session.send({ t: 'pong', serverTime: Math.round(performance.now()) });
    this.metrics.incMessagesOut();
  }

  private onClose(conn: TransportConnection): void {
    const session = this.sessions.remove(conn.id);
    if (session && session.playerId && session.state === 'active') {
      session.state = 'closed';
      this.broadcast({ t: 'peer_left', playerId: session.playerId });
      this.logger.info({ playerId: session.playerId }, 'player disconnected');
    }
    this.metrics.setConnectedPlayers(this.sessions.activeCount());
  }

  // --- helpers ---

  private broadcast(msg: ServerMessage): void {
    for (const s of this.sessions.activeSessions()) {
      s.send(msg);
      this.metrics.incMessagesOut();
    }
  }

  private broadcastExcept(except: Session, msg: ServerMessage): void {
    for (const s of this.sessions.activeSessions()) {
      if (s === except) continue;
      s.send(msg);
      this.metrics.incMessagesOut();
    }
  }

  private sendError(conn: TransportConnection, code: ErrorCode, message: string): void {
    conn.send(JSON.stringify({ t: 'error', code, message } satisfies ServerMessage));
    this.metrics.incMessagesOut();
  }
}
