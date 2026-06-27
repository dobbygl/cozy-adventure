# syntax=docker/dockerfile:1
# Build context is the REPO ROOT (the server depends on the @cozy/shared
# workspace): build with `docker build -f src/server/Dockerfile .` or via the
# docker-compose.yml (which sets context: ../..).

# --- builder: install workspace deps and bundle the server ---
FROM node:20-slim AS builder
RUN corepack enable
WORKDIR /repo
# Manifests first (layer caching). All workspace manifests are copied so pnpm can
# resolve the graph; --filter limits what actually installs to server + shared.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY src/shared/package.json ./src/shared/
COPY src/server/package.json ./src/server/
COPY src/game/package.json ./src/game/
RUN pnpm install --frozen-lockfile --filter @cozy/server...
# Sources for shared + server only (the client is not part of the server image).
COPY src/shared ./src/shared
COPY src/server ./src/server
RUN pnpm --filter @cozy/server build

# --- runtime: minimal image with only the externalized runtime deps ---
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# tsup inlines @cozy/shared and our code; only pg/pino/ws stay external.
COPY src/server/package.runtime.json ./package.json
RUN npm install --omit=dev --no-package-lock && npm cache clean --force
COPY --from=builder /repo/src/server/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.js"]
