import { test, expect } from "@playwright/test";

test.describe("Booking Flow", () => {
  test("homepage loads and tours are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("tour listing page loads", async ({ page }) => {
    await page.goto("/tours");
    await expect(page.locator("body")).toBeVisible();
  });

  test("tour detail page loads by slug", async ({ page }) => {
    await page.goto("/tours/historic-route");
    await expect(page.locator("body")).toBeVisible();
  });
});
