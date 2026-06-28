<!--
Auditoría multi-agente del código (8 dimensiones en paralelo + verificación adversaria + síntesis).
Generado: 2026-06-27. 70 hallazgos recogidos, 11 de severidad crítico/alto verificados, 1 falso positivo descartado.
Complementa docs/PROPUESTA-MEJORAS.md (roadmap previo); aquí están los hallazgos a nivel de código con file:line.
-->

# Informe técnico de prioridades: cozy-adventure

## Resumen ejecutivo

El proyecto está sano en lo medible: `typecheck` limpio en strict global, 34 tests verdes, build de producción correcto y la migración a TypeScript completada. Los hallazgos reales y nuevos no son crashes ni regresiones visibles, sino que se concentran en dos zonas concretas: la robustez de la persistencia (SaveSystem) y la consistencia del estado de construcción multinivel, y justo el camino más frágil (troceo y reensamblado de la partida en cookies más su restauración) no tiene cobertura de tests. Hay un cuarto frente de fondo, la deuda de ciclo de vida (teardown/dispose), que hoy es inerte porque el reinicio es un `location.reload()`, pero que la dirección multijugador ya decidida (co-op persistente, standalone, reinicio en la misma página) convertirá en fuga real de listeners y memoria de GPU. El frame loop tiene margen de mejora (agua recalculada por frame, traverse de árboles por cada mousemove, reconstrucción de la lista de raycast por frame), modesto hoy pero que escala mal. Tras revisar severidades una a una, los únicos hallazgos que quedan en "alto" son deuda ya documentada y diferida; los descubrimientos nuevos topan en "medio", pero son bugs funcionales concretos, varios de corrección barata.

## Top prioridades

Ordenadas por impacto alto con esfuerzo bajo primero. Solo lo que de verdad mueve la aguja.

| # | Hallazgo | Área | Severidad | Esfuerzo | Acción concreta |
|---|----------|------|-----------|----------|-----------------|
| 1 | `gameInstance.levelManager` no existe: aplana edificios a nivel 0 al guardar y restaurar | Persistencia / Bug | Medio | S | Cambiar las dos refs a `this.gameInstance.buildingSystem.levelManager` (SaveSystem.ts:349, :1096) |
| 2 | `deleteSave()` dentro del `catch` de una lectura: un fallo transitorio borra la partida | Persistencia / Bug | Medio | S | Quitar `deleteSave` del catch de `loadGameData` (SaveSystem.ts:572); devolver null y dejar reintentar |
| 3 | `getSaveMetadata` hace `JSON.parse` desnudo: una cookie corrupta rompe el menú de partidas | Persistencia / Bug | Medio | S | Envolver el parse en try/catch y devolver null (SaveSystem.ts:1269) |
| 4 | `canAddItem` es todo-o-nada: `addItem` puede perder ítems habiendo hueco | Corrección / Bug | Medio | S | Rellenar parcialmente con `maxAdd = stackSize - quantity` (inventory.ts:67, 140, 152) |
| 5 | `getAllTreeMeshes()` hace `scene.traverse` completo + raycast en cada mousemove | Rendimiento | Medio | S | Cachear la lista de meshes de árbol; invalidar solo al talar/añadir (TreeChoppingSystem.ts:139) |
| 6 | DebugUI ignora el `game` inyectado y lee `window.gameInstance` ~14 veces | Arquitectura | Medio | S | Sustituir cada `(window as any).gameInstance` por `this.game` (DebugUI.ts:232-314) |
| 7 | El guardado por chunks reporta éxito aunque todas las escrituras fallen | Persistencia / Bug | Medio | M | `setCookie`/`setLocalStorage` devuelven bool; contar solo escrituras verificadas (SaveSystem.ts:442) |
| 8 | Los reparadores de JSON corren proactivamente y pueden corromper saves válidos | Persistencia / Bug | Medio | M | Parsear primero siempre; reparar solo si el parse falla (SaveSystem.ts:542-545) |
| 9 | Round-trip de chunking sin test pese a ser la pieza más frágil del save | Testing | Alto | M | Test jsdom: bajar `maxCookieSize`, `save`→`load`, assert string idéntico (SaveSystem.ts:427, :509) |
| 10 | Borrar un muro de otro nivel libera celdas del nivel equivocado (celdas fantasma) | Corrección / Bug | Medio | M | Derivar el nivel desde la Y del muro y operar sobre ese nivel (BuildingSystem.ts:1223) |
| 11 | El agua recomputa normales y resube el buffer completo a GPU cada frame | Rendimiento | Medio | M | Mover el desplazamiento de olas a un vertex shader (environment.ts:437) |
| 12 | Tres raycasts/frame reconstruyen su lista y raycastean el agua (8192 tris) | Rendimiento | Medio | M | Cachear `meshesToTest` por uso; excluir el agua del set de suelo (CharacterController.ts:336, CollisionSystem.ts:131) |

---

## Arquitectura

**Estado general: deuda estructural conocida, casi toda diferida a P2 y atada a la dirección multijugador.** El acoplamiento más sensible (todas las UIs contra `Game`) sigue sin tipar, y la cadena de teardown es código muerto que el reinicio sin recarga del multijugador activará.

### Cluster de ciclo de vida / teardown — NUEVO (parte) + DOCUMENTADO-FRÁGIL (parte)

Cuatro hallazgos describen el mismo agujero desde ángulos distintos. Todos son inertes hoy porque el reinicio real es `location.reload()` (main.ts:83,112) y `startGame()` está guardado por `isGameStarted`. Todos se activan con el reinicio en la misma página que prevé el multijugador.

