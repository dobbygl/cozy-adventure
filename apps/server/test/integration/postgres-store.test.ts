import { describe, it, expect } from 'vitest';
import { BUILDABLES, type WorldDocument, type PlayerState } from '@cozy/shared';
import { PostgresStore } from '../../src/persistence/PostgresStore';
import { startTestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import { feedWood } from '../harness/feedWood';

// Real-Postgres integration, closing the QA gap PostgresStore.ts documents: the default
// test run uses MemoryStore, so these never exercise a real database. They are SKIPPED
// unless DATABASE_URL is set. To run them against a throwaway database:
//   docker compose up -d postgres   # or any Postgres
//   DATABASE_URL=postgres://user:pass@localhost:5432/cozy pnpm --filter @cozy/server test
// Rows are written under unique ids per run, so re-runs don't collide.
const DB = process.env.DATABASE_URL;
const uniq = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;

describe.skipIf(!DB)('PostgresStore (real database)', () => {
  it('reports healthy and round-trips a world + player document', async () => {
    const store = new PostgresStore(DB as string);
    await store.init();
    expect(await store.healthy()).toBe(true);

    const worldId = `world-${uniq}`;
    const doc: WorldDocument = {
      worldId,
      seed: 42,
      createdAt: 1,
      nextNetworkId: 7,
      clock: { dayTime: 0, gameTime: 0, weather: 'clear' },
      diffs: [],
    };
    await store.saveWorld(doc);
    expect(await store.loadWorld(worldId)).toEqual(doc);
    expect(await store.loadWorld(`missing-${uniq}`)).toBeNull();

    const player: PlayerState = {
      playerId: `p-${uniq}`,
      displayName: 'Tester',
      modelId: 'male',
      position: { x: 1, y: 2, z: 3 },
      rotation: { x: 0, y: 0, z: 0 },
      health: { current: 5, max: 5 },
      inventory: { backpack: {}, hotbar: { 0: { itemId: 'wood', quantity: 4 } }, selectedSlot: 0 },
      selectedSlot: 0,
    };
    await store.savePlayer(worldId, player);
    expect(await store.loadPlayer(player.playerId)).toEqual(player);

    await store.close();
  });

  it('persists a placed building across a Postgres-backed server restart', async () => {
    const worldId = `world-restart-${uniq}`;

    const ctxA = await startTestServer({ WORLD_ID: worldId }, new PostgresStore(DB as string));
    const { c: a, joined: ja } = await joinClient(ctxA.url);
    const seq = await feedWood(a, BUILDABLES.wall.cost.wood, 800_000);
    a.send({ t: 'command', seq: seq + 1, cmd: { type: 'place_building', registryType: 'wall', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, level: 0 } });
    expect((await a.waitFor('event')).diff.type).toBe('building_placed');
    await a.waitFor('inventory_delta');
    a.close();
    await ctxA.server.stop(); // persists to Postgres

    const ctxB = await startTestServer({ WORLD_ID: worldId }, new PostgresStore(DB as string));
    const { c: b, joined: jb } = await joinClient(ctxB.url, { playerId: ja.playerId, token: ja.token });
    expect(jb.playerId).toBe(ja.playerId); // identity reclaimed via token across restart
    expect(jb.world.buildings.length).toBeGreaterThanOrEqual(1); // building survived
    b.close();
    await ctxB.server.stop();
  });
});
