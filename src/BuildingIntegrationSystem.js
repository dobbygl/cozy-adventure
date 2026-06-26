import * as THREE from 'three';
import { FarmingSystem } from './FarmingSystem.js';

export class BuildingIntegrationSystem {
  constructor(scene, player, inventory, collisionSystem, itemRegistry) {
    this.scene = scene;
    this.player = player;
    this.inventory = inventory;
    this.collisionSystem = collisionSystem;
    this.itemRegistry = itemRegistry;
    
    // Registry of building integrations
    this.integrations = new Map();
    
    // Active building instances with their scripts
    this.activeBuildingInstances = new Map();
    
    // Event system for building lifecycle
    this.eventListeners = new Map();
    
    // Initialize farming system
    this.farmingSystem = new FarmingSystem(scene, player.camera, inventory, itemRegistry);
    
    // Register farming plot integration
    this.registerFarmingPlotIntegration();
    
    console.log('BuildingIntegrationSystem initialized');
  }
  
  /**
   * Register a building integration
   * @param {string} buildingType - The building type (e.g., 'farmingPlot', 'wall', 'workbench')
   * @param {Object} integrationConfig - Configuration object
   */
  registerIntegration(buildingType, integrationConfig) {
    const config = {
      // Script class constructor
      scriptClass: integrationConfig.scriptClass,
      
      // Initialization parameters
      initParams: integrationConfig.initParams || {},
      
      // Interaction configuration
      interaction: {
        enabled: integrationConfig.interaction?.enabled || false,
        distance: integrationConfig.interaction?.distance || 3.0,
        prompt: integrationConfig.interaction?.prompt || 'Interact',
        key: integrationConfig.interaction?.key || 'E'
      },
      
      // Update configuration
      update: {
        enabled: integrationConfig.update?.enabled || false,
        frequency: integrationConfig.update?.frequency || 'frame' // 'frame', 'second', 'custom'
      },
      
      // UI configuration
      ui: {
        enabled: integrationConfig.ui?.enabled || false,
        type: integrationConfig.ui?.type || 'overlay', // 'overlay', 'sidebar', 'modal'
        components: integrationConfig.ui?.components || []
      },
      
      // Dependencies
      dependencies: integrationConfig.dependencies || [],
      
      // Lifecycle hooks
      hooks: {
        onPlace: integrationConfig.hooks?.onPlace || null,
        onRemove: integrationConfig.hooks?.onRemove || null,
        onInteract: integrationConfig.hooks?.onInteract || null,
        onUpdate: integrationConfig.hooks?.onUpdate || null
      }
    };
    
    this.integrations.set(buildingType, config);
    console.log(`Registered integration for building type: ${buildingType}`);
  }
  
  /**
   * Activate a building instance when placed
   * @param {string} buildingType - The building type
   * @param {THREE.Object3D} buildingMesh - The building mesh object
   * @param {THREE.Vector3} position - World position
   * @param {number} rotation - Y rotation in radians
   */
  activateBuilding(buildingType, buildingMesh, position, rotation = 0) {
    const integration = this.integrations.get(buildingType);
    if (!integration) {
      console.warn(`No integration found for building type: ${buildingType}`);
      return null;
    }
    
    console.log(`Activating building: ${buildingType} at position:`, position);
    
    // Generate unique instance ID
    const instanceId = this.generateInstanceId(buildingType, position);
    
    // Create script instance if provided
    let scriptInstance = null;
    if (integration.scriptClass) {
      try {
        const initParams = {
          ...integration.initParams,
          scene: this.scene,
          player: this.player,
          inventory: this.inventory,
          collisionSystem: this.collisionSystem,
          buildingMesh: buildingMesh,
          position: position.clone(),
          rotation: rotation,
          instanceId: instanceId
        };
        
        scriptInstance = new integration.scriptClass(initParams);
        console.log(`Created script instance for ${buildingType}:`, scriptInstance);
      } catch (error) {
        console.error(`Failed to create script instance for ${buildingType}:`, error);
      }
    }
    
    // Create building instance data
    const buildingInstance = {
      id: instanceId,
      type: buildingType,
      mesh: buildingMesh,
      position: position.clone(),
      rotation: rotation,
      script: scriptInstance,
      integration: integration,
      isActive: true,
      lastUpdate: Date.now()
    };
    
    // Store the instance
    this.activeBuildingInstances.set(instanceId, buildingInstance);
    
    // Add instance reference to mesh for easy lookup
    buildingMesh.userData.buildingInstanceId = instanceId;
    buildingMesh.userData.buildingType = buildingType;
    
    // Call onPlace hook
    if (integration.hooks.onPlace) {
      try {
        integration.hooks.onPlace(buildingInstance, scriptInstance);
      } catch (error) {
        console.error(`Error in onPlace hook for ${buildingType}:`, error);
      }
    }
    
    console.log(`Activated building instance: ${instanceId} (${buildingType})`);
    return buildingInstance;
  }
  