- **`game.destroy()` nunca se invoca y está incompleto** (game.ts:671). El cuerpo omite `treeChoppingSystem`, `itemDropSystem`, `environment`, `collisionSystem`, `compass`, `loadingScreen` y `player`, y nunca hace `renderer.dispose()`. Además, en `setupEventListeners()` (game.ts:395) y en BuildingSystem.ts:235 hay handlers arrow inline (tecla E, click para talar) imposibles de remover.
- **ItemUseSystem/HealthSystem/FarmingSystem fuera del teardown** (game.ts:671, ItemUseSystem.ts:16). `ItemUseSystem` registra `contextmenu` en el constructor y no tiene `destroy`.
- **`DebugUI.destroy()` llama a un método inexistente** (DebugUI.ts:556): `(this as any).hideStepDetectionVisualization()`. Lanzaría `TypeError`; hoy no se nota porque `destroy()` no se ejecuta nunca, lo que confirma que la cadena es código muerto.
- **Sin `dispose` de geometrías/materiales/texturas** en el teardown del mundo (environment.ts, sin `dispose`/`destroy`).

Recomendación unificada: convertir todos los `addEventListener` a handlers nombrados (o usar `AbortController`, que es lo que documenta el roadmap P2), completar `game.destroy()` para cubrir todos los sistemas con `renderer.dispose()`/`forceContextLoss()`, dar `destroy` a los sistemas que registran listeners, añadir `Environment.dispose()` que recorra la escena liberando GPU y cancele el `requestAnimationFrame` de olas, e implementar o borrar `hideStepDetectionVisualization`. No es urgente en el flujo de un mundo por sesión; es prerrequisito antes de implementar el rebuild de mundo multijugador. Esfuerzo M-L.

### DebugUI ignora la inyección y usa el global — NUEVO

DebugUI recibe `game` por constructor (DebugUI.ts:12) pero accede a `(window as any).gameInstance?.player?.mesh` repetidamente entre las líneas 232 y 314. No se trata de eliminar el singleton (decisión intencional), sino de usar la referencia ya disponible. Si el game inyectado y el global divergen (tests, futuro multi-instancia), DebugUI opera sobre la instancia equivocada en silencio. La misma corrección menor aplica a player.ts:855 (`setupHeightSlider` lee `window.gameInstance.characterController`). Acción: sustituir cada acceso por `this.game`. Esfuerzo S. (Nota: el rename `window.game`→`window.gameInstance` ya está hecho; esto es un problema distinto.)

### El seam de `Game` está sin tipar — NUEVO

`gameInstance: any` en InGameUI.ts:4 y MainMenu.ts:6, `game: any` en DebugUI.ts:5, y el comentario "still untyped JS, Ola 6" en SaveSystem.ts:15. Es el punto de mayor acoplamiento del sistema y precisamente el que no tiene tipos: un refactor en `Game` no rompe la compilación de sus consumidores. Acción: definir una interfaz `GameApi` mínima (los ~8 métodos/props que las UIs usan de verdad: `isGameStarted`, `getSaveSlots`, `saveGame`, `loadGame`, `startGame`, `scene`, `player`, `characterController`) y tipar los constructores contra ella. Esfuerzo M.

### Monolitos y separación lógica/vista

- **BuildingSystem, god-object de 2415 líneas** (BuildingSystem.ts:54) que mezcla input, raycast, preview, hit-testing de UI, niveles y guardado. `isCursorOverUI()` (l.330) duplica ~100 líneas de selectores CSS de inventoryUI, así que renombrar una clase allí rompe el hit-testing en silencio. **DOCUMENTADO-FRÁGIL:** el roadmap (PROPUESTA-MEJORAS.md) ya lo lista como monolito #1 y lo marca P2/Escenario B, como prerrequisito del patrón de comandos para multijugador. Severidad alto por su rating en el propio roadmap, pero es deuda de mantenibilidad sin impacto funcional. No reabrir fuera del plan trazado.
- **Extracción incompleta en BuildingSystem** — NUEVO (BuildingSystem.ts:223, :229, :73). Quedan ~15 wrappers triviales de delegación a LevelManager, dos no-ops vivos (`updateGridPosition`, `createGridHelper`, ambos marcados "OBSOLETE") y `new BuildingSaveManager(this)` pasa el padre completo al hijo. Limpieza de bajo riesgo a hacer junto con el troceo. Esfuerzo M.
- **DogCompanion, 1392 líneas** — NUEVO (DogCompanion.ts:282, :985). Mezcla IA/física/máquina de estados con tres constructores casi duplicados de popups DOM (`showDeliveryPopup`, `showDogDeliveryPopup`, `showMultiItemDeliveryPopup`) y `forceInventoryUIUpdate()` que alcanza la UI de inventario. Acción: extraer un `DogDeliveryNotifier` (una sola función parametrizada) y reemplazar `forceInventoryUIUpdate` por la suscripción `onInventoryChange` existente. Esfuerzo M.
- **player.ts arrastra DOM de depuración** — NUEVO (player.ts:836, :790, :869). `setupHeightSlider`, `updatePlayerCoordsDisplay` y `updateHeldItemPositionDisplay` deberían vivir en DebugUI (que ya tiene `game` inyectado). No tocar `crossfadeJump`/`playJumpAnimation` ni los FBX de salto: son trabajo en curso. Esfuerzo M.

### Sincronización por setTimeout — DOCUMENTADO-FRÁGIL

~43 usos de `setTimeout`/`setInterval` como sync entre sistemas (game.ts:348,738; DogCompanion; BuildingSystem.ts:1241; SaveSystem.ts:494). Ya está reconocido en CLAUDE.md. Donde se toque ese código, awaitar el evento real de carga/init en vez del retardo; eliminar los `setTimeout` que solo loguean (game.ts:738). Migración incremental, sin acción urgente.

---

## TypeScript

**Estado general: strict global activo y la frontera Three/DOM bien acotada. La deuda de tipos viva es de dos clases: `any` que ya es accionable (la migración que los justificaba terminó) y un hack runtime genuinamente inseguro.**

### Cluster de `any` justificado por una migración ya terminada — DOCUMENTADO-FRÁGIL, ahora ACCIONABLE

