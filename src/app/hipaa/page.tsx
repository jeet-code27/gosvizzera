import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const title = "HIPAA Compliance Statement | Svizzera Healthcare Solutions";
const description =
  "Svizzera's commitment to HIPAA compliance as a Business Associate: Privacy Rule, Security Rule, Breach Notification and how we protect PHI in medical billing and RCM.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://gosvizzera.com/hipaa" },
  openGraph: { title, description, url: "https://gosvizzera.com/hipaa", siteName: "Svizzera", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our Commitment",
    content: (
      <>
        <p>
          Svizzera Healthcare Solutions acts as a <strong>Business Associate</strong> to the physician practices, clinics and
          healthcare organizations (Covered Entities) we serve. We are committed to complying with the Health Insurance
          Portability and Accountability Act of 1996 (HIPAA), the HITECH Act, and their implementing regulations.
        </p>
        <p className="legal-callout">
          Every client engagement begins with a signed Business Associate Agreement (BAA) before any Protected Health
          Information (PHI) is shared with our team.
        </p>
      </>
    ),
  },
  {
    id: "privacy-rule",
    title: "Privacy Rule",
    content: (
      <ul>
        <li>We use and disclose PHI only as permitted by our BAA and as needed to perform billing, coding, authorization and RCM services.</li>
        <li>We apply the <strong>minimum necessary</strong> standard — staff access only the PHI required for their assigned tasks.</li>
        <li>We do not sell PHI or use it for marketing.</li>
        <li>We support Covered Entities in responding to patient requests for access, amendment and accounting of disclosures.</li>
      </ul>
    ),
  },
  {
    id: "security-rule",
    title: "Security Rule Safeguards",
    content: (
      <>
        <h3>Administrative</h3>
        <ul>
          <li>Designated Privacy & Security Officer and documented policies and procedures.</li>
          <li>Periodic risk assessments and risk management planning.</li>
          <li>HIPAA training at hire and annually, with signed confidentiality agreements for all workforce members.</li>
        </ul>
        <h3>Technical</h3>
        <ul>
          <li>Unique user IDs, multi-factor authentication and role-based access controls.</li>
          <li>Encryption of PHI in transit and at rest on systems we manage.</li>
          <li>Audit logging, automatic session timeouts and access reviews.</li>
        </ul>
        <h3>Physical</h3>
        <ul>
          <li>Controlled workspaces, clean-desk practices and restrictions on printing or removable media.</li>
          <li>Secure device management and disposal procedures.</li>
        </ul>
      </>
    ),
  },
  {
    id: "breach-notification",
    title: "Breach Notification",
    content: (
      <p>
        We maintain an incident response plan. If we discover a breach of unsecured PHI, we notify the affected Covered Entity
        without unreasonable delay and within the timeframe set in our BAA (and no later than 60 days from discovery as
        required by the HIPAA Breach Notification Rule), and we cooperate fully with investigation, mitigation and any
        required notifications.
      </p>
    ),
  },
  {
    id: "subcontractors",
    title: "Subcontractors",
    content: (
      <p>
        Any subcontractor or vendor that creates, receives, maintains or transmits PHI on our behalf must sign a
        subcontractor BAA with obligations at least as protective as our own.
      </p>
    ),
  },
  {
    id: "patients",
    title: "Information for Patients",
    content: (
      <p>
        Svizzera works on behalf of your healthcare provider. For questions about your medical records, bills or privacy
        rights, please contact your provider directly — their Notice of Privacy Practices describes how your information is
        used. We will assist your provider in responding to your request.
      </p>
    ),
  },
  {
    id: "report-concern",
    title: "Report a Concern",
    content: (
      <p>
        To report a suspected privacy or security incident, or to ask about our compliance program, contact our Privacy &amp;
        Security Officer at <a href="mailto:info@gosvizzera.com">info@gosvizzera.com</a> or{" "}
        <a href="tel:+14694035472">+1 (469) 403-5472</a>. See also our <Link href="/security">Security &amp; BAA</Link> page.
      </p>
    ),
  },
];

export default function HipaaPage() {
  return (
    <LegalPage
      badge="Compliance · HIPAA"
      title={"HIPAA Compliance\nStatement"}
      intro="Protecting patient information is foundational to everything we do. Here is how Svizzera safeguards PHI as your Business Associate."
      effectiveDate="November 20, 2026"
      lastUpdated="November 20, 2026"
      currentHref="/hipaa"
      highlights={[
        { label: "Role", value: "Business Associate" },
        { label: "BAA", value: "Before Any PHI" },
        { label: "Staff Training", value: "Annual" },
        { label: "Access Standard", value: "Minimum Necessary" },
      ]}
      sections={sections}
    />
  );
}
