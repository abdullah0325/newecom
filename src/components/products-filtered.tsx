"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { StoreProductCard } from "@/components/store-product-card-wrapper";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

interface Product {
  id: string;
  handle: string;
  title: string;
  price: number | null;
  compareAtPrice: number | null;
  featuredImage: string | null;
  images: any;
  tags: any;
  categoryId: string | null;
  subcategoryId: string | null;
}

interface Props {
  categories: Category[];
  initialProducts: Product[];
  initialCategorySlug?: string;
}

export function ProductsFiltered({ categories, initialProducts, initialCategorySlug = "" }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategorySlug);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return { selected: initialProducts, related: [] };
    const cat = categories.find(c => c.slug === selectedCategory);
    if (!cat) return { selected: initialProducts, related: [] };
    const selected = initialProducts.filter(p => 
      p.categoryId === cat.id || p.subcategoryId === cat.id
    ) as typeof initialProducts;
    const related = initialProducts.filter(p => 
      p.categoryId !== cat.id && p.subcategoryId !== cat.id
    ) as typeof initialProducts;
    return { selected, related };
  }, [selectedCategory, initialProducts, categories]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? "" : slug);
  };

  return (
    <div>
      <div className="mb-8 flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory("")}
          className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-[#1F6B4F] text-white"
              : "bg-white border border-[#C6A24A]/30 text-[#1E1F1C] hover:bg-[#F6F1E7]"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === cat.slug
                ? "bg-[#1F6B4F] text-white"
                : "bg-white border border-[#C6A24A]/30 text-[#1E1F1C] hover:bg-[#F6F1E7]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#5A5E55]">
          {filteredProducts.selected.length > 0 
            ? `Showing ${filteredProducts.selected.length} products` 
            : "No products available"}
        </p>
      </div>

      {filteredProducts.selected.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.selected.map((product) => {
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
      ) : (
        <div className="rounded-2xl border border-[#C6A24A]/20 bg-white p-12 text-center">
          <p className="text-lg text-[#5A5E55]">No products found.</p>
        </div>
      )}

      {selectedCategory && filteredProducts.related.length > 0 && (
        <section className="mt-12 border-t border-[#C6A24A]/20 pt-12">
          <h3 className="mb-6 text-xl font-semibold text-[#1E1F1C]">Related Products</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.related.map((product) => {
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
        </section>
      )}
    </div>
  );
}