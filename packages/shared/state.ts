// Pure JSON state shapes shared by client and server. THREE-FREE and DOM-safe:
// this module is typechecked by the client (DOM lib) and bundled into the server
// (Node), so it must reference neither `three` nor DOM/Node globals.
//
// These shapes mirror the per-category serialization that the client's SaveSystem
// already produces (player / inventory / environment / buildings / worldState), so
// the same format is the wire format AND the persistence format (no reinvention).

import type { ResourceNodeKind } from './resourceNodes';

/** A 3D vector as plain numbers (never a THREE.Vector3 on the wire). */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Movement state the client already computes in CharacterController.getMovementState(). */
export type MovementState = 'idle' | 'walking' | 'running';

// ---------------------------------------------------------------------------
// Per-player state (owned by the client, stored by the server)
// ---------------------------------------------------------------------------

/** A single inventory slot's contents. */
export interface ItemStackState {
  itemId: string;
  quantity: number;
}

/**
 * Inventory serialized shape — mirrors SaveSystem.serializeInventory().
 * backpack/hotbar are keyed by slot index (sparse: only filled slots present).
 */
export interface InventoryState {
  backpack: Record<number, ItemStackState>;
  hotbar: Record<number, ItemStackState>;
  selectedSlot: number;
}

export interface HealthState {
  current: number;
  max: number;
}

/** Player document, persisted per playerId. */
export interface PlayerState {
  playerId: string;
  displayName: string;
  modelId: string;
  position: Vec3;
  rotation: Vec3;
  health: HealthState;
  inventory: InventoryState;
  selectedSlot: number;
}

// ---------------------------------------------------------------------------
// Networked entities (server-authoritative, identified by stable networkId)
// ---------------------------------------------------------------------------

export type EntityKind = 'player' | 'building' | 'tree' | 'drop' | 'dog';

/** Grid cell of the multi-level building grid (LevelManager). Conflict key. */
export interface BuildingCell {
  level: number;
  gx: number;
  gz: number;
}

/** A placed building (mirrors BuildingSaveManager per registry type). */
export interface BuildingState {
  networkId: number;
  registryType: string;
  position: Vec3;
  rotation: Vec3;
  level: number;
  cell: BuildingCell;
  ownerPlayerId: string;
}

/** A ground drop (item lying in the world). */
export interface DropState {
  networkId: number;
  itemId: string;
  quantity: number;
  position: Vec3;
  spawnedAt: number;
}

/** Companion dog, one per player, follows its owner. */
export interface DogState {
  networkId: number;
  ownerPlayerId: string;
  position: Vec3;
}

// ---------------------------------------------------------------------------
// World state (server-authoritative): seed + diffs
// ---------------------------------------------------------------------------

export interface WorldClockState {
  /** ms within the day cycle [0, 86_400_000). */
  dayTime: number;
  /** monotonic ms of world time elapsed. */
  gameTime: number;
  weather: string;
}

/**
 * A single applied change over the seeded base world. Discriminated by `type`.
 * Applying the same diff twice is a no-op (idempotent) — required for reconnect.
 *
 * Resource nodes (trees, future rocks/ore) are harvested over several hits:
 * `node_damaged` carries the REMAINING health after a hit (monotonically
 * decreasing, so re-replaying an out-of-date value is ignored), and
 * `node_depleted` is the terminal removal once health reaches 0.
 */
export type WorldDiff =
  | {
      type: 'node_damaged';
      networkId: number;
      nodeKind: ResourceNodeKind;
      health: number;
      byPlayerId: string;
      at: number;
    }
  | { type: 'node_depleted'; networkId: number; nodeKind: ResourceNodeKind; byPlayerId: string; at: number }
  | { type: 'building_placed'; entity: BuildingState; at: number }
  | { type: 'building_removed'; networkId: number; byPlayerId: string; at: number }
  | { type: 'drop_spawned'; entity: DropState; at: number }
  | {
      type: 'drop_removed';
      networkId: number;
      byPlayerId: string | null;
      byDogOf: string | null;
      at: number;
    };

/**
 * Full canonical snapshot of the world sent to a client on join / reconnect.
 * The client regenerates the base world from `seed` (deterministic via shared rng)
 * then applies `diffs`; buildings/drops are also provided resolved for convenience.
 */
export interface WorldSnapshot {
  worldId: string;
  seed: number;
  clock: WorldClockState;
  nextNetworkId: number;
  diffs: WorldDiff[];
  buildings: BuildingState[];
  drops: DropState[];
}

/** Persisted world document (keyed by worldId). */
export interface WorldDocument {
  worldId: string;
  seed: number;
  createdAt: number;
  clock: WorldClockState;
  nextNetworkId: number;
  diffs: WorldDiff[];
}
