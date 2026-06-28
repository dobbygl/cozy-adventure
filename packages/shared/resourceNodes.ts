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
export const RESOURCE_NODE_KINDS = ['tree'] as const;
export type ResourceNodeKind = (typeof RESOURCE_NODE_KINDS)[number];

/**
 * How much punishment a node takes and what it yields. Single source of truth for
 * BOTH single-player (per-hit ground drops in TreeChoppingSystem) and the server's
 * authoritative network grant (apps/server world commands).
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
};

/** Look up a node definition by kind, or undefined for an unknown/forged kind. */
export function getResourceNode(kind: string): ResourceNodeDefinition | undefined {
  return (RESOURCE_NODES as Record<string, ResourceNodeDefinition>)[kind];
}

/**
 * Total items a node yields when harvested to depletion: every hit's yield plus the
 * felling bonus. Equals single-player's per-node total (tree → 13).
 */
export function totalYieldFor(def: ResourceNodeDefinition): number {
  const hits = Math.ceil(def.maxHealth / def.damagePerHit);
  return hits * def.yieldPerHit + def.yieldBonusOnDeplete;
}