  /**
   * Deactivate a building instance when removed
   * @param {string} instanceId - The instance ID
   */
  deactivateBuilding(instanceId) {
    const buildingInstance = this.activeBuildingInstances.get(instanceId);
    if (!buildingInstance) {
      console.warn(`Building instance not found: ${instanceId}`);
      return;
    }
    
    // Call onRemove hook
    if (buildingInstance.integration.hooks.onRemove) {
      try {
        buildingInstance.integration.hooks.onRemove(buildingInstance, buildingInstance.script);
      } catch (error) {
        console.error(`Error in onRemove hook for ${buildingInstance.type}:`, error);
      }
    }
    
    // Clean up script instance
    if (buildingInstance.script && typeof buildingInstance.script.destroy === 'function') {
      try {
        buildingInstance.script.destroy();
      } catch (error) {
        console.error(`Error destroying script for ${buildingInstance.type}:`, error);
      }
    }
    
    // Remove from active instances
    this.activeBuildingInstances.delete(instanceId);
    
    console.log(`Deactivated building instance: ${instanceId}`);
  }
  
  /**
   * Find building instance by mesh object
   * @param {THREE.Object3D} mesh - The building mesh
   * @returns {Object|null} Building instance or null
   */
  getBuildingInstanceByMesh(mesh) {
    const instanceId = mesh.userData.buildingInstanceId;
    if (!instanceId) return null;
    
    return this.activeBuildingInstances.get(instanceId);
  }
  
  /**
   * Get all building instances of a specific type
   * @param {string} buildingType - The building type
   * @returns {Array} Array of building instances
   */
  getBuildingInstancesByType(buildingType) {
    return Array.from(this.activeBuildingInstances.values())
      .filter(instance => instance.type === buildingType);
  }
  
  /**
   * Update all active building instances
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    const currentTime = Date.now();
    
    for (const [instanceId, buildingInstance] of this.activeBuildingInstances) {
      if (!buildingInstance.isActive) continue;
      
      const integration = buildingInstance.integration;
      
      // Check if update is needed based on frequency
      let shouldUpdate = false;
      if (integration.update.enabled) {
        switch (integration.update.frequency) {
          case 'frame':
            shouldUpdate = true;
            break;
          case 'second':
            shouldUpdate = (currentTime - buildingInstance.lastUpdate) >= 1000;
            break;
          case 'custom':
            // Let the script decide when to update
            shouldUpdate = buildingInstance.script && 
              typeof buildingInstance.script.shouldUpdate === 'function' &&
              buildingInstance.script.shouldUpdate(deltaTime, currentTime);
            break;
        }
      }
      
      if (shouldUpdate) {
        // Update script instance
        if (buildingInstance.script && typeof buildingInstance.script.update === 'function') {
          try {
            buildingInstance.script.update(deltaTime, currentTime);
          } catch (error) {
            console.error(`Error updating script for ${buildingInstance.type}:`, error);
          }
        }
        
        // Call onUpdate hook
        if (integration.hooks.onUpdate) {
          try {
            integration.hooks.onUpdate(buildingInstance, buildingInstance.script, deltaTime);
          } catch (error) {
            console.error(`Error in onUpdate hook for ${buildingInstance.type}:`, error);
          }
        }
        
        buildingInstance.lastUpdate = currentTime;
      }
    }
  }
  
  /**
   * Handle interaction with buildings
   * @param {THREE.Object3D} mesh - The building mesh that was interacted with
   * @param {Object} interactionData - Additional interaction data
   */
  handleInteraction(mesh, interactionData = {}) {
    const buildingInstance = this.getBuildingInstanceByMesh(mesh);
    if (!buildingInstance) return false;
    
    const integration = buildingInstance.integration;
    
    // Check if interaction is enabled
    if (!integration.interaction.enabled) return false;
    
    // Check interaction distance
    if (this.player && buildingInstance.position) {
      const distance = this.player.mesh.position.distanceTo(buildingInstance.position);
      if (distance > integration.interaction.distance) {
        console.log(`Too far from building (${distance.toFixed(1)}m > ${integration.interaction.distance}m)`);
        return false;
      }
    }
    
    // Handle script interaction
    let handled = false;
    if (buildingInstance.script && typeof buildingInstance.script.onInteract === 'function') {
      try {
        handled = buildingInstance.script.onInteract(interactionData);
      } catch (error) {
        console.error(`Error in script interaction for ${buildingInstance.type}:`, error);
      }
    }
    
    // Call onInteract hook
    if (integration.hooks.onInteract) {
      try {
        const hookResult = integration.hooks.onInteract(buildingInstance, buildingInstance.script, interactionData);
        handled = handled || hookResult;
      } catch (error) {
        console.error(`Error in onInteract hook for ${buildingInstance.type}:`, error);
      }
    }
    
    console.log(`Interaction handled for ${buildingInstance.type}: ${handled}`);
    return handled;
  }
  
  /**
   * Generate unique instance ID
   * @param {string} buildingType - Building type
   * @param {THREE.Vector3} position - World position
   * @returns {string} Unique instance ID
   */
  generateInstanceId(buildingType, position) {
    const timestamp = Date.now();
    const posStr = `${Math.round(position.x)}_${Math.round(position.y)}_${Math.round(position.z)}`;
    return `${buildingType}_${posStr}_${timestamp}`;
  }
  
