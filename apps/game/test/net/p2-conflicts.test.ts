import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSystem } from '../../src/net/NetworkSystem';
import type { WorldCommand, RejectReason } from '@cozy/shared';

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

  it('double chop_tree on the same tree: exactly one is rejected (no double-chop)', async () => {
    const { a, b, rejections } = await twoClients();
    const chop: WorldCommand = { type: 'chop_tree', networkId: 5 };
    a.sendCommand(chop);
    b.sendCommand(chop);
    await sleep(250);
    // The server arbitrates: the first chop wins, the second is already_consumed.
    expect(rejections).toEqual(['already_consumed']);
  });

  it('place_building in the same cell: exactly one is rejected (one build per cell)', async () => {
    const { a, b, rejections } = await twoClients();
    const place: WorldCommand = {
      type: 'place_building',
      registryType: 'wall',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      level: 0,
      cell: { level: 0, gx: 3, gz: 4 },
    };
    a.sendCommand(place);
    b.sendCommand(place);
    await sleep(250);
    expect(rejections).toEqual(['cell_occupied']);
  });

  it('chops in different cells/trees do not conflict', async () => {
    const { a, b, rejections } = await twoClients();
    a.sendCommand({ type: 'chop_tree', networkId: 10 });
    b.sendCommand({ type: 'chop_tree', networkId: 11 });
    await sleep(250);
    expect(rejections).toEqual([]); // distinct trees: both succeed
  });
});
