"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { Money, useCart } from "@/lib/commerce";
import { toast } from "sonner";
import { useState } from "react";

type ProductCardProps = {
  handle: string;
  title: string;
  featuredImageUrl: string;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  tag?: string;
  variantId?: string;
  productId?: string;
};

export function StoreProductCard({
  handle,
  title,
  featuredImageUrl,
  price,
  compareAtPrice,
  tag,
  variantId,
  productId,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const { linesAdd } = useCart();

  const whatsapp = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
    `Hi, I want to order ${title}`,
  )}`;

  const effectiveVariantId = variantId || productId;

  const handleAddToCart = async () => {
    if (!effectiveVariantId) return;

    setLoading(true);
    try {
      await linesAdd([
        {
          merchandiseId: effectiveVariantId,
          quantity: 1,
          title,
          price,
          imageUrl: featuredImageUrl,
        },
      ]);
      toast.success("Added to cart", {
        description: title,
      });
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#C6A24A]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      <Link href={`/products/${handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#F6F1E7]">

          <Image
            src={featuredImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* PRICE BADGE */}
          <div className="absolute top-2 left-2 z-10">
            <div className="px-3 py-1.5 rounded-full 
              bg-white/80 backdrop-blur-md 
              border border-white/40 
              shadow-sm text-sm font-bold text-[#1F6B4F]">
              <Money data={price} />
            </div>
          </div>

          {/* COMPARE PRICE */}
          {compareAtPrice && (
            <div className="absolute top-2 right-2 z-10 text-xs line-through text-white/90 bg-black/40 px-2 py-1 rounded-md backdrop-blur">
              <Money data={compareAtPrice} />
            </div>
          )}

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* TITLE AT BOTTOM OF IMAGE */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
            <h3 className="line-clamp-2 text-sm font-semibold text-white">
              {title}
            </h3>
          </div>

        </div>
      </Link>

      {/* CONTENT */}
      <div className="space-y-3 p-4">

        {/* TITLE REMOVED - NOW ON IMAGE */}
        {/* <div className="line-clamp-2 font-semibold text-[#1E1F1C]">
          {title}
        </div> */}

        {tag && (
          <span className="inline-flex rounded-full bg-[#F6F1E7] px-2.5 py-1 text-xs font-semibold text-[#1F6B4F]">
            {tag}
          </span>
        )}

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2 pt-1">

          {/* WhatsApp */}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1F6B4F]/20 px-3 py-2 text-xs font-semibold text-[#1F6B4F] hover:bg-[#1F6B4F]/5 transition"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </a>

          {/* Add to Cart */}
          {effectiveVariantId ? (
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F6B4F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#17513D] transition disabled:opacity-50"
            >
              <FaShoppingCart className="h-4 w-4" />
              {loading ? "Adding..." : "Add"}
            </button>
          ) : (
            <Link
              href={`/products/${handle}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F6B4F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#17513D] transition"
            >
              <FaShoppingCart className="h-4 w-4" />
              View
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}