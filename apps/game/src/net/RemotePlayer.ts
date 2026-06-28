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
//
// It also carries a name label: a camera-facing Sprite drawn from a canvas (text
// via fillText, NEVER innerHTML) so a peer's displayName — attacker-controllable
// text, already length/charset-clamped by the server — can be shown above their
// head without any markup-injection surface. The Sprite lives in the scene (not as
// a mesh child) so its size is in plain world units; update() tracks it to the head.

const MOVEMENT_ANIMATION: Record<MovementState, string> = {
  idle: 'Player_Idle',
  walking: 'Player_Walking',
  running: 'Player_Run',
};

/** World-space height of the name label, and the gap above the model's head. */
const LABEL_WORLD_HEIGHT = 0.55;
const LABEL_HEAD_GAP = 0.3;

export class RemotePlayer {
  readonly playerId: string;
  private readonly scene: THREE.Scene;
  private readonly player: Player;
  private readonly modelId?: PlayerModelId;
  private readonly displayName: string;
  private readonly buffer = new InterpolationBuffer();
  private lastMovement: MovementState | null = null;
  private label: THREE.Sprite | null = null;
  /** World-units offset from the avatar's origin to the label, measured after load. */
  private labelOffsetY = LABEL_WORLD_HEIGHT;

  constructor(scene: THREE.Scene, playerId: string, modelId?: PlayerModelId, displayName = '') {
    this.playerId = playerId;
    this.scene = scene;
    this.modelId = modelId;
    this.displayName = displayName;
    this.player = new Player(scene);
  }

  /** Load the peer's model (adds the mesh to the scene), then attach the name label. */
  async load(): Promise<void> {
    await this.player.load(this.modelId);
    this.attachLabel();
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
    // Track the label to the head (it does not rotate with the body — a Sprite always
    // faces the camera). Kept in world space so it is unaffected by the mesh scale.
    if (this.label) {
      this.label.position.set(mesh.position.x, mesh.position.y + this.labelOffsetY, mesh.position.z);
    }
    if (s.movement !== this.lastMovement) {
      this.lastMovement = s.movement;
      this.player.playAnimation(MOVEMENT_ANIMATION[s.movement] ?? 'Player_Idle', true);
    }
  }

  /** Build the name-tag Sprite and add it to the scene above the model's head. */
  private attachLabel(): void {
    const mesh = this.player.mesh;
    if (!mesh || !this.displayName) return;
    // Measure the model so the label sits just above the actual head, whatever the
    // model's origin/scale is. setFromObject is world-space; mesh sits at its spawn.
    const box = new THREE.Box3().setFromObject(mesh);
    const headWorldY = box.max.y - mesh.position.y;
    if (Number.isFinite(headWorldY) && headWorldY > 0) {
      this.labelOffsetY = headWorldY + LABEL_HEAD_GAP;
    }
    const sprite = makeNameLabel(this.displayName);
    sprite.position.set(mesh.position.x, mesh.position.y + this.labelOffsetY, mesh.position.z);
    this.scene.add(sprite);
    this.label = sprite;
  }

  /** Remove from the scene. (Full GPU teardown is part of the P3 destroy() work.) */
  dispose(): void {
    const mesh = this.player.mesh;
    if (mesh?.parent) mesh.parent.remove(mesh);
    if (this.label) {
      this.label.parent?.remove(this.label);
      const mat = this.label.material as THREE.SpriteMaterial;
      mat.map?.dispose();
      mat.dispose();
      this.label = null;
    }
  }
}

/**
 * Render `text` to a canvas pill and wrap it in a camera-facing Sprite. The text is
 * drawn with fillText (no DOM/innerHTML), so a hostile name is just pixels. The
 * material is depth-test-off so the tag stays readable when partly behind geometry.
 */
function makeNameLabel(text: string): THREE.Sprite {
  const fontSize = 48;
  const padX = 24;
  const padY = 14;
  const font = `600 ${fontSize}px system-ui, -apple-system, Segoe UI, sans-serif`;

  // Measure with a scratch context, then size the real canvas to fit.
  const measureCanvas = document.createElement('canvas');
  const mctx = measureCanvas.getContext('2d');
  if (mctx) mctx.font = font;
  const textWidth = mctx ? mctx.measureText(text).width : text.length * fontSize * 0.6;

  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(textWidth + padX * 2);
  canvas.height = Math.ceil(fontSize + padY * 2);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(20, 20, 28, 0.62)';
    roundRect(ctx, 0, 0, canvas.width, canvas.height, 18);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter; // non-power-of-two canvas: no mipmaps
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  const aspect = canvas.width / canvas.height;
  sprite.scale.set(LABEL_WORLD_HEIGHT * aspect, LABEL_WORLD_HEIGHT, 1);
  sprite.renderOrder = 999; // draw over the world (paired with depthTest:false)
  return sprite;
}

/** Trace a rounded-rectangle path (ctx.roundRect isn't universally available). */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
