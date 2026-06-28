import * as THREE from 'three';
import { ThirdPersonCharacterController } from './CharacterController.js';
import { Environment } from './environment.js';
import { Player } from './player.js';
import { Inventory, Item } from './inventory.js';
import { InventoryUI } from './inventoryUI.js';
import { CollisionSystem } from './CollisionSystem.js';
import { BuildingSystem } from './BuildingSystem.js';
import { Compass } from './compass.js';
import { DebugUI } from './DebugUI.js';
import { TreeChoppingSystem } from './TreeChoppingSystem.js';
import { ItemDropSystem } from './ItemDropSystem.js';
import { HealthSystem } from './HealthSystem.js';
import { ItemUseSystem } from './ItemUseSystem.js';
import { DogCompanion } from './DogCompanion.js';
import { MainMenu } from './MainMenu.js';
import { SaveSystem } from './SaveSystem.js';
import { InGameUI } from './InGameUI.js';
import { LoadingScreen } from './LoadingScreen.js';
import { randomWorldSeed } from '@cozy/shared';
import { InputSchemeManager } from './input/scheme.js';
import { TouchInput } from './input/touch.js';
import { TouchControls } from './input/TouchControls.js';
import { NetworkSession } from './net/NetworkSession.js';
import { RemotePlayer } from './net/RemotePlayer.js';
import { getSelectedPlayerModel, type PlayerModelId } from './playerModel.js';

/** Narrow a peer's model id string to a known PlayerModelId, or undefined (use default). */
function coerceModelId(id?: string): PlayerModelId | undefined {
  return id === 'female' || id === 'male' ? id : undefined;
}

export class Game {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  player: Player | null;
  characterController: ThirdPersonCharacterController | null;
  inputScheme: InputSchemeManager | null;
  touchInput: TouchInput | null;
  touchControls: TouchControls | null;
  environment: Environment | null;
  inventory: Inventory | null;
  inventoryUI: InventoryUI | null;
  collisionSystem: CollisionSystem | null;
  buildingSystem: BuildingSystem | null;
  debugUI: DebugUI | null;
  treeChoppingSystem: TreeChoppingSystem | null;
  itemDropSystem: ItemDropSystem | null;
  healthSystem: HealthSystem | null;
  itemUseSystem: ItemUseSystem | null;
  dogCompanion: DogCompanion | null;
  pickupableItems: THREE.Object3D[];
  pickupPrompt: HTMLDivElement | null;
  nearestPickupableItem: THREE.Object3D | null;
  lastPromptPosition: { x: number; y: number };
  targetPromptPosition: { x: number; y: number };
  promptLerpSpeed: number;
  promptUpdateFrameCount: number;
  clock: THREE.Clock;
  compass: Compass;
  mainMenu: MainMenu | null;
  isGameStarted: boolean;
  isPaused: boolean;
  saveSystem: SaveSystem | null;
  gameStartTime: number;
  inGameUI: InGameUI | null;
  loadingScreen: LoadingScreen | null;
  /** Active multiplayer session, or null in single-player (local) mode. */
  network: NetworkSession | null;
  /** 'local' (offline, cookies, pause-on-hide) or 'network' (live, keepalive, no freeze). */
  sessionMode: 'local' | 'network';
  /** Set when the server kicks us (replaced/timeout/shutdown), to suppress auto-reconnect. */
  networkKicked: boolean;
  /** Built in createSampleItems() during startGame(), before any read. */
  itemRegistry!: Record<string, Item>;

  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.player = null;
    this.characterController = null;
    this.inputScheme = null;
    this.touchInput = null;
    this.touchControls = null;
    this.environment = null;
    this.inventory = null;
    this.inventoryUI = null;
    this.collisionSystem = null;
    this.buildingSystem = null;
    this.debugUI = null;
    this.treeChoppingSystem = null;
    this.itemDropSystem = null;
    this.healthSystem = null;
    this.itemUseSystem = null;
    this.dogCompanion = null;
    this.pickupableItems = [];  // Array to hold multiple pickupable items
    this.pickupPrompt = null;  // Floating UI element
    this.nearestPickupableItem = null;  // Track the nearest item for UI display
    this.lastPromptPosition = { x: 0, y: 0 };  // Cache last position
    this.targetPromptPosition = { x: 0, y: 0 };  // Target position for interpolation
    this.promptLerpSpeed = 0.15;  // Interpolation speed (0-1, higher = faster)
    this.promptUpdateFrameCount = 0;  // Frame counter for UI updates
    this.clock = new THREE.Clock();
    
    // Compass system
    this.compass = new Compass();
    
    // Main menu system
    this.mainMenu = null;
    this.isGameStarted = false;
    this.isPaused = false;
    
    // Save system
    this.saveSystem = null;
    this.gameStartTime = Date.now();
    
    // In-game UI
    this.inGameUI = null;
    
