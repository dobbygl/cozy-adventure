import { describe, it, expect, afterEach } from 'vitest';
import { BUILDABLES } from '@cozy/shared';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { feedWood } from '../harness/feedWood';

// Server-authoritative building (bugs 2/3/4): the server owns the catalog, the cost and
// the full footprint. A client cannot place an unknown type, build for free, overlap a
// large building by hitting a non-anchor cell, or desync levels.
describe('building authority', () => {
  let ctx: TestServer | undefined;
  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  const place = (seq: number, registryType: string, position: { x: number; y: number; z: number }) => ({
    t: 'command' as const,
    seq,
    cmd: { type: 'place_building' as const, registryType, position, rotation: { x: 0, y: 0, z: 0 }, level: 0 },
  });

  it('rejects an unknown registryType (bug 2a)', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const seq = await feedWood(c, 10, 800_000);
    c.send(place(seq + 1, 'death_laser', { x: 0, y: 0, z: 0 }));
    expect((await c.waitFor('command_rejected')).reason).toBe('invalid');
    c.close();
  });

  it('rejects a build the player cannot afford and charges nothing (bug 2b)', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url); // fresh player: no wood
    c.send(place(1, 'wall', { x: 0, y: 0, z: 0 }));
    expect((await c.waitFor('command_rejected')).reason).toBe('insufficient_resources');
    c.close();
  });

  it('consumes the cost server-side on a successful build (bug 2b)', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const seq = await feedWood(c, BUILDABLES.wall.cost.wood, 800_000);
    c.send(place(seq + 1, 'wall', { x: 0, y: 0, z: 0 }));
    expect((await c.waitFor('event')).diff.type).toBe('building_placed');
    const delta = await c.waitFor('inventory_delta');
    expect(delta).toMatchObject({ itemId: 'wood', delta: -BUILDABLES.wall.cost.wood });
    c.close();
  });

  it('reserves the whole footprint, not just the anchor (bug 3)', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const seq = await feedWood(c, BUILDABLES.floor.cost.wood + BUILDABLES.wall.cost.wood, 800_000);

    // A 4x4 floor at the origin occupies gx in {-2..1}, gz in {-2..1}.
    c.send(place(seq + 1, 'floor', { x: 0, y: 0, z: 0 }));
    expect((await c.waitFor('event')).diff.type).toBe('building_placed');
    await c.waitFor('inventory_delta');

    // A wall at x=4 anchors at gx=2 (FREE), but its footprint reaches gx=1 — a cell the
    // floor already holds. An anchor-only check would wrongly allow this; the real check
    // rejects it. This is the bug-3 regression guard.
    c.send(place(seq + 2, 'wall', { x: 4, y: 0, z: 0 }));
    expect((await c.waitFor('command_rejected')).reason).toBe('cell_occupied');
    c.close();
  });

  it('treats the same x,z on different levels as distinct cells (bug 4)', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const seq = await feedWood(c, BUILDABLES.wall.cost.wood * 2, 800_000);
    c.send({ t: 'command', seq: seq + 1, cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 0 } });
    expect((await c.waitFor('event')).diff.type).toBe('building_placed');
    await c.waitFor('inventory_delta');
    c.send({ t: 'command', seq: seq + 2, cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 1 } });
    expect((await c.waitFor('event')).diff.type).toBe('building_placed'); // different level, no conflict
    c.close();
  });
});
