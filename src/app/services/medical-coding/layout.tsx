import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Coding Services | CPC-Certified | Svizzera",
  description:
    "CPC-credentialed coders deliver accurate ICD-10-CM, CPT, and HCPCS coding across 30+ specialties, improving claim accuracy and reducing denials.",
  keywords: [
    "Medical Coding Services",
    "CPC-Certified Coders",
    "ICD-10-CM Coding",
    "CPT Coding",
    "HCPCS Coding",
    "Specialty Medical Coding",
    "Healthcare Coding Outsourcing",
    "Claim Accuracy",
    "Coding Audit",
    "Reduce Claim Denials",
    "Svizzera",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/services/medical-coding",
  },
  openGraph: {
    title: "Medical Coding Services | CPC-Certified | Svizzera",
    description:
      "CPC-credentialed coders deliver accurate ICD-10-CM, CPT, and HCPCS coding across 30+ specialties, improving claim accuracy and reducing denials.",
    url: "https://gosvizzera.com/services/medical-coding",
    siteName: "Svizzera",
    type: "website",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Medical Coding Services | CPC-Certified | Svizzera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Coding Services | CPC-Certified | Svizzera",
    description:
      "CPC-credentialed coders deliver accurate ICD-10-CM, CPT, and HCPCS coding across 30+ specialties, improving claim accuracy and reducing denials.",
    images: ["/images/gosvizzera-logo.png"],
  },
};

export default function MedicalCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
