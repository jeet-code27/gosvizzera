import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Billing Services for U.S. Practices | Svizzera Healthcare",
  description:
    "Top-rated among medical billing companies, Svizzera provides full-service medical billing and medical billing services for small practices nationwide. Clean claims, faster payments, fewer denials.",
  keywords: [
    "medical billing services",
    "medical billing companies",
    "medical billing services for small practices",
    "medical billing companies near me",
    "medical billing company",
    "outsourced medical billing services",
    "physician billing services",
    "full-service medical billing",
    "revenue cycle management",
    "clean claims rate",
    "HIPAA compliant medical billing",
    "denial management",
    "Svizzera Healthcare",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/medical-billing-services",
  },
  openGraph: {
    title: "Medical Billing Services for U.S. Practices | Svizzera Healthcare",
    description:
      "Top-rated among medical billing companies, Svizzera provides full-service medical billing and medical billing services for small practices nationwide. Clean claims, faster payments, fewer denials.",
    url: "https://gosvizzera.com/services/medical-billing-services",
    siteName: "Svizzera Healthcare",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Medical Billing Services | Svizzera Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Billing Services for U.S. Practices | Svizzera Healthcare",
    description:
      "Top-rated among medical billing companies, Svizzera provides full-service medical billing and medical billing services for small practices nationwide. Clean claims, faster payments, fewer denials.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function MedicalBillingServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
