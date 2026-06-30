import type { World } from './World';
import type { Vec3, WorldDiff, InventoryState } from '@cozy/shared';
import { addItem } from './inventory';
import { distanceXZ } from './geometry';

// Server-authoritative companion dog: one per player. The server owns the dog's decisions AND
// its simulated position; it advances each dog toward a target every tick, does the pickup when
// IT reaches a drop, and pushes the owner a dog_state (target waypoint + authoritative position +
// carry count). The client renders/interpolates that — it never decides or mutates. This is the
// network counterpart of the single-player DogCompanion brain (fetch nearest drop -> carry ->
// return to player -> deliver), kept deliberately simple (no wander/idle flavor; that stays
// client-cosmetic when the dog is just following).

/** A drop is only fetched once it has rested this long (so drop_item stays meaningful). */
export const DOG_PICKUP_GRACE_MS = 3000;
/** The dog only fetches drops within this XZ radius of its OWNER (leash), not the whole map. */
export const DOG_FETCH_RADIUS = 40;
/** Dog move speed (units/s). Matches the client DOG_DEFINITION.speed so the client's prediction
 *  toward the same target stays in sync with this server simulation (minimal drift to correct). */
export const DOG_SPEED = 5;
/** Close enough (XZ) to a drop to grab it. */
export const DOG_GRAB_DIST = 1.0;
/** Close enough (XZ) to the owner to deliver the carried haul. */
export const DOG_DELIVER_DIST = 2.0;
/** When just following (empty mouth, no target) the dog stops this far from the owner. */
export const DOG_FOLLOW_DIST = 3.0;
/** Mouth capacity before the dog returns to deliver. */
export const DOG_MAX_CARRY = 15;
/** Resend dog_state at least this often (drift-correction heartbeat) even with no change. */
export const DOG_HEARTBEAT_MS = 500;
/** After a grab fails because the owner's bag is full, wait this long before fetching again. */
export const DOG_FETCH_RETRY_MS = 3000;

export interface DogPlayer {
  playerId: string;
  position: Vec3 | null;
  inventory: InventoryState;
}

/** Per-player dog runtime, owned and mutated by the simulation across ticks. */
interface DogRuntime {
  position: Vec3;
  /** Fixed world point the dog is heading to (a drop), or null = follow/return to the owner. */
  target: Vec3 | null;
  /** networkId of the drop `target` points at, so we can re-check it still exists. */
  targetDropId: number | null;
  /** Items in the mouth (visual; the inventory grant already happened at grab). */
  carrying: number;
  /** Game time until which fetching is paused after a full-bag grab failure (anti-jitter). */
  fetchSuspendedUntil: number;
  /** Last time a dog_state was emitted for this player (heartbeat throttle). */
  lastSentAt: number;
}

/** The owner-directed dog_state to forward as a `dog_state` message. */
export interface DogStateUpdate {
  playerId: string;
  position: Vec3;
  target: Vec3 | null;
  carrying: number;
}

/** Effects of one simulation step, for the server to broadcast / forward. */
export interface DogStep {
  /** drop_removed diffs to broadcast to EVERY client (shared world). */
  diffs: WorldDiff[];
  /** Per-owner inventory grants to forward to that player as inventory_delta. */
  grants: { playerId: string; itemId: string; quantity: number }[];
  /** Per-owner dog_state updates to send to that player. */
  states: DogStateUpdate[];
}

function moveToward(pos: Vec3, dest: Vec3, maxStep: number): void {
  const dx = dest.x - pos.x;
  const dz = dest.z - pos.z;
  const dist = Math.hypot(dx, dz);
  if (dist <= maxStep || dist === 0) {
    pos.x = dest.x;
    pos.z = dest.z;
  } else {
    pos.x += (dx / dist) * maxStep;
    pos.z += (dz / dist) * maxStep;
  }
  pos.y = dest.y;
}

/**
 * The server-side fleet of per-player dogs. Held by the GameServer and stepped every tick.
 * Deterministic given the same inputs (no randomness), so it is unit-testable headlessly.
 */
export class DogSimulation {
  private readonly dogs = new Map<string, DogRuntime>();

  /** Forget a player's dog (on disconnect). step() also prunes absent players. */
  remove(playerId: string): void {
    this.dogs.delete(playerId);
  }

