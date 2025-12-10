import {test} from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Login Visual Check - Page Objects", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open().then((login) => login.loginVisualCheck());
})
