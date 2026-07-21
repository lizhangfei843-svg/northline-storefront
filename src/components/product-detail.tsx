"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/commerce";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 3500);
  }

  return (
    <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <div className="min-w-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#eef0ed]">
          <Image src={product.images[selectedImage].src} alt={product.images[selectedImage].alt} fill loading="eager" fetchPriority="high" sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {product.images.map((productImage, index) => (
            <button key={productImage.src} type="button" onClick={() => setSelectedImage(index)} aria-label={`View product image ${index + 1}`} aria-pressed={selectedImage === index} className={`relative aspect-[4/3] overflow-hidden rounded-[5px] border-2 bg-[#eef0ed] ${selectedImage === index ? "border-[#1f513c]" : "border-transparent hover:border-[#aeb7b0]"}`}>
              <Image src={productImage.src} alt="" fill loading="eager" sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 lg:pt-2">
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="eyebrow hover:text-[#173f2f]">{product.category}</Link>
        <h1 className="mt-3 text-4xl font-black leading-[1.08] md:text-[46px]">{product.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5 text-sm" aria-label={`${product.rating} out of 5, demo rating`}><Star size={16} className="fill-[#1f513c] text-[#1f513c]" aria-hidden="true" /><span className="font-bold">{product.rating}</span><span className="text-[#626963]">({product.reviewCount} demo reviews)</span></div>
          <span className={`text-sm font-bold ${product.inventoryStatus === "Low stock" ? "text-[#a83327]" : "text-[#1f513c]"}`}>{product.inventoryStatus}</span>
        </div>
        <div className="mt-6 flex items-baseline gap-3"><p className="text-2xl font-bold">{formatCurrency(product.price)}</p>{product.compareAtPrice ? <p className="text-base text-[#767d77] line-through">{formatCurrency(product.compareAtPrice)}</p> : null}</div>
        <p className="mt-6 text-base leading-7 text-[#59615a]">{product.shortDescription}</p>

        <fieldset className="mt-8 border-t border-[#d9ded9] pt-6">
          <legend className="float-left w-full text-sm font-bold">Color: <span className="font-normal text-[#59615a]" data-testid="selected-variant">{selectedVariant}</span></legend>
          <div className="clear-both flex flex-wrap gap-3 pt-3">
            {product.variants.map((variant) => (
              <button key={variant.name} type="button" onClick={() => setSelectedVariant(variant.name)} aria-label={`Select ${variant.name}`} aria-pressed={selectedVariant === variant.name} className={`flex min-h-11 items-center gap-2 rounded-[5px] border px-3 text-sm font-bold ${selectedVariant === variant.name ? "border-[#1f513c] bg-[#f0f5f2]" : "border-[#c8cec9] bg-white hover:border-[#7e8981]"}`}>
                <span className="h-5 w-5 rounded-full border border-black/20" style={{ backgroundColor: variant.hex }} aria-hidden="true" />{variant.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <div className="flex h-[48px] items-center justify-between rounded-[5px] border border-[#bfc6c0] bg-white" aria-label="Quantity selector">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Decrease quantity" className="flex h-full w-11 items-center justify-center disabled:text-[#aab0ab]"><Minus size={17} /></button>
            <span className="min-w-10 text-center text-sm font-bold" data-testid="product-quantity">{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} disabled={quantity === 10} aria-label="Increase quantity" className="flex h-full w-11 items-center justify-center disabled:text-[#aab0ab]"><Plus size={17} /></button>
          </div>
          <button type="button" onClick={handleAdd} className="button-primary flex-1" data-testid="add-to-cart">Add to cart · {formatCurrency(product.price * quantity)}</button>
        </div>
        <div className="min-h-10 pt-3" aria-live="polite">
          {added ? <p role="status" className="flex items-center gap-2 text-sm font-bold text-[#1f513c]"><Check size={18} aria-hidden="true" /> Added {quantity} to your cart. <Link href="/cart" className="underline underline-offset-4">View cart</Link></p> : null}
        </div>

        <div className="mt-4 grid gap-4 border-t border-[#d9ded9] pt-6 sm:grid-cols-2">
          <div className="flex gap-3"><Truck size={21} className="shrink-0 text-[#1f513c]" aria-hidden="true" /><div><p className="text-sm font-bold">Demo delivery</p><p className="mt-1 text-xs leading-5 text-[#626963]">Free simulated standard shipping over $250.</p></div></div>
          <div className="flex gap-3"><ShieldCheck size={21} className="shrink-0 text-[#1f513c]" aria-hidden="true" /><div><p className="text-sm font-bold">No real transaction</p><p className="mt-1 text-xs leading-5 text-[#626963]">Checkout is a front-end portfolio flow only.</p></div></div>
        </div>
      </div>
    </div>
  );
}