  /**
   * Advance every present player's dog by `dtMs`. Mutates the world (records drop_removed for
   * grabs) and the players' inventories (grants at grab). `now` is the world game time (ms).
   */
  step(world: World, players: DogPlayer[], dtMs: number, now: number): DogStep {
    const out: DogStep = { diffs: [], grants: [], states: [] };
    const step = (DOG_SPEED * dtMs) / 1000;
    const present = new Set<string>();

    for (const p of players) {
      if (!p.position) continue;
      present.add(p.playerId);

      let dog = this.dogs.get(p.playerId);
      if (!dog) {
        dog = { position: { ...p.position }, target: null, targetDropId: null, carrying: 0, fetchSuspendedUntil: 0, lastSentAt: -Infinity };
        this.dogs.set(p.playerId, dog);
      }

      const prevTarget = dog.target;
      const prevCarrying = dog.carrying;

      // Re-decide the fetch target. If the current target drop vanished (a peer's dog or the
      // owner grabbed it), drop it. Otherwise, with room in the mouth, chase the nearest
      // eligible drop within the owner's leash.
      if (dog.targetDropId !== null && !world.getDrop(dog.targetDropId)) {
        dog.target = null;
        dog.targetDropId = null;
      }
      if (dog.target === null && dog.carrying < DOG_MAX_CARRY && now >= dog.fetchSuspendedUntil) {
        const drop = nearestEligibleDrop(world, p.position, dog.position, now);
        if (drop) {
          dog.target = { ...drop.position };
          dog.targetDropId = drop.networkId;
        }
      }

      // Step toward the destination: the fetch target, else the owner (follow / return). Stop
      // short by the right distance for the mode so the dog doesn't walk onto the owner: grab
      // range for a drop, deliver range when returning with a haul, follow range when idle.
      const dest = dog.target ?? p.position;
      const stopDist = dog.target ? DOG_GRAB_DIST : dog.carrying > 0 ? DOG_DELIVER_DIST : DOG_FOLLOW_DIST;
      if (distanceXZ(dog.position, dest) > stopDist) moveToward(dog.position, dest, step);
      const dist = distanceXZ(dog.position, dest);

      if (dog.target && dist <= DOG_GRAB_DIST) {
        // Reached the drop: pick it up authoritatively (server validates it still exists and
        // there is room). The grant lands now; the carry/deliver is a visual the client plays.
        const drop = dog.targetDropId !== null ? world.getDrop(dog.targetDropId) : undefined;
        dog.target = null;
        dog.targetDropId = null;
        if (drop) {
          if (addItem(p.inventory, drop.itemId, drop.quantity)) {
            const diff: WorldDiff = {
              type: 'drop_removed',
              networkId: drop.networkId,
              byPlayerId: null,
              byDogOf: p.playerId,
              at: now,
            };
            world.recordDiff(diff);
            out.diffs.push(diff);
            out.grants.push({ playerId: p.playerId, itemId: drop.itemId, quantity: drop.quantity });
            dog.carrying += 1;
          } else {
            // Owner's bag is full: suspend fetching briefly so the dog returns to the owner
            // instead of re-targeting (and jittering on) the same drop it can't hold every tick.
            dog.fetchSuspendedUntil = now + DOG_FETCH_RETRY_MS;
          }
        }
        // Drop gone (a peer took it): no suspend; next step re-decides on other drops.
      } else if (!dog.target && dog.carrying > 0 && dist <= DOG_DELIVER_DIST) {
        // Reached the owner with a haul: deliver (visual only — the grant happened at grab).
        dog.carrying = 0;
      }

      // Emit dog_state on a meaningful change (new target / carry change) or the heartbeat.
      const targetChanged =
        (prevTarget === null) !== (dog.target === null) ||
        (dog.target !== null && prevTarget !== null && (prevTarget.x !== dog.target.x || prevTarget.z !== dog.target.z));
      if (targetChanged || prevCarrying !== dog.carrying || now - dog.lastSentAt >= DOG_HEARTBEAT_MS) {
        out.states.push({
          playerId: p.playerId,
          position: { ...dog.position },
          target: dog.target ? { ...dog.target } : null,
          carrying: dog.carrying,
        });
        dog.lastSentAt = now;
      }
    }

    // Prune dogs whose players are no longer present.
    for (const id of this.dogs.keys()) {
      if (!present.has(id)) this.dogs.delete(id);
    }

    return out;
  }
}

/** Nearest drop (to the dog) that is past its grace period and within the owner's leash. */
function nearestEligibleDrop(world: World, ownerPos: Vec3, dogPos: Vec3, now: number) {
  let best: ReturnType<World['getDrop']> | undefined;
  let bestDist = Infinity;
  for (const drop of world.listDrops()) {
    if (now - drop.spawnedAt < DOG_PICKUP_GRACE_MS) continue;
    if (distanceXZ(ownerPos, drop.position) > DOG_FETCH_RADIUS) continue;
    const d = distanceXZ(dogPos, drop.position);
    if (d < bestDist) {
      best = drop;
      bestDist = d;
    }
  }
  return best;
}
