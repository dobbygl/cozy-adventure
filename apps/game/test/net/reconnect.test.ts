import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSystem } from '../../src/net/NetworkSystem';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// P3 reconnect contract, headless against the in-process @cozy/server: a client that
// drops and reconnects with its playerId within the window recovers the same
// identity (no duplicate avatar). A brand-new client gets a fresh playerId.
describe('client reconnect recovers identity (P3)', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('reconnecting with the same playerId within the window recovers it', async () => {
    ctx = await startTestServer({ RECONNECT_WINDOW_MS: '30000' });
    const a = new NetworkSystem({ url: ctx.url, displayName: 'A' });
    nets.push(a);
    const first = await a.connect();
    a.destroy(); // simulate a dropped connection
    await sleep(100);

    // Reclaiming the identity requires presenting the issued token alongside the id.
    const a2 = new NetworkSystem({ url: ctx.url, displayName: 'A', playerId: first.playerId, token: first.token });
    nets.push(a2);
    const second = await a2.connect();
    expect(second.playerId).toBe(first.playerId); // same identity recovered
    expect(second.seed).toBe(first.seed); // same world
  });

  it('a fresh client (no playerId) gets a new identity', async () => {
    ctx = await startTestServer();
    const a = new NetworkSystem({ url: ctx.url });
    const b = new NetworkSystem({ url: ctx.url });
    nets.push(a, b);
    const ja = await a.connect();
    const jb = await b.connect();
    expect(jb.playerId).not.toBe(ja.playerId);
  });
});
