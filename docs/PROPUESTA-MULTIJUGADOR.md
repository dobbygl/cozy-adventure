# Propuesta: servidor multijugador para "cozy-adventure"

> **Estado (2026-06-28): IMPLEMENTADO y mergeado a `main`.** Esta propuesta se ejecutó como spec 002 (servidor autoritativo, `@cozy/server`) y spec 003 (refactor del cliente, capa `apps/game/src/net/`): P1 presencia/relay, P2 mundo compartido por comandos (con el bucle recurso→inventario cerrado vía `inventory_delta`), P3 reconexión y teardown simétrico. Lo verificado es headless + un playtest de P1; pendiente el playtest navegador de P2/P3 y el despliegue standalone en AWS. Este documento se conserva como la dirección de diseño original; el detalle vive en `specs/002-multiplayer-server/` y `specs/003-multiplayer-client/`.

## Resumen ejecutivo

El encargo es implementar multijugador. Antes de diseñar nada conviene fijar una verdad incómoda: el servidor es la parte fácil. El coste real está en el cliente, que hoy es un juego monolocal sin una sola línea de red, con física cliente-autoritativa, generación de mundo no determinista y entidades sin identidad estable. Montar un proceso Node que acepte WebSockets se hace en una tarde. Que el juego que ya existe pueda hablar con él sin reescribirse a medias es el trabajo de verdad.

Esta propuesta parte de cuatro decisiones ya tomadas, que acotan el espacio de diseño:

- **Modelo: co-op con mundo persistente.** Grupos pequeños, pero el mundo vive en el servidor entre sesiones (modelo servidor dedicado, estilo Valheim o Minecraft). No es un MMO: la infraestructura se dimensiona para decenas de salas de pocos jugadores, no para miles de jugadores en un mundo único.
- **Despliegue: standalone.** El juego sale del iframe del playground. Control total de red y CSP, transporte realtime sin intermediarios. Esto elimina el mayor bloqueante potencial (que la CSP del host bloquease conexiones salientes), pero implica resolver fuera lo que el host daba gratis: servir el bundle, autenticar y, sobre todo, la grabación de canvas y el puente con el LLM que hoy viven en `ScriptsLoader-Universal.js` vía `postMessage`.
- **Infraestructura: AWS autogestionado.** Servidor Node con estado en memoria por sala, sobre ECS/Fargate, detrás de un balanceador con WebSockets, y persistencia gestionada (DynamoDB o RDS).
- **Horizonte: apuesta de producto.** Justifica hacer bien el refactor del cliente desde el principio (separar input de estado, inyectar un `NetworkSystem` por constructor) en lugar de parchear. La deuda que se asuma aquí se paga cara, porque toca los sistemas más grandes del repo.

Hay dos hallazgos del código que condicionan todo lo demás y que conviene tener delante desde la primera línea de diseño. El primero: `environment.js` coloca los ~108 árboles con `Math.random` y reintentos, así que dos clientes generan bosques distintos. Un mundo compartido exige que el servidor sea el dueño del layout. El segundo: las entidades se identifican hoy por `mesh.uuid` de Three.js, que se regenera en cada sesión y en cada cliente. Para que un evento "talar el árbol 42" signifique lo mismo en todas las máquinas hace falta un sistema de IDs de red que ahora no existe. Ninguno de los dos es difícil por separado, pero los dos tocan código que hoy asume un único jugador en una única máquina, y por eso son prerrequisitos, no detalles de implementación.

Esta propuesta es complemento de `PROPUESTA-MEJORAS.md`, no sustituto. Varias mejoras que allí son P2 (trocear `BuildingSystem`, sustituir `window.*` por inyección de dependencias, `destroy()` simétrico) dejan de ser opcionales aquí: son la superficie sobre la que se construye la red.

## Punto de partida (diagnóstico orientado a red)

El juego es 100% cliente. `main.js` arranca `Game`, que en `update()` mueve el `CharacterController`, anima al jugador, resuelve recogidas, drops, tala y colisiones, todo en local y todo cada frame. El estado se guarda en cookies con chunking vía `SaveSystem`. No hay backend de ningún tipo. Las señales que marcan el terreno para multijugador:

