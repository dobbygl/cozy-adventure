import * as THREE from 'three';
import { Companion } from './companion/Companion.js';
import { DOG_DEFINITION } from './companion/CompanionDefinition.js';
import { CarryVisual } from './companion/fetch/CarryVisual.js';
import { DeliveryService } from './companion/fetch/DeliveryService.js';
import { findNearestDroppedItem, hasItemBeenDroppedLongEnough } from './companion/fetch/fetchQueries.js';
import type { DroppedItemsPort } from './companion/ports.js';
import { companionUiPort, droppedItemsPort, inventoryPort } from './companion/gameInstancePorts.js';

/**
 * The dog: a fetch-and-deliver companion. Companion supplies the shared shell
 * (model loading, animation, physics, locomotion); this subclass owns the
 * dog-specific brain — the follow/wander/fetch/idle state machine, the carry
 * list and delivery. A non-fetching companion would subclass Companion with a
 * different updateBehavior and skip all of this.
 */
export class DogCompanion extends Companion {
  // Behavior states
  state: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
  wanderTarget: THREE.Vector3 | null;
  wanderTimer: number;
  wanderCooldown: number;
  barkTimer: number;
  barkCooldown: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchedItems: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTargets: any[];
  maxCarryCapacity: number;
  returnToPlayer: boolean;
  // The items the dog visibly carries in its mouth (assigned in onLoaded()).
  carry!: CarryVisual;
  delivery: DeliveryService;
  droppedItems: DroppedItemsPort;

  constructor(
    scene: THREE.Scene,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    player: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGame?: () => any,
  ) {
    super(scene, player, DOG_DEFINITION, getGame);

    // Fetch/delivery talks to the rest of the game through ports (see base
    // getGame for the late-binding rationale).
    this.delivery = new DeliveryService(inventoryPort(this.getGame), companionUiPort(this.getGame));
    this.droppedItems = droppedItemsPort(this.getGame, scene);

    // Behavior states
    this.state = 'following'; // 'following', 'wandering', 'fetching', 'idle'
    this.target = null;
    this.wanderTarget = null;
    this.wanderTimer = 0;
    this.wanderCooldown = 0;
    this.barkTimer = 0;
    this.barkCooldown = 0;

    // Item fetching - Enhanced for multiple items
    this.fetchedItems = [];
    this.fetchTargets = []; // Array to hold multiple fetch targets
    this.maxCarryCapacity = 15; // Dog can carry up to 15 items at once
    this.returnToPlayer = false;
  }

  protected override onLoaded(): void {
    // Container for items the dog carries in its mouth
    this.carry = new CarryVisual(this.mesh);
  }

