"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  isFeatured: boolean;
}

interface Props {
  categories: Category[];
  products: Product[];
  collections: { id: string; handle: string; title: string; image: string | null }[];
}

export function HomeProducts({ categories, products, collections }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const featuredProducts = products.filter(p => p.isFeatured);

  const filteredProducts = selectedCategory
    ? products.filter(p => {
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat && (p.categoryId === cat.id || p.subcategoryId === cat.id);
      })
    : featuredProducts;

  const otherProducts = selectedCategory
    ? products.filter(p => {
        const cat = categories.find(c => c.slug === selectedCategory);
        return cat && p.categoryId !== cat.id && p.subcategoryId !== cat.id;
      })
    : [];

  const selectedCat = categories.find(c => c.slug === selectedCategory);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E1F1C]">Shop by Categories</h2>
          <Link href="/products" className="text-sm font-semibold text-[#1F6B4F] hover:underline">
            View All
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.slug ? "" : category.slug)}
              className={`group flex flex-col items-center ${selectedCategory === category.slug ? 'ring-2 ring-[#1F6B4F] rounded-full' : ''}`}
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#C6A24A]/30 shadow-sm transition hover:border-[#C6A24A] hover:shadow-md sm:h-28 sm:w-28">
                <Image
                  src={category.image || "/logo/organocityBackup.png"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="mt-2 text-center text-xs font-semibold text-[#1E1F1C]">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {selectedCategory && filteredProducts.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#1E1F1C]">{selectedCat?.name} Products</h2>
            <button onClick={() => setSelectedCategory("")} className="text-sm font-semibold text-[#1F6B4F] hover:underline">
              Clear Filter
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.slice(0, 8).map((product) => {
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

      {(!selectedCategory || otherProducts.length > 0) && (
        <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#1E1F1C]">
              {selectedCategory ? "Other Products" : "Featured Products"}
            </h2>
            <Link href="/products" className="text-sm font-semibold text-[#1F6B4F] hover:underline">
              Shop Now
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(selectedCategory ? otherProducts : products).slice(0, 8).map((product) => {
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
    </>
  );
}