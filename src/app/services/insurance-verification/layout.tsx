import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Verification & Eligibility Services | Svizzera",
  description:
    "Reduce front-end denials with real-time insurance eligibility and benefits verification before every appointment. 99.4% accuracy, HIPAA-focused, EHR-integrated.",
  keywords: [
    "Insurance Verification",
    "Eligibility Services",
    "Patient Insurance Verification",
    "Insurance Eligibility Verification",
    "Real-Time Eligibility",
    "Benefits Verification",
    "EDI 270 271",
    "Reduce Front-End Denials",
    "HIPAA-Focused Verification",
    "EHR-Integrated Verification",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/insurance-verification",
  },
  openGraph: {
    title: "Insurance Verification & Eligibility Services | Svizzera",
    description:
      "Reduce front-end denials with real-time insurance eligibility and benefits verification before every appointment. 99.4% accuracy, HIPAA-focused, EHR-integrated.",
    url: "https://gosvizzera.com/services/insurance-verification",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Insurance Verification & Eligibility Services | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Verification & Eligibility Services | Svizzera",
    description:
      "Reduce front-end denials with real-time insurance eligibility and benefits verification before every appointment. 99.4% accuracy, HIPAA-focused, EHR-integrated.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function InsuranceVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
