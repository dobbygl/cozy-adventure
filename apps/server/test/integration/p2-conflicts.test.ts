import { describe, it, expect, afterEach } from 'vitest';
import { RESOURCE_NODES, type WorldDiff } from '@cozy/shared';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { feedWood } from '../harness/feedWood';

describe('P2 conflict resolution (single winner)', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('harvesting a tree: damaged per hit, depleted on the last, then rejected', async () => {
    ctx = await startTestServer();
    const { c } = await joinClient(ctx.url);
    const hits = RESOURCE_NODES.tree.maxHealth; // 5 hits to fell a tree

    for (let i = 0; i < hits; i++) {
      c.send({
        t: 'command',
        seq: i + 1,
        cmd: { type: 'harvest_node', networkId: 5, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } },
      });
    }
    // Each hit broadcasts a node diff plus the ground-drop diffs it spawns; keep only the
    // node diffs and check the progression: damaged for every hit but the last, which fells it.
    const nodeEvents = (await c.collect('event', 250))
      .map((e) => e.diff)
      .filter(
        (d): d is Extract<WorldDiff, { type: 'node_damaged' | 'node_depleted' }> =>
          d.type === 'node_damaged' || d.type === 'node_depleted'
      );
    expect(nodeEvents).toHaveLength(hits);
    expect(nodeEvents.every((d) => d.networkId === 5)).toBe(true);
    expect(nodeEvents.slice(0, hits - 1).every((d) => d.type === 'node_damaged')).toBe(true);
    expect(nodeEvents[hits - 1].type).toBe('node_depleted');

    // Already depleted: a further harvest is rejected (no double-fell).
    c.send({
      t: 'command',
      seq: hits + 1,
      cmd: { type: 'harvest_node', networkId: 5, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } },
    });
    const rej = await c.waitFor('command_rejected');
    expect(rej.reason).toBe('already_consumed');
    c.close();
  });

  it('two players building in the same cell: one placed, one cell_occupied', async () => {
    ctx = await startTestServer();
    const { c: a } = await joinClient(ctx.url);
    const { c: b } = await joinClient(ctx.url);
    await a.waitFor('peer_joined');

    // Both need wood to attempt the build (distinct tree ids; node health is global).
    const seqA = await feedWood(a, 10, 800_000);
    const seqB = await feedWood(b, 10, 850_000);

    // Same world position => same server-derived footprint => they contend for it.
    const build = (seq: number) => ({
      t: 'command' as const,
      seq,
      cmd: {
        type: 'place_building' as const,
        registryType: 'wall',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        level: 0,
      },
    });
    a.send(build(seqA + 1));
    b.send(build(seqB + 1));

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

    // a harvests a tree once: its wood lands on the ground as a drop both can contend for.
    a.send({
      t: 'command',
      seq: 1,
      cmd: { type: 'harvest_node', networkId: 7, nodeKind: 'tree', position: { x: 0, y: 0, z: 0 } },
    });
    const spawn = (await a.collect('event', 200)).find((e) => e.diff.type === 'drop_spawned');
    expect(spawn).toBeDefined();
    const networkId = spawn && spawn.diff.type === 'drop_spawned' ? spawn.diff.entity.networkId : -1;

    a.send({ t: 'command', seq: 2, cmd: { type: 'pickup_drop', networkId } });
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
