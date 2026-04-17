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
import { HomeProducts } from "@/components/home-products";

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
  const [categories, products, collections] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { order: "asc" },
      select: { id: true, name: true, slug: true, image: true },
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE" },
      orderBy: { updatedAt: "desc" },
      take: 20,
      select: { id: true, handle: true, title: true, price: true, compareAtPrice: true, featuredImage: true, images: true, tags: true, categoryId: true, subcategoryId: true },
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
      <HomeProducts categories={categories} products={products} collections={collections} />

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

