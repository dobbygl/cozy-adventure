import * as THREE from 'three';
import type { BuildingSystem } from './BuildingSystem.js';

/**
 * The build-mode ghost mesh: the green/red placement preview and the orange break-target
 * highlight that follow the cursor. Extracted from BuildingSystem so the orchestrator no
 * longer carries the per-frame preview logic. The preview MESH itself (`previewMesh`) stays
 * on BuildingSystem because placement/break/mode/HUD all read and clear it; this module
 * drives it through the typed `buildingSystem` reference (so a mis-named field/method is a
 * compile error). Validity helpers (getOccupiedCells, checkPhysical/PlayerIntersection,
 * findBreakableParent) and input (isCursorOverUI) stay on the host — they are shared with
 * the placement and break paths.
 */
export class BuildPreview {
  private buildingSystem: BuildingSystem;

  constructor(buildingSystem: BuildingSystem) {
    this.buildingSystem = buildingSystem;
  }

  updatePreview() {
    const bs = this.buildingSystem;
    if (!bs.isBuilding || !bs.wallMesh) return;

    // Always ensure preview matches the currently selected object
    this.ensureFreshPreview();

    // Check if cursor is over UI - hide preview if it is
    const mouseEvent = {
      clientX: ((bs.mouse.x + 1) / 2) * window.innerWidth,
      clientY: ((-bs.mouse.y + 1) / 2) * window.innerHeight,
    };
    if (bs.isCursorOverUI(mouseEvent)) {
      if (bs.previewMesh) {
        bs.previewMesh.visible = false;
      }
      return;
    }

    // Raycast to find intersection
    bs.raycaster.setFromCamera(bs.mouse, bs.camera);

    if (bs.buildingMode === 'build') {
      // Raycast to current level plane for build position
      const currentLevelY = bs.getCurrentLevelY();
      const levelPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -currentLevelY);
      const intersectPoint = new THREE.Vector3();
      let gridPos;

      if (bs.raycaster.ray.intersectPlane(levelPlane, intersectPoint)) {
        gridPos = this.snapToGrid(intersectPoint, currentLevelY);
      }

      if (gridPos) {
        // Create or update preview
        if (!bs.previewMesh) {
          this.createPreview();
        }

        // Update preview position and rotation with proper matrix updates
        bs.previewMesh!.position.copy(gridPos);
        bs.previewMesh!.rotation.y = bs.currentRotation;
        bs.previewMesh!.updateMatrixWorld(true); // Force matrix update
        bs.previewMesh!.visible = true;

        // Enhanced collision detection for preview - check only current level
        const occupiedCells = bs.getOccupiedCells(gridPos, bs.currentRotation);
        const hasCellConflicts = occupiedCells.some((cellKey) =>
          bs.levelManager.isCellOccupiedOnCurrentLevel(cellKey)
        );

        // Check physical mesh intersection
        const hasPhysicalConflicts = bs.checkPhysicalIntersection(gridPos, bs.currentRotation);
        const overlapsPlayer = bs.checkPlayerFootprintIntersection(gridPos, bs.currentRotation);

        const isInvalid = hasCellConflicts || hasPhysicalConflicts || overlapsPlayer;

        // Check if player has enough resources
        const hasEnoughResources = bs.resourceManager.hasRequiredResources(bs.selectedBuildObject);

        // Show/hide resource warning based on availability (only in build mode)
        if (!hasEnoughResources) {
          bs.resourceManager.showResourceWarning(bs.mouse, bs.camera as any);
        } else {
          bs.resourceManager.hideResourceWarning();
        }

        // Change preview color based on validity AND resource availability
        bs.previewMesh!.traverse((child: any) => {
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
    } else if (bs.buildingMode === 'delete') {
      // Hide resource warning in delete mode since it's not relevant
      bs.resourceManager.hideResourceWarning();

      // Delete mode: raycast against built walls specifically
      const intersects = bs.raycaster.intersectObjects(bs.builtWalls, true);

      if (intersects.length > 0) {
        const targetObject = bs.findBreakableParent(intersects[0].object);

        if (targetObject && !bs.animations.isAnimating(targetObject)) {
          // Only show preview for walls that are NOT currently animating
          this.createDeletePreview(targetObject);

          // Position preview at target object with proper matrix update
          bs.previewMesh!.position.copy(targetObject.position);
          bs.previewMesh!.rotation.copy(targetObject.rotation);
          bs.previewMesh!.updateMatrixWorld(true); // Force matrix update
          bs.previewMesh!.visible = true;

          // Orange color for valid break target
          bs.previewMesh!.traverse((child: any) => {
            if (child.isMesh && child.material) {
              child.material.color.setHex(0xff8844); // Orange for valid break
              child.material.opacity = 0.8;
            }
          });
        } else {
          // No valid target or target is animating - hide preview
          if (bs.previewMesh) {
            bs.previewMesh.visible = false;
          }
        }
      } else {
        // No valid target - hide preview
        if (bs.previewMesh) {
          bs.previewMesh.visible = false;
        }
      }
    }
  }

  createPreview() {
    const bs = this.buildingSystem;
    const currentBuildObject = bs.buildableObjects[bs.selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;

    // Clone the selected object mesh for preview
    bs.previewMesh = currentBuildObject.mesh.clone();

    this.setupPreviewMaterial(bs.previewMesh);
    bs.scene.add(bs.previewMesh);
  }

  createDeletePreview(targetObject: THREE.Object3D) {
    const bs = this.buildingSystem;
    // Remove existing preview if it exists
    if (bs.previewMesh) {
      bs.scene.remove(bs.previewMesh);
      bs.previewMesh = null;
    }

    // Clone the targeted object for preview instead of the selected build object
    bs.previewMesh = targetObject.clone();

    this.setupPreviewMaterial(bs.previewMesh);
    bs.scene.add(bs.previewMesh);
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
    const bs = this.buildingSystem;
    const currentBuildObject = bs.buildableObjects[bs.selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;

    // Check if preview exists and matches the selected object
    let needsRefresh = false;

    if (!bs.previewMesh) {
      needsRefresh = true;
    } else {
      // Identify a stale preview by a child-count mismatch with the selected object
      const previewChildCount = bs.previewMesh.children.length;
      const selectedChildCount = currentBuildObject.mesh.children.length;

      if (previewChildCount !== selectedChildCount) {
        needsRefresh = true;
      }
    }

    if (needsRefresh) {
      // Remove existing preview
      if (bs.previewMesh) {
        bs.scene.remove(bs.previewMesh);
        bs.previewMesh = null;
      }

      // Create fresh preview for selected object
      this.createPreview();
    }
  }

  snapToGrid(worldPosition: THREE.Vector3, targetY: number | null = null) {
    const bs = this.buildingSystem;
    // Use current level Y if no target specified
    if (targetY === null) {
      targetY = bs.getCurrentLevelY();
    }
    // Snap position to grid with proper rounding to prevent floating point errors
    const snappedX = Math.round(worldPosition.x / bs.gridSize) * bs.gridSize;
    const snappedZ = Math.round(worldPosition.z / bs.gridSize) * bs.gridSize;

    // Ensure snapped values are exactly on grid boundaries
    const gridX = Math.round(snappedX / bs.gridSize) * bs.gridSize;
    const gridZ = Math.round(snappedZ / bs.gridSize) * bs.gridSize;

    return new THREE.Vector3(gridX, targetY, gridZ);
  }
}
