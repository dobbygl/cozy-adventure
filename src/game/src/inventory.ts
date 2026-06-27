/**
 * Inventory model: items, stacks, and the player's hotbar + backpack.
 * Pure game-state logic (no DOM); the view lives in inventoryUI.
 */

export interface SerializedItemStack {
  itemId: string;
  quantity: number;
}

export interface SerializedInventory {
  hotbar: (SerializedItemStack | null)[];
  backpack: (SerializedItemStack | null)[];
  selectedHotbarSlot: number;
}

/** Fired whenever inventory contents change. */
export type InventoryChangeListener = () => void;
/** Fired when the selected hotbar slot changes. */
export type HotbarSelectionListener = (slotIndex: number, item: ItemStack | null) => void;
/** Fired when items are successfully added to the inventory. */
export type ItemAddedListener = (item: Item, added: number, total: number) => void;

/**
 * Item - represents an individual inventory item definition.
 */
export class Item {
  id: string;
  name: string;
  /** e.g. 'tool', 'consumable', 'material', 'weapon', 'armor' */
  type: string;
  /** CSS class or image URL */
  icon: string;
  stackSize: number;
  description: string;

  constructor(
    id: string,
    name: string,
    type: string,
    icon: string,
    stackSize = 1,
    description = ''
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.stackSize = stackSize;
    this.description = description;
  }
}

/**
 * ItemStack - represents a stack of items in inventory.
 */
export class ItemStack {
  item: Item;
  quantity: number;

  constructor(item: Item, quantity = 1) {
    this.item = item;
    this.quantity = Math.min(quantity, item.stackSize);
  }

  canAddItem(item: Item, quantity = 1): boolean {
    return this.item.id === item.id && this.quantity + quantity <= this.item.stackSize;
  }

  addQuantity(quantity: number): number {
    const maxAdd = this.item.stackSize - this.quantity;
    const actualAdd = Math.min(quantity, maxAdd);
    this.quantity += actualAdd;
    return quantity - actualAdd; // Return remaining quantity that couldn't be added
  }

  removeQuantity(quantity: number): number {
    const actualRemove = Math.min(quantity, this.quantity);
    this.quantity -= actualRemove;
    return actualRemove;
  }

  isEmpty(): boolean {
    return this.quantity <= 0;
  }

  clone(): ItemStack {
    return new ItemStack(this.item, this.quantity);
  }
}

/**
 * Inventory - manages player inventory with hotbar and backpack.
 */
export class Inventory {
  hotbarSize: number;
  backpackRows: number;
  backpackCols: number;
  backpackSize: number;
  hotbar: (ItemStack | null)[];
  backpack: (ItemStack | null)[];
  selectedHotbarSlot: number;
  onInventoryChange: InventoryChangeListener | null;
  onHotbarSelectionChange: HotbarSelectionListener | null;
  onItemAdded: ItemAddedListener | null;

  constructor() {
    this.hotbarSize = 9; // Number of hotbar slots
    this.backpackRows = 6; // Number of backpack rows
    this.backpackCols = 9; // Number of backpack columns
    this.backpackSize = this.backpackRows * this.backpackCols;

    // Initialize empty slots
    this.hotbar = new Array(this.hotbarSize).fill(null);
    this.backpack = new Array(this.backpackSize).fill(null);

    // Currently selected hotbar slot
    this.selectedHotbarSlot = 0;

    // Event callbacks
    this.onInventoryChange = null;
    this.onHotbarSelectionChange = null;
    this.onItemAdded = null;
  }

