import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CompanionAnimator } from '../../src/companion/CompanionAnimator.js';

// Characterization tests for the animation behavior lifted out of DogCompanion
// (Fase 1). They pin the bits that are easy to break silently when moving code:
// the clip-name fallbacks and the default-clip order. AnimationMixer is pure JS
// (no WebGL), so we drive it headlessly with empty-track clips.

function makeAnimator(names: string[]): CompanionAnimator {
  const root = new THREE.Object3D();
  const clips = names.map((n) => new THREE.AnimationClip(n, 1, []));
  return new CompanionAnimator(root, clips);
}

/** Run an animator action against a fresh set of clips, return the resulting active clip. */
function resolves(names: string[], action: (a: CompanionAnimator) => void): string | null {
  const a = makeAnimator(names);
  action(a);
  return a.activeName;
}

describe('CompanionAnimator', () => {
  it('plays a known clip and reports it active; unknown clips return false', () => {
    const a = makeAnimator(['walk', 'idle']);
    expect(a.play('walk')).toBe(true);
    expect(a.activeName).toBe('walk');
    expect(a.play('nope')).toBe(false);
    expect(a.activeName).toBe('walk'); // unchanged on a miss
  });

  it('does not re-trigger when the requested clip is already active', () => {
    const a = makeAnimator(['idle']);
    expect(a.play('idle')).toBe(true);
    expect(a.play('idle')).toBe(true); // still true, but a no-op switch
    expect(a.activeName).toBe('idle');
  });

  it('playIdle falls back from lowercase idle to capitalized Idle', () => {
    expect(resolves(['idle'], (a) => a.playIdle())).toBe('idle');
    expect(resolves(['Idle'], (a) => a.playIdle())).toBe('Idle');
  });

  it('playWalk tries walk, then Walk, then run', () => {
    expect(resolves(['walk'], (a) => a.playWalk())).toBe('walk');
    expect(resolves(['Walk'], (a) => a.playWalk())).toBe('Walk');
    expect(resolves(['run'], (a) => a.playWalk())).toBe('run');
  });

  it('playBark tries bark, then Bark', () => {
    expect(resolves(['bark'], (a) => a.playBark())).toBe('bark');
    expect(resolves(['Bark'], (a) => a.playBark())).toBe('Bark');
  });

  it('playDefault prefers idle > Idle > T-Pose > first available', () => {
    expect(resolves(['walk', 'idle', 'Idle'], (a) => a.playDefault())).toBe('idle');
    expect(resolves(['walk', 'Idle'], (a) => a.playDefault())).toBe('Idle');
    expect(resolves(['walk', 'T-Pose'], (a) => a.playDefault())).toBe('T-Pose');
    expect(resolves(['somethingElse', 'another'], (a) => a.playDefault())).toBe('somethingElse');
  });

  it('is inert with no clips: play() is false and update()/stop() do not throw', () => {
    const a = makeAnimator([]);
    expect(a.play('idle')).toBe(false);
    expect(a.playIdle()).toBe(false);
    expect(a.activeName).toBeNull();
    expect(() => a.update(0.016)).not.toThrow();
    expect(() => a.stop()).not.toThrow();
  });
});
