import { defineConfig } from 'tsup';

// Bundle @cozy/server (and the imported @cozy/shared workspace package, resolved
// via the pnpm node_modules symlink) into a single self-contained ESM artifact
// for Docker. Only native runtime deps stay external, so the image never ships
// `three` and `@cozy/shared` is inlined.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node24',
  platform: 'node',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // Only the deps with native bindings / worker threads stay external (pg, pino, ws);
  // those are installed in the runtime image. Everything else is bundled, including
  // the @cozy/shared workspace and zod (pure JS), so the image ships just dist +
  // those three packages.
  external: ['pg', 'pino', 'ws'],
  noExternal: ['@cozy/shared', 'zod'],
});
