# syntax=docker/dockerfile:1
# Build context is the REPO ROOT (the server depends on the @cozy/shared
# workspace): build with `docker build -f apps/server/Dockerfile .` or via the
# docker-compose.yml (which sets context: ../..).

# --- builder: install workspace deps and bundle the server ---
FROM node:20-slim AS builder
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

# --- runtime: minimal image with only the externalized runtime deps ---
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# tsup inlines @cozy/shared and our code; only pg/pino/ws stay external.
COPY apps/server/package.runtime.json ./package.json
RUN npm install --omit=dev --no-package-lock && npm cache clean --force
COPY --from=builder /repo/apps/server/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]
