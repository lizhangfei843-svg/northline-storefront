"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { calculateTotals, formatCurrency, SHIPPING_THRESHOLD } from "@/lib/commerce";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export function CartView() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="site-container min-h-[540px] py-12" role="status" aria-label="Loading cart"><div className="h-[360px] animate-pulse rounded-[6px] bg-[#edf0ec]" /></div>;
  }

  if (items.length === 0) {
    return (
      <main id="main-content" className="site-container flex min-h-[560px] flex-col items-center justify-center py-16 text-center">
        <ShoppingBag size={38} className="text-[#1f513c]" aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-black">Your cart is empty</h1>
        <p className="mt-3 max-w-md text-base leading-7 text-[#626963]">Explore the fictional Northline catalog and add something to test the persistent cart experience.</p>
        <Link href="/shop" className="button-primary mt-7">Return to shop <ArrowRight size={18} aria-hidden="true" /></Link>
      </main>
    );
  }

  const subtotal = getCartSubtotal(items);
  const totals = calculateTotals(subtotal);
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <main id="main-content" className="site-container py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Your selection</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Shopping cart</h1></div>
        <button type="button" onClick={clearCart} className="button-quiet text-[#9f2f23]">Clear cart</button>
      </div>
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <section aria-label="Cart items" className="min-w-0 divide-y divide-[#d9ded9] border-y border-[#d9ded9]">
          {items.map((item) => (
            <article key={`${item.productId}-${item.variant}`} className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:gap-5">
              <Link href={`/shop/${item.slug}`} className="relative row-span-2 aspect-square overflow-hidden rounded-[5px] bg-[#eef0ed] sm:row-span-1"><Image src={item.image} alt={item.imageAlt} fill loading="eager" sizes="140px" className="object-cover" /></Link>
              <div className="min-w-0">
                <h2 className="break-words text-base font-bold leading-6"><Link href={`/shop/${item.slug}`} className="hover:text-[#1f513c]">{item.name}</Link></h2>
                <p className="mt-1 text-sm text-[#626963]">{item.variant}</p>
                <p className="mt-2 text-sm font-bold">{formatCurrency(item.price)}</p>
              </div>
              <p className="hidden text-right font-bold sm:block">{formatCurrency(item.price * item.quantity)}</p>
              <div className="col-start-2 flex flex-wrap items-center justify-between gap-3 sm:col-span-2 sm:col-start-2">
                <div className="flex h-10 items-center rounded-[5px] border border-[#bfc6c0]">
                  <button type="button" onClick={() => setQuantity(item.productId, item.variant, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`} className="flex h-full w-10 items-center justify-center"><Minus size={15} /></button>
                  <span data-testid="cart-item-quantity" className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.productId, item.variant, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`} className="flex h-full w-10 items-center justify-center"><Plus size={15} /></button>
                </div>
                <button type="button" onClick={() => removeItem(item.productId, item.variant)} className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#9f2f23]" aria-label={`Remove ${item.name} from cart`}><Trash2 size={16} aria-hidden="true" /> Remove</button>
                <p className="w-full font-bold sm:hidden">Item total: {formatCurrency(item.price * item.quantity)}</p>
              </div>
            </article>
          ))}
        </section>

        <aside className="rounded-[6px] border border-[#d9ded9] bg-[#f7f8f6] p-5 sm:p-6" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-xl font-bold">Order summary</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd className="font-bold">{formatCurrency(totals.subtotal)}</dd></div>
            <div className="flex justify-between gap-4"><dt>Simulated shipping</dt><dd className="font-bold">{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</dd></div>
            <div className="flex justify-between gap-4"><dt>Estimated tax</dt><dd className="font-bold">{formatCurrency(totals.tax)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-[#cfd5d0] pt-5 text-lg"><dt className="font-bold">Order total</dt><dd className="font-black">{formatCurrency(totals.total)}</dd></div>
          </dl>
          {freeShippingRemaining > 0 ? <p className="mt-5 rounded-[5px] bg-white p-3 text-xs leading-5 text-[#59615a]">Add {formatCurrency(freeShippingRemaining)} more for free simulated standard shipping.</p> : <p className="mt-5 text-sm font-bold text-[#1f513c]">You qualify for free simulated standard shipping.</p>}
          <Link href="/checkout" className="button-primary mt-6 w-full">Continue to mock checkout <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/shop" className="button-secondary mt-3 w-full">Continue shopping</Link>
          <p className="mt-4 text-center text-xs leading-5 text-[#626963]">No payment will be collected. Totals are for interface demonstration only.</p>
        </aside>
      </div>
    </main>
  );
}
