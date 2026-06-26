export class ItemUseSystem {
  constructor(inventory, healthSystem) {
    this.inventory = inventory;
    this.healthSystem = healthSystem;
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Listen for right-click to use items
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // Prevent context menu
      this.useSelectedItem();
    });
    
    console.log('Item use system initialized with right-click support');
  }
  
  useSelectedItem() {
    const selectedItem = this.inventory.getSelectedItem();
    
    if (!selectedItem || !selectedItem.item) {
      console.log('No item selected to use');
      return false;
    }
    
    const item = selectedItem.item;
    
    // Handle different item types
    switch (item.type) {
      case 'consumable':
        return this.useConsumableItem(item, selectedItem);
      
      case 'tool':
      case 'weapon':
        console.log(`${item.name} is equipped and ready to use`);
        return false; // Tools/weapons don't get consumed
      
      default:
        console.log(`${item.name} cannot be used`);
        return false;
    }
  }
  
  useConsumableItem(item, itemStack) {
    switch (item.id) {
      case 'apple':
        return this.eatApple(itemStack);
      
      case 'potion':
        return this.drinkPotion(itemStack);
      
      default:
        console.log(`Don't know how to use ${item.name}`);
        return false;
    }
  }
  
  eatApple(itemStack) {
    // Check if player needs healing
    if (this.healthSystem.isFullHealth()) {
      console.log('Health is already full!');
      return false;
    }
    
    // Heal the player
    const healedAmount = this.healthSystem.heal(1);
    
    if (healedAmount > 0) {
      // Remove one apple from inventory
      this.inventory.removeItem(itemStack.item.id, 1);
      console.log('Ate an apple and restored 1 heart!');
      
      // Show eating message
      this.showUseMessage('🍎 Ate apple (+1 heart)', '#4CAF50');
      
      return true;
    }
    
    return false;
  }
  
  drinkPotion(itemStack) {
    // Heal more than apple
    const healedAmount = this.healthSystem.heal(2);
    
    if (healedAmount > 0) {
      this.inventory.removeItem(itemStack.item.id, 1);
      console.log('Drank a potion and restored health!');
      
      this.showUseMessage('🧪 Drank potion (+2 hearts)', '#9C27B0');
      return true;
    }
    
    return false;
  }
  
  showUseMessage(message, color = '#4CAF50') {
    // Create temporary message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: ${color};
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      z-index: 1000;
      pointer-events: none;
      backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(messageElement);
    
    // Animate and remove
    setTimeout(() => {
      messageElement.style.transition = 'opacity 0.5s ease-out';
      messageElement.style.opacity = '0';
      
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.parentNode.removeChild(messageElement);
        }
      }, 500);
    }, 1000);
  }
}