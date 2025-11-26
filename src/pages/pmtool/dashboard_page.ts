import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly bellButton: Locator;
  readonly appNameHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.bellButton = page.locator("#user_notifications_report");
    this.appNameHeader = page.locator(".navbar-brand");
  }

  async clickProfile() {
    await expect(this.bellButton).toBeVisible();
    await this.profileButton.click();
    return this;
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async dashboardAsserts(appName: string) {
    await expect
      .soft(this.profileButton, "Profile Button is Visible")
      .toBeVisible();
    await expect
      .soft(this.appNameHeader, "Application Header have Name")
      .toHaveText(appName);
    return this;
  }
}
