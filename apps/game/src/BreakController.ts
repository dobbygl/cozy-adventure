import * as THREE from 'three';
import type { BuildingSystem } from './BuildingSystem.js';

/**
 * Demolishing buildings: the delete-mode click (deleteWall -> breakObject), the break
 * animation's confirmed teardown (completeWallBreak), and applying a server-confirmed
 * removal (removeNetworkBuilding).
 *
 * Server-authoritative in multiplayer: when BuildingSystem.requestRemove is set, breakObject
 * emits remove_building and RETURNS before any local mutation or refund (the server owns the
 * world map and broadcasts the removal; a local wood grant would desync the inventory). The
 * confirmed building_removed event then arrives via removeNetworkBuilding. In local mode it
 * refunds half and breaks directly. Drives BuildingSystem through the typed host; the shared
 * findBreakableParent / validity helpers and requestRemove stay on the host.
 */
export class BreakController {
  private buildingSystem: BuildingSystem;

  constructor(buildingSystem: BuildingSystem) {
    this.buildingSystem = buildingSystem;
  }

  deleteWall() {
    const bs = this.buildingSystem;
    if (!bs.wallMesh) return;

    // Raycast to find built walls
    bs.raycaster.setFromCamera(bs.mouse, bs.camera);
    const intersects = bs.raycaster.intersectObjects(bs.builtWalls, true);

    if (intersects.length > 0) {
      const targetObject = bs.findBreakableParent(intersects[0].object);
      if (targetObject) {
        // Ignore a wall that is already animating (prevents breaking it twice)
        if (bs.animations.isAnimating(targetObject)) {
          return;
        }

        this.breakObject(targetObject);

        // Stay in delete mode and refresh the preview after the DOM settles
        if (bs.isBuilding) {
          setTimeout(() => {
            bs.updatePreview();
          }, 50);
        }
      }
    }
  }

  breakObject(objectToBreak: THREE.Object3D) {
    const bs = this.buildingSystem;
    if (!objectToBreak || !objectToBreak.userData.isBreakable) return;

    // Double-check it is not already animating
    if (bs.animations.isAnimating(objectToBreak)) {
      return;
    }

    // Multiplayer: demolition is server-authoritative. Emit remove_building and RETURN before
    // touching anything local — the server owns the world map and broadcasts the removal, and
    // returning resources here would grant wood the server never charged back, desyncing the
    // inventory. (No local refund in network mode — a documented v1 divergence; the server
    // grants none either.) In local mode requestRemove is null and we break directly below.
    if (bs.requestRemove) {
      const networkId = objectToBreak.userData.networkId;
      if (typeof networkId === 'number') {
        bs.requestRemove(networkId);
      } else {
        console.warn('⚠️ Cannot remove a building without a networkId in multiplayer', objectToBreak);
      }
      return;
    }

    // Return half of the resources (single-player). The manager owns the accounting;
    // reproduce the floating-text feedback from its result here.
    const refund = bs.resourceManager.returnResources(objectToBreak);
    if (refund && refund.expectedAmount > 0) {
      if (refund.amountAdded === refund.expectedAmount) {
        bs.showFloatingText(`+${refund.amountAdded} Wood`, objectToBreak.position, '#4CAF50');
      } else if (refund.amountAdded > 0) {
        bs.showFloatingText(`+${refund.amountAdded} Wood (Inventory Full)`, objectToBreak.position, '#FF9800');
      } else {
        bs.showFloatingText('Inventory Full!', objectToBreak.position, '#f44');
      }
    } else if (refund) {
      bs.showFloatingText('No Resources Returned', objectToBreak.position, '#888');
    }

    // Play the break animation; its confirmed completion runs the authoritative teardown
    // (free cells, untrack, remove from scene) via completeWallBreak.
    bs.animations.playDestructionAnimation(objectToBreak)?.then(() => this.completeWallBreak(objectToBreak));
  }

  completeWallBreak(objectToBreak: THREE.Object3D) {
    const bs = this.buildingSystem;
    // Clean up building tracking
    if (objectToBreak.userData.isBuildingWall) {
      // The cells this wall holds, with a fallback recompute if the map lost them
      // (e.g. a wall whose mapping was dropped) — keeps a stray wall breakable.
      let wallCells = bs.tracking.cellsFor(objectToBreak);
      if (wallCells.length === 0) {
        const originalSelectedObject = bs.selectedBuildObject;
        bs.selectedBuildObject = 'wall';
        wallCells = bs.getOccupiedCells(objectToBreak.position, objectToBreak.rotation.y);
        bs.selectedBuildObject = originalSelectedObject;
      }

      // Untrack the building (walls list + registry) and free its cells, all in one path.
      bs.tracking.remove(objectToBreak, wallCells);
      wallCells.forEach((cellKey) => bs.removeDebugIndicator(cellKey));
    }

    // Remove object from scene (the animating flag and particle cleanup are owned by
    // BuildingAnimations, which cleared/scheduled them when the destruction tween finished).
    bs.scene.remove(objectToBreak);

    // Remove from collision system
    if (bs.collisionSystem) {
      bs.collisionSystem.removeCollider(objectToBreak);
    }

    // Force preview update to keep its rotation state in sync
    if (bs.isBuilding && bs.previewMesh) {
      bs.previewMesh.rotation.y = bs.currentRotation;
      bs.previewMesh.updateMatrixWorld(true);
      bs.updatePreview();
    }
  }

  /**
   * Remove a server-confirmed building by networkId (multiplayer onBuildingRemoved). Routes
   * both the live demolition path (a peer or this client ran remove_building) and reconnect
   * snapshots through here, undoing everything tracking.add recorded (walls list + registry +
   * cells) so nothing leaks.
   */
  removeNetworkBuilding(networkId: number): void {
    const bs = this.buildingSystem;
    const wall = bs.tracking.findByNetworkId(networkId);
    if (!wall) return;
    bs.scene.remove(wall);
    bs.collisionSystem?.removeCollider(wall);
    bs.tracking.remove(wall, bs.tracking.cellsFor(wall));
  }
}
