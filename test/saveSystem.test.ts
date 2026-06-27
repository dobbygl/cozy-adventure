import { describe, it, expect } from 'vitest';
import { SaveSystem } from '../src/SaveSystem.js';

// The JSON-repair helpers are pure string transforms and the constructor needs no DOM.
const sys = () => new SaveSystem({});

describe('SaveSystem.attemptJSONFix', () => {
  it('removes trailing commas before } and ]', () => {
    const fixed = sys().attemptJSONFix('{"a":1,"b":[1,2,],}');
    expect(() => JSON.parse(fixed)).not.toThrow();
    expect(JSON.parse(fixed)).toEqual({ a: 1, b: [1, 2] });
  });

  it('replaces NaN with 0 and Infinity with sentinels', () => {
    const fixed = sys().attemptJSONFix('{"x": NaN, "y": Infinity, "z": -Infinity}');
    expect(JSON.parse(fixed)).toEqual({ x: 0, y: 999999, z: -999999 });
  });
});

describe('SaveSystem.fixScientificNotation', () => {
  it('expands small exponents into plain integers', () => {
    expect(sys().fixScientificNotation('{"n":1.5e+3}')).toBe('{"n":1500}');
  });

  // Characterization of a KNOWN limitation, not desired behaviour:
  // Number.prototype.toString() re-emits exponents >= 21 in scientific form,
  // so the transform is a no-op for very large numbers. Documented here so a
  // future fix has a failing/locked baseline to change deliberately.
  it('does NOT expand exponents >= 21 (known no-op)', () => {
    expect(sys().fixScientificNotation('{"n":1e+30}')).toContain('1e+30');
  });
});
