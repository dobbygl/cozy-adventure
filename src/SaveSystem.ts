import * as THREE from 'three';
import { ItemStack } from './inventory.js';
import { DEFAULT_WORLD_SEED } from './shared/rng';

/** Stored save categories keyed by their string id. */
interface SaveCategories {
  PLAYER: string;
  INVENTORY: string;
  ENVIRONMENT: string;
  BUILDINGS: string;
  WORLD_STATE: string;
}

export class SaveSystem {
  /** The orchestrating Game (still untyped JS, Ola 6); accessed loosely as `any`. */
  gameInstance: any;
  saveSlots: number;
  currentSaveSlot: number;
  maxCookieSize: number;
  saveCategories: SaveCategories;
  /** Interval handle for auto-save; set by enableAutoSave(). */
  autoSaveInterval?: ReturnType<typeof setInterval> | null;

  constructor(gameInstance: any) {
    this.gameInstance = gameInstance;
    this.saveSlots = 1; // Number of save slots available
    this.currentSaveSlot = 0;
    this.maxCookieSize = 3500; // Conservative cookie size limit to account for encoding overhead
    
    // Data categories for organized saving
    this.saveCategories = {
      PLAYER: 'player',
      INVENTORY: 'inventory', 
      ENVIRONMENT: 'environment',
      BUILDINGS: 'buildings',
      WORLD_STATE: 'worldState'
    };
  }

