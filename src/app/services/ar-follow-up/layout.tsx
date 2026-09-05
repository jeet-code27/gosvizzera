import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts Receivable Follow-Up Services | Svizzera",
  description:
    "Svizzera works your full AR aging report weekly by bucket and payer, recovering underpayments and reducing days in accounts receivable.",
  keywords: [
    "Accounts Receivable Follow-Up Services",
    "AR Recovery Services",
    "Medical AR Follow-Up",
    "AR Aging Report",
    "Recovering Underpayments",
    "Reduce Days in AR",
    "Healthcare Revenue Recovery",
    "Insurance AR Resolution",
    "Aging Bucket Follow-Up",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/ar-follow-up",
  },
  openGraph: {
    title: "Accounts Receivable Follow-Up Services | Svizzera",
    description:
      "Svizzera works your full AR aging report weekly by bucket and payer, recovering underpayments and reducing days in accounts receivable.",
    url: "https://gosvizzera.com/services/ar-follow-up",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Accounts Receivable Follow-Up Services | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accounts Receivable Follow-Up Services | Svizzera",
    description:
      "Svizzera works your full AR aging report weekly by bucket and payer, recovering underpayments and reducing days in accounts receivable.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function ARFollowUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
