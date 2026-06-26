# Propuesta de mejora del repositorio "cozy-adventure"

## Resumen ejecutivo

Este informe parte de una aclaración que conviene dejar por delante para no vender humo. El encargo pedía "evaluar usar Vite", pero Vite ya está integrado y funcionando: `npm install` y `npm run build` salen con código 0, el bundle se genera correctamente. Lo que no existe es un `vite.config.*` (el build usa los valores por defecto). Así que la pregunta real no es "¿migramos a Vite?", sino "¿qué configuración explícita le falta a un Vite que ya está ahí?". Lo mismo pasa con varias cosas que se intuyen pendientes: el repo ya aplica buenos patrones en algunos sitios (descomposición por responsabilidad en el subsistema de construcción, inyección de dependencias en el constructor de `Game`, el pin exacto de `three`), solo que de forma desigual.

La segunda pieza del marco es la priorización, y aquí la honestidad pesa más que la exhaustividad. El código viene exportado de un playground de IA, vive en una ruta `/dobbygl/` y el git user es `dobbygl`, no un correo corporativo de NCC. Esas señales apuntan a prototipo o experimento personal más que a producto mantenido. No es una certeza, así que el informe no decide por el lector: plantea dos escenarios y prioriza distinto en cada uno.

- Escenario A, prototipo o experimento personal: minimizar inversión. Unos pocos quick wins de robustez y de developer experience, y poco más. Migrar las ~17,9k líneas a TypeScript o cubrirlas de tests es mala inversión cuando el coste de mantenimiento lo paga una sola persona que ya tiene el modelo mental completo.
- Escenario B, producto que se va a mantener y evolucionar: las apuestas grandes se amortizan. TypeScript incremental, base de tests, refactor de los monolitos, CI y pre-commit dejan de ser opcionales en cuanto entra una segunda persona a tocar el código.

Hay un tercer bloque que no depende de esa distinción: la robustez y el rendimiento. El juego no se pausa al ocultar la pestaña, la animación del agua recomputa normales de 16k vértices por frame sin parada, hay ~108 colliders invisibles generando draw calls y las animaciones del jugador se cargan en serie bloqueando el arranque. Eso degrada la experiencia de jugar en cualquier escenario y conviene atacarlo siempre.

Sobre el guardado en cookies: no se trata como bug. El `SaveSystem` ya usa chunking porque hay un tope duro de 4096 bytes por cookie, ya tiene fallback a `localStorage` y usa `SameSite=None;Secure;Partitioned`. La acción correcta es verificar el comportamiento de storage dentro del iframe del host antes de prescribir una migración a IndexedDB, no asumir que la elección de cookies está mal.

## Estado actual (diagnóstico)

Juego 3D de navegador con Three.js 0.160.0 y Vite 7, ~17,9k líneas en 33 módulos ESM de JavaScript plano. Corre embebido en una página host (iframe) y se comunica con `window.parent` vía `postMessage`. Números que marcan el terreno:

| Señal | Dato |
|---|---|
| Módulos en `src/` | 33 |
| Líneas totales | ~17,9k |
| Monolitos (>800 líneas) | BuildingSystem 2356, inventoryUI 1654, SaveSystem 1430, DogCompanion 1339, player 1020, MainMenu 956, TreeChoppingSystem 831, game 787 |
| Llamadas `console.*` | ~600 (478 log, 64 error, 58 warn) |
| Estado global | `window.gameInstance` (39 lecturas) + `window.game` (15, nunca se asigna) |
| `vite.config.*` | No existe |
| ESLint / Prettier / editorconfig | No existen |
| TypeScript / tsconfig / jsconfig | No existen |
| Tests / Vitest / CI | No existen |
| `addEventListener` vs `removeEventListener` | 88 vs 7 |

La base arquitectónica es razonable. `game.js` orquesta y compone los sistemas por inyección de dependencias, y el subsistema de construcción ya está bien troceado (LevelManager, BuildingSaveManager, BuildingResourceManager, BuildableObjectsRegistry, BuildingAnimations). El problema es que ese patrón de "trocear por responsabilidad" no se aplicó de forma uniforme: conviven módulos pequeños y limpios (HealthSystem 88, compass 65) con monolitos que mezclan render, DOM, CSS y estado global. La calidad funciona, la mantenibilidad a medio plazo es frágil.

El único documento de calidad es `.github/copilot-instructions.md`, bien escrito pero ya desincronizado: cita `src/Environment.js` y `src/CharacterController.js` con mayúscula inicial cuando en disco el fichero es `environment.js` en minúscula. El import real en `src/game.js` es correcto, así que es deuda de documentación, no un bug.

## Marco de priorización

Las dos columnas que verás en cada mejora, esfuerzo e impacto, vienen heredadas del análisis técnico por dimensión, no son reinterpretaciones. La columna de prioridad de la tabla final sí es síntesis de este informe y se deriva de la hoja de ruta:

