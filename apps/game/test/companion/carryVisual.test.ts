import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { CarryVisual } from '../../src/companion/fetch/CarryVisual.js';

// Characterization tests for the mouth-carry visuals lifted from DogCompanion
// (Fase 4). The container builds real Three geometry, which is fine headlessly
// (no renderer needed); we pin the bookkeeping (count, ignore empty id, full vs
// single removal, disposal) rather than pixels.

function host(): THREE.Object3D {
  return new THREE.Object3D();
}

describe('CarryVisual', () => {
  it('attaches its container to the host on construction', () => {
    const h = host();
    new CarryVisual(h);
    expect(h.children.length).toBe(1);
    expect(h.children[0]).toBeInstanceOf(THREE.Group);
  });

  it('adds an item per known kind and tracks the count', () => {
    const carry = new CarryVisual(host());
    carry.add('wood');
    carry.add('apple');
    carry.add('stone');
    carry.add('mystery'); // default cube branch
    expect(carry.count).toBe(4);
  });

  it('ignores an empty item id', () => {
    const carry = new CarryVisual(host());
    carry.add('');
    expect(carry.count).toBe(0);
  });

  it('clear() removes and disposes every item', () => {
    const h = host();
    const carry = new CarryVisual(h);
    carry.add('wood');
    carry.add('wood');
    const group = h.children[0] as THREE.Group;
    const meshes = [...group.children] as THREE.Mesh[];
    const disposed = meshes.map((m) => spyDispose(m));

    carry.clear();

    expect(carry.count).toBe(0);
    expect(group.children.length).toBe(0);
    expect(disposed.every((d) => d())).toBe(true);
  });

  it('removeLatest() drops only the last item, leaving the rest', () => {
    const h = host();
    const carry = new CarryVisual(h);
    carry.add('wood');
    carry.add('apple');
    const group = h.children[0] as THREE.Group;
    const last = group.children[1] as THREE.Mesh;
    const wasDisposed = spyDispose(last);

    carry.removeLatest();

    expect(carry.count).toBe(1);
    expect(group.children.length).toBe(1);
    expect(wasDisposed()).toBe(true);
  });
});

/** Wrap geometry/material dispose so we can assert it ran, returning a checker. */
function spyDispose(mesh: THREE.Mesh): () => boolean {
  let geo = false;
  let mat = false;
  const g = mesh.geometry;
  const m = mesh.material as THREE.Material;
  const og = g.dispose.bind(g);
  const om = m.dispose.bind(m);
  g.dispose = () => { geo = true; og(); };
  m.dispose = () => { mat = true; om(); };
  return () => geo && mat;
}
