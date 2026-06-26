import js from '@eslint/js';
import globals from 'globals';

// Low-friction config: the full "recommended" rule set, but every rule downgraded
// to "warn" so it surfaces issues without failing the build on a legacy codebase.
// Tighten individual rules to "error" as the code gets cleaned up.
const recommendedAsWarn = Object.fromEntries(
  Object.keys(js.configs.recommended.rules).map((rule) => [rule, 'warn'])
);

export default [
  { ignores: ['dist/**', 'public/**', 'node_modules/**', 'coverage/**'] },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        THREE: 'readonly',
      },
    },
    rules: {
      ...recommendedAsWarn,
    },
  },
  {
    files: ['test/**/*.js', '**/*.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...recommendedAsWarn,
    },
  },
];
