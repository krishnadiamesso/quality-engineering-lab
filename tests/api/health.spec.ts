import { test, expect } from "@playwright/test";

test("GET /health returns 200 status", async ({ request }) => {
  // Make http request
  const response = await request.get("/health");
  const body = await response.json();

  // Make assertions
  expect(response.status()).toBe(200);
  expect(body.status).toBe("ok");
});
