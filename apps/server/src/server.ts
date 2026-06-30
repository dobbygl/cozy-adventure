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
import { issueToken, verifyToken } from './auth/identity';
import { createDefaultPlayer } from './player';
import { validateAvatarMove } from './session/avatarRelay';
import { applyCommand } from './world/commands';
import { DogSimulation, type DogPlayer } from './world/dog';
import { PROTOCOL_VERSION } from '@cozy/shared';
import type {
  ClientMessage,
  ServerMessage,
  ErrorCode,
  JoinMessage,
  AvatarStateMessage,
  CommandMessage,
  AvatarSnapshot,
  PeerInfo,
  PlayerState,
} from '@cozy/shared';

export interface GameServerDeps {
  config: Config;
  transport: Transport;
  store: Store;
  metrics: Metrics;
  logger: Logger;
  sessions: SessionManager;
  auth: AuthProvider;
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
  /** Live, mutable per-player state for connected players (persisted on save/leave). */
  private readonly players = new Map<string, PlayerState>();
  /** Players in the reconnect window: keep their state in memory until the timer fires. */
  private readonly disconnecting = new Map<string, { lastSeq: number; timer: ReturnType<typeof setTimeout> }>();
  private tickTimer: ReturnType<typeof setInterval> | null = null;
  private lastTickAt = 0;
  private msSinceWorldTime = 0;
  private msSinceSave = 0;
  /** Server-authoritative companion dogs (one per player); stepped every tick. */
  private readonly dogSim = new DogSimulation();

  constructor(deps: GameServerDeps) {
    this.config = deps.config;
    this.transport = deps.transport;
    this.store = deps.store;
    this.metrics = deps.metrics;
    this.logger = deps.logger;
    this.sessions = deps.sessions;
    this.auth = deps.auth;
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
    for (const rec of this.disconnecting.values()) clearTimeout(rec.timer);
    this.disconnecting.clear();
    // Graceful shutdown persists the current world + player state.
    await this.persistAll();
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
    this.sweepTimeouts();
    this.relayAvatars(now);
    // The dog is simulated every tick (smooth movement); dog_state sends are throttled inside.
    this.runDog(delta);
    this.msSinceWorldTime += delta;
    if (this.msSinceWorldTime >= 1000) {
      this.broadcastWorldTime();
      this.msSinceWorldTime = 0;
    }
    this.msSinceSave += delta;
    if (this.msSinceSave >= this.config.saveIntervalMs) {
      this.msSinceSave = 0;
      void this.persistAll();
    }
  }

  private runDog(deltaMs: number): void {
    if (!this.world) return;
    const active = this.sessions.activeSessions();
    const dogPlayers: DogPlayer[] = [];
    for (const s of active) {
      if (!s.playerId) continue;
      const p = this.players.get(s.playerId);
      if (!p) continue;
      dogPlayers.push({ playerId: s.playerId, position: s.avatar?.position ?? null, inventory: p.inventory });
    }
    const step = this.dogSim.step(this.world, dogPlayers, deltaMs, this.world.gameTime);

    // Drop removals are shared world: broadcast to everyone.
    for (const diff of step.diffs) this.broadcast({ t: 'event', diff });
    // Inventory grants + the dog's own state are private to the owner: send to that session.
    for (const grant of step.grants) {
      const owner = active.find((s) => s.playerId === grant.playerId);
      if (owner) {
        owner.send({ t: 'inventory_delta', itemId: grant.itemId, delta: grant.quantity });
        this.metrics.incMessagesOut();
      }
    }
    for (const state of step.states) {
      const owner = active.find((s) => s.playerId === state.playerId);
      if (owner) {
        owner.send({ t: 'dog_state', position: state.position, target: state.target, carrying: state.carrying });
        this.metrics.incMessagesOut();
      }
    }
  }

