module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: ['*.test.js', '*.test.ts', 'tests/**/*.js', 'tests/**/*.ts'], // Include TypeScript test files
      env: {
        jest: true,
      },
      rules: {
        'node/no-process-env': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
