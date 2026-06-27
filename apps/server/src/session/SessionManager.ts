import { Session } from './Session';
import type { ConnectionId } from '../transport/Transport';

/** Registry of all sessions in the world, indexed by connection and by player. */
export class SessionManager {
  private byConnection = new Map<ConnectionId, Session>();
  private byPlayer = new Map<string, Session>();

  add(session: Session): void {
    this.byConnection.set(session.conn.id, session);
  }

  getByConnection(id: ConnectionId): Session | undefined {
    return this.byConnection.get(id);
  }

  getByPlayer(playerId: string): Session | undefined {
    return this.byPlayer.get(playerId);
  }

  /** Bind a connection's session to a playerId (on join). */
  bindPlayer(session: Session, playerId: string): void {
    session.playerId = playerId;
    this.byPlayer.set(playerId, session);
  }

  remove(id: ConnectionId): Session | undefined {
    const session = this.byConnection.get(id);
    if (!session) return undefined;
    this.byConnection.delete(id);
    if (session.playerId && this.byPlayer.get(session.playerId) === session) {
      this.byPlayer.delete(session.playerId);
    }
    return session;
  }

  /** Sessions that have completed join (state === 'active'). */
  activeSessions(): Session[] {
    return [...this.byConnection.values()].filter((s) => s.state === 'active');
  }

  /** All sessions regardless of state. */
  all(): Session[] {
    return [...this.byConnection.values()];
  }

  /** Count of active (joined) players. */
  activeCount(): number {
    return this.activeSessions().length;
  }
}
