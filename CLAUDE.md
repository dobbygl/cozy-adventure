# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install deps (Vite + Three.js)
npm run dev        # Vite dev server with HMR
npm run build      # production build to dist/
npm run preview    # serve the built dist/ locally
npm run typecheck  # tsc -p tsconfig.json (strict, noEmit)
npm run test       # Vitest run (also: test:watch, coverage)
npm run lint       # ESLint (lint:fix autofixes); format / format:check use Prettier
```

CI lives in `.github/workflows/`: `ci.yml` runs `lint`, `typecheck`, `test`, and `build`; `deploy.yml` publishes the build. `vite.config.js` sets a **relative `base`** so the game works under a sub-path (on GitHub Pages it is served at `/<repo>/play/`); otherwise the build stays close to Vite defaults (`publicDir` = `public/`, `outDir` = `dist/`).

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

A 3D browser game (cozy survival/building) built on **Three.js 0.185.0**, written in **TypeScript (strict) ESM**, ~33 modules / ~18k lines in `src/` (migrated from JavaScript; see `docs/MIGRACION-TYPESCRIPT.md`). It was **exported from an AI playground platform** (hence the host scripts in `public/`). It is designed to run **embedded in a host page inside an iframe** and talks to `window.parent` via `postMessage`, and also runs standalone via the Vite dev server.

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

## Conventions

- **TypeScript is strict.** `tsconfig.json` sets `strict: true` and `noImplicitAny`. Type the public surface (exported classes, function signatures, constructor params, returns, relevant state); internals can stay loose. A scoped `any` is acceptable at genuinely hard DOM/Three boundaries; never disable strict globally. `useDefineForClassFields` is pinned to `false` so class-field semantics match how the game was authored (and keeps the bundle byte-stable).
- **Assets** load from `public/assets/` via GLTF/FBX loaders using **public-relative string paths** (e.g. `assets/Player_Model_New.glb`). Keep paths public-relative so they resolve under the host.
- **UI components** (`MainMenu`, `InventoryUI`, `InGameUI`, `LoadingScreen`) build their own DOM and inject their own `<style>` at runtime, then append to `document.body`. There is no central stylesheet.
- **Host integration:** `index.html` loads host scripts (`public/ChatManager.js`, `ImageGenerator.js`, `OGP.js`, `ProgressLogger.js`, `ScriptsLoader-Universal.js`) as non-module scripts with absolute paths (`/ChatManager.js`). They communicate with the host via `window.parent.postMessage` (`requestLLM`, `requestEphemeralImageGeneration`, `ogpSubmitPoints`, `logProgress`, canvas recording). `src/` code generally does not import these, and they are **not** migrated to TypeScript.

## Gotchas (non-obvious, will bite you)

- **The global game singleton is `window.gameInstance`** (assigned in `src/game.ts`), **not** `window.game`. Prefer passing `Game` in by constructor over reaching for the global (e.g. `DebugUI` takes `game` by constructor injection).
- **Save data is intentionally stored in cookies with chunking**, not localStorage. `SaveSystem` chunks because of the ~4096-byte-per-cookie limit, falls back to `localStorage`, and uses `SameSite=None; Secure; Partitioned` for the iframe context. Do **not** "fix" this to plain localStorage/IndexedDB without first verifying storage behavior inside the host iframe (third-party storage is often partitioned or blocked there).
- **`pause()`/`resume()` exist on `Game`** and freeze the update path (set `isPaused`, stop the `THREE.Clock`, pause wave animation); `main.ts` calls them on tab-hide via `visibilitychange`. Note the `requestAnimationFrame` loop in `main.ts` is **not** cancelled, so `render()` keeps drawing the (now static) scene while paused.
- **Filename casing is inconsistent** (e.g. `environment.ts` lowercase vs `CharacterController.ts` PascalCase on disk). Case-mismatched imports will fail on case-sensitive filesystems (Linux/CI) while silently working on macOS. Match the on-disk case exactly. Renaming `./X.js` → `X.ts` does not require touching importers: Vite and `tsc` resolve a `./X.js` specifier to `X.ts`.
- **`three` is pinned to an exact version (`0.185.0`, no caret) on purpose.** Three.js ships breaking changes in minor releases, and `three/addons` loaders must match the core version exactly. Bump core and addons together. `three` ships **no** type declarations; types come from `@types/three`, kept in lockstep with the core version.
- **Inter-system ordering sometimes relies on `setTimeout`** as a sync hack (e.g. in `game.ts`, `DogCompanion`, `BuildingSystem`). These are timing-fragile; if you touch initialization order, prefer awaiting the real load/init events.

<!-- SPECKIT START -->
Active feature plan: `specs/001-touch-controls/plan.md` (touch controls for mobile).
For additional context about technologies, project structure, and design
decisions, read that plan and its `research.md` / `data-model.md` / `contracts/`.
<!-- SPECKIT END -->
