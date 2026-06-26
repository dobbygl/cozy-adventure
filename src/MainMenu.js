import * as THREE from 'three';

export class MainMenu {
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.menuElement = null;
    this.backgroundScene = null;
    this.backgroundCamera = null;
    this.backgroundRenderer = null;
    this.animationId = null;
    this.isVisible = true;
    
    this.createMainMenu();
    this.setupBackground();
    this.startBackgroundAnimation();
  }

  createMainMenu() {
    // Create main menu container
    this.menuElement = document.createElement('div');
    this.menuElement.className = 'main-menu';
    this.menuElement.id = 'main-menu';
    
    this.menuElement.innerHTML = `
      <div class="menu-background"></div>
      <div class="menu-content">
        <div class="game-title">
          <h1>Cozy Adventure</h1>
          <p class="subtitle">Explore • Build • Survive</p>
        </div>
        
        <div class="menu-buttons">
          <button class="menu-btn primary" id="start-game">
            <span class="btn-icon">🏠</span>
            <span class="btn-text">Start Adventure</span>
          </button>
          
          <button class="menu-btn" id="continue-game" style="display: none;">
            <span class="btn-icon">📖</span>
            <span class="btn-text">Continue</span>
          </button>
          
          <button class="menu-btn" id="load-game">
            <span class="btn-icon">💾</span>
            <span class="btn-text">Load Game</span>
          </button>
          
          <button class="menu-btn" id="save-game" style="display: none;">
            <span class="btn-icon">💿</span>
            <span class="btn-text">Save Game</span>
          </button>
        </div>
        
        <!-- Save/Load Modal -->
        <div id="save-load-modal" class="save-load-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2 id="modal-title">Load Game</h2>
              <button class="close-btn" id="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <div class="save-slots" id="save-slots">
                <!-- Save slots will be populated dynamically -->
              </div>
            </div>
            <div class="modal-footer">
              <button class="menu-btn" id="modal-cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.createStyles();
    this.setupEventListeners();
    
    document.body.appendChild(this.menuElement);
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');
      
      .main-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        font-family: 'Nunito', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      
      .menu-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(139, 69, 19, 0.9) 0%,
          rgba(160, 82, 45, 0.85) 25%,
          rgba(210, 180, 140, 0.8) 50%,
          rgba(245, 222, 179, 0.85) 75%,
          rgba(139, 69, 19, 0.9) 100%
        );
        backdrop-filter: blur(10px);
        animation: backgroundShift 20s ease-in-out infinite;
      }
      
      @keyframes backgroundShift {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 0.7; }
      }
      
      .menu-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 500px;
        width: 90%;
        padding: 40px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.95), rgba(222, 184, 135, 0.9));
        border: 4px solid #8B4513;
        border-radius: 30px;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        animation: menuFloat 6s ease-in-out infinite;
      }
      
      @keyframes menuFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .game-title h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 3.5rem;
        color: #8B4513;
        margin: 0 0 10px 0;
        text-shadow: 
          3px 3px 0px rgba(160, 82, 45, 0.8),
          6px 6px 20px rgba(139, 69, 19, 0.4);
        background: linear-gradient(45deg, #8B4513, #CD853F, #D2691E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: titleGlow 3s ease-in-out infinite alternate;
      }
      
      @keyframes titleGlow {
        from { filter: drop-shadow(0 0 5px rgba(139, 69, 19, 0.3)); }
        to { filter: drop-shadow(0 0 15px rgba(139, 69, 19, 0.6)); }
      }
      
      .subtitle {
        font-size: 1.2rem;
        color: #A0522D;
        margin: 0 0 30px 0;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      
      .menu-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
      }
      
      .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px 24px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 3px solid #CD853F;
        border-radius: 20px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          0 6px 20px rgba(139, 69, 19, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.6),
          inset 0 -2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }
      
      .menu-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }
      
      .menu-btn:hover::before {
        left: 100%;
      }
      
      .menu-btn:hover {
        transform: translateY(-3px) scale(1.02);
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        box-shadow: 
          0 8px 25px rgba(139, 69, 19, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.7),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      
      .menu-btn:active {
        transform: translateY(-1px) scale(0.98);
      }
      
      .menu-btn.primary {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        color: #2E8B57;
        box-shadow: 
          0 8px 25px rgba(50, 205, 50, 0.4),
          inset 0 2px 6px rgba(255, 255, 255, 0.8),
          inset 0 -3px 6px rgba(0, 0, 0, 0.1);
      }
      
      .menu-btn.primary:hover {
        background: linear-gradient(145deg, #ADFF2F, #98FB98);
        border-color: #228B22;
        box-shadow: 
          0 10px 30px rgba(50, 205, 50, 0.6),
          inset 0 2px 8px rgba(255, 255, 255, 0.9),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .btn-icon {
        font-size: 1.4rem;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
      }
      
      .btn-text {
        font-weight: 700;
        letter-spacing: 0.5px;
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .menu-content {
          width: 95%;
          padding: 30px 20px;
          max-width: none;
        }
        
        .game-title h1 {
          font-size: 2.5rem;
        }
        
        .subtitle {
          font-size: 1rem;
          margin-bottom: 25px;
        }
        
        .menu-btn {
          padding: 14px 20px;
          font-size: 1rem;
          gap: 10px;
        }
        
        .btn-icon {
          font-size: 1.2rem;
        }
      }
      
      @media (max-width: 480px) {
        .menu-content {
          padding: 25px 15px;
        }
        
        .game-title h1 {
          font-size: 2rem;
        }
        
        .menu-buttons {
          gap: 12px;
        }
        
        .menu-btn {
          padding: 12px 16px;
          font-size: 0.95rem;
        }
      }
      
      /* Save/Load Modal Styles */
      .save-load-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .modal-content {
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 4px solid #8B4513;
        border-radius: 20px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(139, 69, 19, 0.8);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 2px solid rgba(139, 69, 19, 0.3);
      }
      
      .modal-header h2 {
        font-family: 'Fredoka One', cursive;
        color: #8B4513;
        margin: 0;
        font-size: 1.8rem;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        color: #8B4513;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
      
      .close-btn:hover {
        background-color: rgba(139, 69, 19, 0.1);
      }
      
      .modal-body {
        padding: 30px;
      }
      
      .save-slots {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .save-slot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 2px solid #CD853F;
        border-radius: 15px;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      
      .save-slot:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
      }
      
      .save-slot.empty {
        opacity: 0.6;
        font-style: italic;
      }
      
      .slot-info {
        flex: 1;
      }
      
      .slot-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 5px;
      }
      
      .slot-number {
        font-weight: bold;
        color: #8B4513;
        font-size: 1.1rem;
      }
      
      .slot-timestamp {
        color: #A0522D;
        font-size: 0.9rem;
      }
      
      .slot-details {
        font-size: 0.85rem;
        color: #8B4513;
      }
      
      .slot-actions {
        display: flex;
        gap: 10px;
      }
      
      .slot-btn {
        padding: 8px 15px;
        border: 2px solid #CD853F;
        border-radius: 10px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
      }
      
      .slot-btn:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        transform: translateY(-1px);
      }
      
      .slot-btn.delete {
        background: linear-gradient(145deg, #FFB6C1, #FF69B4);
        border-color: #FF1493;
        color: #8B0000;
      }
      
      .slot-btn.delete:hover {
        background: linear-gradient(145deg, #FFC0CB, #FFB6C1);
      }
      
      .modal-footer {
        padding: 20px 30px;
        border-top: 2px solid rgba(139, 69, 19, 0.3);
        display: flex;
        justify-content: center;
      }
      
      @media (max-width: 768px) {
        .modal-content {
          width: 95%;
          margin: 20px;
        }
        
        .modal-header {
          padding: 15px 20px;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .save-slot {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }
        
        .slot-actions {
          align-self: stretch;
          justify-content: space-between;
        }
        
        .slot-btn {
          flex: 1;
          text-align: center;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  setupBackground() {
    // Create a simple 3D background scene
    this.backgroundScene = new THREE.Scene();
    this.backgroundCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.backgroundRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    this.backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
    this.backgroundRenderer.setClearColor(0x87CEEB, 0.3);
    
    // Insert background canvas behind menu
    const menuBackground = this.menuElement.querySelector('.menu-background');
    menuBackground.appendChild(this.backgroundRenderer.domElement);
    this.backgroundRenderer.domElement.style.position = 'absolute';
    this.backgroundRenderer.domElement.style.top = '0';
    this.backgroundRenderer.domElement.style.left = '0';
    this.backgroundRenderer.domElement.style.zIndex = '-1';
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.backgroundScene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.backgroundScene.add(directionalLight);
    
    // Create floating cubes for background animation
    this.createFloatingElements();
    
    this.backgroundCamera.position.z = 10;
  }

  createFloatingElements() {
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 16, 12),
      new THREE.ConeGeometry(0.5, 1, 8)
    ];
    
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x8B4513, transparent: true, opacity: 0.3 }),
      new THREE.MeshLambertMaterial({ color: 0xDEB887, transparent: true, opacity: 0.4 }),
      new THREE.MeshLambertMaterial({ color: 0xF5DEB3, transparent: true, opacity: 0.3 })
    ];
    
    this.floatingElements = [];
    
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Random scale
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.setScalar(scale);
      
      // Store animation properties
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2
      };
      
      this.backgroundScene.add(mesh);
      this.floatingElements.push(mesh);
    }
  }

  setupEventListeners() {
    // Start Game button
    const startBtn = this.menuElement.querySelector('#start-game');
    startBtn.addEventListener('click', () => {
      this.startGame();
    });
    
    // Continue Game button
    const continueBtn = this.menuElement.querySelector('#continue-game');
    continueBtn.addEventListener('click', () => {
      this.continueGame();
    });
    
    // Load Game button
    const loadBtn = this.menuElement.querySelector('#load-game');
    loadBtn.addEventListener('click', () => {
      this.showLoadModal();
    });
    
    // Save Game button
    const saveBtn = this.menuElement.querySelector('#save-game');
    saveBtn.addEventListener('click', () => {
      this.showSaveModal();
    });
    
    // Modal event listeners
    const modal = this.menuElement.querySelector('#save-load-modal');
    const closeBtn = this.menuElement.querySelector('#close-modal');
    const cancelBtn = this.menuElement.querySelector('#modal-cancel');
    
    closeBtn.addEventListener('click', () => {
      this.hideModal();
    });
    
    cancelBtn.addEventListener('click', () => {
      this.hideModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideModal();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.backgroundRenderer && this.backgroundCamera) {
        this.backgroundCamera.aspect = window.innerWidth / window.innerHeight;
        this.backgroundCamera.updateProjectionMatrix();
        this.backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }

  startBackgroundAnimation() {
    const animate = () => {
      if (!this.isVisible) return;
      
      this.animationId = requestAnimationFrame(animate);
      
      // Animate floating elements
      this.floatingElements.forEach((element, index) => {
        element.rotation.x += element.userData.rotationSpeed.x;
        element.rotation.y += element.userData.rotationSpeed.y;
        element.rotation.z += element.userData.rotationSpeed.z;
        
        // Floating motion
        element.position.y += Math.sin(Date.now() * element.userData.floatSpeed + element.userData.floatOffset) * 0.01;
      });
      
      this.backgroundRenderer.render(this.backgroundScene, this.backgroundCamera);
    };
    
    animate();
  }

  startGame() {
    console.log('Starting game...');
    this.hide();
    
    // Initialize the game if it hasn't been started yet
    if (this.gameInstance && typeof this.gameInstance.startGame === 'function') {
      this.gameInstance.startGame();
    }
  }
  // Check for existing saves and update UI
  updateMenuState() {
    const saveSlots = this.gameInstance.getSaveSlots();
    const hasAnySave = saveSlots.some(slot => slot.exists);
    
    // Show continue button if there are any saves
    const continueBtn = this.menuElement.querySelector('#continue-game');
    if (hasAnySave) {
      continueBtn.style.display = 'flex';
    } else {
      continueBtn.style.display = 'none';
    }
    
    // Show save button only if game is started
    const saveBtn = this.menuElement.querySelector('#save-game');
    if (this.gameInstance.isGameStarted) {
      saveBtn.style.display = 'flex';
    } else {
      saveBtn.style.display = 'none';
    }
  }
  continueGame() {
    // Load the most recent save
    const saveSlots = this.gameInstance.getSaveSlots();
    let mostRecentSlot = null;
    let mostRecentTime = 0;
    
    for (const slot of saveSlots) {
      if (slot.exists && slot.metadata && slot.metadata.timestamp > mostRecentTime) {
        mostRecentSlot = slot.slotNumber;
        mostRecentTime = slot.metadata.timestamp;
      }
    }
    
    if (mostRecentSlot !== null) {
      this.loadGame(mostRecentSlot);
    }
  }
  showLoadModal() {
    this.currentModalType = 'load';
    const modal = this.menuElement.querySelector('#save-load-modal');
    const title = this.menuElement.querySelector('#modal-title');
    
    title.textContent = 'Load Game';
    this.populateSaveSlots();
    modal.style.display = 'flex';
  }
  showSaveModal() {
    this.currentModalType = 'save';
    const modal = this.menuElement.querySelector('#save-load-modal');
    const title = this.menuElement.querySelector('#modal-title');
    
    title.textContent = 'Save Game';
    this.populateSaveSlots();
    modal.style.display = 'flex';
  }
  hideModal() {
    const modal = this.menuElement.querySelector('#save-load-modal');
    modal.style.display = 'none';
  }
  populateSaveSlots() {
    const slotsContainer = this.menuElement.querySelector('#save-slots');
    const saveSlots = this.gameInstance.getSaveSlots();
    
    slotsContainer.innerHTML = '';
    
    saveSlots.forEach(slot => {
      const slotElement = document.createElement('div');
      slotElement.className = `save-slot ${slot.exists ? '' : 'empty'}`;
      
      if (slot.exists && slot.metadata) {
        const date = new Date(slot.metadata.timestamp);
        const playTime = this.formatPlayTime(slot.metadata.playTime || 0);
        
        slotElement.innerHTML = `
          <div class="slot-info">
            <div class="slot-header">
              <span class="slot-number">Slot ${slot.slotNumber + 1}</span>
              <span class="slot-timestamp">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span>
            </div>
            <div class="slot-details">
              Play Time: ${playTime} • Location: ${slot.metadata.location || 'Unknown'}
            </div>
          </div>
          <div class="slot-actions">
            <button class="slot-btn load-btn" data-slot="${slot.slotNumber}">
              ${this.currentModalType === 'save' ? 'Overwrite' : 'Load'}
            </button>
            <button class="slot-btn delete" data-slot="${slot.slotNumber}">Delete</button>
          </div>
        `;
      } else {
        slotElement.innerHTML = `
          <div class="slot-info">
            <div class="slot-header">
              <span class="slot-number">Slot ${slot.slotNumber + 1}</span>
            </div>
            <div class="slot-details">Empty Slot</div>
          </div>
          <div class="slot-actions">
            <button class="slot-btn load-btn" data-slot="${slot.slotNumber}" ${this.currentModalType === 'load' ? 'disabled' : ''}>
              ${this.currentModalType === 'save' ? 'Save Here' : 'Empty'}
            </button>
          </div>
        `;
      }
      
      slotsContainer.appendChild(slotElement);
    });
    
    // Add event listeners to slot buttons
    this.setupSlotEventListeners();
  }
  setupSlotEventListeners() {
    const loadBtns = this.menuElement.querySelectorAll('.load-btn');
    const deleteBtns = this.menuElement.querySelectorAll('.delete');
    
    loadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotNumber = parseInt(btn.dataset.slot);
        
        if (this.currentModalType === 'save') {
          this.saveGame(slotNumber);
        } else {
          this.loadGame(slotNumber);
        }
      });
    });
    
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotNumber = parseInt(btn.dataset.slot);
        this.deleteSave(slotNumber);
      });
    });
  }
  async saveGame(slotNumber) {
    if (!this.gameInstance.isGameStarted) {
      alert('You must start a game before you can save!');
      return;
    }
    
    try {
      const success = this.gameInstance.saveGame(slotNumber);
      if (success) {
        console.log(`Game saved to slot ${slotNumber + 1}`);
        this.hideModal();
        this.updateMenuState();
        
        // Show success message
        this.showMessage(`Game saved to Slot ${slotNumber + 1}!`, 'success');
      } else {
        throw new Error('Save operation failed');
      }
    } catch (error) {
      console.error('Failed to save game:', error);
      this.showMessage('Failed to save game. Please try again.', 'error');
    }
  }
  async loadGame(slotNumber) {
    try {
      const success = await this.gameInstance.loadGame(slotNumber);
      if (success) {
        console.log(`Game loaded from slot ${slotNumber + 1}`);
        this.hideModal();
        this.updateMenuState();
        
        // Show success message
        this.showMessage(`Game loaded from Slot ${slotNumber + 1}!`, 'success');
      } else {
        throw new Error('Load operation failed');
      }
    } catch (error) {
      console.error('Failed to load game:', error);
      this.showMessage('Failed to load game. The save file may be corrupted.', 'error');
    }
  }
  deleteSave(slotNumber) {
    if (confirm(`Are you sure you want to delete Slot ${slotNumber + 1}? This action cannot be undone.`)) {
      try {
        const success = this.gameInstance.deleteSave(slotNumber);
        if (success) {
          console.log(`Save slot ${slotNumber + 1} deleted`);
          this.populateSaveSlots(); // Refresh the slots display
          this.updateMenuState();
          
          this.showMessage(`Slot ${slotNumber + 1} deleted.`, 'info');
        } else {
          throw new Error('Delete operation failed');
        }
      } catch (error) {
        console.error('Failed to delete save:', error);
        this.showMessage('Failed to delete save file.', 'error');
      }
    }
  }
  formatPlayTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }
  showMessage(text, type = 'info') {
    // Create temporary message element
    const message = document.createElement('div');
    message.className = `menu-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      border-radius: 10px;
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      z-index: 10002;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      message.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }

  show() {
    if (this.menuElement) {
      this.menuElement.style.display = 'flex';
      this.isVisible = true;
      this.startBackgroundAnimation();
      this.updateMenuState(); // Update button visibility when showing menu
    }
  }

  hide() {
    if (this.menuElement) {
      this.menuElement.style.display = 'none';
      this.isVisible = false;
      
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.backgroundRenderer) {
      this.backgroundRenderer.dispose();
    }
    
    if (this.menuElement) {
      this.menuElement.remove();
    }
  }
}