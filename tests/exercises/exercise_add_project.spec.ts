import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Cvičení: Vytvoření projektu E2E", async ({ page }) => {
  const projectName =
    faker.food.ingredient() + "_" + faker.number.int({ max: 1_000_000 });
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((newProjectModal) => newProjectModal.fillName(projectName))
    .then((newProjectModal) => newProjectModal.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogout());
});
