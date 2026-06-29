import * as THREE from 'three';

/**
 * The collision/break userData every placed building mesh carries. Read by CollisionSystem
 * (`isCollider`/`colliderType`), by the delete-mode raycast and the break path
 * (`isBuildingWall`/`isBreakable`), and used to classify the building by type
 * (`buildingType`/`type`, the registry key — `type` is a backup alias kept for older save
 * data). Defined ONCE here so the live-placement, save-restore and network-materialize
 * paths can never spell it differently. The stable wire `networkId` is identity, not part
 * of the collider shape, so it is stamped separately by whoever knows it.
 */
export function buildingColliderUserData(type: string): {
  isCollider: true;
  colliderType: 'mesh';
  isBuildingWall: true;
  isBreakable: true;
  buildingType: string;
  type: string;
} {
  return {
    isCollider: true,
    colliderType: 'mesh',
    isBuildingWall: true,
    isBreakable: true,
    buildingType: type,
    type,
  };
}

/**
 * Build the mesh for a placed buildable: clone the loaded template, place + rotate it, and
 * stamp the collider/break userData on the root AND every mesh child (computing the bounding
 * volumes the collision system needs). Single source of truth for "what a placed building
 * mesh is", shared by BuildingSystem.buildWall (live placement) and
 * BuildingSaveManager.createBuildingMesh (save-restore + network materialize). The clone
 * inherits the template's scale (set once by the registry), so callers don't re-scale.
 */
export function createPlacedBuildingMesh(
  template: THREE.Object3D,
  type: string,
  position: THREE.Vector3 | { x: number; y: number; z: number },
  rotationY: number
): THREE.Object3D {
  const mesh = template.clone();
  mesh.position.set(position.x, position.y, position.z);
  mesh.rotation.y = rotationY;

  mesh.userData = buildingColliderUserData(type);
  mesh.traverse((child) => {
    const childMesh = child as THREE.Mesh;
    if (!childMesh.isMesh) return;
    childMesh.userData = buildingColliderUserData(type);
    if (childMesh.geometry) {
      childMesh.geometry.computeBoundingBox();
      childMesh.geometry.computeBoundingSphere();
    }
    childMesh.updateMatrixWorld(true);
  });

  mesh.updateMatrixWorld(true);
  return mesh;
}
