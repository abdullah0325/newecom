import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CertificatesMatters = () => {
  return (
    <section
      className={`${montserrat.className} flex flex-col items-center justify-center px-4 py-16 bg-[#F6F1E7] text-center`}
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1F1C] mb-6">
        Why These Certifications Matter
      </h2>

      {/* Description Text */}
      <div className="max-w-3xl text-[#5A5E55] leading-relaxed space-y-4 mb-10">
        <p className="text-lg">
          These certifications show our commitment to quality. They ensure that
          you are getting a product that is safe, pure, and natural. When you
          choose Pink Pantry, you can trust that you are making a healthy choice
          for you and your family.
        </p>
        <p className="text-lg">
          Explore our certified Himalayan Pink Salt products and see the
          difference quality makes.
        </p>
      </div>

      {/* Button Container */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/certificates"
          className="px-10 py-3 bg-[#1F6B4F] text-[#F6F1E7] font-medium rounded-md hover:bg-[#17513D] transition-colors min-w-[160px]"
        >
          Read More
        </Link>
        <Link
          href="/products"
          className="px-10 py-3 bg-[#1F6B4F] text-[#F6F1E7] font-medium rounded-md hover:bg-[#17513D] transition-colors min-w-[160px]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default CertificatesMatters;

