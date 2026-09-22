import { test, expect } from "@playwright/test";

const invalidUsers = [
  {
    description: "email is missing",
    data: {
      name: "Bruce Wayne",
    },
    expectedError: "Email is required",
  },
  {
    description: "name is missing",
    data: {
      email: "bruce.wayne@wayneenterprises.com",
    },
    expectedError: "Name is required",
  },
];

test.describe("POST /api/users", () => {
  test("creates a user", async ({ request }) => {
    const response = await request.post("/api/users", {
      data: {
        name: "Bruce Wayne",
        email: "bruce.wayne@wayneenterprises.com",
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body).toEqual({
      id: 1,
      name: "Bruce Wayne",
      email: "bruce.wayne@wayneenterprises.com",
    });
  });

  for (const testCase of invalidUsers) {
    test(`returns 400 when ${testCase.description}`, async ({ request }) => {
      const response = await request.post("/api/users", {
        data: testCase.data,
      });

      const body = await response.json();
      expect(response.status()).toBe(400);
      expect(body.error).toBe(testCase.expectedError);
    });
  }
});
