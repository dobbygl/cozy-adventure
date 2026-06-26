export class BuildingResourceManager {
  constructor(buildableObjects, inventory = null) {
    this.buildableObjects = buildableObjects;
    this.inventory = inventory;
    this.itemRegistry = null;
  }

  // Method to set inventory reference
  setInventory(inventory) {
    this.inventory = inventory;
  }

  // Method to set item registry reference for resource returns
  setItemRegistry(itemRegistry) {
    this.itemRegistry = itemRegistry;
  }

  hasRequiredResources(selectedBuildObject) {
    if (!this.inventory) return true; // If no inventory system, allow building

    const currentBuildObject = this.buildableObjects[selectedBuildObject];
    const requiredCost = currentBuildObject ? currentBuildObject.cost : { wood: 10 };

    return this.inventory.hasItem('wood', requiredCost.wood);
  }

  consumeResources(selectedBuildObject) {
    if (!this.inventory) return;

    const currentBuildObject = this.buildableObjects[selectedBuildObject];
    const requiredCost = currentBuildObject ? currentBuildObject.cost : { wood: 10 };

    this.inventory.removeItem('wood', requiredCost.wood);
    console.log(`Consumed ${requiredCost.wood} wood to build ${currentBuildObject.name}`);
  }

  returnResources(wall) {
    if (!this.inventory || !wall.userData.isBuildingWall) return;

    // Default to regular wall for resource return
    const buildObject = this.buildableObjects['wall'];
    if (!buildObject) return;

    // Calculate half of the original cost (always round down)
    const originalCost = buildObject.cost.wood;
    const returnAmount = Math.floor(originalCost / 2);

    console.log(`🔍 RESOURCE RETURN DEBUG:`);
    console.log(`  Build object:`, buildObject);
    console.log(`  Original cost: ${originalCost} wood`);
    console.log(`  Calculated return amount: ${returnAmount} wood (half of ${originalCost})`);
    console.log(`  Current wood in inventory BEFORE: ${this.inventory.getItemCount('wood')}`);

    if (returnAmount > 0) {
      // Create a simple wood item directly since itemRegistry might not be working
      const woodItem = { id: 'wood', name: 'Wood', type: 'material', stackSize: 64 };

      console.log(`  About to add ${returnAmount} wood to inventory...`);

      // CRITICAL FIX: Only add the calculated return amount, not the original cost
      const actualAmountAdded = this.inventory.addItem(woodItem, returnAmount);

      console.log(`  Inventory.addItem returned: ${actualAmountAdded}`);
      console.log(`  Current wood in inventory AFTER: ${this.inventory.getItemCount('wood')}`);

      return {
        success: actualAmountAdded === returnAmount,
        amountAdded: actualAmountAdded,
        expectedAmount: returnAmount,
        originalCost: originalCost
      };
    } else {
      console.log(`No resources returned for breaking ${buildObject.name} (original cost was ${originalCost}, half rounds to 0)`);
      return {
        success: true,
        amountAdded: 0,
        expectedAmount: 0,
        originalCost: originalCost
      };
    }
  }

  showResourceWarning(mouse, camera) {
    // Show cursor-following red text warning
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

    // Position at cursor with offset
    this.updateCursorWarningPosition(mouse, camera, warningElement);
  }

  hideResourceWarning() {
    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.style.display = 'none';
    }
  }

  updateCursorWarningPosition(mouse, camera, warningElement = null) {
    const element = warningElement || document.getElementById('resourceWarning');
    if (!element || element.style.display === 'none') return;

    // Get current mouse position and add offset so text doesn't block cursor
    const rect = camera.domElement?.getBoundingClientRect() || { left: 0, top: 0 };
    const mouseX = ((mouse.x + 1) / 2) * window.innerWidth;
    const mouseY = ((-mouse.y + 1) / 2) * window.innerHeight;

    element.style.left = (mouseX + 15) + 'px'; // 15px offset to right
    element.style.top = (mouseY - 25) + 'px';  // 25px offset above
  }
}