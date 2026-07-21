"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, ShoppingBag } from "lucide-react";
import { calculateTotals, formatCurrency } from "@/lib/commerce";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

type CheckoutFields = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutFields, string>>;

const initialFields: CheckoutFields = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United States",
};

function validate(fields: CheckoutFields): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
  if (!fields.address.trim()) errors.address = "Address is required.";
  if (!fields.city.trim()) errors.city = "City is required.";
  if (!fields.region.trim()) errors.region = "State or region is required.";
  if (!fields.postalCode.trim()) errors.postalCode = "Postal code is required.";
  if (!fields.country.trim()) errors.country = "Country is required.";
  return errors;
}

function Field({ id, label, value, error, onChange, type = "text", autoComplete }: { id: keyof CheckoutFields; label: string; value: string; error?: string; onChange: (value: string) => void; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`field ${error ? "field-error" : ""}`} />
      {error ? <p id={`${id}-error`} className="error-text">{error}</p> : null}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = getCartSubtotal(items);
  const totals = useMemo(() => calculateTotals(subtotal, shippingMethod, appliedPromo), [subtotal, shippingMethod, appliedPromo]);

  useEffect(() => setMounted(true), []);

  function setField(key: keyof CheckoutFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function applyPromo() {
    if (promoInput.trim().toUpperCase() === "DESK10") {
      setAppliedPromo("DESK10");
      setPromoMessage("Demo code applied: 10% off.");
    } else {
      setAppliedPromo("");
      setPromoMessage("Try DESK10 for the demo discount.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    const demoOrder = {
      reference: `NL-DEMO-${Date.now().toString().slice(-6)}`,
      firstName: fields.firstName,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      total: totals.total,
      shippingMethod,
    };
    sessionStorage.setItem("northline-demo-order", JSON.stringify(demoOrder));
    clearCart();
    router.push("/order-confirmation");
  }

  if (!mounted) return <div className="site-container min-h-[600px] py-12"><div className="h-[460px] animate-pulse rounded-[6px] bg-[#edf0ec]" /></div>;

  if (items.length === 0) {
    return (
      <main id="main-content" className="site-container flex min-h-[560px] flex-col items-center justify-center py-16 text-center">
        <ShoppingBag size={38} className="text-[#1f513c]" aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-black">Your cart needs an item</h1>
        <p className="mt-3 max-w-md text-[#626963]">Add a fictional product before trying the mock checkout flow.</p>
        <Link href="/shop" className="button-primary mt-7">Browse products</Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="site-container py-9 md:py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-[#1f513c]"><ArrowLeft size={17} aria-hidden="true" /> Back to cart</Link>
      <div className="mt-7 grid gap-9 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-8"><p className="eyebrow">Secure-looking, entirely simulated</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Mock checkout</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#626963]">Use sample information only. This form runs locally and does not send or store your entries on a server.</p></div>

          <section aria-labelledby="contact-heading" className="border-t border-[#d9ded9] pt-6">
            <h2 id="contact-heading" className="text-xl font-bold">Contact information</h2>
            <div className="mt-5"><Field id="email" label="Email address" type="email" value={fields.email} error={errors.email} onChange={(value) => setField("email", value)} autoComplete="email" /></div>
          </section>

          <section aria-labelledby="shipping-heading" className="mt-9 border-t border-[#d9ded9] pt-6">
            <h2 id="shipping-heading" className="text-xl font-bold">Shipping address</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field id="firstName" label="First name" value={fields.firstName} error={errors.firstName} onChange={(value) => setField("firstName", value)} autoComplete="given-name" />
              <Field id="lastName" label="Last name" value={fields.lastName} error={errors.lastName} onChange={(value) => setField("lastName", value)} autoComplete="family-name" />
              <div className="sm:col-span-2"><Field id="address" label="Street address" value={fields.address} error={errors.address} onChange={(value) => setField("address", value)} autoComplete="street-address" /></div>
              <Field id="city" label="City" value={fields.city} error={errors.city} onChange={(value) => setField("city", value)} autoComplete="address-level2" />
              <Field id="region" label="State / region" value={fields.region} error={errors.region} onChange={(value) => setField("region", value)} autoComplete="address-level1" />
              <Field id="postalCode" label="Postal code" value={fields.postalCode} error={errors.postalCode} onChange={(value) => setField("postalCode", value)} autoComplete="postal-code" />
              <Field id="country" label="Country" value={fields.country} error={errors.country} onChange={(value) => setField("country", value)} autoComplete="country-name" />
            </div>
          </section>

          <fieldset className="mt-9 border-t border-[#d9ded9] pt-6">
            <legend className="text-xl font-bold">Shipping method</legend>
            <div className="mt-5 grid gap-3">
              <label className={`flex cursor-pointer items-start justify-between gap-4 rounded-[6px] border p-4 ${shippingMethod === "standard" ? "border-[#1f513c] bg-[#f0f5f2]" : "border-[#cbd1cc]"}`}><span className="flex gap-3"><input type="radio" name="shipping" value="standard" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="mt-1 h-4 w-4 accent-[#1f513c]" /><span><span className="block text-sm font-bold">Standard demo delivery</span><span className="mt-1 block text-xs text-[#626963]">3–5 fictional business days</span></span></span><span className="text-sm font-bold">{calculateTotals(subtotal, "standard", appliedPromo).shipping === 0 ? "Free" : formatCurrency(calculateTotals(subtotal, "standard", appliedPromo).shipping)}</span></label>
              <label className={`flex cursor-pointer items-start justify-between gap-4 rounded-[6px] border p-4 ${shippingMethod === "express" ? "border-[#1f513c] bg-[#f0f5f2]" : "border-[#cbd1cc]"}`}><span className="flex gap-3"><input type="radio" name="shipping" value="express" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} className="mt-1 h-4 w-4 accent-[#1f513c]" /><span><span className="block text-sm font-bold">Express demo delivery</span><span className="mt-1 block text-xs text-[#626963]">1–2 fictional business days</span></span></span><span className="text-sm font-bold">{formatCurrency(28)}</span></label>
            </div>
          </fieldset>

          <section aria-labelledby="payment-heading" className="mt-9 rounded-[6px] border border-[#b8c8bd] bg-[#f0f5f2] p-5">
            <div className="flex gap-3"><LockKeyhole size={22} className="shrink-0 text-[#1f513c]" aria-hidden="true" /><div><h2 id="payment-heading" className="font-bold">Demo checkout — no payment will be processed.</h2><p className="mt-2 text-sm leading-6 text-[#59615a]">There are no credit card fields. Submitting creates a local confirmation screen only.</p></div></div>
          </section>

          <button type="submit" className="button-primary mt-7 w-full sm:w-auto" data-testid="complete-order">Complete demo order <Check size={18} aria-hidden="true" /></button>
        </form>

        <aside className="rounded-[6px] border border-[#d9ded9] bg-[#f7f8f6] p-5 sm:p-6 lg:sticky lg:top-[100px]" aria-labelledby="checkout-summary-heading">
          <h2 id="checkout-summary-heading" className="text-xl font-bold">Order summary</h2>
          <div className="mt-5 max-h-[290px] space-y-4 overflow-y-auto pr-1">
            {items.map((item) => <div key={`${item.productId}-${item.variant}`} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3"><div className="relative aspect-square overflow-hidden rounded-[4px] bg-white"><Image src={item.image} alt={item.imageAlt} fill loading="eager" sizes="64px" className="object-cover" /><span className="absolute right-1 top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#202522] px-1 text-[10px] font-bold text-white">{item.quantity}</span></div><div className="min-w-0"><p className="text-sm font-bold leading-5">{item.name}</p><p className="mt-1 text-xs text-[#626963]">{item.variant}</p></div><p className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p></div>)}
          </div>
          <div className="mt-6 border-t border-[#d1d6d2] pt-5">
            <label htmlFor="promo" className="field-label">Promo code demo</label>
            <div className="flex gap-2"><input id="promo" value={promoInput} onChange={(event) => setPromoInput(event.target.value)} placeholder="Try DESK10" className="field min-w-0" /><button type="button" onClick={applyPromo} className="button-secondary shrink-0">Apply</button></div>
            {promoMessage ? <p role="status" className={`mt-2 text-xs ${appliedPromo ? "font-bold text-[#1f513c]" : "text-[#626963]"}`}>{promoMessage}</p> : null}
          </div>
          <dl className="mt-6 space-y-3 border-t border-[#d1d6d2] pt-5 text-sm">
            <div className="flex justify-between gap-3"><dt>Subtotal</dt><dd className="font-bold">{formatCurrency(totals.subtotal)}</dd></div>
            {totals.discount > 0 ? <div className="flex justify-between gap-3 text-[#1f513c]"><dt>Demo discount</dt><dd className="font-bold">−{formatCurrency(totals.discount)}</dd></div> : null}
            <div className="flex justify-between gap-3"><dt>Shipping</dt><dd className="font-bold">{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</dd></div>
            <div className="flex justify-between gap-3"><dt>Estimated tax</dt><dd className="font-bold">{formatCurrency(totals.tax)}</dd></div>
            <div className="flex justify-between gap-3 border-t border-[#d1d6d2] pt-4 text-lg"><dt className="font-bold">Total</dt><dd className="font-black">{formatCurrency(totals.total)}</dd></div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
