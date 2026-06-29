import { describe, it, expect, vi } from 'vitest';
import { DeliveryService } from '../../src/companion/fetch/DeliveryService.js';
import type { CompanionUiPort, FetchedItem, InventoryPort } from '../../src/companion/ports.js';

// DeliveryService accounting (Fase 5). Fakes stand in for the inventory and UI,
// so the grant logic is tested headlessly: registry misses, partial fills, the
// per-item callback, and the success/failure return.

function fetched(itemId: string, quantity = 1): FetchedItem {
  return { userData: { itemId, quantity } };
}

/** Inventory that knows a fixed registry and accepts up to `capacity` total items. */
function fakeInventory(known: string[], capacity = Infinity): InventoryPort & { added: number } {
  const port = {
    added: 0,
    getItem(itemId: string) {
      return known.includes(itemId) ? { id: itemId, name: itemId } : undefined;
    },
    addItem(_item: unknown, quantity: number) {
      const room = capacity - port.added;
      const take = Math.max(0, Math.min(quantity, room));
      port.added += take;
      return take;
    },
    getSelectedItem: () => null,
    notifyChange: vi.fn(),
  };
  return port;
}

function fakeUi(): CompanionUiPort & {
  refreshInventory: ReturnType<typeof vi.fn>;
  showDeliveryPopup: ReturnType<typeof vi.fn>;
  refreshHeldItem: ReturnType<typeof vi.fn>;
} {
  return {
    refreshInventory: vi.fn(),
    showDeliveryPopup: vi.fn(),
    refreshHeldItem: vi.fn(),
    cleanupWorldPickupPrompts: vi.fn(),
  };
}

describe('DeliveryService', () => {
  it('returns false and shows no popup when there is nothing to deliver', () => {
    const ui = fakeUi();
    const ok = new DeliveryService(fakeInventory(['wood']), ui).deliver([]);
    expect(ok).toBe(false);
    expect(ui.showDeliveryPopup).not.toHaveBeenCalled();
  });

  it('delivers known items, fires the per-item callback, and reports success', () => {
    const inv = fakeInventory(['wood', 'apple']);
    const ui = fakeUi();
    const onItem = vi.fn();
    const ok = new DeliveryService(inv, ui).deliver([fetched('wood', 2), fetched('apple', 1)], onItem);

    expect(ok).toBe(true);
    expect(inv.added).toBe(3);
    expect(onItem).toHaveBeenCalledTimes(2); // one per item that fit
    expect(ui.showDeliveryPopup).toHaveBeenCalledOnce();
    expect(ui.showDeliveryPopup.mock.calls[0][1]).toBe(3); // total delivered
    expect(inv.notifyChange).toHaveBeenCalled();
    expect(ui.refreshHeldItem).toHaveBeenCalled();
  });

  it('skips items missing from the registry but still delivers the rest', () => {
    const inv = fakeInventory(['wood']); // 'gold' unknown
    const ui = fakeUi();
    const onItem = vi.fn();
    const ok = new DeliveryService(inv, ui).deliver([fetched('gold'), fetched('wood')], onItem);

    expect(ok).toBe(true);
    expect(inv.added).toBe(1);
    expect(onItem).toHaveBeenCalledTimes(1); // only the wood fit
  });

  it('returns false when nothing fits (inventory full), but still refreshes the UI', () => {
    const inv = fakeInventory(['wood'], 0); // zero capacity
    const ui = fakeUi();
    const ok = new DeliveryService(inv, ui).deliver([fetched('wood')]);

    expect(ok).toBe(false);
    expect(ui.showDeliveryPopup).not.toHaveBeenCalled();
    expect(ui.refreshInventory).toHaveBeenCalled(); // refresh runs regardless
  });
});
