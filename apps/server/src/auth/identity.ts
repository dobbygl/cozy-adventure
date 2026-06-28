import { createHmac, timingSafeEqual } from 'node:crypto';

// Stateless per-player reconnect tokens. A token is HMAC(secret, playerId), so the
// server stores NOTHING extra to validate one (no token table, no schema change):
// it just recomputes the HMAC and compares in constant time. With a stable
// `AUTH_SECRET`, tokens stay valid across restarts, so a returning player recovers
// their persisted character; with a per-boot random secret they only last the
// process lifetime (identity resets on restart — fine for ephemeral/dev servers).
//
// Why this fixes impersonation: every peer can see every `playerId` (PeerInfo
// broadcasts it), so a playerId is NOT a secret. The token is the secret. Claiming a
// playerId requires presenting its token, which only its original owner ever received.

/** Issue the opaque reconnect token for a playerId (hex-encoded HMAC-SHA256). */
export function issueToken(playerId: string, secret: string): string {
  return createHmac('sha256', secret).update(playerId).digest('hex');
}

/** Constant-time check that `token` is the one we would have issued for `playerId`. */
export function verifyToken(playerId: string, token: string, secret: string): boolean {
  const expected = issueToken(playerId, secret);
  // Lengths must match for timingSafeEqual; a wrong-length token is simply invalid.
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
