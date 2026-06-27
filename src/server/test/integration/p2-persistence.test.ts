import { describe, it, expect } from 'vitest';
import { startTestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { MemoryStore } from '../../src/persistence/MemoryStore';
import { countItem } from '../../src/world/inventory';

describe('P2 persistence', () => {
  it('world survives a restart: same diffs, seed and nextNetworkId; player progress restored', async () => {
    const store = new MemoryStore();

    // --- session 1: mutate the world, then shut down (persists) ---
    const ctxA = await startTestServer({}, store);
    const { c: a, joined: ja } = await joinClient(ctxA.url);
    const { playerId, seed } = ja;

    a.send({ t: 'command', seq: 1, cmd: { type: 'chop_tree', networkId: 5 } });
    await a.waitFor('event');
    a.send({
      t: 'command',
      seq: 2,
      cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 0, cell: { level: 0, gx: 0, gz: 0 } },
    });
    const buildEv = await a.waitFor('event');
    const buildingId = buildEv.diff.type === 'building_placed' ? buildEv.diff.entity.networkId : -1;

    await ctxA.server.stop(); // persistAll -> store

    // --- session 2: fresh server, same store ---
    const ctxB = await startTestServer({}, store);
    const { c: b, joined: jb } = await joinClient(ctxB.url, { playerId });

    expect(jb.seed).toBe(seed);
    expect(jb.world.diffs.length).toBe(2);
    expect(jb.world.diffs.some((d) => d.type === 'tree_chopped' && d.networkId === 5)).toBe(true);
    // id space preserved across reload (no reuse).
    expect(jb.world.nextNetworkId).toBe(buildingId + 1);
    expect(jb.world.buildings.some((bd) => bd.networkId === buildingId)).toBe(true);
    // player progress restored: the wood gained from the chop.
    expect(countItem(jb.player.inventory, 'wood')).toBe(1);

    b.close();
    await ctxB.server.stop();
  });
});
