import js from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintImport from 'eslint-plugin-import'
import eslintReact from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  eslintReact,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        dataLayer: false,
        ...globals.browser,
        ...globals.node,
      },
      parser: astroParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      import: eslintImport,
      'unused-imports': unusedImports,
    },
    ignores: [
      'node_modules/',
      '.astro/',
      'dist/',
      'public/',
      'package-lock.json',
      'pnpm-lock.yaml',
      'tsconfig.json',
      '*.cjs',
      '*.mjs',
    ],
    rules: {
      'typescript-eslint/no-explicit-any': 'off',
    },
  },
]
