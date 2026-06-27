import { describe, it, expect, afterEach } from 'vitest';
import { startTestServer, type TestServer } from '../harness/startTestServer';
import { MockClient } from '../harness/MockClient';

describe('foundational smoke', () => {
  let ctx: TestServer | undefined;

  afterEach(async () => {
    await ctx?.server.stop();
    ctx = undefined;
  });

  it('accepts a connection and answers keepalive with pong', async () => {
    ctx = await startTestServer();
    const client = await MockClient.connect(ctx.url);
    client.send({ t: 'keepalive' });
    const pong = await client.waitFor('pong');
    expect(pong.t).toBe('pong');
    expect(typeof pong.serverTime).toBe('number');
    client.close();
  });

  it('rejects malformed JSON with a bad_message error', async () => {
    ctx = await startTestServer();
    const client = await MockClient.connect(ctx.url);
    client.sendRaw('this is not json');
    const err = await client.waitFor('error');
    expect(err.code).toBe('bad_message');
    client.close();
  });

  it('rejects a structurally invalid message with bad_message', async () => {
    ctx = await startTestServer();
    const client = await MockClient.connect(ctx.url);
    client.sendRaw(JSON.stringify({ t: 'nonsense', foo: 1 }));
    const err = await client.waitFor('error');
    expect(err.code).toBe('bad_message');
    client.close();
  });

  it('serves /healthz over HTTP', async () => {
    ctx = await startTestServer();
    const res = await fetch(`http://127.0.0.1:${ctx.server.port}/healthz`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe('ok');
  });
});
