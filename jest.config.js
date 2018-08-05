module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/tools/setup-test.js',
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
