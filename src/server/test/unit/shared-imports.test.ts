import { describe, it, expect } from 'vitest';
import { PROTOCOL_VERSION } from '@shared/protocol';
import { createWorldRng } from '@shared/rng';
import type { WorldDocument } from '@shared/state';

// Guards the @shared alias wiring and the reuse of the client's seeded rng
// without duplication (server imports the same src/shared/rng.ts).
describe('shared module wiring', () => {
  it('exposes a numeric protocol version', () => {
    expect(typeof PROTOCOL_VERSION).toBe('number');
  });

  it('reuses the shared seeded rng deterministically', () => {
    const a = createWorldRng(42);
    const b = createWorldRng(42);
    expect(a()).toBe(b());
    expect(a()).toBe(b());
  });

  it('shared state types are usable from the server', () => {
    const doc: WorldDocument = {
      worldId: 'w',
      seed: 1,
      createdAt: 0,
      clock: { dayTime: 0, gameTime: 0, weather: 'clear' },
      nextNetworkId: 1,
      diffs: [],
    };
    expect(doc.worldId).toBe('w');
  });
});
