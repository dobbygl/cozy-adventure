import type { JoystickState } from './touch.js';

/**
 * DOM overlay for touch play. Injects its own <style> and appends to the body,
 * matching the rest of the game UI. Hidden on desktop. For the P1 slice it shows
 * the floating joystick that follows the active move finger; the camera half has
 * no visual (the whole right side is the look zone). Pickup/hotbar/build controls
 * (P2/P3) attach to this same overlay later.
 */
export class TouchControls {
  private readonly root: HTMLDivElement;
  private readonly joystickBase: HTMLDivElement;
  private readonly joystickKnob: HTMLDivElement;
  private readonly pickupButton: HTMLButtonElement;
  private readonly onPickup?: () => void;
  private readonly buildToggle: HTMLButtonElement;
  private readonly buildPanel: HTMLDivElement;
  private buildHandlers: {
    onToggle?: () => void;
    onRotate?: () => void;
    onToggleTool?: () => void;
    onCenter?: () => void;
  } = {};
  private styleEl: HTMLStyleElement | null = null;
  private visible = false;

  constructor(
    opts: { onPickup?: () => void; onJump?: () => void; onBackpack?: () => void } = {}
  ) {
    this.onPickup = opts.onPickup;
    this.injectStyle();

    this.root = document.createElement('div');
    this.root.id = 'touch-controls';
    this.root.className = 'touch-controls';

    this.joystickBase = document.createElement('div');
    this.joystickBase.className = 'touch-joystick-base';
    this.joystickKnob = document.createElement('div');
    this.joystickKnob.className = 'touch-joystick-knob';
    this.joystickBase.appendChild(this.joystickKnob);
    this.root.appendChild(this.joystickBase);

    // Contextual pickup button (shown when something is pickupable nearby).
    this.pickupButton = document.createElement('button');
    this.pickupButton.className = 'touch-pickup-btn';
    this.pickupButton.type = 'button';
    this.pickupButton.textContent = 'Recoger';
    this.pickupButton.style.display = 'none';
    this.pickupButton.addEventListener('click', (e) => {
      // Don't let the tap fall through to the world chop/use click handler.
      e.stopPropagation();
      this.onPickup?.();
    });
    this.root.appendChild(this.pickupButton);

    // Build controls: a persistent toggle (enter/exit) plus an action row shown
    // only while building. Placement itself is a world tap (camera-aimed preview),
    // so no place button is needed here. (FR-012, FR-018)
    this.buildToggle = this.makeButton('touch-build-toggle', '🔨', () =>
      this.buildHandlers.onToggle?.()
    );
    this.root.appendChild(this.buildToggle);

    this.buildPanel = document.createElement('div');
    this.buildPanel.className = 'touch-build-panel';
    this.buildPanel.style.display = 'none';
    this.buildPanel.appendChild(
      this.makeButton('touch-build-action', 'Rotar', () => this.buildHandlers.onRotate?.())
    );
    this.buildPanel.appendChild(
      this.makeButton('touch-build-action', 'Modo', () => this.buildHandlers.onToggleTool?.())
    );
    this.buildPanel.appendChild(
      this.makeButton('touch-build-action', 'Centrar', () => this.buildHandlers.onCenter?.())
    );
    this.buildPanel.appendChild(
      this.makeButton('touch-build-action touch-build-close', 'Cerrar', () =>
        this.buildHandlers.onToggle?.()
      )
    );
    this.root.appendChild(this.buildPanel);

    // Always-available action buttons so nothing is keyboard-only on touch:
    // jump (Space) and open backpack (B/Tab).
    this.root.appendChild(this.makeButton('touch-jump-btn', '⤴', () => opts.onJump?.()));
    this.root.appendChild(this.makeButton('touch-backpack-btn', '🎒', () => opts.onBackpack?.()));

    document.body.appendChild(this.root);
    this.setVisible(false);
  }

