import type { InventoryState, ItemStackState } from '@cozy/shared';

// Server-side authority over inventory changes caused by world commands
// (chop -> +resource, pickup -> +item, drop -> -item). Mirrors the client's slot
// layout (hotbar 9 + backpack 6x9). The server lacks the per-item stackSize from
// the client item registry, so it uses a default max stack — a documented v1
// simplification; the exact registry stack sizes are reconciled with the client
// (spec 003). Non-command mechanics (farming/crafting/use) are out of v1 server scope.

export const HOTBAR_SLOTS = 9;
export const BACKPACK_SLOTS = 54;
export const DEFAULT_MAX_STACK = 99;

type Section = Record<number, ItemStackState>;

function sectionCapacityFor(section: Section, slots: number, itemId: string): number {
  let cap = 0;
  for (let i = 0; i < slots; i++) {
    const s = section[i];
    if (!s) cap += DEFAULT_MAX_STACK;
    else if (s.itemId === itemId) cap += Math.max(0, DEFAULT_MAX_STACK - s.quantity);
  }
  return cap;
}

function sectionPlace(section: Section, slots: number, itemId: string, qty: number): number {
  let remaining = qty;
  for (let i = 0; i < slots && remaining > 0; i++) {
    const s = section[i];
    if (s && s.itemId === itemId && s.quantity < DEFAULT_MAX_STACK) {
      const add = Math.min(remaining, DEFAULT_MAX_STACK - s.quantity);
      s.quantity += add;
      remaining -= add;
    }
  }
  for (let i = 0; i < slots && remaining > 0; i++) {
    if (!section[i]) {
      const add = Math.min(remaining, DEFAULT_MAX_STACK);
      section[i] = { itemId, quantity: add };
      remaining -= add;
    }
  }
  return remaining;
}

export function countItem(inv: InventoryState, itemId: string): number {
  let total = 0;
  for (const s of Object.values(inv.hotbar)) if (s.itemId === itemId) total += s.quantity;
  for (const s of Object.values(inv.backpack)) if (s.itemId === itemId) total += s.quantity;
  return total;
}

/** Add qty of itemId, all-or-nothing. Returns false (no mutation) if it won't fit. */
export function addItem(inv: InventoryState, itemId: string, qty: number): boolean {
  if (qty <= 0) return true;
  const capacity =
    sectionCapacityFor(inv.hotbar, HOTBAR_SLOTS, itemId) +
    sectionCapacityFor(inv.backpack, BACKPACK_SLOTS, itemId);
  if (capacity < qty) return false;
  // Hotbar first (matches the client's add order), then backpack.
  const afterHotbar = sectionPlace(inv.hotbar, HOTBAR_SLOTS, itemId, qty);
  const remaining = sectionPlace(inv.backpack, BACKPACK_SLOTS, itemId, afterHotbar);
  return remaining === 0;
}

/** Remove qty of itemId, all-or-nothing. Returns false (no mutation) if not enough held. */
export function removeItem(inv: InventoryState, itemId: string, qty: number): boolean {
  if (qty <= 0) return true;
  if (countItem(inv, itemId) < qty) return false;
  let remaining = qty;
  for (const section of [inv.hotbar, inv.backpack]) {
    for (const key of Object.keys(section)) {
      if (remaining <= 0) break;
      const idx = Number(key);
      const s = section[idx];
      if (s.itemId !== itemId) continue;
      const take = Math.min(remaining, s.quantity);
      s.quantity -= take;
      remaining -= take;
      if (s.quantity <= 0) delete section[idx];
    }
  }
  return remaining === 0;
}
