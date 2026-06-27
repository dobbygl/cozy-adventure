import type { World } from './World';
import type { Vec3, WorldDiff, InventoryState } from '@cozy/shared';
import { addItem } from './inventory';
import { distanceXZ } from './geometry';

// Companion dog: one per player. Each drop is auto-collected by the dog of the
// nearest player (within a radius). A grace period after spawn means a freshly
// dropped item is left on the ground briefly, so drop_item is meaningful and the
// dog doesn't instantly vacuum it back to the dropper.

export const DOG_PICKUP_RADIUS = 8;
export const DOG_PICKUP_GRACE_MS = 3000;

export interface DogPlayer {
  playerId: string;
  position: Vec3 | null;
  inventory: InventoryState;
}

type PositionedPlayer = DogPlayer & { position: Vec3 };

/**
 * Auto-collect eligible drops for the nearest player's dog. Deterministic:
 * nearest by XZ distance, ties broken by ascending playerId. Reuses the world's
 * diff/record path so dog pickups persist and broadcast like any mutation.
 * Returns the diffs produced (already applied to the world).
 */
export function runDogPickups(world: World, players: DogPlayer[], nowGameTime: number): WorldDiff[] {
  const produced: WorldDiff[] = [];
  const positioned = players.filter((p): p is PositionedPlayer => p.position !== null);
  if (positioned.length === 0) return produced;

  for (const drop of world.listDrops()) {
    if (nowGameTime - drop.spawnedAt < DOG_PICKUP_GRACE_MS) continue;

    let best: PositionedPlayer | null = null;
    let bestDist = Infinity;
    for (const p of positioned) {
      const d = distanceXZ(p.position, drop.position);
      if (d > DOG_PICKUP_RADIUS) continue;
      if (d < bestDist || (d === bestDist && best !== null && p.playerId < best.playerId)) {
        best = p;
        bestDist = d;
      }
    }
    if (!best) continue;
    // If the nearest owner's inventory is full, leave the drop for later.
    if (!addItem(best.inventory, drop.itemId, drop.quantity)) continue;

    const diff: WorldDiff = {
      type: 'drop_removed',
      networkId: drop.networkId,
      byPlayerId: null,
      byDogOf: best.playerId,
      at: nowGameTime,
    };
    world.recordDiff(diff);
    produced.push(diff);
  }
  return produced;
}
