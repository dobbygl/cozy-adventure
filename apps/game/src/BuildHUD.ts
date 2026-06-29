import * as THREE from 'three';
import type { BuildingSystem } from './BuildingSystem.js';

/**
 * The building system's DOM: the build-menu selection screen (with its 3D preview
 * thumbnails), the mode/cost banner above the hotbar, and floating world-space text.
 * Extracted from BuildingSystem so the orchestrator no longer carries ~700 lines of
 * markup + canvas-thumbnail wiring. It reads/commands BuildingSystem through the typed
 * `buildingSystem` reference (so a mis-named reference is a compile error); BuildingSystem
 * keeps thin delegating stubs for the methods its callers already use.
 */
export class BuildHUD {
  private buildingSystem: BuildingSystem;
  /** Esc-to-close handler for the selection screen, while it is open. */
  private selectionScreenKeyHandler: ((e: KeyboardEvent) => void) | null = null;
  /** Live 3D preview renderers keyed by buildable, for cleanup. */
  private selectionPreviews: Map<string, { scene: THREE.Scene; camera: THREE.Camera; renderer: THREE.WebGLRenderer; model: THREE.Object3D }> | null = null;

  constructor(buildingSystem: BuildingSystem) {
    this.buildingSystem = buildingSystem;
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
        ${Object.entries(this.buildingSystem.buildableObjects).map(([key, obj]: [string, any]) => `
          <div class="object-card" data-object="${key}" style="
            background: ${this.buildingSystem.selectedBuildObject === key ?
              'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #DEB887 100%)' :
              'linear-gradient(135deg, rgba(222, 184, 135, 0.3) 0%, rgba(245, 222, 179, 0.2) 50%, rgba(222, 184, 135, 0.3) 100%)'
            };
            border: 3px solid ${this.buildingSystem.selectedBuildObject === key ? '#F5DEB3' : '#A0522D'};
            border-radius: 18px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            box-shadow: ${this.buildingSystem.selectedBuildObject === key ?
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
                  color: ${this.buildingSystem.selectedBuildObject === key ? '#8B4513' : '#F5DEB3'};
                  font-family: 'Fredoka One', Arial, sans-serif;
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 6px;
                  line-height: 1.2;
                  text-shadow: ${this.buildingSystem.selectedBuildObject === key ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};
                ">${obj.name}</div>

                <div style="
                  color: ${this.buildingSystem.selectedBuildObject === key ? '#A0522D' : '#DEB887'};
                  font-size: 14px;
                  font-weight: 600;
                  margin-bottom: 4px;
                ">🪵 ${obj.cost.wood} Wood</div>

                <div style="
                  color: ${this.buildingSystem.selectedBuildObject === key ? '#8B4513' : '#DEB887'};
                  font-size: 12px;
                  opacity: 0.8;
                ">${obj.cellSize.width}x${obj.cellSize.height} cells</div>
              </div>

              ${this.buildingSystem.selectedBuildObject === key ? `
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
        this.buildingSystem.exitBuildingMode();
      }
    };
    document.addEventListener('keydown', this.selectionScreenKeyHandler);

    const closeButton = selectionScreen.querySelector<HTMLElement>('.selection-close');
    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.buildingSystem.exitBuildingMode();
    });

    // Add click handlers to object cards
    const objectCards = selectionScreen.querySelectorAll<HTMLElement>('.object-card');
    objectCards.forEach((card) => {
      card.addEventListener('click', () => {
        const objectKey = card.getAttribute('data-object')!;
        this.buildingSystem.selectBuildObject(objectKey);
      });

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        if (card.getAttribute('data-object') !== this.buildingSystem.selectedBuildObject) {
          card.style.borderColor = '#F5DEB3';
          card.style.transform = 'translateY(-2px) scale(1.02)';
          card.style.boxShadow = '0 8px 25px rgba(245, 222, 179, 0.3), inset 0 2px 5px rgba(139, 69, 19, 0.1)';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.getAttribute('data-object') !== this.buildingSystem.selectedBuildObject) {
          card.style.borderColor = '#A0522D';
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)';
        }
      });
    });

    selectionScreen.style.display = 'block';
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
    if (this.buildingSystem.previewMesh) {
      this.buildingSystem.scene.remove(this.buildingSystem.previewMesh);
      this.buildingSystem.previewMesh = null;
    }

    // Force immediate preview update with new object
    if (this.buildingSystem.isBuilding) {
      this.buildingSystem.updatePreview();
    }

    // Update UI to show new selection
    this.updateBuildingUI();
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

    const modeIcon = this.buildingSystem.buildingMode === 'build' ? '🔨' : '🗑️';
    const modeText = this.buildingSystem.buildingMode === 'build' ? 'Build' : 'Break';

    if (this.buildingSystem.buildingMode === 'build') {
      const currentBuildObject = this.buildingSystem.buildableObjects[this.buildingSystem.selectedBuildObject];
      const hasResources = this.buildingSystem.resourceManager.hasRequiredResources(this.buildingSystem.selectedBuildObject);
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
    vector.project(this.buildingSystem.camera);

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

  // Initialize 3D previews for selection screen
  initializeSelectionPreviews() {
    // Wait a short moment to ensure models are loaded
    setTimeout(() => {
      Object.entries(this.buildingSystem.buildableObjects).forEach(([key, buildObject]) => {
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
    const rotationSpeed = 0.01;
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
}
