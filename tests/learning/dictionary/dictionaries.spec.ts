import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { pmtoolTexts } from "../../../assets/dictionaries/dictionary";

test("Using dictionaries to Reuse Texts", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await expect(page.locator(".form-title")).toHaveText(pmtoolTexts.login.title);
  await expect(page.locator("#username")).toHaveAttribute(
    "placeholder",
    pmtoolTexts.login.usernamePlaceholder
  );
});
