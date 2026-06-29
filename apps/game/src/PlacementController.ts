import type { BuildingState } from '@cozy/shared';
import type { BuildingSystem } from './BuildingSystem.js';
import { createPlacedBuildingMesh } from './BuildingMeshFactory.js';

/**
 * Placing buildings: the local build action (validate -> charge -> place -> track ->
 * animate) and materializing a server-confirmed placement.
 *
 * Server-authoritative in multiplayer: when BuildingSystem.requestPlace is set, buildWall
 * emits the place_building command and RETURNS (no local mutation, no local charge — the
 * server consumes the cost and the confirmed building_placed event arrives via
 * materializeNetworkBuilding). In local mode requestPlace is null and it builds + charges
 * directly. Drives BuildingSystem through the typed host; the shared validity helpers
 * (getOccupiedCells, checkPhysical/PlayerIntersection) and previewMesh stay on the host.
 */
export class PlacementController {
  private buildingSystem: BuildingSystem;

  constructor(buildingSystem: BuildingSystem) {
    this.buildingSystem = buildingSystem;
  }

  buildWall() {
    const bs = this.buildingSystem;
    const currentBuildObject = bs.buildableObjects[bs.selectedBuildObject];
    if (!bs.previewMesh || !currentBuildObject || !currentBuildObject.mesh) return;

    // Courtesy pre-check; the server is authoritative on cost in network mode.
    if (!bs.resourceManager.hasRequiredResources(bs.selectedBuildObject)) {
      bs.resourceManager.showResourceWarning(bs.mouse, bs.camera as any);
      return;
    }

    const buildPosition = bs.previewMesh.position.clone();
    const occupiedCells = bs.getOccupiedCells(buildPosition, bs.currentRotation);

    // Reject if any footprint cell is taken on the current level, if the mesh physically
    // intersects another, or if it would overlap the player.
    const hasCellConflicts = occupiedCells.some((cellKey) =>
      bs.levelManager.isCellOccupiedOnCurrentLevel(cellKey)
    );
    const hasPhysicalConflicts = bs.checkPhysicalIntersection(buildPosition, bs.currentRotation);
    const overlapsPlayer = bs.checkPlayerFootprintIntersection(buildPosition, bs.currentRotation);
    if (hasCellConflicts || hasPhysicalConflicts || overlapsPlayer) {
      return;
    }

    // Multiplayer: placement is server-authoritative. Emit place_building (position +
    // rotation + level; the server derives the footprint cells) and let the confirmed
    // building_placed event materialize it on every client. The server validates the type
    // and CONSUMES the cost (returning an inventory_delta), so we do NOT deduct locally.
    // In local mode requestPlace is null and we build + charge directly below.
    if (bs.requestPlace) {
      bs.requestPlace({
        registryType: bs.selectedBuildObject,
        position: { x: buildPosition.x, y: buildPosition.y, z: buildPosition.z },
        rotation: { x: 0, y: bs.currentRotation, z: 0 },
        level: bs.levelManager.currentLevel,
      });
      return;
    }

    // Local placement: clone + stamp via the shared factory, add to scene + collision.
    const newWall = createPlacedBuildingMesh(
      currentBuildObject.mesh,
      bs.selectedBuildObject,
      buildPosition,
      bs.currentRotation
    );
    bs.scene.add(newWall);
    if (bs.collisionSystem) {
      bs.collisionSystem.addCollider(newWall, 'mesh');
    }

    // Charge the cost, record + reserve the cells (single write path), then animate.
    bs.resourceManager.consumeResources(bs.selectedBuildObject);
    bs.tracking.add(newWall, bs.selectedBuildObject, occupiedCells);
    if (bs.showDebugIndicators) {
      occupiedCells.forEach((cellKey) => bs.createDebugIndicator(cellKey));
    }
    bs.animations.playPlacementAnimation(newWall);
  }

  /**
   * Materialize a server-confirmed building (multiplayer onBuildingPlaced). Reuses the
   * save-restore path, stamping the stable networkId so it can be matched later. Cell
   * occupancy is approximate for a building on a non-current level (mesh position is exact);
   * the server remains authoritative for conflicts.
   */
  materializeNetworkBuilding(building: BuildingState): void {
    this.buildingSystem.saveManager.restoreBuilding({
      type: building.registryType,
      position: building.position,
      rotation: building.rotation.y,
      networkId: building.networkId,
    });
  }
}
