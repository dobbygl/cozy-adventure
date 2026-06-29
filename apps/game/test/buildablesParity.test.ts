import { describe, it, expect } from 'vitest';
import { BUILDABLES } from '@cozy/shared';
import { BuildableObjectsRegistry } from '../src/BuildableObjectsRegistry';

// The client registry now DERIVES cost + footprint from the shared BUILDABLES catalog
// (it only adds presentation), so the two can no longer drift by construction. This guard
// keeps a different invariant honest: every shared buildable must have client presentation
// (else it is dropped from the build menu) and the merge must wire cost/footprint through.
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
