"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="flex items-center gap-2 text-sm font-bold text-white">
        <CheckCircle2 size={20} aria-hidden="true" />
        Demo signup complete — no email was sent.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" required placeholder="Email address" className="field border-white/35 bg-white text-[#202522]" />
      <button type="submit" className="button-primary shrink-0 border-white bg-white text-[#1f513c] hover:border-[#e8ebe7] hover:bg-[#e8ebe7]">
        Join demo list <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