  private makeButton(className: string, label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = className;
    btn.textContent = label;
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // keep the tap off the world build/chop click handler
      onClick();
    });
    return btn;
  }

  /** Show/hide the contextual pickup button (FR-009). */
  setPickupVisible(visible: boolean): void {
    this.pickupButton.style.display = visible ? 'block' : 'none';
  }

  /** Wire the build buttons to the BuildingSystem (set once it exists). */
  setBuildHandlers(handlers: {
    onToggle?: () => void;
    onRotate?: () => void;
    onToggleTool?: () => void;
    onCenter?: () => void;
  }): void {
    this.buildHandlers = handlers;
  }

  /** Show the build action row while in building mode (FR-012). */
  setBuildPanelVisible(visible: boolean): void {
    this.buildPanel.style.display = visible ? 'flex' : 'none';
  }

  /** Position the floating joystick; pass null to hide it (finger lifted). */
  setJoystick(state: JoystickState | null): void {
    if (!state) {
      this.joystickBase.style.display = 'none';
      return;
    }
    this.joystickBase.style.display = 'block';
    this.joystickBase.style.left = `${state.originX}px`;
    this.joystickBase.style.top = `${state.originY}px`;
    this.joystickKnob.style.left = `${state.knobX - state.originX}px`;
    this.joystickKnob.style.top = `${state.knobY - state.originY}px`;
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.root.style.display = visible ? 'block' : 'none';
    if (!visible) this.setJoystick(null);
  }

  isVisible(): boolean {
    return this.visible;
  }

  private injectStyle(): void {
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = `
      .touch-controls {
        position: fixed;
        inset: 0;
        z-index: 50;
        pointer-events: none; /* the canvas under it owns the pointers; visuals only */
        touch-action: none;
      }
      .touch-joystick-base {
        position: absolute;
        width: 120px;
        height: 120px;
        margin: -60px 0 0 -60px; /* centre on (left, top) */
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        border: 2px solid rgba(255, 255, 255, 0.45);
        display: none;
      }
      .touch-joystick-knob {
        position: absolute;
        width: 56px;
        height: 56px;
        margin: -28px 0 0 -28px;
        left: 60px;
        top: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
      }
      .touch-pickup-btn {
        position: absolute;
        right: 24px;
        bottom: 140px; /* above the hotbar, clear of the camera/HUD */
        min-width: 96px;
        min-height: 48px; /* comfortable touch target (>= 44px) */
        padding: 0 18px;
        border-radius: 24px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font: 600 16px/1 system-ui, sans-serif;
        pointer-events: auto; /* interactive, unlike the rest of the overlay */
        touch-action: manipulation;
      }
      .touch-pickup-btn:active {
        background: rgba(0, 0, 0, 0.65);
      }
      .touch-build-toggle {
        position: absolute;
        right: 24px;
        top: 50%; /* right-edge centre: clear of Quick Save (top) and jump (bottom) */
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font-size: 24px;
        pointer-events: auto;
        touch-action: manipulation;
      }
      .touch-build-panel {
        position: absolute;
        bottom: 84px; /* horizontal row just above the hotbar, centred */
        left: 50%;
        transform: translateX(-50%);
        display: none;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        width: min(94vw, 440px);
      }
      .touch-build-action {
        min-width: 88px;
        min-height: 48px;
        border-radius: 12px;
        border: 2px solid rgba(255, 255, 255, 0.55);
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font: 600 15px/1 system-ui, sans-serif;
        pointer-events: auto;
        touch-action: manipulation;
      }
      .touch-build-action:active {
        background: rgba(0, 0, 0, 0.65);
      }
      .touch-build-close {
        background: rgba(139, 69, 19, 0.72);
        border-color: rgba(245, 222, 179, 0.75);
      }
      .touch-jump-btn {
        position: absolute;
        right: 24px;
        bottom: 24px;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font-size: 30px;
        pointer-events: auto;
        touch-action: manipulation;
      }
      .touch-backpack-btn {
        position: absolute;
        left: 24px;
        top: 24px;
        width: 56px;
        height: 56px;
        border-radius: 14px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        font-size: 24px;
        pointer-events: auto;
        touch-action: manipulation;
      }
      .touch-jump-btn:active,
      .touch-backpack-btn:active {
        background: rgba(0, 0, 0, 0.65);
      }
      /* Hide keyboard/mouse hints while playing on touch: the "Press E" prompt,
         the "Build Mode V" prompt, hotbar slot numbers, and any element tagged
         .kbd-hint (the R/X/V build key rows, the "Esc to close" footer). */
      body.input-touch #pickup-prompt,
      body.input-touch #build-mode-prompt,
      body.input-touch .slot-number,
      body.input-touch .kbd-hint {
        display: none !important;
      }
      @media (max-width: 820px) and (orientation: landscape) {
        .touch-build-panel {
          bottom: max(18px, env(safe-area-inset-bottom));
          left: 50%;
          width: min(58vw, 380px);
          gap: 8px;
        }
        .touch-build-action {
          min-width: 78px;
          min-height: 44px;
          font-size: 14px;
          border-radius: 10px;
        }
        .touch-jump-btn {
          width: 58px;
          height: 58px;
          bottom: max(14px, env(safe-area-inset-bottom));
        }
      }
    `;
    document.head.appendChild(this.styleEl);
  }

  destroy(): void {
    this.root.remove();
    this.styleEl?.remove();
    this.styleEl = null;
  }
}
