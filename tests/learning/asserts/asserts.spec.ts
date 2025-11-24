import { expect, test } from "@playwright/test"
import { DashboardPage } from "src/pages/pmtool/dashboard_page";
import { LoginPage } from "src/pages/pmtool/login_page"

test.describe("Asserts", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open()
        .then((login) => login.login("pw_academy", "Playwright321!"))
    });

    test("toContainText test", async ({ page }) => {
        const dashboardHeader = page.locator("#welcome-page-header");
        await expect(dashboardHeader).toContainText("Vítej v testovací aplikaci");
    });  

    test("toHaveText test", async ({ page }) => {
        const dashboardHeader = page.locator("#welcome-page-header");
        await expect(dashboardHeader).toHaveText("Vítej v testovací aplikaci Tredgate");
    });

    test("toBeVisible test", async ({ page }) => {
        await expect(page.locator(".logo img")).toBeVisible();
    });

    test("toHaveValue test", async ({ page }) => {
        await page.locator("#Projects").click()
        await page.locator('[test_id="search_input"]').fill("test")
        await expect(page.locator('[test_id="search_input"]')).toHaveValue("test")
    });

    test("Soft Assert Test", async ({ page }) => {
        const dasboardPage = new DashboardPage(page);

        await expect.soft(page.locator("#welcome-page-header")).toHaveText("Vítej v testovací aplikaci");
        await dasboardPage.clickProfile()
        .then((dasboard) => dasboard.clickLogout())
    })
})

test.describe("Login test", () => {
    test("Negative test", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open()
        await expect(page.locator("#username")).toBeVisible();
        await expect(page.locator(".alert")).not.toBeVisible();
    });

    test("Page object assert", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open()
        .then((login) => login.pageHeaderHasText("Login"))
    })
    
})

