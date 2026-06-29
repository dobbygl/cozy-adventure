import type * as THREE from 'three';
import type {
  CompanionUiPort,
  DeliveredItem,
  DroppedItemsPort,
  InventoryPort,
} from './ports.js';

/**
 * Concrete companion ports backed by the `window.gameInstance` global + the DOM.
 * This is the single place the companion's fetch/delivery touches the global and
 * builds popup elements; the rest of companion/ talks only to the port
 * interfaces. The game is read through a getter on every call, preserving the
 * late-binding the old per-frame `window.gameInstance` lookups had.
 *
 * TODO(phase 7): build these from injected game systems instead of the global.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Game = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetGame = () => any;

export function inventoryPort(getGame: GetGame): InventoryPort {
  return {
    getItem(itemId) {
      return getGame()?.itemRegistry?.[itemId];
    },
    addItem(item, quantity) {
      const game: Game = getGame();
      if (!game?.inventory) return 0;
      return game.inventory.addItem(item, quantity);
    },
    getSelectedItem() {
      return getGame()?.inventory?.getSelectedItem?.() ?? null;
    },
    notifyChange() {
      getGame()?.inventory?.onInventoryChange?.();
    },
  };
}

export function companionUiPort(getGame: GetGame): CompanionUiPort {
  return {
    refreshInventory() {
      forceInventoryUIUpdate(getGame());
    },
    showDeliveryPopup(delivered, total) {
      showDeliveryPopup(getGame(), delivered, total);
    },
    refreshHeldItem() {
      const game: Game = getGame();
      // Update player held item (delayed, matching the original timing hack)
      setTimeout(() => {
        if (game?.player && game?.inventory) {
          const selectedItem = game.inventory.getSelectedItem();
          game.player.updateHeldItem(selectedItem);
        }
      }, 100);
    },
    cleanupWorldPickupPrompts(itemId) {
      const game: Game = getGame();
      if (game?.inventoryUI && itemId) {
        game.inventoryUI.cleanupWorldPickupPrompts(itemId);
      }
    },
  };
}

export function droppedItemsPort(getGame: GetGame, scene: THREE.Scene): DroppedItemsPort {
  return {
    remove(itemToRemove) {
      if (!itemToRemove) return;
      const game: Game = getGame();

      console.log('Dog is picking up item - removing item from world');

      // Trigger pickup UI fade-out BEFORE removing the item
      if (game?.inventoryUI && itemToRemove.userData.itemId) {
        game.inventoryUI.cleanupWorldPickupPrompts(itemToRemove.userData.itemId);
      }

      // Remove item from scene
      scene.remove(itemToRemove);

      // Remove from game's pickupable items array
      if (game?.pickupableItems) {
        const index = game.pickupableItems.indexOf(itemToRemove);
        if (index !== -1) {
          game.pickupableItems.splice(index, 1);
          console.log('Dog removed item from ground:', itemToRemove.userData.itemId);
        }
      }

      // Remove from item drop system's tracking array
      if (game?.itemDropSystem) {
        const dropSystemIndex = game.itemDropSystem.droppedItems.indexOf(itemToRemove);
        if (dropSystemIndex !== -1) {
          game.itemDropSystem.droppedItems.splice(dropSystemIndex, 1);
        }
      }
    },
  };
}

// --- UI glue (DOM + inventoryUI), lifted verbatim from DogCompanion ----------

function forceInventoryUIUpdate(game: Game): void {
  if (!game?.inventoryUI) return;

  console.log('🔄 Forcing comprehensive inventory UI update');

  try {
    // Update all UI components
    if (game.inventoryUI.updateUI) {
      game.inventoryUI.updateUI();
    }
    if (game.inventoryUI.updateHotbar) {
      game.inventoryUI.updateHotbar();
    }
    if (game.inventoryUI.updateBackpack) {
      game.inventoryUI.updateBackpack();
    }

    // Force recreation of hotbar if possible
    if (game.inventoryUI.createHotbar && game.inventoryUI.hotbarContainer) {
      game.inventoryUI.hotbarContainer.innerHTML = '';
      game.inventoryUI.createHotbar();
    }

    console.log('✅ Inventory UI update completed');
  } catch (error) {
    console.warn('⚠️ Inventory UI update error:', error);
  }

  // Delayed updates for reliability
  setTimeout(() => {
    try {
      if (game.inventoryUI.updateUI) {
        game.inventoryUI.updateUI();
      }
      if (game.inventory.onInventoryChange) {
        game.inventory.onInventoryChange();
      }
    } catch (error) {
      console.warn('⚠️ Delayed inventory update error:', error);
    }
  }, 50);
}

function showDeliveryPopup(game: Game, deliveredItems: DeliveredItem[], totalDelivered: number): void {
  if (!game?.inventoryUI) {
    console.warn('No inventory UI available for delivery popup');
    return;
  }

  // Group items by type for cleaner display
  const itemSummary: Record<string, DeliveredItem> = {};
  deliveredItems.forEach(({ item, quantity }) => {
    if (itemSummary[item.id]) {
      itemSummary[item.id].quantity += quantity;
    } else {
      itemSummary[item.id] = { item, quantity };
    }
  });

  // Show popup for each unique item type delivered
  const summaryEntries = Object.values(itemSummary);

  if (summaryEntries.length === 1) {
    // Single item type - show as dog delivery
    const { item, quantity } = summaryEntries[0];
    showDogDeliveryPopup(game, item, quantity);
  } else {
    // Multiple item types - show summary
    showMultiItemDeliveryPopup(game, summaryEntries, totalDelivered);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showDogDeliveryPopup(game: Game, item: any, quantity: number): void {
  if (!game?.inventoryUI) return;

  // Create a custom popup element similar to pickup popup
  const popup = document.createElement('div');
  popup.className = 'pickup-popup';
  popup.style.background = 'linear-gradient(145deg, #90EE90, #98FB98)';
  popup.style.borderColor = '#32CD32';

  // Get item icon
  const iconInfo = game.inventoryUI.getItemIcon(item);

  // Create popup content with dog emoji
  popup.innerHTML = `
      <div class="item-icon" style="background-color: ${iconInfo.color};">
        ${iconInfo.icon}
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>${item.name}
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${quantity > 1 ? `${quantity} items` : '1 item'}
        </div>
      </div>
    `;

  // Add to document
  document.body.appendChild(popup);

  // Remove popup after animation
  setTimeout(() => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }, 3000);
}

function showMultiItemDeliveryPopup(
  game: Game,
  summaryEntries: DeliveredItem[],
  totalDelivered: number,
): void {
  if (!game?.inventoryUI) return;

  // Create a custom popup for multiple items
  const popup = document.createElement('div');
  popup.className = 'pickup-popup';
  popup.style.background = 'linear-gradient(145deg, #90EE90, #98FB98)';
  popup.style.borderColor = '#32CD32';
  popup.style.width = 'auto';
  popup.style.minWidth = '200px';

  // Create content with multiple item summary
  let itemIcons = '';
  const maxShow = 3;
  for (let i = 0; i < Math.min(summaryEntries.length, maxShow); i++) {
    const { item } = summaryEntries[i];
    const iconInfo = game.inventoryUI.getItemIcon(item);
    itemIcons += `<div class="item-icon" style="background-color: ${iconInfo.color}; width: 32px; height: 32px; font-size: 16px; margin: 2px;">${iconInfo.icon}</div>`;
  }

  if (summaryEntries.length > maxShow) {
    itemIcons += `<div style="color: #8B4513; font-size: 12px; font-weight: bold;">+${summaryEntries.length - maxShow} more</div>`;
  }

  popup.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2px;">
          ${itemIcons}
        </div>
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">🐕</span>Multiple Items
        </div>
        <div class="pickup-item-quantity">
          Dog delivered ${totalDelivered} items
        </div>
      </div>
    `;

  // Add to document
  document.body.appendChild(popup);

  // Remove popup after animation
  setTimeout(() => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }, 3000);
}