| Señal | Estado actual | Implicación para red |
|---|---|---|
| Capa de red | No existe | Hay que construirla entera |
| Autoridad de física | Cliente, en `CharacterController.updatePhysics` | Sirve para el avatar propio; el mundo necesita autoridad de servidor |
| Timestep | `deltaTime` variable, clampado a 0.1, sin paso fijo | Descarta lockstep determinista; obliga a sincronización por estado |
| Input → estado | El input muta posición/inventario directamente | Las mutaciones de mundo necesitan separarse en comandos |
| Generación de mundo | `Math.random` en `environment.js` (12 usos) | No determinista: el servidor debe ser dueño del layout |
| Identidad de entidades | `mesh.uuid` de Three.js, por sesión y por cliente | Hace falta un registro de IDs de red estables |
| Estado compartido candidato | Edificios, árboles, drops, hora del mundo | Vive en el servidor, autoritativo |
| Estado por jugador | Inventario, salud, ítem en mano, cámara | Lo posee cada cliente; el servidor lo almacena |
| Persistencia | Cookies/localStorage cliente | En MP, autoritativa en servidor |
| Pausa al ocultar pestaña | `pause()` congela el clock | En un mundo compartido no se puede pausar; hay que desacoplar render de simulación y mantener vivo el socket |
| Acoplamiento al global | `window.gameInstance` (39 lecturas) | El `NetworkSystem` debe entrar por DI, no por global |

La base arquitectónica ayuda más de lo que parece. `Game` ya compone sus sistemas por inyección de dependencias en el constructor, así que hay un punto de inserción limpio para un `NetworkSystem`. `Player` (malla, animaciones, ítem en mano) es reutilizable casi tal cual para pintar avatares remotos. Y `SaveSystem` ya define el reparto de estado por categorías (player, inventory, environment, buildings, worldState): ese esquema de serialización es, prácticamente, el esquema de estado de red que necesitamos, y conviene reutilizarlo en lugar de inventar otro.

## Arquitectura propuesta

### Modelo de autoridad: servidor dueño del mundo, cliente dueño de su avatar

La tentación en un juego con servidor persistente es hacerlo todo autoritativo: que el servidor simule la física de cada jugador y los clientes predigan y reconcilien. Es lo correcto para un shooter competitivo y es desproporcionado para un co-op cozy entre amigos. Esa vía obliga a reescribir `CharacterController` en torno a un bucle de predicción y rollback, que es el refactor más caro posible y el que más probabilidades tiene de hundir el proyecto.

La elección proporcionada para este caso, y la que recomiendo, reparte la autoridad en dos:

- **El avatar propio es cliente-autoritativo.** Cada cliente sigue simulando su personaje con el `CharacterController` actual y emite su transform y su estado de animación. Como el avatar de nadie depende del input de otro, no hace falta predicción ni reconciliación: los demás simplemente interpolan tu posición. El servidor valida de forma barata (tope de velocidad y la guarda anti-teleport de 3.0 que ya existe en `CollisionSystem`) y reenvía. Coste de refactor bajo, latencia percibida buena.
- **El mundo es servidor-autoritativo.** Construir, talar, recoger, soltar y cualquier acción que afecte al estado persistente o al inventario pasa por el servidor: el cliente pide, el servidor valida y aplica sobre el mundo canónico, y difunde el resultado. Esto es lo que impide duplicar recursos, talar dos veces el mismo árbol o que dos jugadores construyan en la misma celda.

El precio honesto de esta elección: un cliente manipulado puede falsear su posición. Para un grupo de amigos de confianza es aceptable, y es ampliable después (si algún día hace falta anti-cheat serio, se añade simulación de movimiento en servidor sin tirar lo construido). No vendo anti-cheat que no vamos a implementar.

### Transporte: WebSocket sobre AWS

WebSocket, no WebRTC. El co-op cozy sincroniza estado a ~15 Hz, no necesita la latencia de UDP ni los data channels de WebRTC, que añaden señalización, STUN/TURN y complejidad operativa que aquí no paga. WebSocket sobre TCP da orden y fiabilidad, encaja con el balanceador de AWS y es trivial de depurar. Al ser standalone, la conexión va directa del cliente al endpoint, sin la CSP del host de por medio.