SaveSystem.ts:15 ("still untyped JS, Ola 6"), BuildingSaveManager.ts:16-18 ("until BuildingSystem itself is migrated, Ola 5"), TreeChoppingSystem.ts:9-11 ("environment is not yet migrated, Ola 5"). La condición que justificaba estos `any` ("hasta que se migre X") ya no se cumple: `Game`, `BuildingSystem` y `Environment` existen como `.ts`. Acción: sustituir cada `any` por la clase real (o una interfaz mínima si hay ciclo de imports) y borrar los comentarios "Ola 5/6". Empezar por `buildingSystem` y `environment` (superficie acotada); `gameInstance` es el de mayor radio y puede ir por fases junto con la interfaz `GameApi`. Esfuerzo M.

### Hack runtime de resolución de `ItemStack` — NUEVO

DogCompanion.ts:870-875 (repetido en :908): `const ItemStack = (window as any).ItemStack || gameInstance.inventory.constructor.ItemStack || class {...}`. El fallback construye objetos que NO son instancias reales de `ItemStack`; si el resto del sistema espera sus métodos, se rompe en runtime sin aviso del compilador. `ItemStack` ya se exporta tipado desde inventory.ts. Acción: importarlo directamente y construirlo con su firma real, eliminando el global y la clase anónima. Esfuerzo S.

### Pipeline de guardado tipado como `any` — CONOCIDO (parcialmente hecho)

`restoreGameData(saveData: any)`, `restorePlayerData(playerData: any)`, etc. (SaveSystem.ts:579,624,658,748), y `collectGameData()` sin tipo de retorno. El riesgo de fondo es real: la vía viva de persistencia es `any` de extremo a extremo, así que renombrar un campo al guardar no produce error al restaurar. **Matiz importante:** la tesis original de que `SerializedItemStack`/`SerializedInventory` son "decorativas y nunca se aplican" es falsa; sí se usan en inventory.ts:355,370 y en sus tests. Lo correcto es que la vía de SaveSystem no reutiliza esos tipos: el item "tipar el formato de guardado" quedó hecho en el camino de inventory.ts (usado en tests) pero incompleto en SaveSystem. La ruta de restore es muy defensiva (warn + continue, try/catch por slot), así que el peor caso realista es pérdida silenciosa de inventario, no corrupción dura. Acción incremental: anotar `collectGameData()` con una envoltura tipada y los `restore*` con cada categoría, reutilizando los `Serialized*` existentes. Esfuerzo M.

### Accesos al singleton y `traverse((child: any))` — NUEVO / CONOCIDO-INTENCIONAL (el singleton)

- 39 accesos `(window as any).gameInstance` (DebugUI 16, DogCompanion 21, game.ts, player.ts) cuando el repo ya tiene el patrón tipado en ItemDropSystem.ts:6 (`type WindowWithGame = ...`). El singleton es decisión intencional y se mantiene; lo que se corrige es el `as any`. Acción: un único `declare global { interface Window { gameInstance?: Game } }` y reemplazar los accesos. Esfuerzo S.
- ~28 `traverse((child: any))` (player.ts:68,447,...; environment.ts:292) re-anulan el tipo que Three ya da (`Object3D`). Es el `any` más evitable y numeroso del código propio. Se elimina de golpe al extraer el helper `applyMatteShadows` (ver Calidad). Esfuerzo S.

### Límites Three/DOM — CONOCIDO-INTENCIONAL (verificación, no defecto)

Los casts `as THREE.Mesh`/`as THREE.MeshStandardMaterial` (CollisionSystem.ts:138, ItemDropSystem.ts:204) van seguidos del guard `isMesh`/`emissive`: es el idioma cast-then-guard, no ocultan bugs. No hay `postMessage` en la superficie TS (se maneja en los scripts JS del host por diseño). Mantener como están; si se quiere endurecer, `child instanceof THREE.Mesh` evita el cast, pero es opcional.

---

## Rendimiento 3D

**Estado general: el bucle de olas ya se optimizó parcialmente (subdivisión 128→64, YA-HECHO) y `treeCollider.visible=false` ya recortó draw calls (YA-HECHO). Lo que queda es coste por frame recalculado y oportunidades de instancing, todo modesto en magnitud pero que escala mal con más mundo o más jugadores.**

### Coste por frame recalculado — NUEVO

- **El agua recomputa normales y resube el buffer cada frame** (environment.ts:437). Bucle por vértice sobre `PlaneGeometry(800,800,64,64)` (4225 verts) + `computeVertexNormals()` + `positions.needsUpdate = true` cada frame, corra o no el jugador. Es el coste fijo más caro de la escena en reposo. La subdivisión a 64 fue un aterrizaje deliberado, no volver a tocarla; la solución de fondo es mover el desplazamiento sinusoidal a un vertex shader (`onBeforeCompile` o `ShaderMaterial`), que elimina el bucle JS, el recompute y el reupload. El comentario "16k-vertex" (environment.ts:440) quedó obsoleto, corregirlo. Esfuerzo M.
- **Tres raycasts/frame reconstruyen su lista de meshes** (CharacterController.ts:336 cámara, CollisionSystem.ts:131 suelo ×2 con perro). Cada frame se hace `traverse` de subárboles para rearmar `meshesToTest` (3 arrays nuevos/frame). El churn de arrays cortos y las 108 llamadas no-op de los colliders de árbol son casi gratis; el único coste real es raycastear la malla de agua de 8192 triángulos, registrada como collider `ground`, en los rays de suelo. Acción: cachear `meshesToTest` por uso (suelo vs cámara) y reconstruir solo en `addCollider`/`removeCollider`; excluir el agua del set de suelo (o usar un plano matemático y=0.3). Esfuerzo M.
- **`getAllTreeMeshes()` hace `scene.traverse` + raycast recursivo en cada mousemove** (TreeChoppingSystem.ts:139, :204). Mientras se sostiene el hacha, `mousemove` dispara 60-120 veces/seg y cada evento recorre toda la escena (>150 nodos) más un raycast sobre todos los submeshes de los 108 árboles, sin caché. Es coste por frame mientras se apunta. Acción: cachear la lista una vez tras cargar el mundo, invalidar al talar/añadir; opcionalmente throttle a ~30Hz. Esfuerzo S. (La mejor relación impacto/esfuerzo de este bloque.)
- **Asignaciones de Vector3/clones por frame** (CharacterController.ts:175,...; DogCompanion.ts:188,...). ~6 Vector3 + 2-3 clones por frame en el controlador y 5-10 + 2 clones en el perro. Cientos de objetos efímeros/seg que alimentan el GC. Acción: vectores scratch reutilizables a nivel de instancia (`const _v = new THREE.Vector3()` fuera del método, `.copy()`/`.set()` dentro), nunca `.clone()` para lecturas. Refactor mecánico de bajo riesgo. Esfuerzo M.

