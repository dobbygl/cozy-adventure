import { describe, it, expect } from 'vitest';
import { RESOURCE_NODES, totalYieldFor } from '@cozy/shared';
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

    // Fell a tree over its full health, summing the per-hit wood grants.
    const hits = RESOURCE_NODES.tree.maxHealth;
    let woodGained = 0;
    for (let i = 0; i < hits; i++) {
      a.send({ t: 'command', seq: i + 1, cmd: { type: 'harvest_node', networkId: 5, nodeKind: 'tree' } });
      await a.waitFor('event');
      woodGained += (await a.waitFor('inventory_delta')).delta;
    }
    // Network mode yields exactly single-player's per-tree total (13).
    expect(woodGained).toBe(totalYieldFor(RESOURCE_NODES.tree));

    a.send({
      t: 'command',
      seq: hits + 1,
      cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 0, cell: { level: 0, gx: 0, gz: 0 } },
    });
    const buildEv = await a.waitFor('event');
    const buildingId = buildEv.diff.type === 'building_placed' ? buildEv.diff.entity.networkId : -1;

    await ctxA.server.stop(); // persistAll -> store

    // --- session 2: fresh server, same store ---
    const ctxB = await startTestServer({}, store);
    const { c: b, joined: jb } = await joinClient(ctxB.url, { playerId });

    expect(jb.seed).toBe(seed);
    // The felled tree's depletion survived the restart.
    expect(jb.world.diffs.some((d) => d.type === 'node_depleted' && d.networkId === 5)).toBe(true);
    // id space preserved across reload (no reuse).
    expect(jb.world.nextNetworkId).toBe(buildingId + 1);
    expect(jb.world.buildings.some((bd) => bd.networkId === buildingId)).toBe(true);
    // player progress restored: the exact wood gained from felling the tree.
    expect(countItem(jb.player.inventory, 'wood')).toBe(woodGained);

    b.close();
    await ctxB.server.stop();
  });
});
