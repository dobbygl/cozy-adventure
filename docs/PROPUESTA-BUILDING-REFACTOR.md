# Propuesta: descomponer `BuildingSystem.ts`

Plan para trocear el objeto-Dios del sistema de construcción y dejarlo en un estado
fácil de ampliar. Es el "punto 6" del repaso de calidad del building system (los puntos
1-5, ya hechos: borrar `BuildingUI.ts` muerto, factoría de malla unificada, dedup de la
matemática de huella, quitar `getObjectCellSize`, y colapsar el catálogo en `@cozy/shared`).

## Estado actual (verificado en el código, junio 2026)

`apps/game/src/BuildingSystem.ts` son ~2530 líneas y ~70 métodos con 8+ responsabilidades
mezcladas (input/raycast, preview, colocación, borrado, partículas, DOM/UI, recursos,
debug, red, helpers de guardado). Además, el subsistema arrastra **tres extracciones
previas a medio cablear**, que es la pista de por qué cuesta tanto tocarlo:

- **`BuildingPreview.ts` (273 líneas): muerto.** Nunca se importa ni instancia;
  `BuildingSystem` corre su propio preview inline. Mismo patrón que el difunto `BuildingUI.ts`.
- **`WallIntersectionHelper.ts` (74 líneas): import muerto.** Importado, jamás instanciado.
- **`BuildingResourceManager.ts`: split-brain.** Instanciado y usado solo dentro de
  `updatePreview`, mientras que `buildWall`, el break y la UI usan los métodos de recursos
  **inline** de `BuildingSystem`. Dos implementaciones de recursos vivas en paralelo.

Y no hay red: **ningún test importa `BuildingSystem`**. `BuildingSaveManager`, `SaveSystem`,
`net/ClientWorld` y `DebugUI` hurgan su estado mutable (`builtWalls`/`occupiedCells`/
`cellToWallMap`) directamente.

## Por qué fracasaron los intentos previos

Las tres extracciones se quedaron huérfanas por lo mismo: el estado mutable compartido
está leído/escrito por casi todo el archivo, y sin tests nadie terminó de cablear y borrar
la copia inline. El plan se diseña para no repetirlo.

## Principios

1. Cada fase es behaviour-preserving, shippable y verificable sola (typecheck + build +
   lint + smoke manual). Un commit por fase.
2. Cada extracción termina **completa**: `BuildingSystem` delega y se borra la copia inline.
   Cero huérfanos nuevos, y se limpian los tres existentes.
3. Red de seguridad primero (Fase 0): las rutas son THREE/DOM y no son testeables headless,
   así que se cubre con (a) un checklist de smoke manual y (b) tests de la lógica pura.
4. Preservar siempre las dos rutas, local vs red, en colocación y borrado.
5. Consolidar el estado compartido (un objeto de tracking) **antes** de extraer los
   controladores: es el acoplamiento que tumbó los intentos previos.

## Fases (riesgo ascendente)

| Fase | Qué | Riesgo | Estado |
|---|---|---|---|
| 0. Red de seguridad | Checklist de smoke + tests de lógica pura (footprint/celdas, recursos). | bajo | ✅ hecha |
| 1. Reconciliar huérfanos | Borrar `BuildingPreview.ts` y `WallIntersectionHelper.ts`; hacer de `BuildingResourceManager` el único dueño de recursos y borrar los métodos inline. | bajo | ✅ hecha |
| 2. Efectos/animaciones | Adoptado el módulo `BuildingAnimations` (4º huérfano, ya existía completo) en vez de crear `BuildEffects`: `BuildingSystem` delega colocación/destrucción y partículas, y se borra el código inline + el estado `animatingWalls`/`particleSystems`. | bajo | ✅ hecha (verificar *sensación* de animación en playtest: el módulo difiere del inline en pooling y compleción por Promesa) |
| 3. `BuildHUD` (DOM) | Extraído el menú de selección + thumbnails 3D, el banner de modo/coste y el floating text a `BuildHUD`, con el host tipado como `BuildingSystem` (typecheck caza cualquier prefijo mal). `BuildingSystem` baja a ~1410 líneas y mantiene stubs finos. Se extrajo el inline VIVO (no se adoptó el `BuildingUI.ts` borrado: estaba divergido en ambos sentidos). | medio | ✅ hecha (DOM no testeable headless; el menú es la superficie más densa, exprimirlo en el playtest) |
| 4. `BuildTracking` (estado) | `BuildTracking` **coordina** (no re-posee): tiene `builtWalls`, delega ocupación→`LevelManager` y por-tipo→`Registry`. Único camino de ESCRITURA; todas las escrituras (buildWall, break, materialize/remove, save-restore, clear) pasan por él. Lecturas externas (`DebugUI`, serialize) vía getters. `ClientWorld` resultó NO ser poker (usa su propio `state`). 6 tests unitarios (incluido el caso multinivel). | medio-alto | ✅ hecha |
| 5. Wire `BuildingPreview` | Re-extraer el preview sobre `BuildTracking`; borrar la copia inline. | medio | pendiente |
| 6. `PlacementController` | `buildWall` + validación + `requestPlace` + `materializeNetworkBuilding`. | alto | pendiente |
| 7. `BreakController` | `deleteWall`/`breakObject`/`completeWallBreak` + `requestRemove` + `removeNetworkBuilding`. | alto | pendiente |
| 8. `BuildInput` + adelgazar | Listeners → despacho a controladores. `BuildingSystem` queda como orquestador (~300-400 líneas). | medio | pendiente |

