import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { MockClient } from '../harness/MockClient';
import { countItem } from '../../src/world/inventory';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe('P3 keepalive, timeout and reconnect', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('keeps a keepalive-sending client alive past the timeout (hidden tab)', async () => {
    ctx = await startTestServer({ KEEPALIVE_TIMEOUT_MS: '250' });
    const { c } = await joinClient(ctx.url);
    // Send keepalives at 80ms intervals for ~480ms (well past the 250ms timeout).
    for (let i = 0; i < 6; i++) {
      c.send({ t: 'keepalive' });
      await sleep(80);
    }
    c.send({ t: 'keepalive' });
    const pong = await c.waitFor('pong');
    expect(pong.t).toBe('pong');
    expect(c.isClosed).toBe(false);
    c.close();
  });

  it('disconnects a silent client past the timeout', async () => {
    ctx = await startTestServer({ KEEPALIVE_TIMEOUT_MS: '150' });
    const { c } = await joinClient(ctx.url);
    await c.waitForClose(3000);
    expect(c.isClosed).toBe(true);
  });

  it('reconnecting with the same playerId restores confirmed progress', async () => {
    ctx = await startTestServer({ RECONNECT_WINDOW_MS: '3000' });
    const { c: a, joined: ja } = await joinClient(ctx.url);
    const playerId = ja.playerId;
    a.send({ t: 'command', seq: 1, cmd: { type: 'chop_tree', networkId: 5 } });
    await a.waitFor('event'); // a gains wood
    a.close();
    await sleep(120); // within the reconnect window

    const { c: b, joined: jb } = await joinClient(ctx.url, { playerId });
    expect(jb.playerId).toBe(playerId);
    expect(countItem(jb.player.inventory, 'wood')).toBe(1);
    expect(jb.world.diffs.some((d) => d.type === 'tree_chopped' && d.networkId === 5)).toBe(true);
    b.close();
  });

  it('a second connection for the same player kicks the old one (replaced)', async () => {
    ctx = await startTestServer();
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: 1, playerId: 'dup-id' });
    await a.waitFor('joined');

    const { c: b } = await joinClient(ctx.url, { playerId: 'dup-id' });
    const kick = await a.waitFor('kick');
    expect(kick.reason).toBe('replaced');
    b.close();
  });
});
