import { describe, expect, it } from "vitest";
import { calculateTotals, filterAndSortProducts, formatCurrency } from "@/lib/commerce";
import { products } from "@/data/products";

describe("commerce helpers", () => {
  it("filters by search, category, and price", () => {
    const results = filterAndSortProducts(products, {
      query: "lamp",
      category: "Lighting",
      minPrice: "100",
      maxPrice: "140",
      sort: "featured",
    });
    expect(results.map((product) => product.slug)).toEqual(["beam-task-lamp"]);
  });

  it("sorts price from low to high", () => {
    const results = filterAndSortProducts(products, {
      query: "",
      category: "Audio",
      minPrice: "",
      maxPrice: "",
      sort: "price-asc",
    });
    expect(results.map((product) => product.price)).toEqual([139, 189, 248]);
  });

  it("calculates free shipping, demo discount, tax, and total", () => {
    const totals = calculateTotals(300, "standard", "DESK10");
    expect(totals.discount).toBeCloseTo(30);
    expect(totals.shipping).toBe(0);
    expect(totals.tax).toBeCloseTo(22.275);
    expect(totals.total).toBeCloseTo(292.275);
    expect(formatCurrency(totals.total)).toBe("$292.28");
  });
});
