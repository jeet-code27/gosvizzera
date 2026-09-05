import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prior & Retro Authorization Services | Svizzera",
  description:
    "Svizzera manages end-to-end prior and retro authorization, payer follow-up, and denial appeals so your clinical team stays off the phone with insurers.",
  keywords: [
    "Prior Authorization Services",
    "Retro Authorization Services",
    "Medical Prior Authorization",
    "Pre-Authorization Healthcare",
    "Payer Follow-Up",
    "Denial Appeals",
    "Specialty Prior Authorization",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/prior-authorization",
  },
  openGraph: {
    title: "Prior & Retro Authorization Services | Svizzera",
    description:
      "Svizzera manages end-to-end prior and retro authorization, payer follow-up, and denial appeals so your clinical team stays off the phone with insurers.",
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
    title: "Prior & Retro Authorization Services | Svizzera",
    description:
      "Svizzera manages end-to-end prior and retro authorization, payer follow-up, and denial appeals so your clinical team stays off the phone with insurers.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function PriorAndRetroAuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
