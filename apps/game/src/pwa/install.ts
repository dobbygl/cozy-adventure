// Registro del service worker de la PWA (public/sw.js). Da offline tras la primera carga sin tocar
// la lógica del juego: si el registro falla, el juego sigue siendo jugable (solo se pierde offline).
//
// Dos guards, ambos importantes:
//   1. Nunca dentro de un iframe: el juego ya corre standalone (salió del iframe del host del
//      playground), pero la guarda se mantiene por robustez. Un service worker registrado en un
//      iframe del mismo origen serviría cache-first y dejaría a ese contenedor fijado en un build
//      viejo ("¿por qué no se actualiza?"). La PWA solo tiene sentido en la página de nivel superior
//      (la landing navega a /play/ con un enlace, no lo embebe; una PWA instalada arranca también
//      top-level), así que registramos solo cuando no estamos dentro de un iframe.
//   2. DEV: en desarrollo el SW cachearia los modulos servidos por Vite con cache-first, sirviendo
//      codigo viejo y rompiendo el HMR. Si quedo uno de una sesion previa, lo desregistramos y
//      limpiamos sus caches (auto-curado).

export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  // Guard 1: nunca dentro de un iframe (contexto embebido del host).
  if (window.self !== window.top) return;

  // Guard 2: en DEV, desregistrar y limpiar en vez de registrar.
  if (import.meta.env.DEV) {
    void navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const r of regs) void r.unregister();
    });
    if ('caches' in window) {
      void caches.keys().then((keys) => {
        for (const k of keys) void caches.delete(k);
      });
    }
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err: unknown) => {
      // Degradar con elegancia: sin SW el juego sigue jugable (solo se pierde el offline).
      console.warn('Service worker no registrado:', err);
    });
  });
}
