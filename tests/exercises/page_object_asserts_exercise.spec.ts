import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Using Asserts in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.dashboardAsserts("TEG Project Management"));
});
