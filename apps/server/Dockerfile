# syntax=docker/dockerfile:1
# Build context is the REPO ROOT (the server depends on the @cozy/shared
# workspace): build with `docker build -f apps/server/Dockerfile .` or via the
# docker-compose.yml (which sets context: ../..).

# --- builder: install workspace deps, bundle the server, and stage a
#     self-contained prod deployment with `pnpm deploy` ---
FROM node:24-slim AS builder
RUN corepack enable
WORKDIR /repo
# Manifests first (layer caching). All workspace manifests are copied so pnpm can
# resolve the graph; --filter limits what actually installs to server + shared.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/server/package.json ./apps/server/
COPY apps/game/package.json ./apps/game/
RUN pnpm install --frozen-lockfile --filter @cozy/server...
# Sources for shared + server only (the client is not part of the server image).
COPY packages/shared ./packages/shared
COPY apps/server ./apps/server
RUN pnpm --filter @cozy/server build
# Stage a self-contained prod deployment resolved from pnpm-lock.yaml: dist plus a
# portable node_modules. tsup inlines @cozy/shared + zod into dist, so the only
# deps actually loaded at runtime are the externalized pg/pino/ws (shared and zod
# ride along unused). `--legacy` is required since pnpm 10 for non-injected
# workspaces; it keeps a single resolver and source of truth (no second manifest).
RUN pnpm --filter @cozy/server --legacy deploy --prod /deploy

# --- runtime: minimal, non-root image with only the deployed artifact ---
FROM node:24-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy only what runs: the ESM marker (package.json "type": "module"), the
# portable node_modules and the bundle. Owned by the unprivileged `node` user.
COPY --from=builder --chown=node:node /deploy/package.json ./package.json
COPY --from=builder --chown=node:node /deploy/node_modules ./node_modules
COPY --from=builder --chown=node:node /deploy/dist ./dist
USER node
EXPOSE 8080
CMD ["node", "dist/index.js"]
