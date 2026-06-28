import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSystem } from '../../src/net/NetworkSystem';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// The resource->inventory loop, verified headless against the in-process @cozy/server:
// the server grants/removes items for chop/pickup/drop and tells the actor via an
// inventory_delta, which the client reflects in its own inventory. This is what makes
// "chop a tree and get wood" actually work in network mode.
describe('inventory_delta closes the resource loop (P2)', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('chop_tree grants the actor +1 wood', async () => {
    ctx = await startTestServer();
    const deltas: Array<{ itemId: string; delta: number }> = [];
    const a = new NetworkSystem(
      { url: ctx.url },
      { onInventoryDelta: (itemId, delta) => deltas.push({ itemId, delta }) }
    );
    nets.push(a);
    await a.connect();
    a.sendCommand({ type: 'chop_tree', networkId: 5 });
    await sleep(200);
    expect(deltas).toContainEqual({ itemId: 'wood', delta: 1 });
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
    a.sendCommand({ type: 'chop_tree', networkId: 9 }); // +1 wood (server inventory)
    await sleep(150);
    a.sendCommand({ type: 'drop_item', itemId: 'wood', quantity: 1, position: { x: 0, y: 0, z: 0 } });
    await sleep(150);
    expect(deltas).toContainEqual({ itemId: 'wood', delta: 1 });
    expect(deltas).toContainEqual({ itemId: 'wood', delta: -1 });
  });
});
