// tests/learning/api/
// sending_api.spec.ts
import { test } from "@playwright/test";

test("GET Request", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
});

test("GET Request with URL Parameter", async ({ request }) => {
  await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
    params: {
      userId: 1452,
    },
  });
});

test("GET Request with Header", async ({ request }) => {
  await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
    {
      headers: {
        train: "Testujeme hlavicky",
      },
    }
  );
});

test("POST Request with JSON Body", async ({ request }) => {
  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train/body",
    {
      data: {
        stringProperty: "test",
        numberProperty: 123,
        booleanProperty: true,
      },
    }
  );
});
