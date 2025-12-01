import { FrameLocator, Locator, Page, test } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly prioritySelect: Locator;
  readonly priorityLabel: Locator;
  readonly statusSelect: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly startDateInput: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly descriptionFrameLocator: string;
  readonly descriptionFrame: FrameLocator;
  readonly attachmentsLabel: Locator;
  readonly attachmentsButton: Locator;
  readonly closeButton: Locator;
  readonly nameValidationDiv: Locator;
  readonly alertMessageDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-testid="Name"] input');
    this.saveButton = page.locator('[type="submit"]');
    this.titleHeader = page.locator("h4.modal-title");
    this.infoTab = page.locator('//ul[@id="form_tabs"]//li[1]');
    this.prioritySelect = page.locator('[data-testid="Priority"] select');
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]/../../label'
    );
    this.statusSelect = page.locator('[data-testid="Status"] select');
    this.statusLabel = page.locator('//div[@data-testid="Status"]/../../label');
    this.nameLabel = page.locator('//div[@data-testid="Name"]/../../label');
    this.startDateInput = page.locator('[data-testid="Start Date"] input');
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]/../../label'
    );
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]/../../label'
    );
    this.descriptionFrameLocator = '[data-testid="Description"] iframe';
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]/../../label'
    );
    this.attachmentsButton = page.locator(
      '//div[@data-testid="Attachments"]//input[contains(@id,"uploadifive_attachments_upload")]'
    );
    this.closeButton = page.locator(".btn-close");
    this.nameValidationDiv = page.locator('[data-testid="Name"] label.error');
    this.alertMessageDiv = page.locator("#form-error-container .alert");
    this.descriptionFrame = page.frameLocator(this.descriptionFrameLocator);
  }

  async selectPriority(priorityLabel: string) {
    await this.prioritySelect.selectOption({ label: priorityLabel });
    return this;
  }

  async selectStatus(statusLabel: string) {
    await this.statusSelect.selectOption({ label: statusLabel });
    return this;
  }

  async fillName(projectName: string) {
    await this.nameInput.fill(projectName);
    return this;
  }

  async fillStartDate(startDate: string) {
    await this.startDateInput.fill(startDate);
    return this;
  }

  async fillDescription(descriptionText: string) {
    await this.descriptionFrame.locator("body").fill(descriptionText);
    return this;
  }

  async uploadFile(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    return this;
  }

  async clickSave() {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async clickClose() {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }

  async triggerNameValidation() {
    await test.step("Clear Name input and Click save to trigger validation", async () => {
      await this.nameInput.clear();
      await this.saveButton.click();
    });
    return this;
  }

  async triggerAlertMessage() {
    await this.triggerNameValidation();
    return this;
  }
}