  /** Disconnect sessions that have gone silent past the grace window (FR-026). */
  private sweepTimeouts(): void {
    const now = Date.now();
    for (const s of this.sessions.all()) {
      if (s.state === 'active' && now - s.lastKeepaliveAt > this.config.keepaliveTimeoutMs) {
        this.logger.info({ playerId: s.playerId }, 'keepalive timeout; closing connection');
        s.send({ t: 'kick', reason: 'timeout' });
        s.conn.close();
      }
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
    // Any inbound message counts as liveness (active players send avatar_state;
    // a hidden tab sends keepalive). The sweep only drops truly silent sessions.
    session.lastKeepaliveAt = Date.now();

    let raw: unknown;
    try {
      raw = JSON.parse(data);
    } catch {
      this.onInvalidMessage(session, 'invalid JSON');
      return;
    }

    const msg = parseClientMessage(raw);
    if (!msg) {
      this.onInvalidMessage(session, 'unrecognized or malformed message');
      return;
    }

    this.route(session, msg);
  }

  /**
   * A malformed message. Report it, and after enough of them close the connection:
   * a legitimate client never sends junk, so a stream of it is abuse (DoS guard).
   */
  private onInvalidMessage(session: Session, message: string): void {
    this.sendError(session.conn, 'bad_message', message);
    if (++session.invalidMessages >= this.config.maxInvalidMessages) {
      this.logger.warn({ playerId: session.playerId }, 'closing connection: too many invalid messages');
      session.conn.close();
    }
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
        this.onCommand(session, msg);
        break;
    }
  }

