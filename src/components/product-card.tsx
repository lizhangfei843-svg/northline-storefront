import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { formatCurrency } from "@/lib/commerce";
import type { Product } from "@/types/product";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article data-testid="product-card" className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[6px] border border-[#d9ded9] bg-white">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#f0f2ef]">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
        />
        {product.compareAtPrice ? <span className="absolute left-3 top-3 rounded-[4px] bg-[#b33a2b] px-2 py-1 text-[11px] font-bold text-white">Demo offer</span> : null}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[12px] font-bold uppercase text-[#1f513c]">{product.category}</p>
        <h3 className="product-title-clamp mt-2 text-[17px] font-bold leading-6"><Link href={`/shop/${product.slug}`} className="hover:text-[#1f513c]">{product.name}</Link></h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#626963]" aria-label={`${product.rating} out of 5, demo rating`}>
          <Star size={14} className="fill-[#1f513c] text-[#1f513c]" aria-hidden="true" /><span className="font-bold text-[#343a35]">{product.rating}</span><span>· {product.reviewCount} demo reviews</span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="min-w-0"><span className="font-bold">{formatCurrency(product.price)}</span>{product.compareAtPrice ? <span className="ml-2 text-sm text-[#767d77] line-through">{formatCurrency(product.compareAtPrice)}</span> : null}</div>
          <ArrowRight size={18} className="shrink-0 text-[#1f513c]" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
