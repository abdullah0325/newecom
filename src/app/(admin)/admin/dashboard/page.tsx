import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

async function getAdminUser() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    return prisma.adminUser.findUnique({ where: { email: session.user.email } });
  } catch (error) {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/admin/login");
  }

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    productCount,
    collectionCount,
    orderCount,
    inquiryCount,
    lowStockProducts,
    recentOrders,
    recentInquiries,
    ordersLast7Days,
    ordersLast30Days,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.collection.count(),
    prisma.order.count(),
    prisma.inquiry.count(),
    prisma.product.findMany({
      where: { inventory: { lte: 5 } },
      select: { id: true, title: true, inventory: true },
      take: 5,
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.order.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: sevenDaysAgo } },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { createdAt: { gte: thirtyDaysAgo } },
      _sum: { total: true },
    }),
  ]);

  const ordersByDay: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().split("T")[0];
    ordersByDay[key] = 0;
  }
  ordersLast7Days.forEach((order) => {
    const key = order.createdAt.toISOString().split("T")[0];
    if (ordersByDay[key] !== undefined) {
      ordersByDay[key] = order._count;
    }
  });

  const stats = [
    { label: "Total Products", value: productCount, color: "#1F6B4F" },
    { label: "Total Orders", value: orderCount, color: "#C6A24A" },
    { label: "Total Inquiries", value: inquiryCount, color: "#5A5E55" },
    { label: "Collections", value: collectionCount, color: "#1E1F1C" },
  ];

  return (
    <main className="min-h-screen bg-[#F6F1E7] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1E1F1C]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#5A5E55]">
              Welcome back! Here&apos;s what&apos;s happening with your store.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-full bg-[#1F6B4F] px-5 py-3 text-sm font-semibold text-[#F6F1E7] hover:bg-[#17513D]"
          >
            Add Product
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-[#C6A24A]/20 bg-white p-6 shadow-sm"
            >
              <p className="text-sm uppercase tracking-wide text-[#5A5E55]">
                {item.label}
              </p>
              <p className="mt-3 text-4xl font-bold" style={{ color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#C6A24A]/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1E1F1C]">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm text-[#1F6B4F] hover:underline"
              >
                View all
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-[#5A5E55]">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#C6A24A]/20">
                      <th className="pb-2 text-left text-xs font-medium uppercase tracking-wide text-[#5A5E55]">
                        Order #
                      </th>
                      <th className="pb-2 text-left text-xs font-medium uppercase tracking-wide text-[#5A5E55]">
                        Customer
                      </th>
                      <th className="pb-2 text-left text-xs font-medium uppercase tracking-wide text-[#5A5E55]">
                        Status
                      </th>
                      <th className="pb-2 text-right text-xs font-medium uppercase tracking-wide text-[#5A5E55]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#C6A24A]/10"
                      >
                        <td className="py-3 text-sm font-medium">
                          {order.orderNumber}
                        </td>
                        <td className="py-3 text-sm text-[#5A5E55]">
                          {order.customerName}
                        </td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              order.orderStatus === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.orderStatus === "processing"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right text-sm font-medium">
                          Rs. {order.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-[#C6A24A]/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1E1F1C]">
                Recent Inquiries
              </h2>
              <Link
                href="/admin/inquiries"
                className="text-sm text-[#1F6B4F] hover:underline"
              >
                View all
              </Link>
            </div>
            {recentInquiries.length === 0 ? (
              <p className="text-sm text-[#5A5E55]">No inquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start justify-between border-b border-[#C6A24A]/10 pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{inquiry.name}</p>
                      <p className="text-sm text-[#5A5E55]">{inquiry.subject}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        inquiry.status === "unread"
                          ? "bg-blue-100 text-blue-700"
                          : inquiry.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : inquiry.status === "replied"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {lowStockProducts.length > 0 && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-red-800">
              Low Stock Alerts
            </h2>
            <div className="flex flex-wrap gap-3">
              {lowStockProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/admin/products/${product.id}/edit`}
                  className="flex items-center gap-2 rounded-full border border-red-300 bg-white px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                >
                  <span className="font-medium">{product.title}</span>
                  <span className="text-red-500">({product.inventory} left)</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

