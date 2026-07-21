"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  variant: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, variant: string, quantity: number) => void;
  setQuantity: (productId: string, variant: string, quantity: number) => void;
  removeItem: (productId: string, variant: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, variant, quantity) => set((state) => {
        const existing = state.items.find(
          (item) => item.productId === product.id && item.variant === variant,
        );
        if (existing) {
          return {
            items: state.items.map((item) =>
              item.productId === product.id && item.variant === variant
                ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
                : item,
            ),
          };
        }
        return {
          items: [...state.items, {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0].src,
            imageAlt: product.images[0].alt,
            variant,
            quantity,
          }],
        };
      }),
      setQuantity: (productId, variant, quantity) => set((state) => ({
        items: state.items
          .map((item) => item.productId === productId && item.variant === variant
            ? { ...item, quantity: Math.max(0, Math.min(99, quantity)) }
            : item)
          .filter((item) => item.quantity > 0),
      })),
      removeItem: (productId, variant) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.productId === productId && item.variant === variant),
        ),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "northline-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
