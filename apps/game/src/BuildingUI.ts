import * as THREE from 'three';

/** Cached per-object 3D preview render context. */
interface SelectionPreview {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  model: THREE.Object3D;
}

export class BuildingUI {
  // BuildingSystem is not yet migrated (see MIGRACION-TYPESCRIPT.md, Ola 5); typed loosely.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildingSystem: any;
  selectionScreenKeyHandler: ((event: KeyboardEvent) => void) | null;
  selectionPreviews: Map<string, SelectionPreview>;

  constructor(buildingSystem: any) {
    this.buildingSystem = buildingSystem;
    this.selectionScreenKeyHandler = null;
    this.selectionPreviews = new Map();
  }

  showBuildingUI(): void {
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

  updateBuildingUI(): void {
    const buildingText = document.getElementById('buildingText');
    if (!buildingText) return;

    const modeIcon = this.buildingSystem.buildingMode === 'build' ? '🔨' : '🗑️';
    const modeText = this.buildingSystem.buildingMode === 'build' ? 'Build' : 'Break';

    if (this.buildingSystem.buildingMode === 'build') {
      const currentBuildObject =
        this.buildingSystem.buildableObjects[this.buildingSystem.selectedBuildObject];
      const hasResources = this.buildingSystem.hasRequiredResources();
      const resourceColor = hasResources ? '#90EE90' : '#FF6B6B';
      const levelInfo = this.buildingSystem.getLevelInfo
        ? this.buildingSystem.getLevelInfo()
        : { currentLevel: 0, currentLevelY: 6 };

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
        <div style="
          margin-bottom: 8px;
          padding: 8px;
          background: rgba(222, 184, 135, 0.15);
          border-radius: 12px;
          border: 1px solid rgba(222, 184, 135, 0.3);
        ">
          <div style="
            font-size: 12px;
            color: #DEB887;
            font-weight: 600;
            margin-bottom: 6px;
            text-align: center;
          ">🏗️ Building Level: ${levelInfo.currentLevel} (Y: ${Math.round(levelInfo.currentLevelY)})</div>
          <div id="levelButtons" style="
            display: flex;
            gap: 4px;
            justify-content: center;
            flex-wrap: wrap;
          ">
            ${this.generateLevelButtons()}
          </div>
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
      const levelInfo = this.buildingSystem.getLevelInfo
        ? this.buildingSystem.getLevelInfo()
        : { currentLevel: 0, currentLevelY: 6 };

      buildingText.innerHTML = `
        <div style="margin-bottom: 6px;">
          <strong style="
            color: #F5DEB3;
            font-family: 'Fredoka One', Arial, sans-serif;
            font-size: 16px;
          ">${modeIcon} ${modeText} Mode</strong>
        </div>
        <div style="
          margin-bottom: 8px;
          padding: 8px;
          background: rgba(222, 184, 135, 0.15);
          border-radius: 12px;
          border: 1px solid rgba(222, 184, 135, 0.3);
        ">
          <div style="
            font-size: 12px;
            color: #DEB887;
            font-weight: 600;
            margin-bottom: 6px;
            text-align: center;
          ">🏗️ Building Level: ${levelInfo.currentLevel} (Y: ${Math.round(levelInfo.currentLevelY)})</div>
          <div id="levelButtons" style="
            display: flex;
            gap: 4px;
            justify-content: center;
            flex-wrap: wrap;
          ">
            ${this.generateLevelButtons()}
          </div>
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

    // Add click handlers for level buttons
    this.addLevelButtonHandlers();
  }

  generateLevelButtons(): string {
    const levelInfo = this.buildingSystem.getLevelInfo
      ? this.buildingSystem.getLevelInfo()
      : {
          currentLevel: 0,
          minLevel: 0,
          maxLevel: 4,
        };

    let buttons = '';
    for (let level = levelInfo.minLevel; level <= levelInfo.maxLevel; level++) {
      const isCurrentLevel = level === levelInfo.currentLevel;
      const levelY = 6 + level * 4; // Assuming 4 unit height between levels

      buttons += `
        <button
          class="level-btn"
          data-level="${level}"
          style="
            background: ${
              isCurrentLevel
                ? 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)'
                : 'linear-gradient(135deg, rgba(222, 184, 135, 0.3) 0%, rgba(245, 222, 179, 0.2) 100%)'
            };
            border: 2px solid ${isCurrentLevel ? '#8B4513' : '#A0522D'};
            color: ${isCurrentLevel ? '#8B4513' : '#F5DEB3'};
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 32px;
            text-shadow: ${isCurrentLevel ? 'none' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};
            box-shadow: ${
              isCurrentLevel
                ? '0 2px 8px rgba(139, 69, 19, 0.3), inset 0 1px 2px rgba(245, 222, 179, 0.2)'
                : '0 1px 4px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(245, 222, 179, 0.1)'
            };
          "
          title="Level ${level} (Y: ${levelY})"
        >${level}</button>
      `;
    }

    return buttons;
  }

  addLevelButtonHandlers(): void {
    const levelButtons = document.querySelectorAll<HTMLElement>('.level-btn');
    levelButtons.forEach((button) => {
      // Remove existing listeners
      button.replaceWith(button.cloneNode(true));
    });

    // Add new listeners to the cloned buttons
    const newLevelButtons = document.querySelectorAll<HTMLElement>('.level-btn');
    newLevelButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetLevel = parseInt(button.getAttribute('data-level')!);
        if (this.buildingSystem.switchToLevel) {
          const success = this.buildingSystem.switchToLevel(targetLevel);
          if (success) {
            this.updateBuildingUI(); // Refresh UI to show new current level
          }
        }
      });

      // Add hover effects
      button.addEventListener('mouseenter', () => {
        const level = parseInt(button.getAttribute('data-level')!);
        const levelInfo = this.buildingSystem.getLevelInfo
          ? this.buildingSystem.getLevelInfo()
          : { currentLevel: 0 };

        if (level !== levelInfo.currentLevel) {
          button.style.borderColor = '#F5DEB3';
          button.style.transform = 'translateY(-1px) scale(1.05)';
          button.style.boxShadow =
            '0 3px 12px rgba(245, 222, 179, 0.4), inset 0 1px 2px rgba(245, 222, 179, 0.2)';
        }
      });

      button.addEventListener('mouseleave', () => {
        const level = parseInt(button.getAttribute('data-level')!);
        const levelInfo = this.buildingSystem.getLevelInfo
          ? this.buildingSystem.getLevelInfo()
          : { currentLevel: 0 };

        if (level !== levelInfo.currentLevel) {
          button.style.borderColor = '#A0522D';
          button.style.transform = 'translateY(0) scale(1)';
          button.style.boxShadow =
            '0 1px 4px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(245, 222, 179, 0.1)';
        }
      });
    });
  }

  hideBuildingUI(): void {
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

  showSelectionScreen(): void {
    // Create or show selection sidebar
    let selectionScreen = document.getElementById('selectionScreen');
    if (!selectionScreen) {
      selectionScreen = document.createElement('div');
      selectionScreen.id = 'selectionScreen';
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
      <div style="text-align: center; margin-bottom: 25px;">
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
        ${Object.entries(this.buildingSystem.buildableObjects)
          .map(
            ([key, obj]: [string, any]) => `
          <div class="object-card" data-object="${key}" style="
            background: ${
              this.buildingSystem.selectedBuildObject === key
                ? 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #DEB887 100%)'
                : 'linear-gradient(135deg, rgba(222, 184, 135, 0.3) 0%, rgba(245, 222, 179, 0.2) 50%, rgba(222, 184, 135, 0.3) 100%)'
            };
            border: 3px solid ${this.buildingSystem.selectedBuildObject === key ? '#F5DEB3' : '#A0522D'};
            border-radius: 18px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            box-shadow: ${
              this.buildingSystem.selectedBuildObject === key
                ? '0 8px 25px rgba(245, 222, 179, 0.4), inset 0 2px 5px rgba(139, 69, 19, 0.1)'
                : '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)'
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
                ">${obj.cellSize.width && obj.cellSize.height ? `${obj.cellSize.width}x${obj.cellSize.height} cells` : obj.cellSize + ' cell' + (obj.cellSize !== 1 ? 's' : '')}</div>
              </div>

              ${
                this.buildingSystem.selectedBuildObject === key
                  ? `
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
              `
                  : ''
              }
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <div style="
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
    this.selectionScreenKeyHandler = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        this.hideSelectionScreen();
      }
    };
    document.addEventListener('keydown', this.selectionScreenKeyHandler);

    // Add click handlers to object cards
    const objectCards = selectionScreen.querySelectorAll<HTMLElement>('.object-card');
    objectCards.forEach((card) => {
      card.addEventListener('click', () => {
        const objectKey = card.getAttribute('data-object');
        this.buildingSystem.selectBuildObject(objectKey);
      });

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        if (card.getAttribute('data-object') !== this.buildingSystem.selectedBuildObject) {
          card.style.borderColor = '#F5DEB3';
          card.style.transform = 'translateY(-2px) scale(1.02)';
          card.style.boxShadow =
            '0 8px 25px rgba(245, 222, 179, 0.3), inset 0 2px 5px rgba(139, 69, 19, 0.1)';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.getAttribute('data-object') !== this.buildingSystem.selectedBuildObject) {
          card.style.borderColor = '#A0522D';
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow =
            '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(245, 222, 179, 0.1)';
        }
      });
    });

    selectionScreen.style.display = 'block';
  }

  hideSelectionScreen(): void {
    const selectionScreen = document.getElementById('selectionScreen');
    if (selectionScreen) {
      selectionScreen.style.display = 'none';
    }

    // Remove keyboard handler
    if (this.selectionScreenKeyHandler) {
      document.removeEventListener('keydown', this.selectionScreenKeyHandler);
      this.selectionScreenKeyHandler = null;
    }
  }

  showResourceWarning(): void {
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
  }

  hideResourceWarning(): void {
    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.style.display = 'none';
    }
  }

  updateCursorWarningPosition(mouse: THREE.Vector2): void {
    const warningElement = document.getElementById('resourceWarning');
    if (!warningElement || warningElement.style.display === 'none') return;

    // Get current mouse position and add offset
    const mouseX = ((mouse.x + 1) / 2) * window.innerWidth;
    const mouseY = ((-mouse.y + 1) / 2) * window.innerHeight;

    warningElement.style.left = mouseX + 15 + 'px';
    warningElement.style.top = mouseY - 25 + 'px';
  }

  initializeSelectionPreviews(): void {
    // Wait for models to be loaded
    setTimeout(() => {
      Object.entries(this.buildingSystem.buildableObjects).forEach(
        ([key, buildObject]: [string, any]) => {
          if (buildObject.mesh) {
            this.create3DPreview(key, buildObject);
          }
        }
      );
    }, 100);
  }

  create3DPreview(objectKey: string, buildObject: any): void {
    const previewContainer = document.getElementById(`preview-${objectKey}`);
    if (!previewContainer) return;

    // Clear existing content
    previewContainer.innerHTML = '';

    // Create mini scene for this preview
    const previewScene = new THREE.Scene();
    previewScene.background = new THREE.Color(0x222222);

    const previewCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const previewRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });

    previewRenderer.setSize(50, 50);
    previewRenderer.setClearColor(0x222222);
    previewRenderer.shadowMap.enabled = false;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    previewScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(2, 2, 2);
    previewScene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-2, 1, -2);
    previewScene.add(directionalLight2);

    // Clone and add the model
    const previewModel = buildObject.mesh.clone();
    previewModel.scale.setScalar(1.0);

    previewModel.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.castShadow = false;
        child.receiveShadow = false;
        child.material.transparent = false;
        child.material.opacity = 1.0;
        child.visible = true;
      }
    });

    previewScene.add(previewModel);

    // Auto-fit camera to model bounds
    const box = new THREE.Box3().setFromObject(previewModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const cameraDistance = maxDim * 1.5;

    previewCamera.position.set(
      center.x + cameraDistance * 0.7,
      center.y + cameraDistance * 0.3,
      center.z + cameraDistance * 0.7
    );
    previewModel.rotation.y = Math.PI / 6;
    previewCamera.lookAt(center);

    previewCamera.near = cameraDistance * 0.1;
    previewCamera.far = cameraDistance * 10;
    previewCamera.updateProjectionMatrix();

    // Add rotation animation
    const animate = () => {
      if (previewContainer.parentNode) {
        previewModel.rotation.y += 0.01;
        previewRenderer.render(previewScene, previewCamera);
        requestAnimationFrame(animate);
      }
    };

    previewRenderer.render(previewScene, previewCamera);
    previewContainer.appendChild(previewRenderer.domElement);
    animate();

    // Store references for cleanup
    this.selectionPreviews.set(objectKey, {
      scene: previewScene,
      camera: previewCamera,
      renderer: previewRenderer,
      model: previewModel,
    });
  }

  destroy(): void {
    this.hideBuildingUI();
    this.hideSelectionScreen();
    this.hideResourceWarning();

    const buildingText = document.getElementById('buildingText');
    if (buildingText) {
      buildingText.remove();
    }

    const warningElement = document.getElementById('resourceWarning');
    if (warningElement) {
      warningElement.remove();
    }
  }
}
