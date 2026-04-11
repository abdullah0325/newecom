import { getProduct } from "@/lib/storefront";
import { invariant } from "@esmate/utils";

export async function getProductSingle(handle: string) {
  const product = await getProduct(handle);
  invariant(product, "product is not available");
  return product;
}

