import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

export default defineConfig(
  {
    ignores: [
      '**/node_modules/',
      '.git/',
      '**/dist/',
      '**/coverage/',
      '**/.turbo/',
      '**/.next/',
    ],
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          noWarnOnMultipleProjects: true,
          project: [
            'tsconfig.eslint.json',
            'apps/*/tsconfig.eslint.json',
            'packages/*/tsconfig.eslint.json',
          ],
        }),
      ],
    },
  },

  // base recommended rules
  eslint.configs.recommended,

  {
    files: [`**/*${commonFiles}`],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-console': 'off',
    },
  },

  {
    files: [`**/*{ts,tsx,mts,cts}`],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          'apps/*/tsconfig.eslint.json',
          'packages/*/tsconfig.eslint.json',
        ],
      },
    },
    rules: {},
  },

  {
    rules: {},
  },

  prettier,
);
