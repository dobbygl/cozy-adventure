// Data-driven catalog of harvestable world resource nodes (Strategy/registry
// pattern). A "node" is anything you whittle down with a tool over several hits:
// today only trees, tomorrow rocks, ore veins, etc. Adding a gatherable is one
// entry here, no new code paths: the client tags each node mesh with its kind, the
// harvest command carries the kind, and both single-player drops and the server's
// network-mode grant read the SAME definition, so the two can never drift.
//
// THREE-free and DOM-safe (shared by @cozy/game and @cozy/server).

/**
 * Kinds of harvestable resource node. Extend this tuple (and {@link RESOURCE_NODES})
 * to add a gatherable; the wire enum and the registry stay in lockstep with it.
 */
export const RESOURCE_NODE_KINDS = ['tree', 'apple_tree'] as const;
export type ResourceNodeKind = (typeof RESOURCE_NODE_KINDS)[number];

/**
 * An extra, capped yield a node drops on top of its primary one (an apple tree still
 * gives wood like any tree, plus a few apples). Kept deterministic and capped across
 * the whole node so client and server agree without per-node randomness:
 * {@link secondaryYieldForHit} derives the amount for a hit from remaining health.
 */
export interface SecondaryYield {
  /** Inventory item id granted alongside the primary yield. */
  itemId: string;
  /** Items granted per hit until the cap is reached. */
  perHit: number;
  /** Total items the node ever drops of this kind. */
  maxTotal: number;
}

/**
 * How much punishment a node takes and what it yields. Single source of truth for
 * BOTH single-player (per-hit ground drops in TreeChoppingSystem) and the server's
 * authoritative network drops (apps/server world commands).
 */
export interface ResourceNodeDefinition {
  kind: ResourceNodeKind;
  /** Hits to fully deplete the node (e.g. a tree falls after 5). */
  maxHealth: number;
  /** Health removed per harvest command — one axe/pick swing. */
  damagePerHit: number;
  /** Inventory item id granted by harvesting this node. */
  yieldItemId: string;
  /** Items granted on each non-final hit. */
  yieldPerHit: number;
  /** Extra items granted on the depleting (final) hit. */
  yieldBonusOnDeplete: number;
  /** Optional capped bonus yield (e.g. apples from an apple tree). */
  secondaryYield?: SecondaryYield;
}

export const RESOURCE_NODES: Record<ResourceNodeKind, ResourceNodeDefinition> = {
  // Tree numbers mirror single-player exactly: 5 hits, 2 wood per hit, +3 on felling
  // → 13 wood per tree (4×2 + a final 2+3). Changing these moves both modes together.
  tree: {
    kind: 'tree',
    maxHealth: 5,
    damagePerHit: 1,
    yieldItemId: 'wood',
    yieldPerHit: 2,
    yieldBonusOnDeplete: 3,
  },
  // An apple tree yields wood exactly like a normal tree, plus up to 3 apples spread
  // across its first hits. Single-player drops apples randomly (1–2/hit, cap 3); here
  // the cap and per-hit amount are deterministic so the server and every client agree.
  apple_tree: {
    kind: 'apple_tree',
    maxHealth: 5,
    damagePerHit: 1,
    yieldItemId: 'wood',
    yieldPerHit: 2,
    yieldBonusOnDeplete: 3,
    secondaryYield: { itemId: 'apple', perHit: 1, maxTotal: 3 },
  },
};

/** Look up a node definition by kind, or undefined for an unknown/forged kind. */
export function getResourceNode(kind: string): ResourceNodeDefinition | undefined {
  return (RESOURCE_NODES as Record<string, ResourceNodeDefinition>)[kind];
}

/**
 * Total items a node yields when harvested to depletion: every hit's yield plus the
 * felling bonus. Equals single-player's per-node total (tree → 13). Counts only the
 * primary yield, not the secondary one.
 */
export function totalYieldFor(def: ResourceNodeDefinition): number {
  const hits = Math.ceil(def.maxHealth / def.damagePerHit);
  return hits * def.yieldPerHit + def.yieldBonusOnDeplete;
}

/**
 * Secondary-yield items dropped by a single hit, given the node's health BEFORE the
 * hit. Deterministic and self-capping: the amount already dropped is derived from how
 * many hits have landed so far, so replaying or re-ordering hits never exceeds
 * `maxTotal`. Returns 0 for nodes without a secondary yield (e.g. a plain tree).
 *
 * For the apple tree (5 health, 1/hit, cap 3) this is [1, 1, 1, 0, 0] over its hits.
 */
export function secondaryYieldForHit(def: ResourceNodeDefinition, currentHealth: number): number {
  const sec = def.secondaryYield;
  if (!sec) return 0;
  const hitsBefore = Math.floor((def.maxHealth - currentHealth) / def.damagePerHit);
  const alreadyDropped = Math.min(hitsBefore * sec.perHit, sec.maxTotal);
  return Math.max(0, Math.min(sec.perHit, sec.maxTotal - alreadyDropped));
}
