import { describe, it, expect } from 'vitest';
import { BUILDABLES } from '@cozy/shared';
import { BuildableObjectsRegistry } from '../src/BuildableObjectsRegistry';

// The cost + footprint of each buildable live in two tables (the client registry also
// carries model/scale; the shared catalog is what the server validates against). They
// MUST stay equal or the server would reject placements the client previews. This guard
// fails the build if they drift.
describe('client registry mirrors the shared buildables catalog', () => {
  it('cost and footprint match for every shared buildable', () => {
    const defs = new BuildableObjectsRegistry().getObjectDefinitions();
    for (const [type, shared] of Object.entries(BUILDABLES)) {
      expect(defs[type], `client registry missing buildable: ${type}`).toBeDefined();
      expect(defs[type].cost.wood).toBe(shared.cost.wood);
      expect(defs[type].cellSize).toEqual(shared.footprint);
    }
  });
});
