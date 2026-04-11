import { Metadata } from "next";
import { CollectionList } from "./collection-list";
import { getCollectionList } from "./service";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Collections | OrganoCity Himalayan Pink Salt",
  description:
    "Explore all OrganoCity collections including Himalayan pink salt lamps, edible salt, bath salts, wellness products, and natural lifestyle essentials.",
  keywords: [
    "OrganoCity collections",
    "Himalayan pink salt products",
    "salt lamps",
    "edible pink salt",
    "bath salts",
    "natural wellness products",
    "Pakistan pink salt supplier",
  ],
  alternates: {
    canonical: "https://organocity.com/collections",
  },
  openGraph: {
    title: "All Collections | OrganoCity",
    description:
      "Discover OrganoCity’s complete range of Himalayan pink salt collections crafted for wellness, lifestyle, and everyday use.",
    url: "https://organocity.com/collections",
    siteName: "OrganoCity",
    type: "website",
    images: [
      {
        url: "https://organocity.com/og/collections.jpg",
        width: 1200,
        height: 630,
        alt: "OrganoCity Himalayan Pink Salt Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Collections | OrganoCity",
    description:
      "Browse all OrganoCity Himalayan pink salt collections for health, home, and lifestyle.",
    images: ["https://organocity.com/og/collections.jpg"],
  },
};

export default async function Page() {
  const data = await getCollectionList();

  return (
    <div className="bg-background">
      {/* Intro Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Collections
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Explore our carefully curated collections of authentic Himalayan
            pink salt products. From natural wellness essentials to beautifully
            crafted salt lamps and edible salts, each collection reflects our
            commitment to purity, quality, and sustainable sourcing.
          </p>
        </div>
      </section>

      {/* Collections List */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <CollectionList data={data} />
      </section>

      {/* SEO Content Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground">
            Authentic Himalayan Pink Salt Collections
          </h2>
          <p>
            OrganoCity sources premium Himalayan pink salt directly from the
            ancient salt mines of Pakistan. Our collections include edible salt
            for cooking, wellness and spa products, decorative salt lamps, and
            lifestyle accessories designed to support a natural and balanced
            way of living.
          </p>
          <p>
            Whether you are looking for bulk supply, retail products, or
            wellness solutions, our collections are crafted to meet
            international quality standards while preserving the natural
            mineral richness of Himalayan salt.
          </p>
        </div>
      </section>
    </div>
  );
}

