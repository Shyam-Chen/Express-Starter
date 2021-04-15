module.exports = {
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
