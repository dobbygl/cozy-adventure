export class InGameUI {
  constructor(gameInstance) {
    this.gameInstance = gameInstance;
    this.saveButton = null;
    this.saveNotification = null;
    this.isVisible = false;
    
    this.createInGameUI();
  }

  createInGameUI() {
    // Create save button
    this.saveButton = document.createElement('button');
    this.saveButton.id = 'in-game-save-btn';
    this.saveButton.className = 'in-game-save-button';
    this.saveButton.innerHTML = `
      <span class="save-icon">💾</span>
      <span class="save-text">Quick Save</span>
    `;
    
    // Add styles
    this.createStyles();
    
    // Add event listeners
    this.setupEventListeners();
    
    // Add to DOM
    document.body.appendChild(this.saveButton);
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .in-game-save-button {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.95), rgba(222, 184, 135, 0.9));
        border: 2px solid #CD853F;
        border-radius: 12px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
        backdrop-filter: blur(8px);
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
      }
      
      .in-game-save-button.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      
      .in-game-save-button:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 6px 18px rgba(139, 69, 19, 0.4);
      }
      
      .in-game-save-button:active {
        transform: translateY(0) scale(0.98);
      }
      
      .in-game-save-button.saving {
        background: linear-gradient(145deg, #98FB98, #90EE90);
        border-color: #32CD32;
        color: #2E8B57;
        animation: savePulse 0.6s ease;
      }
      
      @keyframes savePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .save-icon {
        font-size: 1.1rem;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
      }
      
      .save-text {
        font-weight: 700;
        letter-spacing: 0.3px;
      }
      
      .save-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1001;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(8px);
      }
      
      .save-notification.show {
        opacity: 1;
        transform: translateX(0);
      }
      
      .save-notification.success {
        background: rgba(76, 175, 80, 0.95);
        color: white;
        border: 2px solid #4CAF50;
      }
      
      .save-notification.error {
        background: rgba(244, 67, 54, 0.95);
        color: white;
        border: 2px solid #f44336;
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .in-game-save-button {
          top: 15px;
          right: 15px;
          padding: 10px 14px;
          font-size: 0.85rem;
          gap: 6px;
        }
        
        .save-icon {
          font-size: 1rem;
        }
        
        .save-notification {
          top: 70px;
          right: 15px;
          font-size: 0.85rem;
          padding: 10px 14px;
        }
      }
      
      @media (max-width: 480px) {
        .in-game-save-button {
          top: 10px;
          right: 10px;
          padding: 8px 12px;
          font-size: 0.8rem;
        }
        
        .save-text {
          display: none;
        }
        
        .save-notification {
          top: 60px;
          right: 10px;
          font-size: 0.8rem;
          padding: 8px 12px;
          max-width: calc(100vw - 20px);
          word-wrap: break-word;
        }
      }
      
      /* Animation for button appearance */
      @keyframes slideInFromTop {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .in-game-save-button.appearing {
        animation: slideInFromTop 0.4s ease;
      }
    `;
    
    document.head.appendChild(style);
  }

  setupEventListeners() {
    this.saveButton.addEventListener('click', async () => {
      await this.showQuickSaveModal();
    });

    // Also allow saving with Ctrl+S
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.performQuickSave();
      }
    });
  }
  async showQuickSaveModal() {
    if (!this.gameInstance.isGameStarted) {
      this.showNotification('Cannot save - game not started!', 'error');
      return;
    }
    // Create quick save modal
    const modal = document.createElement('div');
    modal.className = 'quick-save-modal';
    modal.innerHTML = `
      <div class="quick-save-content">
        <div class="quick-save-header">
          <h3>Quick Save</h3>
          <button class="quick-save-close">&times;</button>
        </div>
        <div class="quick-save-body">
          <p>Choose a save slot:</p>
          <div class="quick-save-slots" id="quick-save-slots">
            <!-- Slots will be populated here -->
          </div>
        </div>
      </div>
    `;
    // Add modal styles
    const modalStyles = `
      .quick-save-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease;
      }
      
      .quick-save-content {
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 3px solid #8B4513;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(139, 69, 19, 0.6);
      }
      
      .quick-save-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 2px solid rgba(139, 69, 19, 0.3);
      }
      
      .quick-save-header h3 {
        margin: 0;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
      }
      
      .quick-save-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #8B4513;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
      
      .quick-save-close:hover {
        background-color: rgba(139, 69, 19, 0.1);
      }
      
      .quick-save-body {
        padding: 20px;
      }
      
      .quick-save-body p {
        margin: 0 0 15px 0;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
      }
      
      .quick-save-slots {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .quick-save-slot-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 15px;
        background: linear-gradient(145deg, #F5DEB3, #DEB887);
        border: 2px solid #CD853F;
        border-radius: 10px;
        color: #8B4513;
        font-family: 'Nunito', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .quick-save-slot-btn:hover {
        background: linear-gradient(145deg, #FFFACD, #F0E68C);
        border-color: #DAA520;
        transform: translateY(-1px);
      }
      
      .quick-save-slot-btn.empty {
        opacity: 0.7;
        font-style: italic;
      }
      
      .slot-info {
        text-align: left;
      }
      
      .slot-name {
        font-weight: 700;
        margin-bottom: 2px;
      }
      
      .slot-details {
        font-size: 0.8rem;
        opacity: 0.8;
      }
      
      @media (max-width: 480px) {
        .quick-save-content {
          width: 95%;
          margin: 20px;
        }
        
        .quick-save-header {
          padding: 12px 15px;
        }
        
        .quick-save-body {
          padding: 15px;
        }
        
        .quick-save-slot-btn {
          padding: 10px 12px;
        }
      }
    `;
    // Add styles to head if not already present
    if (!document.querySelector('#quick-save-modal-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'quick-save-modal-styles';
      styleSheet.textContent = modalStyles;
      document.head.appendChild(styleSheet);
    }
    // Populate save slots - only show the single slot (slot 0)
    const saveSlots = this.gameInstance.getSaveSlots();
    const slotsContainer = modal.querySelector('#quick-save-slots');
    
    // Only process the first (and only) save slot
    const slot = saveSlots[0];
    if (slot) {
      const slotBtn = document.createElement('button');
      slotBtn.className = `quick-save-slot-btn ${slot.exists ? '' : 'empty'}`;
      
      if (slot.exists && slot.metadata) {
        const date = new Date(slot.metadata.timestamp);
        slotBtn.innerHTML = `
          <div class="slot-info">
            <div class="slot-name">Save Game</div>
            <div class="slot-details">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div>
          </div>
          <span>Overwrite</span>
        `;
      } else {
        slotBtn.innerHTML = `
          <div class="slot-info">
            <div class="slot-name">Save Game</div>
            <div class="slot-details">No save file</div>
          </div>
          <span>Save</span>
        `;
      }
      
      slotBtn.addEventListener('click', async () => {
        modal.remove();
        await this.performQuickSave(slot.slotNumber);
      });
      
      slotsContainer.appendChild(slotBtn);
    }
    // Add event listeners
    const closeBtn = modal.querySelector('.quick-save-close');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    document.body.appendChild(modal);
  }

  async performQuickSave(slotNumber = 0) {
    if (!this.gameInstance.isGameStarted) {
      this.showNotification('Cannot save - game not started!', 'error');
      return;
    }

    // Add saving state
    this.saveButton.classList.add('saving');
    this.saveButton.innerHTML = `
      <span class="save-icon">⏳</span>
      <span class="save-text">Saving...</span>
    `;

    try {
      // Use specified slot for quick save
      const success = await this.gameInstance.saveGame(slotNumber);
      
      if (success) {
        this.showNotification(`Game saved to Slot ${slotNumber + 1}!`, 'success');
        
        // Update button to show success
        this.saveButton.innerHTML = `
          <span class="save-icon">✅</span>
          <span class="save-text">Saved!</span>
        `;
        
        // Reset button after a short delay
        setTimeout(() => {
          this.saveButton.classList.remove('saving');
          this.saveButton.innerHTML = `
            <span class="save-icon">💾</span>
            <span class="save-text">Quick Save</span>
          `;
        }, 1500);
      } else {
        throw new Error('Save operation failed');
      }
    } catch (error) {
      console.error('Quick save failed:', error);
      this.showNotification('Save failed! Please try again.', 'error');
      
      // Reset button on error
      this.saveButton.classList.remove('saving');
      this.saveButton.innerHTML = `
        <span class="save-icon">💾</span>
        <span class="save-text">Quick Save</span>
      `;
    }
  }

  showNotification(message, type = 'success') {
    // Remove existing notification if present
    if (this.saveNotification) {
      this.saveNotification.remove();
    }

    // Create new notification
    this.saveNotification = document.createElement('div');
    this.saveNotification.className = `save-notification ${type}`;
    this.saveNotification.textContent = message;
    
    document.body.appendChild(this.saveNotification);
    
    // Show notification
    setTimeout(() => {
      this.saveNotification.classList.add('show');
    }, 50);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
      if (this.saveNotification) {
        this.saveNotification.classList.remove('show');
        setTimeout(() => {
          if (this.saveNotification) {
            this.saveNotification.remove();
            this.saveNotification = null;
          }
        }, 300);
      }
    }, 3000);
  }

  show() {
    if (!this.isVisible) {
      this.isVisible = true;
      this.saveButton.classList.add('visible', 'appearing');
      
      // Remove appearing class after animation
      setTimeout(() => {
        this.saveButton.classList.remove('appearing');
      }, 400);
    }
  }

  hide() {
    if (this.isVisible) {
      this.isVisible = false;
      this.saveButton.classList.remove('visible');
    }
  }

  destroy() {
    if (this.saveButton) {
      this.saveButton.remove();
    }
    if (this.saveNotification) {
      this.saveNotification.remove();
    }
  }
}