"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/collections");
      const data = await res.json();
      if (data.collections) {
        setCollections(data.collections);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCollection(id: string) {
    if (!confirm("Delete this collection?")) return;
    try {
      const res = await fetch(`/api/admin/collections/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCollections(collections.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C]">Collections</h1>
        <Link
          href="/admin/collections/new"
          className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#C6A24A] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#b8923f]"
        >
          <FiPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add Collection</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : collections.length === 0 ? (
        <p className="text-gray-500 text-sm">No collections yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {collection.image ? (
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-28 md:h-40 object-cover"
                />
              ) : (
                <div className="w-full h-28 md:h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No image</span>
                </div>
              )}
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base">{collection.title}</h3>
                <p className="text-xs md:text-sm text-gray-500">{collection.handle}</p>
                {collection.description && (
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-600 line-clamp-2">
                    {collection.description}
                  </p>
                )}
                <div className="mt-2 md:mt-3 flex gap-1.5 md:gap-2">
                  <Link
                    href={`/admin/collections/${collection.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-1 rounded bg-gray-100 py-1 text-xs md:text-sm hover:bg-gray-200"
                  >
                    <FiEdit className="h-3.5 w-3.5 md:h-4 md:w-4" /> <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => deleteCollection(collection.id)}
                    className="flex-1 flex items-center justify-center gap-1 rounded bg-red-50 py-1 text-xs md:text-sm text-red-600 hover:bg-red-100"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

