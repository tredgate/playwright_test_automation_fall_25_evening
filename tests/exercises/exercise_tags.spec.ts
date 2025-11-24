import { test } from "@playwright/test"
import { LoginPage } from "src/pages/pmtool/login_page"

test("Tag exercise", { tag: "@exercise"}, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open()
    .then((login) => login.login("pw_academy", "Playwright321!"));
});
