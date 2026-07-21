import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Leaf, ShieldCheck, Wrench } from "lucide-react";
import { bestSellers, featuredProducts } from "@/data/products";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductGrid } from "@/components/product-grid";

const categories = [
  { name: "Desk Essentials", description: "The everyday foundation.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=85" },
  { name: "Lighting", description: "Focused and ambient light.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85" },
  { name: "Audio", description: "Clear listening and capture.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85" },
  { name: "Seating", description: "Support that keeps up.", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1000&q=85" },
  { name: "Organization", description: "A place for every detail.", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1000&q=85" },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="border-b border-[#d9ded9] bg-[#f4f5f3]">
        <div className="site-container grid min-h-[580px] items-center gap-8 py-8 md:min-h-[620px] md:grid-cols-[0.92fr_1.08fr] md:py-10">
          <div className="max-w-xl py-4 md:pr-6">
            <p className="eyebrow">Workspace tools, considered</p>
            <h1 className="mt-4 text-[44px] font-black leading-[1.04] text-[#202522] md:text-[58px]">Northline Supply</h1>
            <p className="mt-5 max-w-lg text-[17px] leading-7 text-[#565e57] md:text-lg">Quietly capable desk essentials, lighting, audio, and seating designed to make focused work feel more natural.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="button-primary">Shop collection <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="#workspace" className="button-secondary">Explore workspace</Link>
            </div>
            <p className="mt-5 text-xs text-[#6d756f]">Portfolio demonstration · fictional catalog · mock checkout</p>
          </div>
          <div className="relative min-h-[270px] overflow-hidden rounded-[6px] bg-[#e8ebe7] md:min-h-[520px]">
            <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88" alt="A bright modern workspace with desks, chairs, and pendant lighting" fill preload sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="featured-heading">
        <div className="site-container">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow">Start here</p><h2 id="featured-heading" className="section-title mt-2">Featured products</h2></div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#1f513c] hover:text-[#173f2f]">View all products <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <ProductGrid products={featuredProducts} priorityCount={4} />
        </div>
      </section>

      <section id="workspace" className="section-space border-y border-[#d9ded9] bg-[#f4f5f3]" aria-labelledby="category-heading">
        <div className="site-container">
          <p className="eyebrow">Build your setup</p>
          <h2 id="category-heading" className="section-title mt-2">Shop by category</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.name} href={`/shop?category=${encodeURIComponent(category.name)}`} className="group overflow-hidden rounded-[6px] border border-[#d9ded9] bg-white hover:border-[#9ea9a1]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8ebe7]"><Image src={category.image} alt={`${category.name} workspace products`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.025]" /></div>
                <div className="p-4"><h3 className="font-bold">{category.name}</h3><p className="mt-1 text-sm text-[#626963]">{category.description}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="values-heading">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-lg">
            <p className="eyebrow">Why Northline</p>
            <h2 id="values-heading" className="section-title mt-2">Less friction. Better work.</h2>
            <p className="mt-5 text-base leading-7 text-[#5e665f]">We shaped this demo brand around a simple idea: useful products should be clear about what they do, feel good to live with, and earn their place on your desk.</p>
          </div>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {[
              { icon: Wrench, title: "Purposeful design", copy: "Useful features, restrained forms, and no ornamental clutter." },
              { icon: ShieldCheck, title: "Clear specifications", copy: "Straightforward details help you compare products with confidence." },
              { icon: Leaf, title: "Material awareness", copy: "Recycled and replaceable materials are called out where used in this fictional line." },
              { icon: Box, title: "Simple ownership", copy: "Easy setup, practical care guidance, and repair-minded components." },
            ].map((value) => (
              <div key={value.title} className="border-t border-[#d9ded9] pt-5">
                <value.icon size={23} className="text-[#1f513c]" aria-hidden="true" />
                <h3 className="mt-4 font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#626963]">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[#d9ded9] bg-[#f4f5f3]" aria-labelledby="bestsellers-heading">
        <div className="site-container">
          <div className="mb-8"><p className="eyebrow">Demo favorites</p><h2 id="bestsellers-heading" className="section-title mt-2">Best sellers</h2><p className="mt-2 text-sm text-[#6a716c]">Ranked using fictional review counts for this portfolio demonstration.</p></div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="bg-[#1f513c] py-14 text-white" aria-labelledby="newsletter-heading">
        <div className="site-container flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl"><p className="text-xs font-bold uppercase text-[#cfe1d7]">Newsletter demo</p><h2 id="newsletter-heading" className="mt-2 text-3xl font-bold">Notes for a calmer workspace.</h2><p className="mt-3 text-sm leading-6 text-[#dce8e1]">Try the interface. Your email stays in this browser and is not submitted anywhere.</p></div>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
