module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^chart.js$': '<rootDir>/node_modules/chart.js/dist/chart.min.js'
  }
}