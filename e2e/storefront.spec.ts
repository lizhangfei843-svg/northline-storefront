import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("home displays the brand and featured products", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Northline Supply" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Featured products" })).toBeVisible();
  await expect(page.getByTestId("product-card")).toHaveCount(8);
});

test("searches, filters, and opens a product detail", async ({ page }) => {
  await page.goto("/shop");
  await page.getByPlaceholder("Search products").fill("headphones");
  await expect(page).toHaveURL(/q=headphones/);
  await expect(page.getByTestId("product-card")).toHaveCount(1);
  await page.getByRole("link", { name: "Studio Monitor Headphones", exact: true }).click();
  await expect(page).toHaveURL(/studio-monitor-headphones/);
  await expect(page.getByRole("heading", { level: 1, name: "Studio Monitor Headphones" })).toBeVisible();

  await page.goto("/shop");
  await page.locator("aside").getByLabel("Audio").click();
  await expect(page).toHaveURL(/category=Audio/);
  await expect(page.getByTestId("product-card")).toHaveCount(3);
});

test("product gallery, color, quantity, and add to cart are interactive", async ({ page }) => {
  await page.goto("/shop/field-mechanical-keyboard");

  const mainImage = page.locator("main img").first();
  const initialImageSrc = await mainImage.getAttribute("src");
  const secondImageButton = page.getByRole("button", { name: "View product image 2" });
  await secondImageButton.click();
  await expect(secondImageButton).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => mainImage.getAttribute("src")).not.toBe(initialImageSrc);

  await page.getByRole("button", { name: "Select Fog" }).click();
  await expect(page.getByTestId("selected-variant")).toHaveText("Fog");
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(page.getByTestId("product-quantity")).toHaveText("2");

  await page.getByTestId("add-to-cart").click();
  await expect(page.getByRole("status")).toContainText("Added 2");
  await expect(page.getByTestId("cart-count")).toHaveText("2");
});
test("selects a variant, persists the cart, changes quantity, and removes the item", async ({ page }) => {
  await page.goto("/shop/beam-task-lamp");
  await page.getByRole("button", { name: "Select Matte black" }).click();
  await expect(page.getByTestId("selected-variant")).toHaveText("Matte black");
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await page.getByTestId("add-to-cart").click();
  await expect(page.getByRole("status")).toContainText("Added 2");
  await expect(page.getByTestId("cart-count")).toHaveText("2");

  await page.goto("/cart");
  await expect(page.getByText("Beam Adjustable Task Lamp", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("cart-item-quantity")).toHaveText("2");
  await page.getByRole("button", { name: "Increase quantity of Beam Adjustable Task Lamp" }).click();
  await expect(page.getByTestId("cart-item-quantity")).toHaveText("3");
  await page.getByRole("button", { name: "Remove Beam Adjustable Task Lamp from cart" }).click();
  await expect(page.getByRole("heading", { name: "Your cart is empty" })).toBeVisible();
});

test("validates required checkout fields and completes a demo order", async ({ page }) => {
  await page.goto("/shop/axis-desk-mat");
  await page.getByTestId("add-to-cart").click();
  await page.goto("/cart");
  await page.getByRole("link", { name: /Continue to mock checkout/ }).click();
  await page.getByTestId("complete-order").click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("First name is required.")).toBeVisible();

  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel("First name").fill("Demo");
  await page.getByLabel("Last name").fill("User");
  await page.getByLabel("Street address").fill("100 Sample Street");
  await page.getByLabel("City").fill("Portland");
  await page.getByLabel("State / region").fill("Oregon");
  await page.getByLabel("Postal code").fill("97201");
  await page.getByLabel("Promo code demo").fill("DESK10");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Demo code applied: 10% off.")).toBeVisible();
  await page.getByTestId("complete-order").click();

  await expect(page).toHaveURL(/order-confirmation/);
  await expect(page.getByRole("heading", { name: "Demo order confirmed" })).toBeVisible();
  await expect(page.getByText("No order was created", { exact: false })).toBeVisible();
});

test("mobile filter panel is keyboard-accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop");
  await page.getByRole("button", { name: "Filters" }).click();
  const dialog = page.getByRole("dialog", { name: "Product filters" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Lighting").click();
  await expect(page).toHaveURL(/category=Lighting/);
  await dialog.getByRole("button", { name: /Show 2 products/ }).click();
  await expect(page.getByTestId("product-card")).toHaveCount(2);
});
