import { defineConfig } from 'playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./', import.meta.url));
const sut = path.resolve(process.env.SUT_ROOT || path.join(root, '../eshop-sut'));

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45000,
  expect: { timeout: 4000 },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'report/results.json' }],
    ['./markdown-reporter.mjs'],
  ],
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: 'http://localhost:5180',
    ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}),
    viewport: { width: 1280, height: 800 },
    locale: 'vi-VN',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'node server.js',
      cwd: path.join(sut, 'backend'),
      url: 'http://localhost:3000/api/products',
      reuseExistingServer: true,
      timeout: 30000,
    },
    {
      command: 'node node_modules/vite/bin/vite.js --host localhost --port 5180 --strictPort',
      cwd: path.join(sut, 'frontend-web'),
      url: 'http://localhost:5180',
      reuseExistingServer: true,
      timeout: 30000,
    },
  ],
});
