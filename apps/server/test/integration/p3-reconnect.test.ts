import { describe, it, expect, afterEach } from 'vitest';
import { PROTOCOL_VERSION, RESOURCE_NODES, totalYieldFor } from '@cozy/shared';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { fellAndGatherWood } from '../harness/feedWood';
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
    // Fell a tree and pick up the wood it dropped on the ground (parity with single-player).
    const { wood: woodGained } = await fellAndGatherWood(a, 5);
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

    // An attacker who knows the playerId but presents no / a wrong token is rejected with
    // 'identity' (distinct from password 'auth', so a client knows to drop a stale token).
    const noToken = await MockClient.connect(ctx.url);
    noToken.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, playerId: jv.playerId });
    expect((await noToken.waitFor('error')).code).toBe('identity');

    const wrongToken = await MockClient.connect(ctx.url);
    wrongToken.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, playerId: jv.playerId, token: 'deadbeef' });
    expect((await wrongToken.waitFor('error')).code).toBe('identity');

    // The victim was never kicked.
    expect(victim.isClosed).toBe(false);
    victim.close();
  });

  it('rejects a token minted under a different secret (server restarted) with identity', async () => {
    // Default servers use a random per-boot secret, so a restart invalidates old tokens.
    const first = await startTestServer({ AUTH_SECRET: 'secret-A' });
    const { joined } = await joinClient(first.url);
    await first.server.stop();

    ctx = await startTestServer({ AUTH_SECRET: 'secret-B' });
    const c = await MockClient.connect(ctx.url);
    c.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, playerId: joined.playerId, token: joined.token });
    // 'identity' (not 'auth') tells the client to drop its stale identity and retry fresh.
    expect((await c.waitFor('error')).code).toBe('identity');
    c.close();
  });
});
