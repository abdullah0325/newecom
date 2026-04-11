import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact OrganoCity | Himalayan Pink Salt Support",
  description:
    "Contact OrganoCity for inquiries about Himalayan pink salt products, bulk orders, and delivery across Pakistan.",
  keywords: [
    "OrganoCity contact",
    "Himalayan pink salt",
    "pink salt Pakistan",
    "bulk salt supplier",
    "customer support",
  ],
  openGraph: {
    title: "Contact OrganoCity",
    description:
      "Have questions about our Himalayan pink salt products? Get in touch with OrganoCity.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

