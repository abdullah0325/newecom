import type { Metadata } from "next"
import Image from "next/image"

export const revalidate = 60

/* =========================
   SEO Metadata
========================= */
export const metadata: Metadata = {
  title: "Quality & Safety Certificates | Organocity by Mubarak Foods",
  description:
    "Explore FDA, ISO 9001, ISO 22000, and Kosher certificates for Himalayan Pink Salt by Organocity, a brand of Mubarak Foods Pvt. Limited.",
  keywords: [
    "Himalayan Pink Salt Certificates",
    "FDA Certified Himalayan Salt",
    "ISO 9001 Salt Manufacturer",
    "ISO 22000 Food Safety",
    "Kosher Himalayan Salt",
    "Organocity",
    "Mubarak Foods Pvt Limited",
  ],
  openGraph: {
    title: "Himalayan Pink Salt Certifications | Organocity",
    description:
      "Official quality and food safety certifications of Organocity Himalayan Pink Salt by Mubarak Foods Pvt. Limited.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* =========================
   Certificates Data
========================= */
const certificates = [
  {
    src: "/certificates/Fda_Certificate.webp",
    title: "FDA Certification",
    description:
      "Certified by the U.S. Food and Drug Administration, ensuring compliance with international food safety and quality standards.",
  },
  {
    src: "/certificates/iso_9001_2015.webp",
    title: "ISO 9001:2015",
    description:
      "Demonstrates our commitment to a robust quality management system and continuous improvement.",
  },
  {
    src: "/certificates/iso_22000_mubarak_foods.webp",
    title: "ISO 22000",
    description:
      "Internationally recognized food safety management certification covering the entire supply chain.",
  },
  {
    src: "/certificates/kosher_mubarak_foods.webp",
    title: "Kosher Certification",
    description:
      "Confirms that our Himalayan Pink Salt meets strict kosher dietary requirements.",
  },
    {
    src: "/certificates/Incoraporation-Mubarak.png",
    title: "Incoraporation Certificate",
    description:
      "Confirms that our Himalayan Pink Salt meets strict incoraporation standards.",
  },{
  
    src: "/certificates/Test Report Of Table Salt.png",
    title: "Test Report of Table Salt",
    description:
      "Confirms that our Himalayan Pink Salt meets strict testing standards.",
  }
  ,{
  
    src: "/certificates/Test report of pink salt.png",
    title: "Test Report of Pink Salt",
    description:
      "Confirms that our Himalayan Pink Salt meets strict testing standards.",
  }
  ,{
  
    src: "/certificates/Food safety and halal food Authority.png",
    title: "Food Safety and Halal Food Authority",
    description:
      "Confirms that our Himalayan Pink Salt meets strict food safety and halal standards.",
  }
  ,{
  
    src: "/certificates/Test of Denader pink Salt.png",
    title: "Test of Denader Pink Salt",
    description:
      "Confirms that our Himalayan Pink Salt meets strict testing standards.",
  },
  {
    src: "/certificates/PCSIR Test Report – Majoon Herbal Product.png",
    title: "PCSIR Test Report – Majoon Herbal Product",
    description:"Laboratory analysis report for Majoon (Herbal Sexi Digesto Vital), confirming tested steroid contents under PCSIR standards."
  },
  {
    src: "/certificates/PCSIR Chemical Analysis Certificate.png",
    title: "PCSIR Chemical Analysis Certificate",
    description:"Certified lab report verifying chemical composition and safety parameters of the submitted herbal product sample."
  },
  {
    src: "/certificates/PCSIR Quality Testing Report.png",  
    title: "PCSIR Quality Testing Report",
    description:"Official testing document confirming quality assessment and compliance checks of the product."
  },
  {
    src: "/certificates/PCSIR Laboratory Test Certificate.png",
    title: "PCSIR Laboratory Test Certificate",
    description:"Detailed laboratory evaluation report ensuring the product meets required testing standards."
  },
  {
    src: "/certificates/PCSIR Product Safety Report.png",
    title: "PCSIR Product Safety Report",
    description:"Safety analysis report highlighting tested ingredients and compliance with laboratory protocols."
  },
  {
    src: "/certificates/PCSIR Analytical Report.png",
    title: "PCSIR Analytical Report",
    description:"Professional analytical report covering detailed examination of product contents and quality."
  },
  {
    src: "/certificates/PCSIR Certification Report.png",
    title: "PCSIR Certification Report",
    description:"Final certification document confirming laboratory testing and verification of the submitted sample."
  }
]

/* =========================
   Page Component
========================= */
export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F1E7] via-white to-[#F6F1E7] py-20">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1E1F1C] mb-6">
            Quality & Safety Certifications
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-[#5A5E55]">
            Organocity is a premium brand of Himalayan Pink Salt by
            <strong> Mubarak Foods Pvt. Limited</strong>. Our products are backed
            by internationally recognized certifications that ensure quality,
            safety, and compliance at every stage.
          </p>
        </header>

        {/* Intro Content */}
        <section className="prose prose-lg mx-auto text-center mb-20 text-[#1E1F1C]">
          <h2 className="text-[#1E1F1C]">Our Commitment to Excellence</h2>
          <p className="text-[#5A5E55]">
            At Organocity, we believe quality is not optional. From sourcing
            Himalayan Pink Salt at its origin to final packaging, our processes
            are audited and certified by leading global authorities. These
            certifications reflect our dedication to food safety, hygiene, and
            customer trust.
          </p>
        </section>

        {/* Certificates Grid */}
        <section className="grid md:grid-cols-2 gap-12">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-[#C6A24A]/30 p-6 text-center"
            >
              <Image
                src={cert.src}
                alt={cert.title}
                width={1200}
                height={1600}
                className="w-full h-auto object-contain mb-6"
                priority={index === 0}
              />
              <h3 className="text-2xl font-semibold text-[#1F6B4F] mb-3">
                {cert.title}
              </h3>
              <p className="text-[#5A5E55]">
                {cert.description}
              </p>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}

