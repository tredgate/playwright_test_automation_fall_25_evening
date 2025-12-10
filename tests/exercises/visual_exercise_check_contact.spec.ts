import {test, expect} from '@playwright/test';

test("Visual Check Contact Form", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/contact.html");
    await expect(page).toHaveScreenshot("contact_form_check.png");
})
