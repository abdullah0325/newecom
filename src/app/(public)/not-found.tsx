"use client";

import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { Home, PackageSearch } from "@esmate/shadcn/pkgs/lucide-react";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found – OrganoCity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://organocity.com/404" />
        <link
          rel="icon"
          type="image/png"
          href="//mobarakfoods.com/cdn/shop/files/mubarak_foods_logo-removebg-preview.png?crop=center&height=32&v=1764223344&width=32"
        />

        <meta property="og:site_name" content="OrganoCity" />
        <meta property="og:url" content="https://organocity.com/404" />
        <meta property="og:title" content="404 Not Found" />
        <meta
          property="og:description"
          content="The page you’re looking for could not be found."
        />
        <meta
          property="og:image"
          content="https://mobarakfoods.com/cdn/shop/files/mubarak_foods_logo-removebg-preview.png?height=628&width=1200"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative mb-10 mt-10 min-h-screen bg-[#F6F1E7] overflow-hidden flex items-center justify-center px-4">
        <div className="absolute inset-0 flex items-center justify-center"></div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-xl"
        >
          <Card className="bg-white/90 mb-2 border border-[#C6A24A]/40 rounded-2xl">
            <CardHeader className="pt-10 px-6 sm:px-10 text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#F6F1E7] shadow-inner">
                <PackageSearch className="h-10 w-10 sm:h-12 sm:w-12 text-[#1F6B4F]" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-5xl sm:text-6xl font-bold text-[#1E1F1C]">
                  404
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-[#5A5E55]">
                  This salt crystal could not be found
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 sm:px-10 pt-6 pb-8 text-center">
              <p className="text-sm sm:text-base text-[#5A5E55] leading-relaxed">
                The page you’re looking for no longer exists or was never mined.
                But our pure Himalayan pink salt is still here, naturally sourced
                and waiting for you.
              </p>

              <div className="mt-8 flex justify-center">
                <div className="h-1 w-28 sm:w-32 rounded-full bg-gradient-to-r from-[#C6A24A] to-[#1F6B4F]" />
              </div>
            </CardContent>

            <CardFooter className="pb-10 flex justify-center">
              <Button
                asChild
                className="bg-[#1F6B4F] hover:bg-[#17513D] text-[#F6F1E7] px-8 py-6 text-sm sm:text-base shadow-xl rounded-full"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to OrganoCity
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

