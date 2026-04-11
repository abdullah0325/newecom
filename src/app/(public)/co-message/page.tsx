import React from "react";

export default function CoMessagePage() {
  return (
    <div className="bg-[#F6F1E7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r  py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-gray-600 shadow-sm ring-1 ring-gray-200">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Himalayan Pink Salt • Natural Wellness Essentials
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5 mb-4">
              Founder&apos;s Message
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connecting Nature&apos;s Purity with Your Wellness — built on trust, quality, and consistency.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#founder-message"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-green-700 transition"
              >
                Read the Message
              </a>
              <a
                href="#why-choose"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-gray-900 font-semibold shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition"
              >
                Why Organocity
              </a>
            </div>
          </div>

          {/* Quick Trust Badges */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Premium & Authentic", desc: "Naturally sourced Himalayan minerals" },
              { title: "Quality-First", desc: "Consistent standards & safe handling" },
              { title: "Retail + Bulk", desc: "Individuals & businesses supported" },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-white/80 rounded-xl p-5 shadow-sm ring-1 ring-gray-200"
              >
                <p className="font-semibold text-gray-900">{b.title}</p>
                <p className="text-sm text-gray-600 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message with Image */}
      <section id="founder-message" className="py-16 px-6 bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-start">
          {/* Image Card */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
              {/* Replace with your founder/CEO image */}
              <img
                src="/graphics/co.png"
                alt="Founder of Organocity"
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <p className="text-lg font-bold text-gray-900">[Ihsan ul haq]</p>
                <p className="text-sm text-gray-600">Founder – Organocity</p>

                <div className="mt-4 rounded-xl bg-green-50 p-4 ring-1 ring-green-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    “At Organocity, we deliver genuine Himalayan Pink Salt and wellness essentials
                    with uncompromising purity, responsible handling, and customer trust at the center.”
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-4 bg-[#F6F1E7] rounded-2xl shadow-sm ring-1 ring-gray-200 p-5">
              <p className="text-sm font-semibold text-gray-900">Quick Links</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="/collections"
                  className="rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-semibold hover:bg-green-700 transition"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="rounded-lg bg-white px-4 py-2 text-gray-900 text-sm font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition"
                >
                  Contact Us
                </a>
                <a
                  href="/bulk-order"
                  className="rounded-lg bg-white px-4 py-2 text-gray-900 text-sm font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition"
                >
                  Bulk & B2B
                </a>
              </div>
            </div>
          </div>

          {/* Message Text */}
          <div className="md:col-span-8">
            <h2 className="text-3xl font-bold text-shadow-black mb-6">Our Story</h2>

            <div className="space-y-4 ">
              <p className="text-gray-700 leading-relaxed">
                Founded in 2018, Organocity was built on a simple belief: nature’s purest offerings deserve to reach those who value authenticity. What began as a vision to bring Himalayan mineral treasures to customers has grown into a trusted brand serving individuals and businesses with the same commitment to excellence
              </p>

              <p className="text-gray-700 leading-relaxed">
                We are dedicated to sourcing authentic Himalayan Pink Salt and wellness essentials,
                maintaining consistent standards of purity and quality at every step. For us, it’s not only
                about products—it’s about building long-term trust through transparency, reliability, and
                a premium customer experience.
              </p>

              <p className="text-gray-700 leading-relaxed">
                As we look ahead, we remain grateful for the trust you’ve placed in us. We will continue
                improving our processes, expanding our range, and delivering products that reflect our
                promise: quality you can trust, delivered with care.
              </p>

              <div className="pt-2">
                <p className="text-gray-900 font-semibold">Warm regards,</p>
                <p className="text-gray-900 font-bold">[Ihsan ul Haq]</p>
                <p className="text-gray-600">Founder – Organocity</p>
              </div>
            </div>

            {/* Small highlight cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Our Promise",
                  desc: "Authentic sourcing, consistent standards, and a premium experience from order to delivery.",
                },
                {
                  title: "Built on Trust",
                  desc: "Clear communication, hygienic handling, and customer-first service for long-term relationships.",
                },
              ].map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 ring-1 ring-gray-200">
                  <p className="font-bold text-gray-900">{c.title}</p>
                  <p className="text-sm text-gray-600 mt-2">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the Company */}
      <section className="py-16 px-6 bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                About
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">About Organocity</h2>
            </div>
            <p className="text-gray-600 max-w-2xl">
              A Himalayan wellness brand built for premium retail and professional supply—focused on authenticity and consistency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What We Do</h3>
              <p className="text-gray-700 leading-relaxed">
                Organocity offers Himalayan Pink Salt, Salt Lamps, Bath Salts, Shilajit, and mineral-based
                wellness essentials. We serve individuals and businesses with dependable quality, safe
                packaging, and professional support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Who We Serve</h3>
              <p className="text-gray-700 leading-relaxed">
                Whether you’re purchasing for home wellness or sourcing for your business, we provide a
                consistent product experience backed by transparent practices and customer commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become a globally trusted name in Himalayan mineral and wellness products—recognized for
                purity, authenticity, and consistent quality, while supporting responsible sourcing and
                long-term sustainability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To deliver premium natural products that exceed expectations through careful sourcing,
                hygienic handling, quality assurance, and a customer-first experience—continuously improving
                with innovation and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Principles</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Core Values</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Integrity",
                description:
                  "We operate with transparency and honesty, building trust through ethical practices and responsible decisions.",
              },
              {
                title: "Quality Excellence",
                description:
                  "We maintain consistent standards in sourcing, processing, and packaging to ensure reliable performance in every product.",
              },
              {
                title: "Customer Commitment",
                description:
                  "We prioritize your satisfaction through responsive support, clear communication, and continuous improvement.",
              },
              {
                title: "Sustainability",
                description:
                  "We promote responsible sourcing and mindful practices that create long-term benefits for people and the environment.",
              },
              {
                title: "Innovation",
                description:
                  "We adopt modern methods and learning to improve quality, develop better solutions, and meet evolving customer needs.",
              },
              {
                title: "Transparency",
                description:
                  "We communicate openly about sourcing and processes so customers can buy with confidence.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-green-600 text-white font-bold flex items-center justify-center">
                    {value.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Quality */}
      <section className="py-16 px-6 bg-[#F6F1E7]" id="quality">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Commitment to Quality</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Himalayan Sourcing",
                description:
                  "We focus on authentic Himalayan sourcing and partner with reliable suppliers to maintain purity and origin.",
              },
              {
                title: "Quality Checks",
                description:
                  "We maintain quality checks to ensure consistency and dependable standards across batches and grades.",
              },
              {
                title: "Careful Handling",
                description:
                  "Our processes are designed to protect natural mineral integrity and maintain product cleanliness and safety.",
              },
              {
                title: "Safe Packaging",
                description:
                  "Hygienic, sealed packaging protects purity and helps maintain freshness from our facility to your doorstep.",
              },
              {
                title: "Consistency & Reliability",
                description:
                  "Our goal is to deliver the same trusted quality every time—whether retail orders or business supply.",
              },
              {
                title: "Customer-First Standards",
                description:
                  "We continuously improve based on customer needs, ensuring a better product and service experience over time.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 ring-1 ring-gray-200">
                <div className="border-l-4 border-green-600 pl-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-[#F6F1E7]" id="why-choose">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose Organocity</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Premium purity and mineral richness in every product",
              "Competitive pricing without compromising quality",
              "Reliable sourcing and consistent supply capability",
              "Dedicated customer support and after-sales service",
              "Bulk supply options for businesses and enterprises",
              "Transparent sourcing and quality documentation (where applicable)",
              "Fast, secure delivery with careful packaging",
            ].map((item, index) => (
              <div key={index} className="flex items-start bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200">
                <span className="text-green-600 font-bold mr-4 text-lg">✓</span>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA Bar */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8 ring-1 ring-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Explore Organocity</h3>
              <p className="text-gray-600 mt-1">
                Browse our best sellers or contact us for wholesale and bulk inquiries.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/shop"
                className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="rounded-lg bg-white px-6 py-3 text-gray-900 font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition"
              >
                Contact Us
              </a>
              <a
                href="/bulk-order"
                className="rounded-lg bg-white px-6 py-3 text-gray-900 font-semibold ring-1 ring-gray-200 hover:bg-gray-50 transition"
              >
                Bulk & B2B
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-16 px-6 bg-[#F6F1E7]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-10 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6">
              At Organocity, we don’t just sell products—we build partnerships rooted in trust, quality, and mutual growth.
              Your choice to support Organocity reinforces our commitment to excellence. As we continue expanding and improving,
              we invite you to be part of our journey toward a healthier, more sustainable future.
            </p>
            <p className="text-gray-900 font-semibold">Thank you for choosing Organocity.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

