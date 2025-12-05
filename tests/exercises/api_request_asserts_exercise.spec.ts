import { expect, test } from "@playwright/test";

test("Exercise: API Testing Responses", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const responseBody = await response.json();

  expect(responseBody, "Response body have property userId").toHaveProperty(
    "userId"
  );
  expect(
    typeof responseBody.active,
    "responseBody.active should be a number"
  ).toEqual("number");
  expect(
    responseBody.username,
    "responseBody.username should have correct value"
  ).toBe("petrfifka");
});