- P0: quick wins de coste bajo que arreglan bugs, cierran roturas o mejoran la jugabilidad ya. Aplican casi siempre, incluso en prototipo.
- P1: trabajo de base barato que paga pronto si hay más de una mano en el código (config explícita, lint, tipado opt-in, primeros tests).
- P2: apuestas grandes que solo se amortizan en producto mantenido (refactor de monolitos, TS repo-wide, CI completo, instancing).

Cómo leer "a qué escenario aplica": si dice "A y B", es trabajo que conviene hacer pase lo que pase (sobre todo robustez y rendimiento). Si dice "B", asume que solo merece la pena si esto se mantiene. Cuando un ítem "A y B" cae en una fase tardía, lo aclaro en su sitio: el trabajo aplica a ambos escenarios, pero su coste o sus dependencias lo empujan más adelante en la secuencia.

## Mejoras por área

### 1. Tooling y Vite

Vite ya funciona. Lo que falta es configuración explícita y desacoplar la carga de assets del arranque.

**Conflicto de import en `inventory.js` (anula el code splitting).** Estado: el build avisa de que `src/inventory.js` se importa dinámicamente desde `SaveSystem.js` pero también estáticamente desde `game.js`, así que el import dinámico no mueve el módulo a otro chunk y todo colapsa en un único bundle de 906 KB (232 KB gzip, que para Three.js es normal). Propuesta: elegir una sola estrategia, estático en todas partes (y quitar el `import()` de `SaveSystem.js`) o dinámico en todas. Esfuerzo bajo, impacto medio. Escenario A y B.

**`vite.config.js` explícito.** Estado: no existe, todo son defaults. Hay dos sub-rasgos con escenarios distintos que conviene no mezclar:

- `esbuild` `drop:['console']` para el build de producción, que elimina de golpe las ~600 llamadas `console.*` (ver área 8). Aplica a A y B.
- `build.sourcemap: true` para poder depurar el bundle, subir `chunkSizeWarningLimit` a ~1000 para silenciar el aviso cosmético de 500 KB, y opcionalmente `manualChunks` para aislar `three` (cambia poco entre deploys) del código de gameplay. Esto es afinado de developer experience y de build, sin urgencia en prototipo. Aplica a B.

El archivo es el mismo, por eso en la hoja de ruta y la tabla aparece como P0 / A y B: lo que justifica el P0 es el `drop console`, no el sourcemap. Esfuerzo bajo, impacto medio.

**Carga de animaciones FBX en serie y eager.** Estado: `player.js` carga 8 FBX (~1,9 MB, solo clips de animación; el mesh viene de un GLB) en serie con `await` encadenado en `loadFBXAnimations()`, y `FBXLoader` es caro de parsear. Esto domina el tiempo hasta jugable. Propuesta a corto: cargar `Player_Idle.fbx` primero y el resto con `Promise.all` (paralelo). Esfuerzo bajo, impacto alto. Escenario A y B. Propuesta de fondo (ver área 7): convertir los FBX a glTF.

**Supuesto de despliegue (rutas absolutas).** Estado: las rutas de assets en código son relativas (robusto), pero en el `dist/index.html` generado el bundle y los 5 scripts del host quedan en rutas absolutas desde raíz. Funciona si el iframe se sirve en la raíz de su origen (lo típico en exports de playground); rompe en subruta. Propuesta: confirmar y documentar el supuesto. Si va a subruta, `base: './'` en `vite.config.js`, teniendo en cuenta que Vite no reescribe las referencias hardcodeadas `/ChatManager.js` de `public/`. Esfuerzo bajo, impacto medio. Escenario B.

**`import * as THREE` en 33 ficheros.** Estado: inhibe el tree-shaking. Propuesta: migrar a imports nombrados solo si el tamaño del bundle se vuelve crítico; el win es modesto y refactorizar 33 ficheros es caro. Esfuerzo alto, impacto bajo. No prioritario.

Nota: el pin exacto `"three": "0.160.0"` (sin caret) es correcto y hay que mantenerlo. `three/addons` debe coincidir exactamente con el core porque los minors traen breaking changes en los loaders. Al actualizar, subir core y addons en bloque.

### 2. Calidad de código y arquitectura

Aquí viven los monolitos y el acoplamiento global. Las menciones a `console.*`, `window.*` y FBX que aparecen en otras áreas tienen su raíz aquí.

**`window.game` nunca se asigna: ramas muertas en DebugUI (bug real).** Estado: `game.js:66` asigna `window.gameInstance = this`, pero `DebugUI.js` lee `window.game` 15 veces con encadenamiento opcional. `window.game` no se asigna en ningún punto del repo, así que esas comprobaciones siempre caen al fallback silencioso y ocultan que DebugUI no funciona. Propuesta a corto: cambiar las 15 lecturas a `window.gameInstance`. Esfuerzo bajo, impacto medio. Escenario A y B.

