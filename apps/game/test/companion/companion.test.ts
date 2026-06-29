// @vitest-environment jsdom
// jsdom so the base's getGame() can read `window` (returns undefined gameInstance
// here, which sends physics down its no-collider fallback path).
import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { Companion } from '../../src/companion/Companion.js';
import { DOG_DEFINITION } from '../../src/companion/CompanionDefinition.js';

// Tests for the shared Companion shell (Fase 6): the model-load fallback and the
// per-frame preamble -> updateBehavior delegation + teardown hooks. The brain
// itself stays in DogCompanion; here we only pin the base contract a second
// companion would rely on.

class TestCompanion extends Companion {
  behaviorCalls: Array<{ dt: number; items: unknown[] }> = [];
  loadedCount = 0;
  destroyedCount = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected override updateBehavior(dt: number, items: any[]): void {
    this.behaviorCalls.push({ dt, items });
  }
  protected override onLoaded(): void {
    this.loadedCount++;
  }
  protected override onDestroy(): void {
    this.destroyedCount++;
  }
}

function makeCompanion(): TestCompanion {
  const player = { mesh: new THREE.Object3D() };
  return new TestCompanion(new THREE.Scene(), player, DOG_DEFINITION);
}

describe('Companion (shared shell)', () => {
  it('falls back to a box mesh and still fires onLoaded when the model fails to load', async () => {
    const c = makeCompanion();
    // Force the GLTF load to fail so we exercise the fallback branch deterministically.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c as any).loader = { loadAsync: () => Promise.reject(new Error('no asset in test')) };

    const mesh = await c.load();

    expect(mesh).toBeInstanceOf(THREE.Mesh);
    expect(c.loadedCount).toBe(1);
    expect(c.scene.children).toContain(mesh);
    // Inert animator: safe to drive with no clips.
    expect(() => c.animator.update(0.016)).not.toThrow();
  });

  it('update() is a no-op until both mesh and player mesh exist', () => {
    const c = makeCompanion();
    c.update(0.016); // mesh not loaded yet
    expect(c.behaviorCalls).toHaveLength(0);
  });

  it('update() runs the animation+physics preamble then the behavior hook', async () => {
    const c = makeCompanion();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c as any).loader = { loadAsync: () => Promise.reject(new Error('no asset in test')) };
    await c.load();

    const animSpy = vi.spyOn(c.animator, 'update');
    const physSpy = vi.spyOn(c.physics, 'update');

    c.update(0.05, [{ id: 'x' }]);

    expect(animSpy).toHaveBeenCalledWith(0.05);
    expect(physSpy).toHaveBeenCalledOnce();
    expect(c.behaviorCalls).toEqual([{ dt: 0.05, items: [{ id: 'x' }] }]);
  });

  it('destroy() fires onDestroy, removes the mesh, and stops the animator', async () => {
    const c = makeCompanion();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c as any).loader = { loadAsync: () => Promise.reject(new Error('no asset in test')) };
    const mesh = await c.load();
    const stopSpy = vi.spyOn(c.animator, 'stop');

    c.destroy();

    expect(c.destroyedCount).toBe(1);
    expect(c.scene.children).not.toContain(mesh);
    expect(stopSpy).toHaveBeenCalledOnce();
  });
});
