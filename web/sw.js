// Service worker del sitio, registrado desde la landing (scope raíz: cubre la landing y /play).
// Da offline tras la primera visita: navegación network-first (recoge actualizaciones), estáticos
// cache-first; solo se cachean respuestas fresh.ok.
//
// IMPORTANTE: el nombre de CACHE debe ser IDÉNTICO al del SW del juego (apps/game/public/sw.js).
// Cache Storage es por-origen y el handler de activate borra toda caché que no sea la suya, así que
// dos nombres distintos harían que los dos SW (este, scope '/'; y el del juego, scope '/play/') se
// desalojaran mutuamente la caché en cada activación. Si subes la versión, súbela en AMBOS a la vez.

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

  // Estáticos (JS/CSS/assets): cache-first, cacheando en la primera carga online.
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
