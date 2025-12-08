// tests/learning/api/
// using_api_requests_in_frontend.spec.ts

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API and then open Accounts in Browser", async ({
  page,
  request,
}) => {
  const email = faker.internet.email();
  const password = "Petr2025#";
  const username = faker.internet.username();

  await request.post("http://localhost:3000/user/register", {
    data: {
      email,
      password,
      username,
    },
  });

  const loginResponse = await request.post("http://localhost:3000/auth/login", {
    data: {
      password,
      username,
    },
  });
  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;

  // * Nastavení Cookies pro Playwright
  await page.context().addCookies([
    {
      name: "access_token",
      value: accessToken,
      path: "/",
      domain: "localhost",
    },
  ]);

  await page.goto("http://localhost:3001/app");
  await expect(page.locator('[data-testid="page_title"]')).toHaveText(
    "Dashboard"
  );
});
