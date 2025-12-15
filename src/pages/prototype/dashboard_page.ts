// src/pages/prototype/dashboard_page.ts
import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly url: string;
  readonly pageTitle: Locator;
  readonly welcomeMessage: Locator;
  readonly usernameDisplay: Locator;
  readonly loginTimeDisplay: Locator;
  readonly statusBadge: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "http://localhost:8080/dashboard.html";
    this.pageTitle = page.locator("h1");
    this.welcomeMessage = page.locator(".welcome-message");
    this.usernameDisplay = page.locator("#username");
    this.loginTimeDisplay = page.locator("#loginTime");
    this.statusBadge = page.locator(".status-badge");
    this.logoutButton = page.locator(".logout-button");
  }

  async expectDashboardVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText("Dashboard");
    return this;
  }

  async expectUsername(username: string) {
    await expect(this.usernameDisplay).toHaveText(username);
    return this;
  }

  async expectStatusActive() {
    await expect(this.statusBadge).toBeVisible();
    await expect(this.statusBadge).toHaveText("Active");
    return this;
  }

  async logout() {
    await this.logoutButton.click();
    return this;
  }

  async expectLogoutButtonVisible() {
    await expect(this.logoutButton).toBeVisible();
    return this;
  }
}
