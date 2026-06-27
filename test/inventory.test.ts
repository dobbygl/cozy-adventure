import { describe, it, expect } from 'vitest';
import { Item, ItemStack, Inventory } from '../src/inventory.js';

// A stackable material (like wood) and a non-stackable tool.
const wood = () => new Item('wood', 'Wood', 'material', 'icon-wood', 64);
const axe = () => new Item('axe', 'Axe', 'tool', 'icon-axe', 1);

describe('ItemStack', () => {
  it('caps the initial quantity at the item stackSize', () => {
    expect(new ItemStack(wood(), 100).quantity).toBe(64);
  });

  it('canAddItem requires the WHOLE quantity to fit (no partial top-up)', () => {
    const stack = new ItemStack(wood(), 60);
    // 60 + 10 = 70 > 64, so it refuses even though 4 would still fit.
    expect(stack.canAddItem(wood(), 10)).toBe(false);
    expect(stack.canAddItem(wood(), 4)).toBe(true);
  });

  it('addQuantity tops up to stackSize and returns the leftover', () => {
    const stack = new ItemStack(wood(), 60);
    const leftover = stack.addQuantity(10);
    expect(stack.quantity).toBe(64);
    expect(leftover).toBe(6);
  });

  it('canAddItem rejects a different item id', () => {
    expect(new ItemStack(wood(), 1).canAddItem(axe(), 1)).toBe(false);
  });
});

describe('Inventory.addItem', () => {
  it('fills the hotbar before the backpack', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 10);
    expect(inv.hotbar[0]?.quantity).toBe(10);
    expect(inv.backpack.every((s) => s === null)).toBe(true);
  });

  it('opens a new stack instead of topping up a partial one (canAddItem quirk)', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 60); // hotbar[0] = 60
    inv.addItem(wood(), 10); // 60 + 10 > 64, so a fresh stack of 10 is opened
    expect(inv.hotbar[0].quantity).toBe(60);
    expect(inv.hotbar[1].quantity).toBe(10);
    expect(inv.getItemCount('wood')).toBe(70);
  });

  it('splits a quantity larger than stackSize across multiple stacks', () => {
    const inv = new Inventory();
    const added = inv.addItem(wood(), 100); // 64 + 36
    expect(added).toBe(100);
    expect(inv.hotbar[0].quantity).toBe(64);
    expect(inv.hotbar[1].quantity).toBe(36);
  });

  it('returns only what fits and stops when the inventory is full', () => {
    const inv = new Inventory();
    const capacity = (inv.hotbarSize + inv.backpackSize) * 64; // 63 slots * 64
    const added = inv.addItem(wood(), capacity + 1000);
    expect(added).toBe(capacity);
    expect(inv.getItemCount('wood')).toBe(capacity);
  });
});

describe('Inventory.removeItem / getItemCount', () => {
  it('removes from the hotbar first and reports what was removed', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 30);
    expect(inv.removeItem('wood', 12)).toBe(12);
    expect(inv.getItemCount('wood')).toBe(18);
  });

  it('clears a slot when its stack is emptied', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 5);
    inv.removeItem('wood', 5);
    expect(inv.hotbar[0]).toBeNull();
    expect(inv.getItemCount('wood')).toBe(0);
  });
});

describe('Inventory serialize / deserialize', () => {
  it('round-trips quantities and the selected slot through a registry', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 70); // 64 + 6, two stacks
    inv.selectHotbarSlot(1);
    const data = inv.serialize();

    const restored = new Inventory();
    restored.deserialize(data, { wood: wood() });

    expect(restored.getItemCount('wood')).toBe(70);
    expect(restored.selectedHotbarSlot).toBe(1);
  });

  it('silently drops items whose id is missing from the registry', () => {
    const inv = new Inventory();
    inv.addItem(wood(), 10);
    const data = inv.serialize();

    const restored = new Inventory();
    restored.deserialize(data, {}); // empty registry
    expect(restored.getItemCount('wood')).toBe(0);
    expect(restored.hotbar.every((s) => s === null)).toBe(true);
  });
});
