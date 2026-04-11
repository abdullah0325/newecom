import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import {
  FiGrid,
  FiPackage,
  FiFolder,
  FiShoppingBag,
  FiMessageSquare,
  FiFileText,
  FiImage,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { getServerSession } from "next-auth";
import AdminProviders from "@/components/admin-providers";
import { authOptions } from "@/lib/auth";
import { ResponsiveAdminLayout } from "@/components/responsive-admin-layout";

const prisma = new PrismaClient();

async function getAdminUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    return prisma.adminUser.findUnique({ where: { email: session.user.email } });
  } catch {
    return null;
  }
}

function Sidebar({ admin }: { admin: any }) {
  const navItems = [
    { href: "/admin/dashboard", icon: FiGrid, label: "Dashboard" },
    { href: "/admin/products", icon: FiPackage, label: "Products" },
    { href: "/admin/categories", icon: FiFolder, label: "Categories" },
    { href: "/admin/collections", icon: FiShoppingBag, label: "Collections" },
    { href: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
    { href: "/admin/inquiries", icon: FiMessageSquare, label: "Inquiries" },
    { href: "/admin/blog", icon: FiFileText, label: "Blog" },
    { href: "/admin/media", icon: FiImage, label: "Media" },
    { href: "/admin/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1E1F1C] text-white hidden md:block">
      <div className="flex h-16 items-center justify-center border-b border-white/10 px-4">
        <Link href="/admin/dashboard" className="text-xl font-bold text-[#C6A24A]">
          OrganoCity Admin
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C6A24A] text-sm font-bold text-[#1E1F1C]">
            {admin.name?.[0] || admin.email[0].toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{admin.name || admin.email}</p>
            <p className="truncate text-xs text-gray-400">Admin</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/profile"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
          >
            <FiUser className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center justify-center rounded-lg bg-red-500/20 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30"
          >
            <FiLogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let admin = null;
  try {
    admin = await getAdminUser();
  } catch {
    admin = null;
  }

  if (!admin) {
    return <AdminProviders>{children}</AdminProviders>;
  }

  return (
    <AdminProviders>
      <div className="min-h-screen bg-[#F6F1E7]">
        <Sidebar admin={admin} />
        <div className="ml-64 min-h-screen hidden md:block">
          <main>{children}</main>
        </div>
        
        <ResponsiveAdminLayout admin={admin}>
          {children}
        </ResponsiveAdminLayout>
      </div>
    </AdminProviders>
  );
}

