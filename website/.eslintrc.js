module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  ignorePatterns: [
    'public/',
    'node_modules/',
    'static/',
    '.cache/',
    '.netlify/',
    'src/pages/terms.js',
    'src/pages/privacy.js',
  ],
  rules: {
    'prettier/prettier': 'error',
    // 'react/prop-types': 'off', // todo temp rule
  },
}
