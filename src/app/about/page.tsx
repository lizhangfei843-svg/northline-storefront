import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About the demo brand", description: "Learn about the fictional Northline Supply brand and the purpose of this commerce portfolio demonstration." };

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="border-b border-[#d9ded9] bg-[#f4f5f3] py-12 md:py-16">
        <div className="site-container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="max-w-xl"><p className="eyebrow">About the concept</p><h1 className="mt-3 text-4xl font-black leading-[1.08] md:text-5xl">Built around better workdays.</h1><p className="mt-5 text-base leading-7 text-[#59615a]">Northline Supply is a fictional direct-to-consumer brand created to demonstrate a complete, polished commerce front end. Its point of view is simple: workspace products should feel calm, useful, and easy to understand.</p></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#e8ebe7]"><Image src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1500&q=85" alt="A collaborative, light-filled modern workspace" fill loading="eager" fetchPriority="high" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">Portfolio transparency</p><h2 className="section-title mt-2">A demonstration, clearly labeled.</h2></div>
          <div className="space-y-5 text-base leading-7 text-[#59615a]"><p>This is not a client project or active retailer. Product names, descriptions, specifications, pricing, ratings, review counts, promotions, and inventory states are original fictional content used to demonstrate front-end capability.</p><p>No accounts, database, order service, payment processor, or fulfillment service is connected. Cart state stays in local browser storage. Checkout and contact forms produce local success states without transmitting their contents.</p><p>Photographs are presented as representative editorial imagery and are credited in the project README; they do not imply a real Northline product line or endorsement.</p></div>
        </div>
      </section>
      <section className="border-y border-[#d9ded9] bg-[#202522] py-14 text-white">
        <div className="site-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase text-[#a9c6b6]">Explore the build</p><h2 className="mt-2 text-3xl font-bold">Try the complete storefront flow.</h2></div><Link href="/shop" className="button-primary border-white bg-white text-[#1f513c] hover:bg-[#e8ebe7]">Shop the demo <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </section>
    </main>
  );
}
