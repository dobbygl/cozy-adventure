import * as THREE from 'three';
import { WallIntersectionHelper } from './WallIntersectionHelper.js';
import { BuildingResourceManager } from './BuildingResourceManager.js';
import { BuildableObjectsRegistry } from './BuildableObjectsRegistry.js';
import { BuildingSaveManager } from './BuildingSaveManager.js';
import { LevelManager } from './LevelManager.js';
import type { Inventory, Item } from './inventory.js';
import type { CollisionSystem } from './CollisionSystem.js';
import type { BuildableObject } from './BuildableObjectsRegistry.js';
import type { Vec3, BuildingCell, BuildingState } from '@cozy/shared';

/** Payload Game needs to emit a place_building command (multiplayer). */
export interface PlaceBuildingRequest {
  registryType: string;
  position: Vec3;
  rotation: Vec3;
  level: number;
  cell: BuildingCell;
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
  builtWalls: THREE.Object3D[];
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  buildingMode: string;
  selectedBuildObject: string;
  wallCost: { wood: number };
  currentRotation: number;
  rotationSteps: number[];
  currentRotationIndex: number;
  debugIndicators: Map<string, any>;
  showDebugIndicators: boolean;
  animatingWalls: Set<THREE.Object3D>;
  particleSystems: Map<any, any>;
  player: any;
  // Assigned during init()/updateLevelReferences() or in event handlers, not the constructor.
  occupiedCells!: Set<string>;
  cellToWallMap!: Map<string, THREE.Object3D>;
  itemRegistry!: any;
  gridHelper!: any;
  selectionPreviews!: any;
  keydownHandler!: (e: KeyboardEvent) => void;
  keyupHandler!: (e: KeyboardEvent) => void;
  selectionScreenKeyHandler: ((e: KeyboardEvent) => void) | null = null;
  cKeyPressed = false;
  rKeyPressed = false;
  vKeyPressed = false;
  xKeyPressed = false;
  /**
   * In multiplayer, Game sets this to emit a place_building command. When present,
   * placement is server-authoritative: emit the command and let the confirmed event
   * materialize the building, instead of building locally. Null = local mode.
   */
  requestPlace: ((cmd: PlaceBuildingRequest) => void) | null = null;

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
    
    // Grid settings (delegated to LevelManager)
    this.gridSize = this.levelManager.gridSize;
    this.gridExtent = this.levelManager.gridExtent;
    
    // State
    this.isBuilding = false;
    this.previewMesh = null;
    this.wallMesh = null; // Template wall mesh
    this.builtWalls = []; // Array to track built walls
    // this.gridHelper = null; // REMOVED - Grid is now fully managed by LevelManager
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Tool state
    this.buildingMode = 'build'; // 'build' or 'delete'
    
    // Build selection system - will be populated from registry
    this.selectedBuildObject = 'wall'; // Currently selected object to build
    
    // Legacy support - will be removed later
    this.wallCost = {
      wood: 10 // Each wall costs 10 wood
    };
    
    // Rotation state
    this.currentRotation = 0; // Current rotation in radians (0, π/2, π, 3π/2)
    this.rotationSteps = [0, Math.PI/2, Math.PI, 3*Math.PI/2]; // 90-degree increments
    this.currentRotationIndex = 0;
    
    // Visual debug indicators
    this.debugIndicators = new Map(); // Maps cell keys to visual indicators
    this.showDebugIndicators = false;
    
    // Animation system
    this.animatingWalls = new Set(); // Track walls currently animating
    this.particleSystems = new Map(); // Maps walls to their particle systems
    
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
    
    this.setupEventListeners();
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
    // Update legacy references to point to current level data
    this.occupiedCells = this.getCurrentLevelOccupiedCells();
    this.cellToWallMap = this.getCurrentLevelCellToWallMap();
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
  
  setupEventListeners() {
    // Mouse move for preview
    window.addEventListener('mousemove', (event) => {
      if (this.isBuilding) {
        this.updateMousePosition(event);
        this.updatePreview();
        // Always update cursor warning position if showing
        this.updateCursorWarningPosition();
      }
    });
    
    // Click to build or delete
    window.addEventListener('click', (event) => {
      if (this.isBuilding && !this.isCursorOverUI(event)) {
        if (this.buildingMode === 'build') {
          this.buildWall();
        } else if (this.buildingMode === 'delete') {
          this.deleteWall();
        }
      }
    });
    
    // Key state tracking to prevent rapid toggling
    this.vKeyPressed = false;
    this.rKeyPressed = false;
    this.xKeyPressed = false;
    this.cKeyPressed = false;
    
    // Toggle building mode with V key (changed from B to avoid conflict with backpack)
    this.keydownHandler = (event) => {
      if (event.code === 'KeyV' && !this.vKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.vKeyPressed = true;
        console.log('V key pressed - toggling building mode, current state:', this.isBuilding);
        this.toggleBuildingMode();
      }
      
      // Rotate wall with R key (only in building mode)
      if (event.code === 'KeyR' && this.isBuilding && !this.rKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.rKeyPressed = true;
        this.rotateWall();
      }
      
      // Toggle between build and delete mode with X key
      if (event.code === 'KeyX' && this.isBuilding && !this.xKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.xKeyPressed = true;
        this.toggleBuildingTool();
      }
      
      // C key now just focuses the selection screen (since it's always open)
      if (event.code === 'KeyC' && this.isBuilding && this.buildingMode === 'build' && !this.cKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.cKeyPressed = true;
        // Selection screen is already open, just ensure it's visible
        this.showSelectionScreen();
      }
      
      // Cancel building with Escape
      if (event.code === 'Escape' && this.isBuilding) {
        event.preventDefault();
        event.stopPropagation();
        this.exitBuildingMode();
      }
    };
    
    this.keyupHandler = (event) => {
      if (event.code === 'KeyV') {
        this.vKeyPressed = false;
      }
      if (event.code === 'KeyR') {
        this.rKeyPressed = false;
      }
      if (event.code === 'KeyX') {
        this.xKeyPressed = false;
      }
      if (event.code === 'KeyC') {
        this.cKeyPressed = false;
      }
    };
    
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
    console.log('Building system event listeners set up');
  }
  
