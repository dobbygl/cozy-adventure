# Migración a TypeScript

Plan de migración incremental de `src/` (JavaScript ESM) a TypeScript, pensado para
ejecutarse con un **loop + goal** de Claude Code: una iteración convierte **un solo
archivo**, lo deja en verde y lo commitea. Este documento es también el **estado del
loop**: la sección [Checklist](#checklist-orden-de-prioridad) marca el progreso y permite
reanudar sin perder el hilo.

## Punto de partida (ya resuelto)

- `src/shared/rng.ts` ya está en TS y sirve de plantilla de estilo (tipos exportados, JSDoc).
- `jsconfig.json` con `allowJs`, `checkJs:false` y ahora **`strict:true` + `noImplicitAny:true`**.
- `@types/three` instalado; `typecheck`, `lint`, `test` y `build` corren en CI.
- `inventory.js` ya tiene `// @ts-check` y typedefs JSDoc (`SerializedItemStack`, `SerializedInventory`): es el mejor primer objetivo real.
- 33 módulos `.js` por convertir, ~18k líneas.

## Estrategia

1. **Orden hoja → raíz** (topológico). Se convierte un módulo solo cuando sus dependencias
   internas ya son `.ts`, de modo que el chequeo cruzado va subiendo de nivel solo.
   Un `.ts` que importa un `.js` todavía sin convertir recibe `any` (no da error).
2. **`strict:true` desde el principio.** Como `checkJs:false`, strict solo afecta a los
   `.ts`. Los `.js` sin convertir no se chequean y no pagan nada (verificado: typecheck en
   verde con strict activado). Cada renombrado debe pasar strict **al instante**, así el
   "typecheck verde" de cada iteración significa algo de verdad. No hay fase global final de
   endurecimiento (que sería el peor escenario para un loop).
3. **Una iteración = un archivo.** Atómico, verificable, commiteado. El loop lee este
   checklist, coge el siguiente sin marcar, lo convierte, deja verde, lo marca y commitea.

## Hallazgos verificados (no re-derivar)

- **Renombrar `X.js` → `X.ts` NO requiere tocar a los importadores.** Vite/esbuild y `tsc`
  resuelven un specifier `./X.js` al archivo `X.ts` automáticamente. Comprobado: renombrado
  de prueba de `compass.js` → `compass.ts` con typecheck ✓, build (36 módulos) ✓, tests ✓.
  **El loop no debe reescribir imports**; solo `git mv`.
- **`strict:true` es gratis para el código sin convertir** (ver arriba).
- `index.html` carga el bundle por `src/main.js`; Vite reescribe esa entrada. Los scripts de
  host (`/ChatManager.js`, etc.) son rutas absolutas a `public/` y **no** se migran.

## Definition of Done (por iteración)

Un archivo se da por migrado cuando:

1. `git mv src/X.js src/X.ts` (renombrar, sin tocar importadores).
2. Se tipa la **superficie pública**: clases exportadas, firmas de funciones exportadas,
   parámetros de constructor, tipos de retorno y campos de estado relevantes. Internals
   pueden quedar laxos. Aprovechar el JSDoc existente como base de los tipos.
3. Pasa **strict**. Si un punto es genuinamente difícil (DOM/Three con `strictNullChecks`),
   usar un `any` acotado o `// @ts-expect-error` **con comentario explicando por qué**.
   Nunca desactivar strict globalmente.
4. **Verde:** `npm run typecheck && npm run test && npm run build`.
5. Actualizar cualquier config que referencie la ruta `.js` antigua (p. ej.
   `vitest.config.js` → `coverage.include` lista `src/inventory.js` y `src/SaveSystem.js`
   por ruta literal; al convertirlos hay que cambiar la extensión o la cobertura los pierde
   en silencio).
6. Marcar el ítem en este checklist.
7. Commit acotado: `git add src/X.ts MIGRACION-TYPESCRIPT.md` (y la config tocada si aplica).
   **Nunca `git add -A`**: hay archivos sin trackear (`.claude/`, `.mcp.json`,
   `PROPUESTA-MULTIJUGADOR.md`) que no deben entrar. Mensaje:
   `refactor(ts): migrate X to TypeScript`.

## Checklist (orden de prioridad)

### Fase 0 — Cimientos
- [x] Commitear `jsconfig.json` (strict on) + este documento. Mensaje: `build(ts): enable strict and add migration plan`.

### Ola 1 — Núcleo de datos con tests (prueba la tubería)
- [x] `src/inventory.js` (ya tiene `@ts-check` + JSDoc + tests; primer objetivo real)
- [ ] `src/SaveSystem.js` (depende de inventory; tiene tests; actualizar `vitest.config.js`)

### Ola 2 — Hojas puras de lógica (sin deps internas)
- [x] `src/WallIntersectionHelper.js`
- [x] `src/HealthSystem.js`
- [x] `src/ResourceSystem.js`
- [x] `src/FarmingSystem.js`
- [x] `src/ItemUseSystem.js`
- [x] `src/BuildingResourceManager.js`
- [x] `src/LevelManager.js`
- [x] `src/BuildingSaveManager.js`
- [x] `src/BuildableObjectsRegistry.js`
- [x] `src/CollisionSystem.js`
- [x] `src/CharacterController.js`
- [x] `src/compass.js`
- [x] `src/ItemDropSystem.js`
- [x] `src/BuildingPreview.js`
- [x] `src/BuildingAnimations.js`

### Ola 3 — Hojas con DOM/UI pesado (más `any`, document/style)
- [x] `src/LoadingScreen.js`
- [x] `src/InGameUI.js`
- [x] `src/BuildingUI.js`
- [x] `src/inventoryUI.js` (ya tiene JSDoc)
- [x] `src/MainMenu.js`
- [x] `src/DebugUI.js` (ojo: lee `window.game` inexistente; documentar, no "arreglar" aquí)

### Ola 4 — Hojas grandes / Three pesado
- [ ] `src/player.js`
- [ ] `src/TreeChoppingSystem.js`
- [ ] `src/DogCompanion.js`

### Ola 5 — Sistemas compuestos
- [ ] `src/BuildingIntegrationSystem.js` (depende de FarmingSystem ✓)
- [ ] `src/BuildingSystem.js` (archivo más grande, 2356 líneas; sus 5 deps ya en .ts; iteración propia)
- [ ] `src/environment.js` (depende de `shared/rng` ✓)

### Ola 6 — Orquestadores (al final, ya con todo tipado debajo)
- [ ] `src/game.js` (importa ~18 módulos)
- [ ] `src/main.js`

### Ola 7 — Controles del playground (vendor; opcional, dejar para el final)
- [ ] `src/rosieMobileControls.js`
- [ ] `src/rosieControls.js` (depende de rosieMobileControls)

### Fase final — Cierre del entorno
- [ ] Convertir tests a TS: `test/inventory.test.js`, `test/saveSystem.test.js`, `test/setup.js`.
- [ ] Renombrar `jsconfig.json` → `tsconfig.json` y ajustar script `typecheck` (`tsc -p tsconfig.json`).
- [ ] ESLint: añadir `typescript-eslint` para lintar `.ts`; actualizar globs de `lint`/`format`/`coverage` a `{js,ts}`.
- [ ] Barrido final: reducir `any` provisionales y resolver `// @ts-expect-error` pendientes donde sea barato.

## Condición de fin (goal)

La migración está completa cuando **todos** los ítems del checklist están marcados **y**
`npm run typecheck && npm run test && npm run build` está en verde **y** existe `tsconfig.json`
con strict. En ese punto el loop debe detenerse y no reprogramar otra iteración.

## Notas / gotchas heredados

- El singleton global es `window.gameInstance`, no `window.game` (ver `CLAUDE.md`).
- `three` está pineado a `0.160.0` exacto; `@types/three` debe coincidir.
- No convertir a localStorage el `SaveSystem` (cookies con chunking por el contexto iframe).
- Si `ResourceSystem`/`BuildingAnimations` resultan ser código muerto (sin importadores),
  anotarlo, pero convertirlos igual salvo decisión explícita de borrarlos.
