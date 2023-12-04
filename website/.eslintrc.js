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
    'src/pages/terms.jsx',
    'src/pages/privacy.jsx',
  ],
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // todo turn this back on after switching to typescript
  },
}
