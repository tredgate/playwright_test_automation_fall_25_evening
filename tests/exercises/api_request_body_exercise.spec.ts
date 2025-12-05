import { faker } from "@faker-js/faker";
import { test } from "@playwright/test";

test("Exercise: Request with Body", async ({ request }) => {
  const username =
    faker.internet.username() + faker.number.int({ max: 1_000_000 });
  const password = "123456";
  const email = faker.internet.email({ provider: "tredgate.cz" });

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password,
        email,
      },
    }
  );
});