  /**
   * Get interaction prompt for a building
   * @param {THREE.Object3D} mesh - The building mesh
   * @returns {string|null} Interaction prompt or null
   */
  getInteractionPrompt(mesh) {
    const buildingInstance = this.getBuildingInstanceByMesh(mesh);
    if (!buildingInstance || !buildingInstance.integration.interaction.enabled) {
      return null;
    }
    
    // Check distance
    if (this.player && buildingInstance.position) {
      const distance = this.player.mesh.position.distanceTo(buildingInstance.position);
      if (distance > buildingInstance.integration.interaction.distance) {
        return null;
      }
    }
    
    // Get custom prompt from script if available
    if (buildingInstance.script && typeof buildingInstance.script.getInteractionPrompt === 'function') {
      try {
        const customPrompt = buildingInstance.script.getInteractionPrompt();
        if (customPrompt) return customPrompt;
      } catch (error) {
        console.error(`Error getting interaction prompt from script:`, error);
      }
    }
    
    // Return default prompt
    const key = buildingInstance.integration.interaction.key;
    const prompt = buildingInstance.integration.interaction.prompt;
    return `[${key}] ${prompt}`;
  }
  
  /**
   * Clean up all building instances
   */
  destroy() {
    console.log('Destroying BuildingIntegrationSystem...');
    
    // Deactivate all buildings
    const instanceIds = Array.from(this.activeBuildingInstances.keys());
    instanceIds.forEach(id => this.deactivateBuilding(id));
    
    // Clear registrations
    this.integrations.clear();
    this.eventListeners.clear();
    
    console.log('BuildingIntegrationSystem destroyed');
  }
  
  /**
   * Register farming plot integration with the building system
   */
  registerFarmingPlotIntegration() {
    this.registerIntegration('farmingPlot', {
      // No script class needed for basic farming plots
      scriptClass: null,
      
      // Interaction configuration
      interaction: {
        enabled: true,
        distance: 3.0,
        prompt: 'Plant Seeds',
        key: 'E'
      },
      
      // Update configuration
      update: {
        enabled: true,
        frequency: 'frame'
      },
      
      // Lifecycle hooks
      hooks: {
        onPlace: (buildingInstance, scriptInstance) => {
          // Register the farming plot with the farming system
          console.log('Registering farming plot with farming system at position:', buildingInstance.position);
          console.log('Building mesh:', buildingInstance.mesh);
          
          // Ensure the mesh has the correct position
          buildingInstance.mesh.position.copy(buildingInstance.position);
          buildingInstance.mesh.rotation.y = buildingInstance.rotation;
          
          this.farmingSystem.registerFarmingPlot(buildingInstance.mesh);
          
          // Debug: Check if slots were created
          const plotData = this.farmingSystem.farmingPlots.get(buildingInstance.mesh.uuid);
          if (plotData) {
            console.log(`✓ Farming plot registered with ${plotData.slots.length} slots`);
            plotData.slots.forEach((slot, index) => {
              console.log(`  Slot ${index}: position (${slot.position.x.toFixed(1)}, ${slot.position.y.toFixed(1)}, ${slot.position.z.toFixed(1)})`);
            });
          } else {
            console.error('✗ Failed to register farming plot - no plot data found');
          }
        },
        
        onRemove: (buildingInstance, scriptInstance) => {
          // Unregister the farming plot from the farming system
          console.log('Unregistering farming plot from farming system:', buildingInstance.mesh);
          this.farmingSystem.unregisterFarmingPlot(buildingInstance.mesh);
        },
        
        onInteract: (buildingInstance, scriptInstance, interactionData) => {
          // Handle farming plot interaction
          const selectedItem = this.inventory.getSelectedItem();
          if (selectedItem && this.farmingSystem.isValidSeed(selectedItem.item.id)) {
            console.log(`Attempting to plant ${selectedItem.item.id} on farming plot`);
            
            // Find nearest planting slot to the player
            const playerPosition = this.player.mesh.position;
            const nearbySlots = this.farmingSystem.getSlotsNearPosition(playerPosition, 3.0);
            
            // Find the first empty slot
            const emptySlot = nearbySlots.find(slot => !slot.planted);
            if (emptySlot) {
              this.farmingSystem.plantSeed(emptySlot, selectedItem.item.id);
              return true;
            } else {
              console.log('No empty planting slots available in this farming plot');
              return false;
            }
          } else {
            console.log('No valid seeds selected for planting');
            return false;
          }
        },
        
        onUpdate: (buildingInstance, scriptInstance, deltaTime) => {
          // Update farming system (growth, etc.)
          this.farmingSystem.update();
        }
      }
    });
    
    console.log('Farming plot integration registered');
  }
  
  /**
   * Get the farming system instance
   * @returns {FarmingSystem} The farming system
   */
  getFarmingSystem() {
    return this.farmingSystem;
  }
}