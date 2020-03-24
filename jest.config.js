const {defaults} = require('jest-config');

module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'json', 'vue', '*'],
  moduleDirectories: ['node_modules'],
  setupFiles: [
    '<rootDir>/nativescript-vue-stubs.js',
  ],
  moduleNameMapper: {
    // Default NativeScript webpack aliases
    '~/(.*)$': '<rootDir>/app/$1',
    '@/(.*)$': '<rootDir>/app/$1',
    '^projectRoot/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: [],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,vue}'],
  coverageReporters: ['text-summary', 'lcov']
};
