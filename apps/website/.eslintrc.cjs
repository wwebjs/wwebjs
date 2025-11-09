module.exports = {
  root: true,
  // Extend the repo-level ESLint config. This keeps rules centralized while
  // allowing package-specific overrides here if needed.
  extends: ['../../eslint.config.js'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
