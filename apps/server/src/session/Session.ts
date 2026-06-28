import type { TransportConnection } from '../transport/Transport';
import type { ServerMessage, AvatarSnapshot, PeerInfo } from '@cozy/shared';

export type SessionState =
  | 'connecting'
  | 'authenticating'
  | 'active'
  | 'reconnecting'
  | 'closed';

/**
 * Runtime state of one player's network link. Distinct from the player's
 * persisted identity: a player keeps the same playerId across reconnects, but
 * gets a fresh Session each time.
 */
export class Session {
  state: SessionState = 'connecting';
  playerId: string | null = null;
  info: PeerInfo | null = null;
  lastKeepaliveAt: number;
  /** Last accepted command seq (ordering/idempotency across reconnects). */
  lastSeq = 0;
  /** Count of malformed messages seen on this connection (DoS guard; close past a cap). */
  invalidMessages = 0;
  /** Last sanity-validated avatar state, relayed to peers. */
  avatar: AvatarSnapshot | null = null;
  /** Timestamp (ms) when the last avatar state was accepted (for sanity checks). */
  lastAvatarAt: number | null = null;

  constructor(
    readonly conn: TransportConnection,
    now: number
  ) {
    this.lastKeepaliveAt = now;
  }

  send(msg: ServerMessage): void {
    this.conn.send(JSON.stringify(msg));
  }
}