### Modelo de sincronización: dos canales

No todo el estado se sincroniza igual. Mezclar los dos modos es el error clásico.

1. **Avatares, por estado interpolado.** Cada cliente envía su transform (posición, rotación) y su estado de movimiento (`idle`/`walking`/`running`, que `CharacterController.getMovementState()` ya calcula) más el ítem en mano, a ~15 Hz. Los clientes remotos guardan los dos o tres últimos estados y renderizan con un retardo de interpolación de ~100 ms, suavizando entre snapshots. Esto absorbe el jitter de red y evita el teletransporte visual. La animación y el ítem en mano de `Player` se reutilizan tal cual.

2. **Mundo, por comandos y eventos.** Las mutaciones son discretas y van por petición/confirmación, no por estado continuo. El cliente emite un comando (`place_building`, `chop_tree`, `pickup_drop`, `drop_item`), el servidor lo valida contra el estado canónico, lo aplica y difunde el evento resultante a la sala. Los clientes pueden aplicar de forma optimista y revertir si el servidor rechaza (pulido opcional de fase posterior; en la primera versión basta aplicar al confirmar).

### Reparto de estado

Reutilizando el troceo que `SaveSystem` ya hace:

- **Por jugador (lo posee el cliente, lo almacena el servidor):** inventario, salud, ítem seleccionado, posición y cámara. La cámara no se difunde a los demás.
- **Compartido (servidor-autoritativo):** edificios (el `BuildingSaveManager` ya serializa por tipo de registro), estado de los árboles (cuáles talados y su reaparición), drops en el suelo, hora y estado del mundo.
- **Decisión abierta, el perro:** `DogCompanion` puede ser una entidad por jugador (cada uno tiene el suyo y los demás lo ven) o un compañero compartido. Recomiendo por jugador, atado a su dueño, para evitar disputas de control. Queda como punto a confirmar.

### Identidad de entidades y determinismo del mundo

Estos son los dos prerrequisitos del resumen, ahora en concreto.

**IDs de red.** Hace falta un registro de identidad estable, asignada por el servidor, para toda entidad sincronizable: jugadores, edificios, árboles y drops. Hoy el código usa `mesh.uuid`, que no sirve porque el árbol 42 del cliente A tiene un uuid distinto al del cliente B. La propuesta es un `entityId` numérico o string corto que el servidor asigna y que viaja en `userData.networkId`, con un mapa `networkId → mesh` en cada cliente para resolver eventos entrantes. Toca `environment.js` (al crear árboles), `BuildingSystem` (al colocar) e `ItemDropSystem` (al soltar).

**Mundo canónico.** Como `environment.js` siembra con `Math.random`, el servidor debe ser la fuente del layout. Dos vías: enviar la semilla y hacer la generación determinista (refactor de `environment.js` a un RNG sembrado, p. ej. mulberry32, en lugar de `Math.random`), o enviar un snapshot completo del mundo al entrar. Recomiendo semilla más diffs: el servidor guarda la semilla inicial y la lista de cambios aplicados (árboles talados, edificios puestos, drops activos). Al entrar, el cliente genera el mundo base de forma determinista y aplica los diffs. Mantiene el ancho de banda de entrada bajo y la semilla cabe en un mensaje. La generación determinista es además un requisito que conviene tener aunque no fuese por la red, porque hace el mundo reproducible y depurable.

### Persistencia

El servidor es ahora la autoridad del guardado. La buena noticia es que no hay que diseñar el formato: se reutilizan las funciones `serialize`/`deserialize` de `inventory.js`, `BuildingSaveManager` y el resto del esquema de `SaveSystem`. Lo que cambia es dónde vive. Recomiendo DynamoDB para los documentos de mundo y de jugador (clave por `worldId` y por `playerId`), por encaje con un modelo de documento y operación cero. Si el equipo prefiere relacional, RDS Postgres también vale; la decisión es de operación, no de arquitectura de juego. El servidor persiste de forma periódica y al desconectar el último jugador de una sala. `SaveSystem` en cookies se mantiene solo para el modo un jugador, si se conserva ese modo.

