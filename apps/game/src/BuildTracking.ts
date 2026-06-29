import * as THREE from 'three';
import type { LevelManager } from './LevelManager.js';
import type { BuildableObjectsRegistry } from './BuildableObjectsRegistry.js';

/**
 * The single write path for "which buildings exist and which grid cells they hold".
 *
 * It COORDINATES the three existing owners rather than re-owning their state: the flat list
 * of placed meshes lives here, per-level occupancy + cell->wall mapping stays in
 * LevelManager, and by-type instances stay in the registry. Occupancy writes always target
 * the CURRENT level (exactly like buildWall); a caller that needs another level sets
 * LevelManager.currentLevel first — the single-player save-restore path does this to land a
 * building on its saved level. (Network materialize does NOT, so it tracks against the
 * level the player is standing on — a pre-existing quirk this refactor preserves.)
 *
 * Pure data + Object3D refs, so it is unit-testable without a scene.
 */
export class BuildTracking {
  /** Every placed building mesh, flat across levels. The only state this object owns. */
  readonly builtWalls: THREE.Object3D[] = [];

  constructor(
    private readonly levelManager: LevelManager,
    private readonly registry: BuildableObjectsRegistry
  ) {}

  /** Record a placed building and reserve its footprint cells on the current level. */
  add(wall: THREE.Object3D, registryType: string, cellKeys: string[]): void {
    this.builtWalls.push(wall);
    this.registry.addBuiltObject(registryType, wall);
    const cellToWall = this.levelManager.getCurrentLevelCellToWallMap();
    for (const cellKey of cellKeys) {
      this.levelManager.addOccupiedCell(cellKey);
      cellToWall.set(cellKey, wall);
    }
  }

  /** Cell keys currently mapped to this wall on the current level (empty if none). */
  cellsFor(wall: THREE.Object3D): string[] {
    const cells: string[] = [];
    for (const [cellKey, mapped] of this.levelManager.getCurrentLevelCellToWallMap()) {
      if (mapped === wall) cells.push(cellKey);
    }
    return cells;
  }

  /** Untrack a building: drop it from the walls list + registry, free the given cells. */
  remove(wall: THREE.Object3D, cellKeys: string[]): void {
    const index = this.builtWalls.indexOf(wall);
    if (index !== -1) this.builtWalls.splice(index, 1);
    this.registry.removeBuiltObject(wall);
    const cellToWall = this.levelManager.getCurrentLevelCellToWallMap();
    for (const cellKey of cellKeys) {
      this.levelManager.removeOccupiedCell(cellKey);
      cellToWall.delete(cellKey);
    }
  }

  /**
   * Untrack a building and free its footprint on whichever level actually owns it, matched by
   * wall identity rather than the current level. Use this for demolition: the confirmed
   * building_removed (and reconnect snapshots) can arrive while the player is viewing a
   * different level than the one this building was tracked on, where the current-level-only
   * `remove` would drop the mesh but leak its reserved cells. Returns the freed cell keys
   * (for per-cell UI cleanup such as debug indicators).
   */
  removeAcrossLevels(wall: THREE.Object3D): string[] {
    const index = this.builtWalls.indexOf(wall);
    if (index !== -1) this.builtWalls.splice(index, 1);
    this.registry.removeBuiltObject(wall);
    return this.levelManager.removeWallFromAllLevels(wall);
  }

  /** Find a tracked building by its stable network id (multiplayer). */
  findByNetworkId(networkId: number): THREE.Object3D | undefined {
    return this.builtWalls.find((wall) => wall.userData.networkId === networkId);
  }

  /** Forget every building (teardown). Clears the CURRENT level's occupancy maps. */
  clear(): void {
    this.builtWalls.length = 0;
    this.registry.clearBuiltObjects();
    this.levelManager.getCurrentLevelOccupiedCells().clear();
    this.levelManager.getCurrentLevelCellToWallMap().clear();
  }
}
