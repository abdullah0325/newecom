"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  status: string;
  inventory: number;
  featuredImage?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("limit", "50");

      const res = await fetch(`/api/admin/products?${params}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C]">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#C6A24A] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#b8923f]"
        >
          <FiPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      <div className="mb-3 md:mb-4 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 text-sm focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-sm">No products found</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden -mx-4 md:mx-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage}
                          alt={product.title}
                          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">No</span>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <p className="font-medium text-[#1E1F1C] text-sm truncate max-w-[120px] sm:max-w-[200px]">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">{product.handle}</p>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-xs sm:text-sm">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <span
                        className={`inline-flex rounded-full px-1.5 py-0.5 text-xs font-medium ${
                          product.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : product.status === "DRAFT"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-xs sm:text-sm">{product.inventory}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1 text-gray-400 hover:text-[#C6A24A]"
                        >
                          <FiEdit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

