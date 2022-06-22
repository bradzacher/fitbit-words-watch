/* global module */

module.exports = {
  plugins: ['eslint-comments', 'import', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    // ensure imports are properly sorted
    'simple-import-sort/imports': 'error',

    // disallow non-import statements appearing before import statements
    'import/first': 'error',
    // Require a newline after the last import/require in a group
    'import/newline-after-import': 'error',
    // Forbid import of modules using absolute paths
    'import/no-absolute-path': 'error',
    // disallow AMD require/define
    'import/no-amd': 'error',
    // forbid default exports
    'import/no-default-export': 'error',
    // Forbid mutable exports
    'import/no-mutable-exports': 'error',
    // Prevent importing the default as if it were named
    'import/no-named-default': 'error',
    // Forbid a module from importing itself
    'import/no-self-import': 'error',
  },
};
