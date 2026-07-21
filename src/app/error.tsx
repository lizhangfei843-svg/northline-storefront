"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="main-content" className="site-container flex min-h-[560px] flex-col items-center justify-center py-16 text-center"><p className="eyebrow">Something went wrong</p><h1 className="mt-3 text-4xl font-black">We could not load this page.</h1><p className="mt-4 max-w-md text-[#626963]">The demo hit an unexpected error. You can retry without losing the cart stored in this browser.</p><button type="button" onClick={reset} className="button-primary mt-7">Try again</button></main>;
}