  updateMousePosition(event: MouseEvent) {
    // Convert mouse position to normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  isCursorOverUI(event: { clientX: number; clientY: number }) {
    // Get the element directly under the cursor
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
    if (!elementUnderCursor) return false;
    // Check if cursor is over any UI elements
    const uiSelectors = [
      '#buildingUI',
      '#selectionScreen', 
      '#instructions',
      '#compass',
      '#heldItemPosition',
      '#playerPosition',
      '#playerHeightControl',
      '#occupiedSlots',
      '#inventoryContainer',
      '#resourceWarning'
    ];
    
    // Add inventory-specific selectors
    const inventorySelectors = [
      '.inventory-ui',
      '.hotbar',
      '.hotbar-slot',
      '.backpack-overlay',
      '.backpack-container',
      '.inventory-slot',
      '.item-icon',
      '.item-quantity',
      '.close-button'
    ];
    
    const allSelectors = [...uiSelectors, ...inventorySelectors];
    // Check if the element or any of its parents match UI selectors
    let currentElement: HTMLElement | null = elementUnderCursor as HTMLElement;
    while (currentElement && currentElement !== document.body) {
      // Check by ID
      if (currentElement.id) {
        for (const selector of allSelectors) {
          if (selector.startsWith('#') && currentElement.id === selector.substring(1)) {
            return true;
          }
        }
      }
      
      // Check by class names
      if (currentElement.classList) {
        for (const selector of allSelectors) {
          if (selector.startsWith('.')) {
            const className = selector.substring(1);
            if (currentElement.classList.contains(className)) {
              return true;
            }
          }
        }
      }
      // Additional check for UI-specific attributes and properties
      if (currentElement.classList) {
        const additionalUIClasses = [
          'object-card', 
          'ui-element',
          'dragging',
          'drag-over',
          'selected',
          'slot-number',
          'section-title',
          'backpack-header',
          'backpack-title',
          'inventory-sections',
          'hotbar-section',
          'backpack-grid'
        ];
        
        for (const uiClass of additionalUIClasses) {
          if (currentElement.classList.contains(uiClass)) {
            return true;
          }
        }
      }
      // Check for inventory-specific data attributes
      if (currentElement.getAttribute) {
        // Check for inventory data attributes
        if (currentElement.getAttribute('data-container') || 
            currentElement.getAttribute('data-index') ||
            currentElement.getAttribute('data-ui') === 'true' ||
            Number(currentElement.style.zIndex) > 100) {
          return true;
        }
      }
      
      // Check if element is part of inventory system by looking for inventory-related parent
      if (currentElement.closest && (
          currentElement.closest('.inventory-ui') ||
          currentElement.closest('.backpack-overlay') ||
          currentElement.closest('.hotbar') ||
          currentElement.closest('[data-container]')
        )) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }
    return false;
  }
  updatePreview() {
    if (!this.isBuilding || !this.wallMesh) return;
    
    // Always ensure preview matches the currently selected object
    this.ensureFreshPreview();
    
    // this.updateGridPosition(); // REMOVED - No longer needed as LevelManager handles grid.
    
    // Check if cursor is over UI - hide preview if it is
    const mouseEvent = { clientX: ((this.mouse.x + 1) / 2) * window.innerWidth, clientY: ((-this.mouse.y + 1) / 2) * window.innerHeight };
    if (this.isCursorOverUI(mouseEvent)) {
      if (this.previewMesh) {
        this.previewMesh.visible = false;
      }
      return;
    }
    
    // Raycast to find intersection
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    if (this.buildingMode === 'build') {
      // Raycast to current level plane for build position
      const currentLevelY = this.getCurrentLevelY();
      const levelPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -currentLevelY);
      const intersectPoint = new THREE.Vector3();
      let gridPos;
      
      if (this.raycaster.ray.intersectPlane(levelPlane, intersectPoint)) {
        gridPos = this.snapToGrid(intersectPoint, currentLevelY);
      }
      
      if (gridPos) {
        
        // Create or update preview
        if (!this.previewMesh) {
          this.createPreview();
        }
        
        // Update preview position and rotation with proper matrix updates
        this.previewMesh!.position.copy(gridPos);
        this.previewMesh!.rotation.y = this.currentRotation;
        this.previewMesh!.updateMatrixWorld(true); // Force matrix update
        this.previewMesh!.visible = true;
        
        // Enhanced collision detection for preview - check only current level
        const occupiedCells = this.getOccupiedCells(gridPos, this.currentRotation);
        const cellConflicts = occupiedCells.filter(cellKey => 
          this.levelManager.isCellOccupiedOnCurrentLevel(cellKey)
        );
        const hasCellConflicts = cellConflicts.length > 0;
        
        // Check physical mesh intersection
        const hasPhysicalConflicts = this.checkPhysicalIntersection(gridPos, this.currentRotation);
        
        const isInvalid = hasCellConflicts || hasPhysicalConflicts;
        
        // Debug logging for placement validation (reduced frequency)
        if (Math.random() < 0.1) { // Log only 10% of the time to reduce spam
          if (isInvalid) {
            console.log(`❌ Cannot place wall - conflicts detected:`);
            console.log(`  Position: (${gridPos.x}, ${gridPos.z}), Rotation: ${(this.currentRotation * 180 / Math.PI).toFixed(0)}°`);
            if (hasCellConflicts) console.log(`  Cell conflicts:`, cellConflicts);
            if (hasPhysicalConflicts) console.log(`  Physical mesh intersection detected`);
          }
        }
        
        // Check if player has enough resources
        const hasEnoughResources = this.resourceManager.hasRequiredResources(this.selectedBuildObject);
        
        // Show/hide resource warning based on availability (only in build mode)
        if (!hasEnoughResources) {
          this.resourceManager.showResourceWarning(this.mouse, this.camera as any);
        } else {
          this.resourceManager.hideResourceWarning();
        }
        
        // Change preview color based on validity AND resource availability
        this.previewMesh!.traverse((child: any) => {
          if (child.isMesh && child.material) {
            if (isInvalid || !hasEnoughResources) {
              child.material.color.setHex(0xff4444); // Red for invalid build or insufficient resources
              child.material.opacity = 0.5;
            } else {
              child.material.color.setHex(0x44ff44); // Green for all valid placements
              child.material.opacity = 0.7;
            }
          }
        });
      }
    } else if (this.buildingMode === 'delete') {
      // Hide resource warning in delete mode since it's not relevant
      this.hideResourceWarning();
      
      // Delete mode: raycast against built walls specifically
      const intersects = this.raycaster.intersectObjects(this.builtWalls, true);
      
      if (intersects.length > 0) {
        const targetObject = this.findBreakableParent(intersects[0].object);
        
        if (targetObject && !this.animatingWalls.has(targetObject)) {
          // Only show preview for walls that are NOT currently animating
          // Create preview that matches the targeted object
          this.createDeletePreview(targetObject);
          
          // Position preview at target object with proper matrix update
          this.previewMesh!.position.copy(targetObject.position);
          this.previewMesh!.rotation.copy(targetObject.rotation);
          this.previewMesh!.updateMatrixWorld(true); // Force matrix update
          this.previewMesh!.visible = true;
          
          // Orange color for valid break target
          this.previewMesh!.traverse((child: any) => {
            if (child.isMesh && child.material) {
              child.material.color.setHex(0xff8844); // Orange for valid break
              child.material.opacity = 0.8;
            }
          });
        } else {
          // No valid target or target is animating - hide preview
          if (this.previewMesh) {
            this.previewMesh.visible = false;
          }
        }
      } else {
        // No valid target - hide preview
        if (this.previewMesh) {
          this.previewMesh.visible = false;
        }
      }
    }
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
  
  createPreview() {
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;
    
    // Clone the selected object mesh for preview
    this.previewMesh = currentBuildObject.mesh.clone();
    
    this.setupPreviewMaterial(this.previewMesh);
    this.scene.add(this.previewMesh);
  }
  
  createDeletePreview(targetObject: THREE.Object3D) {
    // Remove existing preview if it exists
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
    
    // Clone the targeted object for preview instead of the selected build object
    this.previewMesh = targetObject.clone();
    
    this.setupPreviewMaterial(this.previewMesh);
    this.scene.add(this.previewMesh);
  }
  
  setupPreviewMaterial(mesh: THREE.Object3D) {
    // Make preview materials transparent and ensure they're independent
    mesh.traverse((child: any) => {
      if (child.isMesh) {
        // Deep clone material to ensure complete independence
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((mat: any) => mat.clone());
          } else {
            child.material = child.material.clone();
          }
          
          // Set preview-specific properties
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              mat.transparent = true;
              mat.opacity = 0.7;
              mat.color.setHex(0x44ff44); // Green by default
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = 0.7;
            child.material.color.setHex(0x44ff44); // Green for all objects
          }
        }
        
        // Disable shadows for preview
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }
  
  ensureFreshPreview() {
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;
    
    // Check if preview exists and matches the selected object
    let needsRefresh = false;
    
    if (!this.previewMesh) {
      needsRefresh = true;
    } else {
      // Check if preview mesh is for the current selected object
      // We can identify this by checking if the geometry/structure matches
      const previewChildCount = this.previewMesh.children.length;
      const selectedChildCount = currentBuildObject.mesh.children.length;
      
      if (previewChildCount !== selectedChildCount) {
        needsRefresh = true;
      }
    }
    
    if (needsRefresh) {
      // Remove existing preview
      if (this.previewMesh) {
        this.scene.remove(this.previewMesh);
        this.previewMesh = null;
      }
      
      // Create fresh preview for selected object
      this.createPreview();
    }
  }
  
  snapToGrid(worldPosition: THREE.Vector3, targetY: number | null = null) {
    // Use current level Y if no target specified
    if (targetY === null) {
      targetY = this.getCurrentLevelY();
    }
    // Snap position to grid with proper rounding to prevent floating point errors
    const snappedX = Math.round(worldPosition.x / this.gridSize) * this.gridSize;
    const snappedZ = Math.round(worldPosition.z / this.gridSize) * this.gridSize;
    
    // Ensure snapped values are exactly on grid boundaries
    const gridX = Math.round(snappedX / this.gridSize) * this.gridSize;
    const gridZ = Math.round(snappedZ / this.gridSize) * this.gridSize;
    
    return new THREE.Vector3(gridX, targetY, gridZ);
  }
  
