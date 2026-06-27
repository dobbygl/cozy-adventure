import * as THREE from 'three';
import type { Inventory, Item } from './inventory.js';

/** A single plantable slot on a farming plot. */
export interface FarmingSlot {
  position: THREE.Vector3;
  planted: boolean;
  seedId: string | null;
  plantedAt: number | null;
}

/** A registered farming plot mesh and its plantable slots. */
export interface FarmingPlot {
  mesh: THREE.Object3D;
  slots: FarmingSlot[];
}

export class FarmingSystem {
  scene: THREE.Scene;
  camera: THREE.Camera;
  inventory: Inventory;
  itemRegistry: Record<string, Item>;
  farmingPlots: Map<string, FarmingPlot>;

  constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    inventory: Inventory,
    itemRegistry?: Record<string, Item>
  ) {
    this.scene = scene;
    this.camera = camera;
    this.inventory = inventory;
    this.itemRegistry = itemRegistry || {};
    this.farmingPlots = new Map();
  }

  registerFarmingPlot(mesh: THREE.Object3D): void {
    if (!mesh || !mesh.uuid) return;

    const origin = new THREE.Vector3();
    mesh.getWorldPosition(origin);

    const slotOffsets = [
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(-1, 0, 1),
      new THREE.Vector3(1, 0, 1),
    ];

    const slots: FarmingSlot[] = slotOffsets.map((offset) => ({
      position: origin.clone().add(offset),
      planted: false,
      seedId: null,
      plantedAt: null,
    }));

    this.farmingPlots.set(mesh.uuid, { mesh, slots });
  }

  unregisterFarmingPlot(mesh: THREE.Object3D): void {
    if (!mesh || !mesh.uuid) return;
    this.farmingPlots.delete(mesh.uuid);
  }

  isValidSeed(itemId: string): boolean {
    const item = this.itemRegistry?.[itemId];
    if (item?.type === 'seed') return true;
    return typeof itemId === 'string' && itemId.toLowerCase().includes('seed');
  }

  getSlotsNearPosition(position: THREE.Vector3, radius = 3.0): FarmingSlot[] {
    const results: FarmingSlot[] = [];
    if (!position) return results;

    const radiusSq = radius * radius;
    this.farmingPlots.forEach((plotData) => {
      plotData.slots.forEach((slot) => {
        if (slot.position.distanceToSquared(position) <= radiusSq) {
          results.push(slot);
        }
      });
    });

    return results;
  }

  plantSeed(slot: FarmingSlot | null, itemId: string): boolean {
    if (!slot || slot.planted) return false;
    slot.planted = true;
    slot.seedId = itemId;
    slot.plantedAt = Date.now();
    return true;
  }

  update(): void {
    // Placeholder for growth logic.
  }
}
