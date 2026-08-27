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
  title: "gosvizzera | Healthcare RCM & Medical Billing Solutions",
  description: "Comprehensive Healthcare RCM, Medical Billing, Coding, Prior Authorization, and AR Recovery Solutions.",
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
