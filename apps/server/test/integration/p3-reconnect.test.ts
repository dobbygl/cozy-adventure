import { describe, it, expect, afterEach } from 'vitest';
import { PROTOCOL_VERSION, RESOURCE_NODES, totalYieldFor } from '@cozy/shared';
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
    // Fell a tree over its full health, summing the per-hit wood grants.
    const hits = RESOURCE_NODES.tree.maxHealth;
    let woodGained = 0;
    for (let i = 0; i < hits; i++) {
      a.send({ t: 'command', seq: i + 1, cmd: { type: 'harvest_node', networkId: 5, nodeKind: 'tree' } });
      await a.waitFor('event');
      woodGained += (await a.waitFor('inventory_delta')).delta;
    }
    expect(woodGained).toBe(totalYieldFor(RESOURCE_NODES.tree)); // 13, same as single-player
    a.close();
    await sleep(120); // within the reconnect window

    const { c: b, joined: jb } = await joinClient(ctx.url, { playerId, token: ja.token });
    expect(jb.playerId).toBe(playerId);
    expect(countItem(jb.player.inventory, 'wood')).toBe(woodGained);
    expect(jb.world.diffs.some((d) => d.type === 'node_depleted' && d.networkId === 5)).toBe(true);
    b.close();
  });

  it('a second connection for the same player kicks the old one (replaced)', async () => {
    ctx = await startTestServer();
    // First join with no playerId: the server mints the identity + token.
    const { c: a, joined: ja } = await joinClient(ctx.url);

    // The same player (its token) reconnecting from a second tab kicks the first.
    const { c: b } = await joinClient(ctx.url, { playerId: ja.playerId, token: ja.token });
    const kick = await a.waitFor('kick');
    expect(kick.reason).toBe('replaced');
    b.close();
  });

  it('rejects claiming a playerId without a valid token (anti-impersonation)', async () => {
    ctx = await startTestServer();
    // A victim joins; every peer can see their playerId, but not their token.
    const { c: victim, joined: jv } = await joinClient(ctx.url);

    // An attacker who knows the playerId but presents no / a wrong token is rejected.
    const noToken = await MockClient.connect(ctx.url);
    noToken.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, playerId: jv.playerId });
    expect((await noToken.waitFor('error')).code).toBe('auth');

    const wrongToken = await MockClient.connect(ctx.url);
    wrongToken.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, playerId: jv.playerId, token: 'deadbeef' });
    expect((await wrongToken.waitFor('error')).code).toBe('auth');

    // The victim was never kicked.
    expect(victim.isClosed).toBe(false);
    victim.close();
  });
});
