"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CartCheckoutButton,
  CartCost,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  Money,
  useCart,
} from "@/lib/commerce";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Badge } from "@esmate/shadcn/components/ui/badge";

export function Cart() {
  const cart = useCart();
  const isCartEmpty = (cart?.totalQuantity ?? 0) === 0;

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <Card className="overflow-hidden rounded-3xl border border-[#C6A24A]/20 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <CardHeader className="border-b border-[#C6A24A]/15 bg-[#F6F1E7]/60 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl font-semibold text-[#1E1F1C]">
                Your Cart
              </CardTitle>

              <Badge className="rounded-full bg-[#1F6B4F] px-3 py-1 text-xs font-medium text-[#F6F1E7] hover:bg-[#1F6B4F]">
                {cart?.totalQuantity ?? 0} item
                {(cart?.totalQuantity ?? 0) !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="max-h-[65vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            {cart.lines?.map((line) => (
              <CartLineProvider key={line?.id} line={line!}>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#F6F1E7] ring-1 ring-[#C6A24A]/20">
                      <Image
                        src={line?.merchandise?.image?.url as string}
                        alt={line?.merchandise?.image?.altText || ""}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/products/${line?.merchandise?.product?.handle}`}
                          className="line-clamp-2 text-sm font-semibold leading-6 text-[#1E1F1C] transition hover:text-[#1F6B4F]"
                        >
                          {line?.merchandise?.product?.title}
                        </Link>

                        <Money
                          data={line?.cost?.totalAmount}
                          className="shrink-0 text-sm font-semibold text-[#1E1F1C]"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {line?.merchandise?.selectedOptions?.map((option) => (
                          <Badge
                            key={option?.name}
                            variant="secondary"
                            className="rounded-full border border-[#C6A24A]/20 bg-[#F6F1E7] px-2.5 py-1 text-[11px] font-medium text-[#1E1F1C]"
                          >
                            {option?.name}: {option?.value}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="rounded-full bg-[#F6F1E7] px-3 py-1.5 text-xs font-medium text-[#5A5E55]">
                          Qty <CartLineQuantity />
                        </div>

                        <CartLineQuantityAdjustButton
                          adjust="remove"
                          className="inline-flex h-9 items-center justify-center rounded-full border border-[#C6A24A]/25 px-4 text-xs font-semibold text-[#5A5E55] transition hover:bg-[#F6F1E7] hover:text-[#1E1F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B4F] disabled:pointer-events-none disabled:opacity-50"
                        >
                          Remove
                        </CartLineQuantityAdjustButton>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[#C6A24A]/15" />
                </div>
              </CartLineProvider>
            ))}

            {isCartEmpty && (
              <div className="rounded-2xl bg-[#F6F1E7] px-5 py-10 text-center">
                <p className="text-sm text-[#5A5E55]">Your cart is empty.</p>

                <Button
                  asChild
                  className="mt-4 rounded-full bg-[#1F6B4F] px-6 text-[#F6F1E7] hover:bg-[#17513D]"
                >
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-[#C6A24A]/15 bg-white px-5 py-5 sm:px-6">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-[#1E1F1C]">
                <span>Subtotal</span>
                <CartCost amountType="subtotal" />
              </div>

              <p className="text-xs leading-5 text-[#5A5E55]">
                Shipping and taxes calculated at checkout.
              </p>

              <CartCheckoutButton
                disabled={isCartEmpty}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1F6B4F] text-sm font-semibold text-[#F6F1E7] transition hover:bg-[#17513D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B4F] disabled:pointer-events-none disabled:opacity-50"
              >
                Checkout
              </CartCheckoutButton>

              <Button
                variant="link"
                asChild
                className="h-auto w-full px-0 text-sm font-medium text-[#1F6B4F] hover:text-[#17513D]"
              >
                <Link href="/products">Continue shopping →</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

