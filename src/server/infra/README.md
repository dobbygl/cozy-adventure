# Deployment / infrastructure

Two targets: a self-hosted Docker container (anyone) and the managed AWS path (NCC).
The prototype runs the Docker image on an SSH host nicknamed **openclaw**.

> **Status:** this is delivered as code + documentation. The AWS path is **not** deployed
> in this iteration (not verifiable from here). The locally-verified ceiling is "the Docker
> image builds and runs with `docker compose up`" (see `../README.md`).

## Prototype: openclaw (SSH host running Docker)

The simplest managed deploy: one container = one world, on a plain Docker host.

```bash
# on openclaw
git clone <repo> && cd cozy-adventure/src/server
cp .env.example .env        # set SERVER_PASSWORD, MAX_PLAYERS, ...
docker compose up -d --build
```

Front it with TLS (Caddy/nginx/Cloudflare) to get `wss://` — the client connects to the
public `wss://` URL. Scale by running more containers (each its own world).

## Managed AWS path (documented, not applied)

One world = one **stateful** container, so the compute is a long-lived task, **not** API
Gateway WebSocket + Lambda (which is stateless and would rehydrate the world per message).

```
client (browser, wss)
        │
   NLB (or ALB with WebSocket)         TLS termination + WS upgrade
        │
   ECS/Fargate service                 one task = one world (stateful, in-memory)
        │                              the @cozy/server image
        ├── RDS PostgreSQL             world doc by worldId, player doc by playerId (JSONB)
        ├── (optional) ElastiCache     only if cross-process coordination is ever needed
        └── CloudWatch                 structured logs (pino JSON) + /metrics scrape
```

Notes:
- **One world per task.** Horizontal scale = more tasks (more worlds), not multi-world per
  task. A world directory/registry is a future concern, out of scope here.
- **RDS PostgreSQL.** Set `DATABASE_URL` from Secrets Manager. Schema is applied on startup
  by `PostgresStore` (idempotent; mirrors `sql/001_init.sql`).
- **Health checks.** `GET /healthz` (200 ok / 503 degraded). Metrics at `GET /metrics`.
- **Origins.** Set `ALLOWED_ORIGINS` to the client's hosting origin(s); `SERVER_PASSWORD`
  for access control.

## IaC

IaC (CDK or Terraform) for the AWS stack above is a follow-up deliverable; the topology and
parameters are specified here so it can be authored without re-deciding architecture. The
container image and its configuration surface (the env table in `../README.md`) are the
stable contract either tool targets.
