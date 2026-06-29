import type { Config } from '../config';
import type { AuthProvider } from './AuthProvider';
import { NullAuthProvider } from './NullAuthProvider';
import { PasswordAuthProvider } from './PasswordAuthProvider';

/**
 * Select the auth provider from config: a password-protected server gets the
 * Password provider, an open one the Null provider. This is the single place
 * that knows the concrete providers, mirroring `createStore` in the composition
 * root, so every I/O boundary (transport, store, auth) is chosen by an
 * injectable factory rather than built inside `GameServer`. New providers
 * (e.g. SSO) plug in here, not in the server.
 */
export function createAuthProvider(config: Config): AuthProvider {
  return config.serverPassword
    ? new PasswordAuthProvider(config.serverPassword)
    : new NullAuthProvider();
}
