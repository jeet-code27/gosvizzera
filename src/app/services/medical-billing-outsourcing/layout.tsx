import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Billing Outsourcing Services | Svizzera Healthcare Solutions",
  description:
    "Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and denial recovery. See how outsourcing works.",
  keywords: [
    "medical billing outsourcing",
    "outsource medical billing",
    "medical billing outsourcing companies",
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
    title: "Medical Billing Outsourcing Services | Svizzera Healthcare Solutions",
    description:
      "Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and denial recovery. See how outsourcing works.",
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
    title: "Medical Billing Outsourcing Services | Svizzera Healthcare Solutions",
    description:
      "Outsource medical billing without disrupting your EHR or staff. Certified coders, weekly AR follow-up, and denial recovery. See how outsourcing works.",
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
