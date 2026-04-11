import { ReactNode } from "react";
import Providers from "../components/providers";
import "./globals.css";
import type { Metadata } from "next";
import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegistration from "@/components/service-worker-registration";

export const metadata: Metadata = {
  title: "OrganoCity",
  description: "Premium Himalayan Pink Salt Products",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OrganoCity",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OrganoCity" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#C6A24A" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <InstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