## Infraestructura AWS

El punto no obvio es que las salas tienen estado en memoria (el mundo cargado, las posiciones, la lógica de validación), así que el patrón API Gateway WebSocket más Lambda, que es sin estado, encaja mal: obligaría a rehidratar el mundo desde la base de datos en cada mensaje. Para salas con estado, lo natural es un servidor Node persistente.

Topología recomendada:

```
Cliente (navegador, standalone)
        │  WSS
        ▼
  Network Load Balancer  (o ALB con soporte WebSocket)
        │
        ▼
  Servicio de salas  (Node + ws, en ECS/Fargate)
   - una tarea aloja N salas en memoria
   - valida comandos, difunde eventos, simula la hora del mundo
        │
        ├──► DynamoDB   (estado de mundo y de jugador)
        ├──► (opcional) ElastiCache/Redis  (registro de salas, presencia, fan-out entre tareas si se escala a varias)
        └──► S3          (assets si se sirven aparte; grabaciones de canvas si se mantiene esa función)
```

Para el horizonte de producto pero escala de co-op, empezar con una sola tarea Fargate por región es suficiente, y se escala añadiendo tareas con un registro de salas en Redis cuando una sola tarea se quede corta. Faltan tres piezas transversales: autenticación (quién es cada jugador y a qué mundo puede entrar), un servicio ligero de matchmaking o lobby (crear o unirse a una sala por código) y observabilidad (CloudWatch, métricas de jugadores por sala y latencia). Como el juego deja de estar embebido, hay que decidir también el alojamiento del cliente (S3 más CloudFront es lo natural) y qué hacer con las funciones que hoy daba el host: la grabación de canvas y el puente con el LLM de `ScriptsLoader-Universal.js` y `ChatManager.js`. Si esas funciones siguen siendo necesarias, pasan a ser endpoints propios; si no, se retiran al salir del iframe.

## Cambios en el cliente (el grueso del trabajo)

Por orden de dependencia, no de visibilidad:

1. **`NetworkSystem` nuevo, inyectado por DI en `Game`.** Posee la conexión WSS, el alta en la sala, la serialización de mensajes y un registro de entidades remotas. Es el punto de entrada de toda la red y no debe leer `window.gameInstance`: se pasa por constructor, como el resto de sistemas.

2. **`RemotePlayer` nuevo, reutilizando `Player`.** Un avatar remoto no usa `CharacterController` ni input: recibe estado de red y mueve su malla por interpolación. La carga de modelo, el mixer de animaciones y el ítem en mano de `Player` se reaprovechan; lo que se sustituye es la fuente de movimiento.

3. **Emisión del avatar propio.** Un enganche en `Game.update()`, después de `characterController.update()`, que muestrea transform y estado de movimiento y los encola al `NetworkSystem` a ritmo limitado (~15 Hz, no por frame).

4. **Convertir las mutaciones de mundo en comandos.** Es la mayor parte del esfuerzo y toca los sistemas más grandes. Hoy `BuildingSystem` (2356 líneas, el monolito del repo), `TreeChoppingSystem`, `ItemDropSystem` y la ruta de recogida en `game.js` mutan el estado local directamente sobre el input. Hay que interponer la capa de comando: pedir al servidor, aplicar al confirmar. Aquí es donde la mejora P2 de `PROPUESTA-MEJORAS.md` de trocear `BuildingSystem` deja de ser opcional, porque sincronizar un monolito de 2356 líneas es mucho más arriesgado que sincronizar piezas con responsabilidad acotada.

5. **IDs de red y mundo determinista.** Lo descrito arriba: `networkId` en las entidades y `environment.js` sembrado desde el servidor.

6. **Desacoplar pausa de simulación.** En un mundo compartido no se puede congelar el mundo al ocultar la pestaña. El socket debe seguir vivo (con ping para que el servidor no expulse la sala) aunque el render se ralentice. Esto cambia el comportamiento actual de `pause()`.

7. **Limpieza de sesión.** Reconexión, expulsión y cambio de sala obligan a un `destroy()` simétrico de verdad (la mejora P2 de `AbortController` y disposición de recursos). Sin eso, cada reconexión filtra listeners y un renderer.

