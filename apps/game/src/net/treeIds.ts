import { DYNAMIC_NETWORK_ID_BASE } from '@cozy/shared';

// Stable, deterministic networkIds for the seed-generated base trees.
//
// THREE-free on purpose so it is unit-testable headlessly and can never drift
// from the wire contract. The protocol splits the id space: base-world entities
// (the seeded trees) are identified by their deterministic generation INDEX,
// which every client derives identically and which lives BELOW
// DYNAMIC_NETWORK_ID_BASE; the server allocates ids for dynamic entities
// (buildings, drops, dogs) AT or ABOVE that base, so the two never collide
// (Constitution Principle II: never mesh.uuid). A tree's id is purely a function
// of its (typeIndex, instanceIndex) in the fixed generation order, so it is
// stable across clients and across reloads regardless of placement success.

/**
 * Cumulative base offset per tree type: `offsets[type] + instanceIndex` is the
 * tree's networkId. Throws if the total base-tree count would reach
 * DYNAMIC_NETWORK_ID_BASE (which would let a base-tree id collide with a
 * server-allocated dynamic id).
 */
export function treeNetworkIdOffsets(counts: readonly number[]): number[] {
  const offsets: number[] = [];
  let acc = 0;
  for (const c of counts) {
    offsets.push(acc);
    acc += c;
  }
  if (acc >= DYNAMIC_NETWORK_ID_BASE) {
    throw new Error(
      `base tree count ${acc} must stay below DYNAMIC_NETWORK_ID_BASE ${DYNAMIC_NETWORK_ID_BASE}`
    );
  }
  return offsets;
}

/**
 * Stable networkId for a base tree, given the per-type offsets from
 * {@link treeNetworkIdOffsets}. Deterministic: the same (typeIndex,
 * instanceIndex) always yields the same id, on any client.
 */
export function treeNetworkId(
  offsets: readonly number[],
  typeIndex: number,
  instanceIndex: number
): number {
  return offsets[typeIndex] + instanceIndex;
}
