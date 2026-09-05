import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Specialties from "@/components/Specialties";
import GetStarted from "@/components/GetStarted";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Healthcare RCM & Medical Billing Services | Svizzera",
  description:
    "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
  keywords: [
    "Healthcare RCM",
    "Medical Billing Services",
    "RCM Outsourcing",
    "Prior Authorization",
    "Medical Coding",
    "Insurance Verification",
    "Revenue Cycle Management",
    "US Medical Practices",
    "Healthcare Revenue Cycle",
    "Medical Billing Company",
    "Denial Prevention",
    "Clean Claims",
  ],
  alternates: {
    canonical: "https://gosvizzera.com",
  },
  openGraph: {
    title: "Healthcare RCM & Medical Billing Services | Svizzera",
    description:
      "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
    url: "https://gosvizzera.com",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Svizzera Healthcare RCM & Medical Billing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare RCM & Medical Billing Services | Svizzera",
    description:
      "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Specialties />
      <GetStarted />
      <HowWeWork />
      <FAQ />
      <Footer />
    </main>
  );
}
