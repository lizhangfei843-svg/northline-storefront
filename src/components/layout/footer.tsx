import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#d9ded9] bg-[#202522] text-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black">NORTHLINE SUPPLY</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#cbd0cc]">
            Considered workspace tools for focused, comfortable work. This storefront is a portfolio demonstration, not a real retail business.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#cbd0cc]">
            <li><Link className="hover:text-white" href="/shop">Shop all</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact demo</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Project note</h2>
          <p className="mt-4 text-sm leading-6 text-[#cbd0cc]">
            Product names, ratings, inventory, prices, and checkout are fictional demo content. No payment or message data is sent.
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="site-container flex flex-col gap-2 py-5 text-xs text-[#aeb6b0] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Northline Supply. Portfolio demonstration.</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS, and Zustand.</p>
        </div>
      </div>
    </footer>
  );
}
