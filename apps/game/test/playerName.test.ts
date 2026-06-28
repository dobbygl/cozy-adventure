// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MAX_DISPLAY_NAME_LENGTH } from '@cozy/shared';
import { getPlayerName, setPlayerName } from '../src/playerName.js';

// playerName persists the chosen display name in localStorage, sanitized through the
// shared clamp on the way in and out. jsdom provides localStorage.
beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('playerName', () => {
  it('returns an empty name when nothing is stored', () => {
    expect(getPlayerName()).toBe('');
  });

  it('persists a name and reads it back', () => {
    expect(setPlayerName('Ada')).toBe('Ada');
    expect(getPlayerName()).toBe('Ada');
    expect(localStorage.getItem('cozy:playerName')).toBe('Ada');
  });

  it('sanitizes on the way in: collapses whitespace, strips controls, trims', () => {
    expect(setPlayerName('  Ada  Lovelace  ')).toBe('Ada Lovelace');
    expect(setPlayerName('a\nb\tc')).toBe('a b c');
  });

  it('clamps an over-long name to the shared maximum', () => {
    expect(setPlayerName('x'.repeat(100))).toHaveLength(MAX_DISPLAY_NAME_LENGTH);
  });

  it('clears the stored key when the name becomes blank', () => {
    setPlayerName('Ada');
    expect(setPlayerName('   ')).toBe('');
    expect(localStorage.getItem('cozy:playerName')).toBeNull();
    expect(getPlayerName()).toBe('');
  });

  it('degrades to an empty name when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled');
    });
    expect(getPlayerName()).toBe(''); // no throw
  });
});
