import { describe, it, expect } from 'vitest';
import { zoneForX } from '../../src/input/touch.js';

// Left half drives movement, right half drives the camera.
describe('zoneForX', () => {
  it('assigns the left half to move', () => {
    expect(zoneForX(100, 800)).toBe('move');
    expect(zoneForX(0, 800)).toBe('move');
  });

  it('assigns the right half to look', () => {
    expect(zoneForX(500, 800)).toBe('look');
    expect(zoneForX(799, 800)).toBe('look');
  });

  it('treats the exact midpoint as look (right side)', () => {
    expect(zoneForX(400, 800)).toBe('look');
  });
});
