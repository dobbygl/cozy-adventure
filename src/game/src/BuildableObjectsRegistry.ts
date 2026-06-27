import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';

/** Number of grid cells a buildable occupies. */
export interface CellSize {
  width: number;
  height: number;
}

/** Static definition of a buildable object (no loaded mesh yet). */
export interface BuildableDefinition {
  name: string;
  modelUrl: string;
  scale: number;
  cost: { wood: number };
  cellSize: CellSize;
  description: string;
  placementOffset?: { x: number; z: number };
}

/** A buildable definition with its loaded mesh attached. */
export interface BuildableObject extends BuildableDefinition {
  mesh: THREE.Object3D;
}

/** Rich serialized form produced by getAllBuiltObjectsForSaving(). */
export interface SavedRegistryObject {
  id: string;
  type: string;
  subType: unknown;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  material: string;
  uuid: string | null;
  visible: boolean;
  userData?: Record<string, unknown>;
}

export class BuildableObjectsRegistry {
  loader: GLTFLoader;
  buildableObjects: Record<string, BuildableObject>;
  loadingPromises: Promise<void>[];
  builtObjectsByType: Map<string, THREE.Object3D[]>;
  objectDefinitions: Record<string, BuildableDefinition>;

  constructor() {
    this.loader = new GLTFLoader();
    this.buildableObjects = {};
    this.loadingPromises = [];
    this.builtObjectsByType = new Map(); // Track built objects by type

    // Define all buildable objects here
    this.objectDefinitions = {
      wall: {
        name: 'Wall',
        modelUrl: 'assets/build_wall.glb',
        scale: 2.0,
        cost: { wood: 10 },
        cellSize: { width: 3, height: 1 }, // Occupies 3x1 cells
        description: 'Basic wooden wall for protection',
      },
      spikedWall: {
        name: 'Spiked Wall',
        modelUrl: 'assets/build_wall_spiked.glb',
        scale: 2.0,
        cost: { wood: 15 },
        cellSize: { width: 3, height: 1 }, // Occupies 3x1 cells
        description: 'Reinforced wall with spikes for extra protection',
      },
      farmingPlot: {
        name: 'Farming Plot',
        modelUrl: 'assets/farming_plot.glb',
        scale: 2.0,
        cost: { wood: 5 },
        cellSize: { width: 3, height: 7 }, // Occupies 3x7 cells (21 cells total)
        description: 'A tilled plot of land for growing crops',
      },
      floor: {
        name: 'Floor',
        modelUrl: 'assets/build_floor_ceiling.glb',
        scale: 2.0,
        cost: { wood: 8 },
        cellSize: { width: 4, height: 4 }, // Occupies 4x4 cells (16 cells total)
        description: 'Wooden floor panel for building foundations',
      },
      ramp: {
        name: 'Ramp',
        modelUrl: 'assets/build_ramp.glb',
        scale: 2.0,
        cost: { wood: 12 },
        cellSize: { width: 3, height: 1 }, // Occupies 3x1 cells (3 cells total)
        placementOffset: { x: -1, z: -1 }, // Offset to center properly in grid
        description: 'Sloped ramp for accessing different building levels',
      },
    };
  }

  // Load all buildable object models
  async loadAllModels(): Promise<Record<string, BuildableObject>> {
    console.log('BuildableObjectsRegistry: Loading all buildable object models...');

    // Clear previous data
    this.buildableObjects = {};
    this.loadingPromises = [];

    // Create loading promises for each object
    for (const [key, definition] of Object.entries(this.objectDefinitions)) {
      const loadPromise = this.loadSingleModel(key, definition);
      this.loadingPromises.push(loadPromise);
    }

    // Wait for all models to load
    await Promise.all(this.loadingPromises);

    console.log('BuildableObjectsRegistry: All buildable object models loaded successfully');
    return this.buildableObjects;
  }

