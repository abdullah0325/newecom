"use client";

import { useCart } from "@/lib/commerce";
import Link from "next/link";
import Image from "next/image";
import {
  CartCheckoutButton,
  CartCost,
  CartLineProvider,
  CartLineQuantity,
  Money,
} from "@/lib/commerce";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import { ShoppingBag, X } from "@esmate/shadcn/pkgs/lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const cart = useCart();
  const isCartEmpty = (cart?.totalQuantity ?? 0) === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#C6A24A]/20 bg-white/95 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#C6A24A]/15 bg-[#F6F1E7]/80 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#1F6B4F]" />
                <h2 className="text-xl font-semibold text-[#1E1F1C]">Your Cart</h2>
              </div>
              <Badge className="rounded-full bg-[#1F6B4F] px-3 py-1 text-xs font-medium text-[#F6F1E7]">
                {cart?.totalQuantity ?? 0} {(cart?.totalQuantity ?? 0) !== 1 ? "items" : "item"}
              </Badge>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 text-[#5A5E55] hover:bg-[#C6A24A]/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {isCartEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-[#C6A24A]/30 mb-4" />
                  <p className="text-lg font-medium text-[#1E1F1C]">Your cart is empty</p>
                  <p className="text-sm text-[#5A5E55] mt-1">Add some items to get started</p>
                  <Button
                    asChild
                    className="mt-6 rounded-full bg-[#1F6B4F] px-6 text-[#F6F1E7] hover:bg-[#17513D]"
                    onClick={() => onOpenChange(false)}
                  >
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.lines?.map((line) => (
                    <CartLineProvider key={line?.id} line={line!}>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F6F1E7] ring-1 ring-[#C6A24A]/20">
                            <Image
                              src={line?.merchandise?.image?.url as string}
                              alt={line?.merchandise?.image?.altText || ""}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/products/${line?.merchandise?.product?.handle}`}
                                onClick={() => onOpenChange(false)}
                                className="line-clamp-2 text-sm font-semibold leading-5 text-[#1E1F1C] transition hover:text-[#1F6B4F]"
                              >
                                {line?.merchandise?.product?.title}
                              </Link>
                              <button
                                onClick={() => line?.id && cart.removeLine(line.id)}
                                className="shrink-0 p-1 text-[#5A5E55] hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {line?.merchandise?.selectedOptions?.map((option) => (
                                <Badge
                                  key={option?.name}
                                  variant="secondary"
                                  className="rounded-full border border-[#C6A24A]/20 bg-[#F6F1E7] px-2 py-0.5 text-[10px] font-medium text-[#1E1F1C]"
                                >
                                  {option?.value}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => line?.id && cart.removeLine(line.id)}
                                  className="h-6 w-6 rounded-full border border-[#C6A24A]/25 flex items-center justify-center text-[#5A5E55] hover:bg-[#F6F1E7] text-xs"
                                >
                                  -
                                </button>
                                <span className="min-w-[24px] text-center text-sm font-medium">
                                  <CartLineQuantity />
                                </span>
                                <button
                                  onClick={() =>
                                    line?.merchandise?.id &&
                                    cart.linesAdd([{ merchandiseId: line.merchandise.id, quantity: 1 }])
                                  }
                                  className="h-6 w-6 rounded-full border border-[#C6A24A]/25 flex items-center justify-center text-[#5A5E55] hover:bg-[#F6F1E7] text-xs"
                                >
                                  +
                                </button>
                              </div>

                              <Money
                                data={line?.cost?.totalAmount}
                                className="shrink-0 text-sm font-semibold text-[#1E1F1C]"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-[#C6A24A]/15" />
                      </div>
                    </CartLineProvider>
                  ))}
                </div>
              )}
            </div>

            {!isCartEmpty && (
              <div className="border-t border-[#C6A24A]/15 bg-white px-5 py-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium text-[#1E1F1C]">
                    <span>Subtotal</span>
                    <CartCost amountType="subtotal" />
                  </div>

                  <p className="text-xs leading-5 text-[#5A5E55]">
                    Shipping and taxes calculated at checkout
                  </p>

                  <div className="space-y-2">
                    <CartCheckoutButton
                      className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1F6B4F] text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#17513D]"
                    >
                      Proceed to Checkout
                    </CartCheckoutButton>

                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-full border-[#C6A24A]/25 text-[#1E1F1C] hover:bg-[#F6F1E7]"
                      onClick={() => onOpenChange(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}