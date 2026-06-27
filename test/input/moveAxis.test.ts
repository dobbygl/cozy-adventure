import { describe, it, expect } from 'vitest';
import { computeMoveAxis } from '../../src/input/touch.js';

// Joystick math: x = right, y = forward (screen-up). Radius 60, deadzone 0.15.
describe('computeMoveAxis', () => {
  it('returns zero inside the deadzone', () => {
    expect(computeMoveAxis(0, 0)).toEqual({ x: 0, y: 0 });
    expect(computeMoveAxis(5, 0)).toEqual({ x: 0, y: 0 }); // 5px < 60*0.15 = 9px
  });

  it('maps a full upward push to forward (+y), magnitude 1', () => {
    const a = computeMoveAxis(0, -60);
    expect(a.x).toBeCloseTo(0, 5);
    expect(a.y).toBeCloseTo(1, 5);
  });

  it('maps right/back to +x / -y', () => {
    expect(computeMoveAxis(60, 0).x).toBeCloseTo(1, 5);
    expect(computeMoveAxis(0, 60).y).toBeCloseTo(-1, 5); // screen-down = backward
  });

  it('clamps magnitude to 1 past full deflection', () => {
    const a = computeMoveAxis(240, 0);
    expect(Math.hypot(a.x, a.y)).toBeCloseTo(1, 5);
  });

  it('preserves diagonal direction while clamping magnitude', () => {
    const a = computeMoveAxis(60, -60); // up-right
    expect(Math.hypot(a.x, a.y)).toBeCloseTo(1, 5);
    expect(a.x).toBeCloseTo(Math.SQRT1_2, 3);
    expect(a.y).toBeCloseTo(Math.SQRT1_2, 3);
  });

  it('scales intensity proportionally between deadzone and full push', () => {
    const half = computeMoveAxis(0, -30); // 30/60 = 0.5
    expect(half.y).toBeCloseTo(0.5, 5);
  });
});
