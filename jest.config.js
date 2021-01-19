module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    process.env.JEST_ENV === 'e2e' ? '.*\\.spec.js$' : '.*\\.e2e-spec.js$',
  ],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
