import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] p-8">
      <div className="mx-auto max-w-xl rounded-xl border border-[#C6A24A]/30 bg-white p-6">
        <h1 className="text-xl font-semibold text-[#1E1F1C]">Not found</h1>
        <p className="mt-2 text-sm text-[#5A5E55]">
          This admin page doesn’t exist.
        </p>
        <div className="mt-4">
          <Link
            href="/admin/dashboard"
            className="text-sm font-semibold text-[#1F6B4F] hover:underline"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