  // Main save function
  saveGame(slotNumber = this.currentSaveSlot) {
    try {
      console.log(`Saving game to slot ${slotNumber}...`);
      
      const saveData = this.collectGameData();
      const serializedData = JSON.stringify(saveData);
      console.log(`Save data size: ${serializedData.length} bytes`);
      
      // Check if data fits in single cookie (account for URL encoding overhead)
      const encodedSize = encodeURIComponent(serializedData).length;
      console.log(`Encoded save data size: ${encodedSize} bytes`);
      
      if (encodedSize > this.maxCookieSize) {
        console.log('Save data too large for single cookie, using chunked storage');
        this.saveDataInChunks(slotNumber, serializedData);
      } else {
        console.log('Save data fits in single cookie');
        this.setCookie(`cozyAdventure_save_${slotNumber}`, serializedData, 30);
      }
      
      // Save metadata
      this.saveMetadata(slotNumber);
      
      console.log(`Game saved successfully to slot ${slotNumber}`);
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  }

  // Collect all game data for saving
  collectGameData() {
    const gameData: {
      version: string;
      timestamp: number;
      categories: Record<string, any>;
    } = {
      version: '1.0.0',
      timestamp: Date.now(),
      categories: {}
    };

    // Save player data
    if (this.gameInstance.player && this.gameInstance.player.mesh) {
      gameData.categories[this.saveCategories.PLAYER] = {
        position: {
          x: this.gameInstance.player.mesh.position.x,
          y: this.gameInstance.player.mesh.position.y,
          z: this.gameInstance.player.mesh.position.z
        },
        rotation: {
          x: this.gameInstance.player.mesh.rotation.x,
          y: this.gameInstance.player.mesh.rotation.y,
          z: this.gameInstance.player.mesh.rotation.z
        },
        health: {
          current: this.gameInstance.healthSystem?.currentHealth || 5,
          max: this.gameInstance.healthSystem?.maxHealth || 5
        }
      };
    }

    // Save inventory data
    if (this.gameInstance.inventory) {
      gameData.categories[this.saveCategories.INVENTORY] = this.serializeInventory();
    }

    // Save environment data (trees, rocks, etc.)
    if (this.gameInstance.environment) {
      gameData.categories[this.saveCategories.ENVIRONMENT] = {
        trees: this.serializeTrees(),
        rocks: this.serializeRocks(),
        pickupableItems: this.serializePickupableItems(),
        droppedItems: this.serializeDroppedItems()
      };
    }

    // Save building data
    if (this.gameInstance.buildingSystem) {
      gameData.categories[this.saveCategories.BUILDINGS] = {
        structures: this.serializeBuildings()
      };
    }

    // Save world state
    gameData.categories[this.saveCategories.WORLD_STATE] = {
      seed: this.gameInstance.environment?.seed, // world seed: regenerates the same island on load
      dayTime: Date.now() % 86400000, // Time of day in milliseconds
      weather: 'clear', // Future weather system
      gameTime: Date.now() - (this.gameInstance.gameStartTime || Date.now())
    };

    return gameData;
  }

  // Serialize inventory for saving
  serializeInventory() {
    const inventory = this.gameInstance.inventory;
    const serializedBackpack: Record<number, any> = {};
    
    // Check if inventory exists before serializing
    if (!inventory) {
      console.warn('Inventory not found during serialization');
      return {
        backpack: {},
        hotbar: {}
      };
    }
    
    // Serialize backpack slots (the actual inventory uses 'backpack', not 'slots')
    if (inventory.backpack && Array.isArray(inventory.backpack)) {
      for (let i = 0; i < inventory.backpack.length; i++) {
        const stack = inventory.backpack[i];
        if (stack && stack.item) {
          serializedBackpack[i] = {
            itemId: stack.item.id,
            quantity: stack.quantity
          };
        }
      }
    } else {
      console.info('No inventory backpack found or backpack is empty - this is normal for a new game');
    }
    
    // Serialize hotbar slots (the actual inventory uses 'hotbar', not 'hotbarSlots')
    const serializedHotbar: Record<number, any> = {};
    if (inventory.hotbar && Array.isArray(inventory.hotbar)) {
      for (let i = 0; i < inventory.hotbar.length; i++) {
        const stack = inventory.hotbar[i];
        if (stack && stack.item) {
          serializedHotbar[i] = {
            itemId: stack.item.id,
            quantity: stack.quantity
          };
        }
      }
    } else {
      console.info('No inventory hotbar found or hotbar is empty - this is normal for a new game');
    }
    
    return {
      backpack: serializedBackpack,
      hotbar: serializedHotbar,
      selectedSlot: inventory.selectedHotbarSlot
    };
  }

  // Serialize trees for saving
  serializeTrees() {
    const trees: any[] = [];

    if (this.gameInstance.environment && this.gameInstance.environment.trees) {
      this.gameInstance.environment.trees.forEach((tree: any, index: number) => {
        if (tree && tree.position) {
          trees.push({
            id: index,
            position: {
              x: tree.position.x,
              y: tree.position.y,
              z: tree.position.z
            },
            rotation: {
              x: tree.rotation.x,
              y: tree.rotation.y,
              z: tree.rotation.z
            },
            scale: {
              x: tree.scale.x,
              y: tree.scale.y,
              z: tree.scale.z
            },
            type: tree.userData?.treeType || 'generic',
            health: tree.userData?.health || 100,
            isChopped: tree.userData?.isChopped || false
          });
        }
      });
    }
    
    return trees;
  }

  // Serialize rocks and environmental objects
  serializeRocks() {
    const rocks: any[] = [];

    if (this.gameInstance.environment && this.gameInstance.environment.rocks) {
      this.gameInstance.environment.rocks.forEach((rock: any, index: number) => {
        if (rock && rock.position) {
          rocks.push({
            id: index,
            position: {
              x: rock.position.x,
              y: rock.position.y,
              z: rock.position.z
            },
            rotation: {
              x: rock.rotation.x,
              y: rock.rotation.y,
              z: rock.rotation.z
            },
            scale: {
              x: rock.scale.x,
              y: rock.scale.y,
              z: rock.scale.z
            },
            type: rock.userData?.rockType || 'generic'
          });
        }
      });
    }
    
    return rocks;
  }

  // Serialize pickupable items
  serializePickupableItems() {
    const items: any[] = [];
    
    if (this.gameInstance.pickupableItems) {
      this.gameInstance.pickupableItems.forEach((item: any, index: number) => {
        // Skip items that have been marked as removed or picked up
        if (item && item.position && item.userData && !item.userData.isRemoved) {
          // Double-check item still exists in scene
          if (item.parent && this.gameInstance.scene.children.includes(item)) {
            items.push({
              id: index,
              itemId: item.userData.itemId,
              quantity: item.userData.quantity || 1,
              position: {
                x: item.position.x,
                y: item.position.y,
                z: item.position.z
              },
              rotation: {
                x: item.rotation.x,
                y: item.rotation.y,
                z: item.rotation.z
              }
            });
          } else {
            console.log(`Skipping pickupable item ${item.userData.itemId} - not in scene anymore`);
          }
        } else if (item && item.userData && item.userData.isRemoved) {
          console.log(`Skipping removed pickupable item ${item.userData.itemId} from serialization`);
        }
      });
    }
    
    console.log(`Serialized ${items.length} pickupable items (filtered out removed items)`);
    return items;
  }
  // Serialize dropped items from ItemDropSystem
  serializeDroppedItems() {
    const items: any[] = [];
    
    if (this.gameInstance.itemDropSystem && this.gameInstance.itemDropSystem.droppedItems) {
      this.gameInstance.itemDropSystem.droppedItems.forEach((item: any, index: number) => {
        // Skip items that have been marked as removed or picked up
        if (item && item.position && item.userData && !item.userData.isRemoved) {
          // Double-check item still exists in scene
          if (item.parent && this.gameInstance.scene.children.includes(item)) {
            items.push({
              id: index,
              itemId: item.userData.itemId,
              quantity: item.userData.quantity || 1,
              position: {
                x: item.position.x,
                y: item.position.y,
                z: item.position.z
              },
              rotation: {
                x: item.rotation.x,
                y: item.rotation.y,
                z: item.rotation.z
              },
              userData: {
                bobOffset: item.userData.bobOffset,
                initialY: item.userData.initialY,
                dropTime: item.userData.dropTime,
                isPhysicsItem: item.userData.isPhysicsItem,
                hasLanded: item.userData.hasLanded,
                groundY: item.userData.groundY
              }
            });
          } else {
            console.log(`Skipping item ${item.userData.itemId} - not in scene anymore`);
          }
        } else if (item && item.userData && item.userData.isRemoved) {
          console.log(`Skipping removed item ${item.userData.itemId} from serialization`);
        }
      });
    }
    
    console.log(`Serialized ${items.length} dropped items (filtered out removed items)`);
    return items;
  }

  // Serialize building structures
  serializeBuildings() {
    if (!this.gameInstance.buildingSystem) {
      console.log('No building system found during serialization');
      return [];
    }
    
    const levelManager = this.gameInstance.levelManager;
    
    // Use the save manager to get all building types
    if (this.gameInstance.buildingSystem.saveManager && 
        this.gameInstance.buildingSystem.saveManager.getAllBuiltObjectsForSaving) {
      const allBuiltObjects = this.gameInstance.buildingSystem.saveManager.getAllBuiltObjectsForSaving();
      console.log(`Serializing ${allBuiltObjects.length} buildings of all types...`);
      
      // Add level information to each building
      allBuiltObjects.forEach((building: any, index: number) => {
        // Calculate building level based on Y position if level manager exists
        if (levelManager && typeof building.position.y === 'number') {
          building.level = this.calculateBuildingLevel(building.position.y, levelManager);
          console.log(`Serialized building ${index}: ${building.type} at level ${building.level} (Y=${building.position.y.toFixed(1)})`);
        } else {
          building.level = 0; // Default to ground level
          console.log(`Serialized building ${index}: ${building.type} at position (${building.position.x.toFixed(1)}, ${building.position.y.toFixed(1)}, ${building.position.z.toFixed(1)}) - level defaulted to 0`);
        }
      });
      
      console.log(`Total buildings serialized: ${allBuiltObjects.length}`);
      return allBuiltObjects;
    }
    
    // Fallback to legacy method for backward compatibility
    const buildings: any[] = [];

    if (this.gameInstance.buildingSystem.builtWalls) {
      console.log(`Falling back to legacy serialization method for ${this.gameInstance.buildingSystem.builtWalls.length} buildings...`);
      
      this.gameInstance.buildingSystem.builtWalls.forEach((building: any, index: number) => {
        if (building && building.position) {
          const buildingData: any = {
            id: index,
            type: building.userData?.buildingType || building.userData?.type || 'wall',
            subType: building.userData?.subType || null,
            position: {
              x: building.position.x,
              y: building.position.y,
              z: building.position.z
            },
            rotation: {
              x: building.rotation.x,
              y: building.rotation.y,
              z: building.rotation.z
            },
            scale: {
              x: building.scale.x,
              y: building.scale.y,
              z: building.scale.z
            },
            material: building.material?.name || 'default',
            uuid: building.uuid || null,
            visible: building.visible !== false,
            // Add level information
            level: levelManager ? this.calculateBuildingLevel(building.position.y, levelManager) : 0
          };
          
          // Store additional building-specific data
          if (building.userData) {
            buildingData.userData = {
              ...building.userData
            };
          }
          
          buildings.push(buildingData);
          console.log(`Serialized building ${index}: ${buildingData.type} at level ${buildingData.level} (Y=${buildingData.position.y.toFixed(1)})`);
        }
      });
    } else {
      console.log('No building system or placed objects found during serialization');
    }
    
    console.log(`Total buildings serialized: ${buildings.length}`);
    return buildings;
  }

  // Save data in chunks if too large for single cookie
  saveDataInChunks(slotNumber: number, data: string) {
    // Calculate safe chunk size accounting for encoding overhead and cookie name
    const cookieNameOverhead = `cozyAdventure_save_${slotNumber}_chunk_999`.length + 10; // Extra safety margin
    const safeChunkSize = Math.floor(this.maxCookieSize * 0.75); // 75% of max size for safety
    const chunks = [];
    
    console.log(`Chunking data of ${data.length} bytes into chunks of max ${safeChunkSize} bytes`);
    
    for (let i = 0; i < data.length; i += safeChunkSize) {
      chunks.push(data.slice(i, i + safeChunkSize));
    }
    
    console.log(`Created ${chunks.length} chunks`);
    
    // Save each chunk with verification
    let savedChunks = 0;
    chunks.forEach((chunk, index) => {
      const chunkName = `cozyAdventure_save_${slotNumber}_chunk_${index}`;
      const encodedChunkSize = encodeURIComponent(chunk).length;
      
      if (encodedChunkSize > this.maxCookieSize) {
        console.error(`Chunk ${index} is still too large: ${encodedChunkSize} bytes`);
        // Force use localStorage for this chunk
        this.setLocalStorage(chunkName, chunk, 30);
      } else {
        this.setCookie(chunkName, chunk, 30);
      }
      savedChunks++;
    });
    
    // Save chunk metadata
    this.setCookie(`cozyAdventure_save_${slotNumber}_chunks`, chunks.length.toString(), 30);
    console.log(`Successfully saved ${savedChunks} chunks for slot ${slotNumber}`);
  }

  // Save metadata about the save file
  saveMetadata(slotNumber: number) {
    const metadata = {
      slotNumber: slotNumber,
      timestamp: Date.now(),
      playerLevel: 1, // Future leveling system
      playTime: Date.now() - (this.gameInstance.gameStartTime || Date.now()),
      location: 'Starting Area', // Future location system
      version: '1.0.0'
    };
    
    this.setCookie(`cozyAdventure_meta_${slotNumber}`, JSON.stringify(metadata), 30);
  }

  // Load game from specified slot
  async loadGame(slotNumber: number = this.currentSaveSlot): Promise<boolean> {
    try {
      console.log(`Loading game from slot ${slotNumber}...`);
      
      const saveData = this.loadGameData(slotNumber);
      if (!saveData) {
        console.log(`No save data found in slot ${slotNumber}`);
        return false;
      }
      
      // Ensure game is started before loading. Pass the saved world seed so the
      // environment regenerates the exact island this save was made on. Old saves
      // without a seed fall back to the fixed default (their original island).
      if (!this.gameInstance.isGameStarted) {
        const savedSeed = saveData?.categories?.[this.saveCategories.WORLD_STATE]?.seed ?? DEFAULT_WORLD_SEED;
        await this.gameInstance.startGame(savedSeed);
        // Wait a moment for game to fully initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      await this.restoreGameData(saveData);
      
      console.log(`Game loaded successfully from slot ${slotNumber}`);
      return true;
    } catch (error) {
      console.error('Failed to load game:', error);
      return false;
    }
  }

  // Load game data from cookies
  loadGameData(slotNumber: number) {
    try {
      // Check if data is chunked
      const chunkCount = this.getCookie(`cozyAdventure_save_${slotNumber}_chunks`);
      
      let rawData = '';
      
      if (chunkCount) {
        // Load chunked data
        console.log(`Loading chunked save data: ${chunkCount} chunks`);
        for (let i = 0; i < parseInt(chunkCount); i++) {
          const chunk = this.getCookie(`cozyAdventure_save_${slotNumber}_chunk_${i}`);
          if (chunk) {
            rawData += chunk;
          } else {
            throw new Error(`Missing chunk ${i} for save slot ${slotNumber}`);
          }
        }
      } else {
        // Load single cookie data
        const saveData = this.getCookie(`cozyAdventure_save_${slotNumber}`);
        if (!saveData) {
          return null;
        }
        rawData = saveData;
      }
      
      // Validate the raw data before parsing
      if (!rawData || typeof rawData !== 'string') {
        throw new Error('Save data is empty or not a string');
      }
      
      // Check for common JSON corruption patterns
      if (rawData.includes('e+') || rawData.includes('E+')) {
        console.warn('Detected potential scientific notation in save data, attempting to fix...');
        rawData = this.fixScientificNotation(rawData);
      }
      
      // Attempt to parse JSON with error handling
      try {
        return JSON.parse(rawData);
      } catch (parseError: any) {
        console.error('JSON parse error details:', {
          error: parseError.message,
          dataLength: rawData.length,
          dataPreview: rawData.substring(0, 100),
          errorPosition: parseError.message.match(/at line \d+ column (\d+)/)?.[1]
        });
        
        // Try to fix common JSON issues
        const fixedData = this.attemptJSONFix(rawData);
        if (fixedData !== rawData) {
          console.log('Attempting to parse fixed JSON data...');
          return JSON.parse(fixedData);
        }
        
        throw parseError;
      }
    } catch (error) {
      console.error(`Failed to load save data from slot ${slotNumber}:`, error);
      
      // Try to recover by deleting corrupted save
      console.log('Attempting to clean up corrupted save data...');
      this.deleteSave(slotNumber);
      
      return null;
    }
  }

  // Restore game data from save
  async restoreGameData(saveData: any): Promise<void> {
    if (!saveData.categories) {
      console.error('No save categories found in save data');
      return;
    }
    
    console.log('Starting game data restoration...');
    console.log('Available save categories:', Object.keys(saveData.categories));
    
    // Restore player position
    if (saveData.categories[this.saveCategories.PLAYER]) {
      console.log('Restoring player data...');
      this.restorePlayerData(saveData.categories[this.saveCategories.PLAYER]);
    } else {
      console.warn('No player data found in save');
    }
    
    // Restore inventory
    if (saveData.categories[this.saveCategories.INVENTORY]) {
      console.log('Restoring inventory data...');
      await this.restoreInventoryData(saveData.categories[this.saveCategories.INVENTORY]);
    } else {
      console.warn('No inventory data found in save');
    }
    
    // Restore environment
    if (saveData.categories[this.saveCategories.ENVIRONMENT]) {
      console.log('Restoring environment data...');
      await this.restoreEnvironmentData(saveData.categories[this.saveCategories.ENVIRONMENT]);
    } else {
      console.warn('No environment data found in save');
    }
    
    // Restore buildings
    if (saveData.categories[this.saveCategories.BUILDINGS]) {
      console.log('Restoring building data...');
      await this.restoreBuildingData(saveData.categories[this.saveCategories.BUILDINGS]);
    } else {
      console.warn('No building data found in save');
    }
    
    console.log('Game data restoration completed');
  }

  // Restore player data
  restorePlayerData(playerData: any) {
    if (this.gameInstance.player && this.gameInstance.player.mesh && playerData.position) {
      this.gameInstance.player.mesh.position.set(
        playerData.position.x,
        playerData.position.y,
        playerData.position.z
      );
      
      if (playerData.rotation) {
        this.gameInstance.player.mesh.rotation.set(
          playerData.rotation.x,
          playerData.rotation.y,
          playerData.rotation.z
        );
      }
      
      // Restore player health
      if (playerData.health && this.gameInstance.healthSystem) {
        if (typeof playerData.health.max === 'number') {
          this.gameInstance.healthSystem.maxHealth = playerData.health.max;
        }
        if (typeof playerData.health.current === 'number') {
          this.gameInstance.healthSystem.currentHealth = playerData.health.current;
          this.gameInstance.healthSystem.updateHeartsDisplay();
        }
        
        console.log(`Player health restored: ${playerData.health.current}/${playerData.health.max}`);
      }
      
      console.log('Player position and health restored');
    }
  }

  // Restore inventory data
  async restoreInventoryData(inventoryData: any): Promise<void> {
    if (!this.gameInstance.inventory || !inventoryData) {
      console.warn('Inventory or inventory data not found during restore');
      return;
    }
    
    const inventory = this.gameInstance.inventory;
    
    // Clear existing inventory
    console.log('Clearing existing inventory...');
    if (inventory.hotbar && Array.isArray(inventory.hotbar)) {
      inventory.hotbar.fill(null);
    }
    if (inventory.backpack && Array.isArray(inventory.backpack)) {
      inventory.backpack.fill(null);
    }
    
    // Restore backpack slots
    if (inventoryData.backpack) {
      console.log('Restoring backpack items...');
      for (const [slotIndex, slotData] of Object.entries<any>(inventoryData.backpack)) {
        if (!this.gameInstance.itemRegistry) {
          console.error('ItemRegistry not found during backpack restore');
          continue;
        }
        
        const item = this.gameInstance.itemRegistry[slotData.itemId];
        if (item) {
          try {
            const index = parseInt(slotIndex);
            if (index >= 0 && index < inventory.backpack.length) {
              // ItemStack is imported statically at the top of this file.
              inventory.backpack[index] = new ItemStack(item, slotData.quantity);
              console.log(`Restored ${slotData.quantity} ${item.name} to backpack slot ${index}`);
            }
          } catch (error) {
            console.error(`Failed to restore item to backpack slot ${slotIndex}:`, error);
          }
        } else {
          console.warn(`Item ${slotData.itemId} not found in itemRegistry during backpack restore`);
        }
      }
    }
    
    // Restore hotbar slots
    if (inventoryData.hotbar) {
      console.log('Restoring hotbar items...');
      for (const [slotIndex, slotData] of Object.entries<any>(inventoryData.hotbar)) {
        if (!this.gameInstance.itemRegistry) {
          console.error('ItemRegistry not found during hotbar restore');
          continue;
        }
        
        const item = this.gameInstance.itemRegistry[slotData.itemId];
        if (item) {
          try {
            const index = parseInt(slotIndex);
            if (index >= 0 && index < inventory.hotbar.length) {
              // ItemStack is imported statically at the top of this file.
              inventory.hotbar[index] = new ItemStack(item, slotData.quantity);
              console.log(`Restored ${slotData.quantity} ${item.name} to hotbar slot ${index}`);
            }
          } catch (error) {
            console.error(`Failed to restore item to hotbar slot ${slotIndex}:`, error);
          }
        } else {
          console.warn(`Item ${slotData.itemId} not found in itemRegistry during hotbar restore`);
        }
      }
    }
    
    // Restore selected slot
    if (typeof inventoryData.selectedSlot === 'number') {
      try {
        inventory.selectedHotbarSlot = inventoryData.selectedSlot;
        console.log(`Restored selected hotbar slot: ${inventoryData.selectedSlot}`);
      } catch (error) {
        console.error('Failed to restore selected hotbar slot:', error);
      }
    }
    
    // Notify inventory of changes
    if (inventory.notifyChange) {
      inventory.notifyChange();
    }
    
    console.log('Inventory restored successfully');
  }

  // Restore environment data
  async restoreEnvironmentData(environmentData: any): Promise<void> {
    // This is a simplified restoration - full implementation would 
    // require more complex environment management
    console.log('Environment data loaded (trees, rocks, items)');
    
    // Restore pickupable items
    if (environmentData.pickupableItems) {
      environmentData.pickupableItems.forEach((itemData: any) => {
        this.restorePickupableItem(itemData);
      });
    }
    // Restore dropped items
    if (environmentData.droppedItems) {
      console.log(`Restoring ${environmentData.droppedItems.length} dropped items...`);
      environmentData.droppedItems.forEach((itemData: any) => {
        this.restoreDroppedItem(itemData);
      });
    }
  }

  // Restore a pickupable item
  restorePickupableItem(itemData: any) {
    if (!this.gameInstance.itemDropSystem || !itemData.itemId) {
      console.warn('ItemDropSystem or itemId missing during item restore');
      return;
    }
    
    if (!this.gameInstance.itemRegistry) {
      console.error('ItemRegistry not found during pickupable item restore');
      return;
    }
    
    const item = this.gameInstance.itemRegistry[itemData.itemId];
    if (item && itemData.position) {
      try {
        // Create the item using the item drop system
        const droppedItem = this.gameInstance.itemDropSystem.createItemMesh(
          item, 
          itemData.quantity || 1
        );
        
        if (droppedItem && droppedItem.position) {
          droppedItem.position.set(
            itemData.position.x,
            itemData.position.y,
            itemData.position.z
          );
          
          if (itemData.rotation && droppedItem.rotation) {
            droppedItem.rotation.set(
              itemData.rotation.x,
              itemData.rotation.y,
              itemData.rotation.z
            );
          }
          
          this.gameInstance.scene.add(droppedItem);
          this.gameInstance.pickupableItems.push(droppedItem);
          
          console.log(`Restored pickupable item: ${item.name}`);
        } else {
          console.warn(`Failed to create item mesh for ${item.name} or mesh has no position property`);
        }
      } catch (error) {
        console.error(`Error restoring pickupable item ${itemData.itemId}:`, error);
      }
    } else {
      console.warn(`Item ${itemData.itemId} not found in itemRegistry or missing position data`);
    }
  }
  // Restore a dropped item
  async restoreDroppedItem(itemData: any): Promise<void> {
    if (!this.gameInstance.itemDropSystem || !itemData.itemId) {
      console.warn('ItemDropSystem or itemId missing during dropped item restore');
      return;
    }
    
    if (!this.gameInstance.itemRegistry) {
      console.error('ItemRegistry not found during dropped item restore');
      return;
    }
    
    const item = this.gameInstance.itemRegistry[itemData.itemId];
    if (item && itemData.position) {
      try {
        // Create the item using the item drop system
        const droppedItem = await this.gameInstance.itemDropSystem.createItemMesh(item);
        
        if (droppedItem && droppedItem.position) {
          // Set position
          droppedItem.position.set(
            itemData.position.x,
            itemData.position.y,
            itemData.position.z
          );
          
          // Set rotation
          if (itemData.rotation && droppedItem.rotation) {
            droppedItem.rotation.set(
              itemData.rotation.x,
              itemData.rotation.y,
              itemData.rotation.z
            );
          }
          // Restore userData
          droppedItem.userData = {
            itemId: itemData.itemId,
            quantity: itemData.quantity || 1,
            bobOffset: itemData.userData?.bobOffset || Math.random() * Math.PI * 2,
            initialY: itemData.userData?.initialY || itemData.position.y,
            dropTime: itemData.userData?.dropTime || Date.now(),
            isPhysicsItem: itemData.userData?.isPhysicsItem || false,
            hasLanded: itemData.userData?.hasLanded || true,
            groundY: itemData.userData?.groundY || 6.3
          };
          
          // Add to scene and tracking systems
          this.gameInstance.scene.add(droppedItem);
          this.gameInstance.itemDropSystem.droppedItems.push(droppedItem);
          
          // Also add to pickupableItems for interaction system
          if (this.gameInstance.pickupableItems) {
            this.gameInstance.pickupableItems.push(droppedItem);
          }
          
          console.log(`Restored dropped item: ${item.name} at position (${itemData.position.x.toFixed(1)}, ${itemData.position.y.toFixed(1)}, ${itemData.position.z.toFixed(1)})`);
        } else {
          console.warn(`Failed to create item mesh for ${item.name} or mesh has no position property`);
        }
      } catch (error) {
        console.error(`Error restoring dropped item ${itemData.itemId}:`, error);
      }
    } else {
      console.warn(`Item ${itemData.itemId} not found in itemRegistry or missing position data`);
    }
  }

  // Restore building data
  async restoreBuildingData(buildingData: any): Promise<void> {
    if (!this.gameInstance.buildingSystem || !buildingData.structures) {
      console.warn('Building system or building data not found during restore');
      return;
    }
    
    const buildingSystem = this.gameInstance.buildingSystem;
    console.log(`Restoring ${buildingData.structures.length} buildings of all types...`);
    
    // Clear existing buildings from all tracking systems
    await this.clearAllExistingBuildings();
    
    // Restore each building using save manager
    for (const buildingInfo of buildingData.structures) {
      try {
        // Use the SaveSystem's own restoreBuilding method instead of the save manager's
        await this.restoreBuilding(buildingInfo);
      } catch (error) {
        console.error(`Failed to restore building ${buildingInfo.type || buildingInfo.id}:`, error);
      }
    }
    
    console.log('Building restoration completed for all building types');
  }
  // Clear all existing buildings from all tracking systems
  async clearAllExistingBuildings() {
    const buildingSystem = this.gameInstance.buildingSystem;
    
    console.log('Clearing all existing buildings...');
    
    // Clear from legacy builtWalls array
    if (buildingSystem.builtWalls && Array.isArray(buildingSystem.builtWalls)) {
      buildingSystem.builtWalls.forEach((building: any) => {
        if (building && building.parent) {
          building.parent.remove(building);
        }
        
        // Remove from collision system
        if (this.gameInstance.collisionSystem) {
          this.gameInstance.collisionSystem.removeCollider(building);
        }
      });
      buildingSystem.builtWalls.length = 0;
    }
    
    // Clear from objects registry if available
    if (buildingSystem.objectsRegistry && buildingSystem.objectsRegistry.clearAllBuiltObjects) {
      buildingSystem.objectsRegistry.clearAllBuiltObjects();
    }
    
    // Clear cell tracking systems
    if (buildingSystem.occupiedCells) {
      buildingSystem.occupiedCells.clear();
    }
    if (buildingSystem.cellToWallMap) {
      buildingSystem.cellToWallMap.clear();
    }
    
    console.log('All existing buildings cleared');
  }
  // Restore individual building
  async restoreBuilding(buildingInfo: any): Promise<void> {
    const buildingSystem = this.gameInstance.buildingSystem;
    const buildingType = buildingInfo.type;
    const buildingLevel = buildingInfo.level || 0; // Default to ground level if no level saved
    
    console.log(`Restoring building type: ${buildingType} at level ${buildingLevel}`, buildingInfo);
    
    // Get the building registry to find the correct building type
    if (!buildingSystem?.objectsRegistry) {
      console.error('BuildableObjectsRegistry not found during building restore');
      return;
    }
    
    const registry = buildingSystem.objectsRegistry;
    
    // Find the building definition in the registry
    let buildingDef = null;
    if (registry.buildableObjects && registry.buildableObjects[buildingType]) {
      buildingDef = registry.buildableObjects[buildingType];
    }
    
    if (!buildingDef) {
      console.warn(`Building type ${buildingType} not found in registry. Available types:`, Object.keys(registry.buildableObjects || {}));
      return;
    }
    
    // Create the building mesh using the save manager
    let building = null;
    try {
      if (buildingSystem.saveManager && typeof buildingSystem.saveManager.createBuildingMesh === 'function') {
        building = buildingSystem.saveManager.createBuildingMesh(
          buildingType, 
          buildingInfo.position, 
          buildingInfo.rotation || 0
        );
      } else {
        console.error('Save manager not found or createBuildingMesh method missing');
        return;
      }
    } catch (error) {
      console.error(`Error creating building mesh for ${buildingType}:`, error);
      return;
    }
    
    if (!building) {
      console.error(`Failed to create building mesh for type: ${buildingType}`);
      return;
    }
    
    // Set position
    building.position.set(
      buildingInfo.position.x,
      buildingInfo.position.y,
      buildingInfo.position.z
    );
    
    // Set rotation - handle both object and number formats
    if (buildingInfo.rotation) {
      if (typeof buildingInfo.rotation === 'object') {
        building.rotation.set(
          buildingInfo.rotation.x || 0,
          buildingInfo.rotation.y || 0,
          buildingInfo.rotation.z || 0
        );
      } else {
        building.rotation.y = buildingInfo.rotation;
      }
    }
    
    // Set scale if available
    if (buildingInfo.scale) {
      building.scale.set(
        buildingInfo.scale.x || 1,
        buildingInfo.scale.y || 1,
        buildingInfo.scale.z || 1
      );
    }
    
    // Set visibility
    building.visible = buildingInfo.visible !== false;
    
    // Restore userData with breakable state
    building.userData = {
      buildingType: buildingType,
      type: buildingType,
      isCollider: true,
      colliderType: 'mesh',
      isBuildingWall: true,
      isBreakable: true,
      ...buildingInfo.userData
    };
    
    // Set UUID if available
    if (buildingInfo.uuid) {
      building.uuid = buildingInfo.uuid;
    }
    
    // Set up breakable state for all child meshes
    building.traverse((child: any) => {
      if (child.isMesh) {
        child.userData = {
          ...child.userData,
          isCollider: true,
          colliderType: 'mesh',
          isBuildingWall: true,
          isBreakable: true,
          buildingType: buildingType,
          type: buildingType
        };
        if (child.geometry) {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
        }
        child.updateMatrixWorld(true);
      }
    });
    // Add to scene
    this.gameInstance.scene.add(building);
    
    // Register with all appropriate tracking systems
    this.registerRestoredBuilding(building, buildingType, buildingInfo);
    
    console.log(`Restored ${buildingType} at level ${buildingInfo.level || 0} position (${buildingInfo.position.x.toFixed(1)}, ${buildingInfo.position.y.toFixed(1)}, ${buildingInfo.position.z.toFixed(1)})`);
  }
  // Register restored building with all tracking systems
  registerRestoredBuilding(building: THREE.Object3D, buildingType: string, buildingInfo: any) {
    const buildingSystem = this.gameInstance.buildingSystem;
    
    // Add to legacy walls array (for backward compatibility)
    if (buildingSystem.builtWalls) {
      buildingSystem.builtWalls.push(building);
    }
    
    // Register with objects registry if available
    if (buildingSystem.objectsRegistry && buildingSystem.objectsRegistry.registerBuiltObject) {
      buildingSystem.objectsRegistry.registerBuiltObject(buildingType, building);
    }
    
    // Register with collision system
    if (this.gameInstance.collisionSystem) {
      if (this.gameInstance.collisionSystem.addCollider) {
        this.gameInstance.collisionSystem.addCollider(building, 'mesh');
      }
      if (this.gameInstance.collisionSystem.addBuilding) {
        this.gameInstance.collisionSystem.addBuilding(building);
      }
    }
    
    // Mark cells as occupied - use level manager if available
    const levelManager = this.gameInstance.levelManager;
    const buildingLevel = buildingInfo.level || 0;
    
    if (levelManager) {
      // Set level manager to the building's level temporarily to mark cells correctly
      const originalLevel = levelManager.currentLevel;
      levelManager.currentLevel = buildingLevel;
      
      const occupiedCells = this.getOccupiedCellsForBuilding(buildingInfo, buildingSystem);
      occupiedCells.forEach(cellKey => {
        levelManager.addOccupiedCell(cellKey);
        
        const currentLevelCellToWallMap = levelManager.getCurrentLevelCellToWallMap();
        currentLevelCellToWallMap.set(cellKey, building);
      });
      
      // Restore original level
      levelManager.currentLevel = originalLevel;
      
      console.log(`Marked ${occupiedCells.length} cells as occupied on level ${buildingLevel}`);
    } else {
      // Fallback to legacy system
      const occupiedCells = this.getOccupiedCellsForBuilding(buildingInfo, buildingSystem);
      occupiedCells.forEach(cellKey => {
        if (buildingSystem.occupiedCells) {
          buildingSystem.occupiedCells.add(cellKey);
        }
        if (buildingSystem.cellToWallMap) {
          buildingSystem.cellToWallMap.set(cellKey, building);
        }
      });
    }
  }
  // Helper method to calculate occupied cells for a restored building
  getOccupiedCellsForBuilding(buildingInfo: any, buildingSystem: any): string[] {
    const position = new THREE.Vector3(
      buildingInfo.position.x,
      buildingInfo.position.y,
      buildingInfo.position.z
    );
    
    // Get building definition to determine cell size
    const registry = this.gameInstance.buildingSystem.objectsRegistry;
    let buildingDef = null;
    
    if (registry && registry.buildableObjects) {
      buildingDef = registry.buildableObjects[buildingInfo.type];
    }
    
    const cellSize = buildingDef ? buildingDef.cellSize : 1.0;
    const gridSize = buildingSystem.gridSize || 2.0;
    
    // Calculate occupied cells similar to BuildingSystem.getOccupiedCells
    const gridX = Math.round((position.x + 0.001) / gridSize);
    const gridZ = Math.round((position.z + 0.001) / gridSize);
    const occupiedCells: string[] = [];
    
    // Handle different cell size formats
    let cellWidth, cellHeight;
    if (typeof cellSize === 'object' && cellSize.width && cellSize.height) {
      cellWidth = cellSize.width;
      cellHeight = cellSize.height;
    } else {
      cellWidth = cellSize;
      cellHeight = 1.0;
    }
    
    // Calculate cell pattern based on rotation
    let rotationY = 0;
    if (buildingInfo.rotation) {
      if (typeof buildingInfo.rotation === 'object') {
        rotationY = buildingInfo.rotation.y || 0;
      } else if (typeof buildingInfo.rotation === 'number') {
        rotationY = buildingInfo.rotation;
      }
    }
    
    const normalizedRotation = Math.round((rotationY * 180 / Math.PI) / 90) * 90;
    const positiveRotation = ((normalizedRotation % 360) + 360) % 360;
    
    this.calculateRotatedCellsForRestore(gridX, gridZ, cellWidth, cellHeight, positiveRotation, occupiedCells);
    
    return occupiedCells;
  }
  // Helper method for calculating rotated cells during restore
  calculateRotatedCellsForRestore(
    centerX: number,
    centerZ: number,
    width: number,
    height: number,
    rotation: number,
    occupiedCells: string[]
  ) {
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);
    
    // Generate cell offsets in local space
    const localCells = [];
    for (let dx = -halfWidth; dx < width - halfWidth; dx++) {
      for (let dz = -halfHeight; dz < height - halfHeight; dz++) {
        localCells.push({ x: dx, z: dz });
      }
    }
    
    // Apply rotation transformation
    localCells.forEach(localCell => {
      let rotatedX, rotatedZ;
      
      switch (rotation) {
        case 0:
          rotatedX = localCell.x;
          rotatedZ = localCell.z;
          break;
        case 90:
          rotatedX = -localCell.z;
          rotatedZ = localCell.x;
          break;
        case 180:
          rotatedX = -localCell.x;
          rotatedZ = -localCell.z;
          break;
        case 270:
          rotatedX = localCell.z;
          rotatedZ = -localCell.x;
          break;
        default:
          rotatedX = localCell.x;
          rotatedZ = localCell.z;
      }
      
      const worldX = centerX + rotatedX;
      const worldZ = centerZ + rotatedZ;
      const cellKey = `${worldX},${worldZ}`;
      occupiedCells.push(cellKey);
    });
  }
  // Helper method to calculate which level a building is on based on Y position
  calculateBuildingLevel(yPosition: number, levelManager: any): number {
    if (!levelManager || !levelManager.levelHeight) {
      return 0; // Default to ground level
    }
    
    // Calculate level based on Y position
    // Level 0 = Y 6, Level 1 = Y 10, Level 2 = Y 14, etc.
    // Level -1 = Y 2, Level -2 = Y -2, etc.
    const baseY = 6; // Ground level Y position
    const levelHeight = levelManager.levelHeight;
    
    const calculatedLevel = Math.round((yPosition - baseY) / levelHeight);
    
    // Clamp to valid level range
    const minLevel = levelManager.minLevel || 0;
    const maxLevel = (levelManager.maxLevels || 10) - 1;
    
    return Math.max(minLevel, Math.min(maxLevel, calculatedLevel));
  }
  // Get list of available save slots
  getSaveSlots() {
    const saveSlots = [];
    
    for (let i = 0; i < this.saveSlots; i++) {
      const metadata = this.getSaveMetadata(i);
      saveSlots.push({
        slotNumber: i,
        exists: metadata !== null,
        metadata: metadata
      });
    }
    
    return saveSlots;
  }

  // Get metadata for a save slot
  getSaveMetadata(slotNumber: number) {
    const metadataString = this.getCookie(`cozyAdventure_meta_${slotNumber}`);
    return metadataString ? JSON.parse(metadataString) : null;
  }

  // Delete a save slot
  deleteSave(slotNumber: number): boolean {
    try {
      // Delete main save data
      this.deleteCookie(`cozyAdventure_save_${slotNumber}`);
      
      // Delete chunked data if it exists
      const chunkCount = this.getCookie(`cozyAdventure_save_${slotNumber}_chunks`);
      if (chunkCount) {
        for (let i = 0; i < parseInt(chunkCount); i++) {
          this.deleteCookie(`cozyAdventure_save_${slotNumber}_chunk_${i}`);
        }
        this.deleteCookie(`cozyAdventure_save_${slotNumber}_chunks`);
      }
      
      // Delete metadata
      this.deleteCookie(`cozyAdventure_meta_${slotNumber}`);
      
      console.log(`Save slot ${slotNumber} deleted`);
      return true;
    } catch (error) {
      console.error('Failed to delete save:', error);
      return false;
    }
  }

  // Cookie utility functions with localStorage fallback
  setCookie(name: string, value: string, days: number) {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      
      // Use SameSite=None for cross-site compatibility, but only if secure
      const isSecure = window.location.protocol === 'https:';
      const sameSite = isSecure ? 'None' : 'Lax';
      const secureFlag = isSecure ? ';Secure' : '';
      const partitionedFlag = isSecure ? ';Partitioned' : '';
      
      const encodedValue = encodeURIComponent(value);
      const cookieString = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=${sameSite}${secureFlag}${partitionedFlag}`;
      
      // Check total cookie size before setting
      if (cookieString.length > 4096) {
        throw new Error(`Cookie too large: ${cookieString.length} bytes (max 4096)`);
      }
      
      document.cookie = cookieString;
      
      // Verify cookie was set by trying to read it back
      const testValue = this.getCookieOnly(name);
      if (!testValue || testValue !== value) {
        throw new Error('Cookie verification failed - value mismatch');
      }
    } catch (error: any) {
      console.warn(`Cookie failed for ${name}, falling back to localStorage:`, error.message);
      this.setLocalStorage(name, value, days);
    }
  }
  getCookieOnly(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
  getCookie(name: string): string | null {
    // Try cookie first
    const cookieValue = this.getCookieOnly(name);
    if (cookieValue !== null) {
      return cookieValue;
    }
    
    // Fallback to localStorage
    return this.getLocalStorage(name);
  }
  deleteCookie(name: string) {
    try {
      // Use same SameSite setting as setCookie for consistency
      const isSecure = window.location.protocol === 'https:';
      const sameSite = isSecure ? 'None' : 'Lax';
      const secureFlag = isSecure ? ';Secure' : '';
      const partitionedFlag = isSecure ? ';Partitioned' : '';
      
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=${sameSite}${secureFlag}${partitionedFlag}`;
    } catch (error: any) {
      console.warn(`Cookie deletion failed for ${name}:`, error.message);
    }
    
    // Also remove from localStorage
    this.deleteLocalStorage(name);
  }
  // localStorage utility functions
  setLocalStorage(name: string, value: string, days: number) {
    try {
      const expires = Date.now() + (days * 24 * 60 * 60 * 1000);
      const data = {
        value: value,
        expires: expires
      };
      localStorage.setItem(name, JSON.stringify(data));
      console.log(`Data saved to localStorage: ${name}`);
    } catch (error) {
      console.error(`Failed to save to localStorage: ${name}`, error);
    }
  }
  getLocalStorage(name: string): string | null {
    try {
      const item = localStorage.getItem(name);
      if (!item) return null;
      
      const data = JSON.parse(item);
      
      // Check if expired
      if (data.expires && Date.now() > data.expires) {
        localStorage.removeItem(name);
        return null;
      }
      
      return data.value;
    } catch (error) {
      console.error(`Failed to read from localStorage: ${name}`, error);
      return null;
    }
  }
  deleteLocalStorage(name: string) {
    try {
      localStorage.removeItem(name);
      console.log(`Data removed from localStorage: ${name}`);
    } catch (error) {
      console.error(`Failed to remove from localStorage: ${name}`, error);
    }
  }

