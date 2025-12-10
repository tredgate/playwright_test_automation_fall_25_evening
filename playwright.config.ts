import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  timeout: 60_000, // ? Timeout maximální délky testu
  globalTimeout: 1 * 60 * 60 * 1000, // ? Maximální délka trvání jednoho běhu testů (npx playwright test)
  expect: {
    timeout: 7_000, // ? Timeout na maximální limit čekání v rámci assertu
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 7_000, // ? Limit na maximální trvání akcí (click, fill...)
    navigationTimeout: 30_000, // ? Maximální délka načítání stránky při použití goto()
    // ignoreHTTPSErrors: true, // ! Vypnutí kontrol certifikátů v prohlížeči. OPATRNĚ! NIKDY NE NA PRODUKCI!
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: "only-on-failure",
    video: "off",
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // * Příklad nastavení vlastního projektu s nízkým rozlišením
    // {
    //   name: "chromium:low-res",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     viewport: {
    //       width: 800,
    //       height: 600,
    //     },
    //   },
    // },
    /* {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    }, */
    /*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
