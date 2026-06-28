import { RESOURCE_NODES } from '@cozy/shared';
import type { MockClient } from './MockClient';

/**
 * Fell trees until the player holds at least `minWood`, then return the next free
 * command seq. Building now costs server-side wood (no more free builds), so any test
 * that places a building must first gather. Each fell tree yields the single-player
 * total; `firstNodeId` must be distinct per client (node health is world-global, so two
 * clients harvesting the same id would fight over one tree). Keep ids below the dynamic
 * id base so they read as base trees.
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
  const hits = RESOURCE_NODES.tree.maxHealth;
  while (gained < minWood) {
    for (let i = 0; i < hits; i++) {
      c.send({ t: 'command', seq: ++seq, cmd: { type: 'harvest_node', networkId: node, nodeKind: 'tree' } });
      await c.waitFor('event');
      gained += (await c.waitFor('inventory_delta')).delta;
    }
    node++;
  }
  return seq;
}