**`inventoryUI.js` (1654 líneas) mezcla cuatro responsabilidades.** Estado: genera CSS (`createStyles()`), construye DOM, gestiona drag&drop y además monta su propio mini-motor Three.js para previsualizar ítems (`previewScene/previewCamera/previewRenderer`). Es la peor violación de responsabilidad única del repo. Propuesta: extraer tres colaboradores replicando el patrón que el equipo ya usó en BuildingSystem: `InventoryStyles`, `ItemPreviewRenderer` (la escena de preview) e `InventoryDragController`. Empezar por `ItemPreviewRenderer`, que es el límite más nítido. Esfuerzo alto, impacto alto. Escenario B.

**Duplicación de carga GLTF entre `player.js` y `DogCompanion.js`.** Estado: ambos definen su propio `playAnimation()`, instancian `GLTFLoader`, crean `AnimationMixer`, hacen el `traverse` de sombras y tienen un `try/catch` con malla de fallback. Propuesta: extraer un `ModelLoader` (carga GLTF con sombras y fallback) y un `AnimatedActor` (mixer + `playAnimation` con crossfade) compartidos. Esfuerzo medio, impacto medio. Escenario B.

**Inyección de dependencias en vez de `window.*`.** Estado: cuatro módulos (ItemDropSystem, DogCompanion, inventoryUI, player) leen el global en lugar de recibir la instancia de `Game` por constructor, como ya hace casi todo el resto. `DogCompanion` además depende de `window.ItemStack` con triple fallback. Propuesta: pasar `Game` por constructor a esos cuatro. Esfuerzo medio, impacto medio. Escenario B.

**`setTimeout` como sincronización entre sistemas.** Estado: delays artificiales (100ms, 1000ms) para secuenciar inicialización y sortear carreras, repartidos por game.js, DogCompanion, InGameUI y BuildingSystem. Son acoplamientos temporales frágiles: si la carga tarda más, el orden se rompe sin error visible. Propuesta: encadenar por `async/await` o callbacks sobre los eventos reales (modelo cargado, sistema inicializado); `game.js` ya es async. Los `setTimeout` cosméticos del loading screen pueden quedarse. Esfuerzo medio, impacto medio. Escenario B.

**Acoplamiento al DOM por strings de ID.** Estado: 91 `document.getElementById` repartidos, varios re-consultados decenas de veces; los controles de debug viven hardcodeados en `index.html` con `display:none` y un rename de ID falla en silencio. Propuesta: cachear referencias DOM una vez en el constructor en lugar de re-consultar, generar el panel de debug desde `DebugUI`, y añadir guarda null al `getElementById('gameContainer')` de `game.js:247` antes del `appendChild` (quick win). Esfuerzo medio, impacto medio (la guarda null es bajo). Escenario A para la guarda null, B para el resto.

**Casing de nombres de fichero inconsistente.** Estado: conviven minúsculas (`player.js`, `inventoryUI.js`), PascalCase (`DogCompanion.js`, `SaveSystem.js`) y camelCase. En FS sensible a mayúsculas (Linux, CI) un import con casing equivocado rompe el build aunque funcione en macOS. Propuesta: fijar convención (PascalCase para módulos que exportan clase encaja con la mayoría), renombrar con `git mv` y apoyarse en el linter. Esfuerzo bajo, impacto bajo. Escenario B.

### 3. CSS y tipografía

**`@import` de fuente inconsistente (rotura posible bajo CSP).** Estado: `LoadingScreen.js` y `MainMenu.js` importan la fuente desde una copia local vendorizada, pero `inventoryUI.js:42` la importa desde la URL viva de Google Fonts. Dentro de un iframe con CSP estricta esa petición externa puede bloquearse y romper la tipografía solo en el inventario. Propuesta: cambiar `inventoryUI.js:42` al mismo `@import` vendorizado que los otros dos. Esfuerzo bajo, impacto medio. Escenario A y B.

**CSS-in-JS disperso.** Estado: cuatro módulos inyectan `<style>` en runtime y cada uno redefine la familia Nunito, sombras y gradientes; `index.html` tiene un tercer bloque inline. Propuesta: consolidar el CSS repetido en una hoja compartida importada por Vite. Esfuerzo bajo, impacto medio. Escenario B.

### 4. TypeScript

Corrección al contexto de partida: `three` 0.160 no expone tipos propios (verificado: sin campo `types`/`typings`, sin `.d.ts` en `build/`). Hacen falta `@types/three` como devDependency. Sin eso, tipar cualquier cosa que use three sería `any`.

**Instalar el toolchain mínimo.** Estado: sin TypeScript, sin tipos de three. Propuesta: `npm i -D typescript @types/three`, con `@types/three` pineado a `~0.160` alineado al core. Es el desbloqueo de mayor ROI. Esfuerzo bajo, impacto alto. Escenario B (en A, solo si se quiere el typecheck ligero del área 5).

**No activar `checkJs` global con strict.** Estado: ~350 arrow functions sin anotar, >120 `getElementById` que bajo `strictNullChecks` se vuelven `HTMLElement | null`, 88 listeners con el evento sin tipar. Encender `checkJs` + strict de golpe produce miles de errores en un commit, imposible de revisar, y la migración se abandona. Propuesta: `jsconfig.json` con `allowJs: true`, `checkJs: false`, y activar el chequeo archivo a archivo con `// @ts-check`, empezando por los 9 módulos sin three. Esfuerzo bajo, impacto alto. Escenario B.

