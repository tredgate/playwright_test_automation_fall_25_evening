import { test } from "@playwright/test";

test("Exercise: Fill Form", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  await page.locator('[data-testid="input-name"]').fill("Petr Svetr");
  await page.locator('[data-testid="input-email"]').fill("petr@example.com");
  await page.locator('[data-testid="input-contact-date"]').fill("2026-04-03");
  await page.locator('[data-testid="select-role"]').selectOption("instructor");
  await page
    .locator('[data-testid="textarea-comments"]')
    .fill("Dlouhý komentář, bla bla bla...");
  await page.locator('[data-testid="checkbox-newsletter"]').check();
  await page.locator('[data-testid="button-submit"]').click();
});
