import { test } from "@playwright/test"
import { LoginPage } from "src/pages/pmtool/login_page";

test.describe("Using tags for filter test", {tag: "@DescribeTag"}, () => {
    test("Tag test", { tag: "@MujTag"}, async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.open();
    });
    test("Without tag test", async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.open();
    });   
})

