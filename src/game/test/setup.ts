import { vi, beforeAll, afterAll } from 'vitest';

// The game code is very chatty (~600 console.* calls). Silence the noisy levels
// during tests, but keep console.error so genuine failures still surface.
let spies = [];

beforeAll(() => {
  spies = ['log', 'warn', 'info', 'debug'].map((level) =>
    vi.spyOn(console, level).mockImplementation(() => {})
  );
});

afterAll(() => {
  spies.forEach((spy) => spy.mockRestore());
});