### Draw calls e instancing — NUEVO

- **108 árboles, 28 rocas y 32 dunas como mallas individuales** (environment.ts:127,186). Rocas (Dodecahedron) y dunas (Sphere) comparten geometría/material por grupo: a `InstancedMesh` son 1 draw call cada uno en vez de 28 y 32, ganancia fácil. Los árboles GLB tienen varios submeshes y requieren mapear materiales por tipo (9 grupos), más trabajo. Priorizar rocas y dunas. Esfuerzo L.
- **Sombras PCFSoft 2048 con `castShadow` en todos los árboles** (game.ts:285, environment.ts:66,292). El shadow pass redibuja cada caster cada frame, duplicando aprox. los draw calls de geometría. Acción: bajar `mapSize` a 1024, acotar el frustum de la shadow camera al área jugable, limitar `castShadow` a casters cercanos, valorar `PCFShadowMap` no Soft. Combina bien con el instancing. Esfuerzo M.

### Otros — NUEVO

- **`checkGroundCollision`: el campo `.collider` siempre es undefined** (CollisionSystem.ts:164). `this.colliders.find((c) => c.mesh.traverse(...))`: `traverse()` devuelve void, el predicado es siempre falsy, y además se ejecuta un `traverse` dentro del `find` en cada raycast de suelo. Ningún consumidor actual lee `.collider` (verificado en CharacterController y DogCompanion), por eso pasa inadvertido; quedará latente si se usa para detección de escalones. Acción: búsqueda real subiendo por `.parent` o con un `Map mesh→collider` precomputado, o eliminar el campo si nadie lo consume. Esfuerzo S. (Reportado por dos auditorías, mismo bug.)
- **Pipeline de animación enteramente FBX** (player.ts:138, public/assets/Player_*.fbx, ~1.5 MB solo el set de salto). FBX parsea más pesado que glTF; afecta carga inicial, no el frame rate. A medio plazo, convertir los clips a un GLB único. No prioritario y atado a que el salto se consolide. Esfuerzo M.

---

## Corrección / Bugs

**Estado general: el caso común (single-player, un solo nivel) funciona; los bugs reales y nuevos están en construcción multinivel y en bordes del inventario. Ninguno crashea, pero corrompen estado en silencio.**

### `gameInstance.levelManager` no existe: edificios aplanados a nivel 0 — NUEVO

SaveSystem.ts:349 (`serializeBuildings`) y :1096 (`registerRestoredBuilding`) leen `this.gameInstance.levelManager`, que es siempre `undefined`: el `LevelManager` real vive en `buildingSystem.levelManager` (BuildingSystem.ts:76) y `Game` nunca asigna `levelManager`. Al guardar, cada edificio se serializa con `level = 0` y `calculateBuildingLevel` queda muerto. Al restaurar, todo cae al fallback legacy y registra las celdas en el nivel actual (0). Las mallas conservan su Y guardada (se ven a la altura correcta), pero la ocupación de celdas y la metadata de nivel colapsan a nivel 0, corrompiendo la validación de colocación de construcciones multinivel. Los saves de un solo nivel hacen round-trip por casualidad. El acceso `undefined` queda oculto porque `gameInstance` es `any`. Acción: cambiar ambas refs a `this.gameInstance.buildingSystem.levelManager`. Revisar después `clearAllExistingBuildings` (SaveSystem.ts:936), que solo limpia la ocupación del nivel actual y dejaría celdas fantasma en otros niveles. Esfuerzo S. **Máxima prioridad de este bloque.**

### Borrar un muro de otro nivel libera celdas del nivel equivocado — NUEVO

BuildingSystem.ts:1223 (`deleteWall`) raycastea `this.builtWalls` (array global, sin filtrar por nivel) y `completeWallBreak` (l.1340) opera sobre los mapas del nivel actual cacheados en `updateLevelReferences`. La causa raíz: las claves de celda son solo `x,z` sin componente de nivel (getCellKey BuildingSystem.ts:686), así que la misma x/z colisiona entre niveles. Estando en nivel 0 se puede romper un muro de nivel 1: sus celdas no están en el mapa de nivel 0, el fallback recalcula y `removeOccupiedCell` las borra del nivel 0 (incorrecto), dejando la celda real de nivel 1 ocupada para siempre (fantasma, no reconstruible). Caso compuesto: si el nivel actual tiene un muro real en la misma x/z, se libera esa celda mientras el muro sigue en escena, permitiendo construir encima de un muro físico. Acción: derivar el nivel desde `objectToBreak.position.y` (vía `calculateBuildingLevel`) y operar sobre ese nivel, o filtrar el raycast a muros del nivel actual. Esfuerzo M.

### `canAddItem` todo-o-nada: pérdida de ítems habiendo hueco — NUEVO

