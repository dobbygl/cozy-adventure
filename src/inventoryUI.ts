import * as THREE from 'three';
import type { Inventory, Item, ItemStack } from './inventory.js';

/** Window augmentation for the global Game singleton (game.js, not yet migrated). */
type WindowWithGame = Window & { gameInstance?: { camera?: THREE.Camera } };

/**
 * InventoryUI - Manages the visual interface for inventory system
 */
export class InventoryUI {
  inventory: Inventory;
  // Player is not yet migrated (Ola 4); typed loosely.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any;
  isBackpackOpen: boolean;
  draggedItem: ItemStack | null;
  draggedSlot: number | null;
  // UI elements assigned synchronously by createUI() in the constructor.
  hotbarElement!: HTMLDivElement;
  backpackElement!: HTMLDivElement;
  overlayElement!: HTMLDivElement;
  previewPanel!: HTMLDivElement;
  buildPromptElement!: HTMLDivElement;
  previewScene: THREE.Scene | null;
  previewCamera: THREE.PerspectiveCamera | null;
  previewRenderer: THREE.WebGLRenderer | null;
  previewMesh: THREE.Object3D | null;
  currentPreviewItem: Item | null;
  pickupPopups: HTMLElement[];
  draggedElement: HTMLElement | null;
  draggedData: { container: string; index: number; itemStack: ItemStack } | null;

  constructor(inventory: Inventory, player: any = null) {
    this.inventory = inventory;
    this.player = player; // Reference to player for accessing preloaded models
    this.isBackpackOpen = false;
    this.draggedItem = null;
    this.draggedSlot = null;
    
    // UI elements (hotbar/backpack/overlay/previewPanel/buildPrompt) are created in createUI().
    this.previewScene = null;
    this.previewCamera = null;
    this.previewRenderer = null;
    this.previewMesh = null;
    this.currentPreviewItem = null;
    this.pickupPopups = [];
    this.draggedElement = null;
    this.draggedData = null;
    
    this.createUI();
    this.setupEventListeners();
    this.updateUI();
  }

