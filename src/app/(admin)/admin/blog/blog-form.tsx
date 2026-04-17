"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminImageUpload } from "@/components/admin-image-upload";

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  categoryId?: string;
  author?: string;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogForm({
  mode,
  postId,
  initialValues,
}: {
  mode: "create" | "edit";
  postId?: string;
  initialValues?: Partial<BlogFormValues>;
}) {
  const router = useRouter();

  const [values, setValues] = useState<BlogFormValues>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "Admin",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    tags: [],
    ...initialValues,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; parentId?: string | null }>>([]);

  const canAutoSlug = useMemo(() => values.slug.trim().length === 0, [values.slug]);

  useEffect(() => {
    if (canAutoSlug && values.title.trim()) {
      setValues((v) => ({ ...v, slug: slugify(v.title) }));
    }
  }, [values.title, canAutoSlug]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/admin/categories");
      const data = await res.json().catch(() => ({}));
      setCategories(
        (Array.isArray(data.categories) ? data.categories : []).filter((c: any) => !c.parentId),
      );
    }
    void loadCategories();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...values,
        featuredImage: values.featuredImage?.trim() || undefined,
        tags: values.tags ?? [],
      };

      const res = await fetch(
        mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${postId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Failed to save post");
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C]">
            {mode === "create" ? "Add Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-[#5A5E55]">
            This is the admin CMS table (BlogPost).
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="rounded-lg border border-[#C6A24A]/25 bg-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]"
        >
          Back
        </Link>
      </div>

      {error && (
        <div className="mb-3 md:mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="grid gap-4 md:gap-6 rounded-xl border border-[#C6A24A]/20 bg-white p-4 md:p-6"
      >
        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
          <div>
            <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Title</label>
            <input
              value={values.title}
              onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Slug</label>
            <input
              value={values.slug}
              onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 font-mono text-xs md:text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
          <div>
            <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Status</label>
            <select
              value={values.status}
              onChange={(e) =>
                setValues((v) => ({ ...v, status: e.target.value as any }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Category</label>
            <select
              value={values.categoryId ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, categoryId: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-xs md:text-sm"
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AdminImageUpload
          label="Featured Image"
          folder="organocity/blogs"
          usedIn="blog"
          value={values.featuredImage}
          onChange={(url) => setValues((v) => ({ ...v, featuredImage: url }))}
        />

        <div>
          <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Excerpt</label>
          <textarea
            value={values.excerpt ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, excerpt: e.target.value }))}
            rows={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">Content</label>
          <textarea
            value={values.content ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))}
            rows={6}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">
              Tags (comma-separated)
            </label>
            <input
              value={values.tags.join(", ")}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  tags: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E1F1C]">Author</label>
            <input
              value={values.author ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
            />
          </div>
        </div>

        <div className="rounded-lg border border-[#C6A24A]/20 bg-[#F6F1E7]/60 p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-[#1E1F1C]">SEO</p>
          <div className="mt-2 md:mt-3 grid gap-3 md:gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">SEO Title</label>
              <input
                value={values.seoTitle ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, seoTitle: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#1E1F1C]">SEO Description</label>
              <textarea
                value={values.seoDescription ?? ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, seoDescription: e.target.value }))
                }
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#1F6B4F] px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