inventory.ts:67: `return this.item.id === item.id && this.quantity + quantity <= this.item.stackSize`. Los bucles de relleno (l.140, 152) pasan el `remaining` completo, así que si un stack parcial tiene hueco pero no cabe todo, se salta; sin slot vacío, `addItem` rompe el while y devuelve menos de lo que cabía. Ejemplo: stack de 60/64 wood + añadir 10 con el resto lleno → se pierden 6. En `moveItem` (l.295), arrastrar un stack sobre otro parcial que no lo absorbe entero hace swap en vez de fusión. Acción: aceptar el stack si `maxAdd = stackSize - quantity > 0` y dejar que `addQuantity` (ya devuelve sobrante) gestione el resto; en `moveItem`, fusionar lo que quepa. Esfuerzo S.

### Bordes menores — NUEVO

- **LevelManager no inicializa estructuras para niveles negativos** (LevelManager.ts:61-64,69). Crea `createLevelGrid(-1)` pero el bucle de inicialización arranca en `minLevel=0`. Hoy `switchToLevel` bloquea -1 (latente). Acción: si no hay sótanos, borrar `createLevelGrid(-1)`; si se quieren, inicializar el rango negativo coherentemente. Esfuerzo S.
- **`ItemStack.deserialize` recorta cantidades y no valida `selectedHotbarSlot`** (inventory.ts:63,380,396). `Math.min(quantity, stackSize)` recorta sin avisar; un `selectedHotbarSlot` fuera de rango da índice inválido. Riesgo bajo (cantidades guardadas vienen de stacks válidos). Acción: clamp de `selectedHotbarSlot` a `[0, hotbarSize-1]` en deserialize. Esfuerzo S.

---

## Persistencia (SaveSystem)

**Estado general: este es el bloque con más hallazgos reales y nuevos, y el de mayor riesgo de fondo, porque opera sobre la única copia de los datos del usuario y casi nada está cubierto por tests. El modelo de cookies+chunking es intencional y correcto (no tocar); el problema está en cómo se manejan los fallos y los esquemas.** Varios fallos se encadenan: un guardado que falla en silencio (más abajo) provoca, en la carga siguiente, el borrado destructivo de la partida parcial.

### Una lectura fallida borra la partida entera — NUEVO

SaveSystem.ts:567-575: el `catch` de `loadGameData` (una lectura) llama a `deleteSave(slotNumber)`, que borra cookie principal, todos los chunks y metadatos. Un chunk genuinamente ausente o un parse irreparable disparan el borrado. El escenario "particionado de cookies de terceros" se autorefuta (la lectura del contador de chunks devolvería null antes y se saldría sin borrar), pero el residuo es legítimo: existen `fixScientificNotation` y `attemptJSONFix` precisamente porque los autores saben que los datos a veces traen rarezas; cuando el fixer no logra arreglarlo, los bytes se borran en vez de preservarse. Acción: no borrar en el catch de una lectura; devolver null y dejar reintentar. Reservar `deleteSave` para acción explícita del usuario. Esfuerzo S.

### El guardado por chunks reporta éxito aunque todas las escrituras fallen — NUEVO

SaveSystem.ts:442-459: `savedChunks++` es incondicional y `setCookie`/`setLocalStorage` tragan sus errores (solo `console.warn`/`error`). Si las escrituras fallan, `saveDataInChunks` no lanza, `saveGame` devuelve true y se loguea "Successfully saved N chunks". El jugador cree que guardó. El disparador es estrecho (exige que cookies y localStorage fallen a la vez, porque hay fallback en cascada), pero la consecuencia es pérdida silenciosa más el borrado destructivo de la carga siguiente. Acción: que `setCookie`/`setLocalStorage` devuelvan boolean, contar solo escrituras verificadas, y si `savedChunks !== chunks.length`, devolver false desde `saveGame`. Esfuerzo M.

### `getSaveMetadata` con `JSON.parse` desnudo — NUEVO

SaveSystem.ts:1269-1271: a diferencia de `loadGameData` (que envuelve el parse), aquí el parse no tiene try/catch. `getSaveSlots()` lo llama para pintar el menú; una cookie de metadatos truncada lanza una excepción no capturada que rompe la pantalla de partidas, aunque el save de datos esté sano. Acción: try/catch devolviendo null (o un metadato "corrupto" marcado), igual que `loadGameData`. Esfuerzo S.

### Los reparadores de JSON pueden corromper saves válidos — NUEVO

SaveSystem.ts:542-545,1437-1463: `fixScientificNotation` se ejecuta proactivamente (antes de parsear) en cuanto el texto contiene `e+`/`E+`, y reescribe por regex toda la cadena, incluidos valores de string (un `itemId` con `e+` se altera). `attemptJSONFix` reescribe NaN/Infinity y comas globalmente. Sobre un JSON válido esto puede transformarlo en algo distinto; y si una reparación rompe el parse, se cae al `catch` que dispara `deleteSave`. Acción: `JSON.parse` primero siempre; reparar solo si falla; operar sobre tokens numéricos, no sobre la cadena completa; nunca encadenar fallo de reparación a `deleteSave`. Esfuerzo M.

### Versionado escrito pero nunca leído — DOCUMENTADO-DIFERIDO (no re-proponer como nuevo)

SaveSystem.ts:79,470 escribe `version: '1.0.0'` y nadie lo lee al cargar. No hay gating de esquema ni migración. **Esto es exactamente el item explícitamente diferido con sign-off** ("versionado/migración de saves en runtime, cambio sensible para compatibilidad de partidas"). Se deja parqueado a propósito, no entra en P0/P1. Se menciona aquí solo para cerrar el hilo: cuando se aborde, leer `saveData.version` y ramificar con migraciones `up()` encadenadas, centralizando la forma del save en un tipo.

### Serialización muerta y carrera save/restore — NUEVO

