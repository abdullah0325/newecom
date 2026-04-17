"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.blogs) {
        setPosts(data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C]">Blog Posts</h1>
        <Link
          href="/admin/blog/add"
          className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#C6A24A] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#b8923f]"
        >
          <FiPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add Post</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-sm">No blog posts yet</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden -mx-4 md:mx-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Handle
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 md:px-4 md:py-3 font-medium text-sm">{post.title}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-xs text-gray-500">
                      {post.slug}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <span
                        className={`inline-flex rounded-full px-1.5 py-0.5 text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="text-gray-400 hover:text-[#C6A24A] p-1"
                        >
                          <FiEdit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
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

