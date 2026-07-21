"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { filterAndSortProducts, type ShopFilters } from "@/lib/commerce";
import { productCategories, type Product } from "@/types/product";

function getFilters(searchParams: URLSearchParams): ShopFilters {
  const sortValue = searchParams.get("sort");
  const sort: ShopFilters["sort"] =
    sortValue === "price-asc" || sortValue === "price-desc" || sortValue === "rating"
      ? sortValue
      : "featured";
  return {
    query: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    minPrice: searchParams.get("min") ?? "",
    maxPrice: searchParams.get("max") ?? "",
    sort,
  };
}

type FilterFieldsProps = {
  idPrefix: string;
  filters: ShopFilters;
  updateFilter: (key: keyof ShopFilters, value: string) => void;
  clearFilters: () => void;
};

function FilterFields({ idPrefix, filters, updateFilter, clearFilters }: FilterFieldsProps) {
  const [expanded, setExpanded] = useState(true);
  const hasFilters = Boolean(filters.query || filters.category || filters.minPrice || filters.maxPrice || filters.sort !== "featured");
  const contentId = `${idPrefix}-filter-fields`;
  const searchId = `${idPrefix}-catalog-search`;
  const categoryName = `${idPrefix}-category`;
  const minPriceId = `${idPrefix}-min-price`;
  const maxPriceId = `${idPrefix}-max-price`;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="flex min-h-11 items-center gap-2 rounded-[5px] pr-2 text-base font-bold text-[#202522] hover:text-[#1f513c]"
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filters
            {expanded ? <ChevronUp size={17} aria-hidden="true" /> : <ChevronDown size={17} aria-hidden="true" />}
          </button>
        </h2>
        <button type="button" onClick={clearFilters} disabled={!hasFilters} className="text-sm font-bold text-[#1f513c] disabled:cursor-not-allowed disabled:text-[#9aa19b]">Clear all</button>
      </div>
      {expanded ? (
        <div id={contentId}>
          <div className="mt-6">
            <label htmlFor={searchId} className="field-label">Search</label>
            <div className="relative">
              <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#687069]" />
              <input id={searchId} type="search" value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="Search products" className="field field-with-leading-icon" />
            </div>
          </div>
          <fieldset className="mt-7 border-t border-[#d9ded9] pt-6">
            <legend className="field-label float-left w-full">Category</legend>
            <div className="clear-both space-y-3 pt-2">
              <label className="flex cursor-pointer items-center gap-3 text-sm"><input type="radio" name={categoryName} checked={filters.category === ""} onChange={() => updateFilter("category", "")} className="h-4 w-4 accent-[#1f513c]" /> All categories</label>
              {productCategories.map((category) => (
                <label key={category} className="flex cursor-pointer items-center gap-3 text-sm"><input type="radio" name={categoryName} checked={filters.category === category} onChange={() => updateFilter("category", category)} className="h-4 w-4 accent-[#1f513c]" /> {category}</label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-7 border-t border-[#d9ded9] pt-6">
            <legend className="field-label float-left w-full">Price range</legend>
            <div className="clear-both grid grid-cols-2 gap-3 pt-2">
              <div><label className="text-xs text-[#626963]" htmlFor={minPriceId}>Minimum</label><input id={minPriceId} type="number" min="0" inputMode="decimal" value={filters.minPrice} onChange={(event) => updateFilter("minPrice", event.target.value)} placeholder="$0" className="field mt-1" /></div>
              <div><label className="text-xs text-[#626963]" htmlFor={maxPriceId}>Maximum</label><input id={maxPriceId} type="number" min="0" inputMode="decimal" value={filters.maxPrice} onChange={(event) => updateFilter("maxPrice", event.target.value)} placeholder="$700" className="field mt-1" /></div>
            </div>
          </fieldset>
        </div>
      ) : null}
    </div>
  );
}

export function ShopCatalog({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filters = useMemo(() => getFilters(searchParams), [searchParams]);
  const results = useMemo(() => filterAndSortProducts(products, filters), [products, filters]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setMobileFiltersOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileFiltersOpen]);

  function updateFilter(key: keyof ShopFilters, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const paramName = { query: "q", category: "category", minPrice: "min", maxPrice: "max", sort: "sort" }[key];
    if (value && !(key === "sort" && value === "featured")) params.set(paramName, value);
    else params.delete(paramName);
    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="site-container grid gap-8 py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-14">
      <aside className="hidden lg:block" aria-label="Product filters">
        <div className="sticky top-[100px]"><FilterFields idPrefix="desktop" filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} /></div>
      </aside>
      <section aria-labelledby="catalog-results" className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#d9ded9] pb-5">
          <div>
            <h2 id="catalog-results" className="text-lg font-bold">{results.length} {results.length === 1 ? "product" : "products"}</h2>
            {filters.category ? <p className="mt-1 text-sm text-[#626963]">Filtered by {filters.category}</p> : null}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMobileFiltersOpen(true)} className="button-secondary mobile-filter-trigger" data-testid="mobile-filter-trigger" aria-haspopup="dialog"><Filter size={17} aria-hidden="true" /> Filters</button>
            <label htmlFor="sort" className="visually-hidden">Sort products</label>
            <select id="sort" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)} className="field w-auto min-w-[168px]" aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        {results.length ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[6px] border border-dashed border-[#bdc5be] bg-[#f7f8f6] px-6 text-center" role="status">
            <Search size={30} className="text-[#1f513c]" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-bold">No products match</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#626963]">Try a broader search, remove a category, or clear the price range.</p>
            <button type="button" onClick={clearFilters} className="button-primary mt-5">Clear filters</button>
          </div>
        )}
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setMobileFiltersOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Product filters" className="ml-auto h-full w-[min(90vw,380px)] overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between"><p className="font-bold">Refine products</p><button type="button" onClick={() => setMobileFiltersOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] hover:bg-[#f4f5f3]" aria-label="Close filters"><X size={22} /></button></div>
            <FilterFields idPrefix="mobile" filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="button-primary mt-8 w-full">Show {results.length} products</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
