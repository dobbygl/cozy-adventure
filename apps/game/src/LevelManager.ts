import * as THREE from 'three';

/** Result of querying whether a cell is occupied across levels. */
export interface CellOccupancy {
  occupied: boolean;
  level: number | null;
}

/** Snapshot of the level system's current configuration. */
export interface LevelInfo {
  currentLevel: number;
  currentLevelY: number;
  minLevel: number;
  maxLevel: number;
  levelHeight: number;
  totalLevels: number;
}

export class LevelManager {
  scene: THREE.Scene;
  gridSize: number;
  gridExtent: number;
  currentLevel: number;
  levelHeight: number;
  maxLevels: number;
  minLevel: number;
  levelGrids: Map<number, THREE.GridHelper>;
  levelOccupiedCells: Map<number, Set<string>>;
  levelCellToWallMap: Map<number, Map<string, THREE.Object3D>>;
  /**
   * Never assigned: the keydown listener is registered as an anonymous arrow in
   * setupKeyboardControls, so destroy() has nothing concrete to remove. Kept for
   * parity with the original (the removeEventListener was already a no-op).
   */
  handleKeyDown?: (event: KeyboardEvent) => void;

  constructor(scene: THREE.Scene, gridSize = 2.0, gridExtent = 50) {
    this.scene = scene;
    this.gridSize = gridSize;
    this.gridExtent = gridExtent;

    // Multi-level grid system
    this.currentLevel = 0; // Current building level (0 = ground level at Y=6)
    this.levelHeight = 4.0; // Height between each level (4 tiles)
    this.maxLevels = 10; // Maximum number of levels (0-9)
    this.minLevel = 0; // Minimum level

    // Level-specific data structures
    this.levelGrids = new Map(); // Store grid helpers for each level
    this.levelOccupiedCells = new Map(); // Store occupied cells per level
    this.levelCellToWallMap = new Map(); // Store cell-to-wall mappings per level

    // Keyboard controls
    this.setupKeyboardControls();

    this.initialize();
  }

  initialize(): void {
    // Initialize level-specific data structures
    for (let level = this.minLevel; level < this.maxLevels; level++) {
      this.levelOccupiedCells.set(level, new Set());
      this.levelCellToWallMap.set(level, new Map());
    }

    // Initialize grids for first few levels
    this.createLevelGrid(0); // Ground level
    this.createLevelGrid(1); // First upper level
    this.createLevelGrid(-1); // First basement level (if needed)

    console.log(`Multi-level grid system initialized with ${this.maxLevels} levels`);
    console.log(`Current level: ${this.currentLevel} (Y=${this.getLevelY(this.currentLevel)})`);
  }

  createLevelGrid(level: number): void {
    // Don't create grid if it already exists
    if (this.levelGrids.has(level)) return;

    const levelY = this.getLevelY(level);

    // Create a grid helper for this level
    const levelGrid = new THREE.GridHelper(
      this.gridExtent * this.gridSize, // Total size
      this.gridExtent, // Number of divisions
      level === this.currentLevel ? 0x666666 : 0x333333, // Brighter for current level
      level === this.currentLevel ? 0x444444 : 0x222222 // Brighter for current level
    );

    levelGrid.position.y = levelY + 0.01; // Slightly above level
    levelGrid.visible = false; // Hidden by default
    levelGrid.userData = { level: level }; // Store level info

    this.scene.add(levelGrid);
    this.levelGrids.set(level, levelGrid);

    console.log(`Created grid for level ${level} at Y=${levelY}`);
  }

  setupKeyboardControls(): void {
    // Add keyboard event listener for level switching
    document.addEventListener('keydown', (event) => {
      // Only handle level switching if not typing in an input field
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.code) {
        case 'ArrowUp':
          event.preventDefault();
          this.switchToLevel(this.currentLevel + 1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.switchToLevel(this.currentLevel - 1);
          break;
      }
    });
  }

  getLevelY(level: number): number {
    // Calculate Y position for a given level
    // Level 0 = Y 6 (ground level)
    // Level 1 = Y 10, Level 2 = Y 14, etc.
    // Level -1 = Y 2, Level -2 = Y -2, etc.
    return 6 + level * this.levelHeight;
  }

  switchToLevel(newLevel: number): boolean {
    // Validate level bounds
    if (newLevel < this.minLevel || newLevel >= this.maxLevels) {
      console.warn(`Level ${newLevel} is out of bounds (${this.minLevel}-${this.maxLevels - 1})`);
      return false;
    }

    const previousLevel = this.currentLevel;
    this.currentLevel = newLevel;

    // Create grid for new level if it doesn't exist
    this.createLevelGrid(newLevel);

    // Trigger UI update to show level change
    this.dispatchLevelChangeEvent(previousLevel, newLevel);

    console.log(`Switched from level ${previousLevel} to level ${newLevel}`);
    console.log(`New level Y position: ${this.getLevelY(newLevel)}`);
    console.log(`Occupied cells at new level: ${this.getCurrentLevelOccupiedCells().size}`);

    return true;
  }

