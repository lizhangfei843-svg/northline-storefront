import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="site-container flex min-h-[560px] flex-col items-center justify-center py-16 text-center"><Compass size={42} className="text-[#1f513c]" aria-hidden="true" /><p className="eyebrow mt-5">404</p><h1 className="mt-2 text-4xl font-black">This route is off the map.</h1><p className="mt-4 max-w-md text-base leading-7 text-[#626963]">The page may have moved, or it may never have existed in this portfolio demonstration.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/shop" className="button-primary">Browse products</Link><Link href="/" className="button-secondary">Return home</Link></div></main>
  );
}
