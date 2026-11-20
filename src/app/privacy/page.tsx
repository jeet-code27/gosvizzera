import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const title = "Privacy Policy | Svizzera Healthcare Solutions";
const description =
  "How Svizzera Healthcare Solutions collects, uses, shares and protects personal information on gosvizzera.com and in our medical billing and RCM services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://gosvizzera.com/privacy" },
  openGraph: { title, description, url: "https://gosvizzera.com/privacy", siteName: "Svizzera", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          Svizzera Healthcare Solutions (&ldquo;Svizzera,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides medical billing, coding,
          prior authorization and revenue cycle management services to physician practices and healthcare organizations in the
          United States. This Privacy Policy explains how we handle personal information collected through{" "}
          <strong>gosvizzera.com</strong>, our forms, email and phone communications, and our business relationships.
        </p>
        <p className="legal-callout">
          Protected Health Information (PHI) that we process on behalf of our clients is governed by HIPAA and by the Business
          Associate Agreement (BAA) we sign with each client — not by this website policy. See our{" "}
          <Link href="/hipaa">HIPAA Statement</Link> and <Link href="/security">Security &amp; BAA</Link> pages.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <h3>Information you provide</h3>
        <ul>
          <li>Contact details such as name, practice name, job title, work email and phone number.</li>
          <li>Practice information you share when booking a strategy call — specialty, monthly claim volume, EHR/PM system and billing challenges.</li>
          <li>Newsletter subscription email addresses.</li>
          <li>Anything you send us by email, phone or other correspondence.</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>Device and browser data, IP address, pages visited, referring URLs and time on page.</li>
          <li>Cookies and similar technologies used for site functionality, preferences (such as light/dark theme) and analytics.</li>
        </ul>
        <p>
          Please do not submit patient information or other PHI through our website forms. Patient data is exchanged only
          through secure channels set up under a signed BAA.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    content: (
      <ul>
        <li>To respond to inquiries, schedule consultations and prepare proposals.</li>
        <li>To deliver, manage and improve our services and client relationships.</li>
        <li>To send newsletters and industry updates you have requested (you can unsubscribe at any time).</li>
        <li>To operate, secure and analyze the performance of our website.</li>
        <li>To meet legal, regulatory, accounting and contractual obligations.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Information",
    content: (
      <>
        <p>
          <strong>We do not sell or rent personal information.</strong> We share it only in these limited situations:
        </p>
        <ul>
          <li><strong>Service providers</strong> — hosting, email, analytics, CRM and scheduling vendors who process data on our behalf under confidentiality obligations.</li>
          <li><strong>Legal requirements</strong> — when required by law, subpoena or court order, or to protect our rights, clients or the public.</li>
          <li><strong>Business transfers</strong> — in connection with a merger, acquisition or sale of assets, subject to equivalent protections.</li>
          <li><strong>With your consent</strong> — in any other case where you have asked or agreed.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Analytics",
    content: (
      <p>
        We use essential cookies to make the site work and optional analytics cookies to understand how visitors use it. You
        can block or delete cookies in your browser settings; some features may not function correctly without them. Our site
        does not respond to &ldquo;Do Not Track&rdquo; signals in a uniform way because no common industry standard exists.
      </p>
    ),
  },
  {
    id: "retention-security",
    title: "Data Retention & Security",
    content: (
      <p>
        We keep personal information only as long as needed for the purposes described here or as required by law and our
        contracts. We protect it with administrative, technical and physical safeguards including encryption in transit,
        role-based access controls and staff confidentiality training. No method of transmission over the internet is 100%
        secure, but we work continuously to protect your information.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Choices & Rights",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Access, correct or delete personal information we hold about you.</li>
          <li>Opt out of marketing emails using the unsubscribe link or by contacting us.</li>
          <li>Request information about how your data has been shared.</li>
        </ul>
        <p>
          To make a request, email <a href="mailto:info@gosvizzera.com">info@gosvizzera.com</a>. We will verify your identity
          and respond within the time required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: (
      <p>
        Our website and services are intended for healthcare professionals and businesses. We do not knowingly collect
        personal information from children under 13 through this website.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last Updated&rdquo; date at the top of this page shows
        when it was last revised. Material changes will be highlighted on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <p>
        Svizzera Healthcare Solutions, Tallahassee, FL · Email{" "}
        <a href="mailto:info@gosvizzera.com">info@gosvizzera.com</a> · Phone{" "}
        <a href="tel:+14694035472">+1 (469) 403-5472</a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      badge="Legal · Privacy"
      title={"Privacy\nPolicy"}
      intro="Your trust matters. Here is exactly what information we collect, why we collect it, and how we keep it protected."
      effectiveDate="November 20, 2026"
      lastUpdated="November 20, 2026"
      currentHref="/privacy"
      highlights={[
        { label: "Data Sold", value: "Never" },
        { label: "PHI via Website", value: "Not Accepted" },
        { label: "Encryption", value: "In Transit" },
        { label: "Response Time", value: "2 Business Days" },
      ]}
      sections={sections}
    />
  );
}
