"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RamzanOfferModal() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#1E1F1C]/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#C6A24A]/30">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1E1F1C] shadow hover:bg-gray-100 transition"
        >
          ✕
        </button>

        {/* Clickable Offer */}
        <Link
          href="/ramzan-package"
          onClick={() => setOpen(false)}
          className="block"
        >
          {/* Image */}
          <div className="relative h-[260px] w-full">
            <Image
              src="/graphics/box.jpeg" // ✅ change image if needed
              alt="Ramzan Package Offer"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#1E1F1C]/25" />

            {/* Badge */}
            <div className="absolute left-5 top-5 rounded-full bg-[#1F6B4F] px-4 py-1 text-xs font-semibold text-[#F6F1E7]">
              Ramzan Special Offer
            </div>
          </div>

          {/* Text */}
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-[#1E1F1C]">
              Ramzan Package Discount
            </h2>

            <p className="mt-2 text-sm text-[#5A5E55]">
              Essential groceries at special discounted prices for Ramadan.
            </p>

            <div className="mt-5 inline-flex rounded-full bg-[#1F6B4F] px-6 py-2 text-sm font-semibold text-[#F6F1E7] hover:bg-[#17513D] transition-colors">
              View Package →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
