import { defineConfig } from 'vite';

// Vite was already in use without an explicit config (it ran on defaults).
// This file makes the production build behaviour explicit. See PROPUESTA-MEJORAS.md (area 1).
export default defineConfig(({ mode }) => ({
  // Relative base so the game works under any sub-path. On GitHub Pages the
  // game is served at /<repo>/play/, and the landing assembles it there.
  // Runtime asset loads use public-relative paths ('assets/..'), which resolve
  // against the document, so they keep working under the sub-path too.
  base: './',
  build: {
    // Ship sourcemaps so the minified bundle is debuggable in production.
    sourcemap: true,
    // The Three.js bundle is legitimately large (~230 KB gzip); raise the cosmetic warning.
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    // Strip noisy console.log/info/debug from production builds; keep warn/error.
    pure: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
  },
}));
