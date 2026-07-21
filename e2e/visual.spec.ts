import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const screenshotDir = path.join(process.cwd(), "artifacts", "screenshots");

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
}

async function expectVisibleImagesLoaded(page: Page) {
  const imagesLoaded = await page.locator("img").evaluateAll((images) =>
    images.filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }).every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
  );
  expect(imagesLoaded).toBe(true);
}

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`home visual check at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Northline Supply" })).toBeVisible();
    await expect(page.locator("main section").first().locator("img").first()).toBeVisible();
    await expectVisibleImagesLoaded(page);
    await expectNoHorizontalOverflow(page);

    const featuredTop = await page.getByRole("heading", { name: "Featured products" }).evaluate((element) => element.getBoundingClientRect().top);
    expect(featuredTop).toBeLessThan(viewport.height + 100);

    const navDoesNotOverlap = await page.locator("header").evaluate((header) => {
      const visibleInteractive = [...header.querySelectorAll<HTMLElement>("a, button")].filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && rect.width > 0 && rect.height > 0;
      });
      return visibleInteractive.every((item, index) => visibleInteractive.slice(index + 1).every((other) => {
        const a = item.getBoundingClientRect();
        const b = other.getBoundingClientRect();
        const intersects = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
        return !intersects;
      }));
    });
    expect(navDoesNotOverlap).toBe(true);

    await page.screenshot({ path: path.join(screenshotDir, `home-${viewport.name}-${viewport.width}x${viewport.height}.png`), fullPage: false, caret: "initial" });
  });
}

test("shop cards and mobile filter remain stable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/shop");
  await expect(page.getByTestId("product-card")).toHaveCount(12);
  const mobileFilterTrigger = page.getByTestId("mobile-filter-trigger");
  await expect(mobileFilterTrigger).toBeHidden();
  const searchField = page.getByPlaceholder("Search products");
  await expect(searchField).toHaveCSS("padding-left", "42px");
  const searchSpacing = await searchField.evaluate((input) => {
    const icon = input.previousElementSibling;
    if (!(icon instanceof SVGElement)) return false;
    const inputRect = input.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const textStart = inputRect.left + Number.parseFloat(getComputedStyle(input).paddingLeft);
    return iconRect.right + 6 <= textStart;
  });
  expect(searchSpacing).toBe(true);
  const desktopFilters = page.getByRole("complementary", { name: "Product filters" });
  const desktopFilterToggle = desktopFilters.getByRole("button", { name: "Filters", exact: true });
  await expect(desktopFilterToggle).toHaveAttribute("aria-expanded", "true");
  await desktopFilterToggle.click();
  await expect(desktopFilterToggle).toHaveAttribute("aria-expanded", "false");
  await expect(searchField).toBeHidden();
  await desktopFilterToggle.click();
  await expect(desktopFilterToggle).toHaveAttribute("aria-expanded", "true");
  await expect(searchField).toBeVisible();
  await expectNoHorizontalOverflow(page);
  const firstRowHeights = await page.getByTestId("product-card").evaluateAll((cards) => cards.slice(0, 4).map((card) => Math.round(card.getBoundingClientRect().height)));
  expect(new Set(firstRowHeights).size).toBe(1);
  const titlesFit = await page.locator("[data-testid='product-card'] h3").evaluateAll((titles) => titles.every((title) => title.scrollHeight <= title.clientHeight + 1 && title.scrollWidth <= title.clientWidth + 1));
  expect(titlesFit).toBe(true);
  await page.screenshot({ path: path.join(screenshotDir, "shop-desktop-1440x900.png"), fullPage: false, caret: "initial" });

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(mobileFilterTrigger).toBeHidden();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop");
  const mobileFilterTriggerSmall = page.getByTestId("mobile-filter-trigger");
  await expect(mobileFilterTriggerSmall).toBeVisible();
  await mobileFilterTriggerSmall.click();
  const filterDialog = page.getByRole("dialog", { name: "Product filters" });
  await expect(filterDialog).toBeVisible();
  const mobileFilterToggle = filterDialog.getByRole("button", { name: "Filters", exact: true });
  await mobileFilterToggle.click();
  await expect(mobileFilterToggle).toHaveAttribute("aria-expanded", "false");
  await mobileFilterToggle.click();
  await expect(mobileFilterToggle).toHaveAttribute("aria-expanded", "true");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(screenshotDir, "shop-mobile-filter-390x844.png"), fullPage: false, caret: "initial" });
});

test("mobile cart and checkout do not overlap", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/shop/field-mechanical-keyboard");
  await page.getByTestId("add-to-cart").click();
  await page.goto("/cart");
  await expect(page.getByText("Field Low-Profile Mechanical Keyboard", { exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(screenshotDir, "cart-mobile-390x844.png"), fullPage: false, caret: "initial" });
  await page.getByRole("link", { name: /Continue to mock checkout/ }).click();
  await expect(page.getByRole("heading", { name: "Mock checkout" })).toBeVisible();
  await expect(page.getByText("Demo checkout — no payment will be processed.")).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, 0); });
  await page.waitForFunction(() => window.scrollY === 0);
  await page.screenshot({ path: path.join(screenshotDir, "checkout-mobile-390x844.png"), fullPage: false, caret: "initial" });
});