  createUI() {
    this.createHotbar();
this.createBackpack();
    this.createPreviewPanel();
    this.createBuildPrompt();
    this.createStyles();
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');
      
      .inventory-ui {
        font-family: 'Nunito', sans-serif;
        user-select: none;
        pointer-events: auto;
      }
      .hotbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 1000;
        background: linear-gradient(145deg, #8B4513, #A0522D);
        padding: 12px 16px;
        border-radius: 25px;
        box-shadow: 
          0 8px 32px rgba(139, 69, 19, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        border: 3px solid #D2691E;
      }
      .hotbar-slot {
        width: 55px;
        height: 55px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #CD853F;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 4px 12px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.6),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
      }
      .hotbar-slot:hover {
        transform: translateY(-2px) scale(1.05);
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.7),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      .hotbar-slot.selected {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        box-shadow: 
          0 0 20px rgba(50, 205, 50, 0.6),
          0 8px 25px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.8);
        animation: cozyGlow 2s ease-in-out infinite alternate;
      }
      @keyframes cozyGlow {
        from { box-shadow: 0 0 15px rgba(50, 205, 50, 0.4), 0 8px 25px rgba(139, 69, 19, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.8); }
        to { box-shadow: 0 0 25px rgba(50, 205, 50, 0.8), 0 8px 25px rgba(139, 69, 19, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.8); }
      }

      .slot-number {
        position: absolute;
        top: -12px;
        left: -8px;
        font-size: 12px;
        color: #8B4513;
        font-weight: 700;
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border: 2px solid #CD853F;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive;
        box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
      }
      .item-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(145deg, #F5F5DC, #E6E6FA);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        line-height: 1;
        box-shadow: 
          0 2px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 2px rgba(255, 255, 255, 0.5);
        transition: transform 0.2s ease;
      }
      .item-icon:hover {
        transform: scale(1.1);
      }
      .item-quantity {
        position: absolute;
        bottom: -5px;
        right: -5px;
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 12px;
        min-width: 16px;
        text-align: center;
        border: 2px solid #FF4444;
        box-shadow: 0 2px 8px rgba(255, 75, 75, 0.4);
        font-family: 'Fredoka One', cursive;
      }

      .backpack-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.9));
        display: none;
        z-index: 2000;
        backdrop-filter: blur(8px);
      }
      .backpack-overlay.visible {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .backpack-container {
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 4px solid #8B4513;
        border-radius: 25px;
        padding: 25px;
        min-width: 520px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
      }
      .backpack-container::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #CD853F, #D2691E, #B8860B, #DAA520);
        border-radius: 27px;
        z-index: -1;
      }
      .backpack-container::-webkit-scrollbar {
        display: none;
      }
      .item-preview-panel {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 340px;
        height: 80vh;
        max-height: 600px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 4px solid #8B4513;
        border-radius: 25px;
        padding: 20px;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        opacity: 0;
        visibility: hidden;
        z-index: 2100;
      }
      .item-preview-panel::-webkit-scrollbar {
        display: none;
      }
      .item-preview-panel.visible {
        opacity: 1;
        visibility: visible;
      }
      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        color: #8B4513;
      }
      .preview-title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.3);
      }
      .preview-close {
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        border: 2px solid #FF4444;
        color: #fff;
        padding: 8px 12px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .preview-close:hover {
        transform: scale(1.05);
        background: linear-gradient(145deg, #FF8E8E, #FFB6B6);
      }
      .preview-3d-container {
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
        border: 3px solid #DEB887;
        border-radius: 20px;
        margin-bottom: 20px;
        position: relative;
        overflow: hidden;
        box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .item-details {
        color: #8B4513;
      }
      .item-name {
        font-size: 18px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        margin-bottom: 8px;
        color: #8B4513;
      }
      .item-type {
        font-size: 14px;
        color: #A0522D;
        margin-bottom: 12px;
        font-weight: 600;
        text-transform: capitalize;
      }
      .item-description {
        font-size: 14px;
        line-height: 1.5;
        color: #8B4513;
        margin-bottom: 16px;
        background: rgba(222, 184, 135, 0.3);
        padding: 12px;
        border-radius: 15px;
        border: 2px solid rgba(160, 82, 45, 0.3);
      }
      .item-stats {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: rgba(245, 222, 179, 0.4);
        border-radius: 12px;
        border: 1px solid rgba(160, 82, 45, 0.3);
      }
      .stat-label {
        font-weight: 600;
        color: #8B4513;
      }
      .stat-value {
        font-weight: 700;
        color: #A0522D;
      }
      .backpack-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        color: #8B4513;
      }
      .backpack-title {
        font-size: 28px;
        font-weight: 700;
        font-family: 'Fredoka One', cursive;
        text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
        background: linear-gradient(45deg, #8B4513, #A0522D);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .close-button {
        background: linear-gradient(145deg, #FF6B6B, #FF8E8E);
        border: 3px solid #FF4444;
        color: #fff;
        padding: 12px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Nunito', sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 4px 15px rgba(255, 75, 75, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3);
      }
      .close-button:hover {
        transform: translateY(-2px) scale(1.05);
        background: linear-gradient(145deg, #FF8E8E, #FFB6B6);
        box-shadow: 
          0 6px 20px rgba(255, 75, 75, 0.6),
          inset 0 2px 6px rgba(255, 255, 255, 0.4);
      }

      .inventory-sections {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .section-title {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .hotbar-section {
        display: flex;
        gap: 4px;
        justify-content: center;
      }

      .backpack-grid {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 4px;
        max-width: 500px;
      }

      .inventory-slot {
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .inventory-slot:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }

      .inventory-slot.drag-over {
        border-color: #2196F3;
        background: rgba(33, 150, 243, 0.2);
      }

      .dragging {
        opacity: 0.5;
        transform: scale(0.95);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .hotbar {
          bottom: 80px;
          padding: 6px;
        }

        .hotbar-slot {
          width: 40px;
          height: 40px;
        }

        .item-icon {
          width: 28px;
          height: 28px;
          font-size: 14px;
        }

        .backpack-container {
          min-width: auto;
          width: 95vw;
          padding: 15px;
        }

        .backpack-grid {
          grid-template-columns: repeat(6, 1fr);
          max-width: none;
        }
        .inventory-slot {
          width: 45px;
          height: 45px;
        }
        .item-preview-panel {
          position: fixed;
          right: 10px;
          top: 10px;
          width: calc(100vw - 20px);
          max-width: 320px;
          height: auto;
          max-height: 70vh;
          transform: none;
        }
      }
      .pickup-popup {
        position: fixed;
        bottom: 20px;
        right: 20px;
        transform: translateX(100%);
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #8B4513;
        border-radius: 20px;
        padding: 20px 25px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 
          0 10px 30px rgba(139, 69, 19, 0.6),
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        pointer-events: none;
        opacity: 0;
        animation: pickupSlideIn 0.3s ease-out forwards, pickupSlideOut 0.3s ease-in 2.7s forwards;
      }
      @keyframes pickupSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes pickupSlideOut {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateX(100%) scale(0.9);
        }
      }
      .pickup-popup .item-icon {
        width: 48px;
        height: 48px;
        font-size: 24px;
        border-radius: 15px;
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.5);
      }
      .pickup-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .pickup-item-name {
        font-size: 16px;
        font-weight: 700;
        color: #8B4513;
        font-family: 'Fredoka One', cursive;
      }
      .pickup-item-quantity {
        font-size: 14px;
        color: #A0522D;
        font-weight: 600;
      }
      .pickup-plus-sign {
        font-size: 20px;
        color: #32CD32;
        font-weight: bold;
        margin-right: 5px;
      }
      @media (max-width: 768px) {
        .pickup-popup {
          padding: 15px 20px;
          gap: 12px;
          bottom: 100px;
          right: 10px;
        }
        .pickup-popup .item-icon {
          width: 40px;
          height: 40px;
          font-size: 20px;
        }
        .pickup-item-name {
          font-size: 14px;
        }
        .pickup-item-quantity {
          font-size: 12px;
        }
      }
      
      /* World Item Pickup UI Styling */
      .world-pickup-prompt {
        position: absolute;
        background: rgba(255, 255, 255, 0.95);
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        padding: 8px 12px;
        color: #333;
        font-family: 'Nunito', sans-serif;
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        pointer-events: none;
        z-index: 1500;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-100%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(4px);
      }
      
      .pickup-key {
        display: inline-block;
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 2px 6px;
        margin: 0 2px;
        font-family: 'Nunito', sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: #555;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .pickup-item-name {
        color: #666;
        font-weight: 600;
        margin-left: 2px;
      }
      
      /* Mobile responsive for pickup prompts */
      @media (max-width: 768px) {
        .world-pickup-prompt {
          font-size: 12px;
          padding: 8px 14px;
          border-radius: 15px;
        }
        
        .pickup-key {
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 6px;
        }
      }
      
      .build-prompt {
        position: fixed;
        bottom: 115px; /* Positioned above the hotbar */
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        color: #8B4513;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Nunito', sans-serif;
        font-size: 15px;
        font-weight: 700;
        z-index: 998; /* Below hotbar but above most things */
        display: flex;
        align-items: center;
        gap: 8px;
        border: 3px solid #CD853F;
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.5),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        transition: opacity 0.3s ease, transform 0.3s ease;
        animation: pulse 2s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.03); }
        100% { transform: translateX(-50%) scale(1); }
      }
      
      .build-prompt .pickup-key {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border: 2px solid #CD853F;
        border-radius: 8px;
        padding: 4px 8px;
        font-family: 'Fredoka One', cursive;
        font-size: 12px;
        font-weight: 400;
        color: #8B4513;
        box-shadow: 0 2px 5px rgba(139, 69, 19, 0.2);
      }
      
      @media (max-width: 768px) {
        .build-prompt {
            bottom: 140px; /* Position above hotbar on mobile */
            left: 50%;
            transform: translateX(-50%);
            padding: 8px 16px;
            font-size: 13px;
        }
        
        @keyframes pulse {
          0% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.03); }
          100% { transform: translateX(-50%) scale(1); }
        }
      }
    `;
    document.head.appendChild(style);
  }

  createHotbar() {
    this.hotbarElement = document.createElement('div');
    this.hotbarElement.className = 'inventory-ui hotbar';
    
    for (let i = 0; i < this.inventory.hotbarSize; i++) {
      const slot = this.createSlot('hotbar', i);
      slot.classList.add('hotbar-slot');
      
      // Add slot number
      const slotNumber = document.createElement('div');
      slotNumber.className = 'slot-number';
      slotNumber.textContent = (i + 1).toString();
      slot.appendChild(slotNumber);
      
      this.hotbarElement.appendChild(slot);
    }
    
document.body.appendChild(this.hotbarElement);
  }
  createBuildPrompt() {
    this.buildPromptElement = document.createElement('div');
    this.buildPromptElement.className = 'build-prompt';
    this.buildPromptElement.id = 'build-mode-prompt'; // Add an ID for easier access
    this.buildPromptElement.innerHTML = `Build Mode <span class="pickup-key">V</span>`;
    document.body.appendChild(this.buildPromptElement);
  }

  createBackpack() {
    // Create overlay
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'backpack-overlay';
    
    // Create backpack container
    this.backpackElement = document.createElement('div');
    this.backpackElement.className = 'backpack-container';
    
    // Header
    const header = document.createElement('div');
    header.className = 'backpack-header';
    
    const title = document.createElement('div');
    title.className = 'backpack-title';
    title.textContent = 'Inventory';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'Close';
    closeButton.onclick = () => this.closeBackpack();
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Inventory sections
    const sections = document.createElement('div');
    sections.className = 'inventory-sections';
    
    // Hotbar section in backpack
    const hotbarSection = document.createElement('div');
    const hotbarTitle = document.createElement('div');
    hotbarTitle.className = 'section-title';
    hotbarTitle.textContent = 'Hotbar';
    
    const hotbarContainer = document.createElement('div');
    hotbarContainer.className = 'hotbar-section';
    
    for (let i = 0; i < this.inventory.hotbarSize; i++) {
      const slot = this.createSlot('hotbar', i);
      slot.classList.add('inventory-slot');
      hotbarContainer.appendChild(slot);
    }
    
    hotbarSection.appendChild(hotbarTitle);
    hotbarSection.appendChild(hotbarContainer);
    
    // Backpack section
    const backpackSection = document.createElement('div');
    const backpackTitle = document.createElement('div');
    backpackTitle.className = 'section-title';
    backpackTitle.textContent = 'Backpack';
    
    const backpackGrid = document.createElement('div');
    backpackGrid.className = 'backpack-grid';
    
    for (let i = 0; i < this.inventory.backpackSize; i++) {
      const slot = this.createSlot('backpack', i);
      slot.classList.add('inventory-slot');
      backpackGrid.appendChild(slot);
    }
    
    backpackSection.appendChild(backpackTitle);
    backpackSection.appendChild(backpackGrid);
    
    sections.appendChild(hotbarSection);
    sections.appendChild(backpackSection);
    
    this.backpackElement.appendChild(header);
    this.backpackElement.appendChild(sections);
    this.overlayElement.appendChild(this.backpackElement);
    
    document.body.appendChild(this.overlayElement);
  }
  createPreviewPanel() {
    this.previewPanel = document.createElement('div');
    this.previewPanel.className = 'item-preview-panel';
    
    // Header
    const header = document.createElement('div');
    header.className = 'preview-header';
    
    const title = document.createElement('div');
    title.className = 'preview-title';
    title.textContent = 'Item Details';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'preview-close';
    closeButton.textContent = '×';
    closeButton.onclick = () => this.closePreview();
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // 3D Preview container
    const preview3D = document.createElement('div');
    preview3D.className = 'preview-3d-container';
    preview3D.id = 'item-preview-3d';
    
    // Item details container
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'item-details';
    detailsContainer.id = 'item-details-content';
    
    this.previewPanel.appendChild(header);
    this.previewPanel.appendChild(preview3D);
    this.previewPanel.appendChild(detailsContainer);
    
    document.body.appendChild(this.previewPanel);
  }

  createSlot(container: string, index: number): HTMLDivElement {
    const slot = document.createElement('div');
    slot.dataset.container = container;
    slot.dataset.index = String(index);
    
    // Add drag and drop functionality
    slot.draggable = false; // We'll handle this manually
    
    return slot;
  }

  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Hotbar selection (1-9 keys)
      if (e.code >= 'Digit1' && e.code <= 'Digit9') {
        const slotIndex = parseInt(e.code.replace('Digit', '')) - 1;
        if (slotIndex < this.inventory.hotbarSize) {
          this.inventory.selectHotbarSlot(slotIndex);
          this.updateUI();
        }
      }
      
      // Toggle backpack (B key or Tab)
      if (e.code === 'KeyB' || e.code === 'Tab') {
        e.preventDefault();
        this.toggleBackpack();
      }
      
      // Close backpack (Escape)
      if (e.code === 'Escape' && this.isBackpackOpen) {
        this.closeBackpack();
      }
    });

    // Click handlers for slots
    document.addEventListener('click', (e) => {
      const slot = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-container][data-index]');
      if (slot) {
        const container = slot.dataset.container!;
        const index = parseInt(slot.dataset.index!);
        
        if (container === 'hotbar') {
          this.inventory.selectHotbarSlot(index);
          this.updateUI();
        }
        
        // Show item preview if clicking on item in backpack view
        if (this.isBackpackOpen) {
          const itemStack = this.getSlotItem(container, index);
          if (itemStack && itemStack.item) {
            this.showItemPreview(itemStack.item);
          }
        }
      }
    });
    // Drag and drop implementation
    this.setupDragAndDrop();

    // Inventory callbacks
    this.inventory.onInventoryChange = () => this.updateUI();
    this.inventory.onHotbarSelectionChange = () => this.updateUI();
    this.inventory.onItemAdded = (item, quantity, totalQuantity) => this.showPickupPopup(item, quantity, totalQuantity);
  }

  getSlotItem(container: string, index: number): ItemStack | null {
    const array = container === 'hotbar' ? this.inventory.hotbar : this.inventory.backpack;
    return array[index];
  }

  setupDragAndDrop() {
    // Make these instance variables so they're accessible everywhere
    this.draggedElement = null;
    this.draggedData = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    // Mouse down - start drag
    document.addEventListener('mousedown', (e) => {
      const slot = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-container][data-index]');
      if (!slot) return;
      const container = slot.dataset.container!;
      const index = parseInt(slot.dataset.index!);
      const itemStack = this.getSlotItem(container, index);
      if (!itemStack) return;
      e.preventDefault();
      
      // Store drag data
      this.draggedData = { container, index, itemStack };
      
      // Create drag element
      this.draggedElement = this.createDragElement(itemStack);
      dragOffsetX = e.clientX - slot.getBoundingClientRect().left;
      dragOffsetY = e.clientY - slot.getBoundingClientRect().top;
      
      // Position drag element
      this.draggedElement.style.left = (e.clientX - dragOffsetX) + 'px';
      this.draggedElement.style.top = (e.clientY - dragOffsetY) + 'px';
      
      // Add visual feedback
      slot.classList.add('dragging');
      document.body.appendChild(this.draggedElement);
    });
    // Mouse move - update drag position
    document.addEventListener('mousemove', (e) => {
      if (!this.draggedElement) return;
      this.draggedElement.style.left = (e.clientX - dragOffsetX) + 'px';
      this.draggedElement.style.top = (e.clientY - dragOffsetY) + 'px';
      // Highlight valid drop targets
      const targetSlot = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-container][data-index]');
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      
      if (targetSlot && targetSlot !== this.draggedElement) {
        targetSlot.classList.add('drag-over');
      }
    });
    // Mouse up - complete drag
    document.addEventListener('mouseup', (e) => {
      if (!this.draggedElement || !this.draggedData) return;
      // Find drop target
      const targetSlot = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-container][data-index]');
      
      if (targetSlot) {
        const targetContainer = targetSlot.dataset.container!;
        const targetIndex = parseInt(targetSlot.dataset.index!);
        
        // Attempt to move item
        if (this.draggedData.container !== targetContainer || this.draggedData.index !== targetIndex) {
          this.inventory.moveItem(
            this.draggedData.container,
            this.draggedData.index,
            targetContainer,
            targetIndex
          );
        }
      }
      // Clean up
      this.cleanupDrag();
    });
    // Handle drag cancellation (e.g., dragging outside window)
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }
  createDragElement(itemStack: ItemStack): HTMLDivElement {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 3000;
      backdrop-filter: blur(5px);
    `;
    // Add item icon
    const icon = document.createElement('div');
    icon.className = 'item-icon';
    const iconInfo = this.getItemIcon(itemStack.item);
    icon.innerHTML = iconInfo.icon;
    icon.style.backgroundColor = iconInfo.color;
    element.appendChild(icon);
    // Add quantity if more than 1
    if (itemStack.quantity > 1) {
      const quantity = document.createElement('div');
      quantity.className = 'item-quantity';
      quantity.textContent = itemStack.quantity.toString();
      element.appendChild(quantity);
    }
    return element;
  }
  cleanupDrag() {
    // Remove drag element
    if (this.draggedElement) {
      this.draggedElement.remove();
      this.draggedElement = null;
    }
    // Remove visual feedback
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    
    // Clear drag data
    this.draggedData = null;
  }

  updateUI() {
    this.updateHotbar();
    if (this.isBackpackOpen) {
      this.updateBackpack();
    }
  }

  updateHotbar() {
    const hotbarSlots = this.hotbarElement.querySelectorAll<HTMLElement>('.hotbar-slot');
    
    hotbarSlots.forEach((slot, index) => {
      const itemStack = this.inventory.hotbar[index];
      this.updateSlotDisplay(slot, itemStack);
      
      // Update selection state
      if (index === this.inventory.selectedHotbarSlot) {
        slot.classList.add('selected');
      } else {
        slot.classList.remove('selected');
      }
    });
  }

  updateBackpack() {
    // Update hotbar slots in backpack view
    const backpackHotbarSlots = this.backpackElement.querySelectorAll<HTMLElement>('.hotbar-section .inventory-slot');
    backpackHotbarSlots.forEach((slot, index) => {
      const itemStack = this.inventory.hotbar[index];
      this.updateSlotDisplay(slot, itemStack);
    });

    // Update backpack slots
    const backpackSlots = this.backpackElement.querySelectorAll<HTMLElement>('.backpack-grid .inventory-slot');
    backpackSlots.forEach((slot, index) => {
      const itemStack = this.inventory.backpack[index];
      this.updateSlotDisplay(slot, itemStack);
    });
  }

  updateSlotDisplay(slotElement: HTMLElement, itemStack: ItemStack | null): void {
    // Clear existing content (except slot number)
    const existingIcon = slotElement.querySelector('.item-icon');
    const existingQuantity = slotElement.querySelector('.item-quantity');
    
    if (existingIcon) existingIcon.remove();
    if (existingQuantity) existingQuantity.remove();
    
    if (itemStack && itemStack.item) {
      // Create item icon
      const icon = document.createElement('div');
      icon.className = 'item-icon';
      
      // Set icon based on item ID or type
      const iconInfo = this.getItemIcon(itemStack.item);
      icon.innerHTML = iconInfo.icon;
      icon.style.backgroundColor = iconInfo.color;
      
      slotElement.appendChild(icon);
      
      // Add quantity if more than 1
      if (itemStack.quantity > 1) {
        const quantity = document.createElement('div');
        quantity.className = 'item-quantity';
        quantity.textContent = itemStack.quantity.toString();
        slotElement.appendChild(quantity);
      }
      
      // Add tooltip
      slotElement.title = `${itemStack.item.name}\n${itemStack.item.description}`;
    } else {
      slotElement.title = '';
    }
  }

  getItemIcon(item: Item): { icon: string; color: string } {
    // Define icons for specific items
    const itemIcons: Record<string, { icon: string; color: string }> = {
      'wood': { icon: '🪵', color: '#8B4513' },
      'stone': { icon: '🪨', color: '#696969' },
      'iron_ore': { icon: '⛰️', color: '#708090' },
      'coal': { icon: '⚫', color: '#2F4F4F' },
      'apple': { icon: '🍎', color: '#FF4500' },
      'bread': { icon: '🍞', color: '#DEB887' },
      'water': { icon: '💧', color: '#1E90FF' },
      'potion': { icon: '🧪', color: '#9370DB' },
      'sword': { icon: '⚔️', color: '#C0C0C0' },
      'axe': { icon: '🪓', color: '#8B4513' },
      'pickaxe': { icon: '⛏️', color: '#696969' },
      'bow': { icon: '🏹', color: '#8B4513' },
      'shield': { icon: '🛡️', color: '#4682B4' },
      'helmet': { icon: '⛑️', color: '#4682B4' },
      'chestplate': { icon: '🦺', color: '#4682B4' },
      'boots': { icon: '🥾', color: '#8B4513' },
      'ring': { icon: '💍', color: '#FFD700' },
      'key': { icon: '🗝️', color: '#FFD700' },
      'rope': { icon: '🪢', color: '#DEB887' },
      'torch': { icon: '🔦', color: '#FF6347' },
      'coin': { icon: '🪙', color: '#FFD700' },
      'gem': { icon: '💎', color: '#00CED1' },
      'scroll': { icon: '📜', color: '#F5DEB3' },
      'book': { icon: '📚', color: '#8B4513' },
      'feather': { icon: '🪶', color: '#F0E68C' },
      'bone': { icon: '🦴', color: '#F5F5DC' },
      'leather': { icon: '🧳', color: '#8B4513' },
      'cloth': { icon: '🧵', color: '#F0F8FF' },
      'arrow': { icon: '➡️', color: '#8B4513' },
      'fishing_rod': { icon: '🎣', color: '#8B4513' },
      'fish': { icon: '🐟', color: '#4682B4' },
      'meat': { icon: '🥩', color: '#8B0000' },
      'seed': { icon: '🌱', color: '#228B22' },
      'flower': { icon: '🌸', color: '#FF69B4' },
      'mushroom': { icon: '🍄', color: '#8B4513' }
    };
    // Check for specific item icon first
    if (itemIcons[item.id]) {
      return itemIcons[item.id];
    }
    // Fall back to type-based icons
    const typeIcons: Record<string, { icon: string; color: string }> = {
      'tool': { icon: '🔧', color: '#FF9800' },
      'weapon': { icon: '⚔️', color: '#F44336' },
      'consumable': { icon: '🍯', color: '#4CAF50' },
      'material': { icon: '📦', color: '#9E9E9E' },
      'armor': { icon: '🛡️', color: '#2196F3' }
    };
    return typeIcons[item.type] || { icon: '❓', color: '#666' };
  }
  getItemColor(itemType: string): string {
    const colors: Record<string, string> = {
      'tool': '#FF9800',
      'weapon': '#F44336',
      'consumable': '#4CAF50',
      'material': '#9E9E9E',
      'armor': '#2196F3'
    };
    return colors[itemType] || '#666';
  }

  toggleBackpack() {
    if (this.isBackpackOpen) {
      this.closeBackpack();
    } else {
      this.openBackpack();
    }
  }

  openBackpack() {
    this.isBackpackOpen = true;
    this.overlayElement.classList.add('visible');
    this.updateBackpack();
    
    // Disable game controls while backpack is open
    document.body.style.overflow = 'hidden';
  }

  closeBackpack() {
    this.isBackpackOpen = false;
    this.overlayElement.classList.remove('visible');
    
    // Close preview panel when backpack closes
    this.closePreview();
    
    // Re-enable game controls
    document.body.style.overflow = '';
  }

  async showItemPreview(item: Item): Promise<void> {
    this.currentPreviewItem = item;
    this.previewPanel.classList.add('visible');
    
    // Update item details
    this.updateItemDetails(item);
    
    // Setup 3D preview
    await this.setup3DPreview(item);
  }
  closePreview() {
    this.previewPanel.classList.remove('visible');
    this.currentPreviewItem = null;
    
    // Clean up 3D scene
    if (this.previewRenderer) {
      const container = document.getElementById('item-preview-3d');
      if (container && this.previewRenderer.domElement) {
        container.removeChild(this.previewRenderer.domElement);
      }
      this.previewRenderer.dispose();
      this.previewRenderer = null;
    }
    
    // Clear scene references
    this.previewScene = null;
    this.previewCamera = null;
    this.previewMesh = null;
  }
  updateItemDetails(item: any): void {
    const detailsContainer = document.getElementById('item-details-content');
    if (!detailsContainer) return;

    detailsContainer.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div class="item-type">${item.type}</div>
      <div class="item-description">${item.description || 'No description available.'}</div>
      <div class="item-stats">
        ${item.durability !== undefined ? `
          <div class="stat-row">
            <span class="stat-label">Durability</span>
            <span class="stat-value">${item.durability}/${item.maxDurability || item.durability}</span>
          </div>
        ` : ''}
        ${item.damage !== undefined ? `
          <div class="stat-row">
            <span class="stat-label">Damage</span>
            <span class="stat-value">${item.damage}</span>
          </div>
        ` : ''}
        ${item.defense !== undefined ? `
          <div class="stat-row">
            <span class="stat-label">Defense</span>
            <span class="stat-value">${item.defense}</span>
          </div>
        ` : ''}
        ${item.weight !== undefined ? `
          <div class="stat-row">
            <span class="stat-label">Weight</span>
            <span class="stat-value">${item.weight}</span>
          </div>
        ` : ''}
        ${item.value !== undefined ? `
          <div class="stat-row">
            <span class="stat-label">Value</span>
            <span class="stat-value">${item.value} gold</span>
          </div>
        ` : ''}
      </div>
    `;
  }
  async setup3DPreview(item: Item): Promise<void> {
    const container = document.getElementById('item-preview-3d');
    if (!container) return;

    // Clean up existing renderer
    if (this.previewRenderer) {
      container.removeChild(this.previewRenderer.domElement);
      this.previewRenderer.dispose();
    }
    
    // Create Three.js scene for preview
    this.previewScene = new THREE.Scene();
    this.previewScene.background = new THREE.Color(0x2c1810);
    
    // Create camera
    this.previewCamera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.previewCamera.position.set(0, 0, 2.5);
    
    // Create renderer
    this.previewRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.previewRenderer.setSize(container.clientWidth, container.clientHeight);
    this.previewRenderer.shadowMap.enabled = true;
    this.previewRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.previewRenderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.previewScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    directionalLight.castShadow = true;
    this.previewScene.add(directionalLight);
    
    // Create 3D representation of item
    await this.create3DItem(item);
    
    // Start animation loop
    this.animate3DPreview();
  }
  // Helper function to automatically fit any 3D object in the preview container
  fitModelToPreview(object: THREE.Object3D, targetSize = 1.5): number {
    // Calculate the bounding box of the object
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    
    // Find the largest dimension
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Calculate scale factor to fit within target size
    const scaleFactor = targetSize / maxDimension;
    
    // Apply uniform scaling
    object.scale.setScalar(scaleFactor);
    
    // Center the object
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center.multiplyScalar(scaleFactor));
    
    return scaleFactor;
  }
  async create3DItem(item: Item): Promise<void> {
    let geometry: THREE.BufferGeometry | undefined;
    let material: THREE.Material | undefined;
    let mesh: any;
    
    // Create different geometries based on item type
    switch (item.type) {
      case 'weapon':
        if (item.id === 'sword') {
          geometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
          material = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
        } else if (item.id === 'axe') {
          // Use preloaded axe model for instant display
          console.log('Attempting to use preloaded axe model');
          console.log('Player reference:', this.player);
          console.log('Preloaded axe model:', this.player?.preloadedAxeModel);
          
          if (this.player && this.player.preloadedAxeModel) {
            mesh = this.player.preloadedAxeModel.clone();
            
            // Automatically fit the model to preview container
            this.fitModelToPreview(mesh);
            
            // Ensure all meshes cast and receive shadows
            mesh.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            this.previewScene!.add(mesh);
            this.previewMesh = mesh;
            console.log('Using preloaded axe model for inventory preview (auto-fitted)');
            return;
          } else {
            console.warn('Preloaded axe model not available, using fallback geometry');
            console.warn('Player exists:', !!this.player);
            console.warn('Preloaded model exists:', !!(this.player && this.player.preloadedAxeModel));
            geometry = new THREE.BoxGeometry(0.6, 0.1, 0.8);
            material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
          }
        } else {
          geometry = new THREE.BoxGeometry(0.2, 1, 0.1);
          material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        }
        break;
      case 'tool':
        if (item.id === 'axe') {
          // Use preloaded axe model for tools as well
          console.log('Tool axe - attempting to use preloaded axe model');
          console.log('Player reference:', this.player);
          console.log('Preloaded axe model:', this.player?.preloadedAxeModel);
          
          if (this.player && this.player.preloadedAxeModel) {
            mesh = this.player.preloadedAxeModel.clone();
            
            // Automatically fit the model to preview container
            this.fitModelToPreview(mesh);
            
            // Ensure all meshes cast and receive shadows
            mesh.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            this.previewScene!.add(mesh);
            this.previewMesh = mesh;
            console.log('Using preloaded axe model for tool preview (auto-fitted)');
            return;
          } else {
            console.warn('Preloaded axe model not available, using fallback geometry');
            console.warn('Player exists:', !!this.player);
            console.warn('Preloaded model exists:', !!(this.player && this.player.preloadedAxeModel));
            geometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
            material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
          }
        } else {
          geometry = new THREE.BoxGeometry(0.3, 0.8, 0.1);
          material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        }
        break;
      case 'consumable':
        if (item.id === 'apple') {
          // Use preloaded apple model if available
          console.log('Apple - attempting to use preloaded apple model');
          console.log('Player reference:', this.player);
          console.log('Preloaded apple model:', this.player?.preloadedAppleModel);
          
          if (this.player && this.player.preloadedAppleModel) {
            mesh = this.player.preloadedAppleModel.clone();
            
            // Automatically fit the model to preview container
            this.fitModelToPreview(mesh);
            
            // Ensure all meshes cast and receive shadows
            mesh.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            this.previewScene!.add(mesh);
            this.previewMesh = mesh;
            console.log('Using preloaded apple model for inventory preview (auto-fitted)');
            return;
          } else {
            console.warn('Preloaded apple model not available, using fallback geometry');
            console.warn('Player exists:', !!this.player);
            console.warn('Preloaded model exists:', !!(this.player && this.player.preloadedAppleModel));
            geometry = new THREE.SphereGeometry(0.3, 16, 12);
            material = new THREE.MeshPhongMaterial({ color: 0xff4500 });
          }
        } else {
          geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8);
          material = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
        }
        break;
      case 'material':
        if (item.id === 'wood') {
          geometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
          material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        } else if (item.id === 'stone') {
          geometry = new THREE.DodecahedronGeometry(0.3);
          material = new THREE.MeshPhongMaterial({ color: 0x696969 });
        } else {
          geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
          material = new THREE.MeshPhongMaterial({ color: 0x9E9E9E });
        }
        break;
      default:
        geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        material = new THREE.MeshPhongMaterial({ color: 0x666666 });
    }
    
    // Only create mesh if we have geometry (not already handled by model loading)
    if (geometry && material) {
      mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.previewScene!.add(mesh);
      
      // Store reference for animation
      this.previewMesh = mesh;
    }
  }
  animate3DPreview(): void {
    const { previewRenderer, previewScene, previewCamera } = this;
    if (!previewRenderer || !this.currentPreviewItem || !previewScene || !previewCamera) return;

    requestAnimationFrame(() => this.animate3DPreview());

    // Rotate the item
    if (this.previewMesh) {
      this.previewMesh.rotation.y += 0.01;
    }

    previewRenderer.render(previewScene, previewCamera);
  }
  showPickupPopup(item: Item, quantityAdded: number, totalQuantity: number): void {
    // Check if we've reached the maximum number of popups
    if (this.pickupPopups.length >= 3) {
      // Remove the oldest popup immediately
      const oldestPopup = this.pickupPopups.shift();
      if (oldestPopup && oldestPopup.parentNode) {
        oldestPopup.parentNode.removeChild(oldestPopup);
      }
    }
    
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'pickup-popup';
    
    // Get item icon
    const iconInfo = this.getItemIcon(item);
    
    // Create popup content
    popup.innerHTML = `
      <div class="item-icon" style="background-color: ${iconInfo.color};">
        ${iconInfo.icon}
      </div>
      <div class="pickup-details">
        <div class="pickup-item-name">
          <span class="pickup-plus-sign">+</span>${item.name}
        </div>
        <div class="pickup-item-quantity">
          ${quantityAdded > 1 ? `+${quantityAdded}` : '+1'} (Total: ${totalQuantity})
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(popup);
    this.pickupPopups.push(popup);
    
    // Remove popup after animation completes
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
      
      // Remove from tracking array
      const index = this.pickupPopups.indexOf(popup);
      if (index !== -1) {
        this.pickupPopups.splice(index, 1);
      }
    }, 3000);
    
    console.log(`Pickup popup shown: ${item.name} +${quantityAdded} (Total: ${totalQuantity})`);
  }
  // Method to check if an item being removed should close the preview
  onItemRemovedFromWorld(itemId: string): void {
    // If the preview panel is open and showing the item that was just picked up
    if (this.currentPreviewItem && this.currentPreviewItem.id === itemId) {
      console.log(`Closing item preview for ${itemId} - item was picked up by dog`);
      this.closePreview();
    }
    // Clean up any world pickup prompts for this item
    this.cleanupWorldPickupPrompts(itemId);
  }
  // Method to clean up world pickup prompts for a specific item
  cleanupWorldPickupPrompts(itemId: string): void {
    console.log(`🧹 Cleaning up pickup prompts for item: ${itemId}`);
    
    // Don't clean up pickup prompts when dog picks up items
    // Let the main game's pickup UI system handle all UI lifecycle
    console.log('🚫 Skipping cleanup - letting main pickup UI system handle this');
    
    // The main game's pickup UI will automatically handle the cleanup when it detects
    // the item is no longer in the world during its next update cycle
  }
  // Method to show pickup prompts for items when player approaches them again
  showWorldPickupPromptsForNearbyItems(nearbyItems: any[]): void {
    console.log('🔍 Using existing pickup UI system for nearby items:', nearbyItems.length);
    // Let the main game's pickup UI system handle this - don't create duplicate prompts
  }
  // Method to show pickup prompts when player approaches completely new items
  showPickupPromptsForNewItems(nearbyItems: any[]): void {
    console.log('🔍 Using existing pickup UI system for new items:', nearbyItems.length);
    // Let the main game's pickup UI system handle this - don't create duplicate prompts
  }
  // Method to create a new world pickup prompt for an item
  createNewWorldPickupPrompt(item: any): null {
    console.log('🚫 Not creating duplicate world pickup prompt - using existing system');
    // Disabled - let the main game's pickup UI handle this
    return null;
  }
  // Method to update pickup prompt position based on 3D item position
  updatePromptPosition(prompt: HTMLElement, item: any): void {
    const game = (window as WindowWithGame).gameInstance;
    if (!game || !game.camera) return;
    
    const camera = game.camera;
    const itemPosition = item.position.clone();
    
    // Add offset above the item
    itemPosition.y += 1.5;
    
    // Project 3D position to screen coordinates
    const screenPosition = itemPosition.clone().project(camera);
    
    // Convert to screen pixels
    const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
    const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
    
    // Apply position to prompt
    prompt.style.left = x + 'px';
    prompt.style.top = y + 'px';
    
    // Hide prompt if item is behind camera or too far
    const distance = camera.position.distanceTo(item.position);
    if (screenPosition.z > 1 || distance > 20) {
      prompt.style.display = 'none';
    } else {
      prompt.style.display = 'block';
    }
  }
  // Method to update all world pickup prompt positions (called from game loop)
  updateAllPromptPositions(nearbyItems: any[]): void {
    // First, validate that all existing prompts still have valid targets
    this.validateExistingPrompts(nearbyItems);

    nearbyItems.forEach((item: any) => {
      const prompt = document.querySelector<HTMLElement>(`.world-pickup-prompt[data-item-id="${item.userData.itemId}"]`);
      if (prompt && prompt.dataset.hidden !== 'true') {
        this.updatePromptPosition(prompt, item);
      }
    });
  }
  // Method to validate existing pickup prompts and disable invalid ones
  validateExistingPrompts(currentNearbyItems: any[]): void {
    const allPrompts = document.querySelectorAll<HTMLElement>('.world-pickup-prompt');
    const currentItemIds = new Set(currentNearbyItems.map((item: any) => item.userData.itemId));
    
    allPrompts.forEach(prompt => {
      const itemId = prompt.dataset.itemId;
      
      // If this prompt's target item is no longer in the nearby items list
      if (!currentItemIds.has(itemId)) {
        console.log(`🚫 Item ${itemId} no longer exists - disabling pickup prompt`);
        
        // Fade out and remove the prompt
        prompt.style.transition = 'opacity 0.2s ease-out';
        prompt.style.opacity = '0';
        prompt.dataset.hidden = 'true';
        
        // Remove from DOM after fade animation
        setTimeout(() => {
          if (prompt.parentNode) {
            prompt.parentNode.removeChild(prompt);
          }
        }, 200);
      }
    });
  }
  // Method to remove all world pickup prompts (useful for cleanup)
  removeAllWorldPickupPrompts() {
    const pickupPrompts = document.querySelectorAll('.world-pickup-prompt');
    pickupPrompts.forEach(prompt => {
      prompt.remove();
    });
    console.log('Removed all world pickup prompts');
  }
  // Clean up popups when UI is destroyed
  destroy() {
    if (this.hotbarElement) {
      this.hotbarElement.remove();
    }
if (this.overlayElement) {
      this.overlayElement.remove();
    }
    if (this.buildPromptElement) {
      this.buildPromptElement.remove();
    }
    
    // Clean up any remaining popups
    this.pickupPopups.forEach(popup => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    });
    this.pickupPopups = [];
  }
}