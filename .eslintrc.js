module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 8
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-case-declarations': 'off'
  }
}