  getCellKey(position: THREE.Vector3) {
    // Create unique key for grid cell with precise rounding
    const gridX = Math.round((position.x + 0.001) / this.gridSize); // Add tiny offset to handle floating point precision
    const gridZ = Math.round((position.z + 0.001) / this.gridSize);
    return `${gridX},${gridZ}`;
  }
  
  getOccupiedCells(position: THREE.Vector3, rotation: number) {
    // Get current build object to determine cell size
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    const cellSize = currentBuildObject ? currentBuildObject.cellSize : 3.5;
    
    // Use precise grid coordinate calculation to avoid floating point errors
    const gridX = Math.round((position.x + 0.001) / this.gridSize);
    const gridZ = Math.round((position.z + 0.001) / this.gridSize);
    const occupiedCells: string[] = [];

    // Normalize rotation to handle floating point precision issues  
    const normalizedRotation = Math.round((rotation * 180 / Math.PI) / 90) * 90;
    // Handle negative rotations properly
    const positiveRotation = ((normalizedRotation % 360) + 360) % 360;
    
    // Check if cellSize is an object with width and height properties
    let cellWidth: number;
    let cellHeight: number;
    if (typeof cellSize === 'object' && cellSize.width && cellSize.height) {
      cellWidth = cellSize.width;
      cellHeight = cellSize.height;
      console.log(`Getting occupied cells for ${currentBuildObject?.name || 'wall'} (${cellWidth}x${cellHeight} cells) at position (${gridX}, ${gridZ}) with rotation ${positiveRotation}°`);
    } else {
      // Legacy support for numeric cellSize
      cellWidth = cellSize as number;
      cellHeight = 1.0;
      console.log(`Getting occupied cells for ${currentBuildObject?.name || 'wall'} (${cellWidth} cells) at position (${gridX}, ${gridZ}) with rotation ${positiveRotation}°`);
    }
    
    console.log(`World position: (${position.x.toFixed(3)}, ${position.z.toFixed(3)})`);
    
    // Calculate rotated cell pattern based on wall rotation
    this.calculateRotatedCells(gridX, gridZ, cellWidth, cellHeight, positiveRotation, occupiedCells);
    
    console.log(`Total cells occupied: ${occupiedCells.length}`, occupiedCells);
    return occupiedCells;
  }
  
  calculateRotatedCells(
    centerX: number,
    centerZ: number,
    width: number,
    height: number,
    rotation: number,
    occupiedCells: string[]
  ) {
    // Calculate the range of cells relative to center
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);
    
    // Generate cell offsets in local space (before rotation)
    const localCells = [];
    for (let dx = -halfWidth; dx < width - halfWidth; dx++) {
      for (let dz = -halfHeight; dz < height - halfHeight; dz++) {
        localCells.push({ x: dx, z: dz });
      }
    }
    
    // Apply rotation transformation to each cell offset
    localCells.forEach(localCell => {
      let rotatedX, rotatedZ;
      
      switch (rotation) {
        case 0:
          // No rotation
          rotatedX = localCell.x;
          rotatedZ = localCell.z;
          break;
        case 90:
          // 90° clockwise: (x,z) -> (-z,x)
          rotatedX = -localCell.z;
          rotatedZ = localCell.x;
          break;
        case 180:
          // 180° rotation: (x,z) -> (-x,-z)
          rotatedX = -localCell.x;
          rotatedZ = -localCell.z;
          break;
        case 270:
          // 270° clockwise (or 90° counter-clockwise): (x,z) -> (z,-x)
          rotatedX = localCell.z;
          rotatedZ = -localCell.x;
          break;
        default:
          // Fallback to no rotation
          rotatedX = localCell.x;
          rotatedZ = localCell.z;
      }
      
      // Convert rotated offset to world grid coordinates
      const worldX = centerX + rotatedX;
      const worldZ = centerZ + rotatedZ;
      const cellKey = `${worldX},${worldZ}`;
      occupiedCells.push(cellKey);
    });
    
