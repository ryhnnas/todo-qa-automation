const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'html', 
  use: {
    /* SETTINGAN KRUSIAL: Daftarkan alamat Vite kamu di sini */
    baseURL: 'http://localhost:5173', 
    
    video: 'on',      
    trace: 'on',
    screenshot: 'on',
    launchOptions: {
      slowMo: 800, 
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});