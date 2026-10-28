import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prior Authorization Companies & Services | Prior Auth Solutions | Svizzera",
  description:
    "Ranked among top prior authorization companies, Svizzera provides comprehensive prior authorization services and prior authorization solutions for healthcare providers. Expedited approvals and zero EHR disruption.",
  keywords: [
    "prior authorization companies",
    "prior authorization services",
    "prior authorization solutions",
    "Prior Authorization Services",
    "Retro Authorization Services",
    "Medical Prior Authorization",
    "Pre-Authorization Healthcare",
    "Payer Follow-Up",
    "Denial Appeals",
    "Specialty Prior Authorization",
    "Prior Auth Approval",
    "Healthcare Outsourcing",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/prior-authorization",
  },
  openGraph: {
    title: "Prior Authorization Companies & Services | Prior Auth Solutions | Svizzera",
    description:
      "Ranked among top prior authorization companies, Svizzera provides comprehensive prior authorization services and prior authorization solutions for healthcare providers. Expedited approvals and zero EHR disruption.",
    url: "https://gosvizzera.com/services/prior-authorization",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Prior & Retro Authorization Services | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prior Authorization Companies & Services | Prior Auth Solutions | Svizzera",
    description:
      "Ranked among top prior authorization companies, Svizzera provides comprehensive prior authorization services and prior authorization solutions for healthcare providers. Expedited approvals and zero EHR disruption.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function PriorAuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
