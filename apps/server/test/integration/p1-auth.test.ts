import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { MockClient } from '../harness/MockClient';

describe('P1 auth and capacity', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('rejects a wrong password and accepts the correct one', async () => {
    ctx = await startTestServer({ SERVER_PASSWORD: 'sekret' });

    const bad = await MockClient.connect(ctx.url);
    bad.send({ t: 'join', protocolVersion: 1, password: 'nope' });
    const err = await bad.waitFor('error');
    expect(err.code).toBe('auth');
    bad.close();

    const good = await MockClient.connect(ctx.url);
    good.send({ t: 'join', protocolVersion: 1, password: 'sekret' });
    const joined = await good.waitFor('joined');
    expect(joined.playerId).toBeDefined();
    good.close();
  });

  it('rejects a join missing the password on a protected server', async () => {
    ctx = await startTestServer({ SERVER_PASSWORD: 'sekret' });
    const c = await MockClient.connect(ctx.url);
    c.send({ t: 'join', protocolVersion: 1 });
    const err = await c.waitFor('error');
    expect(err.code).toBe('auth');
    c.close();
  });

  it('rejects an incompatible protocol version', async () => {
    ctx = await startTestServer();
    const c = await MockClient.connect(ctx.url);
    c.send({ t: 'join', protocolVersion: 999 });
    const err = await c.waitFor('error');
    expect(err.code).toBe('protocol_version');
    c.close();
  });

  it('rejects joins beyond MAX_PLAYERS', async () => {
    ctx = await startTestServer({ MAX_PLAYERS: '1' });
    const a = await MockClient.connect(ctx.url);
    a.send({ t: 'join', protocolVersion: 1 });
    await a.waitFor('joined');

    const b = await MockClient.connect(ctx.url);
    b.send({ t: 'join', protocolVersion: 1 });
    const err = await b.waitFor('error');
    expect(err.code).toBe('world_full');

    a.close();
    b.close();
  });
});
