import * as THREE from 'three';
import { BuildingResourceManager } from './BuildingResourceManager.js';
import { BuildableObjectsRegistry } from './BuildableObjectsRegistry.js';
import { BuildingSaveManager } from './BuildingSaveManager.js';
import { BuildingAnimations } from './BuildingAnimations.js';
import { BuildHUD } from './BuildHUD.js';
import { BuildPreview } from './BuildPreview.js';
import { PlacementController } from './PlacementController.js';
import { BreakController } from './BreakController.js';
import { BuildInput } from './BuildInput.js';
import { BuildTracking } from './BuildTracking.js';
import { LevelManager } from './LevelManager.js';
import type { Inventory } from './inventory.js';
import type { CollisionSystem } from './CollisionSystem.js';
import type { BuildableObject } from './BuildableObjectsRegistry.js';
import type { Vec3, BuildingState } from '@cozy/shared';
import { buildingFootprintCells, buildingGridCoord } from '@cozy/shared';

/** Payload Game needs to emit a place_building command (multiplayer). */
export interface PlaceBuildingRequest {
  registryType: string;
  position: Vec3;
  rotation: Vec3;
  level: number;
}

export class BuildingSystem {
  scene: THREE.Scene;
  camera: THREE.Camera;
  collisionSystem: CollisionSystem;
  inventory: Inventory | null;
  objectsRegistry: BuildableObjectsRegistry;
  buildableObjects: Record<string, BuildableObject>;
  resourceManager: BuildingResourceManager;
  saveManager: BuildingSaveManager;
  levelManager: LevelManager;
  gridSize: number;
  gridExtent: number;
  isBuilding: boolean;
  previewMesh: THREE.Object3D | null;
  wallMesh: THREE.Object3D | null;
  tracking: BuildTracking;
  preview: BuildPreview;
  placement: PlacementController;
  demolition: BreakController;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  buildingMode: string;
  selectedBuildObject: string;
  currentRotation: number;
  rotationSteps: number[];
  currentRotationIndex: number;
  debugIndicators: Map<string, any>;
  showDebugIndicators: boolean;
  animations: BuildingAnimations;
  player: any;
  itemRegistry!: any;
  gridHelper!: any;
  hud!: BuildHUD;
  input: BuildInput;
  /**
   * In multiplayer, Game sets this to emit a place_building command. When present,
   * placement is server-authoritative: emit the command and let the confirmed event
   * materialize the building, instead of building locally. Null = local mode.
   */
  requestPlace: ((cmd: PlaceBuildingRequest) => void) | null = null;
  /**
   * In multiplayer, Game sets this to emit a remove_building command. When present,
   * demolition is server-authoritative: emit the command and let the confirmed
   * building_removed event remove the building on every client, instead of breaking it
   * locally. Null = local mode (the wall is broken directly, with the resource refund).
   */
  requestRemove: ((networkId: number) => void) | null = null;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    collisionSystem: CollisionSystem,
    inventory: Inventory | null = null
  ) {
    this.scene = scene;
    this.camera = camera;
    this.collisionSystem = collisionSystem;
    this.inventory = inventory; // Reference to player inventory
    
    // Initialize buildable objects registry
    this.objectsRegistry = new BuildableObjectsRegistry();
    this.buildableObjects = {}; // Will be populated after loading
    
    // Initialize resource manager (will be updated after objects load)
    this.resourceManager = new BuildingResourceManager(this.buildableObjects, inventory);
    
    // Initialize save manager
    this.saveManager = new BuildingSaveManager(this);
    
    // Initialize level manager
    this.levelManager = new LevelManager(scene, 2.0, 50); // gridSize=2.0, gridExtent=50

    // Single write path for building bookkeeping: coordinates builtWalls (here), per-level
    // occupancy + cell->wall (LevelManager) and by-type instances (registry).
    this.tracking = new BuildTracking(this.levelManager, this.objectsRegistry);

    // Grid settings (delegated to LevelManager)
    this.gridSize = this.levelManager.gridSize;
    this.gridExtent = this.levelManager.gridExtent;
    
    // State
    this.isBuilding = false;
    this.previewMesh = null;
    this.wallMesh = null; // Template wall mesh
    // builtWalls now lives in BuildTracking (see this.tracking), exposed via a getter.
    // this.gridHelper = null; // REMOVED - Grid is now fully managed by LevelManager
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Tool state
    this.buildingMode = 'build'; // 'build' or 'delete'
    
    // Build selection system - will be populated from registry
    this.selectedBuildObject = 'wall'; // Currently selected object to build
    
    // Rotation state
    this.currentRotation = 0; // Current rotation in radians (0, π/2, π, 3π/2)
    this.rotationSteps = [0, Math.PI/2, Math.PI, 3*Math.PI/2]; // 90-degree increments
    this.currentRotationIndex = 0;
    
    // Visual debug indicators
    this.debugIndicators = new Map(); // Maps cell keys to visual indicators
    this.showDebugIndicators = false;
    
    // Animation system: placement/destruction tweens + particle effects, owning the
    // "currently animating" set and the live particle systems.
    this.animations = new BuildingAnimations(this.scene);
    // DOM/HUD: build menu, mode banner, floating text (delegated to BuildHUD).
    this.hud = new BuildHUD(this);
    // Build-mode preview ghost (placement/break highlight), delegated to BuildPreview.
    this.preview = new BuildPreview(this);
    // Placement actions (local build + network materialize), delegated to PlacementController.
    this.placement = new PlacementController(this);
    // Demolition actions (delete-mode break + network removal), delegated to BreakController.
    this.demolition = new BreakController(this);
    // Keyboard/mouse input for build mode, delegated to BuildInput.
    this.input = new BuildInput(this);

    // Player reference for grid following
    this.player = null;
    
    this.init();
  }
  
