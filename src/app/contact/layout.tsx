import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Healthcare RCM Strategy Call | Svizzera",
  description:
    "Schedule a confidential strategy call with Svizzera's healthcare revenue cycle experts. Get a custom denial analysis, AR audit, and tailored outsourcing plan for your practice.",
  keywords: [
    "Healthcare RCM Strategy Call",
    "Medical Billing Consultation",
    "RCM Consultation",
    "Healthcare Outsourcing Strategy",
    "Denial Rate Audit",
    "Medical Practice Revenue Assessment",
    "Svizzera Contact",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/contact",
  },
  openGraph: {
    title: "Book a Healthcare RCM Strategy Call | Svizzera",
    description:
      "Schedule a confidential strategy call with Svizzera's healthcare revenue cycle experts. Get a custom denial analysis, AR audit, and tailored outsourcing plan for your practice.",
    url: "https://gosvizzera.com/contact",
    siteName: "Svizzera",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
