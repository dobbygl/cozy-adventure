import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSystem } from '../../src/net/NetworkSystem';
import type { AvatarSnapshot } from '@cozy/shared';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// Verifies the client network layer conforms to the wire contract by running it
// against a real in-process @cozy/server (headless; no browser, no three).
describe('client NetworkSystem against an in-process @cozy/server', () => {
  let ctx: TestServer | undefined;
  const nets: NetworkSystem[] = [];

  afterEach(async () => {
    for (const n of nets) n.destroy();
    nets.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('joins and receives the canonical world seed', async () => {
    ctx = await startTestServer();
    const net = new NetworkSystem({ url: ctx.url, displayName: 'A' });
    nets.push(net);
    const joined = await net.connect();
    expect(typeof joined.seed).toBe('number');
    expect(joined.world.seed).toBe(joined.seed);
    expect(net.isConnected).toBe(true);
  });

  it('two clients receive the same seed (same world)', async () => {
    ctx = await startTestServer();
    const a = new NetworkSystem({ url: ctx.url });
    const b = new NetworkSystem({ url: ctx.url });
    nets.push(a, b);
    const ja = await a.connect();
    const jb = await b.connect();
    expect(jb.seed).toBe(ja.seed);
  });

  it('relays the local avatar (transform, movement, held item) to a peer', async () => {
    ctx = await startTestServer({ AVATAR_TICK_HZ: '15' });
    let received: AvatarSnapshot[] = [];
    const a = new NetworkSystem({ url: ctx.url, displayName: 'A' });
    const b = new NetworkSystem(
      { url: ctx.url, displayName: 'B' },
      { onAvatarSnapshots: (players) => (received = players) }
    );
    nets.push(a, b);
    const ja = await a.connect();
    await b.connect();

    a.setAvatarState({
      position: { x: 1, y: 0, z: 2 },
      rotation: { x: 0, y: 0, z: 0 },
      movement: 'running',
      heldItemId: 'axe',
    });
    await sleep(400); // a sends at ~15Hz; server relays at ~15Hz

    const aSnap = received.find((p) => p.playerId === ja.playerId);
    expect(aSnap).toBeDefined();
    expect(aSnap?.movement).toBe('running');
    expect(aSnap?.heldItemId).toBe('axe');
  });

  it('announces peer join and leave to an existing client', async () => {
    ctx = await startTestServer();
    const joins: string[] = [];
    const leaves: string[] = [];
    const a = new NetworkSystem(
      { url: ctx.url, displayName: 'A' },
      { onPeerJoined: (p) => joins.push(p.playerId), onPeerLeft: (id) => leaves.push(id) }
    );
    nets.push(a);
    await a.connect();

    const b = new NetworkSystem({ url: ctx.url, displayName: 'B' });
    nets.push(b);
    const jb = await b.connect();
    await sleep(150);
    expect(joins).toContain(jb.playerId); // A saw B join

    b.destroy();
    await sleep(150);
    expect(leaves).toContain(jb.playerId); // A saw B leave
  });

  it('rejects an unreachable server URL with a clear error', async () => {
    const net = new NetworkSystem({ url: 'ws://127.0.0.1:1/nope' });
    nets.push(net);
    await expect(net.connect(1000)).rejects.toThrow();
  });

  it('a rejected command surfaces via onCommandRejected', async () => {
    ctx = await startTestServer();
    let rejected: { seq: number; reason: string } | null = null;
    const a = new NetworkSystem({ url: ctx.url }, { onCommandRejected: (seq, reason) => (rejected = { seq, reason }) });
    nets.push(a);
    await a.connect();
    // pickup of a non-existent drop is rejected by the server.
    const seq = a.sendCommand({ type: 'pickup_drop', networkId: 9_999_999 });
    await sleep(200);
    expect(rejected).not.toBeNull();
    expect(rejected!.seq).toBe(seq);
    expect(rejected!.reason).toBe('already_consumed');
  });
});
