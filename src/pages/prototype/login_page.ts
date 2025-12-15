// src/pages/prototype/login_page.ts
import { Locator, Page, expect } from "@playwright/test";
import { DashboardPage } from "./dashboard_page";

export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signupLink: Locator;
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "http://localhost:8080/login.html";
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#loginButton");
    this.rememberMeCheckbox = page.locator("#rememberMe");
    this.forgotPasswordLink = page.locator(".forgot-password");
    this.signupLink = page.locator(".signup-link");
    this.pageTitle = page.locator(".app-title");
    this.pageSubtitle = page.locator(".app-subtitle");
    this.errorMessage = page.locator("#errorMessage");
    this.successMessage = page.locator("#successMessage");
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async toggleRememberMe() {
    await this.rememberMeCheckbox.click();
    return this;
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
    return this;
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async expectPageVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Welcome Back");
    return this;
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
    return this;
  }

  async expectSuccessMessage(message: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(message);
    return this;
  }

  async expectLoginButtonEnabled() {
    await expect(this.loginButton).toBeEnabled();
    return this;
  }

  async expectLoginButtonDisabled() {
    await expect(this.loginButton).toBeDisabled();
    return this;
  }
}
