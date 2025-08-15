/* eslint-env jest */
/* global jest */
// jest.setup.js
require('@testing-library/jest-native/extend-expect')

jest.spyOn(console, 'warn').mockImplementation(() => {})
jest.spyOn(console, 'error').mockImplementation(() => {})

// Se seu código usa expo-asset em algum ponto:
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(() => ({
      downloadAsync: jest.fn(),
      localUri: 'mock/path',
    })),
  },
}))

// Timers previsíveis (útil p/ RN/RTL)
jest.useRealTimers()
