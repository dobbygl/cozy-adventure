import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSystem } from '../../src/net/NetworkSystem';
import { RESOURCE_NODES, type WorldCommand, type RejectReason } from '@cozy/shared';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// SC-003 proven headlessly: with two real client NetworkSystems against one
// authoritative @cozy/server, concurrent conflicting commands resolve to exactly
// one winner; the loser is rejected and nothing is duplicated. No browser needed.
describe('two-client world conflicts are authoritative (SC-003)', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  async function twoClients(): Promise<{ a: NetworkSystem; b: NetworkSystem; rejections: RejectReason[] }> {
    ctx = await startTestServer();
    const rejections: RejectReason[] = [];
    const a = new NetworkSystem({ url: ctx.url, displayName: 'A' }, { onCommandRejected: (_s, r) => rejections.push(r) });
    const b = new NetworkSystem({ url: ctx.url, displayName: 'B' }, { onCommandRejected: (_s, r) => rejections.push(r) });
    nets.push(a, b);
    await a.connect();
    await b.connect();
    return { a, b, rejections };
  }

  it('racing the depleting harvest on a tree: exactly one is rejected (no double-fell)', async () => {
    const { a, b, rejections } = await twoClients();
    const hit: WorldCommand = { type: 'harvest_node', networkId: 5, nodeKind: 'tree' };
    // A lands every hit but the last, leaving the tree at one hit of health.
    for (let i = 0; i < RESOURCE_NODES.tree.maxHealth - 1; i++) a.sendCommand(hit);
    await sleep(150);
    // Both race the final, depleting hit: the server fells it once; the other is
    // already_consumed. Whichever message lands first wins — the rejection count is 1.
    a.sendCommand(hit);
    b.sendCommand(hit);
    await sleep(250);
    expect(rejections).toEqual(['already_consumed']);
  });

  it('place_building in the same cell: exactly one is rejected (one build per cell)', async () => {
    const { a, b, rejections } = await twoClients();
    // Building costs server-side wood now: both gather first (distinct trees).
    for (let i = 0; i < RESOURCE_NODES.tree.maxHealth; i++) {
      a.sendCommand({ type: 'harvest_node', networkId: 800_000, nodeKind: 'tree' });
      b.sendCommand({ type: 'harvest_node', networkId: 850_000, nodeKind: 'tree' });
    }
    await sleep(200);
    // Same world position => same server-derived footprint; no client-sent cell.
    const place: WorldCommand = {
      type: 'place_building',
      registryType: 'wall',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      level: 0,
    };
    a.sendCommand(place);
    b.sendCommand(place);
    await sleep(250);
    expect(rejections).toEqual(['cell_occupied']);
  });

  it('harvesting different trees does not conflict', async () => {
    const { a, b, rejections } = await twoClients();
    a.sendCommand({ type: 'harvest_node', networkId: 10, nodeKind: 'tree' });
    b.sendCommand({ type: 'harvest_node', networkId: 11, nodeKind: 'tree' });
    await sleep(250);
    expect(rejections).toEqual([]); // distinct trees: both succeed
  });
});
