// tests/learning/api/
// mocking_api.spec.ts
import { expect, test } from "@playwright/test";

const mockedApi = [
  {
    _id: "6626f7f13fcf6b9a1fc88191",
    userId: 123,
    accountId: "5454",
    balance: 50000000,
    transactionLimits: {
      dailyLimit: 5555,
      monthlyLimit: 99999,
      _id: "6626f7f13fcf6b9a1fc88192",
    },
    accountType: "PLAYWRIGHT MOCK",
    loginHistory: [],
    transactionHistory: [],
    createdAt: "2024-04-22T23:51:13.095Z",
    __v: 0,
  },
];

test("Mocking API", async ({ page }) => {
  await page.route(/accounts\/user/, async (interceptedApi) => {
    await interceptedApi.fulfill({ json: mockedApi });
  });

  const username = "fifka_petr";
  const password = "Tredgate2023#";

  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill(username);
  await page.locator('[data-testid="password"]').fill(password);
  const responsePromise = page.waitForResponse(/auth\/login/);
  await page.locator('[data-testid="log_in"]').click();
  await responsePromise;
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(page.locator('[data-testid="loader"]')).toBeHidden();
  await expect(page.locator('[data-testid="title"]')).toBeVisible();
});
