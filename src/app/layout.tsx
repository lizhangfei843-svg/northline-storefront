import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";
import "./responsive-fixes.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const socialImage = { url: "/og.png", width: 1200, height: 630, alt: "Northline Supply modern workspace essentials portfolio demonstration" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Northline Supply | Modern workspace essentials", template: "%s | Northline Supply" },
  description: "A portfolio demonstration of a modern workspace commerce storefront built with Next.js and TypeScript.",
  applicationName: "Northline Supply",
  keywords: ["workspace", "desk accessories", "office lighting", "audio", "portfolio demonstration"],
  authors: [{ name: "Northline Supply Demo" }],
  creator: "Northline Supply Demo",
  openGraph: { type: "website", url: siteUrl, siteName: "Northline Supply", title: "Northline Supply | Modern workspace essentials", description: "A polished DTC commerce portfolio demonstration for focused workspaces.", locale: "en_US", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Northline Supply | Modern workspace essentials", description: "A polished DTC commerce portfolio demonstration for focused workspaces.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-[5px] bg-white px-4 py-3 font-bold shadow-lg focus:translate-y-0">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
