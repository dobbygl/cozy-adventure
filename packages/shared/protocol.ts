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
  BuildingCell,
} from './state';

/** Bumped on any breaking change to the message shapes. Sent in `join`. */
export const PROTOCOL_VERSION = 1;

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
      type: 'place_building';
      registryType: string;
      position: Vec3;
      rotation: Vec3;
      level: number;
      cell: BuildingCell;
    }
  | { type: 'chop_tree'; networkId: number }
  | { type: 'pickup_drop'; networkId: number }
  | { type: 'drop_item'; itemId: string; quantity: number; position: Vec3 };

export type WorldCommandType = WorldCommand['type'];

/** Reasons a world command may be rejected (no mutation happened). */
export type RejectReason =
  | 'out_of_range'
  | 'already_consumed'
  | 'cell_occupied'
  | 'inventory_full'
  | 'unknown_entity'
  | 'invalid';

// ---------------------------------------------------------------------------
// Client -> Server messages
// ---------------------------------------------------------------------------

export interface JoinMessage {
  t: 'join';
  protocolVersion: number;
  password?: string;
  /** Present on reconnect to recover identity within the reconnect window. */
  playerId?: string;
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
