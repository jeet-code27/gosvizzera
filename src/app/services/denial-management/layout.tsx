import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Claim & RCM Denial Management Services | Svizzera Healthcare",
  description:
    "Root-cause RCM denial management, first-level appeals, and denial prevention for U.S. medical practices. Recover lost revenue and reduce recurring claim rejections with Svizzera.",
  keywords: [
    "rcm denial management",
    "medical claim denial management services",
    "denial management company",
    "claim denial appeals service",
    "reduce claim denials",
    "denial prevention services",
    "denial management services",
    "claim denial management",
    "first-level appeals",
    "peer-to-peer coordination",
    "Svizzera Healthcare",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/denial-management",
  },
  openGraph: {
    title: "Medical Claim & RCM Denial Management Services | Svizzera Healthcare",
    description:
      "Root-cause RCM denial management, first-level appeals, and denial prevention for U.S. medical practices. Recover lost revenue and reduce recurring claim rejections with Svizzera.",
    url: "https://gosvizzera.com/services/denial-management",
    siteName: "Svizzera Healthcare",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Medical Claim Denial Management | Svizzera Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Claim & RCM Denial Management Services | Svizzera Healthcare",
    description:
      "Root-cause RCM denial management, first-level appeals, and denial prevention for U.S. medical practices. Recover lost revenue and reduce recurring claim rejections with Svizzera.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function DenialManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
