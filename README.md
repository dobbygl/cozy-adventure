# Cozy Adventure

A 3D browser game (cozy survival/building) built with [Three.js](https://threejs.org/) and bundled with [Vite](https://vite.dev/). It is designed to run embedded in a host page (iframe) and communicates with the host via `postMessage`.

## Requirements

- Node.js >= 20 (see `.nvmrc`; run `nvm use` if you use nvm)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (HMR) at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/ locally
```

There is no test runner or linter configured yet.

## Architecture

`index.html` loads `src/main.js`, which constructs `Game` (`src/game.js`) and drives the render loop. `Game` is the orchestrator: `init()` wires up the menu and save UI, while `startGame()` builds the 3D world and all gameplay systems (environment/collision, character/player, inventory, building, saving). The global game instance is exposed as `window.gameInstance`.

For deeper architecture notes and gotchas, see `CLAUDE.md`. For a prioritized list of improvements, see `PROPUESTA-MEJORAS.md`.
