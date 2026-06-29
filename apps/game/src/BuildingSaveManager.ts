import * as THREE from 'three';
import { createPlacedBuildingMesh } from './BuildingMeshFactory.js';

/** Serialized form of a placed building object in a save file. */
export interface SavedBuildObject {
  type: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  /** Stable network id, present only when restoring a server-confirmed building (multiplayer). */
  networkId?: number;
}

/** A building type passed as an object instead of a plain string key. */
interface BuildingTypeObject {
  name?: string;
  type?: string;
}

export class BuildingSaveManager {
  // Typed loosely until BuildingSystem itself is migrated (see MIGRACION-TYPESCRIPT.md, Ola 5).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildingSystem: any;

  constructor(buildingSystem: any) {
    this.buildingSystem = buildingSystem;
  }

  // Get all built objects formatted for saving
  getAllBuiltObjectsForSaving(): SavedBuildObject[] {
    const allBuiltObjects: SavedBuildObject[] = [];

    // First, try to get from registry
    const builtObjectsByType = this.buildingSystem.objectsRegistry.getAllBuiltObjects();
    console.log('Registry built objects:', builtObjectsByType);

    // Convert registry objects to save format
    Object.entries(builtObjectsByType).forEach(([registryType, objects]: [string, any]) => {
      console.log(`Processing ${objects.length} objects of registry type: ${registryType}`);
      objects.forEach((object: any, index: number) => {
        // Use the registry type as the primary source of truth
        let buildingType = registryType;

        // Only override if userData has a different, valid building type
        if (
          object.userData &&
          object.userData.buildingType &&
          object.userData.buildingType !== registryType
        ) {
          console.log(
            `Object ${index}: userData.buildingType (${object.userData.buildingType}) differs from registry type (${registryType})`
          );
          buildingType = object.userData.buildingType;
        } else if (
          object.userData &&
          object.userData.type &&
          object.userData.type !== registryType
        ) {
          console.log(
            `Object ${index}: userData.type (${object.userData.type}) differs from registry type (${registryType})`
          );
          buildingType = object.userData.type;
        }

        console.log(
          `Object ${index} of registry type ${registryType}: final buildingType = ${buildingType}`
        );

        allBuiltObjects.push({
          type: buildingType,
          position: {
            x: object.position.x,
            y: object.position.y,
            z: object.position.z,
          },
          rotation: object.rotation.y,
        });
      });
    });

    // Fallback: Also check the legacy builtWalls array to ensure we don't miss anything
    if (this.buildingSystem.builtWalls && this.buildingSystem.builtWalls.length > 0) {
      console.log(`Fallback: Found ${this.buildingSystem.builtWalls.length} walls in builtWalls array`);

      this.buildingSystem.builtWalls.forEach((wall: any) => {
        // Check if this wall is already in our save list (avoid duplicates)
        const alreadyExists = allBuiltObjects.some(
          (obj) =>
            Math.abs(obj.position.x - wall.position.x) < 0.01 &&
            Math.abs(obj.position.y - wall.position.y) < 0.01 &&
            Math.abs(obj.position.z - wall.position.z) < 0.01
        );

        if (!alreadyExists) {
          // Determine wall type based on userData or default to 'wall'
          let wallType = 'wall';
          if (wall.userData && wall.userData.buildingType) {
            wallType = wall.userData.buildingType;
          }

          allBuiltObjects.push({
            type: wallType,
            position: {
              x: wall.position.x,
              y: wall.position.y,
              z: wall.position.z,
            },
            rotation: wall.rotation.y,
          });
          console.log(`Added fallback wall at (${wall.position.x}, ${wall.position.z}) as type: ${wallType}`);
        }
      });
    }

    console.log(`Prepared ${allBuiltObjects.length} built objects for saving:`, allBuiltObjects);
    return allBuiltObjects;
  }

