import { defineConfig } from 'vite';

// Vite was already in use without an explicit config (it ran on defaults).
// This file makes the production build behaviour explicit. See PROPUESTA-MEJORAS.md (area 1).
export default defineConfig(({ mode }) => ({
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
  // NOTE: the game is served embedded in a host iframe at the origin root, so base stays '/'.
  // If it ever ships under a sub-path, set base: './' and update the absolute
  // /*.js host script tags in index.html (Vite does not rewrite those).
}));
