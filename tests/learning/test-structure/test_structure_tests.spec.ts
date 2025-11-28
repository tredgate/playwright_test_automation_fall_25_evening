import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test.describe("Test Suite - Login Pmtool", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Pmtool login", async () => {
    await loginPage.login("pw_academy", "Playwright321!");
  });

  test("Login and logout", async () => {
    await loginPage
      .login("pw_academy", "Playwright321!")
      .then((dasboard) => dasboard.clickProfile())
      .then((dasboard) => dasboard.clickLogout());
  });
});