  updateGridVisibility(isBuilding = false): void {
    // Hide all grids first
    this.levelGrids.forEach((grid, level) => {
      grid.visible = false;
      // GridHelper.material is typed as the generic Material; it is a LineBasicMaterial at runtime.
      const material = grid.material as THREE.LineBasicMaterial;
      // Update grid colors based on current level
      if (level === this.currentLevel) {
        material.color.setHex(0x666666); // Brighter for current level
      } else {
        material.color.setHex(0x333333); // Dimmer for other levels
      }
    });

    // Show current level grid if building
    if (isBuilding) {
      const currentGrid = this.levelGrids.get(this.currentLevel);
      if (currentGrid) {
        currentGrid.visible = true;
      }
    }
  }

  dispatchLevelChangeEvent(previousLevel: number, newLevel: number): void {
    // Dispatch a custom event for other systems to listen to level changes
    const event = new CustomEvent('levelChanged', {
      detail: {
        previousLevel: previousLevel,
        newLevel: newLevel,
        levelY: this.getLevelY(newLevel),
        levelInfo: this.getLevelInfo(),
      },
    });
    document.dispatchEvent(event);
  }

  getCurrentLevelOccupiedCells(): Set<string> {
    return this.levelOccupiedCells.get(this.currentLevel) || new Set<string>();
  }

  // Check if a cell is occupied on the current level only
  isCellOccupiedOnCurrentLevel(cellKey: string): boolean {
    const currentLevelCells = this.getCurrentLevelOccupiedCells();
    return currentLevelCells.has(cellKey);
  }

  // Check if a cell is occupied on any level (for debugging/info purposes)
  isCellOccupiedOnAnyLevel(cellKey: string): CellOccupancy {
    for (const [level, occupiedCells] of this.levelOccupiedCells) {
      if (occupiedCells.has(cellKey)) {
        return { occupied: true, level: level };
      }
    }
    return { occupied: false, level: null };
  }

  // Add a cell to the current level's occupied cells
  addOccupiedCell(cellKey: string): void {
    const currentLevelCells = this.getCurrentLevelOccupiedCells();
    currentLevelCells.add(cellKey);
    console.log(`Added occupied cell ${cellKey} to level ${this.currentLevel}`);
  }

  // Remove a cell from the current level's occupied cells
  removeOccupiedCell(cellKey: string): boolean {
    const currentLevelCells = this.getCurrentLevelOccupiedCells();
    if (currentLevelCells.has(cellKey)) {
      currentLevelCells.delete(cellKey);
      console.log(`Removed occupied cell ${cellKey} from level ${this.currentLevel}`);
      return true;
    }
    return false;
  }

  /**
   * Free every cell mapped to `wall`, on whatever level holds it, matched by wall IDENTITY
   * (a cell key like "2,3" can repeat across levels, so we compare the mapped object, not the
   * key — leaving another level's building intact). Returns the freed cell keys. Demolition
   * uses this so a building removed while the player is viewing a different build level than
   * the one it was tracked on still releases its footprint on its own level (deleting the
   * current entry mid-iteration is well-defined for Map).
   */
  removeWallFromAllLevels(wall: THREE.Object3D): string[] {
    const freed: string[] = [];
    for (const [level, cellToWall] of this.levelCellToWallMap) {
      const occupiedCells = this.levelOccupiedCells.get(level);
      for (const [cellKey, mapped] of cellToWall) {
        if (mapped === wall) {
          cellToWall.delete(cellKey);
          occupiedCells?.delete(cellKey);
          freed.push(cellKey);
        }
      }
    }
    return freed;
  }

  getCurrentLevelCellToWallMap(): Map<string, THREE.Object3D> {
    return this.levelCellToWallMap.get(this.currentLevel) || new Map<string, THREE.Object3D>();
  }

  // Method to get level information
  getCurrentLevel(): number {
    return this.currentLevel;
  }

  getCurrentLevelY(): number {
    return this.getLevelY(this.currentLevel);
  }

  getLevelInfo(): LevelInfo {
    return {
      currentLevel: this.currentLevel,
      currentLevelY: this.getCurrentLevelY(),
      minLevel: this.minLevel,
      maxLevel: this.maxLevels - 1,
      levelHeight: this.levelHeight,
      totalLevels: this.maxLevels,
    };
  }

  // Clean up method
  destroy(): void {
    // Remove keyboard event listener (no-op: the listener is an anonymous arrow,
    // so handleKeyDown was never assigned; guarded to stay type-safe).
    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }

    // Remove all level grids from scene
    this.levelGrids.forEach((grid) => {
      this.scene.remove(grid);
    });

    // Clear all data structures
    this.levelGrids.clear();
    this.levelOccupiedCells.clear();
    this.levelCellToWallMap.clear();
  }
}
