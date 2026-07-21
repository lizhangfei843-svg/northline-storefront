import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/shop", "/cart", "/checkout", "/about", "/contact"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" || route === "/shop" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.6 })),
    ...products.map((product) => ({ url: `${baseUrl}/shop/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
