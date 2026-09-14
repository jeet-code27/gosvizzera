import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiropractic Billing Services | Svizzera Healthcare Solutions",
  description:
    "Specialized chiropractic billing: visit-limit tracking, Medicare ABN compliance, and denial prevention for chiropractic practices.",
  keywords: [
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
    title: "Chiropractic Billing Services | Svizzera Healthcare Solutions",
    description:
      "Specialized chiropractic billing: visit-limit tracking, Medicare ABN compliance, and denial prevention for chiropractic practices.",
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
    title: "Chiropractic Billing Services | Svizzera Healthcare Solutions",
    description:
      "Specialized chiropractic billing: visit-limit tracking, Medicare ABN compliance, and denial prevention for chiropractic practices.",
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
