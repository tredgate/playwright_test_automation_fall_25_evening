import { test, expect } from "@playwright/test"
import { LoginPage } from "src/pages/pmtool/login_page"

test("Add project test", async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.open()
    .then((login) => login.login("pw_academy", "Playwright321!"))

    await page.locator("#Projects").click();
    await expect(page.locator(".table-scrollable table")).toBeVisible();
    await page.locator('[test_id="Add Project"]').click();
    await expect(page.locator('div[data-testid="Name"] input')).toBeVisible();
    await expect(page.locator("button[type='submit']")).toHaveText("Save");
})
