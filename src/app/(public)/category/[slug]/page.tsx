import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { StoreProductCard } from "@/components/store-product-card";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} | OrganoCity`,
    description: category.description || `Explore ${category.name} products on OrganoCity.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true, description: true, image: true },
  });
  if (!category) notFound();

  const [subcategories, products] = await Promise.all([
    prisma.category.findMany({
      where: { parentId: category.id },
      orderBy: { order: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE", OR: [{ categoryId: category.id }, { subcategoryId: category.id }] },
      orderBy: { updatedAt: "desc" },
      take: 48,
      select: { id: true, handle: true, title: true, price: true, compareAtPrice: true, featuredImage: true, images: true, tags: true },
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
      <section className="overflow-hidden rounded-2xl border border-[#C6A24A]/20 bg-white">
        <div className="grid gap-4 md:grid-cols-[1.2fr,1fr]">
          <div className="relative min-h-[220px]">
            <Image src={category.image || "/logo/organocityBackup.png"} alt={category.name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-[#1E1F1C]">{category.name}</h1>
            <p className="mt-2 text-sm text-[#5A5E55]">{category.description || "Shop products by category."}</p>
          </div>
        </div>
      </section>

      {subcategories.length > 0 ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[#1E1F1C]">Subcategories</h2>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <Link key={sub.id} href={`/category/${sub.slug}`} className="rounded-full border border-[#C6A24A]/30 bg-white px-4 py-2 text-sm text-[#1E1F1C] hover:bg-[#F6F1E7]">
                {sub.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-[#1E1F1C]">Products</h2>
        {products.length === 0 ? (
          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-8 text-sm text-[#5A5E55]">No products found in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
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
                  compareAtPrice={product.compareAtPrice ? { amount: Number(product.compareAtPrice).toFixed(2), currencyCode: "PKR" } : null}
                  tag={firstTag}
                  productId={product.id}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

