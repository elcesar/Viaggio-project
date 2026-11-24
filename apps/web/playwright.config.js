import { defineConfig, devices } from '@playwright/test';
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
export default defineConfig({ testDir: './tests/e2e', use: { baseURL: 'http://127.0.0.1:4173', trace: 'on-first-retry', launchOptions: executablePath ? { executablePath } : {} }, webServer: { command: 'pnpm preview --host 127.0.0.1', port: 4173, reuseExistingServer: true }, projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { ...devices['Pixel 5'] } }] });
