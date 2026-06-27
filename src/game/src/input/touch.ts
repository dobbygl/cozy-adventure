import * as THREE from 'three';

/** The slice of the character controller the touch layer drives. */
export interface TouchInputTarget {
  /** Analog move vector: x = right, y = forward, magnitude 0..1. */
  moveAxis: THREE.Vector2;
  cameraAngleH: number;
  cameraAngleV: number;
  isRunning: boolean;
}

/** Visual state of the floating joystick, consumed by the overlay. */
export interface JoystickState {
  originX: number;
  originY: number;
  knobX: number;
  knobY: number;
}

const JOYSTICK_RADIUS = 60; // px from origin to full deflection
const JOYSTICK_DEADZONE = 0.15; // fraction of radius ignored near the centre
const LOOK_SENSITIVITY = 0.004; // rad per px dragged
const VERTICAL_CLAMP = Math.PI / 3; // matches the controller's mouse clamp
const DRAG_THRESHOLD = 10; // px a look-zone touch must move before it counts as a camera drag

/**
 * Map a finger displacement (dx, dy in px from the joystick origin) to an analog
 * move vector: x = right, y = forward (screen-up is forward, so y inverts the
 * downward-positive screen axis). Magnitude is clamped to 1 and zeroed inside
 * the deadzone. Pure function — unit tested without the DOM.
 */
export function computeMoveAxis(
  dx: number,
  dy: number,
  radius = JOYSTICK_RADIUS,
  deadzone = JOYSTICK_DEADZONE
): { x: number; y: number } {
  const len = Math.hypot(dx, dy);
  if (len < radius * deadzone) return { x: 0, y: 0 };
  const magnitude = Math.min(len / radius, 1);
  const nx = dx / len;
  const ny = dy / len;
  return { x: nx * magnitude, y: -ny * magnitude };
}

/** Which control role a touch starting at clientX takes: left half moves, right half looks. */
export function zoneForX(clientX: number, width: number): 'move' | 'look' {
  return clientX < width / 2 ? 'move' : 'look';
}

/**
 * Whether a look-zone touch has moved far enough from its origin to count as a
 * camera drag. Below the threshold it stays a tap, which falls through to the
 * native click → chop/use path (FR-017). Pure function — unit tested.
 */
export function exceedsDragThreshold(dx: number, dy: number, threshold = DRAG_THRESHOLD): boolean {
  return Math.hypot(dx, dy) >= threshold;
}

interface TrackedPointer {
  role: 'move' | 'look';
  originX: number;
  originY: number;
  lastX: number;
  lastY: number;
  dragging: boolean; // look-zone: has it passed the drag threshold yet?
}

/**
 * Thin Pointer-Events adapter that feeds the live ThirdPersonCharacterController.
 * A `pointerId` started in the left half drives the analog joystick (moveAxis);
 * one started in the right half drags the camera. Multiple fingers are tracked
 * by id and keep their role until lifted, so the player can move and look at
 * once (the old single-touch camera handler is removed from the controller).
 */
export class TouchInput {
  private readonly element: HTMLElement;
  private readonly target: TouchInputTarget;
  private readonly onJoystick?: (state: JoystickState | null) => void;
  private readonly pointers = new Map<number, TrackedPointer>();
  private moveId: number | null = null;

  private readonly onDown: (e: PointerEvent) => void;
  private readonly onMove: (e: PointerEvent) => void;
  private readonly onUp: (e: PointerEvent) => void;

  constructor(
    element: HTMLElement,
    target: TouchInputTarget,
    opts: { onJoystick?: (state: JoystickState | null) => void } = {}
  ) {
    this.element = element;
    this.target = target;
    this.onJoystick = opts.onJoystick;
    // Stop the browser from scrolling/zooming the (host) page over the canvas.
    this.element.style.touchAction = 'none';

    this.onDown = (e) => this.handleDown(e);
    this.onMove = (e) => this.handleMove(e);
    this.onUp = (e) => this.handleUp(e);

    this.element.addEventListener('pointerdown', this.onDown);
    this.element.addEventListener('pointermove', this.onMove);
    this.element.addEventListener('pointerup', this.onUp);
    this.element.addEventListener('pointercancel', this.onUp);
  }

  private handleDown(e: PointerEvent): void {
    if (e.pointerType !== 'touch') return; // mouse/pen handled by the desktop path
    const role = zoneForX(e.clientX, this.element.clientWidth || window.innerWidth);
    this.pointers.set(e.pointerId, {
      role,
      originX: e.clientX,
      originY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      dragging: false,
    });
    try {
      this.element.setPointerCapture(e.pointerId);
    } catch {
      /* setPointerCapture can throw if the pointer is already gone */
    }
    // Only the joystick swallows the gesture. Look-zone touches are left alone so
    // a tap still produces the native click that drives chop/use (FR-017).
    if (role === 'move') e.preventDefault();

    if (role === 'move' && this.moveId === null) {
      this.moveId = e.pointerId;
      this.emitJoystick(e.clientX, e.clientY, e.clientX, e.clientY);
    }
  }

  private handleMove(e: PointerEvent): void {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;

    if (p.role === 'move') {
      e.preventDefault();
      const axis = computeMoveAxis(e.clientX - p.originX, e.clientY - p.originY);
      this.target.moveAxis.set(axis.x, axis.y);
      this.emitJoystick(p.originX, p.originY, e.clientX, e.clientY);
    } else {
      // Look zone: only start rotating once the touch passes the drag threshold,
      // so a tap stays a tap (chop/use) instead of nudging the camera.
      if (!p.dragging && exceedsDragThreshold(e.clientX - p.originX, e.clientY - p.originY)) {
        p.dragging = true;
      }
      if (p.dragging) {
        e.preventDefault();
        const dx = e.clientX - p.lastX;
        const dy = e.clientY - p.lastY;
        this.target.cameraAngleH -= dx * LOOK_SENSITIVITY;
        this.target.cameraAngleV = Math.max(
          -VERTICAL_CLAMP,
          Math.min(VERTICAL_CLAMP, this.target.cameraAngleV + dy * LOOK_SENSITIVITY)
        );
      }
    }
    p.lastX = e.clientX;
    p.lastY = e.clientY;
  }

  private handleUp(e: PointerEvent): void {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    this.pointers.delete(e.pointerId);
    if (e.pointerId === this.moveId) {
      this.moveId = null;
      this.target.moveAxis.set(0, 0); // FR-014: neutral on release/cancel
      this.emitJoystick(null);
    }
  }

  private emitJoystick(
    originX: number | null,
    originY?: number,
    knobX?: number,
    knobY?: number
  ): void {
    if (!this.onJoystick) return;
    if (originX === null) {
      this.onJoystick(null);
    } else {
      this.onJoystick({ originX, originY: originY!, knobX: knobX!, knobY: knobY! });
    }
  }

  destroy(): void {
    this.element.removeEventListener('pointerdown', this.onDown);
    this.element.removeEventListener('pointermove', this.onMove);
    this.element.removeEventListener('pointerup', this.onUp);
    this.element.removeEventListener('pointercancel', this.onUp);
    this.pointers.clear();
    this.target.moveAxis.set(0, 0);
  }
}
