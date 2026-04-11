import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "@esmate/shadcn/pkgs/lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#1E1F1C] border-t border-[#C6A24A]/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand / Logo */}
          <div className="space-y-4">
            <Link href="/" className="-m-1.5 p-1.5 block">
              <span className="sr-only">OrganoCity</span>
              <Image
                src="/logo/organocityBackup-white.png"
                alt="OrganoCity"
                width={150}
                height={150}
                className="max-w-[150px] h-auto"
              />
            </Link>

            <p className="text-sm text-[#F6F1E7] leading-relaxed max-w-xs">
              Experience the purest salt on earth, hand-mined from the foothills of the Himalayas in Pakistan.
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-[#F6F1E7] hover:text-[#C6A24A] transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#F6F1E7] hover:text-[#C6A24A] transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#F6F1E7] hover:text-[#C6A24A] transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-[#F6F1E7]">Shop</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <Link href="/collections" className="text-sm text-[#F6F1E7]/85 hover:text-[#F6F1E7] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/natural-pink-salt-lamps" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Salt Lamps
                </Link>
              </li>
              <li>
                <Link href="/collections/himalayan-pink-salt" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Edible Salt
                </Link>
              </li>
              <li>
                <Link href="/collections/himalayan-bath-salt-soap" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Bath & Spa
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-[#F6F1E7]">Customer Care</h3>
            <ul role="list" className="mt-4 space-y-2">
              
              <li>
                <Link href="/contact" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Contact Us
                </Link>
              </li>
               
              <li>
                <Link href="/about-us" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-[#F6F1E7]/85 hover:text-[#C6A24A] transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-[#F6F1E7] mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm text-[#F6F1E7]/85">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C6A24A] shrink-0" />
                <span>Swabi Topi Road, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#C6A24A] shrink-0" />
                <span>+92 317 1707418</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#C6A24A] shrink-0" />
                <span>organocitypk@gmail.com</span>
              </div>
            </div>
        </div>
        </div>

        <div className="mt-12 border-t border-[#C6A24A]/30 pt-8">
          <p className="text-center text-xs leading-5 text-[#F6F1E7]/75">
            &copy; {new Date().getFullYear()} OrganoCity. A Product of Mubarak Foods pvt Limited All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
