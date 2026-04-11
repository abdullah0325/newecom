"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const certifications = [
  { name: "ISO 9001", src: "/certs/iso-9001.webp" },
  { name: "Global", src: "/certs/global.webp" },
  { name: "Halal Certified", src: "/certs/halal.webp" },
  { name: "Kosher Certified", src: "/certs/kosher.webp" },
  { name: "Compilance", src: "/certs/compilance.webp" },
  { name: "FDA Registered", src: "/certs/fda.webp" },
  { name: "Organic", src: "/certs/organic.webp" },
];

export function CertificationsSlider() {
  return (
    <section className="bg-[#F6F1E7] py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold text-[#1E1F1C] sm:text-4xl">
          Our Trusted Quality Certifications
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[#5A5E55]">
          Certified for purity, safety, and authenticity. Our Himalayan Pink Salt
          meets global food and quality standards.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#F6F1E7] to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#F6F1E7] to-transparent" />

        <motion.div
          className="flex w-max gap-14"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...certifications, ...certifications].map((cert, index) => (
            <div
              key={index}
              className="flex min-w-[140px] flex-col items-center gap-3 opacity-70 transition hover:opacity-100"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white shadow-sm">
                <Image
                  src={cert.src}
                  alt={cert.name}
                  fill
                  sizes="96px"
                  className="object-contain p-3"
                />
              </div>

              <span className="text-sm font-medium text-[#5A5E55]">
                {cert.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

