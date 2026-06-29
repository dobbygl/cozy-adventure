import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CompanionAnimator } from './CompanionAnimator.js';
import { CompanionPhysics } from './CompanionPhysics.js';
import { CompanionLocomotion } from './CompanionLocomotion.js';
import type { CompanionDefinition } from './CompanionDefinition.js';

/**
 * The shared shell every companion has: load the model, own the animator /
 * physics / locomotion collaborators, run the per-frame preamble (advance
 * animation + ground physics) and tear down. The animal-specific AI lives in a
 * subclass's updateBehavior(); shared lifecycle and tuning live here.
 *
 * This is the seam that lets a second companion be mostly a CompanionDefinition
 * plus its own updateBehavior, instead of re-wiring loading, physics and
 * locomotion from scratch (the refactor's "scale to other companions" goal).
 */
export abstract class Companion {
  scene: THREE.Scene;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: any;
  readonly definition: CompanionDefinition;
  // Assigned in load() (or its fallback); always present by the time AI runs.
  mesh!: THREE.Object3D;
  animator!: CompanionAnimator;
  physics: CompanionPhysics;
  locomotion: CompanionLocomotion;
  // Movement tuning copied from the definition so behavior code reads this.speed
  // etc. directly.
  speed: number;
  followDistance: number;
  minFollowDistance: number;
  wanderRadius: number;
  protected loader: GLTFLoader;
  /**
   * Lazily resolves the game singleton. Centralized here so every port/provider
   * sees the live systems (created after the companion, swapped at runtime).
   * TODO(phase 7): inject the game systems instead of reading the global.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly getGame: () => any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(scene: THREE.Scene, player: any, definition: CompanionDefinition) {
    this.scene = scene;
    this.player = player;
    this.definition = definition;

    this.speed = definition.speed;
    this.followDistance = definition.followDistance;
    this.minFollowDistance = definition.minFollowDistance;
    this.wanderRadius = definition.wanderRadius;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.getGame = () => (window as any).gameInstance;
    this.physics = new CompanionPhysics(() => this.getGame()?.collisionSystem ?? null, {
      gravity: definition.gravity,
      groundLevel: definition.groundLevel,
    });
    this.locomotion = new CompanionLocomotion({ rotationSpeed: definition.rotationSpeed });

    this.loader = new GLTFLoader();
  }

  async load(): Promise<THREE.Object3D> {
    try {
      const gltf = await this.loader.loadAsync(this.definition.modelUrl);

      this.mesh = gltf.scene;
      this.mesh.scale.setScalar(this.definition.scale);
      this.mesh.position.set(0, 0, 0);

      // Enable shadows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mesh.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Set up animations (inert if the model ships none)
      this.animator = new CompanionAnimator(this.mesh, gltf.animations ?? []);
      this.animator.playDefault();

      this.scene.add(this.mesh);

      this.onLoaded();

      console.log(`Companion '${this.definition.name}' loaded successfully`);

      return this.mesh;
    } catch (error) {
      console.error(`Failed to load companion '${this.definition.name}':`, error);
      // Create a simple box as fallback
      const geometry = new THREE.BoxGeometry(0.5, 0.3, 0.8);
      const material = new THREE.MeshStandardMaterial({ color: this.definition.fallbackColor });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(0, 0.15, 0);
      this.scene.add(this.mesh);

      // Fallback mesh has no clips: an inert animator keeps later play()/update() safe.
      this.animator = new CompanionAnimator(this.mesh);

      this.onLoaded();

      return this.mesh;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(deltaTime: number, droppedItems: any[] = []): void {
    if (!this.mesh || !this.player?.mesh) return;

    // Advance animation + ground physics, then run the animal-specific brain.
    this.animator.update(deltaTime);
    this.physics.update(this.mesh, deltaTime);
    this.updateBehavior(deltaTime, droppedItems);
  }

  destroy(): void {
    this.onDestroy();
    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
    this.animator.stop();
  }

  /** Per-frame AI for this companion. Runs after animation + physics each frame. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract updateBehavior(deltaTime: number, droppedItems: any[]): void;

  /** Hook: model + animator are ready and added to the scene. Default: nothing. */
  protected onLoaded(): void {}

  /** Hook: companion is being torn down (before the mesh leaves the scene). */
  protected onDestroy(): void {}
}
