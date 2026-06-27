/** Credentials a client supplies on join. */
export interface AuthCredentials {
  password?: string;
}

export interface AuthResult {
  ok: boolean;
  reason?: string;
}

/**
 * Pluggable authentication boundary (FR-004). v1 ships Null (open) and Password
 * providers; other providers (e.g. SSO) can be added later without touching the
 * rest of the server.
 */
export interface AuthProvider {
  authenticate(credentials: AuthCredentials): AuthResult;
}
