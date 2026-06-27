import type { AuthProvider, AuthResult } from './AuthProvider';

/** Open server: anyone may join (LAN / trusted friends). */
export class NullAuthProvider implements AuthProvider {
  authenticate(): AuthResult {
    return { ok: true };
  }
}
