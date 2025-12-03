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

    await test.step("Info Tab", async () => {
      await expect.soft(newProjectModal.infoTab).toBeVisible();
      await expect.soft(newProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select", async () => {
      await expect.soft(newProjectModal.priorityLabel).toBeVisible();
      await expect.soft(newProjectModal.prioritySelect).toBeVisible();
      await expect.soft(newProjectModal.priorityLabel).toHaveText("*Priority");
      await expect.soft(newProjectModal.prioritySelect).toHaveValue("34");
      await expect.soft(newProjectModal.prioritySelect).toContainText("Urgent");
      await expect.soft(newProjectModal.prioritySelect).toContainText("High");
      await newProjectModal.selectPriority("High");
      await expect.soft(newProjectModal.prioritySelect).toHaveValue("35");
    });

    await test.step("Status Select", async () => {
      await expect.soft(newProjectModal.statusLabel).toBeVisible();
      await expect.soft(newProjectModal.statusSelect).toBeVisible();
      await expect.soft(newProjectModal.statusLabel).toHaveText("*Status");
      await expect.soft(newProjectModal.statusSelect).toContainText("New");
      await expect.soft(newProjectModal.statusSelect).toContainText("Open");
      await expect.soft(newProjectModal.statusSelect).toContainText("Waiting");
      await expect.soft(newProjectModal.statusSelect).toContainText("Closed");
      await expect.soft(newProjectModal.statusSelect).toContainText("Canceled");
      await expect.soft(newProjectModal.statusSelect).toHaveValue("37");
      await newProjectModal.selectStatus("Open");
      await expect.soft(newProjectModal.statusSelect).toHaveValue("38");
      await newProjectModal.selectStatus("Waiting");
      await expect.soft(newProjectModal.statusSelect).toHaveValue("39");
      await newProjectModal.selectStatus("Closed");
      await expect.soft(newProjectModal.statusSelect).toHaveValue("40");
      await newProjectModal.selectStatus("Canceled");
      await expect.soft(newProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input", async () => {
      await expect.soft(newProjectModal.nameInput).toBeVisible();
      await expect.soft(newProjectModal.nameLabel).toBeVisible();
      await expect.soft(newProjectModal.nameLabel).toHaveText("*Name");
      await expect.soft(newProjectModal.nameInput).toBeEnabled();
    });

    await test.step("Start Date Input", async () => {
      await expect.soft(newProjectModal.startDateLabel).toBeVisible();
      await expect.soft(newProjectModal.startDateInput).toBeVisible();
      await expect
        .soft(newProjectModal.startDateLabel)
        .toHaveText("Start Date");
      await expect.soft(newProjectModal.startDateInput).toBeEnabled();
    });

    await test.step("Attachments", async () => {
      await expect.soft(newProjectModal.attachmentsLabel).toBeVisible();
      await expect
        .soft(newProjectModal.attachmentsLabel)
        .toHaveText("Attachments");
    });

    await test.step("Buttons", async () => {
      await expect.soft(newProjectModal.saveButton).toBeVisible();
      await expect.soft(newProjectModal.saveButton).toHaveText("Save");
      await expect.soft(newProjectModal.closeButton).toBeVisible();
      await expect.soft(newProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Upload File", async () => {
    const filePath = path.resolve(__dirname, "../../../assets/upload_file.txt");
    await newProjectModal.uploadFile(filePath);
    // TODO: Add expect to file uploaded.
  });

  test("Name Input Validation", async () => {
    await newProjectModal.triggerNameValidation();
    await expect(newProjectModal.nameValidationDiv).toBeVisible();
    await expect(newProjectModal.nameValidationDiv).toHaveText(
      "This field is required!"
    );
    await expect(newProjectModal.alertMessageDiv).toBeVisible();
    await expect(newProjectModal.alertMessageDiv).toHaveText(
      "Some fields are required. They have been highlighted above."
    );
  });

  test("Description iframe", async () => {
    const inputText = "Píšeme do iframe";
    await newProjectModal.fillDescription(inputText);
    const frame = newProjectModal.descriptionFrame;
    await expect(frame.locator("body")).toHaveText(inputText);
  });
});
