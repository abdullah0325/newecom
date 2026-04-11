"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  type: string;
  status: string;
  adminNote?: string | null;
  createdAt: string;
};

export default function InquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  const [status, setStatus] = useState("unread");
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/inquiries/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load inquiry");
        if (cancelled) return;
        setInquiry(data);
        setStatus(data.status ?? "unread");
        setAdminNote(data.adminNote ?? "");
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load inquiry");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function save() {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update inquiry");
      setInquiry(data);
    } catch (e: any) {
      setError(e?.message || "Failed to update inquiry");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-sm text-[#5A5E55]">Loading...</div>;

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
        <Link href="/admin/inquiries" className="text-sm font-semibold text-[#1F6B4F] hover:underline">
          Back to inquiries
        </Link>
      </div>
    );
  }

  if (!inquiry) return null;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1F1C]">Inquiry</h1>
          <p className="mt-1 text-sm text-[#5A5E55]">
            Received {new Date(inquiry.createdAt).toLocaleString()}
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="rounded-lg border border-[#C6A24A]/25 bg-white px-4 py-2 text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]"
        >
          Back
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-[#1E1F1C]">
                  {inquiry.name}
                </div>
                <div className="text-sm text-[#5A5E55]">{inquiry.email}</div>
                {inquiry.phone ? (
                  <div className="text-sm text-[#5A5E55]">{inquiry.phone}</div>
                ) : null}
              </div>
              <span className="rounded-full bg-[#F6F1E7] px-3 py-1 text-xs font-semibold text-[#1E1F1C]">
                {inquiry.type}
              </span>
            </div>

            <h2 className="mt-6 text-base font-semibold text-[#1E1F1C]">
              {inquiry.subject}
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#5A5E55]">
              {inquiry.message}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-6">
            <h2 className="text-sm font-semibold text-[#1E1F1C]">Manage</h2>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">
                  Admin note
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={6}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  placeholder="Internal notes..."
                />
              </div>

              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-[#1F6B4F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <div className="rounded-lg border border-[#C6A24A]/20 bg-[#F6F1E7]/60 p-4">
                <p className="text-xs font-semibold text-[#1E1F1C]">Reply (optional)</p>
                <p className="mt-1 text-xs text-[#5A5E55]">
                  A built-in email reply workflow can be added next (SMTP/provider).
                </p>
                <a
                  className="mt-3 inline-flex text-sm font-semibold text-[#1F6B4F] hover:underline"
                  href={`mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(
                    `Re: ${inquiry.subject}`,
                  )}`}
                >
                  Reply via email →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