**Tipar el singleton global de un golpe.** Estado: 55 accesos combinados (`window.gameInstance` 39 + `window.game` 16), concentrados, no dispersos. Propuesta: un `global.d.ts` con `declare global { interface Window { gameInstance?: Game; game?: Game; ItemStack?: typeof ItemStack } }`. Resuelve los 55 sin tocar lógica. Esfuerzo bajo, impacto medio. Escenario B.

**Tipar el formato de guardado.** Estado: `inventory.js` expone `serialize()/deserialize()` con shapes implícitos; un cambio de shape no detectado corrompe saves de usuarios sin aviso. Propuesta: definir interfaces `SaveDataV1 / SerializedInventory / SerializedItemStack` y versionar el formato. Es el único punto pro-TS con ROI claro incluso en prototipo, porque previene corrupción de partidas. No tocar el mecanismo de cookies. Esfuerzo medio, impacto alto. Escenario A y B.

**Rename incremental `.js` -> `.ts`.** Estado: 37 clases ES6 limpias, conversión mecánica clase a clase, pero sin red de tests. Propuesta: pipeline incremental, un grupo por PR, empezando por lógica pura (inventory, registries, serialización del save), luego sistemas de three medianos, y los monolitos al final. Nunca renombrar y endurecer strict en el mismo commit. Requisito previo: tests de caracterización (ver área 5), porque sin red cada rename strict es una regresión potencial de semántica (`null` vs `undefined`, `==` vs `===`). Esfuerzo alto, impacto medio. Escenario B.

### 5. Testing y QA con Vitest

El repo es más testeable de lo que parece: buena parte de la lógica es pura o headless y corre en Node o jsdom sin tocar WebGL.

**Configurar Vitest aislado del build.** Estado: sin Vitest ni config. Propuesta: `npm i -D vitest @vitest/coverage-v8 jsdom` (resolviendo antes el peer-dep con Vite 7, que es reciente; no fijar versión a ciegas). `vitest.config.js` separado, `environment: 'node'` por defecto y docblock `// @vitest-environment jsdom` por archivo en los que tocan DOM. Esfuerzo bajo, impacto alto. Escenario B (en A, solo los 3-4 tests del siguiente punto).

**Tests de `inventory.js` (top objetivo).** Estado: 100% lógica pura, determinista. Propuesta: caracterizar el orden hotbar-antes-que-backpack y el conteo parcial al llenar; la quirk de `canAddItem` (un stack 60/64 + 10 no rellena a 64, abre stack nuevo, porque exige que quepan los 10 enteros); el cap silencioso `Math.min(quantity, stackSize)`; y el round-trip `serialize/deserialize` con `itemRegistry`, incluida la pérdida silenciosa de un `itemId` desconocido. Sin mocks. Esfuerzo bajo, impacto alto. Escenario A y B.

**Helpers de reparación JSON del `SaveSystem` (incluye un bug real).** Estado: `new SaveSystem({})` funciona sin DOM. `attemptJSONFix` repara comas colgantes, NaN e Infinity. Pero `fixScientificNotation` falla: JS re-stringifica números >=1e21 en notación científica, así que `1e+30` vuelve a salir como `1e+30` y el fix no arregla exponentes grandes. Propuesta: test que repara los casos válidos y otro que caracteriza el fallo de `1e+30` como característica conocida. Es un hallazgo real, no un test que pasa por inercia. Esfuerzo bajo, impacto medio. Escenario A y B.

**Round-trip de chunking en cookies (jsdom).** Estado: `saveDataInChunks` trocea por 2625 chars y `loadGameData` reensambla. Propuesta: test de un payload grande que se trocea y se reensambla con `deepEqual` contra el original, más la ruta de cookie única. Cubre la pieza más frágil del save. No prescribir IndexedDB aquí: verificar primero el comportamiento de storage dentro del host. Esfuerzo medio, impacto alto. Escenario B.

**Matemática de colisión headless.** Estado: `CollisionSystem.checkHorizontalCollision` (push-out radial de árboles, AABB de muros por eje de mínima penetración, guarda anti-teleport de 3.0, early-return con velocidad cero) es la matemática más propensa a bugs del repo y corre en Node con primitivas THREE reales, sin WebGL. Propuesta: tests unit sobre `correctedPosition` y la normal. Esfuerzo medio, impacto alto. Escenario B.

**Matemática de grid en `BuildingSystem`.** Estado: `snapToGrid`, `getCellKey` y `calculateRotatedCells` (rotación de huella 0/90/180/270) son puras pero viven dentro del monolito de 2356 líneas. Propuesta: extraerlas a un `src/gridMath.js` puro y testearlas; descompone además el monolito. Esfuerzo medio, impacto alto. Escenario B.

