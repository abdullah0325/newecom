import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionProductList } from "./collection-product-list";
import { getCollection, getCollectionProducts } from "./service";

export const revalidate = 60;

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle: routeHandle } = await params;
  const collectionHandle = routeHandle;

  try {
    const collection = await getCollection(collectionHandle);
    return {
      title: collection.title,
      description: collection.description || `Products in ${collection.title}`,
    };
  } catch {
    return {
      title: "Collection Not Found",
    };
  }
}

export default async function Page({ params }: Props) {
  const { handle: routeHandle } = await params;
  const collectionHandle = routeHandle;

  let collection;
  let products;

  try {
    // Fetch parallel
    [collection, products] = await Promise.all([
      getCollection(collectionHandle),
      getCollectionProducts(collectionHandle),
    ]);
  } catch (e) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{collection.title}</h1>
        {collection.description && (
          <p className="mt-4 text-lg text-muted-foreground">{collection.description}</p>
        )}
      </div>
      <CollectionProductList handle={collectionHandle} data={products} />
    </div>
  );
}

