import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { RESOURCE_NODES, totalYieldFor, type DropState } from '@cozy/shared';
import { NetworkSystem } from '../../src/net/NetworkSystem';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// The resource->ground->inventory loop, verified headless against the in-process
// @cozy/server: harvesting drops the yield on the ground (parity with single-player),
// and picking a drop up (or dropping a held item) is what the server reports via an
// inventory_delta, which the client reflects in its own inventory. This is what makes
// "chop a tree, then grab the wood off the ground" actually work in network mode.
describe('inventory_delta closes the resource loop (P2)', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('harvesting drops wood on the ground; picking it up grants the full per-tree yield', async () => {
    ctx = await startTestServer();
    const deltas: Array<{ itemId: string; delta: number }> = [];
    const drops: DropState[] = [];
    const a = new NetworkSystem(
      { url: ctx.url },
      {
        onInventoryDelta: (itemId, delta) => deltas.push({ itemId, delta }),
        onWorldEvent: (d) => {
          if (d.type === 'drop_spawned') drops.push(d.entity);
        },
      }
    );
    nets.push(a);
    await a.connect();
    for (let i = 0; i < RESOURCE_NODES.tree.maxHealth; i++) {
      a.sendCommand({ type: 'harvest_node', networkId: 5, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } });
    }
    await sleep(250);
    // The yield lands on the GROUND, not the inventory: harvesting grants nothing, and
    // the wood drops sum to single-player's per-tree total (13).
    expect(deltas).toEqual([]);
    const woodDrops = drops.filter((d) => d.itemId === 'wood');
    const onGround = woodDrops.reduce((sum, d) => sum + d.quantity, 0);
    expect(onGround).toBe(totalYieldFor(RESOURCE_NODES.tree));
    // Picking them all up closes the loop: the inventory deltas sum to the same total.
    for (const d of woodDrops) a.sendCommand({ type: 'pickup_drop', networkId: d.networkId });
    await sleep(250);
    const gained = deltas.filter((d) => d.itemId === 'wood' && d.delta > 0).reduce((s, d) => s + d.delta, 0);
    expect(gained).toBe(totalYieldFor(RESOURCE_NODES.tree));
  });

  it('dropping a held item reports a negative delta', async () => {
    ctx = await startTestServer();
    const deltas: Array<{ itemId: string; delta: number }> = [];
    const drops: DropState[] = [];
    const a = new NetworkSystem(
      { url: ctx.url },
      {
        onInventoryDelta: (itemId, delta) => deltas.push({ itemId, delta }),
        onWorldEvent: (d) => {
          if (d.type === 'drop_spawned') drops.push(d.entity);
        },
      }
    );
    nets.push(a);
    await a.connect();
    // Harvest once (wood lands on the ground), then pick it up to actually hold wood.
    a.sendCommand({ type: 'harvest_node', networkId: 9, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } });
    await sleep(150);
    const wood = drops.find((d) => d.itemId === 'wood');
    expect(wood).toBeDefined();
    a.sendCommand({ type: 'pickup_drop', networkId: wood!.networkId });
    await sleep(150);
    // Now holding wood: dropping one reports a negative delta.
    a.sendCommand({ type: 'drop_item', itemId: 'wood', quantity: 1, position: { x: 0, y: 0, z: 0 } });
    await sleep(150);
    const pickupDelta = deltas.find((d) => d.itemId === 'wood' && d.delta > 0);
    expect(pickupDelta).toBeDefined();
    expect(pickupDelta!.delta).toBe(RESOURCE_NODES.tree.yieldPerHit); // the first hit dropped 2 wood
    expect(deltas).toContainEqual({ itemId: 'wood', delta: -1 });
  });
});
