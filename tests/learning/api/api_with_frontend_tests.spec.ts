// tests/learning/api/
// api_with_frontend_tests.spec.ts
import { expect, test } from "@playwright/test";

test("Login API Check", async ({ page }) => {
  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill("fifka_petr");
  await page.locator('[data-testid="password"]').fill("Tredgate2023#");

  // ? Zapínáme čekání na odchycení response pro cestu: auth/login
  const responsePromise = page.waitForResponse(/auth\/login/);
  await page.locator('[data-testid="log_in"]').click();
  await responsePromise; // ? Počká na odchycení a dokončení api requestu auth/login
  await page.locator('[data-testid="logout_button"]').click();
});

test("Intercepted API Login Test (SIT)", async ({ page }) => {
  const username = "fifka_petr";
  const password = "Tredgate2023#";

  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill(username);
  await page.locator('[data-testid="password"]').fill(password);

  // ? Zapínáme čekání na odchycení response pro cestu: auth/login
  const responsePromise = page.waitForResponse(/auth\/login/);
  await page.locator('[data-testid="log_in"]').click();
  const loginResponse = await responsePromise; // ? Počká na odchycení a dokončení api requestu auth/login

  // * Testování Request části loginu
  const loginRequest = loginResponse.request();
  expect(loginRequest.method(), "Login Request has POST method").toBe("POST");
  const loginRequestBody = loginRequest.postDataJSON();
  expect(loginRequestBody.username, "loginRequestBody.username has value").toBe(
    username
  );
  expect(loginRequestBody.password, "loginRequestBody.password has value").toBe(
    password
  );

  // * Testování Response části
  const loginResponseBody = await loginResponse.json();
  expect(loginResponse.status(), "Login Response has 201 Status").toBe(201);
  expect(loginResponseBody, "Login Response has access_token").toHaveProperty(
    "access_token"
  );
});
