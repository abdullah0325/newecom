import React from "react";
import Image from "next/image";

const PureOfferings = () => {
  const offerings = [
    {
      title: "Balanced Hydration",
      description:
        "Maintains electrolyte balance, promoting optimal hydration levels for the body.",
      image: "/graphics/organocity-plates.webp",
    },
    {
      title: "Improved Digestion",
      description:
        "Supports digestive health by stimulating enzyme production and aiding in nutrient absorption.",
      image: "/graphics/organocity-kitchen-salt.webp",
    },
    {
      title: "Rich Mineral Content",
      description:
        "Packed with essential minerals like calcium, magnesium, and potassium, aiding in overall health.",
      image: "/graphics/essence-three.png",
    },
    {
      title: "Detoxification",
      description:
        "Helps cleanse the body by flushing out toxins and promoting healthy liver function.",
      image: "/graphics/essence-two.png",
    },
    {
      title: "Enhanced Flavor",
      description:
        "Elevates the taste of dishes with its unique mineral profile, enhancing culinary experiences.",
      image: "/graphics/organocity-jugwater.webp",
    },
    {
      title: "Skin Health",
      description:
        "Soothes skin conditions like eczema and psoriasis, leaving skin feeling soft and rejuvenated.",
      image: "/graphics/organocity-spa.webp",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4  font-sans text-[#1E1F1C] bg-[#F6F1E7]">
      {/* Header Section */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#1E1F1C]">
        Discover Our Pure Offerings
      </h2>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {offerings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-lg overflow-hidden shadow-sm border border-[#C6A24A]/30 p-6"
          >
            <div className="relative w-full h-48 mb-6">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-lg font-bold mb-3 uppercase tracking-wide text-[#1E1F1C]">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#5A5E55] px-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#C6A24A]/30 mb-20" />

      {/* Hero Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-full md:w-1/2 h-[400px]">
          <Image
            src="/graphics/himalayan-pink-salt-top-view.webp"
            alt="Himalayan Salt Rocks"
            fill
            className="object-cover rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-[#1E1F1C]">
            Himalayan Pink Salt
          </h2>
          <div className="space-y-4 text-[#5A5E55] leading-relaxed">
            <p>
              Discover the natural benefits of Himalayan Pink Salt, harvested
              from ancient sea beds deep within the Himalayas. Renowned for its
              vibrant pink hue and rich mineral content, this pure, unrefined
              salt enhances your dishes, supports wellness, and adds elegance to
              your home.
            </p>
            <p className="pt-4">
              <span className="font-bold text-[#1E1F1C]">Tip:</span> Our salt is
              free of anti-caking agents, so it may naturally clump. Simply store
              it in an airtight container to keep it fresh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PureOfferings;
