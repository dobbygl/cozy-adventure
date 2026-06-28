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
      // Coverage is scoped to the HEADLESS LOGIC surface, not the ~18k lines of
      // render/UI/Three code (a global figure over those would be misleading, and
      // they are only meaningfully testable in a browser). This is the "code, not
      // front" surface: the network/session layer, the inventory model, and the
      // small persisted-selection helpers. The seeded rng + world reducer live in
      // @cozy/shared. SaveSystem is intentionally NOT here: it is dominated by DOM
      // save-slot UI (its serialization is exercised by saveSystem*.test.ts).
      include: [
        'src/net/**/*.ts',
        'src/inventory.ts',
        'src/playerName.ts',
        'src/playerIdentity.ts',
        'src/playerModel.ts',
      ],
      // RemotePlayer is the one render component under net/ (the avatar mesh + the
      // canvas name-label Sprite); browser-only, so it is excluded from the logic %.
      exclude: ['src/net/RemotePlayer.ts'],
      reporter: ['text', 'html'],
    },
  },
});