    console.log(`  ${width}x${height} object rotated ${rotation}° occupies ${occupiedCells.length} cells`);
    console.log(`  Cell pattern:`, occupiedCells);
  }
  
  buildWall() {
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    if (!this.previewMesh || !currentBuildObject || !currentBuildObject.mesh) return;
    
    // Check if player has enough resources
    if (!this.hasRequiredResources()) {
      this.showResourceWarning();
      return;
    }
    
    const buildPosition = this.previewMesh.position.clone();
    const occupiedCells = this.getOccupiedCells(buildPosition, this.currentRotation);
    
    // Enhanced collision detection: Check both cell occupation AND physical mesh intersection
    const conflictingCells: string[] = [];
    
    // 1. Check cell occupation only on current level
    occupiedCells.forEach(cellKey => {
      if (this.levelManager.isCellOccupiedOnCurrentLevel(cellKey)) {
        conflictingCells.push(cellKey);
      }
    });
    
    // 2. Check cell conflicts only - walls can touch each other
    const hasPhysicalConflicts = this.checkPhysicalIntersection(buildPosition, this.currentRotation);
    const hasCellConflicts = conflictingCells.length > 0;
    
    if (hasCellConflicts || hasPhysicalConflicts) {
      console.log('❌ Cannot build here - conflicts detected:');
      console.log('  Build position:', buildPosition);
      console.log('  Current rotation (degrees):', (this.currentRotation * 180 / Math.PI));
      
      if (hasCellConflicts) {
        console.log('  📋 Cell conflicts:', conflictingCells);
        console.log('  All occupied cells:', Array.from(this.occupiedCells));
      }
      
      if (hasPhysicalConflicts) {
        console.log('  🔲 Cell occupation conflicts detected');
      }
      
      return;
    }
    
    console.log('🔨 Building wall at:', buildPosition);
    console.log('  Claiming cells:', occupiedCells);

    // Multiplayer: placement is server-authoritative. Emit a place_building command
    // (with the anchor cell) and let the confirmed building_placed event materialize
    // it on every client. Resources are consumed optimistically (a rejected placement
    // is not refunded in v1). In local mode requestPlace is null and we build directly.
    if (this.requestPlace) {
      const cell: BuildingCell = {
        level: this.levelManager.currentLevel,
        gx: Math.round((buildPosition.x + 0.001) / this.gridSize),
        gz: Math.round((buildPosition.z + 0.001) / this.gridSize),
      };
      this.consumeResources();
      this.requestPlace({
        registryType: this.selectedBuildObject,
        position: { x: buildPosition.x, y: buildPosition.y, z: buildPosition.z },
        rotation: { x: 0, y: this.currentRotation, z: 0 },
        level: cell.level,
        cell,
      });
      return;
    }

    // Create actual wall/object
    const newWall = currentBuildObject.mesh.clone();
    newWall.position.copy(buildPosition);
    newWall.rotation.y = this.currentRotation;
    
    // Add to scene first
    this.scene.add(newWall);
    
    // Set up collision userData for the main wall object with proper building type
    newWall.userData = {
      isCollider: true,
      colliderType: 'mesh',
      isBuildingWall: true,
      isBreakable: true,
      buildingType: this.selectedBuildObject, // Add the actual building type
      type: this.selectedBuildObject // Add backup type field
    };
    
    // CRITICAL: Set up collision detection for ALL mesh children with proper positioning
    newWall.traverse((child: any) => {
      if (child.isMesh) {
        // Mark each mesh as a collider
        child.userData = {
          isCollider: true,
          colliderType: 'mesh',
          isBuildingWall: true,
          isBreakable: true,
          buildingType: this.selectedBuildObject, // Add the actual building type
          type: this.selectedBuildObject // Add backup type field
        };
        
        // Ensure geometry is properly computed for collision
        if (child.geometry) {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
        }
        
        // Update world matrix for accurate collision detection
        child.updateMatrixWorld(true);
      }
    });
    
    // Force update of world matrices
    newWall.updateMatrixWorld(true);
    
    // Add to collision system - add the root wall object with 'mesh' type for horizontal collision
    if (this.collisionSystem) {
      console.log('Adding wall to collision system...');
      console.log('Wall position:', newWall.position);
      console.log('Wall has mesh children:', newWall.children.filter((child: any) => child.isMesh).length);
      
      // Add the wall object itself to collision system with 'mesh' type for wall collision
      this.collisionSystem.addCollider(newWall, 'mesh');
      
      console.log('Wall added to collision system. Total colliders:', this.collisionSystem.colliders.length);
      
      // Debug: Log the wall's bounding box
      const box = new THREE.Box3().setFromObject(newWall);
      console.log('Wall bounding box:', box);
    } else {
      console.warn('Collision system not available when building wall');
    }
    
    // Consume resources from inventory
    this.consumeResources();
    
    // Add to tracking arrays and mark all cells as occupied
    this.builtWalls.push(newWall);
    
    // Add to type-specific tracking via registry - ensure proper registration
    console.log(`Registering built object: ${this.selectedBuildObject}`, newWall);
    this.objectsRegistry.addBuiltObject(this.selectedBuildObject, newWall);
    
    // Verify registration was successful
    const registeredCount = this.objectsRegistry.getBuiltObjectCount(this.selectedBuildObject);
    console.log(`Registry now contains ${registeredCount} objects of type: ${this.selectedBuildObject}`);
    
    console.log(`📍 Tracking ${occupiedCells.length} cells for new wall:`, occupiedCells);
    console.log(`  Wall object:`, newWall);
    console.log(`  Wall position:`, newWall.position);
    console.log(`  Wall scale:`, newWall.scale.x);
    
    occupiedCells.forEach(cellKey => {
      // Add to current level's occupied cells through LevelManager
      this.levelManager.addOccupiedCell(cellKey);
      this.cellToWallMap.set(cellKey, newWall);
      
      console.log(`  ✓ Mapped cell ${cellKey} to wall at ${newWall.position.x}, ${newWall.position.z}`);
      
      // Create visual debug indicator if debug mode is enabled
      if (this.showDebugIndicators) {
        this.createDebugIndicator(cellKey);
      }
    });
    
    console.log(`Total cells now tracked: ${this.occupiedCells.size}`);
    console.log(`Total cell mappings: ${this.cellToWallMap.size}`);
    
    // Start placement animation
    this.playPlacementAnimation(newWall);
    
    console.log(`Built wall at ${buildPosition.x}, ${buildPosition.z} with rotation ${this.currentRotation.toFixed(2)}`);
    console.log('Wall userData:', newWall.userData);
    console.log('Wall has mesh children:', newWall.children.filter((child: any) => child.isMesh).length);
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
  
  ensureSelectionScreenStyles() {
    if (document.getElementById('building-selection-responsive-styles')) return;

    const style = document.createElement('style');
    style.id = 'building-selection-responsive-styles';
    style.textContent = `
      #selectionScreen {
        width: min(320px, calc(100vw - 40px)) !important;
        max-height: calc(100dvh - 40px) !important;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }
      .selection-header {
        position: relative;
        padding-right: 48px;
      }
      .selection-close {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px solid rgba(245, 222, 179, 0.85);
        background: rgba(60, 31, 12, 0.55);
        color: #F5DEB3;
        font: 800 28px/1 system-ui, sans-serif;
        cursor: pointer;
        pointer-events: auto;
        touch-action: manipulation;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
      }
      .selection-close:active {
        transform: scale(0.96);
        background: rgba(60, 31, 12, 0.78);
      }
      @media (max-width: 820px) and (orientation: landscape) {
        #selectionScreen {
          top: max(10px, env(safe-area-inset-top)) !important;
          right: max(10px, env(safe-area-inset-right)) !important;
          bottom: max(10px, env(safe-area-inset-bottom)) !important;
          transform: none !important;
          width: min(34vw, 280px) !important;
          min-width: 220px !important;
          max-height: calc(100dvh - 20px) !important;
          padding: 12px !important;
          border-radius: 18px !important;
        }
        #selectionScreen .selection-header {
          margin-bottom: 12px !important;
          padding-right: 40px;
        }
        #selectionScreen .selection-header h3 {
          font-size: 18px !important;
          margin-bottom: 2px !important;
        }
        #selectionScreen .selection-header p {
          font-size: 12px !important;
        }
        #selectionScreen #objectList {
          gap: 8px !important;
        }
        #selectionScreen .object-card {
          padding: 10px !important;
          border-radius: 14px !important;
        }
        #selectionScreen .object-card [id^="preview-"] {
          width: 42px !important;
          height: 42px !important;
          border-radius: 12px !important;
        }
        #selectionScreen .selection-footer {
          margin-top: 10px !important;
          padding-top: 10px !important;
        }
        #buildingText {
          bottom: 82px !important;
          padding: 10px 16px !important;
          max-width: 42vw !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  showSelectionScreen() {
    this.ensureSelectionScreenStyles();

    // Create or show selection sidebar
    let selectionScreen = document.getElementById('selectionScreen');
    if (!selectionScreen) {
      selectionScreen = document.createElement('div');
      selectionScreen.id = 'selectionScreen';
      selectionScreen.className = 'selection-screen';
      selectionScreen.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 320px;
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 25px;
        padding: 25px;
        z-index: 1000;
        font-family: 'Nunito', Arial, sans-serif;
        color: #F5DEB3;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(245, 222, 179, 0.1);
        max-height: 80vh;
        overflow-y: auto;
        backdrop-filter: blur(15px);
      `;
      
      document.body.appendChild(selectionScreen);
    }
    
    // Initialize 3D previews for each buildable object
    this.initializeSelectionPreviews();
    
    // Create selection content  
    selectionScreen.innerHTML = `
      <div class="selection-header" style="text-align: center; margin-bottom: 25px;">
        <button class="selection-close" type="button" aria-label="Close build menu">×</button>
        <h3 style="
          color: #F5DEB3; 
          font-family: 'Fredoka One', Arial, sans-serif;
          font-size: 22px; 
          margin: 0 0 8px 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        ">🔨 Build Menu</h3>
        <p style="
          color: #DEB887; 
          font-size: 14px; 
          margin: 0;
          font-weight: 500;
        ">Choose what to build</p>
      </div>
      
      <div id="objectList" style="display: flex; flex-direction: column; gap: 12px;">
        ${Object.entries(this.buildableObjects).map(([key, obj]: [string, any]) => `
          <div class="object-card" data-object="${key}" style="
            background: ${this.selectedBuildObject === key ? 
              'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #DEB887 100%)' : 
              'linear-gradient(135deg, rgba(222, 184, 135, 0.3) 0%, rgba(245, 222, 179, 0.2) 50%, rgba(222, 184, 135, 0.3) 100%)'
            };
            border: 3px solid ${this.selectedBuildObject === key ? '#F5DEB3' : '#A0522D'};
            border-radius: 18px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            box-shadow: ${this.selectedBuildObject === key ? 
              '0 8px 25px rgba(245, 222, 179, 0.4), inset 0 2px 5px rgba(139, 69, 19, 0.1)' : 
              '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)'
            };
          ">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div id="preview-${key}" style="
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
                border: 2px solid #DEB887;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.2);
                overflow: hidden;
              ">
                <!-- 3D preview will be inserted here -->
              </div>
              
              <div style="flex: 1; min-width: 0;">
                <div style="
                  color: ${this.selectedBuildObject === key ? '#8B4513' : '#F5DEB3'};
                  font-family: 'Fredoka One', Arial, sans-serif;
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 6px;
                  line-height: 1.2;
                  text-shadow: ${this.selectedBuildObject === key ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};
                ">${obj.name}</div>
                
                <div style="
                  color: ${this.selectedBuildObject === key ? '#A0522D' : '#DEB887'};
                  font-size: 14px;
                  font-weight: 600;
                  margin-bottom: 4px;
                ">🪵 ${obj.cost.wood} Wood</div>
                
                <div style="
                  color: ${this.selectedBuildObject === key ? '#8B4513' : '#DEB887'};
                  font-size: 12px;
                  opacity: 0.8;
                ">${obj.cellSize === 3.0 ? '9 cells (3x3)' : obj.cellSize + ' cell' + (obj.cellSize !== 1 ? 's' : '')}</div>
              </div>
              
              ${this.selectedBuildObject === key ? `
                <div style="
                  background: linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%);
                  color: #8B4513;
                  border: 2px solid #A0522D;
                  border-radius: 50%;
                  width: 28px;
                  height: 28px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                  font-weight: bold;
                  flex-shrink: 0;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                ">✓</div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="selection-footer" style="
        text-align: center; 
        color: #DEB887; 
        font-size: 12px; 
        font-weight: 500;
        margin-top: 20px; 
        padding-top: 20px; 
        border-top: 2px solid rgba(222, 184, 135, 0.3);
      ">
        <p class="kbd-hint" style="margin: 0;">Click to select • <span style="color: #F5DEB3; font-weight: 700;">Esc</span> to close</p>
      </div>
    `;
    
    // Add keyboard handlers for selection screen
    this.selectionScreenKeyHandler = (event) => {
      if (event.code === 'Escape') {
        this.hideSelectionScreen();
      }
    };
    document.addEventListener('keydown', this.selectionScreenKeyHandler);

    const closeButton = selectionScreen.querySelector<HTMLElement>('.selection-close');
    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.hideSelectionScreen();
    });
    
    // Add click handlers to object cards
    const objectCards = selectionScreen.querySelectorAll<HTMLElement>('.object-card');
    objectCards.forEach((card) => {
      card.addEventListener('click', () => {
        const objectKey = card.getAttribute('data-object')!;
        this.selectBuildObject(objectKey);
      });
      
      // Add hover effects
      card.addEventListener('mouseenter', () => {
        if (card.getAttribute('data-object') !== this.selectedBuildObject) {
          card.style.borderColor = '#F5DEB3';
          card.style.transform = 'translateY(-2px) scale(1.02)';
          card.style.boxShadow = '0 8px 25px rgba(245, 222, 179, 0.3), inset 0 2px 5px rgba(139, 69, 19, 0.1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (card.getAttribute('data-object') !== this.selectedBuildObject) {
          card.style.borderColor = '#A0522D';
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)';
        }
      });
    });
    
    selectionScreen.style.display = 'block';
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
  
  hideSelectionScreen() {
    const selectionScreen = document.getElementById('selectionScreen');
    if (selectionScreen) {
      selectionScreen.style.display = 'none';
    }
    
    // Remove keyboard handler
    if (this.selectionScreenKeyHandler) {
      document.removeEventListener('keydown', this.selectionScreenKeyHandler);
      this.selectionScreenKeyHandler = null;
    }
    
    // Remove current preview to force recreation with new object
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
    
    // Force immediate preview update with new object
    if (this.isBuilding) {
      this.updatePreview();
    }
    
    // Update UI to show new selection
    this.updateBuildingUI();
  }
  
  deleteWall() {
    if (!this.wallMesh) return;
    
    // Raycast to find built walls
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const intersects = this.raycaster.intersectObjects(this.builtWalls, true);
    
    if (intersects.length > 0) {
      const targetObject = this.findBreakableParent(intersects[0].object);
      
      if (targetObject) {
        // CRITICAL: Check if this wall is already animating - prevent breaking it again
        if (this.animatingWalls.has(targetObject)) {
          console.log('⚠️ Wall is already being broken - ignoring additional break attempts');
          return;
        }
        
        this.breakObject(targetObject);
        console.log('Wall successfully broken');
        
        // Stay in delete mode and update preview
        if (this.isBuilding) {
          // Force immediate preview update while staying in delete mode
          setTimeout(() => {
            this.updatePreview();
          }, 50); // Small delay to ensure DOM updates
        }
      }
    } else {
      console.log('No built wall found at cursor position');
    }
  }
  breakObject(objectToBreak: THREE.Object3D) {
    if (!objectToBreak || !objectToBreak.userData.isBreakable) return;
    
    // CRITICAL: Double-check that wall is not already animating
    if (this.animatingWalls.has(objectToBreak)) {
      console.log('⚠️ Object is already being broken - preventing duplicate break');
      return;
    }
    
    // Return half of the resources used to build this object
    this.returnResources(objectToBreak);
    
    // Start break animation instead of immediate removal
    this.playBreakAnimation(objectToBreak);
  }
  
  playBreakAnimation(wall: THREE.Object3D) {
    console.log('🗑️ Starting break animation for wall at:', wall.position);
    
    // Mark wall as animating to prevent interaction
    this.animatingWalls.add(wall);
    
    // Store original properties
    const originalScale = wall.scale.clone();
    const originalPosition = wall.position.clone();
    const originalRotation = wall.rotation.clone();
    
    // Clone materials to avoid affecting template or future walls
    wall.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
    
    // Create destruction particle effects
    this.createDestructionParticles(wall, originalPosition);
    
    // Animate wall breaking
    const animationDuration = 600; // 0.6 seconds
    const startTime = Date.now();
    
    const animateBreak = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Easing function (ease-in-out)
      const easeInOut = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      
      const easedProgress = easeInOut(progress);
      
      // Scale down to nothing
      const currentScale = originalScale.x * (1 - easedProgress);
      wall.scale.setScalar(Math.max(0.01, currentScale));
      
      // Keep original rotation, only add slight wobble
      wall.rotation.x = originalRotation.x + Math.sin(progress * Math.PI * 2) * 0.05;
      wall.rotation.y = originalRotation.y; // Keep Y rotation unchanged
      wall.rotation.z = originalRotation.z + Math.cos(progress * Math.PI * 2) * 0.05;
      
      // Fade out material
      wall.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (!child.material.transparent) {
            child.material.transparent = true;
          }
          child.material.opacity = 1 - easedProgress;
        }
      });
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateBreak);
      } else {
        // Animation complete - now actually remove the wall
        this.completeWallBreak(wall);
      }
    };
    
    animateBreak();
  }
  
  completeWallBreak(objectToBreak: THREE.Object3D) {
    // Clean up building system tracking
    if (objectToBreak.userData.isBuildingWall) {
      // CRITICAL FIX: Find ALL cells that belonged to this specific wall
      const wallCells = [];
      
      // Search through cellToWallMap to find all cells that belong to this wall
      for (const [cellKey, wallObject] of this.cellToWallMap.entries()) {
        if (wallObject === objectToBreak) {
          wallCells.push(cellKey);
        }
      }
      
      console.log(`🔍 Breaking wall at position:`, objectToBreak.position);
      console.log(`  Wall scale: ${objectToBreak.scale.x}`);
      console.log(`  Wall rotation: ${objectToBreak.rotation.y} radians = ${(objectToBreak.rotation.y * 180 / Math.PI).toFixed(0)}°`);
      console.log(`  Found ${wallCells.length} cells belonging to this wall:`, wallCells);
      
      if (wallCells.length === 0) {
        console.warn('⚠️ No cells found for this wall in cellToWallMap - trying fallback method');
        
        // Fallback: Use wall type for cell calculation
        const originalSelectedObject = this.selectedBuildObject;
        this.selectedBuildObject = 'wall';
        const fallbackCells = this.getOccupiedCells(objectToBreak.position, objectToBreak.rotation.y);
        this.selectedBuildObject = originalSelectedObject;
        
        console.log('  Fallback calculated cells:', fallbackCells);
        wallCells.push(...fallbackCells);
      }
      
      // Remove from tracking arrays first
      const wallIndex = this.builtWalls.indexOf(objectToBreak);
      if (wallIndex !== -1) {
        this.builtWalls.splice(wallIndex, 1);
        console.log(`  Removed wall from builtWalls array (index ${wallIndex})`);
      }
      
      // Remove from type-specific tracking via registry
      this.objectsRegistry.removeBuiltObject(objectToBreak);
      
      // Remove ALL cells that belonged to this wall from current level
      let cellsFreed = 0;
      wallCells.forEach(cellKey => {
        // Remove from current level's occupied cells through LevelManager
        if (this.levelManager.removeOccupiedCell(cellKey)) {
          cellsFreed++;
          console.log(`    ✓ Freed cell: ${cellKey}`);
        } else {
          console.log(`    ⚠️ Cell ${cellKey} was not in current level's occupied cells`);
        }
        
        if (this.cellToWallMap.has(cellKey)) {
          this.cellToWallMap.delete(cellKey);
          console.log(`    ✓ Removed cell mapping: ${cellKey}`);
        }
        
        // Remove visual debug indicator
        this.removeDebugIndicator(cellKey);
      });
      
      console.log(`  Successfully freed ${cellsFreed} cells`);
      console.log('  Remaining occupied cells after break:', Array.from(this.occupiedCells));
      console.log('  Remaining cell mappings:', this.cellToWallMap.size);
    }
    
    // Remove from animating walls
    this.animatingWalls.delete(objectToBreak);
    
    // Remove object from scene
    this.scene.remove(objectToBreak);
    
    // Remove from collision system
    if (this.collisionSystem) {
      this.collisionSystem.removeCollider(objectToBreak);
    }
    
    // Clean up particle system after a delay
    setTimeout(() => {
      this.cleanupParticleSystem(objectToBreak);
    }, 2000);
    
    // Force preview update to ensure proper rotation state
    if (this.isBuilding && this.previewMesh) {
      // Reset preview rotation to current rotation state
      this.previewMesh.rotation.y = this.currentRotation;
      this.previewMesh.updateMatrixWorld(true);
      
      // Trigger immediate preview update
      this.updatePreview();
    }
    
    console.log(`Wall break animation completed at ${objectToBreak.position.x}, ${objectToBreak.position.y}, ${objectToBreak.position.z}`);
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
    this.hideResourceWarning();
    
    // Hide building UI
    this.hideBuildingUI();
    
    // Hide selection screen when exiting build mode
    this.hideSelectionScreen();
    
    console.log('Exited building mode');
  }
  
  showBuildingUI() {
    // Hide the initial build prompt from InventoryUI
    const buildPrompt = document.getElementById('build-mode-prompt');
    if (buildPrompt) {
      buildPrompt.style.opacity = '0';
      buildPrompt.style.pointerEvents = 'none';
    }
    
    // Create or show building text above hotbar
    let buildingText = document.getElementById('buildingText');
    if (!buildingText) {
      buildingText = document.createElement('div');
      buildingText.id = 'buildingText';
      buildingText.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 20px;
        padding: 15px 25px;
        color: #F5DEB3;
        font-family: 'Nunito', Arial, sans-serif;
        font-size: 14px;
        text-align: center;
        z-index: 200;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(245, 222, 179, 0.1);
        pointer-events: none;
        backdrop-filter: blur(10px);
      `;
      
      document.body.appendChild(buildingText);
    }
    
    this.updateBuildingUI();
    buildingText.style.display = 'block';
  }
  
  updateBuildingUI() {
    const buildingText = document.getElementById('buildingText');
    if (!buildingText) return;
    
    const modeIcon = this.buildingMode === 'build' ? '🔨' : '🗑️';
    const modeText = this.buildingMode === 'build' ? 'Build' : 'Break';
    
    if (this.buildingMode === 'build') {
      const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
      const hasResources = this.hasRequiredResources();
      const resourceColor = hasResources ? '#90EE90' : '#FF6B6B';
      
      buildingText.innerHTML = `
        <div style="margin-bottom: 6px;">
          <strong style="
            color: #F5DEB3; 
            font-family: 'Fredoka One', Arial, sans-serif;
            font-size: 16px;
          ">${modeIcon} Selected: ${currentBuildObject.name}</strong>
        </div>
        <div style="
          color: ${resourceColor}; 
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 13px;
        ">
          🪵 Cost: ${currentBuildObject.cost.wood} Wood ${hasResources ? '✓' : '✗'}
        </div>
        <div class="kbd-hint" style="
          font-size: 12px;
          color: #DEB887;
          font-weight: 500;
        ">
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>R</strong> Rotate</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>X</strong> Switch</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>V</strong> Exit</span>
        </div>
      `;
    } else {
      buildingText.innerHTML = `
        <div style="margin-bottom: 6px;">
          <strong style="
            color: #F5DEB3; 
            font-family: 'Fredoka One', Arial, sans-serif;
            font-size: 16px;
          ">${modeIcon} ${modeText} Mode</strong>
        </div>
        <div class="kbd-hint" style="
          font-size: 12px;
          color: #DEB887;
          font-weight: 500;
        ">
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>X</strong> Switch</span>
          <span style="
            background: rgba(222, 184, 135, 0.2);
            padding: 2px 6px;
            border-radius: 8px;
            margin: 0 3px;
          "><strong>V</strong> Exit</span>
        </div>
      `;
    }
  }
  
  hideBuildingUI() {
    const buildingText = document.getElementById('buildingText');
    if (buildingText) {
      buildingText.style.display = 'none';
    }
    // Show the initial build prompt from InventoryUI again
    const buildPrompt = document.getElementById('build-mode-prompt');
    if (buildPrompt) {
      buildPrompt.style.opacity = '1';
      buildPrompt.style.pointerEvents = 'auto';
    }
  }
  
  /**
   * Materialize a server-confirmed building (multiplayer onBuildingPlaced). Reuses
   * the save-restore path, stamping the stable networkId so it can be matched later.
   * Cell-occupancy tracking is approximate for buildings on a non-current level
   * (the mesh position is exact); the server remains authoritative for conflicts.
   */
  materializeNetworkBuilding(building: BuildingState): void {
    this.saveManager.restoreBuilding({
      type: building.registryType,
      position: building.position,
      rotation: building.rotation.y,
      networkId: building.networkId,
    });
  }

  /**
   * Remove a server-confirmed building by networkId (multiplayer onBuildingRemoved).
   * Defensive: the v1 server emits no building_removed command, but reconnect
   * snapshots and future removals route here.
   */
  removeNetworkBuilding(networkId: number): void {
    const wall = this.builtWalls.find((w) => w.userData.networkId === networkId);
    if (!wall) return;
    this.scene.remove(wall);
    this.collisionSystem?.removeCollider(wall);
    this.builtWalls = this.builtWalls.filter((w) => w !== wall);
    for (const [key, mapped] of this.cellToWallMap) {
      if (mapped === wall) {
        this.cellToWallMap.delete(key);
        this.occupiedCells.delete(key);
      }
    }
  }

  // Clean up method
  destroy() {
    this.exitBuildingMode();
    
    // Remove event listeners
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
    if (this.keyupHandler) {
      document.removeEventListener('keyup', this.keyupHandler);
    }
    
    // Remove built walls
    this.builtWalls.forEach(wall => {
      this.scene.remove(wall);
      if (this.collisionSystem) {
        this.collisionSystem.removeCollider(wall);
      }
    });
    
    // Clear all tracking data
    this.builtWalls = [];
    this.objectsRegistry.clearBuiltObjects();
    this.occupiedCells.clear();
    this.cellToWallMap.clear();
    
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
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    
    // Check each cell this object would occupy against current level's occupied cells
    for (const newCellKey of newObjectCells) {
      if (this.levelManager.isCellOccupiedOnCurrentLevel(newCellKey)) {
        console.log(`❌ Cell ${newCellKey} is already occupied on current level ${this.levelManager.getCurrentLevel()}`);
        return true;
      }
    }
    
    return false;
  }
  
  playPlacementAnimation(wall: THREE.Object3D) {
    // Mark wall as animating
    this.animatingWalls.add(wall);
    
    // Store original properties
    const originalScale = wall.scale.clone();
    const originalPosition = wall.position.clone();
    const originalRotation = wall.rotation.clone();
    
    // Clone materials to avoid affecting template or future walls
    wall.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
    
    // Start with wall slightly smaller and higher
    wall.scale.setScalar(0.1);
    wall.position.y = originalPosition.y + 2.0;
    
    // Create wood chip particle system
    this.createWoodChipParticles(wall, originalPosition);
    
    // Animate wall scaling and dropping down
    const animationDuration = 800; // 0.8 seconds
    const startTime = Date.now();
    
    const animateWall = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Easing function (ease-out bounce)
      const easeOutBounce = (t: number) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          t -= 1.5 / 2.75;
          return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          t -= 2.25 / 2.75;
          return 7.5625 * t * t + 0.9375;
        } else {
          t -= 2.625 / 2.75;
          return 7.5625 * t * t + 0.984375;
        }
      };
      
      const easedProgress = easeOutBounce(progress);
      
      // Animate scale
      const currentScale = 0.1 + (originalScale.x - 0.1) * easedProgress;
      wall.scale.setScalar(currentScale);
      
      // Animate position (drop down) - keep X and Z unchanged
      wall.position.x = originalPosition.x;
      wall.position.y = originalPosition.y + 2.0 * (1 - easedProgress);
      wall.position.z = originalPosition.z;
      
      // Keep rotation unchanged during animation
      wall.rotation.copy(originalRotation);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateWall);
      } else {
        // Animation complete - restore exact original values
        wall.scale.copy(originalScale);
        wall.position.copy(originalPosition);
        wall.rotation.copy(originalRotation);
        this.animatingWalls.delete(wall);
        
        // Clean up particle system after a delay
        setTimeout(() => {
          this.cleanupParticleSystem(wall);
        }, 2000);
      }
    };
    
    animateWall();
  }
  
  createWoodChipParticles(wall: THREE.Object3D, position: THREE.Vector3) {
    const particleCount = 15;
    const particles = [];
    
    // Create individual wood chip particles
    for (let i = 0; i < particleCount; i++) {
      const chip = this.createWoodChip();
      
      // Position around the wall
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.4;
      
      chip.position.set(
        position.x + Math.cos(angle) * radius,
        position.y + 0.5 + Math.random() * 0.5,
        position.z + Math.sin(angle) * radius
      );
      
      // Random rotation
      chip.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store animation data
      chip.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 3
      );
      chip.userData.angularVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      chip.userData.startTime = Date.now();
      chip.userData.lifetime = 1500 + Math.random() * 1000; // 1.5-2.5 seconds
      
      this.scene.add(chip);
      particles.push(chip);
    }
    
    // Store particle system reference
    this.particleSystems.set(wall, particles);
    
    // Animate particles
    this.animateParticles(particles);
  }
  
  createDestructionParticles(wall: THREE.Object3D, position: THREE.Vector3) {
    const particleCount = 25; // More particles for destruction
    const particles = [];
    
    // Create destruction debris particles
    for (let i = 0; i < particleCount; i++) {
      const debris = this.createDebris();
      
      // Position around the wall with more spread
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.8;
      
      debris.position.set(
        position.x + Math.cos(angle) * radius,
        position.y + 0.3 + Math.random() * 0.8,
        position.z + Math.sin(angle) * radius
      );
      
      // Random rotation
      debris.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store animation data with more explosive velocity
      debris.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 6, // Higher horizontal velocity
        Math.random() * 3 + 2, // Higher upward velocity
        (Math.random() - 0.5) * 6
      );
      debris.userData.angularVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      debris.userData.startTime = Date.now();
      debris.userData.lifetime = 2000 + Math.random() * 1500; // 2-3.5 seconds
      
      this.scene.add(debris);
      particles.push(debris);
    }
    
    // Store particle system reference
    this.particleSystems.set(wall, particles);
    
    // Animate particles
    this.animateParticles(particles);
  }
  
  createWoodChip() {
    // Create a small rectangular wood chip
    const width = 0.08 + Math.random() * 0.04;
    const height = 0.02 + Math.random() * 0.02;
    const depth = 0.12 + Math.random() * 0.06;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.6, 0.4 + Math.random() * 0.2)
    });
    
    const chip = new THREE.Mesh(geometry, material);
    chip.castShadow = true;
    
    return chip;
  }
  
  createDebris() {
    // Create destruction debris - more varied shapes and sizes
    const debrisType = Math.random();
    let geometry, material;
    
    if (debrisType < 0.4) {
      // Rectangular chunks
      const width = 0.06 + Math.random() * 0.08;
      const height = 0.03 + Math.random() * 0.04;
      const depth = 0.08 + Math.random() * 0.10;
      geometry = new THREE.BoxGeometry(width, height, depth);
    } else if (debrisType < 0.7) {
      // Irregular chunks (scaled spheres)
      const radius = 0.04 + Math.random() * 0.06;
      geometry = new THREE.SphereGeometry(radius, 6, 4);
      geometry.scale(1 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 1 + Math.random() * 0.5);
    } else {
      // Thin splinters
      const width = 0.02 + Math.random() * 0.02;
      const height = 0.01 + Math.random() * 0.01;
      const depth = 0.15 + Math.random() * 0.10;
      geometry = new THREE.BoxGeometry(width, height, depth);
    }
    
    // Darker, more varied colors for destruction debris
    material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(
        0.05 + Math.random() * 0.08, // Brown hues
        0.4 + Math.random() * 0.4,   // Varied saturation
        0.2 + Math.random() * 0.3    // Darker values
      )
    });
    
    const debris = new THREE.Mesh(geometry, material);
    debris.castShadow = true;
    
    return debris;
  }
  
  animateParticles(particles: any) {
    const animateFrame = () => {
      const currentTime = Date.now();
      let activeParticles = 0;
      
      particles.forEach((particle: any) => {
        const elapsed = currentTime - particle.userData.startTime;
        const progress = elapsed / particle.userData.lifetime;
        
        if (progress < 1) {
          activeParticles++;
          
          // Apply physics
          const deltaTime = 0.016; // Assuming 60fps
          
          // Apply gravity
          particle.userData.velocity.y -= 9.8 * deltaTime;
          
          // Update position
          particle.position.add(
            particle.userData.velocity.clone().multiplyScalar(deltaTime)
          );
          
          // Update rotation
          particle.rotation.x += particle.userData.angularVelocity.x * deltaTime;
          particle.rotation.y += particle.userData.angularVelocity.y * deltaTime;
          particle.rotation.z += particle.userData.angularVelocity.z * deltaTime;
          
          // Fade out towards end of lifetime
          const fadeProgress = Math.max(0, (progress - 0.7) / 0.3);
          particle.material.opacity = 1 - fadeProgress;
          particle.material.transparent = fadeProgress > 0;
          
          // Stop bouncing when hitting ground level
          if (particle.position.y <= 6.05) {
            particle.position.y = 6.05;
            particle.userData.velocity.y *= -0.3; // Small bounce
            particle.userData.velocity.x *= 0.8; // Friction
            particle.userData.velocity.z *= 0.8;
          }
        } else {
          // Remove expired particle
          this.scene.remove(particle);
        }
      });
      
      // Continue animation if particles are still active
      if (activeParticles > 0) {
        requestAnimationFrame(animateFrame);
      }
    };
    
    animateFrame();
  }
  
  cleanupParticleSystem(wall: THREE.Object3D) {
    const particles = this.particleSystems.get(wall);
    if (particles) {
      particles.forEach((particle: any) => {
        this.scene.remove(particle);
      });
      this.particleSystems.delete(wall);
    }
  }
  
  // Resource management methods
  hasRequiredResources() {
    if (!this.inventory) return true; // If no inventory system, allow building
    
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    const requiredCost = currentBuildObject ? currentBuildObject.cost : this.wallCost;
    
    return this.inventory.hasItem('wood', requiredCost.wood);
  }
  
  consumeResources() {
    if (!this.inventory) return;
    
    const currentBuildObject = this.buildableObjects[this.selectedBuildObject];
    const requiredCost = currentBuildObject ? currentBuildObject.cost : this.wallCost;
    
    this.inventory.removeItem('wood', requiredCost.wood);
    console.log(`Consumed ${requiredCost.wood} wood to build ${currentBuildObject.name}`);
  }
  
  showResourceWarning() {
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
    this.updateCursorWarningPosition();
    
    // Keep warning visible (no automatic hiding)
  }
  
  hideResourceWarning() {
    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.style.display = 'none';
    }
  }
  
  updateCursorWarningPosition() {
    const warningElement = document.getElementById('resourceWarning');
    if (!warningElement || warningElement.style.display === 'none') return;
    
    // Get current mouse position and add offset so text doesn't block cursor
    const rect = (this.camera as any).domElement?.getBoundingClientRect() || { left: 0, top: 0 };
    const mouseX = ((this.mouse.x + 1) / 2) * window.innerWidth;
    const mouseY = ((-this.mouse.y + 1) / 2) * window.innerHeight;
    
    warningElement.style.left = (mouseX + 15) + 'px'; // 15px offset to right
    warningElement.style.top = (mouseY - 25) + 'px';  // 25px offset above
  }
  
  // Method to set inventory reference
  setInventory(inventory: Inventory | null) {
    this.inventory = inventory;
  }
  
  returnResources(wall: THREE.Object3D) {
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
      // Loose item-like literal; cast to Item since only id/name/stackSize are read downstream.
      const woodItem = { id: 'wood', name: 'Wood', type: 'material', stackSize: 64 } as Item;
      
      console.log(`  About to add ${returnAmount} wood to inventory...`);
      
      // CRITICAL FIX: Only add the calculated return amount, not the original cost
      const actualAmountAdded = this.inventory.addItem(woodItem, returnAmount);
      
      console.log(`  Inventory.addItem returned: ${actualAmountAdded}`);
      console.log(`  Current wood in inventory AFTER: ${this.inventory.getItemCount('wood')}`);
      
      if (actualAmountAdded === returnAmount) {
        console.log(`✓ Successfully returned ${actualAmountAdded} wood from breaking ${buildObject.name} (half of ${originalCost})`);
        
        // Show floating text notification with the actual amount added
        this.showFloatingText(`+${actualAmountAdded} Wood`, wall.position, '#4CAF50');
      } else if (actualAmountAdded > 0) {
        console.warn(`Only returned ${actualAmountAdded} wood instead of ${returnAmount} - inventory may be full`);
        
        // Show partial return notification
        this.showFloatingText(`+${actualAmountAdded} Wood (Inventory Full)`, wall.position, '#FF9800');
      } else {
        console.warn(`Could not return any wood - inventory is full`);
        this.showFloatingText('Inventory Full!', wall.position, '#f44');
      }
    } else {
      console.log(`No resources returned for breaking ${buildObject.name} (original cost was ${originalCost}, half rounds to 0)`);
      
      // Show no resources notification for clarity
      this.showFloatingText('No Resources Returned', wall.position, '#888');
    }
  }
  
  // Floating text notification system
  showFloatingText(text: string, worldPosition: THREE.Vector3, color = '#fff') {
    // Convert world position to screen coordinates
    const screenPosition = this.worldToScreen(worldPosition);
    if (!screenPosition) return;
    
    // Create floating text element
    const floatingText = document.createElement('div');
    floatingText.style.cssText = `
      position: fixed;
      left: ${screenPosition.x}px;
      top: ${screenPosition.y}px;
      color: ${color};
      font-family: Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      pointer-events: none;
      z-index: 5000;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    `;
    floatingText.textContent = text;
    
    document.body.appendChild(floatingText);
    
    // Animate the floating text
    this.animateFloatingText(floatingText);
  }
  
  worldToScreen(worldPosition: THREE.Vector3) {
    // Convert 3D world position to 2D screen coordinates
    const vector = worldPosition.clone();
    vector.project(this.camera);
    
    // Check if position is in front of camera
    if (vector.z > 1) return null;
    
    // Convert to screen coordinates
    const screenX = (vector.x + 1) * window.innerWidth / 2;
    const screenY = (-vector.y + 1) * window.innerHeight / 2;
    
    return { x: screenX, y: screenY };
  }
  
  animateFloatingText(element: HTMLElement) {
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds
    const startY = parseFloat(element.style.top);
    const targetY = startY - 80; // Float up 80px
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOut(progress);
      
      // Update position (float upward)
      const currentY = startY + (targetY - startY) * easedProgress;
      element.style.top = currentY + 'px';
      
      // Fade out in the last 30% of animation
      const fadeProgress = Math.max(0, (progress - 0.7) / 0.3);
      element.style.opacity = String(1 - fadeProgress);
      
      // Continue animation or clean up
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Remove element when animation completes
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    };
    
    animate();
  }
  
  // Method to set item registry reference for resource returns
  setItemRegistry(itemRegistry: any) {
    this.itemRegistry = itemRegistry;
  }
  
  // Initialize 3D previews for selection screen
  initializeSelectionPreviews() {
    // Wait a short moment to ensure models are loaded
    setTimeout(() => {
      Object.entries(this.buildableObjects).forEach(([key, buildObject]) => {
        if (buildObject.mesh) {
          console.log(`Creating 3D preview for ${key}:`, buildObject.mesh);
          this.create3DPreview(key, buildObject);
        } else {
          console.warn(`No mesh found for ${key}, skipping preview`);
        }
      });
    }, 100);
  }
  
  create3DPreview(objectKey: string, buildObject: any) {
    const previewContainer = document.getElementById(`preview-${objectKey}`);
    if (!previewContainer) {
      console.warn(`Preview container not found for ${objectKey}`);
      return;
    }
    
    console.log(`Setting up 3D preview for ${objectKey}`);
    
    // Clear any existing content
    previewContainer.innerHTML = '';
    
    // Create mini scene for this preview
    const previewScene = new THREE.Scene();
    previewScene.background = new THREE.Color(0x222222); // Dark gray background for visibility
    
    const previewCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const previewRenderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false, // Set to false to show background
      preserveDrawingBuffer: true
    });
    
    // Set up renderer
    previewRenderer.setSize(50, 50);
    previewRenderer.setClearColor(0x222222); // Match scene background
    previewRenderer.shadowMap.enabled = false; // Disable shadows for performance
    
    // Add stronger lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    previewScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(2, 2, 2);
    previewScene.add(directionalLight);
    
    // Add second light from opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-2, 1, -2);
    previewScene.add(directionalLight2);
    
    // Clone and add the model
    const previewModel = buildObject.mesh.clone();
    console.log(`Cloned model for ${objectKey}:`, previewModel);
    
    // Reset scale to original size (remove the buildObject.scale scaling)
    previewModel.scale.setScalar(1.0);
    
    // Ensure materials are independent and visible
    previewModel.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.castShadow = false;
        child.receiveShadow = false;
        // Ensure material is visible
        child.material.transparent = false;
        child.material.opacity = 1.0;
        child.visible = true;
      }
    });
    
    previewScene.add(previewModel);
    console.log(`Added model to preview scene for ${objectKey}`);
    
    // Auto-fit camera to model bounds
    const box = new THREE.Box3().setFromObject(previewModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Get the largest dimension for proper camera distance
    const maxDim = Math.max(size.x, size.y, size.z);
    const cameraDistance = maxDim * 1.5; // Reduced multiplier for closer view of smaller models
    
    // Angled side view for all objects
    previewCamera.position.set(
      center.x + cameraDistance * 0.7,
      center.y + cameraDistance * 0.3,
      center.z + cameraDistance * 0.7
    );
    previewModel.rotation.y = Math.PI / 6; // 30-degree angle for better visibility
    
    // Always look at the center of the model
    previewCamera.lookAt(center);
    
    // Adjust camera settings for small preview
    previewCamera.near = cameraDistance * 0.1;
    previewCamera.far = cameraDistance * 10;
    previewCamera.updateProjectionMatrix();
    
    // Add rotation animation
    let rotationSpeed = 0.01;
    const animate = () => {
      if (previewContainer.parentNode) { // Only animate if still in DOM
        previewModel.rotation.y += rotationSpeed;
        previewRenderer.render(previewScene, previewCamera);
        requestAnimationFrame(animate);
      }
    };
    
    // Initial render
    previewRenderer.render(previewScene, previewCamera);
    
    // Add canvas to container
    previewContainer.appendChild(previewRenderer.domElement);
    
    // Start animation loop
    animate();
    
    // Store references for cleanup
    if (!this.selectionPreviews) {
      this.selectionPreviews = new Map();
    }
    this.selectionPreviews.set(objectKey, {
      scene: previewScene,
      camera: previewCamera,
      renderer: previewRenderer,
      model: previewModel
    });
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
