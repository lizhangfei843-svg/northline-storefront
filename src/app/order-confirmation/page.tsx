import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/order-confirmation";

export const metadata: Metadata = { title: "Demo order confirmation", robots: { index: false, follow: false } };

export default function OrderConfirmationPage() { return <OrderConfirmation />; }
