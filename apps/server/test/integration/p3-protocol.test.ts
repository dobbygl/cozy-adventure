import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { MockClient } from '../harness/MockClient';

describe('P3 protocol robustness', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('discards malformed input without crashing the server', async () => {
    ctx = await startTestServer();
    const c = await MockClient.connect(ctx.url);
    c.sendRaw('}{ not json');
    const err = await c.waitFor('error');
    expect(err.code).toBe('bad_message');
    // The server is still healthy: a fresh client can join.
    const { joined } = await joinClient(ctx.url);
    expect(joined.playerId).toBeDefined();
    c.close();
  });

  it('rejects and closes on an incompatible protocol version', async () => {
    ctx = await startTestServer();
    const c = await MockClient.connect(ctx.url);
    c.send({ t: 'join', protocolVersion: 999 });
    const err = await c.waitFor('error');
    expect(err.code).toBe('protocol_version');
    await c.waitForClose(3000);
    expect(c.isClosed).toBe(true);
  });

  it('a disconnect mid-action leaves no partial state (command applies atomically)', async () => {
    ctx = await startTestServer();
    const { c: a } = await joinClient(ctx.url);
    const { c: b } = await joinClient(ctx.url);
    await a.waitFor('peer_joined');

    // a issues a command then immediately disconnects. WS ordering + synchronous
    // application means the command fully applies (and broadcasts) or not at all.
    a.send({
      t: 'command',
      seq: 1,
      cmd: { type: 'harvest_node', networkId: 11, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } },
    });
    a.close();

    const ev = await b.waitFor('event');
    // One hit damages the tree (it takes several to fell); that diff still broadcasts
    // first, ahead of the ground-drop diffs the same hit spawns.
    expect(ev.diff.type).toBe('node_damaged');
    if (ev.diff.type === 'node_damaged') expect(ev.diff.networkId).toBe(11);
    b.close();
  });
});