**Silenciar `console.*` en tests y cobertura por archivo.** Estado: ~600 logs inundarían la salida. Propuesta: `setupFiles` con `vi.spyOn(console, ...)`. Fijar thresholds (80-90%) solo en los módulos testeados; el número global honesto sobre ~17,9k líneas dominadas por render y UI será ~15-25%. Prometer un global alto sería deshonesto. Esfuerzo bajo, impacto medio. Escenario B.

### 6. Developer Experience

**Fijar la versión de Node.** Estado: sin `.nvmrc` ni `engines`. Node local v22. Propuesta: `.nvmrc` con `22` y `"engines": { "node": ">=20" }` en `package.json`. Quick win puro contra el "a mí me funciona". Esfuerzo bajo, impacto medio. Escenario A y B.

**ESLint + Prettier + editorconfig.** Estado: ninguno existe. Propuesta: flat config de ESLint de baja fricción (reglas en `warn`, no `error`, para no escupir cientos de fallos el primer día), ignorando `dist/` y `public/*.js` (scripts del host) y declarando `THREE` y los globals de browser. `npm i -D eslint @eslint/js globals prettier`. No existe un `eslint-plugin-three` estándar; basta `THREE` como global y `no-undef`. Añadir `.prettierrc.json` y `.editorconfig` con 2 espacios y LF. Esfuerzo bajo, impacto alto. Escenario A (Prettier + editorconfig) y B (ESLint completo).

**Scripts npm de calidad.** Estado: solo `dev`, `build`, `preview`. Propuesta: añadir `lint`, `lint:fix`, `format`, `format:check`, `typecheck`. Esfuerzo bajo, impacto medio. Escenario B.

**README mínimo.** Estado: no hay README ni CONTRIBUTING; el onboarding depende solo del `copilot-instructions.md`, pensado para Copilot. Propuesta: un README de puesta en marcha (requisitos, `npm install/dev/build/preview`, integración postMessage con el host) que enlace al `copilot-instructions.md` como fuente de verdad de arquitectura en vez de duplicarlo. Esfuerzo bajo, impacto alto. Escenario A y B.

**Corregir `copilot-instructions.md` desincronizado.** Estado: cita `src/Environment.js` y `src/CharacterController.js` con mayúscula; en disco son minúsculas. Propuesta: corregir las referencias y tratar el fichero como activo vivo, actualizándolo en el mismo PR que mueva o renombre un sistema. Esfuerzo bajo, impacto medio. Escenario A y B.

**CI mínimo.** Estado: sin `.github/workflows` (el directorio `.github/` ya existe). Es la única guardia automática que faltaría y, con un build en runner Linux, atrapa gratis los imports con casing equivocado. Propuesta: workflow que en cada PR haga `npm ci` + `lint` + `build`; añadir `test` cuando lo haya. Esfuerzo bajo, impacto alto. Escenario B (montarlo el primer día en cuanto entre una segunda persona).

**husky + lint-staged.** Estado: sin pre-commit. Propuesta: `prettier --write` y `eslint --fix` sobre lo staged. Solo merece la pena con más de una persona commiteando. Esfuerzo bajo, impacto medio. Escenario B.

**Personalizar `index.html`.** Estado: `<title>Character Controller</title>` y `lang="en"` heredados de la plantilla. Propuesta: `<title>Cozy Adventure</title>` y `lang` acorde al público (decisión, no resto). No tocar los 5 scripts del host. Esfuerzo bajo, impacto bajo. Escenario A y B.

### 7. Desarrollo con IA (Spec Kit)

Spec Kit es el toolkit open source de GitHub para spec-driven development: la especificación pasa a ser el artefacto ejecutable del que un agente genera plan, tareas e implementación. Su unidad distintiva es la `constitution.md`, principios no negociables del proyecto. El CLI se llama Specify (`specify init`, vía `uvx` o `uv tool install`), requiere Python 3.11+, Git y uv, y el flujo se ejecuta como slash commands dentro del agente.

Según el README y el quickstart consultados, los comandos usan el prefijo `/speckit.`: `/speckit.constitution` -> `/speckit.specify` -> `/speckit.clarify` (opcional) -> `/speckit.plan` -> `/speckit.tasks` -> `/speckit.implement`. La forma sin prefijo (`/specify`, `/plan`) que circula en blogs de terceros corresponde a una nomenclatura anterior ya renombrada; el concepto y el orden son los mismos, solo cambió el prefijo. Conviene fijar la versión exacta al instalar, porque es un proyecto joven y los comandos ya se renombraron una vez.

Encaje con este repo: Spec Kit se superpone a la capa de contexto para IA que ya existe (`copilot-instructions.md` y la convención `CLAUDE.md`), no rellena un hueco vacío. Su `constitution.md` ocupa un espacio parecido al de esos dos ficheros, así que adoptarlo significa mantener una tercera fuente de verdad. Dos fricciones concretas:

