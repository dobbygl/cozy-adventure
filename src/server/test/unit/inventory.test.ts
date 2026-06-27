import { describe, it, expect } from 'vitest';
import {
  addItem,
  removeItem,
  countItem,
  HOTBAR_SLOTS,
  BACKPACK_SLOTS,
  DEFAULT_MAX_STACK,
} from '../../src/world/inventory';
import type { InventoryState } from '@cozy/shared';

function emptyInventory(): InventoryState {
  return { backpack: {}, hotbar: {}, selectedSlot: 0 };
}

describe('server inventory ops', () => {
  it('adds and stacks items, hotbar first', () => {
    const inv = emptyInventory();
    expect(addItem(inv, 'wood', 5)).toBe(true);
    expect(countItem(inv, 'wood')).toBe(5);
    expect(inv.hotbar[0]).toEqual({ itemId: 'wood', quantity: 5 });
  });

  it('removes items all-or-nothing', () => {
    const inv = emptyInventory();
    addItem(inv, 'wood', 10);
    expect(removeItem(inv, 'wood', 4)).toBe(true);
    expect(countItem(inv, 'wood')).toBe(6);
    expect(removeItem(inv, 'wood', 99)).toBe(false); // not enough held -> no mutation
    expect(countItem(inv, 'wood')).toBe(6);
  });

  it('rejects an add that does not fit (inventory_full path)', () => {
    const inv = emptyInventory();
    const capacity = (HOTBAR_SLOTS + BACKPACK_SLOTS) * DEFAULT_MAX_STACK;
    expect(addItem(inv, 'wood', capacity)).toBe(true); // exactly fills every slot
    expect(addItem(inv, 'wood', 1)).toBe(false); // one more does not fit
    expect(addItem(inv, 'stone', 1)).toBe(false); // no empty slot for a new item
    expect(countItem(inv, 'wood')).toBe(capacity);
  });

  it('does not mutate when an add cannot fully fit', () => {
    const inv = emptyInventory();
    const capacity = (HOTBAR_SLOTS + BACKPACK_SLOTS) * DEFAULT_MAX_STACK;
    addItem(inv, 'wood', capacity - 1); // one unit of room left
    expect(addItem(inv, 'wood', 5)).toBe(false); // 5 won't fit in 1 -> all-or-nothing
    expect(countItem(inv, 'wood')).toBe(capacity - 1);
  });
});