    // Loading screen
    this.loadingScreen = null;

    // Multiplayer session (null in local mode)
    this.network = null;
    this.sessionMode = 'local';
    this.networkKicked = false;

    // Store game instance globally for slider access
    (window as any).gameInstance = this;
  }

  async init() {
    // Initialize save system first
    this.saveSystem = new SaveSystem(this);
    
    // Initialize in-game UI
    this.inGameUI = new InGameUI(this);
    
    // Initialize main menu with save system reference
    this.mainMenu = new MainMenu(this);
    
    // Don't initialize the game world yet - wait for user to click "Start Game"
    console.log('Main menu and save system initialized. Game world will load when user starts the game.');
  }
  async startGame(
    seed?: number | string,
    choppedTreeIds?: string[],
    multiplayer?: { url: string; password?: string }
  ) {
    // Multiplayer: join FIRST, before hiding the menu or building anything, so a bad
    // URL or unreachable server rejects cleanly with the menu still up (the caller
    // catches and shows the error). connect() needs no scene; the remote-avatar
    // factory (which does) is only used later, in begin(), once the scene exists.
    if (multiplayer) {
      this.sessionMode = 'network';
      this.network = new NetworkSession({
        config: { url: multiplayer.url, password: multiplayer.password, modelId: getSelectedPlayerModel() },
        remoteFactory: (peer) => new RemotePlayer(this.scene!, peer.playerId, coerceModelId(peer.modelId)),
        now: () => performance.now(),
        // Confirmed world diffs -> scene changes. Closures read the systems at call
        // time (they exist by begin(), after the world is built).
        worldHandlers: {
          onTreeChopped: (networkId) => this.environment?.removeTreeByNetworkId(networkId),
          onBuildingPlaced: (building) => this.buildingSystem?.materializeNetworkBuilding(building),
          onBuildingRemoved: (networkId) => this.buildingSystem?.removeNetworkBuilding(networkId),
          onDropSpawned: (drop) => {
            const item = this.itemRegistry?.[drop.itemId];
            if (!item || !this.itemDropSystem) return;
            const pos = new THREE.Vector3(drop.position.x, drop.position.y, drop.position.z);
            void this.itemDropSystem.dropItem(item, pos, drop.quantity).then((mesh) => {
              mesh.userData.networkId = drop.networkId;
            });
          },
          onDropRemoved: (networkId) => {
            const mesh = this.pickupableItems.find((m) => m.userData.networkId === networkId);
            if (mesh) this.itemDropSystem?.removeItem(mesh);
          },
        },
        handlers: {
          // Server-authoritative inventory change (chop/pickup/drop): reflect it in
          // our local inventory. Closes the resource loop in network mode.
          onInventoryDelta: (itemId, delta) => this.applyInventoryDelta(itemId, delta),
          // Unexpected drop (not our own destroy()): try to reconnect in place.
          onClose: () => void this.handleNetworkDrop(),
          // A kick is intentional (replaced/timeout/shutdown): don't auto-reconnect.
          onKick: (reason) => {
            this.networkKicked = true;
            console.warn(`Disconnected by server: ${reason}`);
          },
          onError: (code, message) => console.warn(`Network error: ${code} ${message}`),
        },
      });
      await this.network.connect();
    }

    // Create and show loading screen first
    this.loadingScreen = new LoadingScreen();
    this.loadingScreen.setProgress(0, 'Starting game initialization...');
    this.loadingScreen.setTip('Welcome to your cozy adventure!');
    
    // Small delay to show initial loading screen
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Hide main menu if visible
    if (this.mainMenu) {
      this.mainMenu.hide();
    }
    
    // Set game as started
    this.isGameStarted = true;
    
    console.log('Starting game initialization...');
    
    // Create basic Three.js components
    this.loadingScreen.setProgress(10, 'Setting up 3D scene...');
    this.loadingScreen.setTip('Creating the game world...');
    this.createScene();
    this.createCamera();
    this.createRenderer();
    
    // Initialize collision system first
    this.loadingScreen.setProgress(20, 'Initializing collision system...');
    this.loadingScreen.setTip('Setting up physics and collisions...');
    this.collisionSystem = new CollisionSystem(this.scene!);
    
    // Create environment with collision system
    this.loadingScreen.setProgress(30, 'Creating environment...');
    this.loadingScreen.setTip('Generating trees, rocks, and terrain...');
    // Resolve the world seed: multiplayer uses the server's canonical seed (so every
    // client builds the same base world); a loaded save passes its stored seed; a new
    // local game gets a fresh random one. The layout is deterministic from it.
    const worldSeed: number | string = this.network ? this.network.seed : (seed ?? randomWorldSeed());
    this.environment = new Environment(this.scene!, this.collisionSystem, worldSeed);
    // Exclude trees the player already chopped (from a loaded save) before generation,
    // so they don't reappear. Must be set before create() builds the trees.
    if (choppedTreeIds && choppedTreeIds.length) {
      this.environment.choppedTreeIds = new Set(choppedTreeIds);
    }
    this.environment.create();
    console.log(`World generated from seed: ${this.environment.seed}`);
    
    this.setupColliders();
    
    // Create and load player
    this.loadingScreen.setProgress(40, 'Loading player character...');
    this.loadingScreen.setTip('Preparing your character and animations...');
    this.player = new Player(this.scene!);
    await this.player.load();
    
    // Initialize controllers
    this.loadingScreen.setProgress(50, 'Setting up controls...');
    this.loadingScreen.setTip('Configuring movement and camera controls...');
    this.initializeControllers();
    
    // Initialize inventory system
    this.loadingScreen.setProgress(60, 'Loading inventory system...');
    this.loadingScreen.setTip('Setting up your backpack and items...');
    this.initializeInventory();
    
    // Initialize health system
    this.loadingScreen.setProgress(65, 'Initializing health system...');
    this.loadingScreen.setTip('Setting up health and status effects...');
    this.initializeHealthSystem();
    
    // Initialize item use system  
    this.initializeItemUseSystem();
    
    // Initialize item drop system
    this.initializeItemDropSystem();
    
    // Initialize building system
    this.loadingScreen.setProgress(70, 'Loading building system...');
    this.loadingScreen.setTip('Preparing construction tools and materials...');
    await this.initializeBuildingSystem();
    
    // Initialize tree chopping system
    this.loadingScreen.setProgress(75, 'Setting up resource gathering...');
    this.loadingScreen.setTip('Loading axes and tree chopping mechanics...');
    this.initializeTreeChoppingSystem();
    
    // Initialize dog companion
    this.loadingScreen.setProgress(80, 'Loading your companion...');
    this.loadingScreen.setTip('Your loyal dog companion is getting ready...');
    await this.initializeDogCompanion();
    
    // Debug: Log scene contents
    console.log('Scene children after adding items:', this.scene!.children.length);
    console.log('Pickupable items array length:', this.pickupableItems.length);
    
    // Create pickup UI prompt
    this.loadingScreen.setProgress(85, 'Setting up user interface...');
    this.loadingScreen.setTip('Creating menus and interaction prompts...');
    this.createPickupPrompt();
    
    // Initialize compass
    this.compass.initialize();
    
    // Initialize debug UI
    this.debugUI = new DebugUI(this);
    
    // Handle window resize
    this.setupEventListeners();

    // Multiplayer: the scene is built, so start materializing remote avatars
    // (peers from the join, plus any who arrived during loading). No-op in local mode.
    this.network?.begin();

    // Final setup
    this.loadingScreen.setProgress(95, 'Finalizing setup...');
    this.loadingScreen.setTip('Almost ready! Preparing final touches...');
    
    console.log('Game world fully initialized and ready to play!');
    
    // Local mode persists to cookies; network mode is server-authoritative, so skip
    // the local autosave timer and keep the Quick Save button hidden entirely.
    if (this.sessionMode === 'local') {
      // Enable auto-save after game is fully initialized
      if (this.saveSystem) {
        this.saveSystem.enableAutoSave(5); // Auto-save every 5 minutes
      }

      // Show in-game UI save button
      if (this.inGameUI) {
        this.inGameUI.show();
      }
    }
    
    // Complete loading
    this.loadingScreen.setProgress(100, 'Ready to play!');
    this.loadingScreen.setTip('Welcome to your cozy adventure! Start exploring!');
    
    // Hide loading screen after a brief moment
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.hide();
        this.loadingScreen = null;
      }
    }, 1500);
  }

  createScene() {
    this.scene = new THREE.Scene();
    
    // Set neutral background color
    this.scene.background = new THREE.Color(0x87ceeb);
    
    // Add atmospheric fog for depth
    this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 5, 10);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enable shadows for realistic lighting
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Enhance color output
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) {
      throw new Error('Cannot start game: #gameContainer element not found in the DOM');
    }
    gameContainer.appendChild(this.renderer.domElement);
  }

  initializeControllers() {
    // Initialize the new character controller
    this.characterController = new ThirdPersonCharacterController(
      this.player!.mesh!,
      this.camera!,
      this.renderer!
    );
    
    // Pass collision system to character controller
    if (this.collisionSystem) {
      this.characterController.setCollisionSystem(this.collisionSystem);
      // Set player mesh reference for debug visualization
      this.collisionSystem.setPlayerMesh(this.player!.mesh!);
    }

    // Touch input layer: a thin Pointer Events adapter that feeds the live
    // controller (moveAxis + camera angles). The overlay shows only on touch
    // devices and follows the last input source used.
    this.inputScheme = new InputSchemeManager();
    this.touchControls = new TouchControls({
      onPickup: () => this.tryPickupItem(),
      onJump: () => this.characterController?.requestJump(),
      onBackpack: () => this.inventoryUI?.toggleBackpack(),
    });
    this.touchInput = new TouchInput(this.renderer!.domElement, this.characterController, {
      onJoystick: (state) => this.touchControls!.setJoystick(state),
    });
    const applyScheme = (touch: boolean) => {
      this.touchControls!.setVisible(touch);
      // Drives CSS that hides keyboard/mouse hints (E / V / 1.. / "Esc to close")
      // and the compact touch hotbar sizing.
      document.body.classList.toggle('input-touch', touch);
      // Re-lay the hotbar so empty trailing slots hide/show for the new scheme.
      this.inventoryUI?.updateUI();
    };
    applyScheme(this.inputScheme.isTouch());
    this.inputScheme.onChange((scheme) => applyScheme(scheme === 'touch'));
  }
  setupColliders() {
    // Find and register all collision objects in the scene
    this.scene!.traverse((child) => {
      if (child.userData && child.userData.isCollider) {
        console.log('Registering collider:', child.name || 'unnamed', 'type:', child.userData.colliderType);
        this.collisionSystem!.addCollider(child);
      }
    });

    console.log(`Registered ${this.collisionSystem!.colliders.length} colliders for ground collision`);
  }
  initializeInventory() {
    // Create inventory system
    this.inventory = new Inventory();
    
    // Create inventory UI with player reference
    this.inventoryUI = new InventoryUI(this.inventory, this.player);
    
    // Create sample items for testing
    this.createSampleItems();
    
    // Add some sample items to inventory
    this.addSampleItemsToInventory();
    
    // Set up inventory selection callback
    this.inventory.onHotbarSelectionChange = (index, itemStack) => {
      console.log('Hotbar selection changed:', index, itemStack);
      if (this.player && this.player.mesh) {
        this.player.updateHeldItem(itemStack);
      }
    };
    
    // Also trigger initial held item update
    setTimeout(() => {
      const initialItem = this.inventory!.getSelectedItem();
      console.log('Setting initial held item:', initialItem);
      if (this.player && this.player.mesh) {
        this.player.updateHeldItem(initialItem);
      }
    }, 100);
  }
