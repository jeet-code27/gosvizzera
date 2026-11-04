import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Injury Medical Billing Services | Svizzera",
  description:
    "Personal injury medical billing support for US healthcare practices. Get help with claims, coding, denials and A/R. Request a free billing review.",
  keywords: [
    "Personal Injury Medical Billing",
    "Personal Injury Billing Services",
    "Medical Billing for Personal Injury Clinics",
    "Injury Claim Billing",
    "Personal Injury RCM",
    "Medical Billing Outsourcing",
    "PIP billing services",
    "MedPay claim billing",
    "Letter of Protection billing",
    "Personal injury lien medical billing",
    "Svizzera Healthcare Solutions",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/personal-injury-medical-billing",
  },
  openGraph: {
    title: "Personal Injury Medical Billing Services | Svizzera",
    description:
      "Personal injury medical billing support for US healthcare practices. Get help with claims, coding, denials and A/R. Request a free billing review.",
    url: "https://gosvizzera.com/personal-injury-medical-billing",
    siteName: "Svizzera Healthcare Solutions",
    type: "website",
    images: [
      {
        url: "/images/personal-injury/hero-personal-injury.png",
        width: 1200,
        height: 630,
        alt: "Personal Injury Medical Billing Services | Svizzera Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Injury Medical Billing Services | Svizzera",
    description:
      "Personal injury medical billing support for US healthcare practices. Get help with claims, coding, denials and A/R. Request a free billing review.",
    images: ["/images/personal-injury/hero-personal-injury.png"],
  },
};

export default function PersonalInjuryBillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

