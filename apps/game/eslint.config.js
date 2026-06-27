import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Low-friction config: the full "recommended" rule sets (JS + typescript-eslint),
// but every rule downgraded to "warn" so issues surface without failing lint on a
// codebase still mid-migration (lots of deliberate `any`). Rules the recommended
// sets explicitly turn off stay off; rule options are preserved.
// Tighten individual rules to "error" as the code gets cleaned up.
const asWarn = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([name, level]) => {
      if (Array.isArray(level)) {
        const [severity, ...options] = level;
        return [name, severity === 'off' || severity === 0 ? level : ['warn', ...options]];
      }
      return [name, level === 'off' || level === 0 ? level : 'warn'];
    })
  );

const jsRecommendedAsWarn = asWarn(js.configs.recommended.rules);
const tsRecommendedAsWarn = asWarn(
  tseslint.configs.recommended.reduce((acc, c) => ({ ...acc, ...(c.rules ?? {}) }), {})
);

export default tseslint.config(
  { ignores: ['dist/**', 'public/**', 'node_modules/**', 'coverage/**'] },
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        THREE: 'readonly',
      },
    },
    rules: {
      ...jsRecommendedAsWarn,
    },
  },
  {
    files: ['test/**/*.{js,ts}', '**/*.config.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...jsRecommendedAsWarn,
    },
  },
  // TypeScript sources: TS parser + plugin, recommended rules (downgraded to warn).
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tsRecommendedAsWarn,
    },
  }
);
