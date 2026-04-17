import { Metadata } from "next";
import { ProductList } from "./product-list";
import { getCategoriesForFilters, getProductList, getProductsAdvanced } from "./service";
import Link from "next/link";
import { StoreProductCard } from "@/components/store-product-card-wrapper";

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

  const [categories, allProducts, filtered] = await Promise.all([
    getCategoriesForFilters(),
    getProductList(),
    (q || category || subcategory || tag || Number.isFinite(min) || Number.isFinite(max))
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
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <form
                action="/products"
                method="GET"
                className="rounded-2xl border border-[#C6A24A]/20 bg-white p-5"
              >
                <h3 className="font-bold text-lg text-[#1E1F1C] mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5A5E55] mb-1.5">Search</label>
                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="Search products..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5E55] mb-1.5">Category</label>
                    <select
                      name="category"
                      defaultValue={category}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5E55] mb-1.5">Subcategory</label>
                    <select
                      name="subcategory"
                      defaultValue={subcategory}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                    >
                      <option value="">All Subcategories</option>
                      {categories.filter(c => c.subcategories?.length).map(cat => 
                        cat.subcategories?.map((sub: any) => (
                          <option key={sub.id} value={sub.slug}>
                            {sub.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5A5E55] mb-1.5">Price Range (PKR)</label>
                    <div className="flex gap-2">
                      <input
                        name="min"
                        defaultValue={searchParams?.min ?? ""}
                        type="number"
                        placeholder="Min"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                      <input
                        name="max"
                        defaultValue={searchParams?.max ?? ""}
                        type="number"
                        placeholder="Max"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#1F6B4F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#17513D]"
                  >
                    Apply Filters
                  </button>
                  {(q || category || subcategory || tag || searchParams?.min || searchParams?.max) && (
                    <Link
                      href="/products"
                      className="block w-full text-center rounded-full border border-[#C6A24A]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[#1E1F1C] hover:bg-[#F6F1E7]"
                    >
                      Clear Filters
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </aside>

          {/* Products Grid */}
            <div className="flex-1">
              {/* Active Filters Display */}
              {(q || category || subcategory || searchParams?.min || searchParams?.max) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-[#5A5E55]">Active filters:</span>
                  {q && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C6A24A]/10 px-3 py-1 text-xs font-medium text-[#1E1F1C]">
                      Search: {q}
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C6A24A]/10 px-3 py-1 text-xs font-medium text-[#1E1F1C]">
                      Category: {category}
                    </span>
                  )}
                  {(searchParams?.min || searchParams?.max) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C6A24A]/10 px-3 py-1 text-xs font-medium text-[#1E1F1C]">
                      Price: {searchParams?.min || "0"} - {searchParams?.max || "∞"}
                    </span>
                  )}
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-[#5A5E55]">
                  {filtered && filtered.length > 0
                    ? `Showing ${filtered.length} products`
                    : allProducts && allProducts.edges?.length > 0
                    ? `Showing ${allProducts.edges.length} products`
                    : "No products available"}
                </p>
                <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* Product List - show filtered if applied, otherwise show all */}
              {filtered && filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((p) => (
                    <StoreProductCard
                      key={p.handle}
                      handle={p.handle}
                      title={p.title}
                      featuredImageUrl={p.featuredImage?.url || "/logo/organocityBackup.png"}
                      price={p.priceRange.minVariantPrice}
                      compareAtPrice={p.compareAtPrice}
                      tag={p.tags?.[0]}
                      productId={p.id}
                    />
                  ))}
                </div>
              ) : allProducts && allProducts.edges?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allProducts.edges.map(({ node }: any) => (
                    <StoreProductCard
                      key={node.handle}
                      handle={node.handle}
                      title={node.title}
                      featuredImageUrl={node.featuredImage?.url || "/logo/organocityBackup.png"}
                      price={node.priceRange.minVariantPrice}
                      tag={node.tags?.[0]}
                      productId={node.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#C6A24A]/20 bg-white p-12 text-center">
                  <p className="text-lg text-[#5A5E55]">No products found.</p>
                </div>
              )}
            </div>
          </div>

        {/* SEO Content Section */}
        <section className="mt-16 border-t border-[#C6A24A]/20 pt-12">
          <h2 className="text-2xl font-bold text-[#1E1F1C]">
            Himalayan Pink Salt, Shilajit & Natural Wellness Products
          </h2>

          <p className="mt-4 max-w-4xl text-[#5A5E55]">
            OrganoCity specializes in authentic Himalayan pink salt products,
            responsibly sourced and minimally processed to retain their natural
            mineral composition. Our range includes edible pink salt for cooking,
            bath and wellness salt, decorative and functional pink salt lamps, and
            premium-grade Shilajit known for its traditional use in vitality and
            strength.
          </p>

          <p className="mt-4 max-w-4xl text-[#5A5E55]">
            Each product is selected with quality, purity, and sustainability in
            mind. We work closely with trusted suppliers to ensure our customers
            receive genuine Himalayan products suitable for daily use, wellness
            routines, and natural living.
          </p>
        </section>
      </div>
    </main>
  );
}

