require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules', 'src', 'types'],
  clearMocks: true,
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    'models/(.*)$': '<rootDir>/src/models/$1',
    'customTypes/(.*)$': '<rootDir>/src/types/$1',
    'utilities/(.*)$': '<rootDir>/src/utilities/$1',
    'customMiddleware/(.*)$': '<rootDir>/src/middleware/$1',
    'users/(.*)$': '<rootDir>/src/users/$1',
    'episodes/(.*)$': '<rootDir>/src/episodes/$1',
    'podcasts/(.*)$': '<rootDir>/src/podcasts/$1',
  },
};
