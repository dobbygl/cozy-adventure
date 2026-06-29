import { describe, it, expect } from 'vitest';
import { buildingFootprintCells, buildingGridCoord, BUILD_GRID_SIZE } from '@cozy/shared';

// Pure footprint/grid math shared by the live placement, the save-restore path and the
// server. It had no coverage; these tests pin it down before the BuildingSystem
// decomposition (Fases 4-7) starts moving callers around. Keys are compared as a sorted
// set so rotation ordering doesn't matter.
const keys = (cells: { gx: number; gz: number }[]) =>
  cells.map((c) => `${c.gx},${c.gz}`).sort();

describe('buildingGridCoord', () => {
  it('rounds world coords to the grid with the +0.001 float guard', () => {
    expect(buildingGridCoord(0)).toBe(0);
    expect(buildingGridCoord(2)).toBe(1);
    expect(buildingGridCoord(4)).toBe(2);
    expect(buildingGridCoord(-2)).toBe(-1);
    // Exactly on a half-cell: the +0.001 nudge tips it deterministically up.
    expect(buildingGridCoord(1)).toBe(1);
    expect(buildingGridCoord(3)).toBe(2);
  });

  it('honours a custom grid size', () => {
    expect(buildingGridCoord(10, 5)).toBe(2);
  });

  it('matches BUILD_GRID_SIZE as the default', () => {
    expect(BUILD_GRID_SIZE).toBe(2.0);
    expect(buildingGridCoord(4)).toBe(buildingGridCoord(4, BUILD_GRID_SIZE));
  });
});

describe('buildingFootprintCells', () => {
  const at = { x: 0, y: 0, z: 0 };

  it('returns the single anchor cell for a 1x1 footprint', () => {
    expect(buildingFootprintCells({ width: 1, height: 1 }, at, 0, 0)).toEqual([
      { level: 0, gx: 0, gz: 0 },
    ]);
  });

  it('lays a 3x1 wall along X at rotation 0', () => {
    const cells = buildingFootprintCells({ width: 3, height: 1 }, at, 0, 0);
    expect(keys(cells)).toEqual(['-1,0', '0,0', '1,0']);
  });

  it('rotates a 3x1 wall onto the Z axis at 90 degrees', () => {
    const cells = buildingFootprintCells({ width: 3, height: 1 }, at, Math.PI / 2, 0);
    expect(keys(cells)).toEqual(['0,-1', '0,0', '0,1']);
  });

  it('reserves the full 4x4 floor footprint (gx,gz in -2..1)', () => {
    const cells = buildingFootprintCells({ width: 4, height: 4 }, at, 0, 0);
    expect(cells).toHaveLength(16);
    const xs = new Set(cells.map((c) => c.gx));
    const zs = new Set(cells.map((c) => c.gz));
    expect([...xs].sort((a, b) => a - b)).toEqual([-2, -1, 0, 1]);
    expect([...zs].sort((a, b) => a - b)).toEqual([-2, -1, 0, 1]);
  });

  it('keeps the cell COUNT invariant under every 90-degree rotation', () => {
    const fp = { width: 3, height: 7 }; // farming plot
    for (const deg of [0, 90, 180, 270]) {
      const cells = buildingFootprintCells(fp, at, (deg * Math.PI) / 180, 0);
      expect(cells, `rotation ${deg}`).toHaveLength(21);
    }
  });

  it('stamps the level onto every cell and offsets by the anchor position', () => {
    const cells = buildingFootprintCells({ width: 1, height: 1 }, { x: 4, y: 12, z: -2 }, 0, 3);
    expect(cells).toEqual([{ level: 3, gx: 2, gz: -1 }]);
  });
});
