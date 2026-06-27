<div align="center">

<img src="web/assets/icon.png" alt="Cozy Adventure" width="132" />

# Cozy Adventure

*A cozy 3D survival and building game that runs right in your browser.*

![Three.js](https://img.shields.io/badge/Three.js-0.160.0-000000?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=node.js&logoColor=white)

[Features](#features) • [Getting started](#getting-started) • [Controls](#controls) • [Development](#development) • [Architecture](#architecture) • [Roadmap](#roadmap)

</div>

<img src="web/assets/cover.jpg" alt="Cozy Adventure cover" width="100%" />

Cozy Adventure is a relaxed survival and building game set on a sunny low-poly island. Chop trees, gather resources, farm, build a home on a snapping grid, and explore with a friendly dog at your side. It is built with [Three.js](https://threejs.org/), written in TypeScript, and bundled with [Vite](https://vite.dev/), so the whole thing runs in a browser with no plugins.

> [!NOTE]
> This game was originally exported from an AI playground platform. It is designed to run **embedded in a host page inside an iframe** and talks to its host through `window.parent` `postMessage`. It also runs locally via the Vite dev server (`npm run dev`).

## Features

- **Explore and gather:** Roam a hand-built island in third person, chop trees, and collect resources.
- **Modular building:** Place walls, floors, and ramps on a snapping grid, across multiple levels, with a live placement preview.
- **Farming:** Plant, grow, and harvest crops to keep your supplies stocked.
- **Dog companion:** A loyal low-poly dog follows you around and reacts to the world.
- **Inventory and hotbar:** Manage what you carry, equip held items, and drop or use them.
- **Health and survival:** A health system tracks your wellbeing as you play.
- **Persistent saves:** Your world, inventory, and buildings are saved and restored between sessions.
- **Compass and HUD:** Lightweight in-game UI keeps you oriented without getting in the way.
- **Desktop and mobile controls:** Keyboard and mouse on desktop, touch controls on mobile.

## Getting started

> [!IMPORTANT]
> Requires **Node.js >= 20**. If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to match the version in `.nvmrc`.

```bash
npm install      # install dependencies (Vite + Three.js)
npm run dev      # start the dev server with HMR at http://localhost:5173
npm run build    # produce a production build in dist/
npm run preview  # serve the built dist/ locally
```

Open the dev server URL in your browser, start a new game from the menu, and you are on the island.

## Controls

| Action | Input |
| --- | --- |
| Move | `W` `A` `S` `D` |
| Run | `Shift` |
| Look / aim camera | Mouse |
| Interact / chop / harvest | `E` |
| Toggle build mode | `V` |
| Rotate placement | `R` |
| Switch between build and delete | `X` |
| Center on current selection | `C` |
| Exit build mode / close panels | `Esc` |

> [!TIP]
> Press `V` at any time to enter build mode, then `X` to flip between placing and removing pieces. On touch devices the on-screen controls replace the keyboard.

## Development

The project is plain TypeScript ESM with a small toolchain. The quality gates are expected to stay green before changes land.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot module replacement |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Run ESLint (`lint:fix` to autofix) |
| `npm run format` | Format with Prettier (`format:check` to verify) |
| `npm run typecheck` | Type-check with `tsc` (strict mode) |
| `npm test` | Run the Vitest suite (`test:watch`, `coverage`) |

> [!WARNING]
> `three` is pinned to an exact version (`0.160.0`). Three.js ships breaking changes in minor releases and `three/addons` loaders must match the core version exactly, so bump core and addons together.

## Project structure

```text
cozy-adventure/
├─ index.html              # entry; loads src/main.ts and host scripts
├─ src/                    # game source (TypeScript ESM, ~33 modules)
│  ├─ game.ts              # Game orchestrator (composes systems via DI)
│  ├─ main.ts              # bootstraps Game and drives the render loop
│  ├─ environment.ts       # scene, terrain, and colliders
│  ├─ CharacterController.ts, player.ts        # movement, camera, animations
│  ├─ BuildingSystem.ts, LevelManager.ts, ...  # placement, grid, save/restore
│  ├─ TreeChoppingSystem.ts, FarmingSystem.ts  # gathering and farming
│  ├─ DogCompanion.ts, HealthSystem.ts         # companion and survival
│  ├─ inventory.ts, inventoryUI.ts, InGameUI.ts# inventory, HUD
│  ├─ SaveSystem.ts        # persistence across sessions
│  └─ shared/rng.ts        # seeded, deterministic random
├─ public/                 # host integration scripts and game assets
├─ web/                    # standalone landing page and art
└─ scripts/                # asset and art generation tooling
```

## Architecture

`index.html` loads `src/main.ts`, which constructs `Game` (`src/game.ts`) and drives the render loop via `requestAnimationFrame`. `Game` is the orchestrator: `init()` wires up the menu and save UI, while `startGame()` builds the 3D world and every gameplay system. Systems are composed through **constructor dependency injection** (collision, building, tree chopping, farming, inventory, saving), and the global game instance is exposed as `window.gameInstance`.

The world and its colliders are built by `Environment`, tagged via `userData`, and read back by `CollisionSystem`. Saving is split by category (player, inventory, environment, buildings, world state) and persisted with chunking to fit storage limits inside the host iframe.

> [!NOTE]
> For the full architecture notes, conventions, and non-obvious gotchas, see [`CLAUDE.md`](CLAUDE.md). For the prioritized improvement roadmap and known issues, see [`PROPUESTA-MEJORAS.md`](PROPUESTA-MEJORAS.md).

## Roadmap

The project is moving toward a **persistent co-op multiplayer** experience: small groups sharing a world that lives on a server between sessions, deployed standalone (outside the playground iframe) on self-managed AWS. The world becomes server-authoritative, which is why world generation is already deterministic (seeded RNG in `src/shared/rng.ts`). See `PROPUESTA-MULTIJUGADOR.md` for the direction.

## Resources

- [Three.js documentation](https://threejs.org/docs/)
- [Vite guide](https://vite.dev/guide/)
- [`CLAUDE.md`](CLAUDE.md): architecture, conventions, and gotchas
- [`PROPUESTA-MEJORAS.md`](PROPUESTA-MEJORAS.md): improvement roadmap and known bugs
