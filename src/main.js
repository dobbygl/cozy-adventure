import { Game } from './game.js';
import { LoadingScreen } from './LoadingScreen.js';
let loadingScreen;
let game;
// Initialize the game when the page loads
async function initGame() {
  try {
    // Create and show loading screen
    loadingScreen = new LoadingScreen();
    loadingScreen.setProgress(0, 'Starting game initialization...');
    loadingScreen.setTip('Welcome to your cozy adventure!');
    
    // Hide any existing loading element
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
    // Small delay to show initial loading screen
    await new Promise(resolve => setTimeout(resolve, 300));
    // Create game instance
    loadingScreen.setProgress(10, 'Creating game instance...');
    loadingScreen.setTip('Setting up the game world...');
    game = new Game();
    
    // Pass loading screen to game for progress updates
    if (game.setLoadingScreen) {
      game.setLoadingScreen(loadingScreen);
    }
    // Initialize the game with progress tracking
    loadingScreen.setProgress(20, 'Initializing game components...');
    loadingScreen.setTip('Loading 3D models and textures...');
    await game.init();
    // Final loading steps
    loadingScreen.setProgress(90, 'Finalizing setup...');
    loadingScreen.setTip('Almost ready! Get ready to explore!');
    // Start the game loop
    function gameLoop() {
      if (game) {
        game.update();
        game.render();
      }
      requestAnimationFrame(gameLoop);
    }
    // Complete loading
    loadingScreen.setProgress(100, 'Ready to play!');
    loadingScreen.setTip('Your adventure awaits! Start exploring!');
    // Hide loading screen after a brief moment
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.hide();
        loadingScreen = null;
      }
    }, 1200);
    gameLoop();
    console.log('Game initialized successfully');
  } catch (error) {
    console.error('Failed to initialize game:', error);
    
    // Show error on loading screen
    if (loadingScreen) {
      loadingScreen.setStatus('Error occurred during initialization');
      loadingScreen.setTip('Something went wrong. Please refresh the page and try again.');
      
      // Add retry functionality
      setTimeout(() => {
        if (loadingScreen && loadingScreen.loadingElement) {
          const retryButton = document.createElement('button');
          retryButton.textContent = 'Retry';
          retryButton.style.cssText = `
            margin-top: 20px;
            padding: 10px 20px;
            background: linear-gradient(145deg, #32CD32, #228B22);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
            transition: all 0.2s ease;
          `;
          
          retryButton.addEventListener('click', () => {
            location.reload();
          });
          
          retryButton.addEventListener('mouseenter', () => {
            retryButton.style.background = 'linear-gradient(145deg, #228B22, #006400)';
            retryButton.style.transform = 'translateY(-1px)';
          });
          
          retryButton.addEventListener('mouseleave', () => {
            retryButton.style.background = 'linear-gradient(145deg, #32CD32, #228B22)';
            retryButton.style.transform = 'translateY(0)';
          });
          
          const loadingContent = loadingScreen.loadingElement.querySelector('.loading-content');
          if (loadingContent) {
            loadingContent.appendChild(retryButton);
          }
        }
      }, 1000);
    }
    
    // Fallback error display
    const loadingElement = document.getElementById('loading');
    if (loadingElement && !loadingScreen) {
      loadingElement.innerHTML = `
        <div style="color: #ff6b6b; text-align: center; padding: 20px;">
          <strong>Failed to load game</strong><br>
          ${error.message}<br>
          <small>Check console for details</small><br>
          <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Retry
          </button>
        </div>
      `;
    }
  }
}
// Handle page visibility changes to pause/resume game
document.addEventListener('visibilitychange', () => {
  if (game) {
    if (document.hidden) {
      // Pause game when tab is hidden
      game.pause && game.pause();
    } else {
      // Resume game when tab is visible
      game.resume && game.resume();
    }
  }
});
// Handle window resize
window.addEventListener('resize', () => {
  if (game && game.handleResize) {
    game.handleResize();
  }
});

// Start the game when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}