// Deterministic, seedable pseudo-random generation shared by client and server.
// Math.random() is NOT reproducible across machines, so a shared world (where the
// server owns the layout) needs a seeded RNG that yields the same sequence everywhere.

/** A pseudo-random generator: each call returns a float in [0, 1). */
export type Rng = () => number;

/**
 * mulberry32: a small, fast, seedable PRNG. Given the same 32-bit seed it always
 * produces the same sequence, on any machine.
 */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash an arbitrary string into a 32-bit unsigned integer (for use as a seed). */
export function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

/** Default world seed used until the server provides one (single-player / local dev). */
export const DEFAULT_WORLD_SEED = 'cozy-adventure';

/**
 * Build the world RNG from a numeric or string seed (defaults to {@link DEFAULT_WORLD_SEED}).
 * In multiplayer the server passes the canonical seed so every client generates the
 * same base world.
 */
export function createWorldRng(seed: number | string = DEFAULT_WORLD_SEED): Rng {
  return mulberry32(toNumericSeed(seed));
}

/**
 * Resolve any seed input to the 32-bit unsigned integer actually fed to the PRNG.
 * Persist THIS value: a saved world reloads to the identical layout regardless of
 * whether it was originally seeded by number or by string.
 */
export function toNumericSeed(seed: number | string = DEFAULT_WORLD_SEED): number {
  return (typeof seed === 'number' ? seed : hashSeed(seed)) >>> 0;
}

/**
 * Pick a fresh random 32-bit seed for a brand-new world. Choosing the seed is a
 * one-time random act; the world it produces is fully deterministic from that seed
 * and gets persisted, so the same world reloads identically. This is the one place
 * Math.random is appropriate: seed selection, not world construction.
 */
export function randomWorldSeed(): number {
  return Math.floor(Math.random() * 0x1_0000_0000) >>> 0;
}
