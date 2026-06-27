# @cozy/server — cozy-adventure multiplayer server

Authoritative, single-world multiplayer server (one world per process, dedicated-server
model à la Valheim/Minecraft). Part of the pnpm monorepo; depends on `@cozy/shared`
(wire protocol + state types + seeded rng) and never on `three`.

## Run it (no database needed)

From the repo root:

```bash
pnpm install
pnpm --filter @cozy/server dev      # tsx watch, in-memory store
```

The server listens on `ws://localhost:8080` and serves `GET /healthz` and `GET /metrics`.
With no `DATABASE_URL` it uses a non-durable in-memory store — perfect for dev and tests.

## Self-host with Docker + PostgreSQL

```bash
cd src/server
docker compose up --build
```

This starts PostgreSQL and the server (which applies its schema on startup). Share the
server's URL with players; if you set `SERVER_PASSWORD`, share that too. Anyone with a
compatible client joins by entering the URL (and password).

To build just the image (context is the repo root because the server bundles `@cozy/shared`):

```bash
docker build -f src/server/Dockerfile -t cozy-server .
```

## Configuration (environment)

See `.env.example`. All values have defaults; nothing is required.

| Var | Default | Meaning |
|---|---|---|
| `PORT` | 8080 | WS/HTTP port. |
| `SERVER_PASSWORD` | (empty) | If set, clients must supply it in `join`; empty = open server. |
| `DATABASE_URL` | (empty) | PostgreSQL connection string; empty = in-memory store. |
| `WORLD_ID` | `default` | Identity of this process's single world. |
| `MAX_PLAYERS` | 8 | Concurrent player cap. |
| `ALLOWED_ORIGINS` | `*` | CORS/origin allowlist (comma-separated) or `*`. |
| `AVATAR_TICK_HZ` | 15 | Avatar relay frequency. |
| `SAVE_INTERVAL_MS` | 30000 | Periodic world/player save interval. |
| `RECONNECT_WINDOW_MS` | 30000 | How long a disconnected player's live state is kept for a clean reconnect. |
| `KEEPALIVE_TIMEOUT_MS` | 60000 | Silence before a connection is dropped (a keepalive resets it). |

## Architecture (one screen)

- **Two channels**: avatars (continuous, client-authoritative transform/movement/held-item
  relayed at ~15 Hz with speed + anti-teleport sanity) and world (discrete commands →
  validate → apply once → broadcast event). They never mix.
- **World** = canonical seed + ordered diffs. Clients regenerate the base world from the
  seed; the server arbitrates every mutation (no double-chop, one build per cell, one drop
  owner). Stable `networkId`s; dynamic ids reserved above `1_000_000` to stay disjoint from
  seed-deterministic base trees.
- **Persistence** behind a `Store` interface: `MemoryStore` (dev/test) and `PostgresStore`
  (JSONB documents). Saves periodically, on last-player-leave, and on graceful shutdown.
- **Transport** isolated behind a `Transport` boundary (so re-embedding in an iframe stays
  a local change).

## Quality gates

```bash
pnpm --filter @cozy/server typecheck   # tsc --noEmit (strict)
pnpm --filter @cozy/server test        # vitest (MockClient-driven integration + unit)
pnpm --filter @cozy/server lint
pnpm --filter @cozy/server build       # tsup -> dist/index.js (self-contained ESM)
```

The wire protocol is the contract the client (spec 003) conforms to; see
`specs/002-multiplayer-server/contracts/protocol.md`.
