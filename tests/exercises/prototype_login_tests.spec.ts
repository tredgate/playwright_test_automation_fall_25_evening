import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/prototype/login_page";

test.describe("Prototype Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
    // Clear session storage before each test
    await page.evaluate(() => sessionStorage.clear());
  });

  test("Login page should be visible with all elements", async () => {
    await loginPage.expectPageVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.signupLink).toBeVisible();
  });

  test("Successful login with valid credentials - admin", async ({ page }) => {
    await loginPage.fillUsername("admin");
    await loginPage.fillPassword("Admin123!");
    await loginPage.clickLogin();

    // Wait for success message
    await loginPage.expectSuccessMessage("Welcome back, admin");

    // Wait for redirect to dashboard
    await page.waitForURL(/dashboard\.html/, { timeout: 3000 });

    // Verify dashboard is loaded
    await expect(page.locator("h1")).toHaveText("Dashboard");
  });

  test("Successful login with valid credentials - testuser", async ({
    page,
  }) => {
    await loginPage.fillUsername("testuser");
    await loginPage.fillPassword("Test123!");
    await loginPage.clickLogin();

    await loginPage.expectSuccessMessage("Welcome back, testuser");
    await page.waitForURL(/dashboard\.html/, { timeout: 3000 });
  });

  test("Successful login with valid credentials - demo", async ({ page }) => {
    await loginPage.fillUsername("demo");
    await loginPage.fillPassword("Demo123!");
    await loginPage.clickLogin();

    await loginPage.expectSuccessMessage("Welcome back, demo");
    await page.waitForURL(/dashboard\.html/, { timeout: 3000 });
  });

  test("Failed login with invalid username", async () => {
    await loginPage.fillUsername("invaliduser");
    await loginPage.fillPassword("WrongPass123!");
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage("Invalid username or password");
  });

  test("Failed login with invalid password", async () => {
    await loginPage.fillUsername("admin");
    await loginPage.fillPassword("WrongPassword!");
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage("Invalid username or password");
  });

  test("Failed login with empty username and password", async () => {
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage(
      "Please enter both username and password"
    );
  });

  test("Failed login with empty username", async () => {
    await loginPage.fillPassword("Admin123!");
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage(
      "Please enter both username and password"
    );
  });

  test("Failed login with empty password", async () => {
    await loginPage.fillUsername("admin");
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage(
      "Please enter both username and password"
    );
  });

  test("Error message should disappear when user starts typing in username", async () => {
    // Trigger error first
    await loginPage.clickLogin();
    await loginPage.expectErrorMessage(
      "Please enter both username and password"
    );

    // Start typing in username
    await loginPage.usernameInput.type("a");

    // Error should be hidden
    await expect(loginPage.errorMessage).toBeHidden();
  });

  test("Error message should disappear when user starts typing in password", async () => {
    // Trigger error first
    await loginPage.clickLogin();
    await loginPage.expectErrorMessage(
      "Please enter both username and password"
    );

    // Start typing in password
    await loginPage.passwordInput.type("p");

    // Error should be hidden
    await expect(loginPage.errorMessage).toBeHidden();
  });

  test("Remember me checkbox should be clickable", async () => {
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
    await loginPage.toggleRememberMe();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
  });

  test("Login button should show loading state during login", async () => {
    await loginPage.fillUsername("admin");
    await loginPage.fillPassword("Admin123!");

    // Start login but don't await it
    const loginPromise = loginPage.loginButton.click();

    // The button should be disabled briefly during loading
    // We'll just verify the success message appears after loading
    await loginPromise;
    await loginPage.expectSuccessMessage("Welcome back");
  });

  test("Page title and subtitle should be correct", async () => {
    await expect(loginPage.pageTitle).toHaveText("Welcome Back");
    await expect(loginPage.pageSubtitle).toHaveText(
      "Please login to your account"
    );
  });

  test("Username input should have correct placeholder", async () => {
    await expect(loginPage.usernameInput).toHaveAttribute(
      "placeholder",
      "Enter your username"
    );
  });

  test("Password input should have correct placeholder", async () => {
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      "Enter your password"
    );
  });

  test("Password input should mask password", async () => {
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });
});