1. Choque de toolchain: exige Python 3.11+ y uv sobre un proyecto JavaScript/Vite/Three.js sin nada de Python. Introduce una cadena de herramientas ajena solo para el proceso.
2. Es spec-first, pensado para dirigir trabajo nuevo. No retrofitea calidad sobre las ~17,9k líneas ya existentes: no toca los ~600 `console.*`, ni el acoplamiento `window.*`, ni la ausencia de tests y CI.

Recomendación: no adoptarlo de forma global ahora. Los problemas reales del repo (logging, acoplamiento, monolitos, cero tests, sin CI) se atacan mejor con pasos baratos y nativos del stack JS, que son justo las áreas 1 a 6 de este informe. Spec Kit tiene sentido como prueba acotada solo si entra trabajo nuevo y bien delimitado (por ejemplo un sistema de gameplay nuevo desde cero): en ese caso, probarlo en una sola feature, fijando la versión del CLI, y evaluar si el ciclo specify -> plan -> tasks aporta orden. Si lo que se busca es mejorar la guía para la IA sin añadir toolchain, la vía más simple es reforzar el `copilot-instructions.md` y el `CLAUDE.md` que ya están. Esfuerzo medio, impacto bajo (sobre el código existente). Escenario B, y aun ahí, acotado.

Cautela de fuentes: la extracción del README se hizo con WebFetch (resumen con modelo pequeño, riesgo bajo de matices perdidos) y no se instaló el CLI, así que la valoración de encaje es analítica y los nombres de comandos quedan a falta de verificación independiente con el CLI instalado.

### 8. Seguridad, robustez y rendimiento

Este bloque mezcla cosas que aplican siempre (robustez y rendimiento, que degradan la jugabilidad) con cosas que solo pesan en producto (seguridad e i18n).

**Pausa real al ocultar la pestaña (bug).** Estado: `main.js` llama a `game.pause && game.pause()` y `game.resume && game.resume()`, pero esos métodos no existen en `Game`, así que el guard `&&` los vuelve no-op silenciosos. El `gameLoop` llama a `requestAnimationFrame` incondicionalmente y nunca se cancela. Propuesta: implementar `pause()/resume()` reales (parar el clock, bandera `isPaused`), detener también el bucle del agua y cancelar el rAF. Evita gasto de CPU/GPU con la pestaña oculta y el `deltaTime` gigante (salto de física) al volver. Esfuerzo bajo, impacto medio. Escenario A y B.

**Bucle de olas recomputando 16k normales por frame.** Estado: el agua es un `PlaneGeometry(800,800,128,128)` (~16.641 vértices); `startWaveAnimation` recorre todo el array y llama `computeVertexNormals()` cada frame en su propio rAF, que solo se corta si `waterMesh` es null. Propuesta: bajar la subdivisión (p. ej. 64x64), recalcular normales cada N frames o pasar a un vertex shader, e integrar la animación en el `deltaTime` del loop principal para poder pausarla. Esfuerzo medio, impacto medio. Escenario A y B.

**~108 colliders de árbol invisibles generando draw calls (quick win).** Estado: `createTreeCollider()` crea un Mesh por árbol con `opacity:0` pero sin `visible=false`, así que three sigue emitiendo un draw call por cada uno. Hay ~108 árboles y ~60 objetos de costa como meshes individuales. Propuesta: poner `treeCollider.visible=false` (la colisión lee posición y geometría, no necesita render): ~108 draw calls fuera sin tocar la jugabilidad. A medio plazo, `InstancedMesh` para árboles y rocas. Esfuerzo bajo, impacto medio. Escenario A y B.

**`destroy()` completo y simétrico.** Estado: 88 `addEventListener` frente a 7 `removeEventListener`; `setupEventListeners` añade handlers anónimos sin guardar referencia, así que `destroy()` no puede quitarlos, y el rAF tampoco se cancela. Cada reinicio de partida acumula handlers y un renderer nuevo. Propuesta: `AbortController` por sesión para quitar todos los listeners, cancelar los rAF, `renderer.dispose()` y recorrer la escena disponiendo geometrías, materiales y texturas. Crítico si se reinicia sin recargar. Esfuerzo medio, impacto medio. Escenario B.

**Pérdida de contexto WebGL.** Estado: cero listeners de `webglcontextlost`/`restored`. En móvil y pestañas en segundo plano la pérdida es habitual; sin esto el juego queda en negro hasta recargar, así que degrada la jugabilidad en ambos escenarios (de ahí su etiqueta A y B). Vive en P2 por su coste y porque la implementación correcta (recrear recursos GPU en `restored`) se apoya en el inventario de recursos del `destroy()` simétrico, que es solo B; por eso van agrupados. Si se quiere acometer antes de tocar `destroy()`, el sub-paso barato es añadir el listener de `webglcontextlost` con `preventDefault` para al menos evitar el cuelgue, dejando el `restored` completo para cuando exista el inventario de recursos. Propuesta: añadir los listeners en `renderer.domElement` (`preventDefault` en lost, recrear recursos GPU en restored). Esfuerzo medio, impacto medio. Escenario A y B.

