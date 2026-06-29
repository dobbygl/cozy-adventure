import { RESOURCE_NODES } from '@cozy/shared';
import type { MockClient } from './MockClient';

/**
 * Fell ONE tree at the origin and pick up all the wood it drops. Harvesting now drops
 * wood on the GROUND (parity with single-player), so gathering it into the inventory
 * means harvesting AND then picking the drops up. Returns the next free command seq and
 * the wood gained (single-player's per-tree total). Drops are picked up at the origin
 * (no avatar position reported -> no range check), so the harvest position is the origin.
 *
 * Trailing world events (the drop_removed from our own pickups) are drained before
 * returning, so a caller's next `waitFor('event')` sees its own next action, not ours.
 */
export async function fellAndGatherWood(
  c: MockClient,
  networkId: number,
  startSeq = 0
): Promise<{ seq: number; wood: number }> {
  let seq = startSeq;
  const hits = RESOURCE_NODES.tree.maxHealth;
  const position = { x: 0, y: 0, z: 0 };
  // Drain any stale world events (e.g. another client's broadcasts buffered in our inbox)
  // so the collect below only sees the drops from our own harvest.
  await c.collect('event', 0);
  for (let i = 0; i < hits; i++) {
    c.send({
      t: 'command',
      seq: ++seq,
      cmd: { type: 'harvest_node', networkId, nodeKind: 'tree', position },
    });
  }
  const woodDrops = (await c.collect('event', 250)).flatMap((e) =>
    e.diff.type === 'drop_spawned' && e.diff.entity.itemId === 'wood' ? [e.diff.entity.networkId] : []
  );
  let wood = 0;
  for (const id of woodDrops) {
    c.send({ t: 'command', seq: ++seq, cmd: { type: 'pickup_drop', networkId: id } });
    wood += (await c.waitFor('inventory_delta')).delta;
  }
  await c.collect('event', 0); // drain the drop_removed events our pickups produced
  return { seq, wood };
}

/**
 * Fell trees and pick up their wood until the player holds at least `minWood`, then return
 * the next free command seq. Building costs server-side wood, so any test that places a
 * building must gather first. `firstNodeId` must be distinct per client (node health is
 * world-global, so two clients harvesting the same id would fight over one tree). Keep ids
 * below the dynamic id base so they read as base trees.
 */
export async function feedWood(
  c: MockClient,
  minWood: number,
  firstNodeId: number,
  startSeq = 0
): Promise<number> {
  let seq = startSeq;
  let gained = 0;
  let node = firstNodeId;
  while (gained < minWood) {
    const r = await fellAndGatherWood(c, node, seq);
    seq = r.seq;
    gained += r.wood;
    node++;
  }
  return seq;
}
