import * as THREE from 'three';

export class WallIntersectionHelper {
  constructor() {
    // Helper class for wall intersection calculations
  }
  
  static checkPhysicalIntersection(wallMesh, position, rotation, existingWalls) {
    // Create temporary wall for intersection testing
    const tempWall = wallMesh.clone();
    tempWall.position.copy(position);
    tempWall.rotation.y = rotation;
    tempWall.updateMatrixWorld(true);
    
    // Create bounding box for the new wall
    const newWallBox = new THREE.Box3().setFromObject(tempWall);
    
    // Check intersection with all existing walls
    const intersections = [];
    
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
            existingWallBox: existingWallBox.clone()
          });
        }
      }
    }
    
    return intersections;
  }
  
  static getIntersectionSeverity(intersections) {
    if (intersections.length === 0) return 'none';
    
    const maxOverlap = Math.max(...intersections.map(i => i.overlapVolume));
    
    if (maxOverlap > 2.0) return 'severe';
    if (maxOverlap > 0.5) return 'moderate';
    return 'minor';
  }
}