import * as THREE from 'three';

export class FarmingSystem {
  constructor(scene, camera, inventory, itemRegistry) {
    this.scene = scene;
    this.camera = camera;
    this.inventory = inventory;
    this.itemRegistry = itemRegistry || {};
    this.farmingPlots = new Map();
  }

  registerFarmingPlot(mesh) {
    if (!mesh || !mesh.uuid) return;

    const origin = new THREE.Vector3();
    mesh.getWorldPosition(origin);

    const slotOffsets = [
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(1, 0, -1),
      new THREE.Vector3(-1, 0, 1),
      new THREE.Vector3(1, 0, 1)
    ];

    const slots = slotOffsets.map((offset) => ({
      position: origin.clone().add(offset),
      planted: false,
      seedId: null,
      plantedAt: null
    }));

    this.farmingPlots.set(mesh.uuid, { mesh, slots });
  }

  unregisterFarmingPlot(mesh) {
    if (!mesh || !mesh.uuid) return;
    this.farmingPlots.delete(mesh.uuid);
  }

  isValidSeed(itemId) {
    const item = this.itemRegistry?.[itemId];
    if (item?.type === 'seed') return true;
    return typeof itemId === 'string' && itemId.toLowerCase().includes('seed');
  }

  getSlotsNearPosition(position, radius = 3.0) {
    const results = [];
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

  plantSeed(slot, itemId) {
    if (!slot || slot.planted) return false;
    slot.planted = true;
    slot.seedId = itemId;
    slot.plantedAt = Date.now();
    return true;
  }

  update() {
    // Placeholder for growth logic.
  }
}