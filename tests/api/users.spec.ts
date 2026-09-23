import { test, expect } from "@playwright/test";
import { createUser } from "../helpers/users";

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

test.describe("Users API", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ request }) => {
    const response = await request.delete("/api/test/reset");
    expect(response.status()).toBe(204);
  });

  test("creates a user", async ({ request }) => {
    const response = await request.post("/api/users", {
      data: {
        name: "Bruce Wayne",
        email: "bruce.wayne@wayneenterprises.com",
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body).toMatchObject({
      name: "Bruce Wayne",
      email: "bruce.wayne@wayneenterprises.com",
    });

    expect(body.id).toEqual(expect.any(Number));
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

  test("created user can be retrieved by id", async ({ request }) => {
    const createdUser = await createUser(request, {
      name: "Clark Kent",
      email: "clark.kent@dailyplanet.com",
    });

    const getResponse = await request.get(`/api/users/${createdUser.id}`);
    expect(getResponse.status()).toBe(200);

    const fetchedUser = await getResponse.json();

    expect(fetchedUser).toEqual(createdUser);
  });

  test("returns 404 when user does not exist", async ({ request }) => {
    const response = await request.get("/api/users/999");
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.error).toBe("User not found");
  });
});