  protected override onDestroy(): void {
    // Remove all carried items before the mesh leaves the scene
    this.carry.clear();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected override updateBehavior(deltaTime: number, droppedItems: any[]): void {
    // Update timers
    this.wanderTimer -= deltaTime;
    this.wanderCooldown -= deltaTime;
    this.barkTimer -= deltaTime;
    this.barkCooldown -= deltaTime;

    const playerPosition = this.player.mesh.position.clone();
    const dogPosition = this.mesh.position.clone();
    const distanceToPlayer = dogPosition.distanceTo(playerPosition);

    // ALWAYS check for items to fetch - Enhanced for multiple items with REALLY FAR detection
    // Only pick up items that have been on the ground long enough
    if (droppedItems.length > 0 && this.fetchedItems.length < this.maxCarryCapacity) {
      const nearestItem = findNearestDroppedItem(droppedItems, dogPosition);
      if (nearestItem && this.validateItemExists(nearestItem, droppedItems) &&
          dogPosition.distanceTo(nearestItem.position) < 150 && !this.isAlreadyTargeted(nearestItem) &&
          hasItemBeenDroppedLongEnough(nearestItem, Date.now())) {

        // If not already fetching, start fetching
        if (this.state !== 'fetching') {
          this.startFetching(nearestItem);
        } else {
          // If already fetching, add to targets
          this.addFetchTarget(nearestItem);
        }
      }
    }

    // Additional check: Continue scanning for more items if dog isn't at capacity and isn't returning
    if (this.state === 'fetching' && !this.returnToPlayer && this.fetchedItems.length < this.maxCarryCapacity) {
      const additionalItem = this.findNextFetchTarget(droppedItems, dogPosition);
      if (additionalItem && this.validateItemExists(additionalItem, droppedItems) &&
          dogPosition.distanceTo(additionalItem.position) < 150 && hasItemBeenDroppedLongEnough(additionalItem, Date.now())) {
        this.addFetchTarget(additionalItem);
      }
    }

    // State machine
    switch (this.state) {
      case 'following':
        this.updateFollowing(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
      case 'wandering':
        this.updateWandering(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
      case 'fetching':
        this.updateFetching(deltaTime, playerPosition, dogPosition, droppedItems);
        break;
      case 'idle':
        this.updateIdle(deltaTime, playerPosition, dogPosition, distanceToPlayer);
        break;
    }

    // Random barking
    if (this.barkCooldown <= 0 && Math.random() < 0.001) {
      this.bark();
      this.barkCooldown = Math.random() * 10 + 5; // 5-15 seconds
    }
  }

  updateFollowing(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    if (distanceToPlayer > this.followDistance) {
      // Move towards player
      this.locomotion.moveToward(this.mesh, playerPosition, this.speed, deltaTime);
      this.animator.playWalk();

    } else if (distanceToPlayer < this.minFollowDistance) {
      // Too close, maybe wander or sit
      if (Math.random() < 0.1 && this.wanderCooldown <= 0) {
        this.startWandering();
      } else {
        this.state = 'idle';
        this.animator.playIdle();
      }
    } else {
      // Within follow range but not too close - idle
      this.animator.playIdle();
    }
  }

  updateWandering(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    // If too far from player, return to following
    if (distanceToPlayer > this.wanderRadius) {
      this.state = 'following';
      return;
    }

    // Set wander target if needed
    if (!this.wanderTarget || this.wanderTimer <= 0) {
      this.setRandomWanderTarget(playerPosition);
      this.wanderTimer = Math.random() * 3 + 2; // 2-5 seconds
    }

    // Move towards wander target
    const distanceToTarget = dogPosition.distanceTo(this.wanderTarget!);
    if (distanceToTarget > 0.5) {
      // Wander at half speed
      this.locomotion.moveToward(this.mesh, this.wanderTarget!, this.speed * 0.5, deltaTime);
      this.animator.playWalk();
    } else {
      // Reached target, maybe go back to following
      this.animator.playIdle();
      if (Math.random() < 0.3) {
        this.state = 'following';
      } else {
        this.setRandomWanderTarget(playerPosition);
      }
    }
  }

  updateFetching(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    droppedItems: any[]
  ): void {
    // Clean up fetch targets that no longer exist
    this.fetchTargets = this.fetchTargets.filter(target => this.validateItemExists(target, droppedItems));

    if (this.fetchTargets.length === 0 && this.fetchedItems.length === 0) {
      // No items to fetch or deliver, return to following
      console.log('🚫 No valid items to fetch or deliver - returning to following state');
      this.state = 'following';
      this.returnToPlayer = false;
      return;
    }

    if (!this.returnToPlayer && this.fetchTargets.length > 0) {
      // Moving to fetch the next item
      const currentTarget = this.fetchTargets[0];

      // Double-check that current target still exists before processing
      if (!this.validateItemExists(currentTarget, droppedItems)) {
        console.log('🚫 Current fetch target no longer exists - removing from targets');
        this.fetchTargets.shift();
        return;
      }

      const itemPosition = currentTarget.position;
      const distanceToItem = dogPosition.distanceTo(itemPosition);

      if (distanceToItem > 0.8) {
        // Sprint to the item (1.2x speed)
        this.locomotion.moveToward(this.mesh, itemPosition, this.speed * 1.2, deltaTime);
        this.animator.playWalk();
      } else {
        // Reached item, "pick it up"
        console.log(`Dog reached item ${this.fetchedItems.length + 1}/${this.maxCarryCapacity} - storing item data for delivery`);
        console.log('Item data:', currentTarget.userData);

        // Store the item data before removing from ground
        this.fetchedItems.push({
            userData: {
                itemId: currentTarget.userData.itemId,
                quantity: currentTarget.userData.quantity || 1
            }
        });

        // Remove this target from the list
        this.fetchTargets.shift();

        // Remove item from ground immediately when dog picks it up
        this.droppedItems.remove(currentTarget);

        // Create visual item in mouth
        this.carry.add(currentTarget.userData.itemId);

        // Check if dog should return to player or continue fetching
        if (this.fetchedItems.length >= this.maxCarryCapacity || this.fetchTargets.length === 0) {
          console.log(`Dog carrying ${this.fetchedItems.length} items - returning to player`);
          this.returnToPlayer = true;
        }

        this.animator.playIdle();
        this.bark(); // Excited bark when fetching item
      }
    } else if (this.returnToPlayer) {
      // Returning to player with item
      const distanceToPlayer = dogPosition.distanceTo(playerPosition);

      if (distanceToPlayer > 1.8) {
        // Carry the haul back to the player
        this.locomotion.moveToward(this.mesh, playerPosition, this.speed, deltaTime);
        this.animator.playWalk();
      } else {
        // Close enough to player - deliver items
        console.log(`🎉 Dog close enough to deliver! Items to deliver: ${this.fetchedItems.length}`);

        const deliverySuccess = this.delivery.deliver(this.fetchedItems, () => this.carry.removeLatest());

        if (deliverySuccess) {
          console.log('🎉 Multi-item delivery completed successfully!');

          // Clean up state after successful delivery
          this.state = 'following';
          this.fetchedItems = [];
          this.returnToPlayer = false;

          // Remove all visual items from mouth
          this.carry.clear();

          this.animator.playIdle();
          this.bark(); // Happy bark after successful delivery

        } else {
          console.log('❌ Multi-item delivery failed - dog will keep trying');
          // Dog will continue trying to deliver on next update
        }
      }
    }
  }

  updateIdle(
    deltaTime: number,
    playerPosition: THREE.Vector3,
    dogPosition: THREE.Vector3,
    distanceToPlayer: number
  ): void {
    // Ensure idle animation is playing
    this.animator.playIdle();

    // If player moves away, start following
    if (distanceToPlayer > this.followDistance * 1.5) {
      this.state = 'following';
    } else if (Math.random() < 0.05 && this.wanderCooldown <= 0) {
      this.startWandering();
    }
  }

  startWandering() {
    this.state = 'wandering';
    this.wanderCooldown = Math.random() * 10 + 5; // 5-15 seconds before next wander
  }

  setRandomWanderTarget(playerPosition: THREE.Vector3): void {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * this.wanderRadius * 0.5 + 1;

    this.wanderTarget = new THREE.Vector3(
      playerPosition.x + Math.cos(angle) * distance,
      playerPosition.y,
      playerPosition.z + Math.sin(angle) * distance
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startFetching(item: any): void {
    this.state = 'fetching';
    this.fetchTargets = [item]; // Initialize with first item
    this.returnToPlayer = false;
    console.log('Dog started fetching items, starting with:', item.userData?.itemId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addFetchTarget(item: any): void {
    if (!this.isAlreadyTargeted(item) && this.fetchTargets.length < this.maxCarryCapacity) {
      this.fetchTargets.push(item);
      console.log('Dog added fetch target:', item.userData?.itemId, 'Total targets:', this.fetchTargets.length);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isAlreadyTargeted(item: any): boolean {
    return this.fetchTargets.includes(item);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findNextFetchTarget(droppedItems: any[], dogPosition: THREE.Vector3): any {
    const maxSearchDistance = 200; // EXTREMELY FAR search radius for multiple items

    for (const item of droppedItems) {
      const distance = dogPosition.distanceTo(item.position);
      if (distance <= maxSearchDistance && !this.isAlreadyTargeted(item) && hasItemBeenDroppedLongEnough(item, Date.now())) {
        return item;
      }
    }

    return null;
  }

  // Enhanced validation method to ensure items exist in both arrays and scene
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateItemExists(item: any, droppedItems: any[]): boolean {
    if (!item) {
      console.log('🚫 Item validation failed: item is null/undefined');
      return false;
    }

    // Check if item exists in the dropped items array
    const existsInDroppedItems = droppedItems.includes(item);

    // Check if item still exists in the scene
    const existsInScene = this.scene.children.includes(item);

    // Check if item exists in game's pickupable items array (diagnostics only)
    const existsInPickupable = this.getGame()?.pickupableItems?.includes(item) || false;

    const isValid = existsInDroppedItems && existsInScene;

    if (!isValid) {
      console.log(`🚫 Item validation failed for ${item.userData?.itemId}:`, {
        existsInDroppedItems,
        existsInScene,
        existsInPickupable,
        hasUserData: !!item.userData
      });
    }

    return isValid;
  }

  bark() {
    console.log('🐕 Woof!');

    // Play bark animation briefly
    const barkPlayed = this.animator.playBark();

    // Return to previous animation after bark
    setTimeout(() => {
      this.restorePreviousAnimation();
    }, barkPlayed ? 1000 : 100); // Shorter timeout if no bark animation

    // You could add sound effects here in the future
  }

  restorePreviousAnimation() {
    if (this.state === 'idle') {
      this.animator.playIdle();
    } else if (this.state === 'following' || this.state === 'wandering' || this.state === 'fetching') {
      // Check if dog is actually moving before playing walk animation
      const isMoving = this.state === 'fetching' ||
                      (this.state === 'following' && this.player?.mesh &&
                       this.mesh.position.distanceTo(this.player.mesh.position) > this.followDistance) ||
                      (this.state === 'wandering' && this.wanderTarget &&
                       this.mesh.position.distanceTo(this.wanderTarget) > 0.5);

      if (isMoving) {
        this.animator.playWalk();
      } else {
        this.animator.playIdle();
      }
    }
  }
}
