import { describe, it, expect } from 'vitest';
import { InterpolationBuffer, INTERP_DELAY_MS, type AvatarSample } from '../../src/net/interpolation';

function mk(x: number, yaw = 0, movement: AvatarSample['movement'] = 'walking', held: string | null = null): AvatarSample {
  return { position: { x, y: 0, z: 0 }, rotation: { x: 0, y: yaw, z: 0 }, movement, heldItemId: held };
}

// sample(renderTime) reads the state at target = renderTime - INTERP_DELAY_MS.
// To probe target = T, pass renderTime = T + INTERP_DELAY_MS.
const at = (target: number): number => target + INTERP_DELAY_MS;

describe('InterpolationBuffer', () => {
  it('returns null when empty', () => {
    expect(new InterpolationBuffer().sample(1000)).toBeNull();
  });

  it('interpolates position at the delayed render time', () => {
    const b = new InterpolationBuffer();
    b.push(mk(0), 0);
    b.push(mk(20), 200);
    const s = b.sample(at(100)); // halfway between t=0 and t=200
    expect(s).not.toBeNull();
    expect(s!.position.x).toBeCloseTo(10, 5);
  });

  it('clamps to the first sample before the buffer starts', () => {
    const b = new InterpolationBuffer();
    b.push(mk(5), 1000);
    b.push(mk(15), 1200);
    const s = b.sample(at(900)); // target before first
    expect(s!.position.x).toBe(5);
  });

  it('clamps to the last sample when target is past the newest', () => {
    const b = new InterpolationBuffer();
    b.push(mk(5), 0);
    b.push(mk(15), 100);
    const s = b.sample(at(900)); // target past last
    expect(s!.position.x).toBe(15);
  });

  it('drops out-of-order snapshots', () => {
    const b = new InterpolationBuffer();
    b.push(mk(10), 200);
    b.push(mk(99), 100); // older than the last -> ignored
    const s = b.sample(at(200));
    expect(s!.position.x).toBe(10);
  });

  it('takes discrete fields (movement, held item) from the active sample', () => {
    const b = new InterpolationBuffer();
    b.push(mk(0, 0, 'idle', null), 0);
    b.push(mk(20, 0, 'running', 'axe'), 200);
    const s = b.sample(at(100)); // target 100, active sample is the first
    expect(s!.movement).toBe('idle');
    expect(s!.heldItemId).toBeNull();
  });

  it('interpolates yaw along the shortest path across the wrap', () => {
    const b = new InterpolationBuffer();
    const nearPi = Math.PI - 0.1;
    const wrapped = -Math.PI + 0.1; // shortest path is +0.2, not -2π
    b.push(mk(0, nearPi), 0);
    b.push(mk(0, wrapped), 200);
    const s = b.sample(at(100)); // halfway: yaw should sit at the ±π boundary
    expect(Math.abs(s!.rotation.y)).toBeGreaterThan(Math.PI - 0.2);
  });
});
