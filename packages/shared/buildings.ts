// Server-authoritative buildables catalog + placement grid math, shared so the client
// and server derive the SAME footprint and cost from the same inputs (they cannot
// disagree on a placement). THREE-free and DOM-safe (pure data + math).
//
// The cell math is a faithful port of the client's BuildingSystem.getOccupiedCells /
// calculateRotatedCells: the server uses it to reject unknown types, reserve EVERY
// occupied cell (not just the anchor), derive the cell from position (never trusting a
// client-sent cell), and charge the cost. The client feeds its registry footprint into
// the same functions, so a placement the client previews is the placement the server
// validates.

import type { Vec3, BuildingCell } from './state';

/** World size of one building grid cell (LevelManager.gridSize on the client). */
export const BUILD_GRID_SIZE = 2.0;

/** Footprint of a buildable, in grid cells (mirrors the client registry's cellSize). */
export interface BuildableFootprint {
  width: number;
  height: number;
}

export interface BuildableDef {
  cost: { wood: number };
  footprint: BuildableFootprint;
}

/**
 * The catalog. MUST mirror the client's BuildableObjectsRegistry (cost + cellSize):
 * the values live in two places because the client entry also carries model/scale, but
 * the cost and footprint here are the authoritative ones. Keep the two tables equal.
 */
export const BUILDABLES: Record<string, BuildableDef> = {
  wall: { cost: { wood: 10 }, footprint: { width: 3, height: 1 } },
  spikedWall: { cost: { wood: 15 }, footprint: { width: 3, height: 1 } },
  farmingPlot: { cost: { wood: 5 }, footprint: { width: 3, height: 7 } },
  floor: { cost: { wood: 8 }, footprint: { width: 4, height: 4 } },
  ramp: { cost: { wood: 12 }, footprint: { width: 3, height: 1 } },
};

/** Look up a buildable by registry type; undefined for an unknown (rejected) type. */
export function getBuildable(type: string): BuildableDef | undefined {
  return Object.prototype.hasOwnProperty.call(BUILDABLES, type) ? BUILDABLES[type] : undefined;
}

/** Grid coordinate of a world axis value, matching the client's rounding exactly. */
export function buildingGridCoord(world: number, gridSize = BUILD_GRID_SIZE): number {
  // The +0.001 nudge is the client's float-precision guard; kept identical for parity.
  return Math.round((world + 0.001) / gridSize);
}

/** Normalize a Y rotation (radians) to one of 0/90/180/270 degrees, like the client. */
function normalizeRotationDeg(rotationY: number): number {
  const normalized = Math.round(((rotationY * 180) / Math.PI) / 90) * 90;
  return ((normalized % 360) + 360) % 360;
}

/**
 * All grid cells a buildable occupies at `position`/`rotationY` on `level`. Port of the
 * client's calculateRotatedCells: a (width x height) block centered on the anchor cell,
 * rotated in 90-degree steps. The anchor cell is always included.
 */
export function buildingFootprintCells(
  footprint: BuildableFootprint,
  position: Vec3,
  rotationY: number,
  level: number,
  gridSize = BUILD_GRID_SIZE
): BuildingCell[] {
  const centerX = buildingGridCoord(position.x, gridSize);
  const centerZ = buildingGridCoord(position.z, gridSize);
  const { width, height } = footprint;
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);
  const rotation = normalizeRotationDeg(rotationY);

  const cells: BuildingCell[] = [];
  for (let dx = -halfWidth; dx < width - halfWidth; dx++) {
    for (let dz = -halfHeight; dz < height - halfHeight; dz++) {
      let rx: number;
      let rz: number;
      switch (rotation) {
        case 90: // (x,z) -> (-z,x)
          rx = -dz;
          rz = dx;
          break;
        case 180: // (x,z) -> (-x,-z)
          rx = -dx;
          rz = -dz;
          break;
        case 270: // (x,z) -> (z,-x)
          rx = dz;
          rz = -dx;
          break;
        default: // 0
          rx = dx;
          rz = dz;
      }
      cells.push({ level, gx: centerX + rx, gz: centerZ + rz });
    }
  }
  return cells;
}
