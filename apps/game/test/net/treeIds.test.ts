import { describe, it, expect } from 'vitest';
import { DYNAMIC_NETWORK_ID_BASE } from '@cozy/shared';
import { treeNetworkIdOffsets, treeNetworkId } from '../../src/net/treeIds';

// The base-tree networkId space is the determinism contract with the server: every
// client must derive the same stable id for the same tree, below the dynamic base.
describe('base-tree networkId allocation', () => {
  // Mirrors the live tree counts in environment.ts (kept in sync by design).
  const counts = [15, 12, 14, 8, 10, 13, 16, 11, 9];

  it('offsets are cumulative per type', () => {
    expect(treeNetworkIdOffsets(counts)).toEqual([0, 15, 27, 41, 49, 59, 72, 88, 99]);
  });

  it('assigns a distinct, stable id to every (type, instance)', () => {
    const offsets = treeNetworkIdOffsets(counts);
    const seen = new Set<number>();
    counts.forEach((count, typeIndex) => {
      for (let i = 0; i < count; i++) {
        const id = treeNetworkId(offsets, typeIndex, i);
        expect(seen.has(id)).toBe(false);
        seen.add(id);
      }
    });
    expect(seen.size).toBe(counts.reduce((a, b) => a + b, 0)); // 108 trees
  });

  it('is deterministic: same inputs yield the same id', () => {
    const a = treeNetworkIdOffsets(counts);
    const b = treeNetworkIdOffsets(counts);
    expect(treeNetworkId(a, 5, 3)).toBe(treeNetworkId(b, 5, 3));
  });

  it('keeps every base-tree id below the dynamic id base', () => {
    const offsets = treeNetworkIdOffsets(counts);
    const maxId = treeNetworkId(offsets, counts.length - 1, counts[counts.length - 1] - 1);
    expect(maxId).toBeLessThan(DYNAMIC_NETWORK_ID_BASE);
  });

  it('throws if the total base-tree count could collide with the dynamic id space', () => {
    expect(() => treeNetworkIdOffsets([DYNAMIC_NETWORK_ID_BASE, 1])).toThrow();
  });
});
