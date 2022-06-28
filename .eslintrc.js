module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'no-consoles': 'off',
    'import/no-cycle': 'off',
    'no-restricted-syntax': 'off',
    'import/no-dynamic-require': 'off',
    'global-require ': 'off',
    'new-cap': 'off',
    'no-unused-vars': 'warn',
  },
};
