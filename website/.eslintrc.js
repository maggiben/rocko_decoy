module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb', 'prettier'],
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
  },
}
