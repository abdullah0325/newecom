"use client";

import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Mountain,
  Lightbulb,
  Leaf,
} from "@esmate/shadcn/pkgs/lucide-react";

export default function FAQPage() {
  return (
    <>
      <head>
        <title>FAQs | OrganoCity Himalayan Pink Salt, Salt Lamps & Shilajit</title>
        <meta
          name="description"
          content="Find answers to common questions about OrganoCity Himalayan Pink Salt, Salt Lamps, and Shilajit. Learn about authenticity, benefits, usage, shipping, and care."
        />
        <meta
          name="keywords"
          content="OrganoCity, Himalayan Pink Salt, Salt Lamps, Shilajit, natural salt, mineral salt, Pakistan salt"
        />
        <meta property="og:title" content="OrganoCity FAQs" />
        <meta
          property="og:description"
          content="Everything you need to know about Himalayan Pink Salt, Salt Lamps, and Shilajit by OrganoCity."
        />
      </head>

      <div className="bg-background">
        {/* Hero */}
        <section className="px-6 py-24 sm:py-32 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Clear, honest answers about OrganoCity Himalayan Pink Salt, Salt Lamps,
            and Shilajit. If it comes from nature, we believe you deserve to know
            exactly what you’re getting.
          </p>
        </section>

        {/* Info Cards */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              icon={<Mountain />}
              title="Himalayan Pink Salt"
              text="Sourced from ancient salt mines in Pakistan, rich in natural trace minerals and completely unrefined."
            />
            <InfoCard
              icon={<Lightbulb />}
              title="Salt Lamps"
              text="Hand-carved from solid salt crystals, designed to add warmth, ambiance, and natural beauty to your space."
            />
            <InfoCard
              icon={<Leaf />}
              title="Shilajit"
              text="A natural resin formed over centuries in the Himalayas, traditionally used for vitality and balance."
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-4xl divide-y divide-border">
            <FAQItem
              question="What makes Himalayan Pink Salt different from regular table salt?"
              answer="Himalayan Pink Salt is hand-mined from ancient salt deposits and remains completely unrefined. Unlike table salt, it contains natural trace minerals and no added chemicals or anti-caking agents."
            />
            <FAQItem
              question="Is OrganoCity Himalayan Pink Salt authentic?"
              answer="Yes. Our salt is sourced directly from certified mines in Pakistan, the only true origin of Himalayan Pink Salt. We follow strict quality checks to ensure purity."
            />
            <FAQItem
              question="Can I cook daily with Himalayan Pink Salt?"
              answer="Absolutely. It’s ideal for everyday cooking, seasoning, grilling, and even baking. We offer fine and coarse grain options for different uses."
            />
            <FAQItem
              question="Does Himalayan Pink Salt expire?"
              answer="No. Salt is a natural preservative and does not expire when stored in a dry place."
            />
            <FAQItem
              question="Why does my salt lamp sweat?"
              answer="Salt lamps naturally absorb moisture from the air. In humid conditions, this can cause sweating. Simply wipe it with a dry cloth and keep the lamp switched on."
            />
            <FAQItem
              question="Are OrganoCity salt lamps hand-made?"
              answer="Yes. Each lamp is hand-carved from a solid Himalayan salt crystal, making every piece unique in shape and color."
            />

            {/* New FAQs */}
            <FAQItem
              question="What are the benefits of using a Himalayan Salt Lamp?"
              answer="Salt lamps are often used to create a calming atmosphere. Many customers enjoy their warm glow as part of a relaxing home or workspace."
            />
            <FAQItem
              question="Is Shilajit safe to use daily?"
              answer="OrganoCity Shilajit is purified and lab-tested. When used as recommended, it is generally safe. Always follow dosage instructions."
            />
            <FAQItem
              question="How should Shilajit be consumed?"
              answer="Shilajit is commonly dissolved in warm water, milk, or herbal tea. Avoid mixing with boiling liquids."
            />
            <FAQItem
              question="Does OrganoCity test its products?"
              answer="Yes. We prioritize purity and safety. Our products undergo quality checks to meet international standards."
            />
            <FAQItem
              question="Do you offer bulk or wholesale orders?"
              answer="Yes. OrganoCity supports bulk and wholesale orders for retailers and distributors. Please contact our sales team for details."
            />
            <FAQItem
              question="Do you ship internationally?"
              answer="Yes, we ship worldwide. Shipping costs and delivery times depend on your location."
            />
            <FAQItem
              question="How should Himalayan Pink Salt be stored?"
              answer="Store it in a dry, airtight container away from moisture to maintain quality."
            />
            <FAQItem
              question="Are your products eco-friendly?"
              answer="We focus on natural sourcing and responsible processing to minimize environmental impact."
            />
            <FAQItem
              question="Why choose OrganoCity?"
              answer="OrganoCity stands for authenticity, transparency, and nature-first products sourced directly from the Himalayas."
            />
            <FAQItem
              question="How can I contact OrganoCity support?"
              answer="You can reach us through our contact page or email. Our support team is always happy to help."
            />
          </div>
        </section>
      </div>
    </>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-card p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 m-2 rounded-2xl   last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between py-6 text-left"
      >
        <span className="text-base pl-4 font-semibold text-foreground">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 mr-4 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-8 pr-8 text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

