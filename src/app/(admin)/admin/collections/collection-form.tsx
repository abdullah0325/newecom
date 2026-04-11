"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminImageUpload } from "@/components/admin-image-upload";

export type CollectionFormValues = {
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  productHandles: string[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CollectionForm({
  mode,
  collectionId,
  initialValues,
}: {
  mode: "create" | "edit";
  collectionId?: string;
  initialValues?: Partial<CollectionFormValues>;
}) {
  const router = useRouter();

  const [values, setValues] = useState<CollectionFormValues>({
    title: "",
    handle: "",
    description: "",
    descriptionHtml: "",
    image: "",
    seoTitle: "",
    seoDescription: "",
    productHandles: [],
    ...initialValues,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<{ id: string; title: string; handle: string }>>([]);
  const [productSearch, setProductSearch] = useState("");

  const canAutoHandle = useMemo(() => values.handle.trim().length === 0, [values.handle]);

  useEffect(() => {
    if (canAutoHandle && values.title.trim()) {
      setValues((v) => ({ ...v, handle: slugify(v.title) }));
    }
  }, [values.title, canAutoHandle]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/admin/products?limit=200");
      const data = await res.json().catch(() => ({}));
      setProducts(Array.isArray(data.products) ? data.products : []);
    }
    void loadProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        `${p.title} ${p.handle}`.toLowerCase().includes(productSearch.toLowerCase()),
      ),
    [products, productSearch],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...values,
        image: values.image?.trim() || undefined,
        productHandles: values.productHandles ?? [],
      };

      const res = await fetch(
        mode === "create"
          ? "/api/admin/collections"
          : `/api/admin/collections/${collectionId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Failed to save collection");
        return;
      }

      router.push("/admin/collections");
      router.refresh();
    } catch {
      setError("Failed to save collection");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1F1C]">
            {mode === "create" ? "Add Collection" : "Edit Collection"}
          </h1>
          <p className="mt-1 text-sm text-[#5A5E55]">
            Collections power the public `/collections/*` pages.
          </p>
        </div>
        <Link
          href="/admin/collections"
          className="rounded-lg border border-[#C6A24A]/25 bg-white px-4 py-2 text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]"
        >
          Back
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="grid gap-6 rounded-xl border border-[#C6A24A]/20 bg-white p-6 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">Title</label>
            <input
              value={values.title}
              onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">Handle</label>
            <input
              value={values.handle}
              onChange={(e) => setValues((v) => ({ ...v, handle: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">
              Description (optional)
            </label>
            <textarea
              value={values.description ?? ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
              rows={6}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <AdminImageUpload
            label="Collection Image (optional)"
            folder="organocity/collections"
            usedIn="collection"
            value={values.image}
            onChange={(url) => setValues((v) => ({ ...v, image: url }))}
          />

          <div className="rounded-lg border border-[#C6A24A]/20 bg-[#F6F1E7]/60 p-4">
            <p className="text-sm font-semibold text-[#1E1F1C]">Assign Products</p>
            <input
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Search products..."
            />
            <div className="mt-3 max-h-40 space-y-2 overflow-auto">
              {filteredProducts.map((product) => (
                <label key={product.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.productHandles.includes(product.handle)}
                    onChange={(e) =>
                      setValues((v) => ({
                        ...v,
                        productHandles: e.target.checked
                          ? [...v.productHandles, product.handle]
                          : v.productHandles.filter((handle) => handle !== product.handle),
                      }))
                    }
                  />
                  {product.title}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#C6A24A]/20 bg-[#F6F1E7]/60 p-4">
            <p className="text-sm font-semibold text-[#1E1F1C]">SEO</p>
            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">
                  SEO Title (optional)
                </label>
                <input
                  value={values.seoTitle ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, seoTitle: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">
                  SEO Description (optional)
                </label>
                <textarea
                  value={values.seoDescription ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, seoDescription: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#1F6B4F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

