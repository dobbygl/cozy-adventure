// Transport boundary (Constitution Principle IV). The game server talks to this
// interface, never to `ws` directly, so a future move back into an iframe (or a
// different transport) is a local change. The WebSocket adapter implements it.

export type ConnectionId = string;

/** A single client connection, abstracted away from the underlying socket. */
export interface TransportConnection {
  readonly id: ConnectionId;
  /** Origin header of the upgrade request, if any (for CORS decisions/logging). */
  readonly origin: string | undefined;
  /** Send a serialized message (JSON text in v1). */
  send(data: string): void;
  /** Close the connection (optionally with a code/reason). */
  close(code?: number, reason?: string): void;
}

/** Server-side handlers the transport invokes on connection lifecycle/messages. */
export interface TransportHandlers {
  onConnection(conn: TransportConnection): void;
  onMessage(conn: TransportConnection, data: string): void;
  onClose(conn: TransportConnection): void;
}

/** A pluggable transport (WebSocket in v1). */
export interface Transport {
  /** Begin accepting connections and routing them to `handlers`. */
  start(handlers: TransportHandlers): Promise<void>;
  /** Stop accepting connections and release resources. */
  stop(): Promise<void>;
  /** The bound port (resolved after start; useful when PORT=0 in tests). */
  readonly port: number;
}
