import * as THREE from 'three';

/**
 * Owns a companion's animation mixer and clip map: clip lookup, cross-fades and
 * the semantic idle/walk/bark aliases shared by every companion. It knows nothing
 * about AI state. The brain decides WHICH semantic animation to request; the
 * animator decides which underlying clip name backs it and how to blend.
 *
 * Extracted verbatim from DogCompanion (Fase 1 of the companion decomposition):
 * the clip-name fallbacks (idle/Idle, walk/Walk/run, bark/Bark), the cross-fade
 * timings and the default-clip order (idle > Idle > T-Pose > first) are preserved
 * exactly so animation behavior does not change.
 */
export class CompanionAnimator {
  private mixer: THREE.AnimationMixer | null = null;
  private readonly actions: Record<string, THREE.AnimationAction> = {};
  private current: THREE.AnimationAction | null = null;
  private currentName: string | null = null;

  /**
   * Build from a loaded model root and its clips. With no clips (e.g. the fallback
   * box mesh, or a model that ships without animations) the animator is inert:
   * every play() returns false and update()/stop() are no-ops, matching the old
   * mixer-less branch where `this.mixer` stayed null.
   */
  constructor(root: THREE.Object3D, clips: THREE.AnimationClip[] = []) {
    if (clips.length === 0) return;
    this.mixer = new THREE.AnimationMixer(root);
    for (const clip of clips) {
      this.actions[clip.name] = this.mixer.clipAction(clip);
      console.log('Available animation:', clip.name); // Debug log
    }
  }

  /** Play the startup clip, mirroring load()'s idle > Idle > T-Pose > first order. */
  playDefault(): void {
    if (!this.mixer) return;
    if (this.actions['idle']) {
      this.play('idle');
    } else if (this.actions['Idle']) {
      this.play('Idle');
    } else if (this.actions['T-Pose']) {
      this.play('T-Pose');
    } else {
      const firstAnimation = Object.keys(this.actions)[0];
      if (firstAnimation) {
        this.play(firstAnimation);
        console.log('Playing first available animation:', firstAnimation);
      }
    }
  }

  /** Cross-fade to a clip by exact name. Returns false (and logs) when absent. */
  play(animationName: string): boolean {
    if (!this.mixer || !this.actions[animationName]) {
      console.log('Animation not found:', animationName, 'Available:', Object.keys(this.actions));
      return false;
    }

    // Don't switch if already playing the same animation
    if (this.currentName === animationName) {
      return true;
    }

    if (this.current) {
      this.current.fadeOut(0.2);
    }

    this.current = this.actions[animationName];
    this.currentName = animationName;
    this.current.reset().fadeIn(0.2).play();
    console.log('Playing animation:', animationName);
    return true;
  }

  playIdle(): boolean {
    return this.play('idle') || this.play('Idle');
  }

  playWalk(): boolean {
    return this.play('walk') || this.play('Walk') || this.play('run');
  }

  playBark(): boolean {
    return this.play('bark') || this.play('Bark');
  }

  /** Name of the clip currently playing, or null if none has started. */
  get activeName(): string | null {
    return this.currentName;
  }

  update(deltaTime: number): void {
    this.mixer?.update(deltaTime);
  }

  stop(): void {
    this.mixer?.stopAllAction();
  }
}
