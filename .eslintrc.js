module.exports = {
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script'
  },
  rules: {
    'no-console': 0
  },
  globals: {},
  env: {
    node: true,
    es6: true
  }
}
