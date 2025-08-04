module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    camelcase: 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
};
