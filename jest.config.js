module.exports = {
  preset: 'react-native',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],

  // Roda ANTES de qualquer import (crucial!)
  setupFiles: ['<rootDir>/jest.setupEarly.js'],

  // Roda depois (RTL, spies, mocks diversos)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Garante TS/JS via Babel
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Permite transformar módulos RN/Expo necessários
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-community' +
      '|expo($|/.*)' +
      '|expo-modules-core' +
      '|@expo(nent)?/.*' +
      '|@unimodules/.*' +
      '|unimodules' +
      '|sentry-expo' +
      '|native-base)',
  ],

  testEnvironment: 'jsdom',

  // Mapeia QUALQUER import de expo para um mock
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^expo($|/.*)': '<rootDir>/__mocks__/expoMock.js',
  },
}
