import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiropractic Billing Services | Billing for Chiropractic | Svizzera",
  description:
    "Specialized medical billing for chiropractic practices: visit-limit tracking, Medicare ABN compliance, and denial prevention. Maximize your collections with Svizzera.",
  keywords: [
    "billing for chiropractic",
    "billing for chiropractic practices",
    "chiropractic billing services",
    "chiropractic medical billing company",
    "chiropractic RCM",
    "chiropractic billing",
    "chiropractic medical billing",
    "chiropractic revenue cycle management",
    "chiropractic visit limits",
    "Medicare ABN compliance chiropractic",
    "chiropractic claim denial appeals",
    "Svizzera Healthcare",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/chiropractic-billing",
  },
  openGraph: {
    title: "Chiropractic Billing Services | Billing for Chiropractic | Svizzera",
    description:
      "Specialized medical billing for chiropractic practices: visit-limit tracking, Medicare ABN compliance, and denial prevention. Maximize your collections with Svizzera.",
    url: "https://gosvizzera.com/services/chiropractic-billing",
    siteName: "Svizzera Healthcare",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Chiropractic Billing Services | Svizzera Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiropractic Billing Services | Billing for Chiropractic | Svizzera",
    description:
      "Specialized medical billing for chiropractic practices: visit-limit tracking, Medicare ABN compliance, and denial prevention. Maximize your collections with Svizzera.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function ChiropracticBillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
