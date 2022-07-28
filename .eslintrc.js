module.exports = {
    env: {
        "es2021": true,
        "node": true
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
      'no-consoles': 'off',
      'import/no-cycle': 'off',
      'no-restricted-syntax': 'off',
      'import/no-dynamic-require': 'off',
      'global-require ': 'off',
      'new-cap': 'off',
      'no-unused-vars': 'warn',
    }
}
