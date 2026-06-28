import { describe, it, expect, afterEach } from 'vitest';
import { PROTOCOL_VERSION } from '@cozy/shared';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { MockClient } from '../harness/MockClient';

describe('P1 presence and avatar relay', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('assigns a stable identity and delivers the world seed on join', async () => {
    ctx = await startTestServer();
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: PROTOCOL_VERSION });
    const joined = await a.waitFor('joined');
    expect(typeof joined.playerId).toBe('string');
    expect(joined.playerId.length).toBeGreaterThan(0);
    expect(typeof joined.seed).toBe('number');
    expect(joined.world.seed).toBe(joined.seed);
    expect(joined.peers).toEqual([]);
    a.close();
  });

  it('two clients see each other and the mover relays to the other at ~15Hz', async () => {
    ctx = await startTestServer({ AVATAR_TICK_HZ: '15' });
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, displayName: 'A' });
    const ja = await a.waitFor('joined');

    const b = await MockClient.connect(ctx.url);
    b.send({ t: 'join', protocolVersion: PROTOCOL_VERSION, displayName: 'B' });
    const jb = await b.waitFor('joined');

    // A learns B arrived; B's joined snapshot lists A as a peer.
    const peer = await a.waitFor('peer_joined');
    expect(peer.playerId).toBe(jb.playerId);
    expect(jb.peers.some((p) => p.playerId === ja.playerId)).toBe(true);

    // A moves; B receives a snapshot containing A's state (movement + held item).
    a.send({
      t: 'avatar_state',
      position: { x: 1, y: 0, z: 1 },
      rotation: { x: 0, y: 0, z: 0 },
      movement: 'running',
      heldItemId: 'axe',
    });
    const snap = await b.waitFor('avatar_snapshots');
    const aSnap = snap.players.find((p) => p.playerId === ja.playerId);
    expect(aSnap).toBeDefined();
    expect(aSnap?.movement).toBe('running');
    expect(aSnap?.heldItemId).toBe('axe');

    // ~15Hz: B should receive roughly 15 snapshots over ~1s (allow CI slack).
    const collected = await b.collect('avatar_snapshots', 1000);
    expect(collected.length).toBeGreaterThanOrEqual(8);
    expect(collected.length).toBeLessThanOrEqual(30);

    a.close();
    b.close();
  });

  it('notifies remaining peers when a player leaves', async () => {
    ctx = await startTestServer();
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: PROTOCOL_VERSION });
    await a.waitFor('joined');

    const b = await MockClient.connect(ctx.url);
    b.send({ t: 'join', protocolVersion: PROTOCOL_VERSION });
    const jb = await b.waitFor('joined');
    await a.waitFor('peer_joined');

    b.close();
    const left = await a.waitFor('peer_left');
    expect(left.playerId).toBe(jb.playerId);
    a.close();
  });

  it('does not echo a player their own avatar state', async () => {
    ctx = await startTestServer();
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: PROTOCOL_VERSION });
    await a.waitFor('joined');
    // Solo player moving: with no peers, A must receive no avatar_snapshots.
    a.send({
      t: 'avatar_state',
      position: { x: 1, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      movement: 'walking',
      heldItemId: null,
    });
    const own = await a.collect('avatar_snapshots', 400);
    expect(own.length).toBe(0);
    a.close();
  });
});
