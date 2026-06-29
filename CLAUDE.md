# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo layout (pnpm)

This is a **pnpm monorepo** of three workspaces (package manager pinned via the
root `packageManager` field; use pnpm, not npm):

- **`@cozy/game`** (`apps/game/`): the Three.js + Vite client/game. All the client
  modules described in this file live under `apps/game/src/` (e.g. `apps/game/src/game.ts`),
  with `index.html`, `vite.config.js`, `public/` and `test/` under `apps/game/`.
- **`@cozy/shared`** (`packages/shared/`): the **three-free, DOM-safe kernel** shared by
  game and server — the seeded rng (`rng.ts`) plus the network protocol (`protocol.ts`)
  and state shapes (`state.ts`). Consumed via the `@cozy/shared` workspace import.
- **`@cozy/server`** (`apps/server/`): the authoritative multiplayer server (no `three`);
  see `specs/002-multiplayer-server/`.

## Commands

```bash
pnpm install                       # install all workspaces
pnpm -r run typecheck              # typecheck every workspace (hard gate)
pnpm -r run test                   # run tests (game + server)
pnpm -r run build                  # build game (vite) + server (tsup)
pnpm -r run lint                   # ESLint (warn mode for game/shared)
pnpm --filter @cozy/game dev       # Vite dev server with HMR
pnpm --filter @cozy/server dev     # server (tsx watch, in-memory store, no DB needed)
```

Run a single workspace's script with `pnpm --filter @cozy/<pkg> <script>`.

CI lives in `.github/workflows/`: `ci.yml` runs `lint`, `typecheck`, `test`, and `build`
across all workspaces with pnpm; `deploy.yml` builds `@cozy/game` and publishes
`apps/game/dist` to GitHub Pages under `/play`. `apps/game/vite.config.js` sets a
**relative `base`** so the game works under a sub-path (on GitHub Pages it is served at
`/<repo>/play/`); otherwise the build stays close to Vite defaults (`publicDir` =
`apps/game/public/`, `outDir` = `apps/game/dist/`).

A broader improvement proposal (prioritized roadmap, known bugs, scenarios) lives in `docs/PROPUESTA-MEJORAS.md`; the multiplayer direction in `docs/PROPUESTA-MULTIJUGADOR.md`; the (completed) TypeScript migration log in `docs/MIGRACION-TYPESCRIPT.md`.

## Commit conventions

**Mandatory for every commit, no exceptions:**

1. **Conventional Commits.** Subject line is `type(scope): description`.
   - **type** (required): one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
   - **scope** (optional but encouraged): the area touched, e.g. `player`, `world`, `building`, `save`, `ui`, `deps`. Use a lowercase noun.
   - **description**: imperative mood, lowercase start, no trailing period.
   - Breaking changes: append `!` after the type/scope (`feat(save)!: ...`) and/or add a `BREAKING CHANGE:` footer.
2. **English, always.** The subject and body are written in English (this is required even though chat/UX copy is Spanish). Do not mix languages.
3. **Body** (optional): blank line after the subject, then wrap prose explaining the what/why. Bullets are fine.
4. **Trailer:** commits authored by Claude end with the `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` line.

Example:

