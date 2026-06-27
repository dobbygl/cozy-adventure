// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { InputSchemeManager } from '../../src/input/scheme.js';

function dispatchPointerDown(pointerType: string): void {
  const e = new Event('pointerdown');
  (e as unknown as { pointerType: string }).pointerType = pointerType;
  window.dispatchEvent(e);
}

let mgr: InputSchemeManager | null = null;
afterEach(() => {
  mgr?.destroy();
  mgr = null;
});

describe('InputSchemeManager', () => {
  it('defaults to desktop when the device is not coarse-pointer', () => {
    // jsdom has no matchMedia → the guarded base detection yields desktop.
    mgr = new InputSchemeManager();
    expect(mgr.getScheme()).toBe('desktop');
    expect(mgr.isTouch()).toBe(false);
  });

  it('switches to touch on a touch pointer and back to desktop on a key', () => {
    mgr = new InputSchemeManager();
    const seen: string[] = [];
    mgr.onChange((s) => seen.push(s));

    dispatchPointerDown('touch');
    expect(mgr.getScheme()).toBe('touch');

    window.dispatchEvent(new Event('keydown'));
    expect(mgr.getScheme()).toBe('desktop');

    expect(seen).toEqual(['touch', 'desktop']); // only transitions notified
  });

  it('does not flip to desktop on a synthesised mouse move (no mousemove trigger)', () => {
    mgr = new InputSchemeManager();
    dispatchPointerDown('touch');
    window.dispatchEvent(new Event('mousemove'));
    expect(mgr.getScheme()).toBe('touch');
  });
});
