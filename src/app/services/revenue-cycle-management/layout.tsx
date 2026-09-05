import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Cycle Management Services | Svizzera",
  description:
    "Full-service RCM covering billing, coding, insurance verification, denial management, and AR follow-up to accelerate collections and reduce claim denials.",
  keywords: [
    "Revenue Cycle Management Services",
    "Healthcare RCM",
    "Full-Service RCM",
    "Medical Billing and Coding",
    "Denial Management",
    "AR Follow-Up",
    "Accelerate Collections",
    "Reduce Claim Denials",
    "RCM Outsourcing Partner",
    "End-to-End RCM",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/revenue-cycle-management",
  },
  openGraph: {
    title: "Revenue Cycle Management Services | Svizzera",
    description:
      "Full-service RCM covering billing, coding, insurance verification, denial management, and AR follow-up to accelerate collections and reduce claim denials.",
    url: "https://gosvizzera.com/services/revenue-cycle-management",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Revenue Cycle Management Services | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenue Cycle Management Services | Svizzera",
    description:
      "Full-service RCM covering billing, coding, insurance verification, denial management, and AR follow-up to accelerate collections and reduce claim denials.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function RevenueCycleManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
