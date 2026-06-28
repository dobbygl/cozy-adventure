// Landing interactions: scroll reveals, scrollspy rail, scroll progress.
// Vanilla, no dependencies. Degrades gracefully (the inline <head> script is
// the safety net that shows everything if this never runs).
(function () {
  'use strict';
  window.__revealReady = true;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  // Reveal on scroll.
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealIO.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    reveals.forEach(function (el) { revealIO.observe(el); });
  }

  // Scrollspy: mark the rail dot of the section in view.
  var dots = Array.prototype.slice.call(document.querySelectorAll('.rail__dot'));
  var byId = {};
  dots.forEach(function (d) { byId[d.getAttribute('href').slice(1)] = d; });
  var sections = dots
    .map(function (d) { return document.getElementById(d.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spyIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          dots.forEach(function (d) { d.removeAttribute('aria-current'); });
          var dot = byId[e.target.id];
          if (dot) dot.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spyIO.observe(s); });
  }

  // Scroll progress bar.
  var bar = document.querySelector('.progress');
  if (bar) {
    var ticking = false;
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      ticking = false;
    };
    addEventListener(
      'scroll',
      function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      },
      { passive: true }
    );
    update();
  }
})();

/* ---- PWA: registro del service worker + invitación a instalar ----
   El SW (scope raíz) da offline a la landing y a /play. La invitación usa beforeinstallprompt
   donde el navegador lo permite (Chromium); en iOS Safari (sin ese evento) muestra instrucciones.
   Nunca bloquea y no reaparece en la misma sesión si se descarta. */
(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  var standalone =
    (window.matchMedia && matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true;
  if (standalone) return; // ya instalada: no insistir
  try { if (sessionStorage.getItem('cozy-install-dismissed')) return; } catch (e) {}

  var style = document.createElement('style');
  style.textContent =
    '.pwa-install{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;display:flex;gap:10px;' +
    'align-items:center;justify-content:center;background:#173a36;color:#fffdf7;border:2px solid #1fa090;' +
    'border-radius:14px;padding:11px 14px;box-shadow:0 8px 24px rgba(23,58,54,.35);' +
    'font:600 14px/1.3 "Nunito",system-ui,sans-serif;max-width:520px;margin:0 auto}' +
    '.pwa-install__go{cursor:pointer;background:#1fa090;color:#fffdf7;border:0;border-radius:999px;' +
    'padding:9px 16px;font:inherit;font-weight:800}' +
    '.pwa-install__x{cursor:pointer;background:transparent;color:#fffdf7;border:0;font-size:22px;' +
    'line-height:1;padding:0 6px}';
  document.head.appendChild(style);

  function dismiss(box) {
    box.remove();
    try { sessionStorage.setItem('cozy-install-dismissed', '1'); } catch (e) {}
  }
  function banner(html) {
    var box = document.createElement('div');
    box.className = 'pwa-install';
    box.innerHTML = html + '<button class="pwa-install__x" aria-label="Descartar">×</button>';
    document.body.appendChild(box);
    box.querySelector('.pwa-install__x').addEventListener('click', function () { dismiss(box); });
    return box;
  }

  var deferred = null;
  addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    var box = banner('<span>Instala Cozy Adventure como app</span><button class="pwa-install__go">Instalar</button>');
    box.querySelector('.pwa-install__go').addEventListener('click', function () {
      box.remove();
      if (deferred) { deferred.prompt(); deferred = null; }
    });
  });
  addEventListener('appinstalled', function () {
    try { sessionStorage.setItem('cozy-install-dismissed', '1'); } catch (e) {}
  });

  // iOS Safari no expone beforeinstallprompt: instrucciones equivalentes.
  var ua = navigator.userAgent || '';
  var isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = /safari/i.test(ua) && !/crios|fxios|chrome|android/i.test(ua);
  if (isIOS && isSafari) {
    banner('<span>Instala el juego: pulsa <b>Compartir</b> y luego <b>Añadir a pantalla de inicio</b></span>');
  }
})();

