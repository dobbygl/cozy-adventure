import * as THREE from 'three';
export class DebugUI {
  // game is the Game (game.js, not yet migrated); typed loosely.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game: any;
  isVisible: boolean;
  uPressed: boolean;
  treePivotDots: THREE.Object3D[];
  dogDetectionRangeHelper: THREE.Object3D | null;
  stepVisualMesh?: THREE.Mesh | null;

  constructor(game: any) {
    this.game = game;
    this.isVisible = false;
    this.uPressed = false;
    this.treePivotDots = [];
    this.dogDetectionRangeHelper = null;
    this.setupEventListeners();
    this.setupHandItemEditor();
  }

  /** Get an element as an input (debug DOM is static; cast is intentional). */
  gi(id: string): HTMLInputElement {
    const d: Document = document;
    return d.getElementById(id) as HTMLInputElement;
  }

  setupEventListeners() {
    // Add debug visualization toggle (U + 1)
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyU') {
        this.uPressed = true;
      }
      if (e.code === 'Digit1' && this.uPressed) {
        this.toggle();
      }
    });
    
    document.addEventListener('keyup', (e) => {
      if (e.code === 'KeyU') {
        this.uPressed = false;
      }
    });
  }
  setupHandItemEditor() {
    // Create the hand item position/rotation editor HTML
    const editorHtml = `
      <div id="handItemEditor" style="display: none; position: fixed; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.8); padding: 15px; border-radius: 8px; color: white; font-family: monospace; font-size: 12px; z-index: 1000; width: 280px;">
        <div style="color: #4CAF50; font-weight: bold; margin-bottom: 10px; text-align: center;">Hand Item Editor</div>
        
        <div style="margin-bottom: 15px;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Position</div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #ff6b6b; width: 20px;">X:</label>
            <input type="range" id="handPosX" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosXVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #4ecdc4; width: 20px;">Y:</label>
            <input type="range" id="handPosY" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosYVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #45b7d1; width: 20px;">Z:</label>
            <input type="range" id="handPosZ" min="-0.5" max="0.5" step="0.01" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handPosZVal" step="0.01" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
        </div>
        <div style="margin-bottom: 15px;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Rotation (degrees)</div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #ff6b6b; width: 20px;">X:</label>
            <input type="range" id="handRotX" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotXVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #4ecdc4; width: 20px;">Y:</label>
            <input type="range" id="handRotY" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotYVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <label style="color: #45b7d1; width: 20px;">Z:</label>
            <input type="range" id="handRotZ" min="-180" max="180" step="5" value="0" style="flex: 1; margin: 0 8px;">
            <input type="number" id="handRotZVal" step="5" value="0" style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid #666; color: white; padding: 2px; font-size: 11px;">
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button id="resetHandTransform" style="flex: 1; background: #ff4757; border: none; color: white; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">Reset</button>
          <button id="copyHandTransform" style="flex: 1; background: #2ed573; border: none; color: white; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">Copy Values</button>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Health Debug</div>
          <div style="display: flex; gap: 8px;">
            <button id="takeDamageBtn" style="flex: 1; background: #e74c3c; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Take Damage</button>
            <button id="healBtn" style="flex: 1; background: #27ae60; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Heal</button>
          </div>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
          <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Item Debug</div>
          <div style="display: flex; gap: 8px;">
            <button id="giveWoodBtn" style="flex: 1; background: #8B4513; border: none; color: white; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 11px;">Give 9,999,999 Wood</button>
          </div>
        </div>
      </div>
    `;
    // Add editor to page if it doesn't exist
    if (!this.gi('handItemEditor')) {
      document.body.insertAdjacentHTML('beforeend', editorHtml);
      this.setupHandItemEditorListeners();
    }
  }
  setupHandItemEditorListeners() {
    // Position controls
    ['X', 'Y', 'Z'].forEach(axis => {
      const slider = this.gi(`handPos${axis}`);
      const input = this.gi(`handPos${axis}Val`);
      
      if (slider && input) {
        const updatePosition = (value: string) => {
          slider.value = value;
          input.value = value;
          this.updateHandItemTransform();
        };
        
        slider.addEventListener('input', (e) => updatePosition((e.target as HTMLInputElement).value));
        input.addEventListener('input', (e) => updatePosition((e.target as HTMLInputElement).value));
      }
    });
    // Rotation controls
    ['X', 'Y', 'Z'].forEach(axis => {
      const slider = this.gi(`handRot${axis}`);
      const input = this.gi(`handRot${axis}Val`);
      
      if (slider && input) {
        const updateRotation = (value: string) => {
          slider.value = value;
          input.value = value;
          this.updateHandItemTransform();
        };
        
        slider.addEventListener('input', (e) => updateRotation((e.target as HTMLInputElement).value));
        input.addEventListener('input', (e) => updateRotation((e.target as HTMLInputElement).value));
      }
    });
    // Reset button
    const resetBtn = this.gi('resetHandTransform');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Reset all values to defaults
        ['X', 'Y', 'Z'].forEach(axis => {
          this.gi(`handPos${axis}`).value = '0';
          this.gi(`handPos${axis}Val`).value = '0';
          this.gi(`handRot${axis}`).value = '0';
          this.gi(`handRot${axis}Val`).value = '0';
        });
        this.updateHandItemTransform();
      });
    }
    // Copy button
    const copyBtn = this.gi('copyHandTransform');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const posX = this.gi('handPosXVal').value;
        const posY = this.gi('handPosYVal').value;
        const posZ = this.gi('handPosZVal').value;
        const rotX = this.gi('handRotXVal').value;
        const rotY = this.gi('handRotYVal').value;
        const rotZ = this.gi('handRotZVal').value;
        
        const copyText = `Position: (${posX}, ${posY}, ${posZ})\nRotation: (${rotX}°, ${rotY}°, ${rotZ}°)`;
        navigator.clipboard.writeText(copyText).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => copyBtn.textContent = 'Copy Values', 1000);
        });
      });
    }
    
    // Health debug buttons
    const takeDamageBtn = this.gi('takeDamageBtn');
    const healBtn = this.gi('healBtn');
    
    if (takeDamageBtn) {
      takeDamageBtn.addEventListener('click', () => {
        if (this.game.healthSystem) {
          this.game.healthSystem.takeDamage(1);
          console.log('Debug: Took 1 damage');
        }
      });
    }
    
    if (healBtn) {
      healBtn.addEventListener('click', () => {
        if (this.game.healthSystem) {
          this.game.healthSystem.heal(1);
          console.log('Debug: Healed 1 heart');
        }
      });
    }
    
    // Wood cheat button
    const giveWoodBtn = this.gi('giveWoodBtn');
    
    if (giveWoodBtn) {
      giveWoodBtn.addEventListener('click', () => {
        if (this.game.inventory && this.game.itemRegistry) {
          const woodItem = this.game.itemRegistry['wood'];
          if (woodItem) {
            this.game.inventory.addItem(woodItem, 9999999);
            console.log('Debug: Added 9,999,999 wood to inventory');
            giveWoodBtn.textContent = 'Wood Added!';
            setTimeout(() => giveWoodBtn.textContent = 'Give 9,999,999 Wood', 1000);
          } else {
            console.error('Wood item not found in item registry');
            giveWoodBtn.textContent = 'Failed!';
            setTimeout(() => giveWoodBtn.textContent = 'Give 9,999,999 Wood', 2000);
          }
        }
      });
    }
  }
  
  createStepVisual() {
    this.removeStepVisual(); // Remove existing first
    
    // Try to find player mesh from multiple possible paths
    let playerMesh = null;
    
    if (this.game.player?.mesh) {
      playerMesh = this.game.player.mesh;
    } else if (this.game.player) {
      playerMesh = this.game.player;
    } else if ((window as any).gameInstance?.player?.mesh) {
      playerMesh = (window as any).gameInstance.player.mesh;
    } else if ((window as any).gameInstance?.player) {
      playerMesh = (window as any).gameInstance.player;
    }
    
    if (!playerMesh) return;
    
    // Get step height from character controller
    let stepHeight = 0.5;
    
    if (this.game.player?.characterController) {
      stepHeight = this.game.player.characterController.stepHeight || 0.5;
    } else if (this.game.characterController) {
      stepHeight = this.game.characterController.stepHeight || 0.5;
    } else if ((window as any).gameInstance?.player?.characterController) {
      stepHeight = (window as any).gameInstance.player.characterController.stepHeight || 0.5;
    } else if ((window as any).gameInstance?.characterController) {
      stepHeight = (window as any).gameInstance.characterController.stepHeight || 0.5;
    }
    
    // Create step height indicator cylinder
    const geometry = new THREE.CylinderGeometry(0.6, 0.6, stepHeight, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    this.stepVisualMesh = new THREE.Mesh(geometry, material);
    this.stepVisualMesh.name = 'stepHeightVisual';
    
    // Position it at player's feet level
    this.stepVisualMesh.position.copy(playerMesh.position);
    this.stepVisualMesh.position.y += stepHeight / 2; // Center the cylinder at step height
    
    this.game.scene.add(this.stepVisualMesh);
    console.log(`Created step visual indicator: ${stepHeight}m`);
  }
  
  removeStepVisual() {
    if (this.stepVisualMesh) {
      this.game.scene.remove(this.stepVisualMesh);
      this.stepVisualMesh = null;
    }
  }
  
  updateStepVisual() {
    const showStepVisual = this.gi('showStepVisual');
    if (showStepVisual && showStepVisual.checked) {
      this.createStepVisual(); // Recreate with new height
    }
  }
  
  updateVisuals() {
    // Update step visual position to follow player
    if (this.stepVisualMesh) {
      let playerMesh = null;
      
      if (this.game.player?.mesh) {
        playerMesh = this.game.player.mesh;
      } else if (this.game.player) {
        playerMesh = this.game.player;
      } else if ((window as any).gameInstance?.player?.mesh) {
        playerMesh = (window as any).gameInstance.player.mesh;
      } else if ((window as any).gameInstance?.player) {
        playerMesh = (window as any).gameInstance.player;
      }
      
      if (playerMesh) {
        this.stepVisualMesh.position.copy(playerMesh.position);
        
        // Get current step height
        let stepHeight = 0.5;
        if (this.game.player?.characterController) {
          stepHeight = this.game.player.characterController.stepHeight || 0.5;
        } else if (this.game.characterController) {
          stepHeight = this.game.characterController.stepHeight || 0.5;
        } else if ((window as any).gameInstance?.player?.characterController) {
          stepHeight = (window as any).gameInstance.player.characterController.stepHeight || 0.5;
        } else if ((window as any).gameInstance?.characterController) {
          stepHeight = (window as any).gameInstance.characterController.stepHeight || 0.5;
        }
        
        this.stepVisualMesh.position.y += stepHeight / 2;
      }
    }
  }
  updateHandItemTransform() {
    const player = this.game.player;
    if (!player || !player.heldItemMesh) {
      return;
    }
    // Get current values from controls
    const posX = parseFloat(this.gi('handPosXVal').value);
    const posY = parseFloat(this.gi('handPosYVal').value);
    const posZ = parseFloat(this.gi('handPosZVal').value);
    const rotX = parseFloat(this.gi('handRotXVal').value) * Math.PI / 180;
    const rotY = parseFloat(this.gi('handRotYVal').value) * Math.PI / 180;
    const rotZ = parseFloat(this.gi('handRotZVal').value) * Math.PI / 180;
    // Apply transform to held item
    player.heldItemMesh.position.set(posX, posY, posZ);
    player.heldItemMesh.rotation.set(rotX, rotY, rotZ);
  }
  toggle() {
    this.isVisible = !this.isVisible;
    
    // Toggle debug UI elements visibility
    const debugElements = [
      'heldItemPosition',
      'playerPosition', 
      'playerHeightControl',
      'occupiedSlots',
      'handItemEditor'
    ];
    
    debugElements.forEach(id => {
      const element = this.gi(id);
      if (element) {
        element.style.display = this.isVisible ? 'block' : 'none';
      }
    });
    
    // Toggle collision system debug visualization
    if (this.game.collisionSystem) {
      if (this.isVisible) {
        this.game.collisionSystem.showDebugVisualization();
        this.game.collisionSystem.showPlayerColliderVisualization();
      } else {
        this.game.collisionSystem.hideDebugVisualization();
        this.game.collisionSystem.hidePlayerColliderVisualization();
      }
    }
    
    // Toggle building system debug indicators
    if (this.game.buildingSystem) {
      this.game.buildingSystem.toggleDebugIndicators();
    }
    
    // Toggle tree pivot debug dots
    if (this.isVisible) {
      this.showTreePivotDots();
    } else {
      this.hideTreePivotDots();
    }
    
    // Toggle dog detection range visualization
    if (this.isVisible) {
      this.showDogDetectionRange();
    } else {
      this.hideDogDetectionRange();
    }
    // Update hand item editor with current values when shown
    if (this.isVisible && this.game.player && this.game.player.heldItemMesh) {
      this.syncHandItemEditorValues();
    }
    
    console.log(`Debug UI ${this.isVisible ? 'shown' : 'hidden'}`);
  }
  syncHandItemEditorValues() {
    const player = this.game.player;
    if (!player || !player.heldItemMesh) return;
    const pos = player.heldItemMesh.position;
    const rot = player.heldItemMesh.rotation;
    // Update position sliders and inputs
    this.gi('handPosX').value = pos.x.toFixed(2);
    this.gi('handPosXVal').value = pos.x.toFixed(2);
    this.gi('handPosY').value = pos.y.toFixed(2);
    this.gi('handPosYVal').value = pos.y.toFixed(2);
    this.gi('handPosZ').value = pos.z.toFixed(2);
    this.gi('handPosZVal').value = pos.z.toFixed(2);
    // Update rotation sliders and inputs (convert to degrees)
    this.gi('handRotX').value = String(Math.round((rot.x * 180) / Math.PI));
    this.gi('handRotXVal').value = String(Math.round((rot.x * 180) / Math.PI));
    this.gi('handRotY').value = String(Math.round((rot.y * 180) / Math.PI));
    this.gi('handRotYVal').value = String(Math.round((rot.y * 180) / Math.PI));
    this.gi('handRotZ').value = String(Math.round((rot.z * 180) / Math.PI));
    this.gi('handRotZVal').value = String(Math.round((rot.z * 180) / Math.PI));
  }

  updateOccupiedSlotsDebug() {
    const occupiedSlotsElement = this.gi('occupiedSlotsList');
    if (!occupiedSlotsElement || !this.game.buildingSystem) return;
    
    // Check if debug UI is visible
    const debugContainer = this.gi('occupiedSlots');
    if (!debugContainer || debugContainer.style.display === 'none') return;
    
    const occupiedCells = Array.from(this.game.buildingSystem.occupiedCells) as string[];
    
    if (occupiedCells.length === 0) {
      occupiedSlotsElement.innerHTML = '<span style="color: #888;">None</span>';
    } else {
      // Sort cells for consistent display
      occupiedCells.sort();
      
      // Group cells by wall for better readability
      const wallGroups = new Map();
      occupiedCells.forEach((cellKey: string) => {
        const wall = this.game.buildingSystem.cellToWallMap.get(cellKey);
        if (wall) {
          const wallId = this.game.buildingSystem.builtWalls.indexOf(wall);
          if (!wallGroups.has(wallId)) {
            wallGroups.set(wallId, []);
          }
          wallGroups.get(wallId).push(cellKey);
        }
      });
      
      let html = '';
      let wallIndex = 0;
      for (const [wallId, cells] of wallGroups) {
        const wallColor = `hsl(${(wallIndex * 60) % 360}, 70%, 60%)`;
        html += `<div style="margin-bottom: 8px;">`;
        html += `<div style="color: ${wallColor}; font-weight: bold;">Wall ${wallId + 1}:</div>`;
        html += `<div style="margin-left: 10px; font-size: 11px;">`;
        cells.forEach((cellKey: string) => {
          html += `<div style="color: #ccc;">${cellKey}</div>`;
        });
        html += `</div></div>`;
        wallIndex++;
      }
      
      html += `<div style="margin-top: 10px; font-size: 11px; color: #888;">`;
      html += `Total: ${occupiedCells.length} slots`;
      html += `</div>`;
      
      occupiedSlotsElement.innerHTML = html;
    }
  }
  
  update() {
    // Update debug visualizations that need to track moving objects
    if (this.isVisible) {
      this.updateDogDetectionRange();
      // NOTE: this method is not defined on DebugUI (pre-existing latent bug); preserved as-is.
      (this as any).updateStepDetectionVisualization();
    }
  }
  
  showTreePivotDots() {
    this.hideTreePivotDots(); // Clear existing dots
    
    if (!this.game.environment || !this.game.environment.loadedTrees) {
      console.log('No loaded trees found for pivot visualization');
      return;
    }
    
    console.log(`Creating pivot dots for ${this.game.environment.loadedTrees.length} trees`);
    
    // Create a small sphere at each tree's pivot point
    this.game.environment.loadedTrees.forEach((treeData: any, index: number) => {
      const dotGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        transparent: false
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      
      // Position dot exactly at tree's pivot point
      dot.position.copy(treeData.mesh.position);
      dot.name = `treePivotDot_${index}`;
      
      this.treePivotDots.push(dot);
      this.game.scene.add(dot);
      
      console.log(`Tree ${index} pivot dot at (${dot.position.x.toFixed(1)}, ${dot.position.y.toFixed(1)}, ${dot.position.z.toFixed(1)})`);
    });
    
    console.log(`Created ${this.treePivotDots.length} tree pivot dots`);
  }
  hideTreePivotDots() {
    this.treePivotDots.forEach(dot => {
      this.game.scene.remove(dot);
    });
    this.treePivotDots = [];
  }
  
  showDogDetectionRange() {
    this.hideDogDetectionRange(); // Clear existing visualization
    
    if (!this.game.dogCompanion || !this.game.dogCompanion.mesh) {
      console.log('No dog companion found for detection range visualization');
      return;
    }
    
    console.log('Creating dog detection range visualization');
    
    // Create wireframe sphere to show detection range
    const detectionRadius = 150; // Same as in DogCompanion.js
    const rangeGeometry = new THREE.SphereGeometry(detectionRadius, 16, 12);
    const rangeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    this.dogDetectionRangeHelper = new THREE.Mesh(rangeGeometry, rangeMaterial);
    this.dogDetectionRangeHelper.name = 'dogDetectionRange';
    
    // Position it at the dog's location
    this.dogDetectionRangeHelper.position.copy(this.game.dogCompanion.mesh.position);
    
    this.game.scene.add(this.dogDetectionRangeHelper);
    
    console.log(`Dog detection range visualization created with radius: ${detectionRadius}`);
  }
  
  hideDogDetectionRange() {
    if (this.dogDetectionRangeHelper) {
      this.game.scene.remove(this.dogDetectionRangeHelper);
      this.dogDetectionRangeHelper = null;
    }
  }
  
  updateDogDetectionRange() {
    // Update the position of the detection range helper to follow the dog
    if (this.dogDetectionRangeHelper && this.game.dogCompanion && this.game.dogCompanion.mesh) {
      this.dogDetectionRangeHelper.position.copy(this.game.dogCompanion.mesh.position);
    }
  }
  
  destroy() {
    this.hideTreePivotDots();
    this.hideDogDetectionRange();
    // NOTE: this method is not defined on DebugUI (pre-existing latent bug); preserved as-is.
    (this as any).hideStepDetectionVisualization();
    console.log('Debug UI destroyed');
  }
}