import { test, expect } from '@playwright/test';
import path from 'path';

test.describe("Visual Tests", () => {
    test("Simple Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("simple_test.png");
    })

    test.skip("Failing Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
        await expect(page).toHaveScreenshot("dynamic_box_check.png");
    })

    test("Full Page Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("simple_test_full_page.png", { fullPage: true });
    })

    test("maxDiffPixelRatio Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await page.locator('div[data-testid="double-click-box"]').dblclick();
        await expect(page).toHaveScreenshot("max_diff_pixel_use_case.png", { maxDiffPixelRatio: 0.2 });
    })

    test("Masking Elements", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/web-actions.html");
        await expect(page).toHaveScreenshot("masked_element_check.png", {
            mask: [
                page.locator('#hover-box')
            ]
        })
    })

    test.skip("Masking not Working", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
        await expect(page).toHaveScreenshot("masking_not_working.png", {
            mask: [
                page.locator('[data-testid="dynamic-size-box"]:first-of-type')
            ]
        })
    })

    test("Hide Elements with CSS", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
        await expect(page).toHaveScreenshot("replacing_css_check.png", {
            fullPage: true,
            stylePath: path.resolve(
                __dirname,
                "../../../src/assets/visual_tests.css"
            )
        })
    })

    test("Image Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/index.html");
        await expect(page.locator("#playwright-logo")).toHaveScreenshot("playwright_logo_check.png");
    })

    test("Module Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/contact.html");
        await expect(page.locator("#practiceForm")).toHaveScreenshot("form_module_check.png");
    })
    
    test("Input Visual Test", async ({ page }) => {
        await page.goto("https://tredgate.com/webtrain/registration.html");
        const phoneLocator = page.locator("#phone");
        await phoneLocator.fill("12345431");
        await expect(phoneLocator).toHaveScreenshot("phone_input_check.png");
    })
})