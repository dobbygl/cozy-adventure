import { NetworkSystem, type NetworkConfig, type AvatarStateInput, type JoinResult } from './NetworkSystem.js';
import { RemotePlayerManager, type RemotePlayerFactory } from './RemotePlayerManager.js';
import type {
  WorldCommand,
  WorldDiff,
  WorldSnapshot,
  WorldClockState,
  RejectReason,
  KickReason,
  ErrorCode,
} from '@cozy/shared';

// Orchestrates one multiplayer session: it composes the transport (NetworkSystem)
// with the remote-avatar set (RemotePlayerManager) and wires the handlers between
// them, so Game's own changes stay thin and guarded. THREE-free: the remote
// factory and the clock are injected, so the whole join -> presence -> relay
// orchestration is unit-testable headlessly against an in-process @cozy/server.
// World-mutation events (P2) and lifecycle events (P3) are forwarded to the game
// layer through NetworkSessionHandlers.

/** World/session callbacks the game layer plugs in (world sync, errors, lifecycle). */
export interface NetworkSessionHandlers {
  onWorldEvent?(diff: WorldDiff): void;
  onWorldSnapshot?(world: WorldSnapshot): void;
  onCommandRejected?(seq: number, reason: RejectReason): void;
  onWorldTime?(clock: WorldClockState): void;
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
  handlers?: NetworkSessionHandlers;
}

export class NetworkSession {
  readonly net: NetworkSystem;
  private readonly remoteFactory: RemotePlayerFactory;
  private readonly now: () => number;
  private remotes: RemotePlayerManager | null = null;
  private localPlayerId = '';
  private worldSeed = 0;

  constructor(deps: NetworkSessionDeps) {
    this.remoteFactory = deps.remoteFactory;
    this.now = deps.now;
    const h = deps.handlers ?? {};
    // Presence/relay are handled here; world + lifecycle events forward to the game.
    // The remotes manager is created on connect (once our playerId is known); the
    // arrow handlers null-check it, and peer events only arrive after `joined`, by
    // which point connect() has already created it.
    this.net = new NetworkSystem(deps.config, {
      onPeerJoined: (peer) => this.remotes?.add(peer),
      onPeerLeft: (id) => this.remotes?.remove(id),
      onAvatarSnapshots: (players) => this.remotes?.applySnapshots(players, this.now()),
      onWorldEvent: (diff) => h.onWorldEvent?.(diff),
      onWorldSnapshot: (world) => h.onWorldSnapshot?.(world),
      onCommandRejected: (seq, reason) => h.onCommandRejected?.(seq, reason),
      onWorldTime: (clock) => h.onWorldTime?.(clock),
      onError: (code, message) => h.onError?.(code, message),
      onKick: (reason) => h.onKick?.(reason),
      onClose: () => h.onClose?.(),
    });
  }

  /** Connect, join, and materialize the initial peers. Resolves with the join result. */
  async connect(timeoutMs?: number): Promise<JoinResult> {
    const joined = await this.net.connect(timeoutMs);
    this.localPlayerId = joined.playerId;
    this.worldSeed = joined.seed;
    this.remotes = new RemotePlayerManager(joined.playerId, this.remoteFactory);
    this.remotes.addAll(joined.peers);
    return joined;
  }

  get seed(): number {
    return this.worldSeed;
  }

  get playerId(): string {
    return this.localPlayerId;
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