  /**
   * Add item to inventory (tries hotbar first, then backpack).
   */
  addItem(item: Item, quantity = 1): number {
    console.log(`🔍 INVENTORY.addItem DEBUG:`);
    console.log(`  Requesting to add: ${quantity} of ${item.name || item.id}`);
    console.log(`  Current inventory count BEFORE: ${this.getItemCount(item.id)}`);

    let remaining = quantity;
    console.log(`  Starting with remaining: ${remaining}`);

    // First try to add to existing stacks in hotbar
    for (let i = 0; i < this.hotbar.length && remaining > 0; i++) {
      const stack = this.hotbar[i];
      if (stack && stack.canAddItem(item, remaining)) {
        console.log(`  Found existing stack in hotbar slot ${i}: ${stack.quantity} ${stack.item.id}`);
        const beforeAdd = stack.quantity;
        remaining = stack.addQuantity(remaining);
        const afterAdd = stack.quantity;
        console.log(`  Added to hotbar slot ${i}: ${beforeAdd} -> ${afterAdd}, remaining: ${remaining}`);
      }
    }

    // Then try to add to existing stacks in backpack
    for (let i = 0; i < this.backpack.length && remaining > 0; i++) {
      const stack = this.backpack[i];
      if (stack && stack.canAddItem(item, remaining)) {
        console.log(`  Found existing stack in backpack slot ${i}: ${stack.quantity} ${stack.item.id}`);
        const beforeAdd = stack.quantity;
        remaining = stack.addQuantity(remaining);
        const afterAdd = stack.quantity;
        console.log(`  Added to backpack slot ${i}: ${beforeAdd} -> ${afterAdd}, remaining: ${remaining}`);
      }
    }

    // Create new stacks for remaining items
    while (remaining > 0) {
      const stackQuantity = Math.min(remaining, item.stackSize);
      console.log(`  Creating new stack: ${stackQuantity} ${item.id}, remaining: ${remaining}`);
      const newStack = new ItemStack(item, stackQuantity);

      // Try to place in hotbar first
      let placed = false;
      for (let i = 0; i < this.hotbar.length; i++) {
        if (!this.hotbar[i]) {
          this.hotbar[i] = newStack;
          console.log(`  Placed new stack in hotbar slot ${i}: ${stackQuantity} ${item.id}`);
          placed = true;
          break;
        }
      }

      // If hotbar is full, try backpack
      if (!placed) {
        for (let i = 0; i < this.backpack.length; i++) {
          if (!this.backpack[i]) {
            this.backpack[i] = newStack;
            console.log(`  Placed new stack in backpack slot ${i}: ${stackQuantity} ${item.id}`);
            placed = true;
            break;
          }
        }
      }

      if (!placed) {
        // Inventory is full
        console.warn('Inventory full! Could not add item:', item.name);
        break;
      }

      remaining -= stackQuantity;
    }

    const actuallyAdded = quantity - remaining;
    console.log(`  Items actually added: ${actuallyAdded}`);
    console.log(`  Current inventory count AFTER: ${this.getItemCount(item.id)}`);
    console.log(`  Returning: ${actuallyAdded}`);

    // Trigger the onItemAdded callback if items were successfully added
    if (actuallyAdded > 0 && this.onItemAdded) {
      const totalQuantity = this.getItemCount(item.id);
      this.onItemAdded(item, actuallyAdded, totalQuantity);
    }

    this.notifyChange();
    return actuallyAdded; // Return how many items were actually added
  }

  /**
   * Remove item from inventory.
   */
  removeItem(itemId: string, quantity = 1): number {
    let toRemove = quantity;

    // Remove from hotbar first
    for (let i = 0; i < this.hotbar.length && toRemove > 0; i++) {
      const stack = this.hotbar[i];
      if (stack && stack.item.id === itemId) {
        const removed = stack.removeQuantity(toRemove);
        toRemove -= removed;

        if (stack.isEmpty()) {
          this.hotbar[i] = null;
        }
      }
    }

    // Remove from backpack
    for (let i = 0; i < this.backpack.length && toRemove > 0; i++) {
      const stack = this.backpack[i];
      if (stack && stack.item.id === itemId) {
        const removed = stack.removeQuantity(toRemove);
        toRemove -= removed;

        if (stack.isEmpty()) {
          this.backpack[i] = null;
        }
      }
    }

    this.notifyChange();
    return quantity - toRemove; // Return how many items were actually removed
  }

