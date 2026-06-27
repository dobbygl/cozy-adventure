import type { Vec3 } from '@cozy/shared';

/** Horizontal (XZ-plane) distance between two points. Y is ignored for reach/proximity. */
export function distanceXZ(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.z - b.z);
}
