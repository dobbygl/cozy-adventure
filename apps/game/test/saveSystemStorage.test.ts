// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { SaveSystem } from '../src/SaveSystem.js';

// Exercises the REAL persistence path after the cookie -> localStorage migration:
//   - saves round-trip through localStorage and never touch document.cookie;
//   - network mode (server-authoritative) refuses to write locally;
//   - deleteSave clears the slot; values honour their TTL.
// jsdom provides both `localStorage` and `document.cookie`. A bare `{}` is a valid
// minimal Game: collectGameData() guards every category, so saveGame() succeeds.

beforeEach(() => {
  localStorage.clear();
});

describe('SaveSystem persistence (localStorage-only)', () => {
  it('round-trips a save through localStorage and writes no cookie', () => {
    const sys = new SaveSystem({});
    const ok = sys.saveGame(0);

    expect(ok).toBe(true);
    expect(localStorage.getItem('cozyAdventure_save_0')).not.toBeNull();
    expect(localStorage.getItem('cozyAdventure_meta_0')).not.toBeNull();
    // The whole point of the migration: zero cookies are written.
    expect(document.cookie).toBe('');

    // A fresh instance reads the same data back, parsed.
    const loaded = new SaveSystem({}).loadGameData(0);
    expect(loaded).not.toBeNull();
    expect(loaded.version).toBe('1.0.0');
    expect(loaded.categories.worldState).toBeDefined();
  });

  it('refuses to save locally in network mode (nothing persisted, no cookie)', () => {
    const sys = new SaveSystem({ sessionMode: 'network' });
    const ok = sys.saveGame(0);

    expect(ok).toBe(false);
    expect(localStorage.getItem('cozyAdventure_save_0')).toBeNull();
    expect(localStorage.getItem('cozyAdventure_meta_0')).toBeNull();
    expect(document.cookie).toBe('');
  });

  it('deleteSave removes the slot from localStorage', () => {
    const sys = new SaveSystem({});
    sys.saveGame(0);
    expect(localStorage.getItem('cozyAdventure_save_0')).not.toBeNull();

    expect(sys.deleteSave(0)).toBe(true);
    expect(localStorage.getItem('cozyAdventure_save_0')).toBeNull();
    expect(localStorage.getItem('cozyAdventure_meta_0')).toBeNull();
  });

  it('honours the stored TTL (expired entries read back as null)', () => {
    const sys = new SaveSystem({});
    sys.setLocalStorage('ttlKey', 'hello', 1);
    expect(sys.getLocalStorage('ttlKey')).toBe('hello');

    // Backdate the expiry and confirm it is treated as gone.
    const raw = JSON.parse(localStorage.getItem('ttlKey')!);
    raw.expires = Date.now() - 1000;
    localStorage.setItem('ttlKey', JSON.stringify(raw));
    expect(sys.getLocalStorage('ttlKey')).toBeNull();
  });
});
