import * as THREE from 'three';
import type { Inventory, Item } from './inventory.js';

/** Minimal shape of a buildable definition needed for resource accounting. */
export interface BuildCostObject {
  name: string;
  cost: { wood: number };
}

export class ResourceSystem {
  inventory: Inventory | null;

  constructor(inventory: Inventory | null = null) {
    this.inventory = inventory;
  }

  setInventory(inventory: Inventory | null): void {
    this.inventory = inventory;
  }

  hasRequiredResources(buildObject: BuildCostObject | null): boolean {
    if (!this.inventory || !buildObject) return true;
    return this.inventory.hasItem('wood', buildObject.cost.wood);
  }

  consumeResources(buildObject: BuildCostObject | null): void {
    if (!this.inventory || !buildObject) return;
    this.inventory.removeItem('wood', buildObject.cost.wood);
    console.log(`Consumed ${buildObject.cost.wood} wood to build ${buildObject.name}`);
  }

  returnResources(buildObject: BuildCostObject | null, wallPosition: THREE.Vector3): void {
    if (!this.inventory || !buildObject) return;

    const originalCost = buildObject.cost.wood;
    const returnAmount = Math.floor(originalCost / 2);

    if (returnAmount > 0) {
      // Loose item-like literal; cast to Item since only id/name/stackSize are read downstream.
      const woodItem = { id: 'wood', name: 'Wood', type: 'material', stackSize: 64 } as Item;
      const actualAmountAdded = this.inventory.addItem(woodItem, returnAmount);

      if (actualAmountAdded > 0) {
        this.showFloatingText(`+${actualAmountAdded} Wood`, wallPosition, '#4CAF50');
      }
    }
  }

  showResourceWarning(mouse: THREE.Vector2, _camera?: THREE.Camera): void {
    let warningElement = document.getElementById('resourceWarning');
    if (!warningElement) {
      warningElement = document.createElement('div');
      warningElement.id = 'resourceWarning';
      warningElement.style.cssText = `
        position: fixed;
        color: #ff4444;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: bold;
        z-index: 3000;
        pointer-events: none;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        white-space: nowrap;
      `;
      document.body.appendChild(warningElement);
    }

    warningElement.textContent = 'Not enough resources';
    warningElement.style.display = 'block';
    this.updateWarningPosition(mouse);
  }

  hideResourceWarning(): void {
    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.style.display = 'none';
    }
  }

  updateWarningPosition(mouse: THREE.Vector2): void {
    const warningElement = document.getElementById('resourceWarning');
    if (!warningElement || warningElement.style.display === 'none') return;

    const mouseX = ((mouse.x + 1) / 2) * window.innerWidth;
    const mouseY = ((-mouse.y + 1) / 2) * window.innerHeight;

    warningElement.style.left = mouseX + 15 + 'px';
    warningElement.style.top = mouseY - 25 + 'px';
  }

  showFloatingText(text: string, worldPosition: THREE.Vector3, _color = '#fff'): void {
    // Simple floating text implementation
    console.log(`Resource notification: ${text} at position`, worldPosition);
  }
}
