// tests/learning/api/
// api_objects.spec.ts

import { expect, test } from "@playwright/test";
import { UserApi } from "../../../src/api/tegb/user_api.ts";
import { faker } from "@faker-js/faker";

test("Register and Login using API", async ({ request }) => {
  const email = faker.internet.email();
  const password = "Petr2025#";
  const username = faker.internet.username();
  const api = new UserApi(request);

  const registerResponse = await api.registerUser(username, password, email);
  const loginResponse = await api.login(username, password);

  // * Testy registrace a přihlášení
  // * I testy mohou být přesunuty do API objektů
  expect(registerResponse.status()).toBe(201);
  expect(loginResponse.status()).toBe(201);

  const registerResponseBody = await registerResponse.json();
  const registerUserId = registerResponseBody.userId;
  expect(registerUserId).toBeDefined();

  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;
  expect(accessToken).toBeDefined();
  expect(typeof accessToken).toBe("string");
});
