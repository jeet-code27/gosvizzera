import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const title = "Terms of Service | Svizzera Healthcare Solutions";
const description =
  "Terms governing use of gosvizzera.com and the medical billing, coding and revenue cycle management services provided by Svizzera Healthcare Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://gosvizzera.com/terms" },
  openGraph: { title, description, url: "https://gosvizzera.com/terms", siteName: "Svizzera", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using gosvizzera.com (the &ldquo;Site&rdquo;), you agree to these Terms of Service. If you do not
        agree, please do not use the Site. These Terms apply to the Site only; paid services are governed by a separate
        Master Services Agreement and Business Associate Agreement signed with each client.
      </p>
    ),
  },
  {
    id: "services",
    title: "Our Services",
    content: (
      <>
        <p>
          Svizzera provides outsourced healthcare administrative services, including insurance verification, prior
          authorization, medical coding, claims management, denial management, AR follow-up and revenue cycle management.
        </p>
        <p className="legal-callout">
          Svizzera does not provide medical, legal or financial advice. Clinical decisions, documentation accuracy and final
          responsibility for claims submitted under a provider&apos;s credentials remain with the provider.
        </p>
      </>
    ),
  },
  {
    id: "site-use",
    title: "Acceptable Use of the Site",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Submit patient information or other PHI through public website forms.</li>
          <li>Attempt to gain unauthorized access to the Site, its admin areas or related systems.</li>
          <li>Upload malware, scrape the Site at scale or interfere with its normal operation.</li>
          <li>Use the Site for any unlawful, fraudulent or misleading purpose.</li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    title: "Website Content & Intellectual Property",
    content: (
      <p>
        All Site content — text, graphics, logos, guides, benchmarks and design — is owned by Svizzera or its licensors and is
        protected by intellectual property laws. You may view and share links to our content for informational purposes, but
        you may not copy, republish or commercially use it without written permission. Blog articles and benchmark data are
        provided for general information and may not reflect the latest payer policies.
      </p>
    ),
  },
  {
    id: "engagements",
    title: "Client Engagements",
    content: (
      <ul>
        <li>Pricing, scope, service levels and term are defined in each client&apos;s signed agreement.</li>
        <li>A HIPAA Business Associate Agreement is executed before any PHI is shared. See <Link href="/security">Security &amp; BAA</Link>.</li>
        <li>Performance figures shown on the Site (such as clean-claim rates) reflect historical results and are not a guarantee of future outcomes for any particular practice.</li>
      </ul>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    content: (
      <p>
        The Site may link to third-party websites such as payer portals, government resources or social media. We are not
        responsible for their content, privacy practices or availability.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    content: (
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent permitted by law, we
        disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and
        non-infringement. We do not warrant that the Site will be uninterrupted or error-free.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Svizzera will not be liable for any indirect, incidental, special,
        consequential or punitive damages arising from your use of the Site. Liability relating to paid services is governed
        exclusively by the applicable client agreement.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. Any
        dispute relating to the Site will be brought in the state or federal courts located in Leon County, Florida.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <p>
        We may revise these Terms at any time by updating this page. Continued use of the Site after changes are posted means
        you accept the revised Terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      badge="Legal · Terms"
      title={"Terms of\nService"}
      intro="The ground rules for using our website and working with Svizzera — written to be clear, fair and easy to follow."
      effectiveDate="November 20, 2026"
      lastUpdated="November 20, 2026"
      currentHref="/terms"
      highlights={[
        { label: "Governing Law", value: "Florida, USA" },
        { label: "Client Contracts", value: "MSA + BAA" },
        { label: "Medical Advice", value: "Not Provided" },
        { label: "PHI via Forms", value: "Prohibited" },
      ]}
      sections={sections}
    />
  );
}
