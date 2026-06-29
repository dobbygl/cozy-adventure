/**
 * Data that distinguishes one companion from another: which model to load and the
 * shared movement/physics tuning. A second companion is (at minimum) a new
 * definition; only behavior that genuinely diverges needs new code (see Companion).
 */
export interface CompanionDefinition {
  /** Display / debug name. */
  name: string;
  /** Public-relative GLB path, e.g. 'assets/dog_001.glb'. */
  modelUrl: string;
  /** Uniform scale applied to the loaded model. */
  scale: number;
  /** Colour of the fallback box mesh used when the model fails to load. */
  fallbackColor: number;
  /** Horizontal move speed (units/s) at full pace. */
  speed: number;
  /** Max turn rate (rad/s) when facing the movement direction. */
  rotationSpeed: number;
  /** Downward acceleration while airborne (units/s²). */
  gravity: number;
  /** Fallback floor height when no ground collider resolves. */
  groundLevel: number;
  /** Start moving toward the player once farther than this. */
  followDistance: number;
  /** Considered "too close" to the player below this distance. */
  minFollowDistance: number;
  /** How far the companion wanders from the player. */
  wanderRadius: number;
}

/** The dog companion's tuning — the values that lived as literals in DogCompanion. */
export const DOG_DEFINITION: CompanionDefinition = {
  name: 'dog',
  modelUrl: 'assets/dog_001.glb',
  scale: 2.0,
  fallbackColor: 0x8b4513,
  speed: 5,
  rotationSpeed: 8,
  gravity: -15,
  groundLevel: 0,
  followDistance: 3,
  minFollowDistance: 1.5,
  wanderRadius: 5,
};
