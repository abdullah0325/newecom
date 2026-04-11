"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  const statusColors: Record<string, string> = {
    unread: "bg-blue-100 text-blue-700",
    read: "bg-yellow-100 text-yellow-700",
    replied: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1E1F1C] mb-6">Inquiries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries yet</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{inquiry.name}</h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[inquiry.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{inquiry.email}</p>
                  <p className="mt-1 font-medium">{inquiry.subject}</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {inquiry.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  href={`/admin/inquiries/${inquiry.id}`}
                  className="flex items-center gap-1 text-sm text-[#C6A24A] hover:underline"
                >
                  <FiEye className="h-4 w-4" /> View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