  /**
   * Get currently selected hotbar item.
   */
  getSelectedItem(): ItemStack | null {
    return this.hotbar[this.selectedHotbarSlot];
  }

  /**
   * Select hotbar slot.
   */
  selectHotbarSlot(index: number): void {
    if (index >= 0 && index < this.hotbarSize) {
      this.selectedHotbarSlot = index;
      if (this.onHotbarSelectionChange) {
        this.onHotbarSelectionChange(index, this.getSelectedItem());
      }
    }
  }

  /**
   * Move item between slots.
   */
  moveItem(
    fromContainer: string,
    fromIndex: number,
    toContainer: string,
    toIndex: number
  ): boolean {
    const fromArray = fromContainer === 'hotbar' ? this.hotbar : this.backpack;
    const toArray = toContainer === 'hotbar' ? this.hotbar : this.backpack;

    const fromItem = fromArray[fromIndex];
    const toItem = toArray[toIndex];

    if (!fromItem) return false;

    // If destination is empty, move item
    if (!toItem) {
      toArray[toIndex] = fromItem;
      fromArray[fromIndex] = null;
      this.notifyChange();
      return true;
    }

    // If destination has same item type, try to stack
    if (toItem.canAddItem(fromItem.item, fromItem.quantity)) {
      const remaining = toItem.addQuantity(fromItem.quantity);
      if (remaining === 0) {
        fromArray[fromIndex] = null;
      } else {
        fromItem.quantity = remaining;
      }
      this.notifyChange();
      return true;
    }

    // Otherwise, swap items
    toArray[toIndex] = fromItem;
    fromArray[fromIndex] = toItem;
    this.notifyChange();
    return true;
  }

  /**
   * Get total quantity of specific item.
   */
  getItemCount(itemId: string): number {
    let count = 0;

    // Count in hotbar
    for (const stack of this.hotbar) {
      if (stack && stack.item.id === itemId) {
        count += stack.quantity;
      }
    }

    // Count in backpack
    for (const stack of this.backpack) {
      if (stack && stack.item.id === itemId) {
        count += stack.quantity;
      }
    }

    return count;
  }

  /**
   * Check if inventory has specific item.
   */
  hasItem(itemId: string, quantity = 1): boolean {
    return this.getItemCount(itemId) >= quantity;
  }

  /**
   * Notify listeners of inventory changes.
   */
  notifyChange(): void {
    if (this.onInventoryChange) {
      this.onInventoryChange();
    }
  }

  /**
   * Serialize inventory for saving.
   */
  serialize(): SerializedInventory {
    return {
      hotbar: this.hotbar.map((stack) =>
        stack ? { itemId: stack.item.id, quantity: stack.quantity } : null
      ),
      backpack: this.backpack.map((stack) =>
        stack ? { itemId: stack.item.id, quantity: stack.quantity } : null
      ),
      selectedHotbarSlot: this.selectedHotbarSlot,
    };
  }

  /**
   * Deserialize inventory from saved data.
   */
  deserialize(data: SerializedInventory, itemRegistry: Record<string, Item>): void {
    // Clear current inventory
    this.hotbar.fill(null);
    this.backpack.fill(null);

    // Restore hotbar
    if (data.hotbar) {
      for (let i = 0; i < data.hotbar.length; i++) {
        const stackData = data.hotbar[i];
        if (stackData && itemRegistry[stackData.itemId]) {
          this.hotbar[i] = new ItemStack(itemRegistry[stackData.itemId], stackData.quantity);
        }
      }
    }

    // Restore backpack
    if (data.backpack) {
      for (let i = 0; i < data.backpack.length; i++) {
        const stackData = data.backpack[i];
        if (stackData && itemRegistry[stackData.itemId]) {
          this.backpack[i] = new ItemStack(itemRegistry[stackData.itemId], stackData.quantity);
        }
      }
    }

    // Restore selected slot
    if (data.selectedHotbarSlot !== undefined) {
      this.selectedHotbarSlot = data.selectedHotbarSlot;
    }

    this.notifyChange();
  }
}
