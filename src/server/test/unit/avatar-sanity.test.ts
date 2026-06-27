import { describe, it, expect } from 'vitest';
import { validateAvatarMove, type LastAvatar } from '../../src/session/avatarRelay';
import type { AvatarStateMessage } from '@shared/protocol';

function mk(x: number, z: number): AvatarStateMessage {
  return {
    t: 'avatar_state',
    position: { x, y: 0, z },
    rotation: { x: 0, y: 0, z: 0 },
    movement: 'walking',
    heldItemId: null,
  };
}

describe('avatar sanity validation', () => {
  it('accepts the first state (no previous)', () => {
    expect(validateAvatarMove(null, mk(0, 0), 1000)).toBe(true);
  });

  it('accepts a normal step within the speed budget', () => {
    const prev: LastAvatar = { position: { x: 0, z: 0 }, at: 1000 };
    expect(validateAvatarMove(prev, mk(0.5, 0), 1066)).toBe(true);
  });

  it('rejects a teleport jump', () => {
    const prev: LastAvatar = { position: { x: 0, z: 0 }, at: 1000 };
    expect(validateAvatarMove(prev, mk(100, 100), 1066)).toBe(false);
  });

  it('allows a larger distance over longer elapsed time (sparse updates)', () => {
    const prev: LastAvatar = { position: { x: 0, z: 0 }, at: 1000 };
    // 10 units over 1s is within the 12 u/s budget.
    expect(validateAvatarMove(prev, mk(10, 0), 2000)).toBe(true);
  });
});
