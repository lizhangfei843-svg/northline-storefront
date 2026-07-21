"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { getCartItemCount, useCartStore } from "@/store/cart-store";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const count = mounted ? getCartItemCount(items) : 0;

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="bg-[#1f513c] px-4 py-2 text-center text-[12px] font-bold text-white">Portfolio demonstration — no real transactions</div>
      <header className="sticky top-0 z-40 border-b border-[#d9ded9] bg-white/95 backdrop-blur-sm">
        <div className="site-container flex h-[68px] items-center justify-between gap-3 sm:gap-5">
          <Link href="/" className="shrink-0 text-[20px] font-black text-[#202522]" aria-label="Northline Supply home">NORTHLINE SUPPLY</Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-bold text-[#384039] hover:text-[#1f513c]">{link.label}</Link>)}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href="/shop" aria-label="Search products" className="hidden h-11 w-11 items-center justify-center rounded-[5px] hover:bg-[#f4f5f3] sm:inline-flex"><Search size={19} aria-hidden="true" /></Link>
            <Link href="/cart" aria-label={`Cart with ${count} items`} className="relative inline-flex h-11 w-11 items-center justify-center rounded-[5px] hover:bg-[#f4f5f3]">
              <ShoppingBag size={21} aria-hidden="true" />
              {count > 0 ? <span data-testid="cart-count" className="absolute right-0 top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#1f513c] px-1 text-[11px] font-bold text-white">{count}</span> : null}
            </Link>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] hover:bg-[#f4f5f3] md:hidden" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-[#d9ded9] bg-white px-4 py-4 md:hidden">
            <div className="site-container flex flex-col gap-1">
              {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-[5px] px-3 py-3 text-base font-bold hover:bg-[#f4f5f3]">{link.label}</Link>)}
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
