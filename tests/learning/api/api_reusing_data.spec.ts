// tests/learning/api/
// api_reusing_data.spec.ts

import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data Between API Requests", async ({ request }) => {
  const email = faker.internet.email();
  const password = "123456";
  const username = faker.internet.username();
  let userId = "";

  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password,
        email,
      },
    }
  );
  const registerResponseBody = await registerResponse.json();
  userId = registerResponseBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    }
  );
  const userResponseBody = await userResponse.json();

  // * Připravte testy na kontrolu hodnot: username a email
  expect(
    userResponseBody.username,
    "userResponseBody.username should have value"
  ).toBe(username);
  expect(
    userResponseBody.email,
    "userResponseBody.email should have value"
  ).toBe(email);
});
