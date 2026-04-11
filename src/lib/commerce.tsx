"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ProductData = {
  handle: string;
  title: string;
  variants: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
      price: MoneyV2;
      compareAtPrice: MoneyV2 | null;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
      image: {
        id: string;
      } | null;
    }>;
  };
  images: {
    nodes: Array<{
      id: string;
      url: string;
      altText: string | null;
    }>;
  };
};

type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyV2;
  };
  merchandise: {
    id: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    product: {
      handle: string;
      title: string;
    };
    price: MoneyV2;
  };
};

type CartContextValue = {
  lines: CartLine[];
  totalQuantity: number;
  linesAdd: (
    lines: Array<{
      merchandiseId: string;
      quantity: number;
    }>,
  ) => Promise<void>;
  removeLine: (lineId: string) => void;
  clear: () => void;
  registerProduct: (product: ProductData) => void;
};

type CartLineContextValue = {
  line: CartLine;
  removeLine: (lineId: string) => void;
};

const CART_STORAGE_KEY = "organocity-cart";

const CartContext = createContext<CartContextValue | null>(null);
const CartLineContext = createContext<CartLineContextValue | null>(null);

function formatAmount(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount);
}

function calculateLineTotal(price: MoneyV2, quantity: number): MoneyV2 {
  return {
    amount: (Number(price.amount) * quantity).toFixed(2),
    currencyCode: price.currencyCode,
  };
}

export function Money({
  data,
  className,
}: {
  data: MoneyV2 | null | undefined;
  className?: string;
}) {
  if (!data) {
    return null;
  }

  return <span className={className}>{formatAmount(Number(data.amount), data.currencyCode)}</span>;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [productRegistry, setProductRegistry] = useState<Record<string, ProductData>>({});

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as CartLine[];
      if (Array.isArray(parsed)) {
        setLines(parsed);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const registerProduct = useCallback((product: ProductData) => {
    setProductRegistry((current) => ({
      ...current,
      [product.handle]: product,
    }));
  }, []);

  const linesAdd: CartContextValue["linesAdd"] = async (incomingLines) => {
    setLines((current) => {
      const nextLines = [...current];

      for (const incomingLine of incomingLines) {
        const product = Object.values(productRegistry).find((registeredProduct) =>
          registeredProduct.variants.nodes.some(
            (variant) => variant.id === incomingLine.merchandiseId,
          ),
        );

        const variant = product?.variants.nodes.find(
          (candidate) => candidate.id === incomingLine.merchandiseId,
        );

        if (!product || !variant) {
          toast.error("This product is not ready for cart storage yet.");
          continue;
        }

        const currentImageId = variant.image?.id;
        const image =
          product.images.nodes.find((candidate) => candidate.id === currentImageId) ??
          product.images.nodes[0] ??
          null;

        const existingLine = nextLines.find(
          (line) => line.merchandise.id === incomingLine.merchandiseId,
        );

        if (existingLine) {
          existingLine.quantity += incomingLine.quantity;
          existingLine.cost.totalAmount = calculateLineTotal(
            existingLine.merchandise.price,
            existingLine.quantity,
          );
          continue;
        }

        nextLines.push({
          id: `${incomingLine.merchandiseId}`,
          quantity: incomingLine.quantity,
          cost: {
            totalAmount: calculateLineTotal(variant.price, incomingLine.quantity),
          },
          merchandise: {
            id: incomingLine.merchandiseId,
            image: image
              ? {
                  url: image.url,
                  altText: image.altText,
                }
              : null,
            selectedOptions: variant.selectedOptions,
            product: {
              handle: product.handle,
              title: product.title,
            },
            price: variant.price,
          },
        });
      }

      return nextLines;
    });
  };

  const removeLine = (lineId: string) => {
    setLines((current) => current.filter((line) => line.id !== lineId));
  };

  const clear = () => {
    setLines([]);
  };

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
      linesAdd,
      removeLine,
      clear,
      registerProduct,
    }),
    [lines, productRegistry],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export function ProductProvider({
  data,
  children,
}: {
  data: ProductData;
  children: ReactNode;
}) {
  const { registerProduct } = useCart();

  useEffect(() => {
    registerProduct(data);
  }, [data, registerProduct]);

  return <>{children}</>;
}

export function CartLineProvider({
  line,
  children,
}: {
  line: CartLine;
  children: ReactNode;
}) {
  const { removeLine } = useCart();
  return (
    <CartLineContext.Provider value={{ line, removeLine }}>
      {children}
    </CartLineContext.Provider>
  );
}

function useCartLine() {
  const context = useContext(CartLineContext);
  if (!context) {
    throw new Error("Cart line components must be used within CartLineProvider");
  }

  return context;
}

export function CartLineQuantity() {
  const { line } = useCartLine();
  return <>{line.quantity}</>;
}

export function CartLineQuantityAdjustButton({
  adjust,
  className,
  children,
}: {
  adjust: "remove";
  className?: string;
  children: ReactNode;
}) {
  const { line, removeLine } = useCartLine();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (adjust === "remove") {
          removeLine(line.id);
        }
      }}
    >
      {children}
    </button>
  );
}

export function CartCost({ amountType }: { amountType: "subtotal" }) {
  const { lines } = useCart();
  const subtotal = lines.reduce(
    (sum, line) => sum + Number(line.cost.totalAmount.amount),
    0,
  );

  if (amountType !== "subtotal") {
    return null;
  }

  return (
    <Money
      data={{
        amount: subtotal.toFixed(2),
        currencyCode: lines[0]?.cost.totalAmount.currencyCode ?? "PKR",
      }}
    />
  );
}

export function CartCheckoutButton({
  children,
  className,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={() => router.push("/checkout")}
    >
      {children}
    </button>
  );
}
