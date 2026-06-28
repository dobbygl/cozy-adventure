import {
  NetworkSystem,
  type NetworkConfig,
  type NetworkHandlers,
  type AvatarStateInput,
  type JoinResult,
} from './NetworkSystem.js';
import { RemotePlayerManager, type RemotePlayerFactory } from './RemotePlayerManager.js';
import { ClientWorld, type WorldChangeHandlers } from './ClientWorld.js';
import type {
  WorldCommand,
  WorldDiff,
  WorldSnapshot,
  WorldClockState,
  RejectReason,
  KickReason,
  ErrorCode,
  PeerInfo,
} from '@cozy/shared';

// Orchestrates one multiplayer session: it composes the transport (NetworkSystem)
// with the remote-avatar set (RemotePlayerManager) and wires the handlers between
// them, so Game's own changes stay thin and guarded. THREE-free: the remote
// factory and the clock are injected, so the whole join -> presence -> relay
// orchestration is unit-testable headlessly against an in-process @cozy/server.
// World-mutation events (P2) and lifecycle events (P3) are forwarded to the game
// layer through NetworkSessionHandlers.

/** Session lifecycle callbacks the game layer plugs in (rejections, errors, time, close). */
export interface NetworkSessionHandlers {
  onCommandRejected?(seq: number, reason: RejectReason): void;
  onWorldTime?(clock: WorldClockState): void;
  /** A server-authoritative change to our own inventory (chop/pickup/drop). */
  onInventoryDelta?(itemId: string, delta: number): void;
  onError?(code: ErrorCode, message: string): void;
  onKick?(reason: KickReason): void;
  onClose?(): void;
}

export interface NetworkSessionDeps {
  config: NetworkConfig;
  /** Builds a remote avatar; injected so the session is testable without three. */
  remoteFactory: RemotePlayerFactory;
  /** Monotonic client clock in ms (e.g. () => performance.now()); injected for tests. */
  now: () => number;
  /** Scene-change callbacks for confirmed world diffs (tree/building/drop add/remove). */
  worldHandlers?: WorldChangeHandlers;
  handlers?: NetworkSessionHandlers;
}

export class NetworkSession {
  net: NetworkSystem;
  /** The client's view of the authoritative world (diffs applied to derived state + scene). */
  readonly world: ClientWorld;
  private readonly config: NetworkConfig;
  private readonly netHandlers: NetworkHandlers;
  private readonly remoteFactory: RemotePlayerFactory;
  private readonly now: () => number;
  private remotes: RemotePlayerManager | null = null;
  private localPlayerId = '';
  private localToken = '';
  private worldSeed = 0;
  // Materialization is deferred until begin(): connect() can run before the scene
  // exists (so a bad URL fails before anything is built). Peers and world diffs that
  // arrive while the scene loads are buffered here, then flushed once it is ready.
  private started = false;
  private pendingPeers: PeerInfo[] = [];
  private pendingWorld: WorldSnapshot | null = null;
  private pendingDiffs: WorldDiff[] = [];

  constructor(deps: NetworkSessionDeps) {
    this.config = deps.config;
    this.remoteFactory = deps.remoteFactory;
    this.now = deps.now;
    this.world = new ClientWorld(deps.worldHandlers);
    const h = deps.handlers ?? {};
    // Presence/relay/world-sync are handled here; rejection/error/time/close forward
    // to the game. Before begin(), peer and world events are buffered (no scene yet).
    // The handlers reference `this`, so they survive a transport swap on reconnect.
    this.netHandlers = {
      onPeerJoined: (peer) => this.onPeerJoined(peer),
      onPeerLeft: (id) => this.onPeerLeft(id),
      onAvatarSnapshots: (players) => {
        if (this.started) this.remotes?.applySnapshots(players, this.now());
      },
      onWorldEvent: (diff) => {
        if (this.started) this.world.applyDiff(diff);
        else this.pendingDiffs.push(diff);
      },
      onWorldSnapshot: (world) => {
        if (this.started) this.world.loadSnapshot(world);
        else this.pendingWorld = world;
      },
      onCommandRejected: (seq, reason) => h.onCommandRejected?.(seq, reason),
      onWorldTime: (clock) => h.onWorldTime?.(clock),
      onInventoryDelta: (itemId, delta) => h.onInventoryDelta?.(itemId, delta),
      onError: (code, message) => h.onError?.(code, message),
      onKick: (reason) => h.onKick?.(reason),
      onClose: () => h.onClose?.(),
    };
    this.net = new NetworkSystem(this.config, this.netHandlers);
  }

