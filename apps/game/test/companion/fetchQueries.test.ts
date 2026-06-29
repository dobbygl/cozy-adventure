import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import {
  findNearestDroppedItem,
  hasItemBeenDroppedLongEnough,
} from '../../src/companion/fetch/fetchQueries.js';

// Pure fetch queries extracted from DogCompanion (Fase 5). `now` is injected, so
// the gating is deterministic without faking the clock.

function drop(x: number, z: number, extra: Record<string, unknown> = {}) {
  return { position: new THREE.Vector3(x, 0, z), userData: { itemId: 'wood', ...extra } };
}

describe('findNearestDroppedItem', () => {
  it('returns null for an empty list', () => {
    expect(findNearestDroppedItem([], new THREE.Vector3())).toBeNull();
  });

  it('returns the closest drop to the origin point', () => {
    const near = drop(1, 0);
    const far = drop(50, 0);
    const found = findNearestDroppedItem([far, near], new THREE.Vector3(0, 0, 0));
    expect(found).toBe(near);
  });
});

describe('hasItemBeenDroppedLongEnough', () => {
  const NOW = 1_000_000;

  it('treats a drop with no dropTime as ready', () => {
    expect(hasItemBeenDroppedLongEnough(drop(0, 0), NOW)).toBe(true);
    expect(hasItemBeenDroppedLongEnough({ userData: undefined } as never, NOW)).toBe(true);
  });

  it('uses a 10s threshold (the inline "15 seconds" comment was always wrong)', () => {
    // 9.999s on the ground -> not ready; exactly 10s -> ready.
    const justUnder = drop(0, 0, { dropTime: NOW - 9_999 });
    const exactly = drop(0, 0, { dropTime: NOW - 10_000 });
    expect(hasItemBeenDroppedLongEnough(justUnder, NOW)).toBe(false);
    expect(hasItemBeenDroppedLongEnough(exactly, NOW)).toBe(true);
  });

  it('is ready once well past the threshold', () => {
    const old = drop(0, 0, { dropTime: NOW - 60_000 });
    expect(hasItemBeenDroppedLongEnough(old, NOW)).toBe(true);
  });
});
