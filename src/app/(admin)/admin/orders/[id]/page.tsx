"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  customerAddress: any;
  items: any;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  discount: number;
  couponCode?: string | null;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  notes?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  createdAt: string;
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const [orderStatus, setOrderStatus] = useState("pending");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load order");
        if (cancelled) return;
        setOrder(data);
        setOrderStatus(data.orderStatus ?? "pending");
        setPaymentStatus(data.paymentStatus ?? "pending");
        setTrackingNumber(data.trackingNumber ?? "");
        setTrackingUrl(data.trackingUrl ?? "");
        setNotes(data.notes ?? "");
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load order");
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
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus,
          paymentStatus,
          trackingNumber,
          trackingUrl,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update order");
      setOrder((o) => (o ? { ...o, ...data } : o));
    } catch (e: any) {
      setError(e?.message || "Failed to update order");
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
        <Link href="/admin/orders" className="text-sm font-semibold text-[#1F6B4F] hover:underline">
          Back to orders
        </Link>
      </div>
    );
  }

  if (!order) return null;

  const address = order.customerAddress ?? {};
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1F1C]">Order {order.orderNumber}</h1>
          <p className="mt-1 text-sm text-[#5A5E55]">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="rounded-lg border border-[#C6A24A]/25 bg-white px-4 py-2 text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]"
        >
          Back
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-6">
            <h2 className="text-sm font-semibold text-[#1E1F1C]">Items</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#C6A24A]/20 text-[#5A5E55]">
                    <th className="py-2 text-left">Product</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Line total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it: any, idx: number) => (
                    <tr key={idx} className="border-b border-[#C6A24A]/10">
                      <td className="py-3">
                        <div className="font-medium text-[#1E1F1C]">{it.title ?? it.productTitle ?? "Item"}</div>
                        <div className="text-xs text-[#5A5E55]">{it.productId ?? ""}</div>
                      </td>
                      <td className="py-3 text-right">{it.quantity ?? 1}</td>
                      <td className="py-3 text-right">Rs. {Number(it.price ?? 0).toLocaleString()}</td>
                      <td className="py-3 text-right font-medium">
                        Rs. {Number((it.price ?? 0) * (it.quantity ?? 1)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between"><span className="text-[#5A5E55]">Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#5A5E55]">Shipping</span><span>Rs. {order.shippingCost.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#5A5E55]">Tax</span><span>Rs. {order.tax.toLocaleString()}</span></div>
              {order.discount ? (
                <div className="flex justify-between"><span className="text-[#5A5E55]">Discount</span><span>- Rs. {order.discount.toLocaleString()}</span></div>
              ) : null}
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>Rs. {order.total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-6">
            <h2 className="text-sm font-semibold text-[#1E1F1C]">Customer</h2>
            <div className="mt-3 text-sm text-[#5A5E55] space-y-1">
              <div className="text-[#1E1F1C] font-medium">{order.customerName}</div>
              <div>{order.customerEmail}</div>
              {order.customerPhone ? <div>{order.customerPhone}</div> : null}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-[#1E1F1C]">Address</h3>
            <div className="mt-2 text-sm text-[#5A5E55]">
              {[address.line1, address.line2, address.city, address.state, address.pincode, address.country]
                .filter(Boolean)
                .join(", ")}
            </div>
          </div>

          <div className="rounded-xl border border-[#C6A24A]/20 bg-white p-6">
            <h2 className="text-sm font-semibold text-[#1E1F1C]">Status</h2>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Order status</label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Payment status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Tracking #</label>
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Tracking URL</label>
                <input
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1F1C]">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#C6A24A] focus:border-transparent"
                />
              </div>

              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-[#1F6B4F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#17513D] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

