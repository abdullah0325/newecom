import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
import { Heart, Flame, Utensils } from "@esmate/shadcn/pkgs/lucide-react";
import Link from "next/link";
import { CertificationsSlider } from "@/components/certifications-slider";
import BlogSection from "@/components/blog-section";
import CertificatesMatters from "@/components/CertificatesMatters";
import EssenceSection from "@/components/EssenceSection";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { StoreProductCard } from "@/components/store-product-card";
import Image from "next/image";

export const metadata: Metadata = {
  title: "OrganoCity | Natural Products, Herbal Care, Shilajit & Pink Salt",
  description:
    "Modern multi-product store for natural and herbal products including Shilajit, Himalayan pink salt, wellness products, and daily essentials.",
  keywords: [
    "himalayan salt",
    "pink salt",
    "natural products",
    "herbal products",
    "shilajit",
    "salt lamps",
    "organic salt",
    "pakistan salt mine",
    "edible salt",
    "bath salt",
  ],
  openGraph: {
    title: "OrganoCity | Pure Organic Pink Salt",
    description:
      "Experience the healing power of nature with our authentic Himalayan Pink Salt products.",
    images: ["/images/himalayan-hero.png"],
  },
};

export default async function Page() {
  const [categories, featuredProducts, collections] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { order: "asc" },
      take: 6,
      select: { id: true, name: true, slug: true, image: true },
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: { updatedAt: "desc" },
      take: 8,
      select: {
        id: true,
        handle: true,
        title: true,
        price: true,
        compareAtPrice: true,
        featuredImage: true,
        images: true,
        tags: true,
      },
    }),
    prisma.collection.findMany({
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, handle: true, title: true, image: true },
    }),
  ]);

  return (
    <div className="flex flex-col gap-16 pb-10 bg-[#F6F1E7]">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E1F1C]">Shop by Categories</h2>
          <Link href="/products" className="text-sm font-semibold text-[#1F6B4F] hover:underline">
            Shop Now
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#C6A24A]/20 bg-white"
            >
              <div className="relative aspect-square">
                <Image
                  src={category.image || "/logo/organocityBackup.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center text-sm font-semibold text-[#1E1F1C]">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-[#1E1F1C]">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => {
            const firstImage = Array.isArray(product.images)
              ? product.images.find((x): x is string => typeof x === "string")
              : null;
            const firstTag = Array.isArray(product.tags)
              ? product.tags.find((x): x is string => typeof x === "string")
              : undefined;
            return (
              <StoreProductCard
                key={product.handle}
                handle={product.handle}
                title={product.title}
                featuredImageUrl={product.featuredImage || firstImage || "/logo/organocityBackup.png"}
                price={{ amount: Number(product.price || 0).toFixed(2), currencyCode: "PKR" }}
                compareAtPrice={
                  product.compareAtPrice
                    ? { amount: Number(product.compareAtPrice).toFixed(2), currencyCode: "PKR" }
                    : null
                }
                tag={firstTag}
                productId={product.id}
              />
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-[#1E1F1C]">Collections</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group overflow-hidden rounded-2xl border border-[#C6A24A]/20 bg-white"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={collection.image || "/logo/organocityBackup.png"}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-lg font-semibold text-[#1E1F1C]">{collection.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E1F1C] sm:text-4xl">
            The Miracle of Pink Salt
          </h2>
          <p className="mt-4 text-lg text-[#5A5E55]">
            Unlocking the ancient health benefits of Himalayan crystals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lamp Benefits */}
          <Card className="bg-white border-[#C6A24A]/30 hover:border-[#1F6B4F]/60 transition-colors duration-300">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#F6F1E7] flex items-center justify-center text-[#1F6B4F]">
                <Flame className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1F1C]">Salt Lamps</h3>
              <ul className="space-y-2 text-[#5A5E55] list-disc pl-4">
                <li>Purifies air by releasing negative ions</li>
                <li>Reduces allergy symptoms and asthma</li>
                <li>Improves sleep quality and mood</li>
                <li>Neutralizes electromagnetic radiation (EMF)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Edible Benefits */}
          <Card className="bg-white border-[#C6A24A]/30 hover:border-[#1F6B4F]/60 transition-colors duration-300">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#F6F1E7] flex items-center justify-center text-[#1F6B4F]">
                <Utensils className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1F1C]">
                Edible Salt (Fine/Grinder)
              </h3>
              <ul className="space-y-2 text-[#5A5E55] list-disc pl-4">
                <li>Contains 84 essential trace minerals</li>
                <li>Regulates water content in the body</li>
                <li>Promotes healthy pH balance</li>
                <li>Lower sodium content than table salt</li>
              </ul>
            </CardContent>
          </Card>

          {/* Spa Benefits */}
          <Card className="bg-white border-[#C6A24A]/30 hover:border-[#1F6B4F]/60 transition-colors duration-300">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#F6F1E7] flex items-center justify-center text-[#1F6B4F]">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1F1C]">Bath & Spa</h3>
              <ul className="space-y-2 text-[#5A5E55] list-disc pl-4">
                <li>Detoxifies the body through osmosis</li>
                <li>Relieves muscle cramps and soreness</li>
                <li>Exfoliates dead skin cells</li>
                <li>Improving skin hydration and texture</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Essence */}
      <EssenceSection />

      {/* Certificates */}
      <CertificatesMatters />

      {/* Blog */}
      <BlogSection />

      {/* Certifications Slider */}
      <CertificationsSlider />
    </div>
  );
}

