import { MockClient } from './MockClient';
import type { JoinedMessage } from '@cozy/shared';

/** Connect a MockClient and complete the join handshake, returning the client + joined message. */
export async function joinClient(
  url: string,
  opts: { playerId?: string; displayName?: string } = {}
): Promise<{ c: MockClient; joined: JoinedMessage }> {
  const c = await MockClient.connect(url);
  c.send({
    t: 'join',
    protocolVersion: 1,
    ...(opts.playerId ? { playerId: opts.playerId } : {}),
    ...(opts.displayName ? { displayName: opts.displayName } : {}),
  });
  const joined = await c.waitFor('joined');
  return { c, joined };
}
