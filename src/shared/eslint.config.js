import js from '@eslint/js';
import tseslint from 'typescript-eslint';

// @cozy/shared is environment-agnostic (no DOM, no Node): a pure, three-free
// kernel of types + the seeded rng. No platform globals are configured on
// purpose, so an accidental dependency on one surfaces as a lint error.
export default tseslint.config(
  { ignores: ['node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
  }
);