  // Load a single model
  async loadSingleModel(key: string, definition: BuildableDefinition): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loader.load(
        definition.modelUrl,
        (gltf: GLTF) => {
          // Create buildable object entry
          this.buildableObjects[key] = {
            ...definition, // Copy all definition properties
            mesh: gltf.scene.clone(),
          };

          // Setup model properties
          this.setupModelProperties(this.buildableObjects[key]);

          console.log(`BuildableObjectsRegistry: ${definition.name} model loaded successfully`);
          resolve();
        },
        () => {
          // Loading progress - could be used for loading bars
        },
        (error) => {
          console.error(`BuildableObjectsRegistry: Error loading ${definition.name} model:`, error);
          reject(error);
        }
      );
    });
  }

  // Setup common model properties
  setupModelProperties(buildObject: BuildableObject): void {
    if (!buildObject.mesh) return;

    buildObject.mesh.traverse((child) => {
      // child is typed Object3D; isMesh/material live on Mesh.
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Make material less reflective
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          if (material.isMeshStandardMaterial) {
            material.metalness = 0.1;
            material.roughness = 0.8;
          }
        }
      }
    });

    // Scale model according to config
    buildObject.mesh.scale.setScalar(buildObject.scale);
  }

  // Get all buildable objects
  getBuildableObjects(): Record<string, BuildableObject> {
    return this.buildableObjects;
  }

  // Get a specific buildable object
  getBuildableObject(key: string): BuildableObject | undefined {
    return this.buildableObjects[key];
  }

  // Add a new buildable object definition (for future expansion)
  addObjectDefinition(key: string, definition: BuildableDefinition): void {
    this.objectDefinitions[key] = definition;
    console.log(`BuildableObjectsRegistry: Added new object definition: ${key}`);
  }

  // Remove an object definition
  removeObjectDefinition(key: string): void {
    delete this.objectDefinitions[key];
    delete this.buildableObjects[key];
    console.log(`BuildableObjectsRegistry: Removed object definition: ${key}`);
  }

  // Get all object definition keys
  getObjectKeys(): string[] {
    return Object.keys(this.objectDefinitions);
  }

  // Get object definitions (without loaded meshes)
  getObjectDefinitions(): Record<string, BuildableDefinition> {
    return this.objectDefinitions;
  }

  // Check if an object exists
  hasObject(key: string): boolean {
    return key in this.objectDefinitions;
  }

  // Get object cost
  getObjectCost(key: string): { wood: number } | null {
    const obj = this.objectDefinitions[key];
    return obj ? obj.cost : null;
  }

  // Get object cell size
  getObjectCellSize(key: string): CellSize | number {
    const obj = this.objectDefinitions[key];
    return obj ? obj.cellSize : 1.0;
  }

  // Object type tracking methods
  registerBuiltObject(objectType: string, objectInstance: THREE.Object3D): void {
    if (!this.builtObjectsByType.has(objectType)) {
      this.builtObjectsByType.set(objectType, []);
    }

    // Add debug logging to see what's being registered
    console.log(`Registering building:`, {
      requestedType: objectType,
      instanceUserData: objectInstance.userData,
      instancePosition: objectInstance.position,
      availableTypes: Object.keys(this.objectDefinitions),
    });

    // Non-null: the array was just ensured to exist above.
    this.builtObjectsByType.get(objectType)!.push(objectInstance);
    console.log(
      `Registered ${objectType} to type tracking. Total ${objectType}s: ${this.builtObjectsByType.get(objectType)!.length}`
    );
  }

  // Legacy method for backward compatibility
  addBuiltObject(objectType: string, objectInstance: THREE.Object3D): void {
    return this.registerBuiltObject(objectType, objectInstance);
  }

  removeBuiltObject(objectInstance: THREE.Object3D): string | null {
    for (const [objectType, objectsArray] of this.builtObjectsByType.entries()) {
      const typeIndex = objectsArray.indexOf(objectInstance);
      if (typeIndex !== -1) {
        objectsArray.splice(typeIndex, 1);
        console.log(
          `Removed ${objectType} from type tracking. Remaining ${objectType}s: ${objectsArray.length}`
        );
        return objectType;
      }
    }
    return null;
  }

  getBuiltObjectsByType(objectType: string): THREE.Object3D[] {
    return this.builtObjectsByType.get(objectType) || [];
  }

  getAllBuiltObjects(): Map<string, THREE.Object3D[]> {
    console.log('Getting all built objects from registry:');
    for (const [type, objects] of this.builtObjectsByType.entries()) {
      console.log(`  ${type}: ${objects.length} objects`);
      objects.forEach((obj, index) => {
        console.log(
          `    ${index}: userData.buildingType = ${obj.userData?.buildingType}, userData.type = ${obj.userData?.type}`
        );
      });
    }
    return this.builtObjectsByType;
  }

  // Get all built objects formatted for saving
  getAllBuiltObjectsForSaving(): SavedRegistryObject[] {
    const allObjects: SavedRegistryObject[] = [];

    // Iterate through all built object types
    for (const [objectType, objectsArray] of this.builtObjectsByType.entries()) {
      objectsArray.forEach((buildingMesh, index) => {
        if (buildingMesh && buildingMesh.position) {
          const buildingData: SavedRegistryObject = {
            id: `${objectType}_${index}`,
            type: objectType,
            subType: buildingMesh.userData?.subType || null,
            position: {
              x: buildingMesh.position.x,
              y: buildingMesh.position.y,
              z: buildingMesh.position.z,
            },
            rotation: {
              x: buildingMesh.rotation.x,
              y: buildingMesh.rotation.y,
              z: buildingMesh.rotation.z,
            },
            scale: {
              x: buildingMesh.scale.x,
              y: buildingMesh.scale.y,
              z: buildingMesh.scale.z,
            },
            // material lives on Mesh, not Object3D; read defensively.
            material: (buildingMesh as THREE.Mesh & { material?: { name?: string } }).material?.name || 'default',
            uuid: buildingMesh.uuid || null,
            visible: buildingMesh.visible !== false,
          };

          // Store additional building-specific data
          if (buildingMesh.userData) {
            buildingData.userData = {
              ...buildingMesh.userData,
            };
          }

          allObjects.push(buildingData);
        }
      });
    }

    console.log(`BuildableObjectsRegistry: Prepared ${allObjects.length} built objects for saving`);
    return allObjects;
  }

  getBuiltObjectCount(objectType: string): number {
    const objects = this.builtObjectsByType.get(objectType);
    return objects ? objects.length : 0;
  }

  clearAllBuiltObjects(): void {
    this.builtObjectsByType.clear();
    console.log('All built object tracking cleared');
  }

  // Legacy method for backward compatibility
  clearBuiltObjects(): void {
    return this.clearAllBuiltObjects();
  }
}
