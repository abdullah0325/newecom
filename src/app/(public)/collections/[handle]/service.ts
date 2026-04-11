
import {
  getCollection as getCollectionFromDb,
  getCollectionProducts as getCollectionProductsFromDb,
} from "@/lib/storefront";
import { invariant } from "@esmate/utils";

export async function getCollection(handle: string) {
  const collection = await getCollectionFromDb(handle);
  invariant(collection, "Collection not found");
  return collection;
}

export async function getCollectionProducts(handle: string, cursor?: string) {
  const products = await getCollectionProductsFromDb(handle, cursor);
  invariant(products, "Products not found");
  return products;
}

