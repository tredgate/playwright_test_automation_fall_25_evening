// tests/learning/atomic-tests/
// atomic_tests_create_project.spec.ts
import { expect, test } from "@playwright/test";
import path from "path";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/pmtool/projects/create_new_project_modal.ts";

test.describe("Atomic Tests: Create Project Modal", () => {
  let newProjectModal: CreateNewProjectModal;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    newProjectModal = await loginPage
      .open()
      .then((login) => login.login("pw_academy", "Playwright321!"))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Modal Structure Structure", async () => {
    await test.step("Title Header", async () => {
      await expect.soft(newProjectModal.titleHeader).toBeVisible();
      await expect.soft(newProjectModal.titleHeader).toHaveText("Project Info");
    });
  });
});
