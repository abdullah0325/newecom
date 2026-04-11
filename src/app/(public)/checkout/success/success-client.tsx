"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessClient() {
  const sp = useSearchParams();
  const orderNumber = sp.get("orderNumber");

  return (
    <main className="min-h-screen bg-[#F6F1E7] px-6 py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#C6A24A]/20 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-[#1E1F1C]">Order placed</h1>
        <p className="mt-2 text-sm text-[#5A5E55]">
          Thanks! Your order has been saved and will appear in the admin panel.
        </p>
        {orderNumber ? (
          <p className="mt-4 rounded-lg bg-[#F6F1E7] px-4 py-3 text-sm font-semibold text-[#1E1F1C]">
            Order number: {orderNumber}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/products"
            className="inline-flex justify-center rounded-full bg-[#1F6B4F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#17513D]"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-[#C6A24A]/25 bg-white px-6 py-3 text-sm font-semibold text-[#1E1F1C] hover:bg-[#F6F1E7]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}

