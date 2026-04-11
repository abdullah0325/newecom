"use client";

import { useState } from "react";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Textarea } from "@esmate/shadcn/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
} from "@esmate/shadcn/pkgs/lucide-react";

const faqs = [
  {
    q: "What is your return policy?",
    a: "Returns are accepted within 7 days of delivery for unused and unopened products.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are delivered within 3 to 5 working days across Pakistan.",
  },
  {
    q: "Is your Himalayan pink salt authentic?",
    a: "Yes. Our salt is naturally sourced and processed under strict quality standards.",
  },
  {
    q: "Do you use eco-friendly packaging?",
    a: "We aim to use sustainable and minimal packaging whenever possible.",
  },
  {
    q: "What is a healthy serving size?",
    a: "A small pinch per meal is sufficient. Moderation is recommended.",
  },
];

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          subject,
          message,
          type: "contact",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[#F6F1E7] px-6 py-24 sm:py-32 lg:px-8">
      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#1E1F1C]">
          Contact OrganoCity
        </h1>
        <p className="mt-4 text-lg text-[#5A5E55]">
          Questions about Himalayan pink salt, bulk orders, or delivery?
          We’re here to help.
        </p>
      </header>

      {/* Main */}
      <section className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-2">
        {/* Info */}
        <aside className="rounded-2xl border border-[#C6A24A]/30 bg-white/70 p-10">
          <h2 className="text-lg font-semibold text-[#1E1F1C]">Get in Touch</h2>

          <div className="mt-8 space-y-5 text-sm text-[#5A5E55]">
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-[#1F6B4F]" />
              <span>{process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-[#1F6B4F]" />
              <span>{process.env.NEXT_PUBLIC_COMPANY_PHONE}</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-[#1F6B4F]" />
              <span>{process.env.NEXT_PUBLIC_COMPANY_EMAIL}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1F6B4F] px-5 py-3 text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#17513D]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </aside>

        {/* Form */}
        <section className="rounded-2xl border border-[#C6A24A]/30 bg-white p-10">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#1E1F1C]">
                Message Sent Successfully
              </h2>
              <p className="mt-2 text-[#5A5E55]">
                We’ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />

              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
              />

              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
              />

              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Your message"
                required
              />

              <Button
                className="w-full bg-[#1F6B4F] hover:bg-[#17513D] text-[#F6F1E7]"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </section>
      </section>

      {/* FAQs */}
      <section className="mx-auto mt-24 max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-[#1E1F1C]">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[#C6A24A]/30 bg-white p-6 transition hover:bg-[#F6F1E7]/60"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#1E1F1C]">
                {faq.q}
                <ChevronDown className="h-5 w-5 transition group-open:rotate-180 text-[#1F6B4F]" />
              </summary>

              <p className="mt-4 text-sm leading-relaxed text-[#5A5E55]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

