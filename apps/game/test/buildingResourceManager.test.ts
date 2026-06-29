import { describe, it, expect } from 'vitest';
import { BuildingResourceManager } from '../src/BuildingResourceManager';

// BuildingResourceManager becomes the single owner of building resource accounting in the
// decomposition (Fase 1 deletes the parallel inline copy in BuildingSystem). These tests
// pin its accounting behaviour first, so that consolidation is provably behaviour-preserving.
// Only the pure inventory math is covered here (the warning/floating-text methods touch DOM).

/** Minimal inventory double matching the slice BuildingResourceManager uses. */
class FakeInventory {
  constructor(private wood = 0, private cap = Infinity) {}
  hasItem(id: string, qty: number) {
    return id === 'wood' && this.wood >= qty;
  }
  getItemCount(id: string) {
    return id === 'wood' ? this.wood : 0;
  }
  removeItem(id: string, qty: number) {
    if (id !== 'wood') return 0;
    const removed = Math.min(qty, this.wood);
    this.wood -= removed;
    return removed;
  }
  addItem(_item: { id: string }, qty: number) {
    const room = Math.max(0, this.cap - this.wood);
    const added = Math.min(qty, room);
    this.wood += added;
    return added;
  }
}

const catalog = { wall: { name: 'Wall', cost: { wood: 10 } } };
const buildingWall = () => ({ userData: { isBuildingWall: true } }) as never;

describe('BuildingResourceManager', () => {
  it('allows building when there is no inventory at all', () => {
    const rm = new BuildingResourceManager(catalog, null);
    expect(rm.hasRequiredResources('wall')).toBe(true);
  });

  it('gates on whether the inventory can afford the cost', () => {
    expect(new BuildingResourceManager(catalog, new FakeInventory(10) as never).hasRequiredResources('wall')).toBe(true);
    expect(new BuildingResourceManager(catalog, new FakeInventory(9) as never).hasRequiredResources('wall')).toBe(false);
  });

  it('consumes the wood cost on build', () => {
    const inv = new FakeInventory(25);
    const rm = new BuildingResourceManager(catalog, inv as never);
    rm.consumeResources('wall');
    expect(inv.getItemCount('wood')).toBe(15);
  });

  it('refunds half the cost (rounded down) on break, with a full-success result', () => {
    const inv = new FakeInventory(0, 100);
    const rm = new BuildingResourceManager(catalog, inv as never);
    const result = rm.returnResources(buildingWall());
    expect(result).toEqual({ success: true, amountAdded: 5, expectedAmount: 5, originalCost: 10 });
    expect(inv.getItemCount('wood')).toBe(5);
  });

  it('reports a partial refund when the inventory is nearly full', () => {
    const inv = new FakeInventory(98, 100); // room for only 2 of the 5 refunded
    const rm = new BuildingResourceManager(catalog, inv as never);
    const result = rm.returnResources(buildingWall());
    expect(result).toMatchObject({ success: false, amountAdded: 2, expectedAmount: 5 });
  });

  it('returns undefined when there is no inventory or the target is not a building', () => {
    expect(new BuildingResourceManager(catalog, null).returnResources(buildingWall())).toBeUndefined();
    const rm = new BuildingResourceManager(catalog, new FakeInventory(0, 100) as never);
    expect(rm.returnResources({ userData: {} } as never)).toBeUndefined();
  });
});
