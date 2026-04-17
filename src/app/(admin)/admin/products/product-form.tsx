"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminImageUpload } from "@/components/admin-image-upload";

type ProductStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

type CategoryItem = { id: string; name: string; parentId?: string | null };
type CollectionItem = { id: string; title: string };

export type ProductFormValues = {
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  price: number;
  compareAtPrice?: number | null;
  sku?: string;
  inventory: number;
  availableForSale: boolean;
  status: ProductStatus;
  seoTitle?: string;
  seoDescription?: string;
  images: string[];
  featuredImage?: string;
  productType?: string;
  categoryId: string;
  subcategoryId: string;
  vendor?: string;
  tags: string[];
  collectionIds: string[];
  isFeatured: boolean;
};

function slugifyHandle(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function ProductForm({
  mode,
  productId,
  initialValues,
}: {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    title: "",
    handle: "",
    description: "",
    descriptionHtml: "",
    price: 0,
    compareAtPrice: null,
    sku: "",
    inventory: 0,
    availableForSale: true,
    status: "ACTIVE",
    seoTitle: "",
    seoDescription: "",
    images: [],
    featuredImage: "",
    productType: "",
    categoryId: "",
    subcategoryId: "",
    vendor: "OrganoCity",
    tags: [],
    collectionIds: [],
    isFeatured: false,
    ...initialValues,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [collectionSearch, setCollectionSearch] = useState("");

  const canAutoHandle = useMemo(() => values.handle.trim().length === 0, [values.handle]);
  const parentCategories = useMemo(() => categories.filter((c) => !c.parentId), [categories]);
  const subcategories = useMemo(
    () => categories.filter((c) => c.parentId === values.categoryId),
    [categories, values.categoryId],
  );
  const visibleCollections = useMemo(
    () => collections.filter((c) => c.title.toLowerCase().includes(collectionSearch.toLowerCase())),
    [collections, collectionSearch],
  );

  useEffect(() => {
    if (canAutoHandle && values.title.trim()) {
      setValues((v) => ({ ...v, handle: slugifyHandle(v.title) }));
    }
  }, [values.title, canAutoHandle]);

  useEffect(() => {
    async function loadOptions() {
      const [catRes, colRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/collections"),
      ]);
      const catData = await catRes.json().catch(() => ({}));
      const colData = await colRes.json().catch(() => ({}));
      setCategories(Array.isArray(catData.categories) ? catData.categories : []);
      setCollections(Array.isArray(colData.collections) ? colData.collections : []);
    }
    void loadOptions();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (!values.categoryId || !values.subcategoryId) {
        setError("Category and subcategory are required");
        return;
      }
      if (!values.images.length) {
        setError("At least one image is required");
        return;
      }

      const payload = {
        ...values,
        compareAtPrice: values.compareAtPrice === null ? undefined : values.compareAtPrice,
      };
      const res = await fetch(
        mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`,
        { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Failed to save product");
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C]">{mode === "create" ? "Add Product" : "Edit Product"}</h1>
          <p className="mt-1 text-xs md:text-sm text-[#5A5E55]">Product mapping includes category, subcategory and collections.</p>
        </div>
        <Link href="/admin/products" className="rounded-lg border border-[#C6A24A]/25 bg-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]">Back</Link>
      </div>
      {error ? <div className="mb-3 md:mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-red-700">{error}</div> : null}
      <form onSubmit={onSubmit} className="grid gap-4 md:gap-6 rounded-xl border border-[#C6A24A]/20 bg-white p-4 md:p-6 lg:grid-cols-2">
        <div className="space-y-3 md:space-y-4">
          <input value={values.title} onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Title" required />
          <input value={values.handle} onChange={(e) => setValues((v) => ({ ...v, handle: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Handle" required />
          <div className="grid gap-4 md:grid-cols-2">
            <input type="number" min={0} step="0.01" value={values.price} onChange={(e) => setValues((v) => ({ ...v, price: Number(e.target.value) }))} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Price" required />
            <input type="number" min={0} step="0.01" value={values.compareAtPrice ?? ""} onChange={(e) => setValues((v) => ({ ...v, compareAtPrice: e.target.value ? Number(e.target.value) : null }))} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Compare at" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <select value={values.categoryId} onChange={(e) => setValues((v) => ({ ...v, categoryId: e.target.value, subcategoryId: "" }))} className="w-full rounded-lg border border-gray-300 px-3 py-2" required>
              <option value="">Select category</option>
              {parentCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={values.subcategoryId} onChange={(e) => setValues((v) => ({ ...v, subcategoryId: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2" required>
              <option value="">Select subcategory</option>
              {subcategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <textarea value={values.description ?? ""} onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))} rows={6} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Description" />
        </div>

        <div className="space-y-3 md:space-y-4">
          <AdminImageUpload label="Featured image" folder="organocity/products" usedIn="product" value={values.featuredImage} onChange={(url) => setValues((v) => ({ ...v, featuredImage: url }))} />
          <AdminImageUpload label="Product images" folder="organocity/products" usedIn="product" mode="multiple" values={values.images} onChangeMany={(urls) => setValues((v) => ({ ...v, images: urls }))} />
          <div className="rounded-lg border border-[#C6A24A]/20 bg-[#F6F1E7]/60 p-3 md:p-4">
            <p className="text-sm font-semibold text-[#1E1F1C]">Collections</p>
            <input value={collectionSearch} onChange={(e) => setCollectionSearch(e.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-sm" placeholder="Search..." />
            <div className="mt-2 md:mt-3 max-h-32 md:max-h-44 space-y-1.5 md:space-y-2 overflow-auto">
              {visibleCollections.map((collection) => (
                <label key={collection.id} className="flex items-center gap-2 text-xs md:text-sm text-[#1E1F1C]">
                  <input
                    type="checkbox"
                    checked={values.collectionIds.includes(collection.id)}
                    onChange={(e) =>
                      setValues((v) => ({
                        ...v,
                        collectionIds: e.target.checked ? [...v.collectionIds, collection.id] : v.collectionIds.filter((id) => id !== collection.id),
                      }))
                    }
                  />
                  {collection.title}
                </label>
              ))}
            </div>
          </div>
          <input value={values.tags.join(", ")} onChange={(e) => setValues((v) => ({ ...v, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))} className="w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-sm" placeholder="Tags (comma-separated)" />
          <label className="flex items-center gap-2 text-sm text-[#1E1F1C]">
            <input
              type="checkbox"
              checked={values.isFeatured}
              onChange={(e) => setValues((v) => ({ ...v, isFeatured: e.target.checked }))}
              className="rounded border-gray-300"
            />
            Mark as Featured Product
          </label>
          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="rounded-lg bg-[#1F6B4F] px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

