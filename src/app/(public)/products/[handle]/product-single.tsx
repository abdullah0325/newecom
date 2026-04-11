"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

import { Money, ProductProvider, useCart } from "@/lib/commerce";

import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@esmate/shadcn/components/ui/card";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@esmate/shadcn/components/ui/tabs";

import { Skeleton } from "@esmate/shadcn/components/ui/skeleton";

import {
  Minus,
  Plus,
  Copy,
  Facebook,
  Twitter,
  ShoppingCart,
  Zap,
  Share2,
  Heart,
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  Star,
  Package,
} from "@esmate/shadcn/pkgs/lucide-react";

import { toast } from "sonner";
import { titleize } from "@esmate/utils/string";

import { useVariantSelector } from "@/hooks/use-variant-selector";
import { getProductSingle } from "./service";

interface Props {
  data: Awaited<ReturnType<typeof getProductSingle>>;
}

export function ProductSingle({ data }: Props) {
  const router = useRouter();
  const { linesAdd } = useCart();

  const defaultVariantId = useMemo(() => {
    return data.variants?.nodes.find((v) => v.availableForSale)?.id || data.variants?.nodes[0]?.id;
  }, [data.variants?.nodes]);

  const { variantId, options, selectOption } = useVariantSelector(data, defaultVariantId);

  const selectedVariant = useMemo(() => {
    return data.variants?.nodes.find((v: any) => v.id === variantId) || data.variants?.nodes[0] || null;
  }, [variantId, data.variants?.nodes]);

  const [currentImage, setCurrentImage] = useState(data.images.nodes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [url, setUrl] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  const changeQty = (n: number) => setQuantity((q) => Math.max(1, q + n));

  const addToCart = async () => {
    const targetVariantId = variantId || selectedVariant?.id || defaultVariantId;
    if (!targetVariantId) {
      toast.error("This product is not available right now");
      return;
    }
    try {
      await linesAdd([{ merchandiseId: targetVariantId, quantity }]);
      toast.success("Added to cart", {
        description: `${quantity} × ${data.title}`,
        icon: <ShoppingCart className="h-4 w-4" />,
      });
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const buyNow = async () => {
    const targetVariantId = variantId || selectedVariant?.id || defaultVariantId;
    if (!targetVariantId) {
      toast.error("This product is not available right now");
      return;
    }
    setBuyLoading(true);
    try {
      await linesAdd([{ merchandiseId: targetVariantId, quantity }]);
      router.push("/cart");
    } catch {
      toast.error("Checkout failed");
    } finally {
      setBuyLoading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link copied to clipboard");
  };

  const toggleWishlist = () => {
    setWishlisted((w) => !w);
    toast.success(!wishlisted ? "Added to wishlist" : "Removed from wishlist");
  };

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(data.title);

  // Price helpers (UI only)
  const priceBlock = useMemo(() => {
    if (!selectedVariant) return null;

    const price = parseFloat(selectedVariant.price.amount);
    const compareAt = selectedVariant.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null;

    const hasDiscount = compareAt !== null && compareAt > price;
    const savedAmount = hasDiscount ? compareAt! - price : 0;
    const savedPct = hasDiscount ? Math.round((savedAmount / compareAt!) * 100) : 0;

    return { hasDiscount, savedAmount, savedPct };
  }, [selectedVariant]);

  return (
    <ProductProvider data={data}>
      <section className="w-full bg-[#F6F1E7] overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#5A5E55]">
              <Link href="/" className="hover:text-[#1E1F1C] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
              <Link href="/products" className="hover:text-[#1E1F1C] transition-colors">
                Products
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
              <span className="text-[#1E1F1C] font-medium break-words">{data.title}</span>
            </nav>
          </div>

          <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
            {/* GALLERY */}
            <div className="space-y-4 sm:space-y-6 min-w-0">
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl bg-white overflow-hidden shadow-xl border border-[#C6A24A]/25">
                {/* nice uniform background */}
                <div className="absolute inset-0 bg-[#F6F1E7]" />

                {currentImage ? (
                  <>
                    <Image
                      src={currentImage.url}
                      alt={currentImage.altText || data.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-300 hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* soft top shine */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
                  </>
                ) : (
                  <Skeleton className="w-full h-full" />
                )}

                {/* Wishlist */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 ${wishlisted ? "fill-[#C6A24A] text-[#C6A24A] animate-pulse" : "text-[#1E1F1C]"
                      }`}
                  />
                </Button>

                {/* Sale */}
                {selectedVariant?.compareAtPrice && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                    <Badge className="px-3 py-1 text-sm font-semibold bg-[#C6A24A] text-[#1E1F1C] shadow">
                      SALE
                    </Badge>
                    {priceBlock?.hasDiscount ? (
                      <Badge className="px-3 py-1 text-sm font-semibold bg-[#1F6B4F] text-[#F6F1E7] shadow">
                        -{priceBlock.savedPct}%
                      </Badge>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="w-full overflow-x-auto">
                <div className="flex gap-3 pb-2 pr-2 min-w-max">
                    {data.images.nodes.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setCurrentImage(img)}
                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 border-2 bg-white
                          ${img.id === currentImage?.id
                            ? "border-[#1F6B4F] ring-2 ring-[#1F6B4F] ring-offset-2 scale-105 sm:scale-110 shadow-lg"
                            : "border-transparent hover:border-[#1F6B4F]/40 hover:scale-105"
                          }`}
                        aria-label="Select image"
                      >
                        <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
                        {img.id === currentImage?.id && <div className="absolute inset-0 bg-[#1F6B4F]/10" />}
                      </button>
                    ))}
                  </div>
              </div>

              {/* Trust strip under gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-white border border-[#C6A24A]/25 p-3 text-center">
                  <Truck className="h-5 w-5 text-[#1F6B4F] mx-auto mb-1" />
                  <div className="text-xs font-semibold text-[#1E1F1C]">Fast Delivery</div>
                  <div className="text-[11px] text-[#5A5E55]">Nationwide</div>
                </div>
                <div className="rounded-xl bg-white border border-[#C6A24A]/25 p-3 text-center">
                  <Shield className="h-5 w-5 text-[#1F6B4F] mx-auto mb-1" />
                  <div className="text-xs font-semibold text-[#1E1F1C]">Secure</div>
                  <div className="text-[11px] text-[#5A5E55]">Safe checkout</div>
                </div>
                <div className="rounded-xl bg-white border border-[#C6A24A]/25 p-3 text-center">
                  <RefreshCw className="h-5 w-5 text-[#1F6B4F] mx-auto mb-1" />
                  <div className="text-xs font-semibold text-[#1E1F1C]">Easy Returns</div>
                  <div className="text-[11px] text-[#5A5E55]">30 days</div>
                </div>
                <div className="rounded-xl bg-white border border-[#C6A24A]/25 p-3 text-center">
                  <Package className="h-5 w-5 text-[#1F6B4F] mx-auto mb-1" />
                  <div className="text-xs font-semibold text-[#1E1F1C]">Gift Ready</div>
                  <div className="text-[11px] text-[#5A5E55]">Free wrap</div>
                </div>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-6 sm:space-y-8 min-w-0">
              {/* Header */}
              <div className="rounded-2xl bg-white border border-[#C6A24A]/25 shadow-sm p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1E1F1C] mb-2 break-words">
                      {data.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#C6A24A] text-[#ecc45f]" />
                          ))}
                        </div>
                        <span className="text-sm text-[#5A5E55]">(24 reviews)</span>
                      </div>

                      <span className="hidden sm:inline-block text-[#C6A24A]/60">•</span>


                    </div>
                  </div>

                  <Badge
                    variant="secondary"
                    className="h-fit shrink-0 text-sm font-normal bg-[#F6F1E7] text-[#1F6B4F] border border-[#C6A24A]/25"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1F6B4F] mr-2 animate-pulse" />
                    In Stock
                  </Badge>
                </div>

                {/* Price */}
                {selectedVariant &&
                  (() => {
                    const hasDiscount = priceBlock?.hasDiscount;
                    const savedAmount = priceBlock?.savedAmount ?? 0;

                    return (
                      <div className="mt-4 sm:mt-6">
                        <div className="flex flex-wrap items-end gap-3 sm:gap-4">
                          {hasDiscount && selectedVariant.compareAtPrice ? (
                            <div className="text-xl sm:text-2xl font-bold text-[#1E1F1C] line-through opacity-50">
                              <Money data={selectedVariant.compareAtPrice} />
                            </div>
                          ) : null}

                          <div className="text-3xl sm:text-4xl font-extrabold text-[#1F6B4F] tracking-tight">
                            <Money data={selectedVariant.price} />
                          </div>

                          {hasDiscount ? (
                            <Badge className="text-sm bg-[#1F6B4F] text-[#F6F1E7]">
                              Save{" "}
                              <Money
                                data={{
                                  amount: savedAmount.toFixed(2),
                                  currencyCode: selectedVariant.price.currencyCode,
                                }}
                              />
                            </Badge>
                          ) : null}
                        </div>

                        <p className="text-[#5A5E55] mt-4 line-clamp-2 font-bold">
                          {data.description?.replace(/<[^>]*>/g, "").substring(0, 150)}...
                        </p>
                      </div>
                    );
                  })()}
              </div>

              {/* Variants + Purchase card */}
              <div className="rounded-2xl bg-white border border-[#C6A24A]/25 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-[#1E1F1C]">Choose Options</h2>
                  <span className="text-xs text-[#5A5E55]">Optional</span>
                </div>

                <Separator className="my-5 bg-[#C6A24A]/25" />

                {/* Variants */}
                <div className="space-y-6">
                  {options.map((opt) => (
                    <div key={opt.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-[#1E1F1C]">{opt.name}</Label>
                        <span className="text-xs text-[#5A5E55]">Select one</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((v) => (
                          <button
                            key={v.value}
                            disabled={v.disabled}
                            onClick={() => selectOption(opt.name, v.value)}
                            className={`rounded-full font-medium transition-all px-3 py-1 text-sm
                              ${v.selected
                                ? "shadow-lg bg-[#1F6B4F] text-[#F6F1E7] hover:bg-[#17513D]"
                                : "border border-[#C6A24A]/30 text-[#1E1F1C] hover:border-[#1F6B4F] hover:text-[#1F6B4F] hover:shadow"
                              }
                              ${v.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {v.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Qty */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-[#1E1F1C]">Quantity</Label>

                    <div className="flex items-center gap-3 sm:gap-4 max-w-fit">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => changeQty(-1)}
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#C6A24A]/25 hover:border-[#1F6B4F] hover:bg-[#1F6B4F]/5"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-[#1E1F1C]" />
                      </Button>

                      <div className="flex items-center justify-center w-16 sm:w-20 h-11 sm:h-12 rounded-xl bg-[#F6F1E7] border-2 border-[#C6A24A]/25 font-mono">
                        <span className="text-lg sm:text-xl font-bold text-[#1E1F1C]">{quantity}</span>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => changeQty(1)}
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#C6A24A]/25 hover:border-[#1F6B4F] hover:bg-[#1F6B4F]/5"
                      >
                        <Plus className="h-4 w-4 text-[#1E1F1C]" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-5 sm:pt-6">

                  {/* Buttons */}
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">

                    {/* Add to Cart */}
                    <Button
                      size="lg"
                      onClick={addToCart}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-[#1F6B4F] hover:bg-[#17513D] text-[#F6F1E7]"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Add to Cart
                    </Button>

                    {/* Buy Now */}
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={buyNow}
                      disabled={buyLoading}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl bg-[#1E1F1C] text-[#F6F1E7] hover:bg-[#2A2B28] shadow-md"
                    >
                      <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      {buyLoading ? "Processing..." : "Buy Now"}
                    </Button>

                    {/* WhatsApp Order */}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hi, I want to order ${data.title} (Qty: ${quantity})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-12 sm:h-14 text-sm sm:text-base rounded-xl  text-white  bg-[#1F6B4F] hover:bg-[#17513D] shadow-md transition-all duration-300"
                    >
                      {/* WhatsApp Icon */}
                      <FaWhatsapp className="h-6 w-6" />

                      WhatsApp
                    </a>
                  </div>

                  {/* Info Badges */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A5E55]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F1E7] px-3 py-2 border border-[#C6A24A]/25">
                      <Shield className="h-4 w-4 text-[#1F6B4F]" />
                      Secure checkout
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F1E7] px-3 py-2 border border-[#C6A24A]/25">
                      <Truck className="h-4 w-4 text-[#1F6B4F]" />
                      Fast delivery
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F6F1E7] px-3 py-2 border border-[#C6A24A]/25">
                      <RefreshCw className="h-4 w-4 text-[#1F6B4F]" />
                      Easy returns
                    </span>
                  </div>

                </div>
              </div>

              {/* Tabs */}
              <div className="rounded-2xl bg-white border border-[#C6A24A]/25 shadow-sm p-5 sm:p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3 bg-[#F6F1E7] border border-[#C6A24A]/25">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="pt-6">
                    <div
                      className="prose prose-lg max-w-none text-[#5A5E55]"
                      dangerouslySetInnerHTML={{ __html: data.descriptionHtml || "" }}
                    />
                  </TabsContent>

                  <TabsContent value="specs" className="pt-6">
                    <div className="space-y-4">
                      {data.metafields?.map((field: any) => (
                        <div
                          key={field.key}
                          className="flex justify-between gap-4 py-3 border-b border-[#C6A24A]/20"
                        >
                          <span className="font-semibold text-[#1E1F1C] break-words">{field.key}</span>
                          <span className="text-[#5A5E55] break-words text-right">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="pt-6">
                    <div className="rounded-2xl border border-[#C6A24A]/20 bg-[#F6F1E7] p-8 text-center">
                      <Star className="h-12 w-12 text-[#C6A24A] mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-[#1E1F1C]">Customer Reviews</h3>
                      <p className="text-[#5A5E55]">Be the first to review this product!</p>
                      <Button className="mt-5 bg-[#1F6B4F] hover:bg-[#17513D] text-[#F6F1E7] rounded-xl">
                        Write a review
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Share */}
              <div className="rounded-2xl bg-white border border-[#C6A24A]/25 shadow-sm p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Share2 className="h-5 w-5 text-[#5A5E55]" />
                    <span className="text-sm font-semibold text-[#1E1F1C]">Share this product</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={copyLink}
                      className="rounded-full hover:bg-[#F6F1E7] border border-[#C6A24A]/20 p-2"
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4 text-[#1E1F1C]" />
                    </button>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full hover:bg-[#F6F1E7] border border-[#C6A24A]/20"
                      >
                        <Twitter className="h-4 w-4 text-[#1E1F1C]" />
                      </Button>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full hover:bg-[#F6F1E7] border border-[#C6A24A]/20"
                      >
                        <Facebook className="h-4 w-4 text-[#1E1F1C]" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          {data.recommendations?.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#1E1F1C]">
                    You may also like
                  </h2>
                  <p className="text-[#5A5E55] mt-2">Discover more products you might love</p>
                </div>

                <Button
                  variant="outline"
                  className="gap-2 border-[#C6A24A]/30 text-[#1E1F1C] hover:text-[#1F6B4F] hover:border-[#1F6B4F]"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {data.recommendations.map((p: any) => (
                  <Link key={p.handle} href={`/products/${p.handle}`}>
                    <Card className="group border border-[#C6A24A]/20 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl bg-white hover:-translate-y-1">
                      <CardHeader className="p-0">
                        <div className="relative aspect-square overflow-hidden bg-[#F6F1E7]">
                          <Image
                            src={p.featuredImage?.url || "/placeholder.jpg"}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.08]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <Heart className="h-4 w-4 text-[#1E1F1C]" />
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5">
                        <h3 className="font-bold text-[#1E1F1C] truncate mb-2 group-hover:text-[#1F6B4F] transition-colors">
                          {titleize(p.title)}
                        </h3>
                        <p className="text-sm text-[#5A5E55] truncate mb-4">
                          {p.tags?.slice(0, 2).join(" • ") || "Premium Product"}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-extrabold text-[#1F6B4F]">
                            <Money data={p.priceRange.minVariantPrice} />
                          </div>

                          <div className="flex items-center">
                            <div className="flex text-[#C6A24A] mr-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-current" />
                              ))}
                            </div>
                            <span className="text-xs text-[#5A5E55]">(12)</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl transition-colors border-2 border-[#C6A24A]/25 text-[#1E1F1C] hover:bg-[#1F6B4F] hover:text-[#F6F1E7] hover:border-[#1F6B4F]"
                        >
                          Quick View
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </ProductProvider>
  );
}

