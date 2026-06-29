// Wire protocol shared by client and server. THREE-FREE, DOM-safe, and
// DEPENDENCY-FREE: the client typechecks this module without `zod` installed, so
// it carries only types + constants. The runtime validation schemas (zod) live
// server-side (apps/server/src/protocol/schemas.ts), typed against these shapes so
// the schema and the type cannot drift.

import type {
  Vec3,
  MovementState,
  PlayerState,
  WorldSnapshot,
  WorldDiff,
} from './state';
import type { ResourceNodeKind } from './resourceNodes';

/**
 * Bumped on any breaking change to the message shapes. Sent in `join`.
 * v2: chop_tree/tree_chopped generalized to the multi-hit harvest_node command +
 * node_damaged/node_depleted diffs (resource nodes now have health).
 * v3: identity token (join carries an opaque reconnect token, joined returns it;
 * a playerId may only be claimed with its token), and place_building no longer
 * carries `cell` — the server derives the footprint cells from position+rotation.
 * v4: harvest_node carries the node's `position` so the server can spawn the
 * harvested items as ground drops (parity with single-player) instead of granting
 * them straight to the inventory; the apple_tree node kind drops apples too.
 * v5: remove_building command — a client asks the server to demolish a building by
 * networkId; the server emits the existing building_removed diff (which frees the
 * whole footprint) to EVERY client, so demolition is server-authoritative and
 * apply-on-confirm, just like placement (no client-side break in network mode).
 */
export const PROTOCOL_VERSION = 5;

/**
 * Wire-contract id-space split. Base world entities (the seeded trees) are
 * identified by their deterministic generation INDEX, which both client and
 * server derive identically and which lives BELOW this base. The server
 * allocates networkIds for dynamic entities (buildings, drops, dogs) AT or ABOVE
 * this base, so the two id spaces are provably disjoint and never collide.
 * The client (spec 003) MUST keep base-tree indices below this value.
 */
export const DYNAMIC_NETWORK_ID_BASE = 1_000_000;

// ---------------------------------------------------------------------------
// World commands (discrete mutations requested by a client)
// ---------------------------------------------------------------------------

export type WorldCommand =
  | {
      // No `cell`: the server derives the footprint cells from position + rotation +
      // level (so a client can't reserve one cell while rendering somewhere else).
      type: 'place_building';
      registryType: string;
      position: Vec3;
      rotation: Vec3;
      level: number;
    }
  | {
      // `position` is the node's world position: the server has no tree positions of
      // its own (it tracks only diffs), so the client supplies it and the server spawns
      // the harvested wood/apples as ground drops there.
      type: 'harvest_node';
      networkId: number;
      nodeKind: ResourceNodeKind;
      position: Vec3;
    }
  | { type: 'pickup_drop'; networkId: number }
  | { type: 'drop_item'; itemId: string; quantity: number; position: Vec3 }
  // Demolish a building by its server-assigned networkId. The server owns the world
  // map, so removal must round-trip through it: it emits building_removed (freeing the
  // footprint) to every client. No `position` — the server already knows where the
  // building is and range-checks against that.
  | { type: 'remove_building'; networkId: number };

export type WorldCommandType = WorldCommand['type'];

/** Reasons a world command may be rejected (no mutation happened). */
export type RejectReason =
  | 'out_of_range'
  | 'already_consumed'
  | 'cell_occupied'
  | 'inventory_full'
  | 'insufficient_resources'
  | 'unknown_entity'
  | 'invalid';

// ---------------------------------------------------------------------------
// Client -> Server messages
// ---------------------------------------------------------------------------

export interface JoinMessage {
  t: 'join';
  protocolVersion: number;
  password?: string;
  /** Present to recover a previously-issued identity. MUST be accompanied by `token`. */
  playerId?: string;
  /**
   * Opaque reconnect token, issued by the server in `joined` and stored client-side.
   * Required whenever `playerId` is sent: a playerId can only be claimed by the holder
   * of its token, which is what stops a peer (who can see every playerId) from hijacking
   * another player's persisted identity/inventory.
   */
  token?: string;
  displayName?: string;
  modelId?: string;
}

