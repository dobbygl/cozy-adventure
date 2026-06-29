import type { BuildingSystem } from './BuildingSystem.js';

/**
 * Keyboard + mouse input for build mode: the V/R/X/C/Escape keys (debounced), the mousemove
 * that drives the preview, the click that places/breaks, plus the normalized-mouse
 * conversion and the "is the cursor over UI" hit-test. Owns its window/document listeners
 * and removes ALL of them on destroy (the inline version leaked the mousemove/click ones).
 * Dispatches to BuildingSystem through the typed host; the shared `mouse` vector stays on
 * the host because preview/placement/break all read it.
 */
export class BuildInput {
  private buildingSystem: BuildingSystem;
  private keydownHandler: ((e: KeyboardEvent) => void) | null = null;
  private keyupHandler: ((e: KeyboardEvent) => void) | null = null;
  private mousemoveHandler: ((e: MouseEvent) => void) | null = null;
  private clickHandler: ((e: MouseEvent) => void) | null = null;
  // Key debounce flags (prevent rapid re-toggling while a key is held).
  private vKeyPressed = false;
  private rKeyPressed = false;
  private xKeyPressed = false;
  private cKeyPressed = false;

  constructor(buildingSystem: BuildingSystem) {
    this.buildingSystem = buildingSystem;
  }

  setupEventListeners() {
    const bs = this.buildingSystem;

    // Mouse move for preview
    this.mousemoveHandler = (event) => {
      if (bs.isBuilding) {
        this.updateMousePosition(event);
        bs.updatePreview();
        // Always update cursor warning position if showing
        bs.resourceManager.updateCursorWarningPosition(bs.mouse, bs.camera as any);
      }
    };
    window.addEventListener('mousemove', this.mousemoveHandler);

    // Click to build or delete
    this.clickHandler = (event) => {
      if (bs.isBuilding && !this.isCursorOverUI(event)) {
        if (bs.buildingMode === 'build') {
          bs.buildWall();
        } else if (bs.buildingMode === 'delete') {
          bs.deleteWall();
        }
      }
    };
    window.addEventListener('click', this.clickHandler);

    // Key state tracking to prevent rapid toggling
    this.vKeyPressed = false;
    this.rKeyPressed = false;
    this.xKeyPressed = false;
    this.cKeyPressed = false;

    // Toggle building mode with V (avoids B, which opens the backpack)
    this.keydownHandler = (event) => {
      if (event.code === 'KeyV' && !this.vKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.vKeyPressed = true;
        bs.toggleBuildingMode();
      }

      // Rotate with R (build mode only)
      if (event.code === 'KeyR' && bs.isBuilding && !this.rKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.rKeyPressed = true;
        bs.rotateWall();
      }

      // Switch build/delete with X
      if (event.code === 'KeyX' && bs.isBuilding && !this.xKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.xKeyPressed = true;
        bs.toggleBuildingTool();
      }

      // C re-focuses the (always-open) selection screen
      if (event.code === 'KeyC' && bs.isBuilding && bs.buildingMode === 'build' && !this.cKeyPressed) {
        event.preventDefault();
        event.stopPropagation();
        this.cKeyPressed = true;
        bs.showSelectionScreen();
      }

      // Cancel building with Escape
      if (event.code === 'Escape' && bs.isBuilding) {
        event.preventDefault();
        event.stopPropagation();
        bs.exitBuildingMode();
      }
    };

    this.keyupHandler = (event) => {
      if (event.code === 'KeyV') this.vKeyPressed = false;
      if (event.code === 'KeyR') this.rKeyPressed = false;
      if (event.code === 'KeyX') this.xKeyPressed = false;
      if (event.code === 'KeyC') this.cKeyPressed = false;
    };

    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
    console.log('Building system event listeners set up');
  }

  updateMousePosition(event: MouseEvent) {
    // Convert mouse position to normalized device coordinates (written on the host's shared
    // `mouse` vector, which the preview/placement/break paths all read).
    const mouse = this.buildingSystem.mouse;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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

  destroy() {
    if (this.keydownHandler) document.removeEventListener('keydown', this.keydownHandler);
    if (this.keyupHandler) document.removeEventListener('keyup', this.keyupHandler);
    if (this.mousemoveHandler) window.removeEventListener('mousemove', this.mousemoveHandler);
    if (this.clickHandler) window.removeEventListener('click', this.clickHandler);
  }
}
