module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
