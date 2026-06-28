import type {
  WorldCommand,
  RejectReason,
  WorldDiff,
  PlayerState,
  Vec3,
  BuildingState,
  DropState,
} from '@cozy/shared';
import type { World } from './World';
import { addItem, removeItem } from './inventory';
import { distanceXZ } from './geometry';

/** How far a player may act from their last known position (units). */
export const MAX_REACH = 6;
/**
 * Placeholder resource granted per chopped tree. The real item id lives in the
 * client item registry (reconciled in spec 003); 'wood' is a v1 stand-in.
 */
export const CHOP_RESOURCE_ID = 'wood';

export interface CommandContext {
  world: World;
  player: PlayerState;
  /** Last sanity-validated avatar position, or null if not reported yet. */
  playerPosition: Vec3 | null;
}

export type CommandOutcome =
  | { ok: true; diff: WorldDiff; inventoryDelta?: { itemId: string; delta: number } }
  | { ok: false; reason: RejectReason };

function inReach(ctx: CommandContext, target: Vec3): boolean {
  // Range is enforced only once the player has reported a position (just-joined
  // players with no position yet are not range-checked).
  if (!ctx.playerPosition) return true;
  return distanceXZ(ctx.playerPosition, target) <= MAX_REACH;
}

export function applyCommand(ctx: CommandContext, cmd: WorldCommand, now: number): CommandOutcome {
  switch (cmd.type) {
    case 'chop_tree':
      return chopTree(ctx, cmd, now);
    case 'place_building':
      return placeBuilding(ctx, cmd, now);
    case 'pickup_drop':
      return pickupDrop(ctx, cmd, now);
    case 'drop_item':
      return dropItem(ctx, cmd, now);
  }
}

function chopTree(
  ctx: CommandContext,
  cmd: Extract<WorldCommand, { type: 'chop_tree' }>,
  now: number
): CommandOutcome {
  // No range check: the server doesn't know base-tree positions (they are
  // client-side and seed-deterministic). It only arbitrates double-chop.
  if (ctx.world.isTreeChopped(cmd.networkId)) return { ok: false, reason: 'already_consumed' };
  const diff: WorldDiff = {
    type: 'tree_chopped',
    networkId: cmd.networkId,
    byPlayerId: ctx.player.playerId,
    at: now,
  };
  ctx.world.recordDiff(diff);
  // Best-effort resource grant; a full inventory does not un-chop the tree. The
  // delta tells the client to reflect the grant in its own inventory.
  addItem(ctx.player.inventory, CHOP_RESOURCE_ID, 1);
  return { ok: true, diff, inventoryDelta: { itemId: CHOP_RESOURCE_ID, delta: 1 } };
}

function placeBuilding(
  ctx: CommandContext,
  cmd: Extract<WorldCommand, { type: 'place_building' }>,
  now: number
): CommandOutcome {
  if (ctx.world.isCellOccupied(cmd.cell)) return { ok: false, reason: 'cell_occupied' };
  if (!inReach(ctx, cmd.position)) return { ok: false, reason: 'out_of_range' };
  const entity: BuildingState = {
    networkId: ctx.world.allocateNetworkId(),
    registryType: cmd.registryType,
    position: cmd.position,
    rotation: cmd.rotation,
    level: cmd.level,
    cell: cmd.cell,
    ownerPlayerId: ctx.player.playerId,
  };
  const diff: WorldDiff = { type: 'building_placed', entity, at: now };
  ctx.world.recordDiff(diff);
  return { ok: true, diff };
}

function pickupDrop(
  ctx: CommandContext,
  cmd: Extract<WorldCommand, { type: 'pickup_drop' }>,
  now: number
): CommandOutcome {
  const drop = ctx.world.getDrop(cmd.networkId);
  if (!drop) return { ok: false, reason: 'already_consumed' };
  if (!inReach(ctx, drop.position)) return { ok: false, reason: 'out_of_range' };
  // Check room before consuming the drop (all-or-nothing).
  if (!addItem(ctx.player.inventory, drop.itemId, drop.quantity)) {
    return { ok: false, reason: 'inventory_full' };
  }
  const diff: WorldDiff = {
    type: 'drop_removed',
    networkId: cmd.networkId,
    byPlayerId: ctx.player.playerId,
    byDogOf: null,
    at: now,
  };
  ctx.world.recordDiff(diff);
  return { ok: true, diff, inventoryDelta: { itemId: drop.itemId, delta: drop.quantity } };
}

function dropItem(
  ctx: CommandContext,
  cmd: Extract<WorldCommand, { type: 'drop_item' }>,
  now: number
): CommandOutcome {
  if (!inReach(ctx, cmd.position)) return { ok: false, reason: 'out_of_range' };
  if (!removeItem(ctx.player.inventory, cmd.itemId, cmd.quantity)) {
    return { ok: false, reason: 'invalid' };
  }
  const entity: DropState = {
    networkId: ctx.world.allocateNetworkId(),
    itemId: cmd.itemId,
    quantity: cmd.quantity,
    position: cmd.position,
    spawnedAt: now,
  };
  const diff: WorldDiff = { type: 'drop_spawned', entity, at: now };
  ctx.world.recordDiff(diff);
  return { ok: true, diff, inventoryDelta: { itemId: cmd.itemId, delta: -cmd.quantity } };
}