- **`serializeTrees`/`serializeRocks` leen propiedades inexistentes** (SaveSystem.ts:195-196,230). `Environment` solo expone `loadedTrees`, no `.trees`/`.rocks`, así que ambos emiten siempre `[]` y `restoreEnvironmentData` nunca los lee. La persistencia real de árboles vive en `choppedTrees` + seed (YA-HECHO). Es código muerto engañoso. Acción: eliminarlos o reescribirlos contra `loadedTrees`, y documentar que el estado de árboles va por `choppedTrees`. Esfuerzo S.
- **Sin guarda `isRestoring`** (SaveSystem.ts:498,1418). `restoreGameData` es asíncrono y no hay flag que bloquee `saveGame` mientras restaura; un auto-save que coincida con una restauración serializaría estado parcial. Probabilidad baja (el primer auto-save tarda 5 min). Acción: flag `isRestoring` que `saveGame` respete. Esfuerzo S, confianza baja.

---

## Testing

**Estado general: 34 tests verdes, pero `coverage.include` está acotado a `inventory.ts`, `SaveSystem.ts` y `shared/rng.ts` (decisión deliberada para que el número sea honesto). Lo crítico del save y la matemática de grid/colisión no se ejercita. La estrategia correcta es atacar primero lo barato de instanciar.**

### Lo que de verdad falta — NUEVO (salvo donde se indica)

- **Round-trip de chunking del save** (SaveSystem.ts:427, :509). El camino que parte y recompone la partida en >1 cookie nunca se prueba de extremo a extremo. Un off-by-one en el conteo deja una partida grande irrecuperable y, peor, `loadGameData` la borra en el catch. Test jsdom: bajar `maxCookieSize`, `save`→`load`, assert string idéntico (incluye Unicode multibyte por `encodeURIComponent`), más el caso de fallback a localStorage. **DOCUMENTADO-FRÁGIL** (figura en el roadmap como P2/B), severidad alto por el impacto que el propio doc le asigna. Es el test que ancla todo el cluster de persistencia. Esfuerzo M.
- **Test de round-trip de seed + choppedTrees a través del save** (saveSystem.test.ts:1-40). Los cambios recientes (e52493f/9850da3) testean el determinismo de Environment, no que la seed y los árboles talados sobrevivan al ciclo completo `collect→save→load→restore`. Esfuerzo M.
- **`CollisionSystem.checkGroundCollision`/`checkHorizontalCollision` sin test** (CollisionSystem.ts:110,177). El test del controlador usa un stub plano, no el raycast real. Verificado que un test headless en node pasa (construir `CollisionSystem`, `addCollider` de un plano en y=0, assert `groundHeight≈0`). **DOCUMENTADO** (roadmap P2 lo lista como "Tests de CollisionSystem"). Esfuerzo M.

### Victorias baratas, harness ya disponible — NUEVO

Ordenadas por relación valor/coste. Todas se testean con el patrón que ya usa `saveSystem.test.ts` (`new SaveSystem({})` o métodos estáticos en node):

- **`calculateBuildingLevel` ↔ `getLevelY`** (SaveSystem.ts:1233, LevelManager.ts:121). Son inversas exactas (baseY=6, levelHeight=4). Test de invariante `level→Y→level` + casos de clamp. `new SaveSystem({})` con un `levelManager` mock. Esfuerzo S. **El arranque de coste cero.**
- **`WallIntersectionHelper`** (WallIntersectionHelper.ts:21,65). Métodos estáticos, sin acoplamiento de constructor: el más barato del repo. `getIntersectionSeverity` con `overlapVolume` en los bordes (0, 0.5, 0.51, 2.0, 2.01). Esfuerzo S.
- **`FarmingSystem`** (FarmingSystem.ts:66,72,88). `isValidSeed` (doble vía type/substring), `getSlotsNearPosition` (filtro por radio), `plantSeed` (libre→true, ocupado→false). Esfuerzo S.
- **`BuildingSaveManager.getAllBuiltObjectsForSaving`** (BuildingSaveManager.ts:26,116). Dedupe por umbral 0.01 y mapeo `nameToTypeMap`; inyectable con un mock liviano de `buildingSystem`. Esfuerzo M.
- **`LevelManager`** (LevelManager.ts:129,199). Requiere jsdom (constructor hace `addEventListener`). Validar límites de `switchToLevel` y aislamiento de celdas por nivel. Esfuerzo M.

### Requiere extraer primero — NUEVO

- **Matemática de rotación de celdas duplicada byte-a-byte** entre BuildingSystem.ts:727 (`calculateRotatedCells`) y SaveSystem.ts:1181 (`calculateRotatedCellsForRestore`), solo difieren en un `console.log`. La salida de la copia de SaveSystem se consume en el load vivo (escribe ocupación real), así que un arreglo en una sin la otra desincroniza colocación y carga. **DOCUMENTADO-FRÁGIL parcial:** el roadmap propone extraer `gridMath` pero solo nombra la copia de BuildingSystem, no la de SaveSystem ni el par de drift. Acción: test de caracterización sobre la copia de SaveSystem (4 rotaciones + multicelda, testeable hoy) y luego extraer ambas a `packages/shared/gridMath.ts`. La extracción es lo que desbloquea testear `calculateRotatedCells`, atrapada tras el constructor async de BuildingSystem. Esfuerzo M.
- **`snapToGrid`/`getCellKey`/`getOccupiedCells`** (BuildingSystem.ts:666,682,689). Funciones puras (incluido el offset mágico 0.001), atrapadas tras la carga GLTF del constructor. La misma extracción a `gridMath.ts` las desbloquea. Esfuerzo L.

### Notas

- **`ResourceSystem`/`HealthSystem`** (ResourceSystem.ts:32, HealthSystem.ts:36). Hay lógica con valor (reembolso `floor(cost/2)`, clamp de vida 0..max) mezclada con DOM. Testear solo la aritmética: `ResourceSystem` es inyectable (node), `HealthSystem` necesita jsdom o extraer el clamp. Saltar el display. Esfuerzo S.
- **`coverage.include` hardcodeado** (vitest.config.js) — CONOCIDO-INTENCIONAL. Acotarlo es deliberado para no tener un número global engañoso sobre 18k líneas. Acción: al añadir cada test nuevo, sumar ese módulo a `coverage.include`; no ampliar a `src/**`.