export interface AvatarStateMessage {
  t: 'avatar_state';
  position: Vec3;
  rotation: Vec3;
  movement: MovementState;
  heldItemId: string | null;
}

export interface CommandMessage {
  t: 'command';
  /** Monotonic per-session sequence for ordering/idempotency across reconnects. */
  seq: number;
  cmd: WorldCommand;
}

export interface KeepaliveMessage {
  t: 'keepalive';
}

export type ClientMessage =
  | JoinMessage
  | AvatarStateMessage
  | CommandMessage
  | KeepaliveMessage;

export type ClientMessageType = ClientMessage['t'];

// ---------------------------------------------------------------------------
// Server -> Client messages
// ---------------------------------------------------------------------------

/** Public, broadcastable view of a peer (no private data like camera). */
export interface PeerInfo {
  playerId: string;
  displayName: string;
  modelId: string;
}

export interface JoinedMessage {
  t: 'joined';
  playerId: string;
  /** Opaque token to store and present (with `playerId`) on the next join/reconnect. */
  token: string;
  worldId: string;
  protocolVersion: number;
  seed: number;
  world: WorldSnapshot;
  player: PlayerState;
  peers: PeerInfo[];
}

export interface PeerJoinedMessage extends PeerInfo {
  t: 'peer_joined';
}

export interface PeerLeftMessage {
  t: 'peer_left';
  playerId: string;
}

/** One avatar's transform/animation state in a relay snapshot. */
export interface AvatarSnapshot {
  playerId: string;
  position: Vec3;
  rotation: Vec3;
  movement: MovementState;
  heldItemId: string | null;
}

export interface AvatarSnapshotsMessage {
  t: 'avatar_snapshots';
  serverTime: number;
  players: AvatarSnapshot[];
}

export interface EventMessage {
  t: 'event';
  diff: WorldDiff;
}

export interface CommandRejectedMessage {
  t: 'command_rejected';
  seq: number;
  reason: RejectReason;
}

export interface WorldTimeMessage {
  t: 'world_time';
  dayTime: number;
  gameTime: number;
  weather: string;
}

export interface WorldSnapshotMessage {
  t: 'world_snapshot';
  world: WorldSnapshot;
}

/**
 * A server-authoritative change to the recipient's own inventory, caused by a world
 * command it could not apply locally (chop grants a resource, pickup grants the drop,
 * drop removes the item). Private to the affected player. `delta > 0` is a gain,
 * `delta < 0` a loss. The client applies it on top of its local inventory (which also
 * holds client-only mutations like building cost), so it is a delta, not a snapshot.
 */
export interface InventoryDeltaMessage {
  t: 'inventory_delta';
  itemId: string;
  delta: number;
}

export interface PongMessage {
  t: 'pong';
  serverTime: number;
}

export type ErrorCode =
  | 'auth'
  // A playerId was presented without a valid token (e.g. a stale token after the server
  // restarted with a new secret). Distinct from 'auth' (password) so the client knows it
  // is safe to drop the stored identity and retry as a fresh character.
  | 'identity'
  | 'world_full'
  | 'protocol_version'
  | 'bad_message'
  | 'internal';

export interface ErrorMessage {
  t: 'error';
  code: ErrorCode;
  message: string;
}

export type KickReason = 'replaced' | 'timeout' | 'server_shutdown';

export interface KickMessage {
  t: 'kick';
  reason: KickReason;
}

export type ServerMessage =
  | JoinedMessage
  | PeerJoinedMessage
  | PeerLeftMessage
  | AvatarSnapshotsMessage
  | EventMessage
  | CommandRejectedMessage
  | WorldTimeMessage
  | WorldSnapshotMessage
  | InventoryDeltaMessage
  | PongMessage
  | ErrorMessage
  | KickMessage;

export type ServerMessageType = ServerMessage['t'];
