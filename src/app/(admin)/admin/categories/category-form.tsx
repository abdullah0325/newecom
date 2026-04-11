"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminImageUpload } from "@/components/admin-image-upload";

export type CategoryFormValues = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  order: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  productIds: string[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CategoryForm({
  mode,
  categoryId,
  initialValues,
}: {
  mode: "create" | "edit";
  categoryId?: string;
  initialValues?: Partial<CategoryFormValues>;
}) {
  const router = useRouter();

  const [values, setValues] = useState<CategoryFormValues>({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
    order: 0,
    featured: false,
    seoTitle: "",
    seoDescription: "",
    productIds: [],
    ...initialValues,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; parentId?: string | null }>>([]);

  const canAutoSlug = useMemo(() => values.slug.trim().length === 0, [values.slug]);

  useEffect(() => {
    if (canAutoSlug && values.name.trim()) {
      setValues((v) => ({ ...v, slug: slugify(v.name) }));
    }
  }, [values.name, canAutoSlug]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/admin/categories");
      const data = await res.json().catch(() => ({}));
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    }
    void loadCategories();
  }, []);

  const parentOptions = useMemo(
    () => categories.filter((c) => !c.parentId && c.id !== categoryId),
    [categories, categoryId],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...values,
        image: values.image?.trim() || undefined,
        parentId: values.parentId?.trim() || undefined,
        productIds: values.productIds ?? [],
      };
      if (!payload.image) {
        setError("Category image is required");
        setSaving(false);
        return;
      }

      const res = await fetch(
        mode === "create"
          ? "/api/admin/categories"
          : `/api/admin/categories/${categoryId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Failed to save category");
        return;
      }

      router.push("/admin/categories");
      router.refresh();
    } catch {
      setError("Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1F1C]">
            {mode === "create" ? "Add Category" : "Edit Category"}
          </h1>
          <p className="mt-1 text-sm text-[#5A5E55]">
            Categories can be used for filtering on the public product listing.
          </p>
        </div>
        <Link
          href="/admin/categories"
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
            <label className="block text-sm font-medium text-[#1E1F1C]">Name</label>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">Slug</label>
            <input
              value={values.slug}
              onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))}
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
              rows={5}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <AdminImageUpload
            label="Category Image"
            folder="organocity/categories"
            usedIn="category"
            value={values.image}
            onChange={(url) => setValues((v) => ({ ...v, image: url }))}
          />

          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">Parent Category (optional)</label>
            <select
              value={values.parentId ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, parentId: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">None (Main category)</option>
              {parentOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#1E1F1C]">Order</label>
              <input
                type="number"
                value={values.order}
                onChange={(e) =>
                  setValues((v) => ({ ...v, order: Number(e.target.value) }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              />
            </div>
            <label className="flex items-center gap-2 pt-6 text-sm text-[#1E1F1C]">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) =>
                  setValues((v) => ({ ...v, featured: e.target.checked }))
                }
              />
              Featured
            </label>
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

