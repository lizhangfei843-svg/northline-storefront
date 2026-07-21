import { beforeEach, describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { getCartItemCount, getCartSubtotal, useCartStore } from "@/store/cart-store";

describe("cart store", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it("adds, updates, and removes a product variant", () => {
    const product = products[0];
    useCartStore.getState().addItem(product, "Charcoal", 2);
    let items = useCartStore.getState().items;
    expect(getCartItemCount(items)).toBe(2);
    expect(getCartSubtotal(items)).toBe(product.price * 2);

    useCartStore.getState().setQuantity(product.id, "Charcoal", 3);
    items = useCartStore.getState().items;
    expect(items[0].quantity).toBe(3);

    useCartStore.getState().removeItem(product.id, "Charcoal");
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("writes cart state to localStorage and restores it", async () => {
    const product = products[2];
    useCartStore.getState().addItem(product, "Ink", 1);
    const stored = localStorage.getItem("northline-cart");
    expect(stored).toContain(product.id);

    useCartStore.setState({ items: [] });
    if (stored) localStorage.setItem("northline-cart", stored);
    await useCartStore.persist.rehydrate();
    expect(useCartStore.getState().items[0]).toMatchObject({ productId: product.id, variant: "Ink", quantity: 1 });
  });
});
