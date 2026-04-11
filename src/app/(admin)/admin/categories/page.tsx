"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1E1F1C]">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-lg bg-[#C6A24A] px-4 py-2 text-sm font-medium text-white hover:bg-[#b8923f]"
        >
          <FiPlus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-4">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.slug}</p>
              <div className="flex gap-2 mt-3">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
                >
                  <FiEdit className="h-4 w-4" /> Edit
                </Link>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="flex-1 flex items-center justify-center gap-1 rounded bg-red-50 px-2 py-1 text-sm text-red-600 hover:bg-red-100"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

