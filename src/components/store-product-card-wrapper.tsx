"use client";

import dynamic from "next/dynamic";

const StoreProductCard = dynamic(
  () => import("@/components/store-product-card").then((m) => ({ default: m.StoreProductCard })),
  { ssr: false }
);

export { StoreProductCard };