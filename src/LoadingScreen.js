export class LoadingScreen {
  constructor() {
    this.loadingElement = null;
    this.progressBar = null;
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.isVisible = false;
    
    this.createLoadingScreen();
  }

  createLoadingScreen() {
    this.loadingElement = document.createElement('div');
    this.loadingElement.className = 'loading-screen';
    this.loadingElement.id = 'loading-screen';
    
    this.loadingElement.innerHTML = `
      <div class="loading-background"></div>
      <div class="loading-content">
        <div class="loading-logo">
          <h1>Cozy Adventure</h1>
          <div class="loading-spinner">🏠</div>
        </div>
        
        <div class="loading-progress">
          <div class="progress-bar-container">
            <div class="progress-bar" id="progress-bar"></div>
          </div>
          <div class="progress-text">
            <span id="progress-percentage">0%</span>
            <span id="loading-status">Initializing...</span>
          </div>
        </div>
        
        <div class="loading-tips">
          <p id="loading-tip">Welcome to your cozy adventure!</p>
        </div>
      </div>
    `;
    
    this.progressBar = this.loadingElement.querySelector('#progress-bar');
    this.createStyles();
    
    document.body.appendChild(this.loadingElement);
    this.show();
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @import url('/assets/external/fonts.googleapis.com/css2__qs_family_Fredoka_One_wght_400_family_Nunito_wght_400_600_700_display_swap.css');
      
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 20000;
        font-family: 'Nunito', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      
      .loading-screen.hidden {
        opacity: 0;
        pointer-events: none;
      }
      
      .loading-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(139, 69, 19, 0.95) 0%,
          rgba(160, 82, 45, 0.9) 25%,
          rgba(210, 180, 140, 0.85) 50%,
          rgba(245, 222, 179, 0.9) 75%,
          rgba(139, 69, 19, 0.95) 100%
        );
        animation: backgroundPulse 4s ease-in-out infinite;
      }
      
      @keyframes backgroundPulse {
        0%, 100% { opacity: 0.95; }
        50% { opacity: 0.8; }
      }
      
      .loading-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 500px;
        width: 90%;
        padding: 40px;
        background: linear-gradient(145deg, rgba(245, 222, 179, 0.98), rgba(222, 184, 135, 0.95));
        border: 4px solid #8B4513;
        border-radius: 30px;
        box-shadow: 
          0 20px 60px rgba(139, 69, 19, 0.6),
          inset 0 4px 8px rgba(255, 255, 255, 0.3),
          inset 0 -4px 8px rgba(0, 0, 0, 0.1);
        animation: contentFloat 3s ease-in-out infinite;
      }
      
      @keyframes contentFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      .loading-logo h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 3rem;
        color: #8B4513;
        margin: 0 0 20px 0;
        text-shadow: 
          3px 3px 0px rgba(160, 82, 45, 0.8),
          6px 6px 20px rgba(139, 69, 19, 0.4);
        background: linear-gradient(45deg, #8B4513, #CD853F, #D2691E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .loading-spinner {
        font-size: 3rem;
        margin: 20px 0;
        animation: bounce 1.5s ease-in-out infinite;
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .loading-progress {
        margin: 30px 0;
      }
      
      .progress-bar-container {
        width: 100%;
        height: 12px;
        background: rgba(139, 69, 19, 0.3);
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid #8B4513;
        margin-bottom: 15px;
      }
      
      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #32CD32, #98FB98, #90EE90);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(50, 205, 50, 0.5);
        animation: progressGlow 2s ease-in-out infinite;
      }
      
      @keyframes progressGlow {
        0%, 100% { box-shadow: 0 0 10px rgba(50, 205, 50, 0.3); }
        50% { box-shadow: 0 0 20px rgba(50, 205, 50, 0.7); }
      }
      
      .progress-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        color: #8B4513;
        font-weight: 600;
      }
      
      #progress-percentage {
        font-size: 1.2rem;
        font-weight: 700;
      }
      
      #loading-status {
        font-style: italic;
        opacity: 0.8;
      }
      
      .loading-tips {
        margin-top: 25px;
        padding: 15px;
        background: rgba(139, 69, 19, 0.1);
        border-radius: 15px;
        border: 1px solid rgba(139, 69, 19, 0.2);
      }
      
      #loading-tip {
        font-size: 0.95rem;
        color: #8B4513;
        margin: 0;
        line-height: 1.4;
        opacity: 0.9;
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .loading-content {
          width: 95%;
          padding: 30px 20px;
        }
        
        .loading-logo h1 {
          font-size: 2.5rem;
        }
        
        .loading-spinner {
          font-size: 2.5rem;
        }
        
        .progress-text {
          font-size: 0.9rem;
        }
        
        #progress-percentage {
          font-size: 1.1rem;
        }
        
        #loading-tip {
          font-size: 0.9rem;
        }
      }
      
      @media (max-width: 480px) {
        .loading-content {
          padding: 25px 15px;
        }
        
        .loading-logo h1 {
          font-size: 2rem;
        }
        
        .loading-spinner {
          font-size: 2rem;
        }
        
        .progress-bar-container {
          height: 10px;
        }
        
        .progress-text {
          font-size: 0.85rem;
        }
        
        #loading-tip {
          font-size: 0.85rem;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  setProgress(progress, status = '') {
    this.targetProgress = Math.max(0, Math.min(100, progress));
    
    if (status) {
      this.setStatus(status);
    }
    
    this.animateProgress();
  }

  animateProgress() {
    const animate = () => {
      const diff = this.targetProgress - this.currentProgress;
      
      if (Math.abs(diff) > 0.1) {
        this.currentProgress += diff * 0.1;
        
        if (this.progressBar) {
          this.progressBar.style.width = `${this.currentProgress}%`;
        }
        
        const percentageElement = document.getElementById('progress-percentage');
        if (percentageElement) {
          percentageElement.textContent = `${Math.round(this.currentProgress)}%`;
        }
        
        requestAnimationFrame(animate);
      } else {
        this.currentProgress = this.targetProgress;
        
        if (this.progressBar) {
          this.progressBar.style.width = `${this.currentProgress}%`;
        }
        
        const percentageElement = document.getElementById('progress-percentage');
        if (percentageElement) {
          percentageElement.textContent = `${Math.round(this.currentProgress)}%`;
        }
      }
    };
    
    animate();
  }

  setStatus(status) {
    const statusElement = document.getElementById('loading-status');
    if (statusElement) {
      statusElement.textContent = status;
    }
  }

  setTip(tip) {
    const tipElement = document.getElementById('loading-tip');
    if (tipElement) {
      tipElement.textContent = tip;
    }
  }

  show() {
    if (this.loadingElement) {
      this.loadingElement.classList.remove('hidden');
      this.isVisible = true;
    }
  }

  hide() {
    if (this.loadingElement) {
      this.loadingElement.classList.add('hidden');
      this.isVisible = false;
      
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.loadingElement && this.loadingElement.parentNode) {
          this.loadingElement.remove();
        }
      }, 500);
    }
  }

  destroy() {
    if (this.loadingElement && this.loadingElement.parentNode) {
      this.loadingElement.remove();
    }
  }
}