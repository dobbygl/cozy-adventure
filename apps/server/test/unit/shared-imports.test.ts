import { describe, it, expect } from 'vitest';
import { PROTOCOL_VERSION } from '@cozy/shared';
import { createWorldRng } from '@cozy/shared';
import type { WorldDocument } from '@cozy/shared';

// Guards the @cozy/shared workspace wiring and the reuse of the client's seeded
// rng without duplication (server imports the same packages/shared/rng.ts).
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
