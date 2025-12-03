import { test } from "@playwright/test";

test("Exercise: Simple Request", async ({ request }) => {
  await request.get("https://www.tredgate.cloud/courses");
});
