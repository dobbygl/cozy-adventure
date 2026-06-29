import { describe, it, expect } from 'vitest';
import { World } from '../../src/world/World';
import { applyCommand, type CommandContext } from '../../src/world/commands';
import { countItem } from '../../src/world/inventory';
import { RESOURCE_NODES, totalYieldFor } from '@cozy/shared';
import type { PlayerState, WorldCommand, DropState, ResourceNodeKind } from '@cozy/shared';

function makePlayer(playerId = 'p'): PlayerState {
  return {
    playerId,
    displayName: playerId,
    modelId: 'default',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    health: { current: 100, max: 100 },
    inventory: { backpack: {}, hotbar: {}, selectedSlot: 0 },
    selectedSlot: 0,
  };
}

function ctxFor(player: PlayerState): CommandContext {
  return { world: World.createFresh('w', 0), player, playerPosition: null };
}

const harvest = (
  networkId: number,
  nodeKind: ResourceNodeKind = 'tree'
): Extract<WorldCommand, { type: 'harvest_node' }> => ({
  type: 'harvest_node',
  networkId,
  nodeKind,
  position: { x: 0, y: 0, z: 0 },
});

/** The ground drops a successful harvest produced (its yield no longer hits the inventory). */
function dropsOf(outcome: ReturnType<typeof applyCommand>): DropState[] {
  if (!outcome.ok || !outcome.extraDiffs) return [];
  return outcome.extraDiffs.flatMap((d) => (d.type === 'drop_spawned' ? [d.entity] : []));
}

const sumOf = (drops: DropState[], itemId: string): number =>
  drops.filter((d) => d.itemId === itemId).reduce((sum, d) => sum + d.quantity, 0);

describe('harvest_node command (multi-hit resource nodes)', () => {
  const tree = RESOURCE_NODES.tree;

  it('damages a tree per hit, dropping wood on the ground (not into the inventory)', () => {
    const player = makePlayer();
    const ctx = ctxFor(player);

    const outcome = applyCommand(ctx, harvest(42), 0);

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.diff.type).toBe('node_damaged');
    if (outcome.diff.type === 'node_damaged') {
      expect(outcome.diff.health).toBe(tree.maxHealth - tree.damagePerHit);
    }
    // The yield lands on the ground (parity with single-player): one wood drop of the
    // per-hit amount, no inventory delta, nothing in the inventory yet.
    const drops = dropsOf(outcome);
    expect(drops).toHaveLength(1);
    expect(drops[0]).toMatchObject({ itemId: tree.yieldItemId, quantity: tree.yieldPerHit });
    expect(outcome.inventoryDelta).toBeUndefined();
    expect(countItem(player.inventory, tree.yieldItemId)).toBe(0);
    expect(ctx.world.isNodeDepleted(42)).toBe(false);
  });

  it('fells the tree on the last hit, dropping the full single-player yield on the ground', () => {
    const player = makePlayer();
    const ctx = ctxFor(player);

    let droppedWood = 0;
    let lastDiffType = '';
    for (let i = 0; i < tree.maxHealth; i++) {
      const outcome = applyCommand(ctx, harvest(7), i);
      expect(outcome.ok).toBe(true);
      if (!outcome.ok) return;
      lastDiffType = outcome.diff.type;
      droppedWood += sumOf(dropsOf(outcome), tree.yieldItemId);
    }

    expect(lastDiffType).toBe('node_depleted'); // the final hit fells it
    expect(ctx.world.isNodeDepleted(7)).toBe(true);
    // Total wood on the ground equals single-player's per-tree yield (13); none is granted
    // straight to the inventory.
    expect(droppedWood).toBe(totalYieldFor(tree));
    expect(countItem(player.inventory, tree.yieldItemId)).toBe(0);
  });

  it('an apple tree also drops apples, capped at 3, on top of the same wood', () => {
    const apple = RESOURCE_NODES.apple_tree;
    const player = makePlayer();
    const ctx = ctxFor(player);

    let wood = 0;
    let apples = 0;
    const applesPerHit: number[] = [];
    for (let i = 0; i < apple.maxHealth; i++) {
      const outcome = applyCommand(ctx, harvest(3, 'apple_tree'), i);
      expect(outcome.ok).toBe(true);
      if (!outcome.ok) return;
      const drops = dropsOf(outcome);
      wood += sumOf(drops, 'wood');
      const a = sumOf(drops, 'apple');
      apples += a;
      applesPerHit.push(a);
    }

    expect(wood).toBe(totalYieldFor(apple)); // wood total matches a normal tree (13)
    expect(apples).toBe(apple.secondaryYield?.maxTotal); // 3 apples, capped
    expect(applesPerHit).toEqual([1, 1, 1, 0, 0]); // deterministic, front-loaded
  });

  it('rejects harvesting an already-depleted node', () => {
    const player = makePlayer();
    const ctx = ctxFor(player);
    for (let i = 0; i < tree.maxHealth; i++) applyCommand(ctx, harvest(9), i);

    const after = applyCommand(ctx, harvest(9), tree.maxHealth);

    expect(after.ok).toBe(false);
    if (after.ok) return;
    expect(after.reason).toBe('already_consumed');
  });

  it('rejects an unknown node kind', () => {
    const player = makePlayer();
    const ctx = ctxFor(player);

    // A forged kind the registry does not know about.
    const outcome = applyCommand(
      ctx,
      { type: 'harvest_node', networkId: 1, nodeKind: 'rock' as never, position: { x: 0, y: 0, z: 0 } },
      0
    );

    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.reason).toBe('invalid');
  });
});

describe('place_building reach (MAX_BUILD_REACH vs MAX_REACH)', () => {
  const placeFloorAt = (x: number): Extract<WorldCommand, { type: 'place_building' }> => ({
    type: 'place_building',
    registryType: 'floor',
    position: { x, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    level: 0,
  });

  function richCtxAtOrigin(): CommandContext {
    const player = makePlayer();
    player.inventory.hotbar = { 0: { itemId: 'wood', quantity: 99 } };
    return { world: World.createFresh('w', 0), player, playerPosition: { x: 0, y: 0, z: 0 } };
  }

  it('allows a build farther than MAX_REACH — a structure reaches farther than a pickup', () => {
    // 10 units out: past MAX_REACH (6) but within MAX_BUILD_REACH (20).
    const outcome = applyCommand(richCtxAtOrigin(), placeFloorAt(10), 0);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.diff.type).toBe('building_placed');
  });

  it('still rejects a build beyond MAX_BUILD_REACH', () => {
    // 25 units out: past MAX_BUILD_REACH (20), so the sanity cap still bites.
    const outcome = applyCommand(richCtxAtOrigin(), placeFloorAt(25), 0);
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.reason).toBe('out_of_range');
  });
});
