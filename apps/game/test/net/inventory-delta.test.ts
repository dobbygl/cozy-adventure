import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { RESOURCE_NODES, totalYieldFor } from '@cozy/shared';
import { NetworkSystem } from '../../src/net/NetworkSystem';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// The resource->inventory loop, verified headless against the in-process @cozy/server:
// the server grants/removes items for harvest/pickup/drop and tells the actor via an
// inventory_delta, which the client reflects in its own inventory. This is what makes
// "chop a tree and get wood" actually work in network mode — now over several hits.
describe('inventory_delta closes the resource loop (P2)', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('harvesting a tree to depletion grants its full per-tree yield over several hits', async () => {
    ctx = await startTestServer();
    const deltas: Array<{ itemId: string; delta: number }> = [];
    const a = new NetworkSystem(
      { url: ctx.url },
      { onInventoryDelta: (itemId, delta) => deltas.push({ itemId, delta }) }
    );
    nets.push(a);
    await a.connect();
    for (let i = 0; i < RESOURCE_NODES.tree.maxHealth; i++) {
      a.sendCommand({ type: 'harvest_node', networkId: 5, nodeKind: 'tree' });
    }
    await sleep(250);
    // One positive delta per hit; their sum is single-player's per-tree yield (13).
    const wood = deltas.filter((d) => d.itemId === 'wood');
    expect(wood.length).toBe(RESOURCE_NODES.tree.maxHealth);
    expect(wood.every((d) => d.delta > 0)).toBe(true);
    const total = wood.reduce((sum, d) => sum + d.delta, 0);
    expect(total).toBe(totalYieldFor(RESOURCE_NODES.tree));
  });

  it('dropping a held item reports a negative delta', async () => {
    ctx = await startTestServer();
    const deltas: Array<{ itemId: string; delta: number }> = [];
    const a = new NetworkSystem(
      { url: ctx.url },
      { onInventoryDelta: (itemId, delta) => deltas.push({ itemId, delta }) }
    );
    nets.push(a);
    await a.connect();
    a.sendCommand({ type: 'harvest_node', networkId: 9, nodeKind: 'tree' }); // +wood (server inventory)
    await sleep(150);
    a.sendCommand({ type: 'drop_item', itemId: 'wood', quantity: 1, position: { x: 0, y: 0, z: 0 } });
    await sleep(150);
    const harvestDelta = deltas.find((d) => d.itemId === 'wood' && d.delta > 0);
    expect(harvestDelta).toBeDefined();
    expect(harvestDelta!.delta).toBe(RESOURCE_NODES.tree.yieldPerHit);
    expect(deltas).toContainEqual({ itemId: 'wood', delta: -1 });
  });
});
