import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact form demo", description: "Try the locally validated Northline Supply contact form demonstration. No message is transmitted." };

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-[#f4f5f3] py-12 md:py-16">
      <div className="site-container grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">
        <section className="max-w-lg"><p className="eyebrow">Contact demo</p><h1 className="mt-3 text-4xl font-black leading-[1.08] md:text-5xl">How can we help?</h1><p className="mt-5 text-base leading-7 text-[#59615a]">Use sample information to test validation and the success state. This form does not send, save, or share your message.</p><div className="mt-8 space-y-5 border-t border-[#d3d8d4] pt-6"><div className="flex gap-3"><Mail size={21} className="mt-0.5 text-[#1f513c]" aria-hidden="true" /><div><p className="font-bold">Demo email</p><p className="mt-1 text-sm text-[#626963]">hello@example.invalid</p></div></div><div className="flex gap-3"><MapPin size={21} className="mt-0.5 text-[#1f513c]" aria-hidden="true" /><div><p className="font-bold">Fictional studio</p><p className="mt-1 text-sm text-[#626963]">Portland, Oregon</p></div></div></div><p className="mt-8 rounded-[5px] border border-[#c3cdc6] bg-white p-4 text-sm font-bold text-[#1f513c]">Portfolio demonstration — no customer support operation is represented.</p></section>
        <ContactForm />
      </div>
    </main>
  );
}
