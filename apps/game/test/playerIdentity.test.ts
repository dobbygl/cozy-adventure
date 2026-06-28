// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredIdentity, setStoredIdentity, clearStoredIdentity } from '../src/playerIdentity.js';

// playerIdentity persists the server-issued { playerId, token } so a returning client can
// reclaim its character. It must round-trip cleanly and reject anything malformed (a
// corrupt value should read as "no identity", not crash the join path).
const KEY = 'cozy:mp:identity';
beforeEach(() => localStorage.clear());

describe('playerIdentity', () => {
  it('is null when nothing is stored', () => {
    expect(getStoredIdentity()).toBeNull();
  });

  it('round-trips a { playerId, token } pair', () => {
    setStoredIdentity('player-1', 'secret-token');
    expect(getStoredIdentity()).toEqual({ playerId: 'player-1', token: 'secret-token' });
  });

  it('clears the stored identity', () => {
    setStoredIdentity('player-1', 'secret-token');
    clearStoredIdentity();
    expect(getStoredIdentity()).toBeNull();
  });

  it('treats corrupt or partial stored data as no identity', () => {
    localStorage.setItem(KEY, 'not-json');
    expect(getStoredIdentity()).toBeNull();

    localStorage.setItem(KEY, JSON.stringify({ playerId: 'p' })); // missing token
    expect(getStoredIdentity()).toBeNull();

    localStorage.setItem(KEY, JSON.stringify({ playerId: '', token: 't' })); // empty id
    expect(getStoredIdentity()).toBeNull();
  });
});
