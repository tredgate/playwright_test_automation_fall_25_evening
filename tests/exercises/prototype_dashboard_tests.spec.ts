import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/prototype/login_page";
import { DashboardPage } from "../../src/pages/prototype/dashboard_page";

test.describe("Prototype Dashboard Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    // Login before each test
    await loginPage.open();
    await page.evaluate(() => sessionStorage.clear());
    await loginPage.login("admin", "Admin123!");

    // Wait for redirect
    await page.waitForURL(/dashboard\.html/, { timeout: 3000 });
  });

  test("Dashboard should display after successful login", async () => {
    await dashboardPage.expectDashboardVisible();
    await dashboardPage.expectLogoutButtonVisible();
  });

  test("Dashboard should display correct username", async () => {
    await dashboardPage.expectUsername("admin");
  });

  test("Dashboard should show active status", async () => {
    await dashboardPage.expectStatusActive();
  });

  test("Dashboard should display login time", async () => {
    await expect(dashboardPage.loginTimeDisplay).not.toBeEmpty();
    await expect(dashboardPage.loginTimeDisplay).toBeVisible();
  });

  test("Dashboard should display welcome message", async () => {
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.welcomeMessage).toHaveText(
      "You have successfully logged in!"
    );
  });

  test("Logout should redirect to login page", async ({ page }) => {
    await dashboardPage.logout();

    // Wait for redirect to login page
    await page.waitForURL(/login\.html/, { timeout: 3000 });

    // Verify we're on login page
    await expect(loginPage.pageTitle).toBeVisible();
  });

  test("Logout should clear session storage", async ({ page }) => {
    await dashboardPage.logout();

    // Check session storage is cleared
    const sessionData = await page.evaluate(() =>
      sessionStorage.getItem("loggedIn")
    );
    expect(sessionData).toBeNull();
  });

  test("Direct access to dashboard without login should redirect to login page", async ({
    context,
  }) => {
    // Clear session by creating a new page
    const newPage = await context.newPage();

    // Try to access dashboard directly
    await newPage.goto(dashboardPage.url);

    // Should redirect to login
    await newPage.waitForURL(/login\.html/, { timeout: 3000 });

    await newPage.close();
  });

  test("Dashboard should persist username across page refresh", async ({
    page,
  }) => {
    await dashboardPage.expectUsername("admin");

    // Refresh the page
    await page.reload();

    // Username should still be displayed
    await dashboardPage.expectUsername("admin");
  });
});
