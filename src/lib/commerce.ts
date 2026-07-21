import type { Product } from "@/types/product";

export const SHIPPING_THRESHOLD = 250;
export const STANDARD_SHIPPING = 12;
export const EXPRESS_SHIPPING = 28;
export const TAX_RATE = 0.0825;

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function getDiscountedSubtotal(subtotal: number, promoCode?: string) {
  return promoCode?.toUpperCase() === "DESK10" ? subtotal * 0.9 : subtotal;
}

export function calculateTotals(
  subtotal: number,
  shippingMethod: "standard" | "express" = "standard",
  promoCode?: string,
) {
  const discountedSubtotal = getDiscountedSubtotal(subtotal, promoCode);
  const discount = subtotal - discountedSubtotal;
  const shipping = shippingMethod === "express"
    ? EXPRESS_SHIPPING
    : discountedSubtotal >= SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;
  const tax = discountedSubtotal * TAX_RATE;
  return { subtotal, discount, shipping, tax, total: discountedSubtotal + shipping + tax };
}

export type ShopFilters = {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: "featured" | "price-asc" | "price-desc" | "rating";
};

export function filterAndSortProducts(allProducts: Product[], filters: ShopFilters) {
  const query = filters.query.trim().toLowerCase();
  const min = filters.minPrice === "" ? Number.NEGATIVE_INFINITY : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? Number.POSITIVE_INFINITY : Number(filters.maxPrice);

  return allProducts
    .filter((product) => {
      const matchesQuery = query === "" ||
        `${product.name} ${product.shortDescription} ${product.category}`.toLowerCase().includes(query);
      const matchesCategory = filters.category === "" || product.category === filters.category;
      return matchesQuery && matchesCategory && product.price >= min && product.price <= max;
    })
    .sort((a, b) => {
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      if (filters.sort === "rating") return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured) || b.reviewCount - a.reviewCount;
    });
}
