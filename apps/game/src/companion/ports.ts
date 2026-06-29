import type * as THREE from 'three';

/**
 * The seams a companion needs into the rest of the game. They exist so the
 * companion never reaches for the `window.gameInstance` global directly: the
 * game wires concrete implementations in, and tests pass fakes.
 *
 * Each port is resolved through a GETTER, not a captured instance, because the
 * dependencies a companion needs (collision system, inventory, ...) may be
 * created after the companion and may be swapped at runtime. Capturing them in
 * the constructor would reintroduce the init-order fragility the old per-frame
 * `window.gameInstance.collisionSystem` lookup quietly avoided.
 */

/** The slice of CollisionSystem a companion uses to stay on the ground. */
export interface GroundCollider {
  checkGroundCollision(
    position: THREE.Vector3,
    height?: number,
    rayOffset?: number,
  ): { hasCollision: boolean; groundHeight: number | null };
}

/** Lazily resolves the active ground collider, or null when none exists yet. */
export type GroundProvider = () => GroundCollider | null;

/** A game item definition as a companion delivery sees it (a registry entry). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompanionItem = any;

/** One item delivered to the inventory, with the amount that actually fit. */
export interface DeliveredItem {
  item: CompanionItem;
  quantity: number;
}

/** One fetched-and-carried item awaiting delivery (the shape the brain stores). */
export interface FetchedItem {
  userData: { itemId: string; quantity: number };
}

/**
 * Inventory operations a companion delivery performs, wrapping game.inventory +
 * game.itemRegistry.
 *
 * NOTE (multiplayer): addItem mutates the LOCAL inventory. In network mode that
 * is the desync the dog currently risks; this port is the single point where a
 * future server-authoritative fix would route the grant through a command
 * instead. Out of scope for this refactor (behavior preserved).
 */
export interface InventoryPort {
  /** Resolve an item id to its registry definition, or undefined if unknown. */
  getItem(itemId: string): CompanionItem | undefined;
  /** Add up to `quantity` of `item`; returns how many were actually added. */
  addItem(item: CompanionItem, quantity: number): number;
  /** The currently selected item (to refresh the held item), or null. */
  getSelectedItem(): unknown;
  /** Fire the inventory-change callback, if the game registered one. */
  notifyChange(): void;
}

/**
 * The UI side-effects of a companion action. DeliveryService decides WHAT was
 * delivered; this renders it, so the brain stays render-free.
 */
export interface CompanionUiPort {
  /** Re-sync every inventory view after a delivery. */
  refreshInventory(): void;
  /** Show the "dog delivered X" popup(s). */
  showDeliveryPopup(delivered: DeliveredItem[], total: number): void;
  /** Refresh the player's held item from the current selection. */
  refreshHeldItem(): void;
  /** Fade out any world pickup prompt for `itemId` before its drop is removed. */
  cleanupWorldPickupPrompts(itemId: string): void;
}

/** Removes a picked-up drop from the shared world (scene + tracking arrays). */
export interface DroppedItemsPort {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remove(item: any): void;
}
