import { describe, it, expect } from 'vitest';
import { RESOURCE_NODES, totalYieldFor, BUILDABLES } from '@cozy/shared';
import { startTestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { fellAndGatherWood } from '../harness/feedWood';
import { MemoryStore } from '../../src/persistence/MemoryStore';
import { countItem } from '../../src/world/inventory';

describe('P2 persistence', () => {
  it('world survives a restart: same diffs, seed and nextNetworkId; player progress restored', async () => {
    const store = new MemoryStore();

    // --- session 1: mutate the world, then shut down (persists) ---
    const ctxA = await startTestServer({}, store);
    const { c: a, joined: ja } = await joinClient(ctxA.url);
    const { playerId, token, seed } = ja;

    // Fell a tree and pick up the wood it dropped on the ground (parity with single-player).
    const { seq, wood: woodGained } = await fellAndGatherWood(a, 5);
    // Network mode yields exactly single-player's per-tree total (13).
    expect(woodGained).toBe(totalYieldFor(RESOURCE_NODES.tree));

    // Build a wall (server derives the cells and consumes wood). 13 gained - 10 cost = 3.
    a.send({
      t: 'command',
      seq: seq + 1,
      cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 0 },
    });
    const buildEv = await a.waitFor('event');
    const buildingId = buildEv.diff.type === 'building_placed' ? buildEv.diff.entity.networkId : -1;
    const woodAfterBuild = woodGained - BUILDABLES.wall.cost.wood;

    await ctxA.server.stop(); // persistAll -> store

    // --- session 2: fresh server, same store ---
    const ctxB = await startTestServer({}, store);
    const { c: b, joined: jb } = await joinClient(ctxB.url, { playerId, token });

    expect(jb.seed).toBe(seed);
    // The felled tree's depletion survived the restart.
    expect(jb.world.diffs.some((d) => d.type === 'node_depleted' && d.networkId === 5)).toBe(true);
    // id space preserved across reload (no reuse).
    expect(jb.world.nextNetworkId).toBe(buildingId + 1);
    expect(jb.world.buildings.some((bd) => bd.networkId === buildingId)).toBe(true);
    // player progress restored: wood gained from felling, minus the wall's cost.
    expect(countItem(jb.player.inventory, 'wood')).toBe(woodAfterBuild);

    b.close();
    await ctxB.server.stop();
  });

  it('captures the avatar position into the player document and restores it across a restart', async () => {
    const store = new MemoryStore();

    // --- session 1: report a position away from spawn, then shut down (persists) ---
    const ctxA = await startTestServer({}, store);
    const { c: a, joined: ja } = await joinClient(ctxA.url);
    const { playerId, token } = ja;
    // A fresh player starts at the origin; the server only learns our position from avatar_state.
    expect(ja.player.position).toEqual({ x: 0, y: 0, z: 0 });

    const pos = { x: 12.5, y: 0, z: -7.25 };
    const rot = { x: 0, y: 1.5, z: 0 };
    a.send({ t: 'avatar_state', position: pos, rotation: rot, movement: 'idle', heldItemId: null });
    // Ordering barrier: a pong proves the server already processed the prior avatar_state
    // (same connection, in-order) before we stop and persist.
    a.send({ t: 'keepalive' });
    await a.waitFor('pong');

    await ctxA.server.stop(); // persistAll -> captureAvatarIntoPlayer -> store

    // --- session 2: fresh server, same store: we resume where we were, not at spawn ---
    const ctxB = await startTestServer({}, store);
    const { c: b, joined: jb } = await joinClient(ctxB.url, { playerId, token });
    expect(jb.player.position).toEqual(pos);
    expect(jb.player.rotation).toEqual(rot);

    b.close();
    await ctxB.server.stop();
  });
});
