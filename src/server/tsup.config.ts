import { defineConfig } from 'tsup';

// Bundle @cozy/server (and the imported @cozy/shared workspace package, resolved
// via the pnpm node_modules symlink) into a single self-contained ESM artifact
// for Docker. Only native runtime deps stay external, so the image never ships
// `three` and `@cozy/shared` is inlined.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // Only native runtime deps stay external. @cozy/shared is a workspace dep, which
  // tsup would otherwise auto-externalize; force-bundle it so the image is
  // self-contained (no need to ship the workspace package).
  external: ['pg', 'pino', 'ws'],
  noExternal: ['@cozy/shared'],
});
