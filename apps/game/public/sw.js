// Service worker de Cozy Adventure. Empaquetado del lado del cliente: la PWA NO cambia la lógica
// del juego; solo da offline tras la primera carga (single-player sigue siendo el modo por defecto,
// con guardado en cookies). Cacheo en runtime (no precache de nombres hasheados): la primera carga
// online cachea el shell (HTML + JS de Three.js + assets GLB/FBX), y a partir de ahí arranca sin
// conexión. Navegación network-first (recoge actualizaciones); estáticos cache-first (rápidos).
// Subir la versión de CACHE + skipWaiting/clients.claim evita quedarse atascado en un build viejo.
//
// El service worker solo se registra desde la página de nivel superior (ver src/pwa/install.ts): NO
// corre dentro del iframe del host del playground, así que aquí no hay que distinguir ese caso.

const CACHE = 'cozy-adventure-pwa-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // HTML: network-first para recoger nuevas versiones; sin conexión -> cache.
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          if (fresh.ok) {
            const cache = await caches.open(CACHE);
            cache.put(req, fresh.clone());
          }
          return fresh;
        } catch {
          const cached = await caches.match(req);
          return cached || (await caches.match('./')) || Response.error();
        }
      })(),
    );
    return;
  }

  // Estáticos (JS/CSS/assets): cache-first, y cachear en la primera carga online. Solo se cachean
  // respuestas correctas (fresh.ok): así un 404 o un fallo transitorio no queda fijado en la caché.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      const fresh = await fetch(req);
      if (fresh.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
      }
      return fresh;
    })(),
  );
});
