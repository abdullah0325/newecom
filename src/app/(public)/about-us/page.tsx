import { Button } from "@esmate/shadcn/components/ui/button"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { Leaf, ShieldCheck, Mountain, HeartHandshake } from "@esmate/shadcn/pkgs/lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We are transparent, trustworthy, and committed to delivering pure Himalayan products with honesty and care.",
  },
  {
    icon: Mountain,
    title: "High Standards",
    description:
      "From sourcing to packaging, we maintain strict quality standards to ensure premium natural products.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description:
      "We believe in responsible sourcing practices that respect nature, communities, and long-term wellbeing.",
  },
  {
    icon: HeartHandshake,
    title: "Wellness First",
    description:
      "Our mission is to make natural wellness simple, accessible, and meaningful for every home.",
  },
]

const highlights = [
  "100% natural Himalayan salt products",
  "Ethically sourced with care",
  "Premium quality for home and wellness",
  "Crafted for purity, health, and lifestyle",
]

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | OrganoCity</title>
      </Head>

      <main className="bg-[#FAF7F0] text-[#1E1F1C]">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[680px]">
            <Image
              src="/graphics/pinksaltshine.png"
              alt="Pink salt crystals"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(250,247,240,1),rgba(250,247,240,0.05)_22%,rgba(250,247,240,0)_42%)]" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-16 sm:min-h-[580px] sm:px-6 sm:py-20 lg:min-h-[680px] lg:px-8">
              <div className="w-full max-w-full sm:max-w-2xl lg:max-w-3xl">
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm sm:text-xs">
                  About OrganoCity
                </span>

                <h1 className="mt-5 text-3xl font-semibold leading-[1.05] text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
                  Pure Himalayan wellness, thoughtfully brought to your home.
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:mt-6 sm:text-base sm:leading-8">
                  At OrganoCity, we believe natural living begins with purity, trust,
                  and quality. Our mission is to offer premium Himalayan salt and
                  wellness products that enrich daily life with simplicity and care.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <Button
                    asChild
                    className="h-11 rounded-full bg-[#1F6B4F] px-7 text-sm font-semibold text-[#F6F1E7] hover:bg-[#17513D] sm:h-12"
                  >
                    <Link href="/collections">Explore Products</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border border-white/70 bg-white/15 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white hover:text-[#1E1F1C] sm:h-12"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#C6A24A]/12 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-[#1F6B4F]/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <div className="relative h-[340px] sm:h-[420px]">
                  <Image
                    src="/graphics/about-one.png"
                    alt="Salt varieties in bowls"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex rounded-full bg-[#F6F1E7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6258] ring-1 ring-black/5">
                Welcome to OrganoCity
              </span>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Rooted in purity. Inspired by nature.
              </h2>

              <p className="mt-6 text-base leading-8 text-[#5A5E55]">
                At OrganoCity Himalayan Salts, we believe in the power of simple,
                natural ingredients to support a healthier and more balanced life.
                Founded with a passion for authenticity and wellness, our brand is
                dedicated to offering high-quality Himalayan products with minimal
                processing and maximum care.
              </p>

              <p className="mt-5 text-base leading-8 text-[#5A5E55]">
                From mineral-rich pink salt to lifestyle and wellness essentials, we
                focus on products that bring purity, function, and beauty into
                everyday living. Our goal is to make natural wellness accessible,
                affordable, and trustworthy for every household.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-4 text-sm font-medium text-[#1E1F1C] shadow-sm ring-1 ring-black/5"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision Section */}
        <section className="bg-[#F6F1E7] px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6258] ring-1 ring-black/5">
                Our Purpose
              </span>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Building a healthier tomorrow through natural living
              </h2>

              <p className="mt-4 text-base leading-8 text-[#5A5E55]">
                Every product we offer reflects our commitment to quality, trust, and
                the timeless benefits of Himalayan nature.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F6B4F]/10 text-[#1F6B4F]">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#1E1F1C]">
                  Our Mission
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5A5E55]">
                  To deliver premium Himalayan salt and wellness products that
                  support healthier lifestyles while staying true to purity,
                  simplicity, and sustainability.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C6A24A]/15 text-[#8A6B20]">
                  <Mountain className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#1E1F1C]">
                  Our Vision
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5A5E55]">
                  To become a trusted destination for natural Himalayan wellness by
                  combining tradition, quality, and modern living in every product.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-black/5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1F1C]/5 text-[#1E1F1C]">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#1E1F1C]">
                  Our Promise
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5A5E55]">
                  We promise honest sourcing, reliable quality, and products created
                  to bring lasting value to your home, health, and daily rituals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_420px_1fr]">
            <div className="space-y-6">
              {values.slice(0, 2).map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6F1E7] text-[#1F6B4F]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#1E1F1C]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center">
              <div className="relative flex h-[320px] w-[320px] items-center justify-center sm:h-[380px] sm:w-[380px]">
                <div className="absolute inset-0 rounded-full bg-[#C6A24A]/15 blur-3xl" />
                <div className="absolute inset-6 rounded-full bg-[#1F6B4F]/10 blur-2xl" />
                <div className="relative h-full w-full">
                  <Image
                    src="/graphics/about-two.png"
                    alt="Pink Salt Jar"
                    fill
                    className="object-contain"
                    sizes="380px"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {values.slice(2, 4).map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6F1E7] text-[#1F6B4F]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#1E1F1C]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-[#F6F1E7] px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <div className="relative h-[340px] sm:h-[440px]">
                  <Image
                    src="/graphics/salt-mine.webp"
                    alt="Salt mine"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6258] ring-1 ring-black/5">
                Why Choose Us
              </span>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                From the mountains to your home
              </h2>

              <p className="mt-6 text-base leading-8 text-[#5A5E55]">
                We bring the timeless value of Himalayan salt to modern living
                through carefully selected products made for cooking, wellness,
                gifting, and home ambience. Every item reflects our commitment to
                quality, authenticity, and the beauty of natural living.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <h3 className="text-lg font-semibold text-[#1E1F1C]">
                    Premium Quality
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                    Carefully sourced and selected for consistency, purity, and
                    trust.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <h3 className="text-lg font-semibold text-[#1E1F1C]">
                    Natural Wellness
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                    Thoughtfully created to support lifestyle, wellbeing, and
                    everyday rituals.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <h3 className="text-lg font-semibold text-[#1E1F1C]">
                    Trusted Sourcing
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                    We value ethical sourcing and transparent quality standards.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                  <h3 className="text-lg font-semibold text-[#1E1F1C]">
                    Everyday Elegance
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#5A5E55]">
                    Products that combine natural function with premium visual
                    appeal.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full bg-[#1F6B4F] px-7 text-[#F6F1E7] hover:bg-[#17513D]"
                >
                  <Link href="/collections">View Our Products</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[#1E1F1C]/15 bg-white px-7 text-[#1E1F1C] hover:bg-[#1E1F1C] hover:text-white"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