```
feat(player): add a three-phase jump with takeoff-synced animation

Defer the jump impulse with a short windup so the physical takeoff lines up
with the launch frame of the Mixamo Start clip; fall back to a single clip,
then to a procedural squash, when the phase clips are absent.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

## What this is

A 3D browser game (cozy survival/building) built on **Three.js 0.185.0**, written in **TypeScript (strict) ESM**, ~33 modules / ~18k lines in `apps/game/src/` (migrated from JavaScript; see `docs/MIGRACION-TYPESCRIPT.md`). It was originally **exported from the Rosebud AI playground platform**, but the **playground/iframe coupling has been removed**: the game now runs **standalone, top-level** (Vite dev server, and the GitHub Pages `/play` build), and is an **installable PWA** (`public/manifest.webmanifest` + `public/sw.js`, registered top-level-only by `src/pwa/install.ts`). The Rosebud host scripts (`ChatManager.js`, `ImageGenerator.js`, `OGP.js`, `ProgressLogger.js`, `ScriptsLoader-Universal.js`) and their `window.parent` `postMessage` bridges have been **deleted**; `src/` never used them.

It now has an **optional server-authoritative multiplayer mode** (`@cozy/server` plus the client `net/` layer; specs 002 + 003). Single-player stays the **default** and runs fully offline with localStorage saves; the network path only activates when the player picks Multiplayer in the menu, and every network branch in `Game` is guarded by `this.network`/`sessionMode`.

## Architecture (big picture)

- **Entry:** `index.html` → `src/main.ts` → constructs `Game` (`src/game.ts`) and drives the render loop.
- **`Game` is the orchestrator.** `init()` only wires up the menu and save UI. `startGame()` builds the 3D world and all gameplay systems. Most gameplay changes belong in `startGame()` and `update()`. `Game` composes its systems via **constructor dependency injection** (CollisionSystem, BuildingSystem, TreeChoppingSystem, etc.).
- **Frame loop:** `gameLoop()` in `main.ts` calls `game.update()` then `game.render()` every `requestAnimationFrame`; `update()` is a no-op until `isGameStarted` is true.
- **World/collision:** `Environment` (`src/environment.ts`) builds scene + terrain and tags colliders via `userData`; `CollisionSystem` (`src/CollisionSystem.ts`) reads those tags. Collider meshes exist for hit-testing, not rendering.
- **Character:** `ThirdPersonCharacterController` (`src/CharacterController.ts`) handles movement/camera; `Player` (`src/player.ts`) handles animations and held items.
- **Touch input:** `src/input/` (`scheme.ts` active input scheme, `touch.ts` Pointer-Events adapter feeding the controller's analog `moveAxis` + camera, `TouchControls.ts` the DOM overlay) makes the game playable on touch. It is a thin adapter over the live controller; desktop keyboard/mouse are unchanged and the overlay shows only on touch.
- **Inventory:** state in `src/inventory.ts`, DOM/CSS-in-JS view in `src/inventoryUI.ts`. UI reacts through callbacks like `onInventoryChange` and `onHotbarSelectionChange`.
- **Building:** `BuildableObjectsRegistry` (model definitions) + `BuildingSystem` (placement/input, the largest file) + `LevelManager` (multi-level grid) + `BuildingSaveManager` (serialize/restore by registry type). Build-mode keys (in `BuildingSystem`): `V` toggle build mode, `R` rotate, `X` switch build/delete, `C` focus selection.
- **Saving:** `src/SaveSystem.ts` persists by category (player/inventory/environment/buildings/worldState).
- **Multiplayer (client):** lives in `src/net/` and is **DOM-free / three-light** (so it is unit-testable headlessly against an in-process `@cozy/server`; see `test/net/`). `NetworkSystem` is the transport (WebSocket, handshake, `avatar_state` ~15 Hz, keepalive, `sendCommand`, `AbortController` teardown). `NetworkSession` orchestrates one session: presence + relay (`RemotePlayerManager` → `RemotePlayer`, interpolated, reuses `Player`), world-sync (`ClientWorld` applies confirmed server diffs to the scene via callbacks), `reconnect()` in place, and forwards lifecycle events. `Game` builds a session in `startGame()` when given a `multiplayer` arg (connect-first, before building the world from the server seed), feeds it scene-change `worldHandlers`, samples the local avatar in `update()`, and tears it down in `destroy()`. The wire contract is shared in `@cozy/shared` (`protocol.ts` + the `worldState.ts` diff reducer the server also uses).
- **Server authority (network mode):** the world is **server-authoritative**. Mutations are **commands, applied on the confirmed event** (input → `sendCommand` → server validates → `event`/diff → `ClientWorld` → scene), never applied locally on input: `harvest_node` (TreeChoppingSystem — one hit per axe swing), `place_building` (BuildingSystem), `pickup_drop`/`drop_item` (ItemDropSystem + the `game.ts` pickup route). Resource nodes (trees, future rocks/ore) have server-authoritative **health**: `harvest_node` (which carries the node's `position`) emits `node_damaged` (remaining health) per hit and `node_depleted` on the felling hit, modeled by the data-driven `RESOURCE_NODES` registry in `@cozy/shared` (`resourceNodes.ts`) so single-player and network harvesting share one source of truth. **Harvested yield drops to the GROUND, not into the inventory** (parity with single-player): each hit's wood — plus an apple tree's apples (the `apple_tree` kind's `secondaryYield`, capped deterministically via `secondaryYieldForHit`) — is spawned as `drop_spawned` diff(s) at the node position, which every client materializes and any player then picks up. So a chop grants **no** `inventory_delta`; only the **pickup** does (a command may emit follow-on diffs via `CommandOutcome.extraDiffs`). Server-side inventory grants/charges (pickups **and the building cost**) come back as an `inventory_delta` and are applied to the local inventory. Building is fully server-authoritative: the `place_building` command carries only `registryType` + `position` + `rotation` + `level` (no client cell), and the server uses the shared buildables catalog + grid math (`@cozy/shared` `buildings.ts`, mirroring `BuildableObjectsRegistry`) to reject unknown types, derive and reserve the **entire** footprint (`BuildingState.cells`, not just the anchor), and consume the wood cost — so the client must NOT deduct it locally in network mode. Entities sync by stable `userData.networkId` (base trees by deterministic index in `net/treeIds.ts`; buildings/drops by server-allocated id), **never `mesh.uuid`**.

## Conventions

- **TypeScript is strict.** `tsconfig.json` sets `strict: true` and `noImplicitAny`. Type the public surface (exported classes, function signatures, constructor params, returns, relevant state); internals can stay loose. A scoped `any` is acceptable at genuinely hard DOM/Three boundaries; never disable strict globally. `useDefineForClassFields` is pinned to `false` so class-field semantics match how the game was authored (and keeps the bundle byte-stable).
- **Assets** load from `public/assets/` via GLTF/FBX loaders using **public-relative string paths** (e.g. `assets/Player_Model_New.glb`). Keep paths public-relative so they resolve under the deploy sub-path (`/<repo>/play/`).
- **UI components** (`MainMenu`, `InventoryUI`, `InGameUI`, `LoadingScreen`) build their own DOM and inject their own `<style>` at runtime, then append to `document.body`. There is no central stylesheet.
- **Standalone, no host bridge:** the game runs top-level (not in a playground iframe). The Rosebud host scripts and their `window.parent.postMessage` bridges (`requestLLM`, `requestEphemeralImageGeneration`, `ogpSubmitPoints`, `logProgress`, canvas recording/screenshot, the `console.error`/`window.onerror` forwarders) have been removed; `index.html` loads only `src/main.js`. If a feature ever needs LLM/image/recording, add it as a first-party module under `src/`, not as a host bridge. The PWA service worker is registered **top-level only** (`src/pwa/install.ts` returns early inside any iframe).
- **Two PWAs on one origin (landing + game).** Both the landing (`web/manifest.webmanifest` + `web/sw.js`, registered by `web/main.js`, which also shows the `beforeinstallprompt` install banner) and the game (`apps/game/public/`) are installable. The landing manifest's `start_url` is `play/` and it reuses the game's icons (`play/icon-*.png`). The two service workers (`web/sw.js` scope `/`, the game's scope `/play/`) **must share the exact same `CACHE` name** (`cozy-adventure-pwa-v1`): Cache Storage is per-origin and each `activate` deletes every cache but its own, so different names would evict each other. Bump the version in **both** files together.

## Gotchas (non-obvious, will bite you)

- **The global game singleton is `window.gameInstance`** (assigned in `src/game.ts`), **not** `window.game`. Prefer passing `Game` in by constructor over reaching for the global (e.g. `DebugUI` takes `game` by constructor injection).
- **Save data is stored in `localStorage`** (top-level origin), one key per slot: `cozyAdventure_save_<slot>` and `cozyAdventure_meta_<slot>`, each wrapped as `{value, expires}` with a 30-day expiry that every save/autosave refreshes. There is **no chunking and no cookies** anymore: chunking + `SameSite=None; Secure; Partitioned` cookies used to exist only to survive the playground iframe's partitioned third-party storage and the ~4 KB per-cookie limit; both went away when the game left the iframe (see `SaveSystem.ts` `setLocalStorage`/`getLocalStorage`). Saves from the old cookie build are **not** migrated.
- **`pause()`/`resume()` exist on `Game`** and freeze the update path (set `isPaused`, stop the `THREE.Clock`, pause wave animation); `main.ts` calls them on tab-hide via `visibilitychange`. Note the `requestAnimationFrame` loop in `main.ts` is **not** cancelled, so `render()` keeps drawing the (now static) scene while paused. **In network mode `pause()` is a no-op** (a shared world cannot freeze; the keepalive keeps the player present) — a documented deviation from Constitution Principle I, network-mode only.
- **In network mode, do NOT mutate shared-world state on input.** The systems that mutate the world (BuildingSystem placement, TreeChoppingSystem, ItemDropSystem, the `game.ts` pickup route) take a guarded network branch that emits a command and returns; the change is applied only when the server's confirmed event arrives (via `ClientWorld` → `worldHandlers`). If you add a world mutation, wire both paths: local (mutate directly) and network (command → apply on event), or you will desync clients.
- **Filename casing is inconsistent** (e.g. `environment.ts` lowercase vs `CharacterController.ts` PascalCase on disk). Case-mismatched imports will fail on case-sensitive filesystems (Linux/CI) while silently working on macOS. Match the on-disk case exactly. Renaming `./X.js` → `X.ts` does not require touching importers: Vite and `tsc` resolve a `./X.js` specifier to `X.ts`.
- **`three` is pinned to an exact version (`0.185.0`, no caret) on purpose.** Three.js ships breaking changes in minor releases, and `three/addons` loaders must match the core version exactly. Bump core and addons together. `three` ships **no** type declarations; types come from `@types/three`, kept in lockstep with the core version.
- **Inter-system ordering sometimes relies on `setTimeout`** as a sync hack (e.g. in `game.ts`, `DogCompanion`, `BuildingSystem`). These are timing-fragile; if you touch initialization order, prefer awaiting the real load/init events.

<!-- SPECKIT START -->
Multiplayer specs: `specs/002-multiplayer-server/` (authoritative server, one world per process) and `specs/003-multiplayer-client/` (the client refactor, fused onto the 002 branch). Both are **implemented and merged to `main`** (P1 presence/relay, P2 shared world via commands, P3 reconnect/teardown); CI and Pages deploy are green. The repo is a pnpm monorepo of three workspaces: `@cozy/game` (`apps/game/`, client), `@cozy/shared` (`packages/shared/`, three-free kernel) and `@cozy/server` (`apps/server/`). Verification ceiling: the network layer is proven headless and P1 was playtested; the P2/P3 scene/DOM behavior and single-player no-regression still want a browser playtest (see `specs/003-multiplayer-client/tasks.md` status note). For deeper context read those specs' `plan.md` / `research.md` / `data-model.md` / `contracts/`.
<!-- SPECKIT END -->
