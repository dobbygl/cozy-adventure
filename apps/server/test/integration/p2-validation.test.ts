import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { feedWood } from '../harness/feedWood';

describe('P2 command validation (rejection without mutation)', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('rejects pickup of a non-existent drop', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    c.send({ t: 'command', seq: 1, cmd: { type: 'pickup_drop', networkId: 9_999_999 } });
    const rej = await c.waitFor('command_rejected');
    expect(rej.reason).toBe('already_consumed');
    c.close();
  });

  it('rejects acting out of range', async () => {
    ctx = await startTestServer();
    const { c: dropper } = await joinClient(ctx.url);
    const { c: far } = await joinClient(ctx.url);
    await dropper.waitFor('peer_joined');

    // dropper harvests a tree at the origin: its wood lands on the ground there as a drop
    // (no position reported -> dropper itself is not range-checked).
    dropper.send({
      t: 'command',
      seq: 1,
      cmd: { type: 'harvest_node', networkId: 1, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } },
    });
    const spawn = (await dropper.collect('event', 150)).find((e) => e.diff.type === 'drop_spawned');
    const networkId = spawn && spawn.diff.type === 'drop_spawned' ? spawn.diff.entity.networkId : -1;

    // far's FIRST avatar_state may be anywhere (sanity only checks deltas). Place it
    // far away, then try to grab the origin drop. WS messages are ordered, so the
    // server sees the position before the command.
    far.send({ t: 'avatar_state', position: { x: 50, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, movement: 'idle', heldItemId: null });
    far.send({ t: 'command', seq: 1, cmd: { type: 'pickup_drop', networkId } });
    const rej = await far.waitFor('command_rejected');
    expect(rej.reason).toBe('out_of_range');
    dropper.close();
    far.close();
  });

  it('rejects building in an occupied cell', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const seq = await feedWood(c, 20, 800_000); // enough for two walls
    const build = (s: number) => ({
      t: 'command' as const,
      seq: s,
      cmd: {
        type: 'place_building' as const,
        registryType: 'wall',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        level: 0,
      },
    });
    c.send(build(seq + 1));
    const ev = await c.waitFor('event');
    expect(ev.diff.type).toBe('building_placed');
    // Same position -> same derived footprint -> the cell is taken.
    c.send(build(seq + 2));
    const rej = await c.waitFor('command_rejected');
    expect(rej.reason).toBe('cell_occupied');
    c.close();
  });

  it('rejects dropping an item the player does not have', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    c.send({ t: 'command', seq: 1, cmd: { type: 'drop_item', itemId: 'diamond', quantity: 1, position: { x: 0, y: 0, z: 0 } } });
    const rej = await c.waitFor('command_rejected');
    expect(rej.reason).toBe('invalid');
    c.close();
  });
});