---

## Calidad y mantenibilidad

**Estado general: duplicación que el roadmap ya prevé consolidar (P2) y un puñado de números mágicos repetidos, uno de ellos con divergencia viva.**

### Divergencia viva: fallback de `cellSize` 3.5 vs 1.0 — NUEVO (bug)

BuildingSystem.ts:692 usa `cellSize ... : 3.5` y SaveSystem.ts:1145 usa `... : 1.0` para el mismo caso "definición ausente en el registro". Si un edificio se coloca o restaura sin definición, las celdas ocupadas al cargar no coinciden con las de la colocación: colisiones distintas entre la partida viva y la recargada. Camino poco frecuente pero silencioso. Acción: unificar el fallback en una constante `DEFAULT_CELL_SIZE`, o mejor, reutilizar la misma función de cálculo en ambos caminos. Esfuerzo S.

### Duplicación que el roadmap ya prevé — NUEVO (los hallazgos) / DOCUMENTADO (la solución P2)

- **Carga GLTF duplicada en 6 métodos** (player.ts:888-1013; environment.ts:230; ItemDropSystem.ts:239; BuildableObjectsRegistry.ts:120). Loader + Promise + traverse de materiales mate (`metalness=0`/`roughness=1`, repetido en 17 sitios). Ya hay divergencias (apple aplica el material, axe no). Acción: extraer un `ModelLoader` con `loadGLTF(url)` y `applyMatteShadows(obj)`. Es el item P2 "ModelLoader compartido". Esfuerzo M. (Bonus: elimina de golpe muchos `traverse((child: any))`.)
- **`playAnimation` + crossfade 0.2 duplicado** entre player.ts:201 y DogCompanion.ts:149. Acción: base `AnimatedActor` con `CROSSFADE_DURATION=0.2`. Item P2 "AnimatedActor compartido". El companion multijugador necesitaría una tercera copia si no se hace. Esfuerzo M.
- **Clave de celda con offset 0.001 en 3 sitios** (BuildingSystem.ts:684,695; SaveSystem.ts:1149) y **`gridSize 2.0` en 3 sitios** (LevelManager.ts:37; BuildingSystem.ts:76; SaveSystem.ts:1146). Constantes `GRID_EPSILON` y `DEFAULT_GRID_SIZE` en un módulo único; se resuelven junto con la extracción de `gridMath.ts`. Esfuerzo S.
- **CSS-in-JS repetido en cada UI** (LoadingScreen.ts:56; InGameUI.ts:39,200,376; inventoryUI.ts:64; MainMenu.ts:97). Helper `injectStyles(id, css)` idempotente por id. No hay hoja central (documentado en CLAUDE.md como intencional). Esfuerzo S.

### Código muerto y deuda conocida

- **36 variables/imports sin usar confirmados por lint** — NUEVO (rosieControls.ts:164-171; player.ts:251-268; ItemDropSystem.ts:2; game.ts:429,892). Eliminar los confirmados. Excluir los ficheros con la feature de salto sin commitear (CharacterController.ts, player.ts jump*). Esfuerzo S.
- **Casing inconsistente de ficheros** — DOCUMENTADO-FRÁGIL (environment.ts vs CharacterController.ts). Un import con casing equivocado compila en macOS y rompe en Linux/CI. No renombrar en masa ahora; fijar convención y migrar por tandas con `git mv` validando en CI Linux. Mientras, casing exacto al importar.
- **~224 `any` y 77 casts** — NUEVO. Parte es legítima (frontera Three/DOM). No perseguir el conteo; estrechar al extraer `applyMatteShadows`/`ModelLoader` y acotar el resto a fronteras documentadas.

---

## Logging — un solo hallazgo, reportado por cuatro auditorías

**Estado: el "drop console en prod" de Vite está YA-HECHO pero es PARCIAL.** El build solo elimina `console.log`/`info`/`debug` (vite.config.js:18, `esbuild.pure`), así que ~123 llamadas `console.error`/`warn` (64 + 59) sobreviven al bundle de producción. Y `ScriptsLoader-Universal.js:285` parchea `console.error` para hacer `window.parent.postMessage(..., '*')`: cada error reenvía mensaje y stack al padre (incluido `outerHTML` del recurso en errores de carga). Hay 604 `console.*` en `src/`, varias en rutas por frame o casi (game.ts:472,491,568; DogCompanion.ts:381,420; environment.ts:385 por árbol; ItemDropSystem.ts:60 por drop). Acción única: un logger con niveles gateado por entorno (`import.meta.env`), enrutar o silenciar `console.error`/`warn` en producción, y retirar el logging de bucles calientes. Esfuerzo M, transversal, no bloquea.

---

## Seguridad y build

**Estado general: superficie acotada y bien razonada. Las decisiones intencionales (cookies, sourcemaps) se mantienen. El único frente accionable es la validación de `origin` en el listener de mensajes del host.**

### Sin validación de origin en el listener del host — NUEVO

ScriptsLoader-Universal.js:13 atiende `requestCanvasRecording` y `requestScreenshot` de cualquier emisor sin comprobar `event.origin`, y responde con `targetOrigin '*'`. Riesgo acotado: las clases puente (ChatManager/ImageGenerator/OGP) no se usan en `src/` y van protegidas por un `requestId` con `crypto.randomUUID()`, así que no son forjables. La superficie real es `ScriptsLoader-Universal.js`, que sí se despliega y devuelve la imagen/vídeo del propio canvas del juego a quien lo pida; además `window.onerror` y el parche de `console.error` reenvían mensajes internos con `'*'`. Es fuga de información (captura del canvas, no secretos cross-origin), no ejecución de código. En standalone es inerte (ruta absoluta que no resuelve bajo `base './'`). **Es el item P2 "endurecer postMessage".** Acción: validar `event.origin` contra una allowlist del host antes de actuar (en especial screenshot/recording), sustituir los `targetOrigin '*'` por el origin esperado. Esfuerzo M.

