import type { AvatarSnapshot, PeerInfo } from '@cozy/shared';

// Owns the set of remote avatars, keyed by playerId (the wire identity for peers;
// networkId is for world entities, not players). THREE-free on purpose: it depends
// only on the injected factory and the RemotePlayerLike surface, so it is
// unit-testable headlessly while Game supplies the real, three-backed factory.
// Clocks are passed in (receivedAt / renderTime) rather than read here, so the
// interpolation timing is deterministic and testable.

/** A discrete, one-shot action a remote avatar can play (driven by relayed events). */
export type RemoteAction = 'axe_hit';

export interface RemotePlayerLike {
  readonly playerId: string;
  load(): Promise<void>;
  pushSnapshot(snap: AvatarSnapshot, receivedAt: number): void;
  update(deltaTime: number, renderTime: number): void;
  /** Play a one-shot action animation (e.g. the chop swing on a confirmed harvest). */
  playAction(action: RemoteAction): void;
  dispose(): void;
}

export type RemotePlayerFactory = (peer: PeerInfo) => RemotePlayerLike;

export class RemotePlayerManager {
  private readonly remotes = new Map<string, RemotePlayerLike>();
  private readonly factory: RemotePlayerFactory;
  private readonly localPlayerId: string;

  constructor(localPlayerId: string, factory: RemotePlayerFactory) {
    this.localPlayerId = localPlayerId;
    this.factory = factory;
  }

  /**
   * Materialize a peer. No-op for our own id or a peer we already track. Kicks off
   * the async model load; the remote is registered immediately so snapshots can
   * buffer before the model finishes loading.
   */
  add(peer: PeerInfo): void {
    if (peer.playerId === this.localPlayerId) return;
    if (this.remotes.has(peer.playerId)) return;
    const remote = this.factory(peer);
    this.remotes.set(peer.playerId, remote);
    void remote.load().catch((err) => {
      console.warn(`RemotePlayer model load failed for ${peer.playerId}:`, err);
    });
  }

  /** Materialize the initial peer set delivered in `joined`. */
  addAll(peers: readonly PeerInfo[]): void {
    for (const peer of peers) this.add(peer);
  }

  /** Remove and dispose a peer that left. */
  remove(playerId: string): void {
    const remote = this.remotes.get(playerId);
    if (!remote) return;
    remote.dispose();
    this.remotes.delete(playerId);
  }

  /**
   * Route a relay batch into each peer's interpolation buffer. Skips our own
   * avatar and any unknown peer (a snapshot that arrived before its peer_joined),
   * so no phantom remote is ever created.
   */
  applySnapshots(players: readonly AvatarSnapshot[], receivedAt: number): void {
    for (const snap of players) {
      if (snap.playerId === this.localPlayerId) continue;
      this.remotes.get(snap.playerId)?.pushSnapshot(snap, receivedAt);
    }
  }

  /** Advance every remote's animation + interpolated transform. */
  update(deltaTime: number, renderTime: number): void {
    for (const remote of this.remotes.values()) remote.update(deltaTime, renderTime);
  }

  has(playerId: string): boolean {
    return this.remotes.has(playerId);
  }

  /**
   * Play a one-shot action on a specific remote (e.g. the chop swing, triggered by a
   * confirmed harvest event carrying that player's id). No-op for our own id (the local
   * avatar animates itself) or an unknown peer.
   */
  playAction(playerId: string, action: RemoteAction): void {
    if (playerId === this.localPlayerId) return;
    this.remotes.get(playerId)?.playAction(action);
  }

  /** Drop (and dispose) every remote not in `keep` — used to reconcile presence on reconnect. */
  prune(keep: Set<string>): void {
    for (const playerId of [...this.remotes.keys()]) {
      if (!keep.has(playerId)) this.remove(playerId);
    }
  }

  get size(): number {
    return this.remotes.size;
  }

  /** Symmetric teardown: dispose every remote and clear the map. */
  disposeAll(): void {
    for (const remote of this.remotes.values()) remote.dispose();
    this.remotes.clear();
  }
}
