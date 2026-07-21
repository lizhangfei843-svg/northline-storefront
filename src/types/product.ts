export const productCategories = [
  "Desk Essentials",
  "Lighting",
  "Audio",
  "Seating",
  "Organization",
] as const;

export type ProductCategory = (typeof productCategories)[number];
export type InventoryStatus = "In stock" | "Low stock" | "Pre-order";

export type ProductVariant = { name: string; hex: string };
export type ProductImage = { src: string; alt: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  inventoryStatus: InventoryStatus;
  featured: boolean;
  specifications: Record<string, string>;
};
