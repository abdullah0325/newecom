"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import "swiper/css";

const Testimonials = () => {
  const swiperRef = useRef<any>(null);

  const testimonials = Array.from({ length: 50 }, (_, i) => {
    const data = [
      {
        name: "Ahmed Raza",
        role: "Business Owner – Lahore",
        text:
          "The Shilajit quality is excellent. You can feel it’s real and pure. One of the best products I’ve used.",
      },
      {
        name: "Ayesha Siddiqua",
        role: "Homemaker – Karachi",
        text:
          "Himalayan pink salt tastes clean and natural. I use it daily for cooking and my family loves it.",
      },
      {
        name: "Dr. Usman Malik",
        role: "Physician – Islamabad",
        text:
          "Pink salt lamps and bath salts are authentic and well packed. Quality is clearly premium and consistent.",
      },
      {
        name: "Fatima Noor",
        role: "Wellness Coach – Faisalabad",
        text:
          "Pink bath salt helps me relax after long days. The fragrance and texture feel natural and calming.",
      },
      {
        name: "Muhammad Bilal",
        role: "Restaurant Manager – Multan",
        text:
          "We use their pink salt in our restaurant. Customers notice the flavor difference instantly.",
      },
    ];

    return {
      id: i,
      ...data[i % data.length],
      stars: 5,
    };
  });

  return (
    <section className="py-16 bg-[#F9F8F3] px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12 text-[#1a1a1a]">
          What Our Customers Say
        </h2>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          className="pb-12 [&_.swiper-wrapper]:items-stretch"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-[#EFECE6] p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
                {/* Stars */}
                <div className="flex justify-center mb-4 text-[#D4A395]">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-center italic text-[#4a4a4a] text-lg leading-relaxed px-2 line-clamp-4">
                  “{item.text}”
                </blockquote>

                {/* Push author to bottom */}
                <div className="mt-auto pt-8 text-center">
                  <h4 className="font-bold text-[#1a1a1a] text-lg">
                    {item.name}
                  </h4>
                  <p className="text-[#6a6a6a] text-xs uppercase tracking-widest mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Navigation */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#D4A395] hover:bg-[#D4A395] hover:text-white transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#D4A395] hover:bg-[#D4A395] hover:text-white transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
