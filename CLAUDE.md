# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install deps (Vite + Three.js)
npm run dev        # Vite dev server with HMR
npm run build      # production build to dist/ (Vite, default config)
npm run preview    # serve the built dist/ locally
```

There is **no test runner, no linter, and no CI** configured yet. `package.json` only defines `dev`/`build`/`preview`. There is no `vite.config.*`; the build runs entirely on Vite defaults (`root` = repo, `publicDir` = `public/`, `outDir` = `dist/`).

A broader improvement proposal (prioritized roadmap, known bugs, scenarios) lives in `PROPUESTA-MEJORAS.md`.

## What this is

A 3D browser game (cozy survival/building) built on **Three.js 0.160.0**, plain JavaScript ESM, ~33 modules / ~18k lines in `src/`. It was **exported from an AI playground platform** (hence `src/rosieControls.js`, `src/rosieMobileControls.js`, the `playground-gateway-v2-*.run.app` URLs in `source.txt`, and the host scripts in `public/`). It is designed to run **embedded in a host page inside an iframe** and talks to `window.parent` via `postMessage`.

## Architecture (big picture)

- **Entry:** `index.html` → `src/main.js` → constructs `Game` (`src/game.js`) and drives the render loop.
- **`Game` is the orchestrator.** `init()` only wires up the menu and save UI. `startGame()` builds the 3D world and all gameplay systems. Most gameplay changes belong in `startGame()` and `update()`. `Game` composes its systems via **constructor dependency injection** (CollisionSystem, BuildingSystem, TreeChoppingSystem, etc.).
- **Frame loop:** `gameLoop()` in `main.js` calls `game.update()` then `game.render()` every `requestAnimationFrame`; `update()` is a no-op until `isGameStarted` is true.
- **World/collision:** `Environment` (`src/environment.js`) builds scene + terrain and tags colliders via `userData`; `CollisionSystem` (`src/CollisionSystem.js`) reads those tags. Collider meshes exist for hit-testing, not rendering.
- **Character:** `ThirdPersonCharacterController` (`src/CharacterController.js`) handles movement/camera; `Player` (`src/player.js`) handles animations and held items.
- **Inventory:** state in `src/inventory.js`, DOM/CSS-in-JS view in `src/inventoryUI.js`. UI reacts through callbacks like `onInventoryChange` and `onHotbarSelectionChange`.
- **Building:** `BuildableObjectsRegistry` (model definitions) + `BuildingSystem` (placement/input, the largest file) + `LevelManager` (multi-level grid) + `BuildingSaveManager` (serialize/restore by registry type). Build-mode keys (in `BuildingSystem`): `V` toggle build mode, `R` rotate, `X` switch build/delete, `C` focus selection.
- **Saving:** `src/SaveSystem.js` persists by category (player/inventory/environment/buildings/worldState).

## Conventions

- **Assets** load from `public/assets/` via GLTF/FBX loaders using **public-relative string paths** (e.g. `assets/Player_Model_New.glb`). Keep paths public-relative so they resolve under the host.
- **UI components** (`MainMenu`, `InventoryUI`, `InGameUI`, `LoadingScreen`) build their own DOM and inject their own `<style>` at runtime, then append to `document.body`. There is no central stylesheet.
- **Host integration:** `index.html` loads host scripts (`public/ChatManager.js`, `ImageGenerator.js`, `OGP.js`, `ProgressLogger.js`, `ScriptsLoader-Universal.js`) as non-module scripts with absolute paths (`/ChatManager.js`). They communicate with the host via `window.parent.postMessage` (`requestLLM`, `requestEphemeralImageGeneration`, `ogpSubmitPoints`, `logProgress`, canvas recording). `src/` code generally does not import these.

## Gotchas (non-obvious, will bite you)

- **The global game singleton is `window.gameInstance`** (assigned in `src/game.js:66`), **not** `window.game`. `src/DebugUI.js` reads `window.game` (which is never assigned), so its debug paths silently no-op. Use `window.gameInstance`; prefer passing `Game` in by constructor over reaching for the global at all.
- **Save data is intentionally stored in cookies with chunking**, not localStorage. `SaveSystem` chunks because of the ~4096-byte-per-cookie limit, falls back to `localStorage`, and uses `SameSite=None; Secure; Partitioned` for the iframe context. Do **not** "fix" this to plain localStorage/IndexedDB without first verifying storage behavior inside the host iframe (third-party storage is often partitioned or blocked there).
- **`pause()`/`resume()` do not exist on `Game`**, but `main.js` calls them guarded with `&&`, so the game never actually pauses on tab-hide and never cancels its rAF.
- **Filename casing is inconsistent** (e.g. `environment.js` lowercase vs `CharacterController.js` PascalCase on disk). Case-mismatched imports will fail on case-sensitive filesystems (Linux/CI) while silently working on macOS. Match the on-disk case exactly.
- **`three` is pinned to an exact version (`0.160.0`, no caret) on purpose.** Three.js ships breaking changes in minor releases, and `three/addons` loaders must match the core version exactly. Bump core and addons together. Note: this `three` build does **not** ship its own type declarations.
- **Inter-system ordering sometimes relies on `setTimeout`** as a sync hack (e.g. in `game.js`, `DogCompanion`, `BuildingSystem`). These are timing-fragile; if you touch initialization order, prefer awaiting the real load/init events.
