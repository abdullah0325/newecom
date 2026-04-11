"use client";

import { useEffect, useState, useRef } from "react";
import { FiUpload, FiTrash2, FiCopy, FiCheck } from "react-icons/fi";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.media) {
        setMedia(data.media);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.media) {
        setMedia([data.media, ...media]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function deleteMedia(id: string) {
    if (!confirm("Delete this file?")) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia(media.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1E1F1C] mb-6">
        Media Library
      </h1>

      <div className="mb-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg bg-[#C6A24A] px-4 py-2 text-sm font-medium text-white hover:bg-[#b8923f] disabled:opacity-50"
        >
          <FiUpload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : media.length === 0 ? (
        <p className="text-gray-500">No media files yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-1 text-xs truncate">{item.filename}</p>
              <div className="mt-1 flex gap-1">
                <button
                  onClick={() => copyUrl(item.url)}
                  className="flex-1 flex items-center justify-center gap-1 rounded bg-gray-100 py-1 text-xs hover:bg-gray-200"
                >
                  {copied === item.url ? (
                    <FiCheck className="h-3 w-3" />
                  ) : (
                    <FiCopy className="h-3 w-3" />
                  )}
                  {copied === item.url ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={() => deleteMedia(item.id)}
                  className="flex-1 flex items-center justify-center gap-1 rounded bg-red-50 py-1 text-xs text-red-600 hover:bg-red-100"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

