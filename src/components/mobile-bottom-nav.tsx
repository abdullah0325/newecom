"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/commerce";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  MessageCircle,
  Send,
} from "@esmate/shadcn/pkgs/lucide-react";
import { Badge } from "@esmate/shadcn/components/ui/badge";

const bottomNavItems = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/collections",
    icon: Grid3X3,
    label: "Shop",
  },
  {
    href: "/cart",
    icon: ShoppingCart,
    label: "Cart",
    showBadge: true,
  },
  {
    href: "/contact",
    icon: MessageCircle,
    label: "Contact",
  },
  {
    href: "https://wa.me/923234567890",
    icon: Send,
    label: "Chat",
    external: true,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalQuantity } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-12 px-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const content = (
              <div
                key={item.href}
                className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
                  active ? "text-[#1F6B4F]" : "text-gray-400"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-[18px] w-[18px] transition-colors`}
                  />
                  {item.showBadge && !!totalQuantity && (
                    <Badge className="absolute -right-2 -top-1.5 h-3.5 min-w-3.5 rounded-full p-0 text-[8px] font-bold bg-[#EF4444] text-white">
                      {totalQuantity > 99 ? "9+" : totalQuantity}
                    </Badge>
                  )}
                </div>
                <span
                  className={`text-[9px] font-medium mt-0.5 ${
                    active ? "text-[#1F6B4F] font-semibold" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}