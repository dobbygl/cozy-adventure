import * as THREE from 'three';
import { Player } from '../player.js';
import { InterpolationBuffer } from './interpolation.js';
import type { PlayerModelId } from '../playerModel.js';
import type { AvatarSnapshot, MovementState } from '@cozy/shared';

// A remote avatar. Reuses Player for the model, skeleton and animation mixer; the
// ONLY thing it replaces is the movement source — instead of a CharacterController
// + input, it drives the mesh from interpolated network snapshots. Player is not
// forked. Held-item rendering is wired in P2 (needs the item-id -> model mapping);
// here we track movement + transform, which is what "see them move" needs.

const MOVEMENT_ANIMATION: Record<MovementState, string> = {
  idle: 'Player_Idle',
  walking: 'Player_Walking',
  running: 'Player_Run',
};

export class RemotePlayer {
  readonly playerId: string;
  private readonly player: Player;
  private readonly modelId?: PlayerModelId;
  private readonly buffer = new InterpolationBuffer();
  private lastMovement: MovementState | null = null;

  constructor(scene: THREE.Scene, playerId: string, modelId?: PlayerModelId) {
    this.playerId = playerId;
    this.modelId = modelId;
    this.player = new Player(scene);
  }

  /** Load the peer's model (adds the mesh to the scene). */
  async load(): Promise<void> {
    await this.player.load(this.modelId);
  }

  get mesh(): THREE.Object3D | null {
    return this.player.mesh;
  }

  /** Feed a network snapshot received at `receivedAt` (ms). */
  pushSnapshot(snap: AvatarSnapshot, receivedAt: number): void {
    this.buffer.push(
      { position: snap.position, rotation: snap.rotation, movement: snap.movement, heldItemId: snap.heldItemId },
      receivedAt
    );
  }

  /** Advance animations and apply the interpolated transform for `renderTime` (ms). */
  update(deltaTime: number, renderTime: number): void {
    this.player.mixer?.update(deltaTime);
    const mesh = this.player.mesh;
    if (!mesh) return;
    const s = this.buffer.sample(renderTime);
    if (!s) return;
    mesh.position.set(s.position.x, s.position.y, s.position.z);
    mesh.rotation.set(s.rotation.x, s.rotation.y, s.rotation.z);
    if (s.movement !== this.lastMovement) {
      this.lastMovement = s.movement;
      this.player.playAnimation(MOVEMENT_ANIMATION[s.movement] ?? 'Player_Idle', true);
    }
  }

  /** Remove from the scene. (Full GPU teardown is part of the P3 destroy() work.) */
  dispose(): void {
    const mesh = this.player.mesh;
    if (mesh?.parent) mesh.parent.remove(mesh);
  }
}