**`console.*` en producción.** Estado: ~600 llamadas, incluidos volcados de estructura interna y posibles logs por frame. Propuesta a corto: `esbuild` `drop:['console']` en el `vite.config.js` para el build de producción, que los elimina de golpe (este es el sub-rasgo del `vite.config.js` que aplica a A y B, ver área 1). A medio plazo, un logger con niveles leyendo `import.meta.env.DEV` y quitar los logs dentro de bucles de update. Esfuerzo bajo, impacto bajo (medio si se hace el logger). Escenario A y B.

**Validación de `origin` en postMessage.** Estado: ningún listener de `message` valida `event.origin`. `ScriptsLoader-Universal.js` se autoejecuta y, ante `requestCanvasRecording`, captura el canvas y envía un webm al padre; en cross-origin ese canal es la vía de egreso de píxeles. Propuesta: si el host está fijado, allowlist de `event.origin` en la entrada y `targetOrigin` explícito en la salida (hoy `'*'`). Si no, documentarlo como riesgo de confianza aceptado. Esfuerzo medio, impacto medio. Escenario B.

**Self-XSS por datos del save sin escapar.** Estado: `MainMenu.js:763` renderiza `slot.metadata.location` en `innerHTML` sin escape; el save viene de cookie/localStorage. Como el usuario solo controla sus propios datos, es self-XSS, no ataque de terceros. Propuesta: usar `textContent` o un helper `escapeHTML`. Útil endurecerlo si en el futuro entran datos de terceros (respuestas de LLM vía ChatManager). Esfuerzo bajo, impacto bajo. Escenario B.

**Scripts del host latentes.** Estado: `index.html` carga `/ChatManager.js`, `/ImageGenerator.js`, `/ProgressLogger.js`, `/OGP.js` con rutas absolutas, pero `src/` nunca los invoca. `ScriptsLoader-Universal.js` sí es activo (graba el canvas). Propuesta: verificar qué scripts exige el host; si no se usan, quitar esos cuatro `<script>` (reduce superficie postMessage y peso). Esfuerzo bajo, impacto bajo. Escenario B.

**Accesibilidad e i18n.** Estado: `lang="en"`, textos hardcodeados en inglés, casi cero `aria`/`alt`, sin foco gestionado en modales. Propuesta: extraer strings a un diccionario y añadir roles/aria y manejo de foco. Necesario solo si el juego se publica de cara a usuarios. Esfuerzo medio, impacto bajo. Escenario B.

**Guardado en cookies.** Estado: no es un bug. Chunking porque hay tope de 4096 bytes/cookie, ya con fallback a `localStorage` y `SameSite=None;Secure;Partitioned`. Propuesta: verificar dentro del iframe del host el comportamiento de `Partitioned`/`SameSite` y el coste de enviar cookies `path=/` en cada request al gateway, antes de decidir cualquier migración a IndexedDB. El problema real de ese módulo es su tamaño y ruido de logs (1430 líneas, 108 `console.*`), no la elección de cookies. Esfuerzo de verificación bajo. Escenario A y B (verificar).

## Hoja de ruta por fases

La secuencia importa: lint y formato antes que tipos, `vite.config` y lazy-load pronto, tests sobre lógica pura antes de refactorizar monolitos.

### P0, quick wins (días, aplican casi siempre)

1. `window.game` -> `window.gameInstance` en DebugUI (arregla bug).
2. `@import` de fuente vendorizado en `inventoryUI.js:42` (rotura bajo CSP).
3. `treeCollider.visible=false` (~108 draw calls fuera).
4. `pause()/resume()` reales y cancelación del rAF.
5. Paralelizar la carga FBX con `Promise.all`.
6. Guarda null en `getElementById('gameContainer')`.
7. `vite.config.js`: el `esbuild drop:['console']` (A y B) es lo que justifica el P0; el `sourcemap`/`manualChunks` que lo acompaña es afinado de escenario B en el mismo archivo. Resolver de paso el conflicto de import de `inventory.js`.
8. `.nvmrc`, `engines`, `.prettierrc`, `.editorconfig`, README mínimo, corregir `index.html` y `copilot-instructions.md`.

### P1, base barata (semanas, pronto si hay más de una mano)

9. ESLint flat config en modo warn + scripts npm de calidad.
10. CI mínimo (`npm ci` + lint + build en Linux).
11. Vitest aislado + primeros tests de `inventory.js` y de los helpers JSON del `SaveSystem` (incluido el de `1e+30`).
12. Tipar el formato de guardado (interfaces + versionado).
13. `jsconfig.json` con `checkJs` opt-in por archivo; `@types/three` + `typescript` instalados.
14. Bucle de olas (subdivisión menor o cada N frames).

### P2, apuestas grandes (trimestres, solo producto mantenido)

