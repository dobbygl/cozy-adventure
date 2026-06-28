// The player's multiplayer identity: an opaque, server-issued { playerId, token }
// pair persisted in localStorage. On the first join the client sends neither and
// the server mints both (returned in `joined`); we store them and present them on
// every later join so the player recovers the SAME persisted character — and so a
// peer who sees our playerId still cannot claim it without the token.
//
// DOM-coupled (localStorage) on purpose, like playerName/playerModel — it is wired
// in by game.ts, NOT by the headless net/ layer (NetworkSession carries the token
// in memory for reconnect and never touches storage).

const KEY = 'cozy:mp:identity';

export interface StoredIdentity {
  playerId: string;
  token: string;
}

/** The stored identity, or null if none / storage unavailable / malformed. */
export function getStoredIdentity(): StoredIdentity | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v: unknown = JSON.parse(raw);
    if (
      v &&
      typeof v === 'object' &&
      typeof (v as StoredIdentity).playerId === 'string' &&
      typeof (v as StoredIdentity).token === 'string' &&
      (v as StoredIdentity).playerId.length > 0 &&
      (v as StoredIdentity).token.length > 0
    ) {
      return { playerId: (v as StoredIdentity).playerId, token: (v as StoredIdentity).token };
    }
  } catch {
    // Unavailable or corrupt: treat as no stored identity (a fresh one will be issued).
  }
  return null;
}

/** Persist the identity the server issued in `joined`. Best-effort. */
export function setStoredIdentity(playerId: string, token: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ playerId, token }));
  } catch {
    // Storage unavailable: identity won't persist across reloads (still works in-session).
  }
}

/** Forget the stored identity (e.g. after the server rejects a stale token). */
export function clearStoredIdentity(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage unavailable: nothing to clear.
  }
}
