/** jest.config.js */

module.exports = {

    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/*.module.ts'
    ],
  
    coverageDirectory: 'coverage',
  
    coverageReporters: [
      'lcov',
      'text-summary'
    ],
  
    testPathIgnorePatterns: [
      '<rootDir>/coverage/',
      '<rootDir>/dist/',
      '<rootDir>/e2e/',
      '<rootDir>/node_modules/',
      '<rootDir>/src/*.(js|scss)'
    ],
  
    testMatch: [
      '<rootDir>/src/*.spec.ts',
      '<rootDir>/src/**/*.spec.ts'
    ]
  };