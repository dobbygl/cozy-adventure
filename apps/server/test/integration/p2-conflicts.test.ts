import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';

describe('P2 conflict resolution (single winner)', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('chopping the same tree twice: applied once, then rejected', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);

    c.send({ t: 'command', seq: 1, cmd: { type: 'chop_tree', networkId: 5 } });
    const ev = await c.waitFor('event');
    expect(ev.diff.type).toBe('tree_chopped');
    if (ev.diff.type === 'tree_chopped') expect(ev.diff.networkId).toBe(5);

    c.send({ t: 'command', seq: 2, cmd: { type: 'chop_tree', networkId: 5 } });
    const rej = await c.waitFor('command_rejected');
    expect(rej.reason).toBe('already_consumed');
    c.close();
  });

  it('two players building in the same cell: one placed, one cell_occupied', async () => {
    ctx = await startTestServer();
    const { c: a } = await joinClient(ctx.url);
    const { c: b } = await joinClient(ctx.url);
    await a.waitFor('peer_joined');

    const cell = { level: 0, gx: 3, gz: 4 };
    const build = (seq: number) => ({
      t: 'command' as const,
      seq,
      cmd: {
        type: 'place_building' as const,
        registryType: 'wall',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        level: 0,
        cell,
      },
    });
    a.send(build(1));
    b.send(build(1));

    const placed = (await a.collect('event', 300)).filter((e) => e.diff.type === 'building_placed');
    expect(placed).toHaveLength(1);

    const rejects = [...(await a.collect('command_rejected', 50)), ...(await b.collect('command_rejected', 50))];
    expect(rejects).toHaveLength(1);
    expect(rejects[0].reason).toBe('cell_occupied');
    a.close();
    b.close();
  });

  it('two players picking up the same drop: one gets it, one already_consumed', async () => {
    ctx = await startTestServer();
    const { c: a } = await joinClient(ctx.url);
    const { c: b } = await joinClient(ctx.url);
    await a.waitFor('peer_joined');

    // a chops a tree (gains wood), then drops it on the ground.
    a.send({ t: 'command', seq: 1, cmd: { type: 'chop_tree', networkId: 7 } });
    await a.waitFor('event');
    a.send({ t: 'command', seq: 2, cmd: { type: 'drop_item', itemId: 'wood', quantity: 1, position: { x: 0, y: 0, z: 0 } } });
    const spawn = await a.waitFor('event');
    expect(spawn.diff.type).toBe('drop_spawned');
    const networkId = spawn.diff.type === 'drop_spawned' ? spawn.diff.entity.networkId : -1;

    a.send({ t: 'command', seq: 3, cmd: { type: 'pickup_drop', networkId } });
    b.send({ t: 'command', seq: 1, cmd: { type: 'pickup_drop', networkId } });

    const removed = (await a.collect('event', 300)).filter(
      (e) => e.diff.type === 'drop_removed' && e.diff.networkId === networkId
    );
    expect(removed).toHaveLength(1);

    const rejects = [...(await a.collect('command_rejected', 50)), ...(await b.collect('command_rejected', 50))];
    expect(rejects).toHaveLength(1);
    expect(rejects[0].reason).toBe('already_consumed');
    a.close();
    b.close();
  });
});
