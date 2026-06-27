import type { Vec3, MovementState } from '@cozy/shared';

// Pure, DOM-free, three-free interpolation buffer for a remote avatar. Holds
// recent timestamped snapshots and samples a smoothed transform at a fixed delay
// behind real time, so network jitter never shows as teleporting. Continuous
// fields (position, rotation) are interpolated; discrete fields (movement, held
// item) take the value in effect at the sampled instant.

export const INTERP_DELAY_MS = 100;
const MAX_SAMPLES = 20;
const TWO_PI = Math.PI * 2;

export interface AvatarSample {
  position: Vec3;
  rotation: Vec3;
  movement: MovementState;
  heldItemId: string | null;
}

interface Timed extends AvatarSample {
  t: number;
}

function lerp(a: number, b: number, f: number): number {
  return a + (b - a) * f;
}

function lerpVec(a: Vec3, b: Vec3, f: number): Vec3 {
  return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f), z: lerp(a.z, b.z, f) };
}

/** Interpolate an angle along the shortest path (handles wrap-around at ±π). */
function lerpAngle(a: number, b: number, f: number): number {
  let delta = (b - a) % TWO_PI;
  if (delta > Math.PI) delta -= TWO_PI;
  else if (delta < -Math.PI) delta += TWO_PI;
  return a + delta * f;
}

function lerpEuler(a: Vec3, b: Vec3, f: number): Vec3 {
  return { x: lerpAngle(a.x, b.x, f), y: lerpAngle(a.y, b.y, f), z: lerpAngle(a.z, b.z, f) };
}

function strip(s: Timed): AvatarSample {
  return { position: s.position, rotation: s.rotation, movement: s.movement, heldItemId: s.heldItemId };
}

export class InterpolationBuffer {
  private samples: Timed[] = [];

  /** Add a snapshot received at time `t` (ms). Out-of-order/duplicate frames are dropped. */
  push(sample: AvatarSample, t: number): void {
    const last = this.samples[this.samples.length - 1];
    if (last && t <= last.t) return;
    this.samples.push({ ...sample, t });
    if (this.samples.length > MAX_SAMPLES) this.samples.shift();
  }

  /** Smoothed state at `renderTime - INTERP_DELAY_MS`, or null if the buffer is empty. */
  sample(renderTime: number): AvatarSample | null {
    if (this.samples.length === 0) return null;
    const target = renderTime - INTERP_DELAY_MS;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    if (target <= first.t) return strip(first);
    if (target >= last.t) return strip(last);

    for (let i = 0; i < this.samples.length - 1; i++) {
      const a = this.samples[i];
      const b = this.samples[i + 1];
      if (target >= a.t && target <= b.t) {
        const span = b.t - a.t;
        const f = span > 0 ? (target - a.t) / span : 0;
        return {
          position: lerpVec(a.position, b.position, f),
          rotation: lerpEuler(a.rotation, b.rotation, f),
          // Discrete fields: the value in effect up to the sampled instant.
          movement: a.movement,
          heldItemId: a.heldItemId,
        };
      }
    }
    return strip(last);
  }

  /** Whether any snapshot has been received yet. */
  get hasData(): boolean {
    return this.samples.length > 0;
  }
}
