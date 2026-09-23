import { test, expect } from "@playwright/test";
import { createUser } from "../helpers/users";

test("displays the login form", async ({ page }) => {
  // navigate
  await page.goto("/login.html");
  // find element
  const heading = page.getByRole("heading", { name: "Sign in" });
  const emailInput = page.getByLabel("Email");
  const signInButton = page.getByRole("button", { name: "Sign in" });
  // assert
  await expect(heading).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(signInButton).toBeVisible();
});

test("user can submit the login form", async ({ page, request }) => {
  const user = await createUser(request, {
    email: "barry.allen@flash.com",
    name: "Barry Allen",
  });

  await page.goto("/login.html");
  await page.getByLabel("Email").fill(user.email);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText(`Signed in as ${user.email}`)).toBeVisible();
});

test("shows an error for an unknown user", async ({ page }) => {
  await page.goto("/login.html");
  await page.getByLabel("Email").fill("unknown@user.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Error: Invalid credentials")).toBeVisible();
});
