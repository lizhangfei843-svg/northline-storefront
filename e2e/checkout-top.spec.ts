import path from "node:path";
import { expect, test } from "@playwright/test";

test("capture checkout from the top without overlap", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/shop/field-mechanical-keyboard");
  await page.getByTestId("add-to-cart").click();
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "Mock checkout" })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await page.screenshot({ path: path.join(process.cwd(), "artifacts", "screenshots", "checkout-mobile-390x844.png"), fullPage: false, caret: "initial" });
});
