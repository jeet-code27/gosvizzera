import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claims Management & Denial Prevention | Svizzera",
  description:
    "Clean claim submissions, proactive denial management, and payer follow-up from Svizzera help practices reach a 95%+ first-pass clean claim rate.",
  keywords: [
    "Claims Management",
    "Denial Prevention",
    "Clean Claim Submissions",
    "First-Pass Clean Claim Rate",
    "Medical Claims Processing",
    "Payer Follow-Up",
    "Denial Resolution",
    "Claim Scrubbing",
    "Healthcare Claims Management",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/claims-management",
  },
  openGraph: {
    title: "Claims Management & Denial Prevention | Svizzera",
    description:
      "Clean claim submissions, proactive denial management, and payer follow-up from Svizzera help practices reach a 95%+ first-pass clean claim rate.",
    url: "https://gosvizzera.com/services/claims-management",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Claims Management & Denial Prevention | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claims Management & Denial Prevention | Svizzera",
    description:
      "Clean claim submissions, proactive denial management, and payer follow-up from Svizzera help practices reach a 95%+ first-pass clean claim rate.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function ClaimsManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
