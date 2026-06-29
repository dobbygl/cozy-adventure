import type * as THREE from 'three';

/**
 * Pure spatial/timing queries the fetch brain uses to pick a drop to chase.
 * Extracted from DogCompanion (Fase 5) so the targeting math is deterministic
 * and unit-tested; the brain (which owns the carry-list state) calls these.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DroppedItem = any;

/** Nearest dropped item to `from` by straight-line distance, or null if the list is empty. */
export function findNearestDroppedItem(
  droppedItems: DroppedItem[],
  from: THREE.Vector3,
): DroppedItem | null {
  let nearestItem: DroppedItem | null = null;
  let nearestDistance = Infinity;

  for (const item of droppedItems) {
    const distance = from.distanceTo(item.position);
    if (distance < nearestDistance) {
      nearestItem = item;
      nearestDistance = distance;
    }
  }

  return nearestItem;
}

/**
 * Whether a drop has rested long enough for the dog to take it. `now` is injected
 * (pass Date.now()) so this stays pure and testable.
 *
 * Preserved exactly: the wait is 10_000 ms. The original inline comment said
 * "15 seconds" but the constant has always been 10s — do NOT "correct" the
 * comment by raising the value; that would change behavior.
 */
export function hasItemBeenDroppedLongEnough(item: DroppedItem, now: number): boolean {
  if (!item.userData || !item.userData.dropTime) {
    console.log(
      `⏰ Item ${item.userData?.itemId} has no drop time - assuming it's been there long enough`,
    );
    return true; // If no drop time is recorded, assume it's been there long enough
  }

  const dropTime = item.userData.dropTime;
  const timeOnGround = now - dropTime;
  const minimumWaitTime = 10000; // 10 seconds (NOT 15 — the comment was always wrong)

  const isReady = timeOnGround >= minimumWaitTime;

  if (!isReady) {
    const remainingTime = Math.ceil((minimumWaitTime - timeOnGround) / 1000);
    console.log(`⏰ Item ${item.userData.itemId} needs ${remainingTime} more seconds before dog pickup`);
  } else {
    console.log(
      `✅ Item ${item.userData.itemId} has been on ground for ${Math.floor(timeOnGround / 1000)} seconds - ready for pickup`,
    );
  }

  return isReady;
}
