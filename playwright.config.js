const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    headless: true,
    browserName: 'chromium',
    baseURL: 'http://localhost:3000'
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});