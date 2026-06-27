import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { joinClient } from '../harness/joinClient';
import type { MockClient } from '../harness/MockClient';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const PLAYER_COUNT = 8;
const DURATION_MS = 1000;
const RELAY_P95_BUDGET_MS = 50;

describe('P3 load: one world, 8 players at ~15Hz', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('sustains 8 players streaming avatar state without dropping anyone', async () => {
    ctx = await startTestServer({ AVATAR_TICK_HZ: '15', MAX_PLAYERS: '8' });
    const joins = await Promise.all(
      Array.from({ length: PLAYER_COUNT }, (_, i) => joinClient(ctx!.url, { displayName: `p${i}` }))
    );
    const clients: MockClient[] = joins.map((j) => j.c);

    // Each player streams smooth (sanity-passing) movement at ~15Hz for a second.
    const start = Date.now();
    const senders = clients.map((c, i) =>
      (async () => {
        let x = i * 5;
        while (Date.now() - start < DURATION_MS) {
          x += 0.1;
          c.send({
            t: 'avatar_state',
            position: { x, y: 0, z: i },
            rotation: { x: 0, y: 0, z: 0 },
            movement: 'running',
            heldItemId: null,
          });
          await sleep(66);
        }
      })()
    );
    await Promise.all(senders);

    // Nobody was dropped, and relay actually delivered snapshots under load.
    for (const c of clients) expect(c.isClosed).toBe(false);
    const snaps = await clients[0].collect('avatar_snapshots', 200);
    expect(snaps.length).toBeGreaterThan(0);

    // Server-side budget via the metrics endpoint.
    const res = await fetch(`http://127.0.0.1:${ctx.server.port}/metrics`);
    const m = (await res.json()) as { connectedPlayers: number; relayLatencyP95Ms: number };
    expect(m.connectedPlayers).toBe(PLAYER_COUNT);
    expect(m.relayLatencyP95Ms).toBeLessThan(RELAY_P95_BUDGET_MS);

    for (const c of clients) c.close();
  });
});