Mejor ratio: Fases 0-3 (limpian huérfanos, DOM y efectos sin tocar la lógica de colocación,
que es el núcleo de riesgo). 4-8 son el grueso y se hacen con el checklist de Fase 0 en mano.

## Checklist de smoke manual (Fase 0)

Tras cada fase, en navegador. Single-player salvo donde diga multi.
**Estado:** playtest acumulado de las Fases 1-3 (+ el fix de demolición y los puntos 1-5) ejecutado y OK.

**Colocación**
1. Entrar en modo construcción (V); el preview sigue al jugador y al cursor.
2. Colocar cada tipo (wall, spiked wall, floor, ramp, farming plot); se descuenta la madera.
3. Rotar (R) un muro y un farming plot (multi-celda) y colocarlos; el preview y la pieza final coinciden.
4. Intentar colocar sin madera suficiente: aparece el aviso "Not enough resources" siguiendo el cursor y NO se coloca.
5. Intentar solapar dos piezas y solapar al jugador: se rechaza (preview en rojo).

**Niveles**
6. Subir/bajar de nivel y colocar en cada uno; las celdas de un nivel no chocan con las de otro.

**Borrado**
7. Cambiar a modo borrar (X), apuntar a una pieza (preview naranja) y romperla: animación + partículas, y devuelve ~mitad de madera con floating text.
8. Romper algo con el inventario lleno: floating text de "Inventory Full".

**Guardado**
9. Colocar varias piezas (incluida una multi-celda rotada), guardar, recargar: reaparecen en sitio y orientación correctos, y al intentar solapar su huella se rechaza.

**Animaciones (tras adoptar `BuildingAnimations` en Fase 2)**
12. La colocación rebota (escala + caída) y la destrucción se encoge/desvanece con partículas, igual que antes. Romper varias piezas seguidas no deja partículas colgadas ni bloquea el romper (pooling y set de "animando" del módulo nuevo).

**Multijugador** (dos clientes)
10. A coloca: B lo ve aparecer. A borra: B lo ve desaparecer y A puede reconstruir en el hueco.
11. Picar un árbol y recoger; la madera entra al inventario y el coste de construir se cobra en servidor.

## Gotchas a respetar (de CLAUDE.md)

Los `setTimeout` de sincronización; los debug indicators; `window.gameInstance` (no `window.game`);
la ruta dual de red (no mutar estado de mundo en input en modo red); que cada UI inyecta su
propio `<style>` (no hay hoja central); el casing exacto de ficheros en imports.

## Deuda conocida (backlog, no bloquea fases)

- **Fuga de contextos WebGL en los thumbnails del menú.** `BuildHUD.create3DPreview` crea un `THREE.WebGLRenderer` por buildable y nunca lo desecha, y `showSelectionScreen` re-ejecuta `initializeSelectionPreviews` en cada refresco (incluido cada `selectBuildObject`). Cada refresco filtra ~5 contextos hacia el límite del navegador (~16). Es preexistente (la Fase 3 lo movió tal cual, no lo introdujo). Fix futuro: un `BuildHUD.destroy()` / desechar-antes-de-recrear.
- **Ocupación de guardado siempre en el nivel actual (multinivel).** En la Fase 4 se descubrió que el "baile" de nivel de `SaveSystem.registerRestoredBuilding` (poner `currentLevel = building.level`) era **código muerto**: operaba sobre `gameInstance.levelManager`, que nunca se asigna, así que corría el fallback al nivel actual. Resultado real (preexistente, preservado): tanto la restauración de guardado como el materialize de red reservan celdas en el nivel actual, ignorando el nivel guardado del edificio. Fix futuro: pasar el nivel explícito a `BuildTracking` y darle a `LevelManager` una escritura por-nivel.
- **Recuperar `BuildingPreview.ts` para la Fase 5** (ver nota de fase): se borró en la Fase 1 como muerto; al preferir adoptar huérfanos, conviene recuperarlo del historial en vez de rehacerlo.

## Resultado objetivo

`BuildingSystem` como orquestador de ~300-400 líneas que construye y cablea subsistemas
enfocados (`BuildEffects`, `BuildHUD`, `BuildTracking`, `BuildingPreview`,
`PlacementController`, `BreakController`, `BuildInput`), con la lógica pura cubierta por tests.