  // Create a building mesh for restoration
  createBuildingMesh(
    buildingType: string | BuildingTypeObject,
    position: THREE.Vector3,
    rotation: number
  ): THREE.Object3D | null {
    console.log(`Creating building mesh for restoration: ${buildingType}`, {
      buildingType,
      typeOfBuildingType: typeof buildingType,
      availableObjects: Object.keys(this.buildingSystem.buildableObjects),
      buildableObjectsLoaded: Object.keys(this.buildingSystem.buildableObjects).length > 0,
    });

    // Handle case where buildingType might be an object instead of string
    let actualBuildingType = buildingType;
    if (typeof buildingType === 'object') {
      // Check if it's a building object with name property
      if (buildingType.name) {
        // Map common building names to their keys
        const nameToTypeMap: Record<string, string> = {
          Wall: 'wall',
          'Spiked Wall': 'spikedWall',
          Floor: 'floor',
        };
        actualBuildingType = nameToTypeMap[buildingType.name] || buildingType.name.toLowerCase();
        console.log(`Mapped building name "${buildingType.name}" to type: ${actualBuildingType}`);
      } else if (buildingType.type) {
        actualBuildingType = buildingType.type;
        console.log(`Extracted building type from object: ${actualBuildingType}`);
      } else {
        console.error(`Invalid building type object - no name or type property:`, buildingType);
        return null;
      }
    }

    const buildObject = this.buildingSystem.buildableObjects[actualBuildingType as string];
    if (!buildObject || !buildObject.mesh) {
      console.error(`No buildable object found for type: ${actualBuildingType}`, {
        buildObject,
        availableTypes: Object.keys(this.buildingSystem.buildableObjects),
        requestedType: actualBuildingType,
      });
      return null;
    }

    // Clone + stamp via the shared factory (same code path the live placement uses), so a
    // restored building is byte-for-byte the same kind of collidable, breakable mesh.
    return createPlacedBuildingMesh(
      buildObject.mesh,
      actualBuildingType as string,
      position,
      rotation
    );
  }

  // Restore a building from saved data
  restoreBuilding(buildingData: SavedBuildObject): boolean {
    console.log('Restoring building:', buildingData, {
      dataType: typeof buildingData,
      hasType: 'type' in buildingData,
      typeValue: buildingData.type,
      typeOfType: typeof buildingData.type,
    });

    // Ensure buildableObjects are loaded before attempting restoration
    if (
      !this.buildingSystem.buildableObjects ||
      Object.keys(this.buildingSystem.buildableObjects).length === 0
    ) {
      console.error('Buildable objects not loaded yet, cannot restore building');
      return false;
    }

    const { type, position, rotation } = buildingData;

    // Validate building data
    if (!type) {
      console.error('Building data missing type:', buildingData);
      return false;
    }

    // Create the building mesh - convert position object to Vector3
    const positionVector = new THREE.Vector3(position.x, position.y, position.z);
    const building = this.createBuildingMesh(type, positionVector, rotation);
    if (!building) {
      console.error(`Failed to create building mesh for type: ${type}`);
      return false;
    }

    // Stamp the stable network id (multiplayer) so the building can be matched on
    // the wire and removed by id later. Never mesh.uuid (Principle II).
    if (buildingData.networkId !== undefined) {
      building.userData.networkId = buildingData.networkId;
    }

    // Add to scene
    this.buildingSystem.scene.add(building);

    // Add to collision system
    if (this.buildingSystem.collisionSystem) {
      this.buildingSystem.collisionSystem.addCollider(building, 'mesh');
    }

    // Add to tracking arrays
    this.buildingSystem.builtWalls.push(building);

    // Ensure proper type handling for registry
    const actualType =
      typeof type === 'object' && (type as BuildingTypeObject).type
        ? (type as BuildingTypeObject).type
        : type;
    console.log(`Registering restored building: ${actualType}`, building);
    this.buildingSystem.objectsRegistry.addBuiltObject(actualType, building);

    // Verify registration was successful
    const registeredCount = this.buildingSystem.objectsRegistry.getBuiltObjectCount(actualType);
    console.log(`Registry now contains ${registeredCount} restored objects of type: ${actualType}`);

    // Calculate and mark occupied cells
    const originalSelectedObject = this.buildingSystem.selectedBuildObject;

    this.buildingSystem.selectedBuildObject = actualType;
    const occupiedCells = this.buildingSystem.getOccupiedCells(positionVector, rotation);
    this.buildingSystem.selectedBuildObject = originalSelectedObject;

    // Mark cells as occupied
    occupiedCells.forEach((cellKey: string) => {
      this.buildingSystem.occupiedCells.add(cellKey);
      this.buildingSystem.cellToWallMap.set(cellKey, building);
    });

    console.log(`Successfully restored ${actualType} at position (${position.x}, ${position.y}, ${position.z})`);
    return true;
  }
}
