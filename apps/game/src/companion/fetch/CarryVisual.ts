import * as THREE from 'three';

/**
 * The little props a companion visibly carries (in the dog's case, in its mouth):
 * a container attached to the host mesh plus a stack of per-item meshes. Extracted
 * verbatim from DogCompanion's mouth methods (Fase 4) so the geometry, stacking
 * layout and disposal are unchanged.
 *
 * Owns its own meshes and disposes them, so the rest of the companion never
 * touches Three geometry/material lifetimes for carried items.
 */
export class CarryVisual {
  private readonly container: THREE.Group;
  private readonly items: THREE.Mesh[] = [];

  constructor(host: THREE.Object3D) {
    // Container positioned relative to the host's head; items are scaled down.
    this.container = new THREE.Group();
    this.container.position.set(0, 0.2, 0.4); // Forward and up from center
    this.container.rotation.set(0, 0, 0);
    this.container.scale.set(0.5, 0.5, 0.5); // Scale down items in mouth
    host.add(this.container);
    console.log('Companion carry container created');
  }

  /** Number of items currently shown. */
  get count(): number {
    return this.items.length;
  }

  /** Add a small visual for `itemId`, stacked above the previous ones. */
  add(itemId: string): void {
    if (!itemId) return;

    console.log('Creating visual carried item:', itemId);
    console.log('Current carried items:', this.items.length);

    // Create a smaller version of the fetched item
    let itemMesh: THREE.Mesh;

    switch (itemId) {
      case 'apple': {
        // Create apple geometry (simplified)
        const appleGeometry = new THREE.SphereGeometry(0.12, 8, 6);
        const appleMaterial = new THREE.MeshLambertMaterial({ color: 0xff4444 });
        itemMesh = new THREE.Mesh(appleGeometry, appleMaterial);
        break;
      }

      case 'wood': {
        // Create wood log geometry
        const woodGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 6);
        const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        itemMesh = new THREE.Mesh(woodGeometry, woodMaterial);
        itemMesh.rotation.z = Math.PI / 2; // Rotate to be horizontal in mouth
        break;
      }

      case 'stone': {
        // Create stone geometry
        const stoneGeometry = new THREE.DodecahedronGeometry(0.06);
        const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        itemMesh = new THREE.Mesh(stoneGeometry, stoneMaterial);
        break;
      }

      default: {
        // Default cube for other items
        const defaultGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        const defaultMaterial = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
        itemMesh = new THREE.Mesh(defaultGeometry, defaultMaterial);
        break;
      }
    }

    // Configure the item mesh
    itemMesh.castShadow = true;
    itemMesh.receiveShadow = false;

    // Position items in a stacked arrangement
    const itemCount = this.items.length;
    this.position(itemMesh, itemCount);

    // Add to container and tracking array
    this.container.add(itemMesh);
    this.items.push(itemMesh);

    // Add slight random rotation for natural look
    itemMesh.rotation.x += (Math.random() - 0.5) * 0.3;
    itemMesh.rotation.y += (Math.random() - 0.5) * 0.3;
    itemMesh.rotation.z += (Math.random() - 0.5) * 0.3;

    console.log(`Item ${itemCount + 1} created:`, itemId);
    console.log(`Total carried items: ${this.items.length}`);
  }

  /** Remove and dispose every carried item (after a full delivery / on teardown). */
  clear(): void {
    if (this.items.length > 0) {
      console.log(`Removing ${this.items.length} carried items`);

      for (const itemMesh of this.items) {
        this.container.remove(itemMesh);

        // Dispose of geometry and material
        if (itemMesh.geometry) itemMesh.geometry.dispose();
        if (itemMesh.material) (itemMesh.material as THREE.Material).dispose();
      }

      this.items.length = 0;
      console.log('All carried items removed');
    }
  }

  /** Remove and dispose only the most recently added item (per-item delivery). */
  removeLatest(): void {
    if (this.items.length > 0) {
      const latestItem = this.items.pop()!;
      this.container.remove(latestItem);

      // Dispose of geometry and material
      if (latestItem.geometry) latestItem.geometry.dispose();
      if (latestItem.material) (latestItem.material as THREE.Material).dispose();

      console.log(`Removed latest carried item. Remaining: ${this.items.length}`);

      // Reposition remaining items for better visual arrangement
      this.reposition();
    }
  }

  private position(itemMesh: THREE.Object3D, itemIndex: number): void {
    // Base position in the mouth
    const baseX = 0;
    const baseY = -0.08;
    const baseZ = 0.15;

    // Stacking arrangement - items get stacked vertically and slightly forward
    const stackOffset = itemIndex * 0.08; // Vertical stacking distance
    const forwardOffset = itemIndex * 0.05; // Slight forward progression
    const sideOffset = (itemIndex % 2) * 0.05 - 0.025; // Alternate left/right slightly

    itemMesh.position.set(baseX + sideOffset, baseY + stackOffset, baseZ + forwardOffset);

    // Scale down items slightly as they stack up (makes it look more natural)
    const scaleReduction = Math.min(itemIndex * 0.1, 0.3);
    const finalScale = 1.0 - scaleReduction;
    itemMesh.scale.setScalar(finalScale);

    console.log(`Positioned item ${itemIndex + 1} at:`, itemMesh.position);
  }

  private reposition(): void {
    // Reposition all remaining items to close gaps after removal
    for (let i = 0; i < this.items.length; i++) {
      this.position(this.items[i], i);
    }
  }
}
