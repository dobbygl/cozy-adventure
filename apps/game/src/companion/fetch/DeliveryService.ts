import type {
  CompanionUiPort,
  DeliveredItem,
  FetchedItem,
  InventoryPort,
} from '../ports.js';

/**
 * Delivers a companion's carried haul into the inventory and triggers the UI
 * around it. Extracted from DogCompanion.deliverMultipleItems + the popup/refresh
 * helpers (Fase 5). The grant accounting (resolve, add, count what actually fit)
 * is the testable core; the UI is delegated to CompanionUiPort, so this stays
 * render-free and headlessly testable with fakes.
 */
export class DeliveryService {
  constructor(
    private readonly inventory: InventoryPort,
    private readonly ui: CompanionUiPort,
  ) {}

  /**
   * Try to deliver every fetched item. `onItemDelivered` fires once per item
   * that fit (the dog uses it to spit one mouth item out at a time). Returns
   * true iff at least one item landed in the inventory.
   */
  deliver(fetchedItems: FetchedItem[], onItemDelivered?: () => void): boolean {
    console.log('🚀 Multi-item delivery system started');
    console.log('Items to deliver:', fetchedItems.length);

    if (fetchedItems.length === 0) {
      console.log('❌ No items to deliver');
      return false;
    }

    const delivered: DeliveredItem[] = [];
    let totalDelivered = 0;

    // Deliver each item one by one
    for (let i = 0; i < fetchedItems.length; i++) {
      const fetchedItem = fetchedItems[i];
      const itemId = fetchedItem.userData.itemId;
      const quantity = fetchedItem.userData.quantity || 1;
      const item = this.inventory.getItem(itemId);

      if (!item) {
        console.warn(`❌ Item ${itemId} not found in registry, skipping`);
        continue;
      }

      console.log(`📦 Delivering item ${i + 1}/${fetchedItems.length}: ${item.name} x${quantity}`);

      // Try to add the item to inventory
      const addedQuantity = this.inventory.addItem(item, quantity);

      if (addedQuantity > 0) {
        delivered.push({ item, quantity: addedQuantity });
        totalDelivered += addedQuantity;
        console.log(`✅ Successfully delivered ${addedQuantity} ${item.name}(s)`);

        // Drop one carried visual per successful delivery
        onItemDelivered?.();
      } else {
        console.warn(`❌ Could not deliver ${item.name} - inventory may be full`);
      }
    }

    // Force comprehensive UI update after all deliveries
    this.ui.refreshInventory();

    // Show delivery message with summary using pickup popup system
    if (delivered.length > 0) {
      this.ui.showDeliveryPopup(delivered, totalDelivered);

      // Trigger inventory change callbacks
      this.inventory.notifyChange();

      // Update player held item
      this.ui.refreshHeldItem();

      console.log(`🎉 Multi-item delivery completed! Delivered ${totalDelivered} items total`);
      return true;
    }

    console.log('❌ No items were successfully delivered');
    return false;
  }
}
