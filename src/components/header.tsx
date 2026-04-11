"use client";

import { useCart } from "@/lib/commerce";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  ChevronDown,
} from "@esmate/shadcn/pkgs/lucide-react";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@esmate/shadcn/components/ui/sheet";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import { SearchDialog } from "./search-dialog";
import Image from "next/image";

const mainMenuItems = [
  { text: "Home", href: "/" },
  { text: "Benefits", href: "/benefits" },
  { text: "Blogs", href: "/blogs" },
  { text: "About Us", href: "/about-us" },
  { text: "Contact Us", href: "/contact" },
  { text: "Certificates", href: "/certificates" },
  { text: "Bulk Order", href: "/bulk-order" },
  { text: "Co-message", href: "/co-message" },
];

const shopItems = [
  {
    text: "Salt Lamps",
    href: "/collections/natural-pink-salt-lamps",
    image: "/graphics/organocity-spa.webp",
  },
  {
    text: "Edible Salt",
    href: "/collections/himalayan-pink-salt",
    image: "/graphics/organocity-kitchen-salt.webp",
  },
  {
    text: "Bath Salt",
    href: "/collections/himalayan-bath-salt-soap",
    image: "/graphics/essence-two.png",
  },
  {
    text: "Inhaler",
    href: "/collections/himalayan-salt-inhaler",
    image: "/graphics/Himalayan salt inhaler.jpg",
  },
  {
    text: "Shilajit",
    href: "/collections/pure-himalayan-shilajit",
    image: "/graphics/shilajit.jpg",
  },
];

export function Header() {
  const pathname = usePathname();
  const { totalQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#F6F1E7] border-b border-[#C6A24A]/20">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-[#1E1F1C] hover:text-[#1F6B4F]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[320px] border-r-0 bg-[#F6F1E7] p-0"
            >
                <SheetTitle className="sr-only">Mobile menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Logo in Mobile Menu */}
                <div className="p-6">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <div className="relative h-14 w-[130px]">
                      <Image
                        src="/logo/organocityBackup.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        pathname === "/"
                          ? "bg-[#1F6B4F]/10 text-[#1F6B4F]"
                          : "hover:bg-white/60 text-[#1E1F1C]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>

                    {/* Shop Section in Mobile */}
                    <div className="mt-4">
                      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#5A5E55]">
                        Shop Categories
                      </div>

                      <div className="space-y-1">
                        {shopItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                              isActive(item.href)
                                ? "bg-[#1F6B4F]/10 text-[#1F6B4F]"
                                : "hover:bg-white/60 text-[#1E1F1C]"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="relative h-8 w-8 overflow-hidden rounded border border-[#C6A24A]/25">
                              <Image
                                src={item.image}
                                alt={item.text}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{item.text}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Other Menu Items */}
                    <div className="mt-6 border-t border-[#C6A24A]/25 pt-4">
                      {mainMenuItems
                        .filter((i) => i.text !== "Home")
                        .map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              isActive(item.href)
                                ? "bg-[#1F6B4F]/10 text-[#1F6B4F]"
                                : "hover:bg-white/60 text-[#1E1F1C]"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.text}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="border-t border-[#C6A24A]/25 p-6">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-[#1E1F1C] hover:text-[#1F6B4F]"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSearchOpen(true);
                      }}
                    >
                      <Search className="h-5 w-5" />
                    </Button>

                    <Link
                      href="/cart"
                      className="relative text-[#1E1F1C] hover:text-[#1F6B4F] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingCart className="h-6 w-6" />
                      {!!totalQuantity && (
                        <Badge className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full p-0 text-xs bg-[#1F6B4F] text-[#F6F1E7]">
                          {totalQuantity}
                        </Badge>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex flex-1 justify-center lg:justify-start">
       <div className="relative h-16 w-[160px] lg:h-28 lg:w-[170px]">
            <Image
              src="/logo/organocityBackup.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors hover:text-[#1F6B4F] ${
              pathname === "/" ? "text-[#1F6B4F]" : "text-[#1E1F1C]"
            }`}
          >
            Home
          </Link>

          {/* Compact Mega Menu */}
          <div className="relative">
            <div className="group">
              <div className="flex cursor-pointer items-center gap-1">
                <Link
                  href="/products"
                  className={`text-sm font-semibold transition-colors hover:text-[#1F6B4F] ${
                    isActive("/collections") || isActive("/products")
                      ? "text-[#1F6B4F]"
                      : "text-[#1E1F1C]"
                  }`}
                >
                  Shop
                </Link>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 text-[#5A5E55]" />
              </div>

              {/* Hover buffer */}
              <div className="absolute left-1/2 top-full h-4 w-32 -translate-x-1/2" />

              {/* Compact Mega Menu Dropdown */}
              <div className="absolute left-1/2 top-full z-50 mt-4 w-[560px] -translate-x-1/2 opacity-0 pointer-events-none scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100">
                <div className="overflow-hidden rounded-xl border border-[#C6A24A]/25 bg-white p-2 shadow-2xl">
                  <div className="grid grid-cols-4 gap-0.5 p-0.5">
                    {shopItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative m-1 flex flex-col items-center rounded-lg p-3 transition-all hover:bg-[#1F6B4F]/5 hover:shadow-sm ${
                          isActive(item.href) ? "bg-[#1F6B4F]/5" : ""
                        }`}
                      >
                        <div className="relative mb-2 h-14 w-14 overflow-hidden rounded-full border border-[#C6A24A]/25">
                          <Image
                            src={item.image}
                            alt={item.text}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="56px"
                          />
                        </div>

                        <p
                          className={`text-center text-xs font-semibold leading-tight ${
                            isActive(item.href)
                              ? "text-[#1F6B4F]"
                              : "text-[#1E1F1C]"
                          }`}
                        >
                          {item.text}
                        </p>

                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-transparent transition-all group-hover:ring-[#1F6B4F]/20" />
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[#C6A24A]/20 bg-[#F6F1E7]/40 p-3">
                    <Link
                      href="/collections"
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#5A5E55] transition-colors hover:text-[#1F6B4F]"
                    >
                      View all products
                      <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Desktop Menu Items */}
          {mainMenuItems
            .filter((i) => i.text !== "Home")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors hover:text-[#1F6B4F] ${
                  isActive(item.href) ? "text-[#1F6B4F]" : "text-[#1E1F1C]"
                }`}
              >
                {item.text}
              </Link>
            ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex flex-1 justify-end gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-[#1E1F1C] hover:text-[#1F6B4F]"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 text-[#1E1F1C] hover:text-[#1F6B4F]"
            >
              <ShoppingCart className="h-5 w-5" />
              {!!totalQuantity && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full border-2 border-white bg-[#1F6B4F] p-0 text-xs text-[#F6F1E7]">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