async init() {
    await this.loadBuildableObjects();
    // this.createGridHelper(); // REMOVED - Now handled by LevelManager
    
    // Initialize level manager before setting up event listeners
    this.levelManager.initialize();
    
    // Initialize level references after level manager is ready
    this.updateLevelReferences();
    
    this.input.setupEventListeners();
  }
  
  async loadBuildableObjects() {
    // Load all buildable objects from registry
    this.buildableObjects = await this.objectsRegistry.loadAllModels();
    
    // Update resource manager with loaded objects
    this.resourceManager = new BuildingResourceManager(this.buildableObjects, this.inventory);
    
    // Set legacy wallMesh for backward compatibility
    this.wallMesh = this.buildableObjects.wall?.mesh || null;
    
    console.log('BuildingSystem: All buildable objects loaded from registry');
  }
  
  // Removed initializeLevelSystem - now handled by LevelManager
  
  createLevelGrid(level: number) {
    // Delegate to LevelManager
    this.levelManager.createLevelGrid(level);
  }
  
  getLevelY(level: number) {
    // Delegate to LevelManager
    return this.levelManager.getLevelY(level);
  }
  
  switchToLevel(newLevel: number) {
    // Delegate to LevelManager
    const success = this.levelManager.switchToLevel(newLevel);
    
    if (success) {
      // Clear current preview to force recreation at new level
      if (this.previewMesh) {
        this.scene.remove(this.previewMesh);
        this.previewMesh = null;
      }
      
      // Update occupied cells and cellToWallMap references to current level
      this.updateLevelReferences();
      
      // The legacy gridHelper has been removed. LevelManager handles its own grid's position and visibility.
    }
    
    // Explicitly update grid visibility to show the new level's grid
    this.updateGridVisibility();
    
    return success;
  }
  
  updateGridVisibility() {
    // Delegate to LevelManager
    this.levelManager.updateGridVisibility(this.isBuilding);
  }
  
  updateLevelReferences() {
    // No-op: occupiedCells/cellToWallMap are now getters that always read the current
    // level's maps from LevelManager, so there is nothing to re-point on a level switch.
    // Kept as a method so its existing callers (init, switchToLevel) don't need touching.
  }

  /** The placed building meshes (delegates to BuildTracking; the single owner). */
  get builtWalls(): THREE.Object3D[] {
    return this.tracking.builtWalls;
  }

  /** Current level's occupied cells (live view; LevelManager owns it). */
  get occupiedCells(): Set<string> {
    return this.levelManager.getCurrentLevelOccupiedCells();
  }

  /** Current level's cell->wall map (live view; LevelManager owns it). */
  get cellToWallMap(): Map<string, THREE.Object3D> {
    return this.levelManager.getCurrentLevelCellToWallMap();
  }

  getCurrentLevelOccupiedCells() {
    // Delegate to LevelManager
    return this.levelManager.getCurrentLevelOccupiedCells();
  }
  
  getCurrentLevelCellToWallMap() {
    // Delegate to LevelManager
    return this.levelManager.getCurrentLevelCellToWallMap();
  }
  
  // Method to get level information
  getCurrentLevel() {
    // Delegate to LevelManager
    return this.levelManager.getCurrentLevel();
  }
  
  getCurrentLevelY() {
    // Delegate to LevelManager
    return this.levelManager.getCurrentLevelY();
  }
  
  getLevelInfo() {
    // Delegate to LevelManager
    return this.levelManager.getLevelInfo();
  }
  // Method to set player reference
  setPlayer(player: any) {
    this.player = player;
  }
  // Update grid position to follow player
  updateGridPosition() {
    // This function is now OBSOLETE as the LevelManager handles grid creation and positioning.
    // The player reference is passed to LevelManager, which can handle following if needed.
    // Kept here to avoid breaking calls, but it does nothing.
  }
  
  createGridHelper() {
    // This function is now OBSOLETE. Grid creation is entirely handled by the LevelManager.
  }
  
  // Input lives in BuildInput; thin forwarders keep the cross-callers (game.ts touch input,
  // BuildPreview's cursor-over-UI check) working unchanged.
  updateMousePosition(event: MouseEvent) {
    this.input.updateMousePosition(event);
  }

  isCursorOverUI(event: { clientX: number; clientY: number }) {
    return this.input.isCursorOverUI(event);
  }

  // Build-mode preview ghost lives in BuildPreview; thin forwarder keeps the call sites
  // (gameLoop, input adapters, mode/selection changes) working unchanged.
  updatePreview() {
    this.preview.updatePreview();
  }

  findBreakableParent(object: THREE.Object3D) {
    // For built walls, find the wall object in our builtWalls array
    let current: THREE.Object3D | null = object;
    while (current && current !== this.scene) {
      // Check if this object is in our built walls array
      if (this.builtWalls.includes(current)) {
        return current;
      }
      current = current.parent;
    }
    return null;
  }
  
  getOccupiedCells(position: THREE.Vector3, rotation: number): string[] {
    // The footprint math lives in @cozy/shared so this preview matches exactly what
    // the server validates and reserves (no client/server drift on conflicts). We feed
    // it the registry footprint; the server feeds its catalog footprint (kept equal).
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    const cellSize = currentBuildObject ? currentBuildObject.cellSize : 3.5;
    const footprint =
      typeof cellSize === 'object' && cellSize.width && cellSize.height
        ? { width: cellSize.width, height: cellSize.height }
        : { width: cellSize as number, height: 1 };
    // Level 0 here: cell keys are per-level strings ("gx,gz"); the level is tracked
    // separately by LevelManager, so the string form needs only the grid coords.
    return buildingFootprintCells(
      footprint,
      { x: position.x, y: position.y, z: position.z },
      rotation,
      0,
      this.gridSize
    ).map((c) => `${c.gx},${c.gz}`);
  }

  // Placement lives in PlacementController; thin forwarder keeps the click-handler caller.
  buildWall() {
    this.placement.buildWall();
  }

  rotateWall() {
    // Cycle through rotation steps
    this.currentRotationIndex = (this.currentRotationIndex + 1) % this.rotationSteps.length;
    this.currentRotation = this.rotationSteps[this.currentRotationIndex];
    
    console.log(`Wall rotated to ${(this.currentRotation * 180 / Math.PI).toFixed(0)} degrees`);
    
    // Force immediate preview update with new rotation
    if (this.isBuilding) {
      this.updatePreview();
    }
  }
  
  toggleBuildingTool() {
    const previousMode = this.buildingMode;
    this.buildingMode = this.buildingMode === 'build' ? 'delete' : 'build';
    
    // If switching from delete to build mode, refresh preview to show selected object
    if (previousMode === 'delete' && this.buildingMode === 'build') {
      // Remove existing preview to force recreation with selected build object
      if (this.previewMesh) {
        this.scene.remove(this.previewMesh);
        this.previewMesh = null;
      }
      
      // Force immediate preview creation for the selected build object
      this.updatePreview();
    } else {
      // Normal preview update for other mode switches
      this.updatePreview();
    }
    
    // Update UI to reflect current mode
    this.updateBuildingUI();
    
    console.log(`Switched to ${this.buildingMode} mode`);
  }
  
  selectBuildObject(objectKey: string) {
    this.selectedBuildObject = objectKey;
    
    // Switch to build mode if currently in delete mode
    if (this.buildingMode === 'delete') {
      this.buildingMode = 'build';
      console.log('Automatically switched to build mode for object selection');
    }
    
    // Remove current preview to force recreation with new object
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
    
    // Refresh the selection screen to update visual selection
    this.showSelectionScreen();
    
    // Force immediate preview update with new object
    if (this.isBuilding) {
      this.updatePreview();
    }
    
    // Update the UI text to reflect new selection
    this.updateBuildingUI();
    
    console.log(`Selected build object: ${this.buildableObjects[objectKey].name}`);
  }

  // Demolition lives in BreakController; thin forwarder keeps the delete-mode click caller.
  deleteWall() {
    this.demolition.deleteWall();
  }

  toggleBuildingMode() {
    if (this.isBuilding) {
      this.exitBuildingMode();
    } else {
      this.enterBuildingMode();
    }
  }
  
  enterBuildingMode() {
    console.log('Entering building mode...');
    this.isBuilding = true;
    
    // Default to ground level (level 0) every time build mode is entered
    // Default to ground level (level 0) every time build mode is entered
    this.switchToLevel(0);
    
    // Remove existing preview to force recreation with current object
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
    
    // Force immediate preview creation and update
    this.updatePreview();
    
    // Show building UI
    this.showBuildingUI();
    
    // Always show selection screen when entering build mode
    this.showSelectionScreen();
    
    console.log('Entered building mode - Press V to exit, Escape to cancel');
    console.log('Building mode state:', this.isBuilding);
    console.log('Current level:', this.levelManager.getCurrentLevel());
    console.log('Current level Y:', this.getCurrentLevelY());
  }
  
  exitBuildingMode() {
    this.isBuilding = false;
    // Hide all level grids
    this.updateGridVisibility();
    
    // Hide preview
    if (this.previewMesh) {
      this.previewMesh.visible = false;
    }
    
    // Hide resource warning when exiting building mode
    this.resourceManager.hideResourceWarning();
    
    // Hide building UI
    this.hideBuildingUI();
    
    // Hide selection screen when exiting build mode
    this.hideSelectionScreen();
    
    console.log('Exited building mode');
  }
  
  /**
   * Materialize a server-confirmed building (multiplayer onBuildingPlaced). Reuses
   * the save-restore path, stamping the stable networkId so it can be matched later.
   * Cell-occupancy tracking is approximate for buildings on a non-current level
   * (the mesh position is exact); the server remains authoritative for conflicts.
   */
  materializeNetworkBuilding(building: BuildingState): void {
    this.placement.materializeNetworkBuilding(building);
  }

  /**
   * Remove a server-confirmed building by networkId (multiplayer onBuildingRemoved).
   * Routes both the live demolition path (a peer or this client ran remove_building) and
   * reconnect snapshots through here. The exact inverse of materializeNetworkBuilding ->
   * restoreBuilding, which adds to builtWalls, cellToWallMap/occupiedCells AND the
   * objectsRegistry — so all three must be undone, or the registry leaks a freed mesh
   * (skewing save serialization and per-type counts).
   */
  removeNetworkBuilding(networkId: number): void {
    this.demolition.removeNetworkBuilding(networkId);
  }

  // Clean up method
  destroy() {
    this.exitBuildingMode();
    
    // Remove input listeners (keyboard + mouse)
    this.input.destroy();

    // Remove built walls
    this.builtWalls.forEach(wall => {
      this.scene.remove(wall);
      if (this.collisionSystem) {
        this.collisionSystem.removeCollider(wall);
      }
    });
    
    // Clear all tracking data through the single write path.
    this.tracking.clear();

    // Tear down animations + particle systems (clears the pool and any live particles)
    this.animations.destroy();
    
    // Clean up preview
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
    }
    
    // Clean up grid helper (no longer exists in this class)
    // if (this.gridHelper) {
    //   this.scene.remove(this.gridHelper);
    // }
    
    // Clean up UI
    this.hideBuildingUI();
    const buildingText = document.getElementById('buildingText');
    if (buildingText) {
      buildingText.remove();
    }
  }
  
  createDebugIndicator(cellKey: string) {
    // Parse cell key to get grid coordinates
    const [gridX, gridZ] = cellKey.split(',').map(Number);
    
    // Convert grid coordinates to world position
    const worldX = gridX * this.gridSize;
    const worldZ = gridZ * this.gridSize;
    
    // Create a small colored cube to indicate occupied cell
    const geometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xff4444, // Red color
      transparent: true,
      opacity: 0.7
    });
    
    const indicator = new THREE.Mesh(geometry, material);
    indicator.position.set(worldX, 6.1, worldZ); // Slightly above ground
    
    // Add to scene and track it
    this.scene.add(indicator);
    this.debugIndicators.set(cellKey, indicator);
  }
  
  removeDebugIndicator(cellKey: string) {
    const indicator = this.debugIndicators.get(cellKey);
    if (indicator) {
      this.scene.remove(indicator);
      this.debugIndicators.delete(cellKey);
    }
  }
  
  toggleDebugIndicators() {
    this.showDebugIndicators = !this.showDebugIndicators;
    
    if (this.showDebugIndicators) {
      // Create indicators for all currently occupied cells on current level
      const currentLevelCells = this.levelManager.getCurrentLevelOccupiedCells();
      currentLevelCells.forEach(cellKey => {
        this.createDebugIndicator(cellKey);
      });
      console.log(`Visual debug indicators enabled for level ${this.levelManager.getCurrentLevel()}`);
    } else {
      // Remove all indicators
      this.debugIndicators.forEach((indicator, cellKey) => {
        this.scene.remove(indicator);
      });
      this.debugIndicators.clear();
      console.log('Visual debug indicators disabled');
    }
  }
  
  checkPhysicalIntersection(position: THREE.Vector3, rotation: number) {
    // Check if the cells this object would occupy conflict with existing objects on current level only
    const newObjectCells = this.getOccupiedCells(position, rotation);
    
    // Check each cell this object would occupy against current level's occupied cells
    for (const newCellKey of newObjectCells) {
      if (this.levelManager.isCellOccupiedOnCurrentLevel(newCellKey)) {
        console.log(`❌ Cell ${newCellKey} is already occupied on current level ${this.levelManager.getCurrentLevel()}`);
        return true;
      }
    }
    
    return false;
  }

  checkPlayerFootprintIntersection(position: THREE.Vector3, rotation: number) {
    const playerMesh = this.player?.mesh;
    if (!playerMesh) return false;

    // Only block on the active build level. This prevents a mobile centre-screen
    // placement from dropping a large floor/foundation through the local player and
    // swallowing the camera, while still allowing future vertical building work on
    // other levels.
    const playerPosition = playerMesh.position;
    const currentLevelY = this.getCurrentLevelY();
    if (Math.abs(playerPosition.y - currentLevelY) > this.gridSize * 1.5) return false;

    const gridX = Math.round((playerPosition.x + 0.001) / this.gridSize);
    const gridZ = Math.round((playerPosition.z + 0.001) / this.gridSize);
    const blockedPlayerCells = new Set<string>();

    // Block the player's cell plus adjacent cells. Floors are multi-cell objects;
    // the small buffer gives the character/camera room and avoids near-edge clips.
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        blockedPlayerCells.add(`${gridX + dx},${gridZ + dz}`);
      }
    }

    return this.getOccupiedCells(position, rotation).some((cellKey) => blockedPlayerCells.has(cellKey));
  }
  
  // Method to set inventory reference
  setInventory(inventory: Inventory | null) {
    this.inventory = inventory;
  }
  
  // Method to set item registry reference for resource returns
  setItemRegistry(itemRegistry: any) {
    this.itemRegistry = itemRegistry;
  }
  
  // --- HUD delegation: the build-menu/banner/floating-text DOM lives in BuildHUD.
  // Thin forwarders keep the existing call sites (internal + game.ts touch controls) working.
  showSelectionScreen() {
    this.hud.showSelectionScreen();
  }
  hideSelectionScreen() {
    this.hud.hideSelectionScreen();
  }
  showBuildingUI() {
    this.hud.showBuildingUI();
  }
  updateBuildingUI() {
    this.hud.updateBuildingUI();
  }
  hideBuildingUI() {
    this.hud.hideBuildingUI();
  }
  showFloatingText(text: string, worldPosition: THREE.Vector3, color = '#fff') {
    this.hud.showFloatingText(text, worldPosition, color);
  }

  // Getter methods to access built objects by type through the registry
  getBuiltObjectsByType(objectType: string) {
    return this.objectsRegistry.getBuiltObjectsByType(objectType);
  }
  
  getAllBuiltObjects() {
    return this.objectsRegistry.getAllBuiltObjects();
  }
  
  getBuiltObjectCount(objectType: string) {
    return this.objectsRegistry.getBuiltObjectCount(objectType);
  }
  
  // Get all built walls (legacy method for backward compatibility)
  getBuiltWalls() {
    return this.builtWalls;
  }
  
  // Get all built objects for saving (delegate to save manager)
  getAllBuiltObjectsForSaving() {
    return this.saveManager.getAllBuiltObjectsForSaving();
  }
  
  // Get specific built object types with convenience methods
  getBuiltRegularWalls() {
    return this.getBuiltObjectsByType('wall');
  }
  
  getBuiltSpikedWalls() {
    return this.getBuiltObjectsByType('spikedWall');
  }
}
