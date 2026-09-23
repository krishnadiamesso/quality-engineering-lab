import { test, expect } from "@playwright/test";

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

test("user can submit the login form", async ({ page }) => {
  await page.goto("/login.html");
  await page.getByLabel("Email").fill("bruce@wayne.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Signed in as bruce@wayne.com")).toBeVisible();
});
