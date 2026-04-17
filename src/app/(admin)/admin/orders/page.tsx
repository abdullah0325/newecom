"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  orderStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-[#1E1F1C] mb-4 md:mb-6">Orders</h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden -mx-4 md:mx-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order #
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-2 py-2 md:px-4 md:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 md:px-4 md:py-3 font-medium text-sm">{order.orderNumber}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm">{order.customerName}</td>
                    <td className="px-2 py-2 md:px-4 md:py-3">
                      <span
                        className={`inline-flex rounded-full px-1.5 py-0.5 text-xs font-medium ${
                          statusColors[order.orderStatus] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right font-medium text-xs md:text-sm">
                      Rs. {order.total.toLocaleString()}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2 md:px-4 md:py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs md:text-sm text-[#C6A24A] hover:underline"
                      >
                        <FiEye className="h-3.5 w-3.5 md:h-4 md:w-4" /> <span className="hidden sm:inline">View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

