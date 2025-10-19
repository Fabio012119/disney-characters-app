import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "src/e2e",
  fullyParallel: true,
  timeout: 60_000,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});