import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Strategy Call | Svizzera Healthcare RCM",
  description:
    "Speak directly with Svizzera's healthcare revenue cycle specialists. Analyze your denial rate, turnaround time, and billing workflows with zero obligation.",
  keywords: [
    "Book a Strategy Call",
    "Healthcare RCM Strategy Call",
    "Medical Billing Consultation",
    "RCM Outsourcing Call",
    "Svizzera Strategy Session",
  ],
  alternates: {
    canonical: "https://gosvizzera.com/book-a-strategy-call",
  },
  openGraph: {
    title: "Book a Strategy Call | Svizzera Healthcare RCM",
    description:
      "Speak directly with Svizzera's healthcare revenue cycle specialists. Analyze your denial rate, turnaround time, and billing workflows with zero obligation.",
    url: "https://gosvizzera.com/book-a-strategy-call",
    siteName: "Svizzera",
    type: "website",
  },
};

export default function BookStrategyCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
