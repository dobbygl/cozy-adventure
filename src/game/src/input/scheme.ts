export type InputScheme = 'touch' | 'desktop';

/**
 * Tracks the active input scheme. Base detection is the `pointer: coarse` media
 * query; the active scheme then follows the LAST input source used — a touch
 * pointer switches to 'touch', a mouse pointer or a key switches to 'desktop'.
 * Consumers subscribe via {@link onChange} to show/hide the touch overlay.
 *
 * Note: `mousemove` is intentionally NOT a switch trigger, because touch input
 * synthesises mouse events on many browsers and would falsely flip to desktop.
 */
export class InputSchemeManager {
  private scheme: InputScheme;
  private listeners: Array<(scheme: InputScheme) => void> = [];
  private readonly onPointerDown: (e: PointerEvent) => void;
  private readonly onKeyDown: () => void;

  constructor() {
    const coarse =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;
    this.scheme = coarse ? 'touch' : 'desktop';

    this.onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') this.set('touch');
      else if (e.pointerType === 'mouse') this.set('desktop');
    };
    this.onKeyDown = () => this.set('desktop');

    if (typeof window !== 'undefined') {
      window.addEventListener('pointerdown', this.onPointerDown, { capture: true, passive: true });
      window.addEventListener('keydown', this.onKeyDown, { capture: true, passive: true });
    }
  }

  getScheme(): InputScheme {
    return this.scheme;
  }

  isTouch(): boolean {
    return this.scheme === 'touch';
  }

  /** Subscribe to scheme changes; the callback is invoked only on transitions. */
  onChange(callback: (scheme: InputScheme) => void): void {
    this.listeners.push(callback);
  }

  private set(scheme: InputScheme): void {
    if (scheme === this.scheme) return;
    this.scheme = scheme;
    for (const cb of this.listeners) cb(scheme);
  }

  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.onPointerDown, { capture: true });
      window.removeEventListener('keydown', this.onKeyDown, { capture: true });
    }
    this.listeners = [];
  }
}
