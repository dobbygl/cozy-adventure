import type {
  WorldCommand,
  RejectReason,
  WorldDiff,
  PlayerState,
  Vec3,
  BuildingState,
  DropState,
} from '@cozy/shared';
import { getResourceNode } from '@cozy/shared';
import type { World } from './World';
import { addItem, removeItem } from './inventory';
import { distanceXZ } from './geometry';

/** How far a player may act from their last known position (units). */
export const MAX_REACH = 6;

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
    case 'harvest_node':
      return harvestNode(ctx, cmd, now);
    case 'place_building':
      return placeBuilding(ctx, cmd, now);
    case 'pickup_drop':
      return pickupDrop(ctx, cmd, now);
    case 'drop_item':
      return dropItem(ctx, cmd, now);
  }
}

/**
 * One hit on a harvestable resource node (tree, future rock/ore). Server-authoritative
 * health: each hit removes `damagePerHit`, granting `yieldPerHit` (plus the felling
 * bonus on the depleting hit), so a tree falls after `maxHealth` hits with the same
 * total yield as single-player. Emits `node_damaged` while alive, `node_depleted` on
 * the final hit; the per-hit grant is reported via inventoryDelta only when it fit.
 *
 * No range check: the server doesn't know base-node positions (they are client-side
 * and seed-deterministic). It only tracks health and arbitrates over-harvest. The
 * node kind is client-declared (the client tags each mesh); for base nodes the server
 * trusts it, exactly as it already trusts the chop target — a v1 simplification.
 */
function harvestNode(
  ctx: CommandContext,
  cmd: Extract<WorldCommand, { type: 'harvest_node' }>,
  now: number
): CommandOutcome {
  const def = getResourceNode(cmd.nodeKind);
  if (!def) return { ok: false, reason: 'invalid' };
  if (ctx.world.isNodeDepleted(cmd.networkId)) return { ok: false, reason: 'already_consumed' };

  const current = ctx.world.nodeHealth(cmd.networkId) ?? def.maxHealth;
  const remaining = current - def.damagePerHit;
  const depleted = remaining <= 0;

  const diff: WorldDiff = depleted
    ? { type: 'node_depleted', networkId: cmd.networkId, nodeKind: def.kind, byPlayerId: ctx.player.playerId, at: now }
    : {
        type: 'node_damaged',
        networkId: cmd.networkId,
        nodeKind: def.kind,
        health: remaining,
        byPlayerId: ctx.player.playerId,
        at: now,
      };
  ctx.world.recordDiff(diff);

  // Per-hit yield, plus the felling bonus on the depleting hit. Best-effort: a full
  // inventory doesn't undo the hit. addItem is all-or-nothing, so only report the
  // delta when it actually fit, or the client would gain items authority never granted.
  const amount = def.yieldPerHit + (depleted ? def.yieldBonusOnDeplete : 0);
  const granted = addItem(ctx.player.inventory, def.yieldItemId, amount);
  return granted
    ? { ok: true, diff, inventoryDelta: { itemId: def.yieldItemId, delta: amount } }
    : { ok: true, diff };
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