  // Auto-save functionality
  enableAutoSave(intervalMinutes: number = 5) {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
    
    this.autoSaveInterval = setInterval(() => {
      if (this.gameInstance.isGameStarted) {
        console.log('Auto-saving game...');
        this.saveGame(this.currentSaveSlot);
      }
    }, intervalMinutes * 60 * 1000);
    
    console.log(`Auto-save enabled (every ${intervalMinutes} minutes)`);
  }

  disableAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
      console.log('Auto-save disabled');
    }
  }

  // Helper method to fix scientific notation in JSON
  fixScientificNotation(jsonString: string): string {
    // Replace scientific notation with regular numbers
    return jsonString.replace(/(\d+\.?\d*)e\+?(-?\d+)/gi, (match: string, base: string, exponent: string) => {
      const num = parseFloat(base) * Math.pow(10, parseInt(exponent));
      return num.toString();
    });
  }
  
  // Helper method to attempt basic JSON fixes
  attemptJSONFix(jsonString: string): string {
    let fixed = jsonString;
    
    // Fix common issues
    // Remove trailing commas before closing brackets/braces
    fixed = fixed.replace(/,\s*([}\]])/g, '$1');
    
    // Fix incomplete scientific notation (e+ without number)
    fixed = fixed.replace(/e\+?\s*([,}\]])/g, '0$1');
    
    // Fix NaN values
    fixed = fixed.replace(/:\s*NaN/g, ': 0');
    
    // Fix Infinity values
    fixed = fixed.replace(/:\s*Infinity/g, ': 999999');
    fixed = fixed.replace(/:\s*-Infinity/g, ': -999999');
    
    return fixed;
  }
  // Cleanup
  destroy() {
    this.disableAutoSave();
  }
}