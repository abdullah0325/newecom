"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Star,
} from "@esmate/shadcn/pkgs/lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"



type Collection = {
  href: string
  title: string
  subtitle: string
  image: string
  badge?: string
  highlight?: string
  rating?: number
  reviews?: number
}

const collections: Collection[] = [
  {
    href: "/products/himalayan-pink-salt",
    title: "Edible Salt",
    subtitle: "Fine & Coarse Grain",
    image: "/graphics/organocity-kitchen-salt.webp",
    badge: "Best Seller",
    highlight: "Food-grade • Premium",
    rating: 4.8,
    reviews: 124,
  },
  {
    href: "/products/himalayan-pink-salt-natural-lamps",
    title: "Salt Lamps",
    subtitle: "Natural & Crafted",
    image: "/graphics/organocity-spa.webp",
    badge: "Top Rated",
    highlight: "Warm glow • Handmade",
    rating: 4.9,
    reviews: 98,
  },
  {
    href: "/products/himalayan-pink-salt-ball-lamp",
    title: "Ball Lamp",
    subtitle: "Himalayan Pink Salt",
    image: "/graphics/ballShapedlapm.webp",
    badge: "New",
    highlight: "Modern shape",
    rating: 4.7,
    reviews: 65,
  },
  {
    href: "/products/himalayan-pink-salt-heart-lamp",
    title: "Heart Lamp",
    subtitle: "Himalayan Pink Salt",
    image: "/graphics/Heart Salt lamps.png",
    badge: "Gift",
    highlight: "Perfect for gifting",
    rating: 4.8,
    reviews: 72,
  },
  {
    href: "/products/himalayan-pink-salt-crystal-lamp",
    title: "Crystal Lamp",
    subtitle: "Himalayan Pink Salt",
    image: "/graphics/Hamalian Pink Salt Crystel Lamp.png",
    badge: "Classic",
    highlight: "Raw crystal look",
    rating: 4.9,
    reviews: 110,
  },
  {
    href: "/products/himalayan-bath-salt-soap",
    title: "Bath & Spa",
    subtitle: "Scrubs & Soaks",
    image: "/graphics/essence-two.png",
    badge: "Wellness",
    highlight: "Relax & unwind",
    rating: 4.7,
    reviews: 84,
  },
  {
    href: "/products/buy-5-packs-get-1-free-available-in-500g-1kg",
    title: "Bundle Deal",
    subtitle: "Get 5 Packs, Get 1 Free",
    image: "/graphics/pinksaltsale.webp",
    badge: "Sale",
    highlight: "Limited time offer",
    rating: 4.8,
    reviews: 140,
  },
  {
    href: "/products/pure-himalayan-shilajit",
    title: "Shilajit",
    subtitle: "Pure & Authentic",
    image: "/graphics/shilajit.jpg",
    badge: "Premium",
    highlight: "Lab-tested quality",
    rating: 4.9,
    reviews: 102,
  },
]

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1E1F1C] shadow-sm">
      {text}
    </span>
  )
}

export default function FeaturedCollections() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-black/5 bg-[#F6F1E7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6258]">
            Shop by category
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1E1F1C] sm:text-4xl lg:text-5xl">
            Featured Collections
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#5A5E55] sm:text-base">
            Discover premium salt, wellness, and lifestyle essentials curated
            for your home, gifting, and everyday wellbeing.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Arrows */}
          {/* Left Arrow */}
          <button
            type="button"
            className="featured-prev absolute left-2 sm:left-0 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#1E1F1C] shadow-md sm:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 hover:border-[#1F6B4F]/40 hover:text-[#1F6B4F]"
            aria-label="Previous collections"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            className="featured-next absolute right-2 sm:right-0 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-[#1E1F1C] shadow-md sm:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 hover:border-[#1F6B4F]/40 hover:text-[#1F6B4F]"
            aria-label="Next collections"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".featured-prev",
              nextEl: ".featured-next",
            }}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              480: { slidesPerView: 1.35 },
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="featuredCollectionsSwiper"
          >
            {collections.map((item) => (
              <SwiperSlide key={item.href} className="h-auto">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-[linear-gradient(180deg,#F8F3EC_0%,#F2ECE2_100%)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    <div className="absolute left-3 top-3">
                      {item.badge && <Badge text={item.badge} />}
                    </div>

                    <div className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#1E1F1C] shadow-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-[#1E1F1C]">
                          {item.title}
                        </h3>
                        <p className="mt-1 min-h-[44px] text-sm leading-6 text-[#5A5E55]">
                          {item.subtitle}
                        </p>
                      </div>

                      {item.highlight ? (
                        <div className="shrink-0 rounded-2xl bg-[#F6F1E7] px-3 py-2 text-[11px] font-semibold text-[#1E1F1C] ring-1 ring-black/5">
                          {item.highlight}
                        </div>
                      ) : null}
                    </div>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-0.5 text-[#C6A24A]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(item.rating || 0)
                                ? "fill-[#C6A24A]"
                                : "opacity-30"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#5A5E55]">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>

                    {/* Button */}
                    <div className="mt-auto pt-5">
                      <span className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F6B4F] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#17513D]">
                        Quick View
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="mb-4 text-sm text-[#5A5E55]">
            Showing featured products. Explore the full collection for more.
          </p>

          <Link
            href="/collections"
            className="group inline-flex items-center gap-3 rounded-full bg-[#1F6B4F] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#17513D] hover:shadow-lg"
          >
            View All Products
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}