createSampleItems() {
    // Create item registry for easy access
    this.itemRegistry = {
      'sword': new Item('sword', 'Iron Sword', 'weapon', 'sword_icon', 1, 'A sharp iron sword for combat'),
      'potion': new Item('potion', 'Health Potion', 'consumable', 'potion_icon', 10, 'Restores 50 health points'),
      'wood': new Item('wood', 'Wood Plank', 'material', 'wood_icon', 64, 'Basic building material'),
      'pickaxe': new Item('pickaxe', 'Stone Pickaxe', 'tool', 'pickaxe_icon', 1, 'Used for mining stone and ores'),
      'apple': new Item('apple', 'Apple', 'consumable', 'apple_icon', 16, 'A crisp red apple that restores hunger'),
      'helmet': new Item('helmet', 'Iron Helmet', 'armor', 'helmet_icon', 1, 'Provides protection for your head'),
      'stone': new Item('stone', 'Stone', 'material', 'stone_icon', 64, 'Common stone material'),
      'bow': new Item('bow', 'Wooden Bow', 'weapon', 'bow_icon', 1, 'Ranged weapon that shoots arrows'),
      'arrow': new Item('arrow', 'Arrow', 'weapon', 'arrow_icon', 64, 'Ammunition for bows'),
      'cube': new Item('cube', 'Test Cube', 'material', 'cube_icon', 32, 'A simple cube for testing inventory features'),
      'axe': new Item('axe', 'Wooden Axe', 'tool', 'axe_icon', 1, 'A sturdy wooden axe for chopping trees and wood')
    };
  }
