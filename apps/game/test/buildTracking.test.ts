import { describe, it, expect, beforeEach } from 'vitest';
import type * as THREE from 'three';
import { BuildTracking } from '../src/BuildTracking';
import type { LevelManager } from '../src/LevelManager';
import type { BuildableObjectsRegistry } from '../src/BuildableObjectsRegistry';

// BuildTracking is the single write path for building bookkeeping (Fase 4 of the
// decomposition). It coordinates three owners, so these tests pin the coordination — and
// crucially the multi-level rule (occupancy lands on the CURRENT level), which is the
// behaviour a unified write path could silently flip. Fakes stand in for the real
// LevelManager/registry (this is pure data, no scene needed).

/** Per-level occupancy + cell->wall, matching LevelManager's current-level semantics. */
class FakeLevelManager {
  currentLevel = 0;
  private occ = new Map<number, Set<string>>();
  private c2w = new Map<number, Map<string, THREE.Object3D>>();
  private occFor() {
    if (!this.occ.has(this.currentLevel)) this.occ.set(this.currentLevel, new Set());
    return this.occ.get(this.currentLevel)!;
  }
  private c2wFor() {
    if (!this.c2w.has(this.currentLevel)) this.c2w.set(this.currentLevel, new Map());
    return this.c2w.get(this.currentLevel)!;
  }
  getCurrentLevelOccupiedCells() {
    return this.occFor();
  }
  getCurrentLevelCellToWallMap() {
    return this.c2wFor();
  }
  addOccupiedCell(key: string) {
    this.occFor().add(key);
  }
  removeOccupiedCell(key: string) {
    return this.occFor().delete(key);
  }
  /** Test helper: occupancy set for a specific level. */
  occAt(level: number) {
    return this.occ.get(level) ?? new Set<string>();
  }
}

class FakeRegistry {
  byType = new Map<string, THREE.Object3D[]>();
  addBuiltObject(type: string, obj: THREE.Object3D) {
    if (!this.byType.has(type)) this.byType.set(type, []);
    this.byType.get(type)!.push(obj);
  }
  removeBuiltObject(obj: THREE.Object3D) {
    for (const [type, arr] of this.byType) {
      const i = arr.indexOf(obj);
      if (i !== -1) {
        arr.splice(i, 1);
        return type;
      }
    }
    return null;
  }
  clearBuiltObjects() {
    this.byType.clear();
  }
  count(type: string) {
    return this.byType.get(type)?.length ?? 0;
  }
}

const wall = (networkId?: number) => ({ userData: networkId == null ? {} : { networkId } }) as unknown as THREE.Object3D;

describe('BuildTracking', () => {
  let lm: FakeLevelManager;
  let reg: FakeRegistry;
  let tracking: BuildTracking;

  beforeEach(() => {
    lm = new FakeLevelManager();
    reg = new FakeRegistry();
    tracking = new BuildTracking(lm as unknown as LevelManager, reg as unknown as BuildableObjectsRegistry);
  });

  it('add() records the wall, registers it by type, and reserves its cells', () => {
    const w = wall();
    tracking.add(w, 'wall', ['0,0', '1,0', '-1,0']);
    expect(tracking.builtWalls).toContain(w);
    expect(reg.count('wall')).toBe(1);
    expect([...lm.getCurrentLevelOccupiedCells()].sort()).toEqual(['-1,0', '0,0', '1,0']);
    expect(lm.getCurrentLevelCellToWallMap().get('0,0')).toBe(w);
  });

  it('cellsFor() returns exactly the cells mapped to a wall', () => {
    const a = wall();
    const b = wall();
    tracking.add(a, 'wall', ['0,0', '1,0']);
    tracking.add(b, 'wall', ['5,5']);
    expect(tracking.cellsFor(a).sort()).toEqual(['0,0', '1,0']);
    expect(tracking.cellsFor(b)).toEqual(['5,5']);
    expect(tracking.cellsFor(wall())).toEqual([]);
  });

  it('remove() frees the wall everywhere it was tracked', () => {
    const w = wall();
    tracking.add(w, 'floor', ['0,0', '1,0']);
    tracking.remove(w, tracking.cellsFor(w));
    expect(tracking.builtWalls).not.toContain(w);
    expect(reg.count('floor')).toBe(0);
    expect(lm.getCurrentLevelOccupiedCells().size).toBe(0);
    expect(lm.getCurrentLevelCellToWallMap().size).toBe(0);
  });

  it('findByNetworkId() locates a tracked building by its stable id', () => {
    const w = wall(1_000_042);
    tracking.add(w, 'wall', ['0,0']);
    expect(tracking.findByNetworkId(1_000_042)).toBe(w);
    expect(tracking.findByNetworkId(999)).toBeUndefined();
  });

  it('reserves cells on the CURRENT level, not level 0 (the multi-level rule)', () => {
    lm.currentLevel = 1; // e.g. the save-restore path set this to the building's level
    tracking.add(wall(), 'wall', ['2,2']);
    expect([...lm.occAt(1)]).toEqual(['2,2']);
    expect(lm.occAt(0).size).toBe(0);
  });

  it('clear() forgets every building and empties the current level', () => {
    tracking.add(wall(), 'wall', ['0,0']);
    tracking.add(wall(), 'floor', ['1,1']);
    tracking.clear();
    expect(tracking.builtWalls).toHaveLength(0);
    expect(reg.count('wall')).toBe(0);
    expect(lm.getCurrentLevelOccupiedCells().size).toBe(0);
    expect(lm.getCurrentLevelCellToWallMap().size).toBe(0);
  });
});
