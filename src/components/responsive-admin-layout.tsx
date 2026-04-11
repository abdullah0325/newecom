"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  FiMenu,
  FiX,
} from "react-icons/fi";

interface AdminNavContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isMobile: boolean;
}

const AdminNavContext = createContext<AdminNavContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
  isMobile: false,
});

export function useAdminNav() {
  return useContext(AdminNavContext);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  if (typeof window !== "undefined") {
    setIsMobile(window.innerWidth < 768);
  }

  return isMobile;
}

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

const bottomNavItems = [
  { href: "/admin/dashboard", icon: FiGrid, label: "Home" },
  { href: "/admin/products", icon: FiPackage, label: "Products" },
  { href: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
  { href: "/admin/inquiries", icon: FiMessageSquare, label: "Inquiries" },
  { href: "/admin/settings", icon: FiSettings, label: "More" },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#1E1F1C] border-t border-white/10">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  isActive ? "text-[#C6A24A]" : "text-gray-400"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function AdminSidebar({ admin, onClose }: { admin: any; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 bg-[#1E1F1C] text-white md:static md:z-40"
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin/dashboard" className="text-lg font-bold text-[#C6A24A]">
            OrganoCity Admin
          </Link>
          <button onClick={onClose} className="p-2 md:hidden">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#C6A24A]/20 text-[#C6A24A]"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/profile"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
            >
              <FiUser className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center justify-center rounded-lg bg-red-500/20 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function AdminMobileHeader({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getTitle = () => {
    if (pathname === "/admin/dashboard") return "Dashboard";
    if (pathname?.startsWith("/admin/products")) return "Products";
    if (pathname?.startsWith("/admin/categories")) return "Categories";
    if (pathname?.startsWith("/admin/collections")) return "Collections";
    if (pathname?.startsWith("/admin/orders")) return "Orders";
    if (pathname?.startsWith("/admin/inquiries")) return "Inquiries";
    if (pathname?.startsWith("/admin/blog")) return "Blog";
    if (pathname?.startsWith("/admin/media")) return "Media";
    if (pathname?.startsWith("/admin/settings")) return "Settings";
    if (pathname?.startsWith("/admin/profile")) return "Profile";
    return "Admin";
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#C6A24A]/20 bg-[#F6F1E7]/80 px-4 md:hidden backdrop-blur">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center justify-center p-2"
        >
          <FiMenu className="h-6 w-6 text-[#1E1F1C]" />
        </button>
        
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-[#1E1F1C]">{getTitle()}</h1>
        </div>

        <Link
          href="/admin/profile"
          className="flex items-center justify-center p-2"
        >
          <FiUser className="h-5 w-5 text-[#1E1F1C]" />
        </Link>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <AdminSidebar admin={adminName} onClose={() => setIsMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function ResponsiveAdminLayout({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: any;
}) {
  return (
    <div className="min-h-screen bg-[#F6F1E7]">
      <div className="hidden md:block">
        <AdminSidebar admin={admin} />
      </div>
      
      <div className="md:ml-64">
        <div className="hidden md:block sticky top-0 z-30">
          <AdminTopbarSimple admin={admin} />
        </div>
        
        <AdminMobileHeader adminName={admin.name || admin.email} />
        
        <main className="pb-20 md:pb-0">
          {children}
        </main>
      </div>
      
      <AdminMobileNav />
    </div>
  );
}

function AdminTopbarSimple({ admin }: { admin: any }) {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-[#C6A24A]/20 bg-[#F6F1E7]/80 px-6 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold text-[#1E1F1C]">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/admin/profile"
          className="inline-flex items-center gap-2 rounded-lg border border-[#C6A24A]/25 bg-white px-3 py-2 text-sm font-medium text-[#1E1F1C] hover:bg-[#F6F1E7]"
        >
          <FiUser className="h-4 w-4" />
          <span>Profile</span>
        </Link>

        <Link
          href="/api/auth/signout"
          className="inline-flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-500/30"
        >
          <FiLogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
}
