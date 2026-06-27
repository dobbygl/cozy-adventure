import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Server-side ESLint: Node environment (no DOM, no THREE). New code, so the
// recommended rule sets run as errors (unlike the client config, which warns
// while it finishes its migration).
export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  }
);
