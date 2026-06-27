import type { WorldClockState } from '@cozy/shared';

const DAY_MS = 86_400_000;

/**
 * Authoritative world time. Advances with the server's monotonic real time
 * (the caller passes elapsed deltas), never with client timestamps. The world
 * is never paused (Constitution Principle I / FR-025): the server keeps ticking
 * even when clients hide their tab.
 */
export class WorldClock {
  private gameTime: number;
  private dayTime: number;
  private weather: string;

  constructor(init: Partial<WorldClockState> = {}) {
    this.gameTime = init.gameTime ?? 0;
    this.dayTime = ((init.dayTime ?? 0) % DAY_MS + DAY_MS) % DAY_MS;
    this.weather = init.weather ?? 'clear';
  }

  /** Advance the clock by `deltaMs` of real elapsed time. */
  tick(deltaMs: number): void {
    if (deltaMs <= 0) return;
    this.gameTime += deltaMs;
    this.dayTime = (this.dayTime + deltaMs) % DAY_MS;
  }

  snapshot(): WorldClockState {
    return { dayTime: this.dayTime, gameTime: this.gameTime, weather: this.weather };
  }
}
