import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/shop-catalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop modern workspace products",
  description: "Browse the fictional Northline Supply demo catalog with search, category, price, and rating controls.",
};

function CatalogLoading() {
  return (
    <div className="site-container grid gap-8 py-10 lg:grid-cols-[240px_minmax(0,1fr)]" role="status" aria-label="Loading products">
      <div className="hidden h-[420px] animate-pulse rounded-[6px] bg-[#edf0ec] lg:block" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-[390px] animate-pulse rounded-[6px] bg-[#edf0ec]" />)}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main id="main-content">
      <header className="border-b border-[#d9ded9] bg-[#f4f5f3] py-10 md:py-14">
        <div className="site-container"><p className="eyebrow">Northline collection</p><h1 className="mt-3 text-4xl font-black md:text-5xl">Shop all products</h1><p className="mt-4 max-w-3xl text-base leading-7 text-[#5d655f]">Portfolio catalog: product names, prices, specifications, ratings, and inventory are fictional. Photos are representative Unsplash imagery and do not depict real Northline products.</p></div>
      </header>
      <Suspense fallback={<CatalogLoading />}><ShopCatalog products={products} /></Suspense>
    </main>
  );
}
