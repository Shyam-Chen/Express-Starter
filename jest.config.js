module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/tools/setup-test.js',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    process.env.JEST_ENV === 'e2e' ? '.*\\.spec.ts$' : '.*\\.e2e-spec.ts$',
  ],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
