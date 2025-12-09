// tests/learning/env-credentials/
// env_secret_variables.ts

import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Login with Environment Variables (dotenv)", async ({ page }) => {
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login(username, password))
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});
