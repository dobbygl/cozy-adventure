import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Most game logic is pure/headless and runs in node. Tests that need the DOM
    // can opt in per-file with: // @vitest-environment jsdom
    environment: 'node',
    include: ['test/**/*.test.{js,ts}'],
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      // Report coverage only for the modules under test, so the number is honest
      // (a global figure over ~18k lines of render/UI code would be misleading).
      // The seeded rng now lives in @cozy/shared and is covered by its own package.
      include: ['src/inventory.ts', 'src/SaveSystem.ts'],
      reporter: ['text', 'html'],
    },
  },
});
