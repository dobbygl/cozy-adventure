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
