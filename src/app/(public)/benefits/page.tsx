import { Metadata } from "next";
import {
  Heart,
  Wind,
  Zap,
  ShieldCheck,
  Droplets,
  Leaf,
} from "@esmate/shadcn/pkgs/lucide-react";

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: "Benefits of Himalayan Pink Salt | Natural Wellness & Health",
  description:
    "Discover the health, wellness, and lifestyle benefits of Himalayan Pink Salt. Rich in minerals, naturally pure, and trusted for daily use.",
  keywords: [
    "Himalayan pink salt benefits",
    "natural salt minerals",
    "pink salt health benefits",
    "pure Himalayan salt",
  ],
  openGraph: {
    title: "Benefits of Himalayan Pink Salt",
    description:
      "Explore why Himalayan Pink Salt is valued for wellness, purity, and everyday health.",
    type: "website",
  },
};

/* ---------------- PAGE ---------------- */

export default function BenefitsPage() {
  return (
    <div className="bg-[#F6F1E7]">
      {/* ================= HERO ================= */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#1F6B4F]">
              Natural Wonders
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#1E1F1C] sm:text-4xl">
              Benefits of Himalayan Pink Salt
            </p>
            <p className="mt-6 text-lg leading-8 text-[#5A5E55]">
              More than just salt. Himalayan Pink Salt has been trusted for
              centuries for its purity, mineral richness, and holistic wellness
              benefits.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CORE BENEFITS ================= */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
            {[
              {
                title: "Rich in Essential Minerals",
                desc:
                  "Contains over 84 trace minerals including calcium, potassium, magnesium, and iron that support bone strength, nerve function, and immunity.",
                icon: Heart,
              },
              {
                title: "Natural Air Purification",
                desc:
                  "Salt lamps made from Himalayan Pink Salt emit negative ions that may help reduce allergens, dust particles, and electronic pollution.",
                icon: Wind,
              },
              {
                title: "Supports Electrolyte Balance",
                desc:
                  "Helps regulate hydration and muscle function, making it ideal for active lifestyles and daily mineral intake.",
                icon: Zap,
              },
              {
                title: "Pure and Unrefined",
                desc:
                  "Hand-mined from ancient salt deposits and untouched by modern pollutants. No additives, bleaching, or processing.",
                icon: ShieldCheck,
              },
            ].map((item) => (
              <div key={item.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[#1E1F1C]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F6B4F]">
                    <item.icon className="h-6 w-6 text-[#F6F1E7]" />
                  </div>
                  {item.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#5A5E55]">
                  {item.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= DEEP DIVE CONTENT ================= */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#1E1F1C]">
            Why Himalayan Pink Salt Is Different
          </h3>
          <p className="mt-6 text-lg text-[#5A5E55]">
            Unlike regular table salt, Himalayan Pink Salt is extracted from
            ancient sea beds formed over 250 million years ago. These deposits
            were naturally protected from pollution, preserving their mineral
            integrity.
          </p>
          <p className="mt-4 text-[#5A5E55]">
            Modern table salt undergoes heavy refining that strips away natural
            minerals and adds anti-caking agents. Himalayan Pink Salt remains
            close to its natural form, making it a preferred choice for people
            seeking cleaner, more balanced nutrition.
          </p>
        </div>
      </section>

      {/* ================= USE CASE CARDS ================= */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#1E1F1C] text-center">
            Everyday Uses & Wellness Applications
          </h3>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#C6A24A]/40 p-6 bg-white">
              <Droplets className="h-8 w-8 text-[#1F6B4F]" />
              <h4 className="mt-4 font-semibold text-[#1E1F1C]">
                Cooking & Nutrition
              </h4>
              <p className="mt-2 text-sm text-[#5A5E55]">
                Enhances flavor naturally while contributing trace minerals to
                your daily diet.
              </p>
            </div>

            <div className="rounded-xl border border-[#C6A24A]/40 p-6 bg-white">
              <Leaf className="h-8 w-8 text-[#1F6B4F]" />
              <h4 className="mt-4 font-semibold text-[#1E1F1C]">
                Detox & Bath Therapy
              </h4>
              <p className="mt-2 text-sm text-[#5A5E55]">
                Used in salt baths to relax muscles, soothe skin, and promote
                detoxification.
              </p>
            </div>

            <div className="rounded-xl border border-[#C6A24A]/40 p-6 bg-white">
              <Wind className="h-8 w-8 text-[#1F6B4F]" />
              <h4 className="mt-4 font-semibold text-[#1E1F1C]">
                Home & Workspace
              </h4>
              <p className="mt-2 text-sm text-[#5A5E55]">
                Salt lamps add warm ambiance while supporting cleaner indoor
                air.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#1E1F1C]">
            A Tradition of Purity and Trust
          </h3>
          <p className="mt-6 text-lg text-[#5A5E55]">
            Himalayan Pink Salt has been valued for generations not just as a
            seasoning, but as a natural wellness resource. Its purity, mineral
            balance, and versatility make it a timeless choice for conscious
            living.
          </p>
        </div>
      </section>
    </div>
  );
}

