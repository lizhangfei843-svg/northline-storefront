"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

type ContactFields = { name: string; email: string; subject: string; message: string };
type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const initialFields: ContactFields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(key: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ContactErrors = {};
    if (!fields.name.trim()) nextErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) nextErrors.email = "Enter a valid email address.";
    if (!fields.subject.trim()) nextErrors.subject = "Subject is required.";
    if (fields.message.trim().length < 10) nextErrors.message = "Enter at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-[6px] border border-[#b8c8bd] bg-[#f0f5f2] p-7 text-center">
        <CheckCircle2 size={38} className="mx-auto text-[#1f513c]" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Demo message complete</h2>
        <p className="mt-3 text-sm leading-6 text-[#59615a]">Your message was not sent or stored. This success state demonstrates the form experience only.</p>
        <button type="button" onClick={() => { setFields(initialFields); setSubmitted(false); }} className="button-secondary mt-6">Reset demo form</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[6px] border border-[#d9ded9] bg-white p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="contact-name" className="field-label">Name</label><input id="contact-name" value={fields.name} onChange={(event) => update("name", event.target.value)} className={`field ${errors.name ? "field-error" : ""}`} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name ? <p id="contact-name-error" className="error-text">{errors.name}</p> : null}</div>
        <div><label htmlFor="contact-email" className="field-label">Email address</label><input id="contact-email" type="email" value={fields.email} onChange={(event) => update("email", event.target.value)} className={`field ${errors.email ? "field-error" : ""}`} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email ? <p id="contact-email-error" className="error-text">{errors.email}</p> : null}</div>
        <div className="sm:col-span-2"><label htmlFor="contact-subject" className="field-label">Subject</label><input id="contact-subject" value={fields.subject} onChange={(event) => update("subject", event.target.value)} className={`field ${errors.subject ? "field-error" : ""}`} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} />{errors.subject ? <p id="contact-subject-error" className="error-text">{errors.subject}</p> : null}</div>
        <div className="sm:col-span-2"><label htmlFor="contact-message" className="field-label">Message</label><textarea id="contact-message" value={fields.message} onChange={(event) => update("message", event.target.value)} rows={6} className={`field resize-y ${errors.message ? "field-error" : ""}`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errors.message ? <p id="contact-message-error" className="error-text">{errors.message}</p> : null}</div>
      </div>
      <button type="submit" className="button-primary mt-6">Complete demo submission <Send size={17} aria-hidden="true" /></button>
    </form>
  );
}
