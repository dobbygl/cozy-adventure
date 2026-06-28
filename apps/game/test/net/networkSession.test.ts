import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '@cozy/server/testing';
import { NetworkSession } from '../../src/net/NetworkSession';
import { NetworkSystem } from '../../src/net/NetworkSystem';
import type { RemotePlayerLike } from '../../src/net/RemotePlayerManager';
import type { AvatarSnapshot, PeerInfo } from '@cozy/shared';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// Headless: NetworkSession's join -> presence -> relay orchestration is verified
// against a real in-process @cozy/server, with a fake remote factory and a manual
// clock so no three / browser is needed.
class FakeRemote implements RemotePlayerLike {
  pushed: AvatarSnapshot[] = [];
  disposed = false;
  constructor(readonly playerId: string) {}
  async load(): Promise<void> {}
  pushSnapshot(snap: AvatarSnapshot): void {
    this.pushed.push(snap);
  }
  update(): void {}
  dispose(): void {
    this.disposed = true;
  }
}

describe('NetworkSession against an in-process @cozy/server', () => {
  let ctx: TestServer | undefined;
  const cleanups: Array<() => void> = [];

  afterEach(async () => {
    for (const c of cleanups) c();
    cleanups.length = 0;
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('connects and exposes the canonical seed and our playerId', async () => {
    ctx = await startTestServer();
    const session = new NetworkSession({
      config: { url: ctx.url, displayName: 'A' },
      remoteFactory: (p: PeerInfo) => new FakeRemote(p.playerId),
      now: () => 1000,
    });
    cleanups.push(() => session.destroy());
    const joined = await session.connect();
    expect(typeof session.seed).toBe('number');
    expect(session.seed).toBe(joined.seed);
    expect(session.playerId).toBe(joined.playerId);
    expect(session.isConnected).toBe(true);
  });

  it('materializes a peer that joins and routes its avatar snapshots', async () => {
    ctx = await startTestServer({ AVATAR_TICK_HZ: '15' });
    const created = new Map<string, FakeRemote>();
    const a = new NetworkSession({
      config: { url: ctx.url, displayName: 'A' },
      remoteFactory: (p: PeerInfo) => {
        const r = new FakeRemote(p.playerId);
        created.set(p.playerId, r);
        return r;
      },
      now: () => 1000,
    });
    cleanups.push(() => a.destroy());
    await a.connect();
    a.begin(); // scene is ready: start materializing remotes

    const b = new NetworkSystem({ url: ctx.url, displayName: 'B' });
    cleanups.push(() => b.destroy());
    const jb = await b.connect();
    await sleep(150);
    expect(a.peerCount).toBe(1); // A materialized B

    b.setAvatarState({
      position: { x: 3, y: 0, z: 4 },
      rotation: { x: 0, y: 1, z: 0 },
      movement: 'walking',
      heldItemId: null,
    });
    await sleep(300);
    expect(created.get(jb.playerId)?.pushed.length).toBeGreaterThan(0); // snapshots routed
  });

  it('buffers peers that join before begin() and flushes them on begin()', async () => {
    ctx = await startTestServer();
    const a = new NetworkSession({
      config: { url: ctx.url },
      remoteFactory: (p: PeerInfo) => new FakeRemote(p.playerId),
      now: () => 0,
    });
    cleanups.push(() => a.destroy());
    await a.connect(); // joined but not begun: no scene yet

    const b = new NetworkSystem({ url: ctx.url });
    cleanups.push(() => b.destroy());
    await b.connect();
    await sleep(150);
    expect(a.peerCount).toBe(0); // deferred while the world loads

    a.begin();
    expect(a.peerCount).toBe(1); // flushed once the scene is ready
  });

  it('drops a peer that leaves and disposes its remote', async () => {
    ctx = await startTestServer();
    const created = new Map<string, FakeRemote>();
    const a = new NetworkSession({
      config: { url: ctx.url },
      remoteFactory: (p: PeerInfo) => {
        const r = new FakeRemote(p.playerId);
        created.set(p.playerId, r);
        return r;
      },
      now: () => 0,
    });
    cleanups.push(() => a.destroy());
    await a.connect();
    a.begin();

    const b = new NetworkSystem({ url: ctx.url });
    const jb = await b.connect();
    await sleep(150);
    expect(a.peerCount).toBe(1);

    b.destroy();
    await sleep(150);
    expect(a.peerCount).toBe(0);
    expect(created.get(jb.playerId)?.disposed).toBe(true);
  });

  it('routes a peer world mutation into ClientWorld (and its scene handler)', async () => {
    ctx = await startTestServer();
    const chopped: number[] = [];
    const a = new NetworkSession({
      config: { url: ctx.url },
      remoteFactory: (p: PeerInfo) => new FakeRemote(p.playerId),
      now: () => 0,
      worldHandlers: { onTreeChopped: (id) => chopped.push(id) },
    });
    cleanups.push(() => a.destroy());
    await a.connect();
    a.begin();

    const b = new NetworkSystem({ url: ctx.url });
    cleanups.push(() => b.destroy());
    await b.connect();
    b.sendCommand({ type: 'chop_tree', networkId: 42 });
    await sleep(200);
    expect(chopped).toContain(42); // A's scene handler fired
    expect(a.world.isTreeChopped(42)).toBe(true);
  });

  it('reconnect preserves world state and reconciles idempotently (P3)', async () => {
    ctx = await startTestServer({ RECONNECT_WINDOW_MS: '30000' });
    const a = new NetworkSession({
      config: { url: ctx.url, displayName: 'A' },
      remoteFactory: (p: PeerInfo) => new FakeRemote(p.playerId),
      now: () => 0,
    });
    cleanups.push(() => a.destroy());
    await a.connect();
    a.begin();
    const idBefore = a.playerId;

    const b = new NetworkSystem({ url: ctx.url });
    cleanups.push(() => b.destroy());
    await b.connect();
    b.sendCommand({ type: 'chop_tree', networkId: 7 });
    await sleep(200);
    expect(a.world.isTreeChopped(7)).toBe(true);

    await a.reconnect();
    expect(a.isConnected).toBe(true);
    expect(a.playerId).toBe(idBefore); // identity recovered
    expect(a.world.isTreeChopped(7)).toBe(true); // state preserved, no double-apply
  });

  it('buffers world diffs before begin() and applies them on begin()', async () => {
    ctx = await startTestServer();
    const chopped: number[] = [];
    const a = new NetworkSession({
      config: { url: ctx.url },
      remoteFactory: (p: PeerInfo) => new FakeRemote(p.playerId),
      now: () => 0,
      worldHandlers: { onTreeChopped: (id) => chopped.push(id) },
    });
    cleanups.push(() => a.destroy());
    await a.connect(); // not begun: scene not ready

    const b = new NetworkSystem({ url: ctx.url });
    cleanups.push(() => b.destroy());
    await b.connect();
    b.sendCommand({ type: 'chop_tree', networkId: 99 });
    await sleep(200);
    expect(chopped).toEqual([]); // buffered while loading

    a.begin();
    expect(chopped).toEqual([99]); // flushed once the scene is ready
    expect(a.world.isTreeChopped(99)).toBe(true);
  });
});
