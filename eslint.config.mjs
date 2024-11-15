import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';


export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs['recommended-flat'],
  tseslint.configs.base,

  {
    name:     'general',
    files:    ['**/*.{js,ts,mjs,cjs,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-useless-escape': ['off'],
      'no-unused-vars':    ['error', {
        'destructuredArrayIgnorePattern': '^_',
      }],

      'react/react-in-jsx-scope': ['off'],
      'react/prop-types':         ['off'],

      '@stylistic/semi':                    ['error', 'always'],
      '@stylistic/key-spacing':             ['error', { align: 'value', mode: 'minimum' }],
      '@stylistic/quote-props':             ['error', 'consistent'],
      '@stylistic/brace-style':             ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/no-multi-spaces':         ['off'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    },
  },

  {
    name:  'typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      ...tseslint.configs.eslintRecommended.rules,
      '@typescript-eslint/ban-ts-comment':                      'error',
      'no-array-constructor':                                   'off',
      '@typescript-eslint/no-array-constructor':                'error',
      '@typescript-eslint/no-duplicate-enum-values':            'error',
      '@typescript-eslint/no-empty-object-type':                'error',
      '@typescript-eslint/no-explicit-any':                     'error',
      '@typescript-eslint/no-extra-non-null-assertion':         'error',
      '@typescript-eslint/no-misused-new':                      'error',
      '@typescript-eslint/no-namespace':                        'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-require-imports':                  'error',
      '@typescript-eslint/no-this-alias':                       'error',
      '@typescript-eslint/no-unnecessary-type-constraint':      'error',
      '@typescript-eslint/no-unsafe-declaration-merging':       'error',
      '@typescript-eslint/no-unsafe-function-type':             'error',
      'no-unused-expressions':                                  'off',
      '@typescript-eslint/no-unused-expressions':               'error',
      'no-unused-vars':                                         'off',
      '@typescript-eslint/no-unused-vars':                      'error',
      '@typescript-eslint/no-wrapper-object-types':             'error',
      '@typescript-eslint/prefer-as-const':                     'error',
      '@typescript-eslint/prefer-namespace-keyword':            'error',
      '@typescript-eslint/triple-slash-reference':              'error',
    },
  },
];