  private onCommand(session: Session, msg: CommandMessage): void {
    if (session.state !== 'active' || !session.playerId || !this.world) return;
    // Idempotency: a command replayed with a non-increasing seq is a duplicate
    // (e.g. resent on reconnect) and must not be applied twice.
    if (msg.seq <= session.lastSeq) return;
    session.lastSeq = msg.seq;

    const player = this.players.get(session.playerId);
    if (!player) return;

    const outcome = applyCommand(
      { world: this.world, player, playerPosition: session.avatar?.position ?? null },
      msg.cmd,
      this.world.gameTime
    );

    if (outcome.ok) {
      // Apply-on-confirm (v1): broadcast the authoritative event to everyone,
      // including the emitter. A command may produce follow-on diffs (e.g. harvesting
      // spawns the ground drops it yields); broadcast them in order, right after.
      this.broadcast({ t: 'event', diff: outcome.diff });
      if (outcome.extraDiffs) {
        for (const diff of outcome.extraDiffs) this.broadcast({ t: 'event', diff });
      }
      // Tell the actor about any server-authoritative inventory change (pickup grants the
      // drop, drop removes it) so its client reflects it. Harvesting no longer grants here:
      // its yield lands on the ground as drops and is gained on pickup.
      if (outcome.inventoryDelta) {
        session.send({ t: 'inventory_delta', ...outcome.inventoryDelta });
        this.metrics.incMessagesOut();
      }
    } else {
      session.send({ t: 'command_rejected', seq: msg.seq, reason: outcome.reason });
      this.metrics.incMessagesOut();
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
    // Identity: a playerId may only be claimed by presenting its token. A peer can
    // see every playerId (PeerInfo broadcasts it), so the playerId is not a secret —
    // the token is. Without it, a forged playerId would let anyone kick the owner and
    // load their persisted inventory. No playerId => a fresh, server-issued identity.
    let playerId: string;
    if (msg.playerId) {
      if (!msg.token || !verifyToken(msg.playerId, msg.token, this.config.authSecret)) {
        this.logger.warn({ playerId: msg.playerId }, 'rejected join: invalid identity token');
        // 'identity' (not 'auth'): the client should drop its stale identity and retry fresh.
        this.sendError(session.conn, 'identity', 'invalid or missing identity token');
        session.conn.close();
        return;
      }
      playerId = msg.playerId;
    } else {
      playerId = randomUUID();
    }
    const token = issueToken(playerId, this.config.authSecret);

    // Double connection: a still-active session owns this playerId (e.g. a second
    // tab). The new connection wins; the old one is kicked.
    const existing = this.sessions.getByPlayer(playerId);
    if (existing && existing !== session && existing.state === 'active') {
      existing.state = 'closed';
      existing.send({ t: 'kick', reason: 'replaced' });
      this.sessions.remove(existing.conn.id);
      existing.conn.close();
    }

    // Reconnect within the window: cancel the finalize timer and restore the
    // command seq so replayed commands stay idempotent.
    let restoredSeq = 0;
    const reconnecting = this.disconnecting.get(playerId);
    if (reconnecting) {
      clearTimeout(reconnecting.timer);
      this.disconnecting.delete(playerId);
      restoredSeq = reconnecting.lastSeq;
    }

    // Capacity (after any replaced slot is freed).
    if (this.sessions.activeCount() >= this.config.maxPlayers) {
      this.sendError(session.conn, 'world_full', 'world is full');
      session.conn.close();
      return;
    }

    // Reuse live state if still tracked (reconnect within window); else load from
    // the store (new entry from persistence) or start fresh.
    let player = this.players.get(playerId);
    if (!player) {
      player = (await this.store.loadPlayer(playerId)) ?? createDefaultPlayer(playerId, msg.displayName, msg.modelId);
    }

    // The connection may have dropped during the await.
    if (this.sessions.getByConnection(session.conn.id) !== session) return;

    this.players.set(playerId, player);
    session.state = 'active';
    session.lastSeq = restoredSeq;
    session.info = { playerId, displayName: player.displayName, modelId: player.modelId };
    this.sessions.bindPlayer(session, playerId);

    const peers: PeerInfo[] = this.sessions
      .activeSessions()
      .filter((s) => s !== session && s.info)
      .map((s) => s.info as PeerInfo);

    session.send({
      t: 'joined',
      playerId,
      token,
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
      const playerId = session.playerId;
      this.broadcast({ t: 'peer_left', playerId });
      // Capture the last avatar transform into the player document before persisting, so
      // a reload/reconnect resumes at the real position instead of the spawn origin. This
      // also updates the in-memory player reused for a within-window reconnect's snapshot.
      this.captureAvatarIntoPlayer(session);
      // Persist progress now (so it survives even if the reconnect window lapses);
      // if the world just emptied, persist it too (FR-022).
      void this.persistPlayer(playerId);
      if (this.sessions.activeCount() === 0) void this.persistWorld();
      // Open a reconnect window: keep the player's live state in memory until it
      // expires, so a quick reconnect restores identity + confirmed state.
      const prev = this.disconnecting.get(playerId);
      if (prev) clearTimeout(prev.timer);
      const timer = setTimeout(() => this.finalizeDisconnect(playerId), this.config.reconnectWindowMs);
      this.disconnecting.set(playerId, { lastSeq: session.lastSeq, timer });
      this.logger.info({ playerId }, 'player disconnected; reconnect window open');
    }
    this.metrics.setConnectedPlayers(this.sessions.activeCount());
  }

  /** Reconnect window lapsed: drop the in-memory player state (progress already persisted). */
  private finalizeDisconnect(playerId: string): void {
    if (!this.disconnecting.delete(playerId)) return;
    this.players.delete(playerId);
    this.logger.info({ playerId }, 'reconnect window expired');
  }

  // --- persistence ---

  private async persistWorld(): Promise<void> {
    if (!this.world) return;
    try {
      await this.store.saveWorld(this.world.toDocument());
      this.metrics.setPersistenceHealthy(true);
    } catch (err) {
      this.logger.error({ err }, 'failed to persist world; keeping in memory, will retry');
      this.metrics.setPersistenceHealthy(false);
    }
  }

  private async persistPlayer(playerId: string): Promise<void> {
    if (!this.world) return;
    const player = this.players.get(playerId);
    if (!player) return;
    try {
      await this.store.savePlayer(this.world.worldId, player);
      this.metrics.setPersistenceHealthy(true);
    } catch (err) {
      this.logger.error({ err, playerId }, 'failed to persist player; will retry');
      this.metrics.setPersistenceHealthy(false);
    }
  }

  private async persistAll(): Promise<void> {
    await this.persistWorld();
    // Capture the current avatar transform of every connected player before the periodic
    // save, so a crash (no clean onClose) still persists a recent position, not the spawn.
    for (const session of this.sessions.activeSessions()) {
      this.captureAvatarIntoPlayer(session);
    }
    for (const playerId of this.players.keys()) {
      await this.persistPlayer(playerId);
    }
  }

  /**
   * Fold a session's last-known avatar transform into its player document. The avatar is
   * tracked transiently per relay tick (onAvatarState); the player document is what gets
   * persisted and replayed on join, so without this the stored position is always the
   * spawn origin and reconnecting players teleport back to it.
   */
  private captureAvatarIntoPlayer(session: Session): void {
    if (!session.playerId || !session.avatar) return;
    const player = this.players.get(session.playerId);
    if (!player) return;
    player.position = { ...session.avatar.position };
    player.rotation = { ...session.avatar.rotation };
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
