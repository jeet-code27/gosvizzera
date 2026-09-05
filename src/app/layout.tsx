import type { Metadata } from "next";
import { Bodoni_Moda, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gosvizzera.com"),
  title: {
    default: "Healthcare RCM & Medical Billing Services | Svizzera",
    template: "%s",
  },
  description:
    "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
  keywords: [
    "Healthcare RCM",
    "Medical Billing Services",
    "Healthcare RCM Outsourcing",
    "Prior Authorization",
    "Medical Coding",
    "Insurance Verification",
    "Revenue Cycle Management",
    "US Medical Practices",
    "Denial Management",
    "Accounts Receivable Recovery",
    "Svizzera",
  ],
  authors: [{ name: "Svizzera" }],
  creator: "Svizzera",
  publisher: "Svizzera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gosvizzera.com",
    title: "Healthcare RCM & Medical Billing Services | Svizzera",
    description:
      "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
    siteName: "Svizzera",
    images: [
      {
        url: "/images/gosvizzera-logo.png",
        width: 1200,
        height: 630,
        alt: "Svizzera Healthcare RCM & Medical Billing Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare RCM & Medical Billing Services | Svizzera",
    description:
      "Svizzera provides end-to-end healthcare RCM outsourcing, including prior authorization, medical coding, insurance verification, and revenue cycle management for US practices.",
    images: ["/images/gosvizzera-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Svizzera Healthcare Solutions",
  url: "https://gosvizzera.com",
  logo: "https://gosvizzera.com/images/gosvizzera-logo.png",
  sameAs: [
    "https://www.linkedin.com/company/svizzera-healthcare/",
    "https://www.facebook.com/people/Svizzera-Healthcare/61593771781722/",
    "https://www.instagram.com/svizzerahealthcare",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-469-403-5472",
    contactType: "customer service",
    email: "info@gosvizzera.com",
    areaServed: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${lato.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <Navbar />
            <div className="flex-1">{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
