// tests/learning/debugging/
// failing.spec.ts

import { expect, test } from "@playwright/test";

test("Debugging Failures", async ({ page }) => {
  await page.goto("http://tredgate.com/pmtool/");
  await expect(page.locator("#not_existing")).toBeVisible();
});
