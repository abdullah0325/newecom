import { Metadata } from "next";
import { ProductList } from "./product-list";
import { getCategoriesForFilters, getProductList, getProductsAdvanced } from "./service";
import Link from "next/link";
import { StoreProductCard } from "@/components/store-product-card";

export const revalidate = 60;

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: "All Products | OrganoCity Pink Salt, Shilajit & Salt Lamps",
  description:
    "Explore OrganoCity’s complete range of Himalayan pink salt products, pure Shilajit, pink salt lamps, edible salt, wellness items, and natural home solutions sourced from the Himalayas.",

  keywords: [
    "Himalayan pink salt",
    "pink salt products",
    "pink salt lamps",
    "pure shilajit",
    "shilajit resin",
    "edible pink salt",
    "rock salt",
    "natural wellness products",
    "OrganoCity",
  ],

  openGraph: {
    title: "All Products | OrganoCity Himalayan Pink Salt & Shilajit",
    description:
      "Browse all OrganoCity products including Himalayan pink salt, authentic Shilajit, pink salt lamps, and natural wellness essentials.",
    url: "https://organocity.com/products",
    siteName: "OrganoCity",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OrganoCity Products | Pink Salt, Shilajit & Wellness",
    description:
      "Discover OrganoCity’s full product collection: Himalayan pink salt, Shilajit, salt lamps, and natural health products.",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://organocity.com/products",
  },
};

/* ---------------- PAGE ---------------- */

export default async function Page({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string; subcategory?: string; tag?: string; min?: string; max?: string };
}) {
  const q = (searchParams?.q ?? "").trim();
  const category = (searchParams?.category ?? "").trim();
  const subcategory = (searchParams?.subcategory ?? "").trim();
  const tag = (searchParams?.tag ?? "").trim();
  const min = Number(searchParams?.min ?? "");
  const max = Number(searchParams?.max ?? "");

  const [categories, data, filtered] = await Promise.all([
    getCategoriesForFilters(),
    q || category || subcategory || tag || Number.isFinite(min) || Number.isFinite(max)
      ? Promise.resolve(null)
      : getProductList(),
    q || category || subcategory || tag || Number.isFinite(min) || Number.isFinite(max)
      ? getProductsAdvanced({
          q: q || undefined,
          categorySlug: category || undefined,
          subcategorySlug: subcategory || undefined,
          tag: tag || undefined,
          minPrice: Number.isFinite(min) ? min : undefined,
          maxPrice: Number.isFinite(max) ? max : undefined,
        })
      : Promise.resolve(null),
  ]);

  return (
    <main className="bg-background">
      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All OrganoCity Products
        </h1>

        <p className="mt-4 max-w-3xl text-muted-foreground">
          Discover the complete collection of OrganoCity products, carefully
          sourced from the Himalayan region. From premium Himalayan pink salt
          for everyday use to authentic Shilajit and beautifully crafted pink
          salt lamps, our products are designed to support natural wellness,
          purity, and balance.
        </p>

        <p className="mt-4 max-w-3xl text-muted-foreground">
          Whether you are looking for edible pink salt, wellness supplements,
          decorative salt lamps, or natural lifestyle products, OrganoCity
          offers high-quality options backed by tradition, testing, and trust.
        </p>

        <form
          action="/products"
          method="GET"
          className="mt-8 grid gap-3 rounded-2xl border border-[#C6A24A]/20 bg-white p-4 sm:grid-cols-4"
        >
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#5A5E55]">
              Search
            </label>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A5E55]">
              Category
            </label>
            <select
              name="category"
              defaultValue={category}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A5E55]">Subcategory slug</label>
            <input
              name="subcategory"
              defaultValue={subcategory}
              placeholder="e.g. lamps"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5A5E55]">Tag</label>
            <input
              name="tag"
              defaultValue={tag}
              placeholder="energy"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5A5E55]">Min price</label>
            <input
              name="min"
              defaultValue={searchParams?.min ?? ""}
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5A5E55]">Max price</label>
            <input
              name="max"
              defaultValue={searchParams?.max ?? ""}
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="sm:col-span-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#1F6B4F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#17513D]"
            >
              Apply
            </button>
            {(q || category || subcategory || tag || searchParams?.min || searchParams?.max) && (
              <Link
                href="/products"
                className="rounded-full border border-[#C6A24A]/25 bg-white px-6 py-2.5 text-sm font-semibold text-[#1E1F1C] hover:bg-[#F6F1E7]"
              >
                Reset
              </Link>
            )}
            {q ? (
              <span className="text-sm text-[#5A5E55]">
                Showing results for <span className="font-semibold">{q}</span>
              </span>
            ) : null}
          </div>
        </form>
      </section>

      {/* Product List */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        {filtered ? (
          filtered.length === 0 ? (
            <div className="rounded-2xl border border-[#C6A24A]/20 bg-white p-8 text-center text-sm text-[#5A5E55]">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <StoreProductCard
                  key={p.handle}
                  handle={p.handle}
                  title={p.title}
                  featuredImageUrl={p.featuredImage?.url || "/logo/organocityBackup.png"}
                  price={p.priceRange.minVariantPrice}
                  tag={p.tags?.[0]}
                />
              ))}
            </div>
          )
        ) : (
          <ProductList data={data!} />
        )}
      </section>

      {/* SEO Content Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <h2 className="text-2xl font-semibold">
          Himalayan Pink Salt, Shilajit & Natural Wellness Products
        </h2>

        <p className="mt-4 max-w-4xl text-muted-foreground">
          OrganoCity specializes in authentic Himalayan pink salt products,
          responsibly sourced and minimally processed to retain their natural
          mineral composition. Our range includes edible pink salt for cooking,
          bath and wellness salt, decorative and functional pink salt lamps, and
          premium-grade Shilajit known for its traditional use in vitality and
          strength.
        </p>

        <p className="mt-4 max-w-4xl text-muted-foreground">
          Each product is selected with quality, purity, and sustainability in
          mind. We work closely with trusted suppliers to ensure our customers
          receive genuine Himalayan products suitable for daily use, wellness
          routines, and natural living.
        </p>
      </section>
    </main>
  );
}

