import { describe, it, expect } from 'vitest';
import { exceedsDragThreshold } from '../../src/input/touch.js';

// In the camera zone, a touch under the threshold stays a tap (chop/use); past
// it, the touch becomes a camera drag.
describe('exceedsDragThreshold', () => {
  it('treats a near-stationary touch as a tap (below threshold)', () => {
    expect(exceedsDragThreshold(0, 0)).toBe(false);
    expect(exceedsDragThreshold(5, 5)).toBe(false); // ~7px < 10px
  });

  it('treats movement past the threshold as a drag', () => {
    expect(exceedsDragThreshold(10, 0)).toBe(true);
    expect(exceedsDragThreshold(0, 20)).toBe(true);
  });

  it('honours a custom threshold', () => {
    expect(exceedsDragThreshold(15, 0, 20)).toBe(false);
    expect(exceedsDragThreshold(25, 0, 20)).toBe(true);
  });
});
