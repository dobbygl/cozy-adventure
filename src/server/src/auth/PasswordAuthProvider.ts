import type { AuthProvider, AuthCredentials, AuthResult } from './AuthProvider';

/** Server-password access (Valheim-style). Active when SERVER_PASSWORD is set. */
export class PasswordAuthProvider implements AuthProvider {
  constructor(private readonly password: string) {}

  authenticate(credentials: AuthCredentials): AuthResult {
    if (credentials.password === this.password) return { ok: true };
    return { ok: false, reason: 'invalid or missing password' };
  }
}
