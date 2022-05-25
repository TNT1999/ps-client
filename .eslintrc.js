module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // tells parser relative path of tsconfig.json
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },

  // all plugins (eslint-plugin-xxx) go here:
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    '@next/eslint-plugin-next' // https://github.com/vercel/next.js/blob/canary/packages/eslint-plugin-next/lib/index.js.
  ],

  // all configs (eslint-config-xxx) go here:
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // contains rules that specifically require type information
    'plugin:@next/next/recommended',
    'next', // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json
    'next/core-web-vitals',
    'prettier'
  ],
  rules: {
    // ...add rules which you'd like to disable
    'no-console': [
      'warn',
      {
        allow: ['info', 'warn', 'error']
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
};
