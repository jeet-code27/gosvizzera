import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Svizzera Healthcare Solutions | RCM Experts",
  description:
    "Svizzera brings 5+ years of healthcare RCM experience, 30+ specialties, HIPAA-focused workflows, and 98.7% clean claims accuracy for US medical practices.",
  keywords: [
    "About Svizzera",
    "Svizzera Healthcare Solutions",
    "Healthcare RCM Experts",
    "Revenue Cycle Management Company",
    "Medical Billing Outsourcing Partner",
    "HIPAA-focused RCM",
    "Clean Claims Accuracy",
    "US Medical Billing Specialists",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://www.gosvizzera.com/about",
  },
  openGraph: {
    title: "About Svizzera Healthcare Solutions | RCM Experts",
    description:
      "Svizzera brings 5+ years of healthcare RCM experience, 30+ specialties, HIPAA-focused workflows, and 98.7% clean claims accuracy for US medical practices.",
    url: "https://www.gosvizzera.com/about",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "About Svizzera Healthcare Solutions | RCM Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Svizzera Healthcare Solutions | RCM Experts",
    description:
      "Svizzera brings 5+ years of healthcare RCM experience, 30+ specialties, HIPAA-focused workflows, and 98.7% clean claims accuracy for US medical practices.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