### Self-XSS por innerHTML — NUEVO (latente, hoy mitigado)

inventoryUI.ts:1508 (y DogCompanion.ts:1029,1079; MainMenu.ts:772) interpolan datos de ítem/save en `innerHTML`. Hoy no hay vía de inyección: los nombres salen del registro fijo (`createSampleItems`), los iconos son emojis constantes, la carga resuelve por `itemId` contra el registro y `metadata.location` es la cadena fija "Starting Area". El riesgo es de regresión: si algún nombre/ubicación pasa a ser editable o a venir del save sin pasar por el registro, se vuelve self-XSS. Acción: fijar la convención de `textContent`/escape para campos que puedan volverse dinámicos; reservar `innerHTML` para markup estático. No urge. Esfuerzo M.

### Decisiones intencionales — CONOCIDO-INTENCIONAL (dejar como están)

- **Modelo de cookies del save** (SaveSystem.ts:1301): `SameSite=None;Secure;Partitioned` + fallback a localStorage + chunking está justificado por el contexto iframe (storage de terceros particionado). Solo se persiste estado de juego, sin datos personales ni tokens. Mantener; única nota, no meter datos sensibles en el save sin revisar este canal.
- **Sourcemaps en producción** (vite.config.js:13): el repo es público en GitHub, los `.map` no exponen nada nuevo. Aceptable; si un despliegue dejara de ser público, reconsiderar `hidden`.

### P0 abierto reconocido (no comprobable headless)

Verificar el comportamiento real de storage (cookies/Partitioned) dentro del iframe del host. No es un hallazgo nuevo, es el único P0 abierto que el roadmap ya reconoce y que solo se cierra probando en el host real. Refuerza la prioridad de los hallazgos #2 y #7 de la tabla: si el storage falla en el iframe, el guardado-que-miente y el borrado-en-lectura son justo lo que convierte ese fallo en pérdida de partidas.

---

## Hoja de ruta sugerida

Tres olas, coherentes con la dirección multijugador ya decidida (co-op persistente, standalone, AWS autogestionado).

### P0 — ahora (integridad de datos, esfuerzo bajo)

El cluster de persistencia más el bug de inventario. Todo S/M, todo con consecuencia de pérdida silenciosa de datos del usuario:

1. `levelManager` ref correcta (tabla #1, S).
2. Quitar `deleteSave` del catch de lectura (#2, S).
3. try/catch en `getSaveMetadata` (#3, S).
4. `canAddItem` con relleno parcial (#4, S).
5. Guardado por chunks que propaga el fallo real (#7, M).
6. **Test de round-trip de chunking** (#9, M): ancla los cinco anteriores y evita que se rompan al refactorizar.

En paralelo, cerrar el P0 abierto: probar storage dentro del iframe del host (manual, no headless).

### P1 — próximas semanas

Bugs de corrección restantes, limpieza de tipos ahora accionable, y quick wins de rendimiento:

- Borrado de muro entre niveles (#10, M) y reparadores de JSON no destructivos (#8, M).
- Divergencia de `cellSize` 3.5/1.0 (S) y serializadores muertos `serializeTrees`/`serializeRocks` (S).
- Deuda de tipos accionable: sustituir los `any` de migración terminada por las clases reales (M), tipar el singleton `window.gameInstance` (S), `GameApi` mínima (M), DebugUI usa `this.game` (S), hack de `ItemStack` resuelto con import (S).
- Rendimiento barato: cachear meshes de árbol en TreeChopping (#5, S) y cachear `meshesToTest` + excluir agua del set de suelo (#12, M).
- Logger transversal con niveles, que de paso recorta los `console.error`/`warn` que sobreviven al build y se reenvían al host (M).
- Cosecha de tests baratos: `calculateBuildingLevel`/`getLevelY`, `WallIntersectionHelper`, `FarmingSystem` (todos S).

### P2 — apuestas grandes (prerrequisitos del multijugador)

Lo ya documentado y diferido, que el modo standalone/co-op convierte de "mantenibilidad" en "necesario":

- Trocear BuildingSystem (input/preview/hit-test) como prerrequisito del patrón de comandos para sincronizar mundo.
- Ciclo de vida simétrico: handlers nombrados / `AbortController`, `game.destroy()` completo con `renderer.dispose()`, `Environment.dispose()` para liberar GPU, manejo de pérdida de contexto WebGL. Es lo que hace posible el rebuild de mundo sin fugar.
- Helpers compartidos `ModelLoader` y `AnimatedActor` (el companion multijugador necesitaría una tercera copia si no).
- Extraer `packages/shared/gridMath.ts` (incluyendo la copia de SaveSystem, que el item original no contempla): elimina la duplicación de rotación de celdas y desbloquea sus tests.
- Rendimiento de fondo: olas en vertex shader, InstancedMesh para rocas/dunas (y luego árboles), presupuesto de sombras (1024 + frustum acotado), FBX→glTF cuando el salto se consolide.
- Sustituir los `setTimeout` de sync por await de eventos reales, fichero a fichero.
- Endurecer postMessage (allowlist de origin) y fijar la convención `textContent` para los campos que puedan volverse dinámicos.
- Normalizar el casing de ficheros por tandas con validación en CI Linux.

Fuera de las olas, parqueado con sign-off explícito: el versionado y la migración de saves en runtime. Es la pieza que faltará el día que el esquema cambie en serio, pero su cambio es sensible para la compatibilidad de partidas y ya tiene decisión de diferirlo.