addSampleItemsToInventory() {
    // Add starting items
    this.inventory!.addItem(this.itemRegistry['axe'], 1);

    // Select the first slot so player starts holding the axe
    this.inventory!.selectHotbarSlot(0);
  }
  createPickupPrompt() {
    // Create floating UI element for pickup prompt
    this.pickupPrompt = document.createElement('div');
    this.pickupPrompt.id = 'pickup-prompt';
    this.pickupPrompt.className = 'world-pickup-prompt';
    this.pickupPrompt.style.cssText = `
      position: fixed;
      opacity: 0;
      transition: opacity 0.15s ease;
      white-space: nowrap;
      will-change: left, top, opacity;
    `;
    this.pickupPrompt.innerHTML = 'Press <span class="pickup-key">E</span> to pick up';
    
    document.body.appendChild(this.pickupPrompt);
  }
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera!.aspect = window.innerWidth / window.innerHeight;
      this.camera!.updateProjectionMatrix();
      this.renderer!.setSize(window.innerWidth, window.innerHeight);
    });
    // Add pickup interaction (E key)
    document.addEventListener('keydown', (e) => {
      if (e.code === 'KeyE') {
        this.tryPickupItem();
      }
    });
    
    // Add tree chopping interaction (left click)
    document.addEventListener('click', (e) => {
      if (this.treeChoppingSystem) {
        this.treeChoppingSystem.handleClick(e);
      }
    });
  }
  tryPickupItem() {
    if (!this.nearestPickupableItem || !this.player || !this.inventory) return;

    // Multiplayer: picking up is server-authoritative. Emit pickup_drop and let the
    // confirmed drop_removed event remove the drop; do not pick up locally. The item
    // is granted to the server-side inventory; reflecting server-authoritative
    // inventory grants on the client is a known v1 gap (needs an inventory-sync
    // message). In local mode this branch is skipped.
    if (this.network) {
      const networkId = this.nearestPickupableItem.userData.networkId;
      if (typeof networkId === 'number') {
        this.network.sendCommand({ type: 'pickup_drop', networkId });
      }
      return;
    }

    // Check distance between player and nearest item
    const playerPosition = this.player.mesh!.position;
    const itemPosition = this.nearestPickupableItem.position;
    const distance = playerPosition.distanceTo(itemPosition);
    
    // Pickup range
    const pickupRange = 2.5;
    if (distance <= pickupRange) {
      // Get the item from registry
      const itemId = this.nearestPickupableItem.userData.itemId;
      const item = this.itemRegistry[itemId];
      const quantity = this.nearestPickupableItem.userData.quantity;
      
      if (item) {
        // Try to add item to inventory
        const addedAmount = this.inventory.addItem(item, quantity);
        
        if (addedAmount > 0) {
          // Remove item from scene if successfully picked up
          this.scene!.remove(this.nearestPickupableItem);
          
          // Remove from pickupable items array
          const index = this.pickupableItems.indexOf(this.nearestPickupableItem);
          if (index !== -1) {
            this.pickupableItems.splice(index, 1);
          }
          
          this.nearestPickupableItem = null;
          
          // Immediately hide pickup prompt since item is gone
          if (this.pickupPrompt) {
            this.pickupPrompt.style.opacity = '0';
          }
          
          console.log(`Picked up ${addedAmount} ${item.name}(s)`);
        } else {
          console.log('Inventory full! Cannot pick up item.');
        }
      }
    } else {
      console.log('Too far from item to pick up. Get closer and press E.');
    }
  }
  updatePickupPrompt() {
    if (!this.player || !this.pickupPrompt || this.pickupableItems.length === 0) return;
    
    const playerPosition = this.player.mesh!.position;
    const pickupRange = 2.5;
    
    // First, validate that all items in pickupableItems array still exist in the scene
    this.validatePickupableItems();
    
    // If we have a currently targeted item, validate it still exists before proceeding
    if (this.nearestPickupableItem && !this.scene!.children.includes(this.nearestPickupableItem)) {
      console.log(`🚫 Currently targeted item ${this.nearestPickupableItem.userData?.itemId} no longer exists - clearing UI`);
      this.nearestPickupableItem = null;
      this.pickupPrompt.style.opacity = '0';
      // Clear any world pickup prompts for this item too
      if (this.inventoryUI) {
        this.inventoryUI.cleanupWorldPickupPrompts((this.nearestPickupableItem as any)?.userData?.itemId || 'unknown');
      }
    }
    
    // Find all items within range for re-showing hidden prompts
    const nearbyItems = [];
    
    // Find the nearest pickupable item within range
    let nearestItem = null;
    let nearestDistance = Infinity;
    
    for (const item of this.pickupableItems) {
      // Double-check that item still exists in scene before processing
      if (!this.scene!.children.includes(item)) {
        console.log(`🚫 Item ${item.userData?.itemId} no longer in scene, skipping`);
        continue;
      }
      
      const distance = playerPosition.distanceTo(item.position);
      if (distance <= pickupRange) {
        nearbyItems.push(item);
        if (distance < nearestDistance) {
          nearestItem = item;
          nearestDistance = distance;
        }
      }
    }
    
    // Show pickup prompts for nearby items (handles both hidden prompts and completely new items)
    if (nearbyItems.length > 0 && this.inventoryUI) {
      this.inventoryUI.showPickupPromptsForNewItems(nearbyItems);
    }
    
    this.nearestPickupableItem = nearestItem;
    
    if (nearestItem) {
      // Double-check that the nearest item still exists in the scene before showing UI
      if (!this.scene!.children.includes(nearestItem)) {
        console.log(`🚫 Nearest item ${nearestItem.userData?.itemId} no longer in scene - hiding UI`);
        this.pickupPrompt.style.opacity = '0';
        this.nearestPickupableItem = null;
        return;
      }
      
      // Show pickup prompt
      this.pickupPrompt.style.opacity = '1';
      
      // Update prompt text with item name
      const itemId = nearestItem.userData.itemId;
      const item = this.itemRegistry[itemId];
      const itemName = item ? item.name : 'Item';
      this.pickupPrompt.innerHTML = `Press <span class="pickup-key">E</span> to pick up <span class="pickup-item-name">${itemName}</span>`;
      
      // Convert 3D world position to 2D screen position
      const itemWorldPosition = new THREE.Vector3(
        nearestItem.position.x,
        nearestItem.position.y + 0.4, // Reduced offset above the item
        nearestItem.position.z
      );
      
      // Project to screen coordinates
      itemWorldPosition.project(this.camera!);
      
      // Convert normalized device coordinates to screen pixels
      const targetX = (itemWorldPosition.x * 0.5 + 0.5) * window.innerWidth;
      const targetY = (itemWorldPosition.y * -0.5 + 0.5) * window.innerHeight;
      
      // Update target position
      this.targetPromptPosition.x = targetX;
      this.targetPromptPosition.y = targetY;
      
      // Interpolate between current and target position for smooth movement
      this.lastPromptPosition.x += (this.targetPromptPosition.x - this.lastPromptPosition.x) * this.promptLerpSpeed;
      this.lastPromptPosition.y += (this.targetPromptPosition.y - this.lastPromptPosition.y) * this.promptLerpSpeed;
      
      // Apply interpolated position
      this.pickupPrompt.style.left = `${Math.round(this.lastPromptPosition.x)}px`;
      this.pickupPrompt.style.top = `${Math.round(this.lastPromptPosition.y)}px`;
    } else {
      // Hide pickup prompt
      this.pickupPrompt.style.opacity = '0';
    }
  }
  // Method to validate and clean up pickupable items array
  validatePickupableItems() {
    const initialLength = this.pickupableItems.length;
    
    // Filter out items that are no longer in the scene
    this.pickupableItems = this.pickupableItems.filter(item => {
      const stillExists = this.scene!.children.includes(item);
      if (!stillExists) {
        console.log(`🧹 Removing non-existent item ${item.userData?.itemId} from pickupableItems array`);
      }
      return stillExists;
    });
    
    // Log cleanup results
    if (this.pickupableItems.length !== initialLength) {
      console.log(`📊 Cleaned up pickupableItems: ${initialLength} → ${this.pickupableItems.length}`);
    }
    
    // If current nearest item no longer exists, clear it
    if (this.nearestPickupableItem && !this.scene!.children.includes(this.nearestPickupableItem)) {
      console.log(`🚫 Clearing nearest item reference - item no longer exists`);
      this.nearestPickupableItem = null;
      
      // Hide pickup prompt since nearest item is gone
      if (this.pickupPrompt) {
        this.pickupPrompt.style.opacity = '0';
      }
    }
  }
  
  update() {
    // Only update game systems if the game has been started and is not paused
    if (!this.isGameStarted || this.isPaused) {
      return;
    }

    // Clamp delta so a stall (tab hidden, GC, breakpoint) can't fling the physics.
    const deltaTime = Math.min(this.clock.getDelta(), 0.1);
    
    if (this.characterController) {
      // Update character controller
      this.characterController.update(deltaTime);
      
      // Update player animations and held item position
      if (this.player) {
        this.player.update(deltaTime, this.characterController, this.camera!.position);
      }

      // Multiplayer: relay our avatar (NetworkSystem rate-limits to ~15 Hz, not per
      // frame) and advance remote avatars by interpolation. No-op in local mode.
      if (this.network) {
        const mesh = this.player?.mesh;
        if (mesh) {
          this.network.setLocalAvatar({
            position: { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z },
            rotation: { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z },
            movement: this.characterController.getMovementState(),
            heldItemId: this.inventory?.getSelectedItem()?.item.id ?? null,
          });
        }
        this.network.update(deltaTime, performance.now());
      }

      // Update compass
      this.compass.update(this.camera!);
      
      // Update pickup UI
      this.updatePickupPrompt();
      // Mirror the pickup prompt into the touch overlay's contextual button.
      if (this.touchControls) {
        this.touchControls.setPickupVisible(this.nearestPickupableItem !== null);
      }

      // Update item drop system
      if (this.itemDropSystem) {
        this.itemDropSystem.update();
      }
      
      // Update tree chopping system
      if (this.treeChoppingSystem) {
        this.treeChoppingSystem.update();
      }
      
      // Update collision system debug visualizations
      if (this.collisionSystem) {
        this.collisionSystem.updatePlayerColliderVisualization();
      }
      
      // Update dog companion
      if (this.dogCompanion) {
        this.dogCompanion.update(deltaTime, this.pickupableItems);
      }
      
      // Update occupied slots debug display
      if (this.debugUI) {
        this.debugUI.updateOccupiedSlotsDebug();
        this.debugUI.updateVisuals();
      }
      
      // The building system does not have a general update loop.
      // Its components are updated based on player actions.

      // Touch build mode: there's no hovering mouse, so aim the placement
      // preview with the camera (screen centre) every frame and show the action
      // row. Placement itself is a world tap (the existing build click handler).
      if (this.buildingSystem) {
        const building = this.buildingSystem.isBuilding;
        if (this.touchControls) this.touchControls.setBuildPanelVisible(building);
        if (building && this.inputScheme?.isTouch()) {
          this.buildingSystem.updateMousePosition({
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2,
          } as MouseEvent);
          this.buildingSystem.updatePreview();
        }
      }
    }
  }

  render() {
    // Only render the game world if it has been initialized
    if (this.isGameStarted && this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  pause() {
    // Called on tab-hide (see main.js) and by any in-game pause.
    // In multiplayer the shared world cannot freeze: keep the simulation running
    // and the network keepalive alive so the player stays present (documented
    // Principle I deviation, network mode only). Local mode is unchanged.
    if (this.sessionMode === 'network') return;
    if (!this.isGameStarted || this.isPaused) return;
    this.isPaused = true;
    this.clock.stop(); // freeze elapsed time so deltaTime doesn't jump on resume
    if (this.environment && this.environment.pauseWaves) {
      this.environment.pauseWaves();
    }
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.clock.start(); // restart the clock; next getDelta() is small, no jump
    if (this.environment && this.environment.resumeWaves) {
      this.environment.resumeWaves();
    }
  }

  destroy() {
    // Clean up save system
    if (this.saveSystem) {
      this.saveSystem.destroy();
    }
    
    // Clean up in-game UI
    if (this.inGameUI) {
      this.inGameUI.destroy();
    }
    
    // Clean up main menu
    if (this.mainMenu) {
      this.mainMenu.destroy();
    }
    
    // Clean up pickup prompt
    if (this.pickupPrompt) {
      this.pickupPrompt.remove();
    }
    
    // Clean up inventory UI
    if (this.inventoryUI) {
      this.inventoryUI.destroy();
    }
    
    // Clean up character controller
    if (this.characterController) {
      this.characterController.destroy();
    }

    // Clean up touch input layer
    if (this.touchInput) this.touchInput.destroy();
    if (this.touchControls) this.touchControls.destroy();
    if (this.inputScheme) this.inputScheme.destroy();

    // Clean up building system
    if (this.buildingSystem) {
      this.buildingSystem.destroy();
    }
    
    // Clean up dog companion
    if (this.dogCompanion) {
      this.dogCompanion.destroy();
    }
    
    // Clean up debug UI
    if (this.debugUI) {
      this.debugUI.destroy();
    }

    // Tear down the multiplayer session (remote avatars + transport), symmetric
    // with startGame. Safe in local mode (no-op when there is no session).
    if (this.network) {
      this.network.destroy();
      this.network = null;
    }

    // Release GPU resources. game.destroy() historically omitted this (see the
    // technical report); the multiplayer teardown path now relies on it so repeated
    // sessions don't leak WebGL contexts.
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
  }

  /**
   * Apply a server-authoritative inventory change (multiplayer). Items granted by
   * the server (chopped wood, picked-up drops) arrive here because the network
   * command paths intentionally do not mutate the inventory locally, so this is the
   * single place those grants land — no double-counting. Building cost stays local.
   */
  private applyInventoryDelta(itemId: string, delta: number): void {
    const item = this.itemRegistry?.[itemId];
    if (!item || !this.inventory) return;
    if (delta > 0) this.inventory.addItem(item, delta);
    else if (delta < 0) this.inventory.removeItem(itemId, -delta);
  }

  /**
   * Handle an unexpected loss of the network connection (multiplayer): attempt an
   * in-place reconnect that recovers our playerId within the server's window and
   * reconciles the world. A kick is intentional and skips reconnect. On failure the
   * client stays alive (no crash); a graceful return-to-menu is follow-up polish.
   */
  private async handleNetworkDrop(): Promise<void> {
    if (!this.network || this.networkKicked) return;
    console.warn('Connection lost; attempting to reconnect...');
    try {
      await this.network.reconnect();
      console.log('Reconnected to the server.');
    } catch (err) {
      console.error('Reconnect failed:', err);
    }
  }

  async initializeBuildingSystem() {
    try {
      console.log('Initializing building system...');
      this.buildingSystem = new BuildingSystem(this.scene!, this.camera!, this.collisionSystem!, this.inventory);
      await this.buildingSystem.init();
      
      // Set player reference for grid following
      if (this.player) {
        this.buildingSystem.setPlayer(this.player);
      }

      // Multiplayer: route placement through the server (apply-on-confirm). In local
      // mode requestPlace stays null and building keeps its existing behavior.
      if (this.network) {
        this.buildingSystem.requestPlace = (cmd) =>
          this.network?.sendCommand({ type: 'place_building', ...cmd });
      }

      // Wire the touch build controls to the building system (mirrors V/R/X/C).
      if (this.touchControls) {
        this.touchControls.setBuildHandlers({
          onToggle: () => this.buildingSystem!.toggleBuildingMode(),
          onRotate: () => this.buildingSystem!.rotateWall(),
          onToggleTool: () => this.buildingSystem!.toggleBuildingTool(),
          onCenter: () => this.buildingSystem!.showSelectionScreen(),
        });
      }

      // Set item registry reference for resource returns
      if (this.itemRegistry) {
        this.buildingSystem.setItemRegistry(this.itemRegistry);
      }
      
      console.log('Building system initialized successfully');
      console.log('Building system object:', this.buildingSystem);
      
      // Test the building system
      setTimeout(() => {
        console.log('Building system test - isBuilding:', this.buildingSystem!.isBuilding);
        console.log('Building system test - gridHelper:', this.buildingSystem!.gridHelper);
      }, 1000);
    } catch (error) {
      console.error('Failed to initialize building system:', error);
    }
  }
  
  initializeItemDropSystem() {
    this.itemDropSystem = new ItemDropSystem(this.scene!);
    console.log('Item drop system initialized');
  }
  
  initializeTreeChoppingSystem() {
    this.treeChoppingSystem = new TreeChoppingSystem(
      this.scene!,
      this.camera!,
      this.inventory!,
      this.itemRegistry,
      this.environment,
      this.itemDropSystem!
    );
    
    // Set player reference for proximity-based tree chopping
    if (this.player) {
      this.treeChoppingSystem.setPlayer(this.player);
    }

    // Multiplayer: route chops through the server (apply-on-confirm). In local mode
    // requestChop stays null and chopping keeps its existing client-side behavior.
    if (this.network) {
      this.treeChoppingSystem.requestChop = (networkId) =>
        this.network?.sendCommand({ type: 'chop_tree', networkId });
    }

    console.log('Tree chopping system initialized with player reference and item drop system');
  }
  
  
  initializeHealthSystem() {
    this.healthSystem = new HealthSystem();
    console.log('Health system initialized with 5 hearts');
  }
  
  initializeItemUseSystem() {
    if (!this.inventory || !this.healthSystem) {
      console.error('Cannot initialize item use system - inventory or health system missing');
      return;
    }
    
    this.itemUseSystem = new ItemUseSystem(this.inventory, this.healthSystem);
    console.log('Item use system initialized and connected to inventory and health');
  }
  
async initializeDogCompanion() {
    try {
      console.log('Initializing dog companion...');
      this.dogCompanion = new DogCompanion(this.scene!, this.player);
      await this.dogCompanion.load();
      
      // Position dog near player initially
      if (this.player && this.player.mesh) {
        this.dogCompanion.mesh.position.set(
          this.player.mesh.position.x - 2,
          this.player.mesh.position.y,
          this.player.mesh.position.z - 2
        );
      }
      
      // Ensure dog is visible and added to scene
      if (this.dogCompanion.mesh) {
        this.dogCompanion.mesh.visible = true;
        console.log('Dog companion mesh visible:', this.dogCompanion.mesh.visible);
        console.log('Dog companion position:', this.dogCompanion.mesh.position);
        console.log('Dog companion scale:', this.dogCompanion.mesh.scale);
        console.log('Scene children count after adding dog:', this.scene!.children.length);
      }
      
      console.log('Dog companion loaded and positioned successfully');
    } catch (error) {
      console.error('Failed to initialize dog companion:', error);
      // Create a simple fallback dog for debugging
      this.createFallbackDog();
    }
  }
  createFallbackDog() {
    console.log('Creating fallback dog for debugging...');
    const geometry = new THREE.BoxGeometry(0.5, 0.3, 0.8);
    const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const fallbackDog = new THREE.Mesh(geometry, material);
    
    fallbackDog.position.set(
      this.player!.mesh!.position.x - 2,
      this.player!.mesh!.position.y + 0.15,
      this.player!.mesh!.position.z - 2
    );
    fallbackDog.castShadow = true;
    fallbackDog.receiveShadow = true;

    this.scene!.add(fallbackDog);
    console.log('Fallback dog created at position:', fallbackDog.position);
  }
  // Save/Load methods for external access
  saveGame(slotNumber: number = 0): boolean {
    if (this.saveSystem) {
      return this.saveSystem.saveGame(slotNumber);
    }
    return false;
  }
  async loadGame(slotNumber: number = 0): Promise<boolean> {
    if (this.saveSystem) {
      return await this.saveSystem.loadGame(slotNumber);
    }
    return false;
  }
  getSaveSlots(): ReturnType<SaveSystem['getSaveSlots']> {
    if (this.saveSystem) {
      return this.saveSystem.getSaveSlots();
    }
    return [];
  }
  deleteSave(slotNumber: number): boolean {
    if (this.saveSystem) {
      return this.saveSystem.deleteSave(slotNumber);
    }
    return false;
  }
}