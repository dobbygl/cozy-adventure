/**
 * In-process observability counters. Exposed via GET /metrics (JSON) and
 * GET /healthz. Intentionally lightweight (no telemetry stack): enough to see
 * connected players, message throughput, relay latency and persistence health.
 */
export interface MetricsSnapshot {
  connectedPlayers: number;
  messagesIn: number;
  messagesOut: number;
  relayLatencyP50Ms: number;
  relayLatencyP95Ms: number;
  persistenceHealthy: boolean;
  uptimeMs: number;
}

const MAX_SAMPLES = 1000;

export class Metrics {
  private connectedPlayers = 0;
  private messagesIn = 0;
  private messagesOut = 0;
  private relaySamples: number[] = [];
  private persistenceHealthy = true;
  private readonly startedAt = Date.now();

  setConnectedPlayers(n: number): void {
    this.connectedPlayers = n;
  }

  incMessagesIn(n = 1): void {
    this.messagesIn += n;
  }

  incMessagesOut(n = 1): void {
    this.messagesOut += n;
  }

  recordRelayLatency(ms: number): void {
    this.relaySamples.push(ms);
    if (this.relaySamples.length > MAX_SAMPLES) this.relaySamples.shift();
  }

  setPersistenceHealthy(ok: boolean): void {
    this.persistenceHealthy = ok;
  }

  private percentile(p: number): number {
    if (this.relaySamples.length === 0) return 0;
    const sorted = [...this.relaySamples].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
    return Math.round(sorted[idx] * 100) / 100;
  }

  snapshot(): MetricsSnapshot {
    return {
      connectedPlayers: this.connectedPlayers,
      messagesIn: this.messagesIn,
      messagesOut: this.messagesOut,
      relayLatencyP50Ms: this.percentile(50),
      relayLatencyP95Ms: this.percentile(95),
      persistenceHealthy: this.persistenceHealthy,
      uptimeMs: Date.now() - this.startedAt,
    };
  }
}
