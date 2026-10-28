import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Billing Outsourcing Companies & Services | Svizzera",
  description:
    "Top-ranked among medical billing outsourcing companies. Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and 98%+ clean claims.",
  keywords: [
    "medical billing outsourcing",
    "medical billing outsourcing companies",
    "outsource medical billing",
    "should I outsource medical billing",
    "outsourced medical billing services",
    "physician billing services",
    "EHR billing compatibility",
    "A/R follow-up outsourcing",
    "HIPAA compliant billing outsourcing",
    "Svizzera Healthcare",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/medical-billing-outsourcing",
  },
  openGraph: {
    title: "Medical Billing Outsourcing Companies & Services | Svizzera",
    description:
      "Top-ranked among medical billing outsourcing companies. Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and 98%+ clean claims.",
    url: "https://gosvizzera.com/services/medical-billing-outsourcing",
    siteName: "Svizzera Healthcare Solutions",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Medical Billing Outsourcing | Svizzera Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Billing Outsourcing Companies & Services | Svizzera",
    description:
      "Top-ranked among medical billing outsourcing companies. Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and 98%+ clean claims.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function MedicalBillingOutsourcingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