15. Tests de `CollisionSystem` y extracción de `gridMath.js` con sus tests.
16. Trocear `inventoryUI.js` (empezando por `ItemPreviewRenderer`), luego el resto de monolitos.
17. `ModelLoader` + `AnimatedActor` compartidos; inyección de dependencias en vez de `window.*`; sustituir los `setTimeout` de sincronización.
18. Convertir FBX a glTF con gltf-transform; `InstancedMesh` para árboles y costa.
19. `destroy()` simétrico con AbortController; manejo de pérdida de contexto WebGL (este último es A y B por jugabilidad, pero se agrupa aquí porque su parte `restored` depende del inventario de recursos del `destroy()`; el listener `webglcontextlost` con `preventDefault` puede adelantarse a P0 si se quiere).
20. Rename incremental `.js` -> `.ts` (lógica pura primero, monolitos al final), con strict global como cierre.
21. husky + lint-staged; endurecer postMessage (origin allowlist); i18n y accesibilidad si se publica.
22. Spec Kit solo como prueba acotada en una feature nueva, no global.

## Tabla resumen priorizada

| Mejora | Área | Esfuerzo | Impacto | Prioridad | Escenario |
|---|---|---|---|---|---|
| `window.game` -> `window.gameInstance` en DebugUI | Arquitectura | Bajo | Medio | P0 | A y B |
| `@import` de fuente vendorizado en inventoryUI | CSS | Bajo | Medio | P0 | A y B |
| `treeCollider.visible=false` | Rendimiento | Bajo | Medio | P0 | A y B |
| `pause()/resume()` reales + cancelar rAF | Robustez | Bajo | Medio | P0 | A y B |
| Paralelizar carga FBX (`Promise.all`) | Tooling | Bajo | Alto | P0 | A y B |
| Guarda null en `getElementById('gameContainer')` | Arquitectura | Bajo | Bajo | P0 | A y B |
| `vite.config.js`: drop console (A y B), sourcemap/manualChunks (B) | Tooling | Bajo | Medio | P0 | A y B |
| Resolver conflicto import de `inventory.js` | Tooling | Bajo | Medio | P0 | A y B |
| `.nvmrc` + `engines` | DX | Bajo | Medio | P0 | A y B |
| Prettier + editorconfig | DX | Bajo | Medio | P0 | A y B |
| README mínimo | DX | Bajo | Alto | P0 | A y B |
| Corregir `index.html` (title, lang) | DX | Bajo | Bajo | P0 | A y B |
| Corregir `copilot-instructions.md` | DX | Bajo | Medio | P0 | A y B |
| Verificar storage en el host (cookies) | Seguridad | Bajo | Medio | P0 | A y B |
| Tests de `inventory.js` | Testing | Bajo | Alto | P1 | A y B |
| Tests helpers JSON SaveSystem (bug `1e+30`) | Testing | Bajo | Medio | P1 | A y B |
| Tipar formato de guardado | TypeScript | Medio | Alto | P1 | A y B |
| Bucle de olas (subdivisión / cada N frames) | Rendimiento | Medio | Medio | P1 | A y B |
| ESLint flat config (warn) + scripts npm | DX | Bajo | Alto | P1 | B |
| CI mínimo (ci + lint + build) | DX | Bajo | Alto | P1 | B |
| Vitest aislado del build | Testing | Bajo | Alto | P1 | B |
| `@types/three` + typescript + jsconfig opt-in | TypeScript | Bajo | Alto | P1 | B |
| Tests de `CollisionSystem` | Testing | Medio | Alto | P2 | B |
| Extraer `gridMath.js` + tests | Testing | Medio | Alto | P2 | B |
| Round-trip de chunking del save (jsdom) | Testing | Medio | Alto | P2 | B |
| Trocear `inventoryUI.js` | Arquitectura | Alto | Alto | P2 | B |
| Trocear resto de monolitos | Arquitectura | Alto | Alto | P2 | B |
| `ModelLoader` + `AnimatedActor` compartidos | Arquitectura | Medio | Medio | P2 | B |
| Inyección de dependencias vs `window.*` | Arquitectura | Medio | Medio | P2 | B |
| Sustituir `setTimeout` de sincronización | Arquitectura | Medio | Medio | P2 | B |
| FBX -> glTF + `InstancedMesh` | Rendimiento | Medio | Alto | P2 | B |
| `destroy()` simétrico + AbortController | Robustez | Medio | Medio | P2 | B |
| Manejo de pérdida de contexto WebGL | Robustez | Medio | Medio | P2 | A y B |
| Rename incremental `.js` -> `.ts` | TypeScript | Alto | Medio | P2 | B |
| `manualChunks` + lazy-load de sistemas | Tooling | Medio | Medio | P2 | B |
| husky + lint-staged | DX | Bajo | Medio | P2 | B |
| Endurecer postMessage (origin allowlist) | Seguridad | Medio | Medio | P2 | B |
| Self-XSS: escapar datos del save | Seguridad | Bajo | Bajo | P2 | B |
| i18n + accesibilidad | Seguridad | Medio | Bajo | P2 | B |
| Spec Kit en una feature acotada | IA | Medio | Bajo | P2 | B |