  /**
   * Connect and join. Resolves with the join result (seed, playerId, peers). Needs
   * no scene, so it can run before the world is built; a bad URL/server rejects here
   * before anything is torn down. Initial peers are buffered until {@link begin}.
   */
  async connect(timeoutMs?: number): Promise<JoinResult> {
    const joined = await this.net.connect(timeoutMs);
    this.localPlayerId = joined.playerId;
    this.localToken = joined.token;
    this.worldSeed = joined.seed;
    this.remotes = new RemotePlayerManager(joined.playerId, this.remoteFactory);
    this.pendingPeers = [...joined.peers];
    this.pendingWorld = joined.world;
    return joined;
  }

  /**
   * Start materializing remote avatars (call once the scene exists). Flushes peers
   * that joined during connect/loading and lets subsequent snapshots render.
   */
  begin(): void {
    if (this.started) return;
    this.started = true;
    // Materialize the world as of join, then any diffs that arrived during loading,
    // then the peers (order: world before its later diffs; peers independent).
    if (this.pendingWorld) {
      this.world.loadSnapshot(this.pendingWorld);
      this.pendingWorld = null;
    }
    for (const diff of this.pendingDiffs) this.world.applyDiff(diff);
    this.pendingDiffs = [];
    for (const peer of this.pendingPeers) this.remotes?.add(peer);
    this.pendingPeers = [];
  }

  /**
   * Reconnect the transport in place after a drop, recovering our playerId within the
   * server's window. Keeps the ClientWorld and remote avatars: the recovered snapshot
   * replays idempotently (already-applied diffs are no-ops) and presence is reconciled
   * (new peers added, departed peers pruned). Throws if the reconnect fails.
   */
  async reconnect(timeoutMs?: number): Promise<JoinResult> {
    this.net.destroy();
    // Resend playerId + token so the server lets us reclaim our identity in place.
    this.net = new NetworkSystem(
      { ...this.config, playerId: this.localPlayerId, token: this.localToken },
      this.netHandlers
    );
    const joined = await this.net.connect(timeoutMs);
    this.localPlayerId = joined.playerId;
    this.localToken = joined.token;
    this.worldSeed = joined.seed;
    this.remotes ??= new RemotePlayerManager(joined.playerId, this.remoteFactory);
    if (this.started) {
      this.world.loadSnapshot(joined.world); // idempotent: existing entities no-op, new ones apply
      const present = new Set(joined.peers.map((p) => p.playerId));
      for (const peer of joined.peers) this.remotes.add(peer);
      this.remotes.prune(present);
    } else {
      this.pendingWorld = joined.world;
      this.pendingPeers = [...joined.peers];
    }
    return joined;
  }

  private onPeerJoined(peer: PeerInfo): void {
    if (this.started) this.remotes?.add(peer);
    else this.pendingPeers.push(peer);
  }

  private onPeerLeft(id: string): void {
    if (this.started) this.remotes?.remove(id);
    else this.pendingPeers = this.pendingPeers.filter((p) => p.playerId !== id);
  }

  get seed(): number {
    return this.worldSeed;
  }

  get playerId(): string {
    return this.localPlayerId;
  }

  /** The server-issued reconnect token for this identity (persist it client-side). */
  get token(): string {
    return this.localToken;
  }

  get isConnected(): boolean {
    return this.net.isConnected;
  }

  get peerCount(): number {
    return this.remotes?.size ?? 0;
  }

  /** Set the local avatar state; NetworkSystem relays it at ~15 Hz (not per frame). */
  setLocalAvatar(state: AvatarStateInput): void {
    this.net.setAvatarState(state);
  }

  /** Request a world mutation; returns the per-session seq (applied on the confirmed event). */
  sendCommand(cmd: WorldCommand): number {
    return this.net.sendCommand(cmd);
  }

  /** Advance remote avatars (interpolation + animation). `renderTime` in ms. */
  update(deltaTime: number, renderTime: number): void {
    this.remotes?.update(deltaTime, renderTime);
  }

  /** Symmetric teardown: remotes first, then the transport. */
  destroy(): void {
    this.remotes?.disposeAll();
    this.remotes = null;
    this.net.destroy();
  }
}
