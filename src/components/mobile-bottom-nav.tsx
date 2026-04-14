"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

const PHONE_NUMBER = "923234567890";

const btnBase =
  "flex items-center justify-center w-[46px] h-[46px] rounded-[13px] flex-shrink-0 transition-all duration-200 active:scale-95";

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openChat = () =>
    window.dispatchEvent(new CustomEvent("open-mobile-chat"));

  const homeActive = isActive("/");
  const productsActive = isActive("/collections");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="mx-2 mb-3">
        <div
          className="flex items-center justify-between h-[64px] px-3 rounded-[16px]
            bg-[#f7f3ef]/88 dark:bg-[#1a1410]/70
            backdrop-blur-2xl
            border border-[#C8856A]/25 dark:border-[#C8856A]/15
            shadow-[0_2px_12px_rgba(31,107,79,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
            dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >

          {/* AI Chat */}
          <button
            onClick={openChat}
            aria-label="Open AI chat"
            className={`${btnBase} bg-[#1F6B4F]/10 dark:bg-[#1F6B4F]/22`}
          >
            <BsChatDots size={24} className="text-[#1F6B4F] dark:text-[#6ecfaa]" />
          </button>

          {/* Home */}
          <Link
            href="/"
            className={`${btnBase} ${
              homeActive
                ? "bg-[#1F6B4F]/18 dark:bg-[#2e9e72]/28"
                : "bg-[#1F6B4F]/10 dark:bg-[#1F6B4F]/20"
            }`}
          >
            <Home
              size={24}
              strokeWidth={homeActive ? 2.2 : 1.8}
              className="text-[#155c40] dark:text-[#7ddcb8]"
            />
          </Link>

          {/* Products */}
          <Link
            href="/collections"
            className={`${btnBase} ${
              productsActive
                ? "bg-[#1F6B4F]/16 dark:bg-[#2e9e72]/24"
                : "bg-[#1F6B4F]/10 dark:bg-[#1F6B4F]/18"
            }`}
          >
            <Grid3X3
              size={24}
              strokeWidth={productsActive ? 2.1 : 1.8}
              className="text-[#1F6B4F] dark:text-[#6ecfaa]"
            />
          </Link>

          {/* Phone */}
          <a
            href={`tel:+${PHONE_NUMBER}`}
            aria-label="Call us"
            className={`${btnBase} bg-[#C8856A]/14 dark:bg-[#C8856A]/20`}
          >
            <Phone
              size={24}
              strokeWidth={1.9}
              className="text-[#C8856A] dark:text-[#E8A882]"
            />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${PHONE_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`${btnBase} bg-[#25D366]/13 dark:bg-[#25D366]/18`}
          >
            <FaWhatsapp
              size={24}
              className="text-[#19a84e] dark:text-[#25D366]"
            />
          </a>

        </div>
      </div>
    </nav>
  );
}