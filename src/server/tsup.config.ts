import { defineConfig } from 'tsup';
import { fileURLToPath } from 'node:url';

// Bundle the server (and the imported `../shared` module) into a single
// self-contained ESM artifact for Docker. esbuild resolves the `@shared/*`
// alias here so Node ESM never has to deal with extensionless cross-dir imports.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // Keep native/runtime deps external; bundle our own + shared code.
  external: ['pg', 'pino', 'ws'],
  esbuildOptions(options) {
    options.alias = {
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    };
  },
});
