import * as THREE from 'three';

export class ResourceSystem {
  constructor(inventory = null) {
    this.inventory = inventory;
  }

  setInventory(inventory) {
    this.inventory = inventory;
  }

  hasRequiredResources(buildObject) {
    if (!this.inventory || !buildObject) return true;
    return this.inventory.hasItem('wood', buildObject.cost.wood);
  }

  consumeResources(buildObject) {
    if (!this.inventory || !buildObject) return;
    this.inventory.removeItem('wood', buildObject.cost.wood);
    console.log(`Consumed ${buildObject.cost.wood} wood to build ${buildObject.name}`);
  }

  returnResources(buildObject, wallPosition) {
    if (!this.inventory || !buildObject) return;
    
    const originalCost = buildObject.cost.wood;
    const returnAmount = Math.floor(originalCost / 2);
    
    if (returnAmount > 0) {
      const woodItem = { id: 'wood', name: 'Wood', type: 'material', stackSize: 64 };
      const actualAmountAdded = this.inventory.addItem(woodItem, returnAmount);
      
      if (actualAmountAdded > 0) {
        this.showFloatingText(`+${actualAmountAdded} Wood`, wallPosition, '#4CAF50');
      }
    }
  }

  showResourceWarning(mouse, camera) {
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

  hideResourceWarning() {
    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.style.display = 'none';
    }
  }

  updateWarningPosition(mouse) {
    const warningElement = document.getElementById('resourceWarning');
    if (!warningElement || warningElement.style.display === 'none') return;
    
    const mouseX = ((mouse.x + 1) / 2) * window.innerWidth;
    const mouseY = ((-mouse.y + 1) / 2) * window.innerHeight;
    
    warningElement.style.left = (mouseX + 15) + 'px';
    warningElement.style.top = (mouseY - 25) + 'px';
  }

  showFloatingText(text, worldPosition, color = '#fff') {
    // Simple floating text implementation
    console.log(`Resource notification: ${text} at position`, worldPosition);
  }
}