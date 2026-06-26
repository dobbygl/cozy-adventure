import * as THREE from 'three';

export class BuildingPreview {
  constructor(scene, camera, buildingSystem) {
    this.scene = scene;
    this.camera = camera;
    this.buildingSystem = buildingSystem;
    this.previewMesh = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  updateMousePosition(event) {
    // Convert mouse position to normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  updatePreview(buildingMode, selectedBuildObject, currentRotation, builtWalls, animatingWalls) {
    if (!this.buildingSystem.isBuilding) return;
    
    // Always ensure preview matches the currently selected object
    this.ensureFreshPreview(selectedBuildObject);
    
    // Check if cursor is over UI - hide preview if it is
    const mouseEvent = { 
      clientX: ((this.mouse.x + 1) / 2) * window.innerWidth, 
      clientY: ((-this.mouse.y + 1) / 2) * window.innerHeight 
    };
    if (this.buildingSystem.isCursorOverUI(mouseEvent)) {
      if (this.previewMesh) {
        this.previewMesh.visible = false;
      }
      return;
    }
    
    // Raycast to find intersection
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    if (buildingMode === 'build') {
      this.updateBuildPreview(selectedBuildObject, currentRotation);
    } else if (buildingMode === 'delete') {
      this.updateDeletePreview(builtWalls, animatingWalls);
    }
  }

  updateBuildPreview(selectedBuildObject, currentRotation) {
    let gridPos;
    
    // Use ground level for all building previews
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -6);
    const intersectPoint = new THREE.Vector3();
    
    if (this.raycaster.ray.intersectPlane(groundPlane, intersectPoint)) {
      gridPos = this.buildingSystem.snapToGrid(intersectPoint, 6);
    }
    
    if (gridPos) {
      // Create or update preview
      if (!this.previewMesh) {
        this.createPreview(selectedBuildObject);
      }
      
      // Update preview position and rotation
      this.previewMesh.position.copy(gridPos);
      this.previewMesh.rotation.y = currentRotation;
      this.previewMesh.updateMatrixWorld(true);
      this.previewMesh.visible = true;
      
      // Check validity and resources
      const occupiedCells = this.buildingSystem.getOccupiedCells(gridPos, currentRotation);
      const cellConflicts = occupiedCells.filter(cellKey => this.buildingSystem.occupiedCells.has(cellKey));
      const hasCellConflicts = cellConflicts.length > 0;
      const hasPhysicalConflicts = this.buildingSystem.checkPhysicalIntersection(gridPos, currentRotation);
      const isInvalid = hasCellConflicts || hasPhysicalConflicts;
      const hasEnoughResources = this.buildingSystem.hasRequiredResources();
      
      // Update preview appearance
      this.updatePreviewAppearance(isInvalid, hasEnoughResources);
      
      // Show/hide resource warning
      if (!hasEnoughResources) {
        this.buildingSystem.showResourceWarning();
      } else {
        this.buildingSystem.hideResourceWarning();
      }
    }
  }

  updateDeletePreview(builtWalls, animatingWalls) {
    // Hide resource warning in delete mode
    this.buildingSystem.hideResourceWarning();
    
    // Delete mode: raycast against built walls specifically
    const intersects = this.raycaster.intersectObjects(builtWalls, true);
    
    if (intersects.length > 0) {
      const targetObject = this.buildingSystem.findBreakableParent(intersects[0].object);
      
      if (targetObject && !animatingWalls.has(targetObject)) {
        // Create preview that matches the targeted object
        this.createDeletePreview(targetObject);
        
        // Position preview at target object
        this.previewMesh.position.copy(targetObject.position);
        this.previewMesh.rotation.copy(targetObject.rotation);
        this.previewMesh.updateMatrixWorld(true);
        this.previewMesh.visible = true;
        
        // Orange color for valid break target
        this.previewMesh.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xff8844);
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

  createPreview(selectedBuildObject) {
    const currentBuildObject = this.buildingSystem.buildableObjects[selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;
    
    // Clone the selected object mesh for preview
    this.previewMesh = currentBuildObject.mesh.clone();
    this.setupPreviewMaterial(this.previewMesh);
    this.scene.add(this.previewMesh);
  }

  createDeletePreview(targetObject) {
    // Remove existing preview if it exists
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
    
    // Clone the targeted object for preview
    this.previewMesh = targetObject.clone();
    this.setupPreviewMaterial(this.previewMesh);
    this.scene.add(this.previewMesh);
  }

  setupPreviewMaterial(mesh) {
    // Make preview materials transparent and independent
    mesh.traverse((child) => {
      if (child.isMesh) {
        // Deep clone material
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map(mat => mat.clone());
          } else {
            child.material = child.material.clone();
          }
          
          // Set preview-specific properties
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.transparent = true;
              mat.opacity = 0.7;
              mat.color.setHex(0x44ff44);
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = 0.7;
            child.material.color.setHex(0x44ff44);
          }
        }
        
        // Disable shadows for preview
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }

  ensureFreshPreview(selectedBuildObject) {
    const currentBuildObject = this.buildingSystem.buildableObjects[selectedBuildObject];
    if (!currentBuildObject || !currentBuildObject.mesh) return;
    
    // Check if preview exists and matches the selected object
    let needsRefresh = false;
    
    if (!this.previewMesh) {
      needsRefresh = true;
    } else {
      // Check if preview mesh matches current selected object
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
      this.createPreview(selectedBuildObject);
    }
  }

  updatePreviewAppearance(isInvalid, hasEnoughResources) {
    if (!this.previewMesh) return;
    
    this.previewMesh.traverse((child) => {
      if (child.isMesh && child.material) {
        if (isInvalid || !hasEnoughResources) {
          child.material.color.setHex(0xff4444); // Red for invalid
          child.material.opacity = 0.5;
        } else {
          child.material.color.setHex(0x44ff44); // Green for valid
          child.material.opacity = 0.7;
        }
      }
    });
  }

  hidePreview() {
    if (this.previewMesh) {
      this.previewMesh.visible = false;
    }
  }

  destroy() {
    if (this.previewMesh) {
      this.scene.remove(this.previewMesh);
      this.previewMesh = null;
    }
  }
}