import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { Environment } from '../src/environment.js';
import { toNumericSeed } from '../src/shared/rng';

type TreePos = { x: number; z: number } | null;

// Place `count` tree instances on a fresh, seeded Environment and capture their
// positions. createTreeInstance only needs a clonable model and a scene to add to,
// so it runs headless (no GLTF load, no WebGL).
function layout(seed: string, count = 25): TreePos[] {
  const env = new Environment(new THREE.Scene(), null, seed);
  // addEnvironmentTrees() normally initializes this before placing trees.
  (env as any).treePositions = [];
  const model = new THREE.Object3D();
  const positions: TreePos[] = [];
  for (let i = 0; i < count; i++) {
    const data = (env as any).createTreeInstance(model, { scale: 6.5 }, 0, i);
    positions.push(data ? { x: data.position.x, z: data.position.z } : null);
  }
  return positions;
}

describe('Environment tree placement determinism', () => {
  it('produces an identical layout for the same seed', () => {
    expect(layout('seed-1')).toEqual(layout('seed-1'));
  });

  it('produces a different layout for a different seed', () => {
    expect(layout('seed-1')).not.toEqual(layout('seed-2'));
  });

  it('actually places trees (sanity check that the headless path works)', () => {
    const placed = layout('seed-1').filter((p) => p !== null);
    expect(placed.length).toBeGreaterThan(0);
  });
});

describe('Environment seed (persistence surface)', () => {
  it('stores a numeric seed when given a number', () => {
    expect(new Environment(new THREE.Scene(), null, 42).seed).toBe(42);
  });

  it('resolves a string seed to its numeric form (the value persisted in saves)', () => {
    const env = new Environment(new THREE.Scene(), null, 'world-1');
    expect(env.seed).toBe(toNumericSeed('world-1'));
  });
});
