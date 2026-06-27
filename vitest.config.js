import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Most game logic is pure/headless and runs in node. Tests that need the DOM
    // can opt in per-file with: // @vitest-environment jsdom
    environment: 'node',
    include: ['test/**/*.test.{js,ts}'],
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8',
      // Report coverage only for the modules under test, so the number is honest
      // (a global figure over ~18k lines of render/UI code would be misleading).
      include: ['src/inventory.js', 'src/SaveSystem.js', 'src/shared/rng.ts'],
      reporter: ['text', 'html'],
    },
  },
});
