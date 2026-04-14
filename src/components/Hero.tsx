"use client"

import Image from "next/image"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    id: 1,
    eyebrow: "Mineral Wellness",
    title: "Pure Himalayan Pink Salt",
    subtitle: "Clean. Natural. Essential.",
    description:
      "Experience premium Himalayan pink salt sourced from the pristine mountains of Pakistan. Crafted for healthy cooking and elevated everyday living.",
    image: "/graphics/pinksaltgemni.png",
    alt: "Himalayan Pink Salt",
  },
  {
    id: 2,
    eyebrow: "Ancient Vitality",
    title: "Authentic Himalayan Shilajit",
    subtitle: "Pure energy from the mountains",
    description:
      "Discover premium Himalayan Shilajit resin, carefully selected for strength, vitality, and natural wellness.",
    image: "/graphics/shiljatgemni.png",
    alt: "Pure Shilajit",
  },
  {
    id: 3,
    eyebrow: "Natural Healing",
    title: "Herbal Medicine Collection",
    subtitle: "Wellness inspired by nature",
    description:
      "Explore herbal medicine crafted with natural ingredients to support a balanced lifestyle and daily wellbeing.",
    image: "/graphics/herbalgemni.png",
    alt: "Herbal Medicine",
  },
 {
  id: 4,
  eyebrow: "Pure Himalayan Collection",
  title: "Salt Wellness & Lifestyle",
  subtitle: "Nature’s purity for your home",
  description:
    "Discover premium Himalayan pink salt, black salt, and handcrafted salt lamps. Designed to enhance your home, health, and everyday lifestyle naturally.",
  image: "/graphics/collection gemni.png",
  alt: "Himalayan Salt Collection",
}
]

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        speed={900}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="heroSwiper"
      >
        {slides.map((slide) => (
  <SwiperSlide key={slide.id}>
  <div className="relative flex min-h-[85vh] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] items-center justify-center">

    {/* Background Image */}
    <Image
      src={slide.image}
      alt={slide.alt}
      fill
      priority={slide.id === 1}
      className="object-cover object-center"
      sizes="100vw"
    />

   
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/50 sm:to-transparent" />

    {/* Content */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      <div className="max-w-full sm:max-w-lg md:max-w-xl text-white text-center sm:text-left">

        <span className="uppercase tracking-[0.15em] text-[11px] sm:text-xs text-[#E6D7C3] font-medium">
          {slide.eyebrow}
        </span>

        <h1 className="mt-3 sm:mt-3 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
          {slide.title}
        </h1>

        <p className="mt-2 sm:mt-3 text-base sm:text-base text-[#EADFD0] font-medium">
          {slide.subtitle}
        </p>

        <p className="mt-3 sm:mt-4 text-sm sm:text-sm md:text-base text-[#F5EFE6] leading-relaxed line-clamp-2 sm:line-clamp-3">
          {slide.description}
        </p>

        <div className="mt-6 sm:mt-6 flex flex-row sm:flex-row gap-2 sm:gap-3 justify-center">
          <Link
            href="/products"
            className="bg-[#1F6B4F] hover:bg-[#17513D] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] uppercase tracking-[0.15em] transition text-center"
          >
            Shop Now
          </Link>

          <Link
            href="/about-us"
            className="border border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] uppercase tracking-[0.15em] hover:bg-white hover:text-black transition text-center"
          >
            Learn More
          </Link>
        </div>

      </div>
    </div>
  </div>
</SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .heroSwiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.6;
        }

        .heroSwiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #1f6b4f;
        }

     

        @media (max-width: 768px) {
          .heroSwiper .swiper-button-prev,
          .heroSwiper .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero