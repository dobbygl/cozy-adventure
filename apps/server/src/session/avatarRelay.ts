import type { AvatarStateMessage } from '@cozy/shared';

// Avatar sanity validation (FR-010). The avatar is client-authoritative, but the
// server cheaply rejects physically impossible moves so a manipulated or buggy
// client can't teleport across the world for everyone else.

/** Generous upper bound on horizontal speed (units/second) for a running avatar. */
export const MAX_SPEED_UNITS_PER_SEC = 12;

/**
 * Extra distance allowed per update on top of the speed budget, absorbing jitter,
 * falls and sparse updates. Mirrors the 3.0 anti-teleport guard in the client's
 * CollisionSystem: a single update may never jump more than this beyond what the
 * speed cap permits.
 */
export const ANTI_TELEPORT_MARGIN = 3.0;

export interface LastAvatar {
  position: { x: number; z: number };
  /** Timestamp (ms) when this state was accepted. */
  at: number;
}

/**
 * Returns true if `next` is a plausible continuation of `prev` at time `now`.
 * The first state for a session (prev === null) is always accepted.
 */
export function validateAvatarMove(
  prev: LastAvatar | null,
  next: AvatarStateMessage,
  now: number
): boolean {
  if (!prev) return true;
  const dx = next.position.x - prev.position.x;
  const dz = next.position.z - prev.position.z;
  const dist = Math.hypot(dx, dz);
  const dtSec = Math.max(1, now - prev.at) / 1000;
  const allowed = MAX_SPEED_UNITS_PER_SEC * dtSec + ANTI_TELEPORT_MARGIN;
  return dist <= allowed;
}
