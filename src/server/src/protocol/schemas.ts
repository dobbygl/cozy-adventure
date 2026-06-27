import { z } from 'zod';
import type { ClientMessage } from '@shared/protocol';

// Runtime validation for everything the server receives. The server trusts
// nothing: inbound data is `unknown` until it passes these schemas. Kept here
// (server-only) so the shared protocol module stays dependency-free for the
// client. A compile-time parity guard (below) keeps schemas and types in sync.

const vec3 = z.object({ x: z.number(), y: z.number(), z: z.number() });
const movement = z.enum(['idle', 'walking', 'running']);

const worldCommand = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('place_building'),
    registryType: z.string(),
    position: vec3,
    rotation: vec3,
    level: z.number().int(),
    cell: z.object({
      level: z.number().int(),
      gx: z.number().int(),
      gz: z.number().int(),
    }),
  }),
  z.object({ type: z.literal('chop_tree'), networkId: z.number().int() }),
  z.object({ type: z.literal('pickup_drop'), networkId: z.number().int() }),
  z.object({
    type: z.literal('drop_item'),
    itemId: z.string(),
    quantity: z.number().int().positive(),
    position: vec3,
  }),
]);

const joinMessage = z.object({
  t: z.literal('join'),
  protocolVersion: z.number().int(),
  password: z.string().optional(),
  playerId: z.string().optional(),
  displayName: z.string().optional(),
  modelId: z.string().optional(),
});

const avatarStateMessage = z.object({
  t: z.literal('avatar_state'),
  position: vec3,
  rotation: vec3,
  movement,
  heldItemId: z.string().nullable(),
});

const commandMessage = z.object({
  t: z.literal('command'),
  seq: z.number().int(),
  cmd: worldCommand,
});

const keepaliveMessage = z.object({ t: z.literal('keepalive') });

export const clientMessageSchema = z.discriminatedUnion('t', [
  joinMessage,
  avatarStateMessage,
  commandMessage,
  keepaliveMessage,
]);

// Compile-time parity guard: this function's `ClientMessage` return type forces
// the schema's parsed output (`z.infer<typeof clientMessageSchema>`) to be
// assignable to the shared ClientMessage type. If the schema and the type drift,
// the `return result.data` below fails to compile.
export function parseClientMessage(raw: unknown): ClientMessage | null {
  const result = clientMessageSchema.safeParse(raw);
  return result.success ? result.data : null;
}
