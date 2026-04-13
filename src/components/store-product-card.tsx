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
  const { linesAdd, registerSimpleProduct } = useCart();

  const whatsapp = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(
    `Hi, I want to order ${title}`,
  )}`;

  const effectiveVariantId = variantId || productId;

  const handleAddToCart = async () => {
    if (!effectiveVariantId) {
      return;
    }
    setLoading(true);
    try {
      await linesAdd([{ 
        merchandiseId: effectiveVariantId, 
        quantity: 1,
        title,
        price,
        imageUrl: featuredImageUrl,
      }]);
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
      <Link href={`/products/${handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#F6F1E7]">
          <Image
            src={featuredImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="line-clamp-2 font-semibold text-[#1E1F1C]">{title}</div>
        {tag ? (
          <span className="inline-flex rounded-full bg-[#F6F1E7] px-2.5 py-1 text-xs font-semibold text-[#1F6B4F]">
            {tag}
          </span>
        ) : null}
        <div className="flex items-center gap-2">
          {compareAtPrice ? (
            <span className="text-sm text-[#5A5E55] line-through">
              <Money data={compareAtPrice} />
            </span>
          ) : null}
          <span className="text-lg font-bold text-[#1F6B4F]">
            <Money data={price} />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1F6B4F]/20 px-3 py-2 text-xs font-semibold text-[#1F6B4F] hover:bg-[#1F6B4F]/5"
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </a>
          {effectiveVariantId ? (
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F6B4F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
            >
              <FaShoppingCart className="h-4 w-4" />
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          ) : (
            <Link
              href={`/products/${handle}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F6B4F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#17513D]"
            >
              <FaShoppingCart className="h-4 w-4" />
              Add to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

