import * as THREE from 'three';

/** Severity of how much a candidate wall overlaps existing walls. */
export type IntersectionSeverity = 'none' | 'severe' | 'moderate' | 'minor';

/** Details of a single overlap between a candidate wall and an existing wall. */
export interface WallIntersection {
  wall: THREE.Object3D;
  overlapVolume: number;
  overlapSize: THREE.Vector3;
  intersection: THREE.Box3;
  newWallBox: THREE.Box3;
  existingWallBox: THREE.Box3;
}

export class WallIntersectionHelper {
  constructor() {
    // Helper class for wall intersection calculations
  }

  static checkPhysicalIntersection(
    wallMesh: THREE.Object3D,
    position: THREE.Vector3,
    rotation: number,
    existingWalls: THREE.Object3D[]
  ): WallIntersection[] {
    // Create temporary wall for intersection testing
    const tempWall = wallMesh.clone();
    tempWall.position.copy(position);
    tempWall.rotation.y = rotation;
    tempWall.updateMatrixWorld(true);

    // Create bounding box for the new wall
    const newWallBox = new THREE.Box3().setFromObject(tempWall);

    // Check intersection with all existing walls
    const intersections: WallIntersection[] = [];

    for (const existingWall of existingWalls) {
      const existingWallBox = new THREE.Box3().setFromObject(existingWall);

      if (newWallBox.intersectsBox(existingWallBox)) {
        // Calculate detailed intersection info
        const intersection = newWallBox.clone().intersect(existingWallBox);
        const overlapSize = intersection.getSize(new THREE.Vector3());
        const overlapVolume = overlapSize.x * overlapSize.y * overlapSize.z;

        // Only consider significant overlaps (> 0.1 cubic units)
        if (overlapVolume > 0.1) {
          intersections.push({
            wall: existingWall,
            overlapVolume: overlapVolume,
            overlapSize: overlapSize,
            intersection: intersection,
            newWallBox: newWallBox.clone(),
            existingWallBox: existingWallBox.clone(),
          });
        }
      }
    }

    return intersections;
  }

  static getIntersectionSeverity(intersections: WallIntersection[]): IntersectionSeverity {
    if (intersections.length === 0) return 'none';

    const maxOverlap = Math.max(...intersections.map((i) => i.overlapVolume));

    if (maxOverlap > 2.0) return 'severe';
    if (maxOverlap > 0.5) return 'moderate';
    return 'minor';
  }
}
