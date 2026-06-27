import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    // Integration tests stand up a real WebSocket server; give them room.
    testTimeout: 20000,
    hookTimeout: 20000,
  },
});
