"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/commerce";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const isEmpty = (cart.totalQuantity ?? 0) === 0;

  const subtotal = useMemo(() => {
    return cart.lines.reduce((sum, line) => sum + Number(line.cost.totalAmount.amount), 0);
  }, [cart.lines]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (isEmpty) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone: customerPhone || undefined,
          customerAddress: {
            line1,
            line2: line2 || undefined,
            city,
            state: state || undefined,
            pincode: pincode || undefined,
            country: "PK",
          },
          items: cart.lines.map((line) => ({
            productId: line.merchandise.id,
            quantity: line.quantity,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to place order");
      }

      cart.clear();
      router.push(`/checkout/success?orderNumber=${encodeURIComponent(data.order.orderNumber)}`);
    } catch (err: any) {
      setError(err?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  }

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-[#F6F1E7] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#C6A24A]/20 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-[#1E1F1C]">Checkout</h1>
          <p className="mt-2 text-sm text-[#5A5E55]">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-[#1F6B4F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#17513D]"
          >
            Shop products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1E7] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1E1F1C]">Checkout</h1>
          <p className="mt-1 text-sm text-[#5A5E55]">
            Cash on delivery (COD). Your order will be saved in our system immediately.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={placeOrder}
            className="lg:col-span-2 rounded-2xl border border-[#C6A24A]/20 bg-white p-6"
          >
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#1E1F1C]">Full name</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Email</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Phone</label>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  placeholder="03xx..."
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#1E1F1C]">Address line 1</label>
                <input
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#1E1F1C]">Address line 2 (optional)</label>
                <input
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">State (optional)</label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Postal code (optional)</label>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-[#1F6B4F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
            >
              {submitting ? "Placing order..." : "Place order (COD)"}
            </button>

            <p className="mt-3 text-xs text-[#5A5E55]">
              By placing an order, you confirm your details are correct.
            </p>
          </form>

          <aside className="rounded-2xl border border-[#C6A24A]/20 bg-white p-6">
            <h2 className="text-sm font-semibold text-[#1E1F1C]">Order summary</h2>
            <div className="mt-4 space-y-3">
              {cart.lines.map((line) => (
                <div key={line.id} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-[#1E1F1C]">
                      {line.merchandise.product.title}
                    </div>
                    <div className="text-xs text-[#5A5E55]">Qty {line.quantity}</div>
                  </div>
                  <div className="shrink-0 font-semibold text-[#1E1F1C]">
                    Rs. {Number(line.cost.totalAmount.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#C6A24A]/15 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5A5E55]">Subtotal</span>
                <span className="font-semibold text-[#1E1F1C]">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-[#5A5E55]">Shipping</span>
                <span className="font-semibold text-[#1E1F1C]">Rs. 0</span>
              </div>
              <div className="mt-3 flex justify-between text-base">
                <span className="font-semibold text-[#1E1F1C]">Total</span>
                <span className="font-extrabold text-[#1F6B4F]">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-6 inline-flex w-full justify-center rounded-lg border border-[#C6A24A]/25 bg-[#F6F1E7]/60 px-4 py-2 text-sm font-semibold text-[#1E1F1C] hover:bg-[#F6F1E7]"
            >
              Back to cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

