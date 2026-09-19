export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/react'],
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.ts',
  },
};