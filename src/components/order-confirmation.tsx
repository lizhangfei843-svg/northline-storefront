"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/commerce";

type DemoOrder = { reference: string; firstName: string; itemCount: number; total: number; shippingMethod: "standard" | "express" };

export function OrderConfirmation() {
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);

  useEffect(() => {
    const stored = sessionStorage.getItem("northline-demo-order");
    if (!stored) { setOrder(null); return; }
    try { setOrder(JSON.parse(stored) as DemoOrder); } catch { setOrder(null); }
  }, []);

  if (order === undefined) return <main id="main-content" className="site-container min-h-[560px] py-16"><div className="h-[360px] animate-pulse rounded-[6px] bg-[#edf0ec]" /></main>;

  return (
    <main id="main-content" className="site-container flex min-h-[600px] items-center justify-center py-16">
      <section className="w-full max-w-2xl rounded-[6px] border border-[#d9ded9] bg-white p-7 text-center shadow-[0_20px_60px_rgba(31,49,39,0.08)] sm:p-12" aria-labelledby="confirmation-heading">
        <CheckCircle2 size={48} className="mx-auto text-[#1f513c]" aria-hidden="true" />
        <p className="eyebrow mt-5">Simulation complete</p>
        <h1 id="confirmation-heading" className="mt-2 text-4xl font-black">Demo order confirmed</h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#5d655f]">{order ? `Thanks, ${order.firstName}. You completed the portfolio checkout flow.` : "This is the confirmation page for the portfolio checkout flow."} No order was created, no information was sent, and no payment was processed.</p>
        {order ? (
          <dl className="mx-auto mt-8 grid max-w-lg gap-4 rounded-[6px] bg-[#f4f5f3] p-5 text-left text-sm sm:grid-cols-2">
            <div><dt className="text-xs text-[#626963]">Demo reference</dt><dd className="mt-1 font-bold">{order.reference}</dd></div>
            <div><dt className="text-xs text-[#626963]">Items</dt><dd className="mt-1 font-bold">{order.itemCount}</dd></div>
            <div><dt className="text-xs text-[#626963]">Simulated total</dt><dd className="mt-1 font-bold">{formatCurrency(order.total)}</dd></div>
            <div><dt className="text-xs text-[#626963]">Method</dt><dd className="mt-1 font-bold capitalize">{order.shippingMethod} demo delivery</dd></div>
          </dl>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/shop" className="button-primary">Continue exploring</Link><Link href="/" className="button-secondary">Return home</Link></div>
      </section>
    </main>
  );
}
