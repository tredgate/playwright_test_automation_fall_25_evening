// tests/learning/github-actions/
// github_actions.spec.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { pmtoolTexts } from "../../../assets/dictionaries/dictionary.ts";

test.describe(
  "GitHub Actions Tests",
  {
    tag: "@github-actions",
  },
  () => {
    const username = process.env.PMTOOL_USERNAME as string;
    const password = process.env.PMTOOL_PASSWORD as string;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.open();
    });

    test("Pmtool Login", async () => {
      await loginPage
        .login(username, password)
        .then((dashboard) =>
          dashboard.dashboardAsserts(pmtoolTexts.dashboard.appName)
        );
    });

    test("Pmtool Login and Logout", async () => {
      await loginPage
        .login(username, password)
        .then((dashboard) => dashboard.clickProfile())
        .then((dashboard) => dashboard.clickLogout())
        .then((login) => login.pageHeaderHasText(pmtoolTexts.login.title));
    });

    test("Assert Login form inputs", async () => {
      await loginPage.pageHeaderHasText(pmtoolTexts.login.rememberMe);
    });
  }
);
