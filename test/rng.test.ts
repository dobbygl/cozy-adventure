import { describe, it, expect } from 'vitest';
import { mulberry32, hashSeed, createWorldRng } from '../src/shared/rng';

describe('mulberry32', () => {
  it('is deterministic: same seed produces the same sequence', () => {
    const a = mulberry32(12345);
    const b = mulberry32(12345);
    const seqA = Array.from({ length: 8 }, () => a());
    const seqB = Array.from({ length: 8 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('returns floats in [0, 1)', () => {
    const r = mulberry32(1);
    for (let i = 0; i < 1000; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('different seeds produce different sequences', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});

describe('hashSeed', () => {
  it('is deterministic and returns a 32-bit unsigned integer', () => {
    const h = hashSeed('vendetta');
    expect(h).toBe(hashSeed('vendetta'));
    expect(Number.isInteger(h)).toBe(true);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThanOrEqual(0xffffffff);
  });

  it('maps different strings to different hashes', () => {
    expect(hashSeed('a')).not.toBe(hashSeed('b'));
  });
});

describe('createWorldRng', () => {
  it('accepts a string seed deterministically', () => {
    expect(createWorldRng('world-1')()).toBe(createWorldRng('world-1')());
  });

  it('maps different string seeds to different streams', () => {
    expect(createWorldRng('world-1')()).not.toBe(createWorldRng('world-2')());
  });

  it('defaults to a fixed seed, so the world is reproducible across runs', () => {
    expect(createWorldRng()()).toBe(createWorldRng()());
  });
});