## Hoja de ruta por fases

La secuencia está pensada para tener algo jugable pronto y para que cada fase deje el terreno preparado para la siguiente.

### Fase 0: prerrequisitos (sin red visible todavía)

IDs de red en las entidades, generación de mundo determinista desde semilla, separación de input y comando en los sistemas de mundo, y el esqueleto del `NetworkSystem` y el servidor de salas que solo hace eco. No se ve nada nuevo en pantalla, pero sin esto lo demás no se sostiene. Esfuerzo alto. Es la fase que más conviene no escatimar.

### Fase 1: presencia y avatares

Ver a otros jugadores moverse en tiempo real, con sus animaciones e ítem en mano, sin mutaciones de mundo todavía. Es el primer hito visible y el más motivador, y valida el transporte, la interpolación y `RemotePlayer` de punta a punta. Esfuerzo medio.

### Fase 2: mundo compartido y persistencia

Construir, talar, recoger y soltar sincronizados y validados por el servidor, con el mundo persistido en DynamoDB. Es el corazón del modelo elegido y donde se cobra el trabajo de la Fase 0. Resolución de conflictos básica (quién se queda el drop, quién construye en la celda). Esfuerzo alto.

### Fase 3: robustez y escala

Reconexión limpia, manejo de desconexión a media acción, validación anti-cheat de cordura, pruebas de carga por sala, y la decisión de escalado a varias tareas Fargate con registro de salas en Redis si hace falta. También la migración o convivencia con el guardado un jugador. Esfuerzo medio, pero es lo que separa una demo de un producto.

## Riesgos y decisiones abiertas

- **El monolito `BuildingSystem` es la superficie más arriesgada.** Es el sistema más grande y el que más estado de mundo mueve. Trocearlo (P2 en la propuesta de mejoras) debería ir antes o en paralelo a su sincronización, no después.
- **Si algún día vuelve a embeberse en un iframe**, reaparece el bloqueante de CSP que el modo standalone elimina. Conviene dejar el transporte aislado en `NetworkSystem` para que ese cambio sea local.
- **Funciones del host huérfanas al salir del iframe:** grabación de canvas y puente con el LLM. Hay que decidir si se reimplementan como endpoints propios o se retiran.
- **Grado de predicción optimista.** La primera versión aplica al confirmar (más simple, algo de latencia percibida en construir). Pasar a optimista con rollback es pulido de Fase 3, no de salida.
- **Tolerancia al cheating.** La propuesta asume grupos de confianza. Si el público cambia, el modelo de autoridad de movimiento debe revisarse.
- **El perro compañero:** por jugador o compartido (recomendado por jugador).
- **Migración de partidas existentes** de cookie a mundo de servidor, si se quiere conservar el progreso un jugador actual.

## Tabla resumen

| Decisión | Recomendación | Motivo |
|---|---|---|
| Autoridad de movimiento | Cliente, con validación de servidor | Evita el refactor de predicción/rollback; proporcionado para co-op |
| Autoridad de mundo | Servidor | Mundo persistente y consistente, sin duplicados |
| Transporte | WebSocket sobre AWS | ~15 Hz no necesita WebRTC; encaja con el balanceador |
| Sync de avatares | Estado interpolado, ~15 Hz, buffer ~100 ms | Suaviza jitter, reutiliza `Player` |
| Sync de mundo | Comandos validados + eventos | Discreto y autoritativo |
| Esquema de estado | Reutilizar serialización de `SaveSystem` | No reinventar el formato |
| Identidad de entidades | `networkId` asignado por servidor | `mesh.uuid` no es estable entre clientes |
| Mundo canónico | Semilla determinista + diffs | `environment.js` hoy usa `Math.random` |
| Persistencia | DynamoDB (o RDS) en servidor | Estado autoritativo fuera del cliente |
| Cómputo | Node con estado en ECS/Fargate | Salas con estado en memoria; Lambda encaja mal |
| Inserción en el cliente | `NetworkSystem` por DI en `Game` | No acoplar a `window.gameInstance` |
| Primer hito jugable | Fase 1, presencia de avatares | Valida el transporte con el mínimo riesgo |
