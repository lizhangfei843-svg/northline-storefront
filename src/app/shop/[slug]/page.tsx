import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductDetail } from "@/components/product-detail";
import { ProductGrid } from "@/components/product-grid";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Northline Supply`,
      description: product.shortDescription,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  return (
    <main id="main-content">
      <div className="site-container py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 text-sm text-[#626963]">
          <Link href="/" className="hover:text-[#1f513c]">Home</Link><ChevronRight size={15} aria-hidden="true" /><Link href="/shop" className="hover:text-[#1f513c]">Shop</Link><ChevronRight size={15} aria-hidden="true" /><span aria-current="page">{product.name}</span>
        </nav>
        <ProductDetail product={product} />
      </div>
      <section className="border-t border-[#d9ded9] bg-[#f4f5f3] py-12 md:py-16" aria-labelledby="description-heading">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div><p className="eyebrow">Product story</p><h2 id="description-heading" className="section-title mt-2">Designed for daily use</h2><p className="mt-5 max-w-2xl text-base leading-7 text-[#59615a]">{product.fullDescription}</p></div>
          <div><h2 className="text-xl font-bold">Specifications</h2><dl className="mt-5 divide-y divide-[#d5dad6] border-y border-[#d5dad6]">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="grid grid-cols-[0.9fr_1.1fr] gap-4 py-4 text-sm"><dt className="font-bold">{key}</dt><dd className="text-[#59615a]">{value}</dd></div>)}</dl></div>
        </div>
      </section>
      <section className="section-space" aria-labelledby="related-heading">
        <div className="site-container"><p className="eyebrow">Keep exploring</p><h2 id="related-heading" className="section-title mb-8 mt-2">Related products</h2><ProductGrid products={related} /></div>
      </section>
    </main>
  );
}
