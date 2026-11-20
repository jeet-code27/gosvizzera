import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const title = "Security & Business Associate Agreement (BAA) | Svizzera";
const description =
  "How Svizzera secures client and patient data — access controls, encryption, monitoring, incident response — and how to request a HIPAA Business Associate Agreement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://gosvizzera.com/security" },
  openGraph: { title, description, url: "https://gosvizzera.com/security", siteName: "Svizzera", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "approach",
    title: "Our Security Approach",
    content: (
      <p>
        Medical billing runs on sensitive data — patient demographics, insurance details, diagnoses and payment records. Our
        security program is built around the HIPAA Security Rule and aligned with SOC 2 trust principles, so practices can
        outsource revenue cycle work without compromising confidentiality, integrity or availability.
      </p>
    ),
  },
  {
    id: "access-control",
    title: "Access Control",
    content: (
      <ul>
        <li>Role-based access — each team member sees only the practices and data their role requires.</li>
        <li>Multi-factor authentication on systems that hold PHI.</li>
        <li>Access granted at onboarding, reviewed regularly and revoked immediately on role change or exit.</li>
        <li>We work inside your EHR/PM system and payer portals using individual credentials you provision — never shared logins.</li>
      </ul>
    ),
  },
  {
    id: "data-protection",
    title: "Data Protection",
    content: (
      <ul>
        <li>TLS encryption for data in transit, including this website.</li>
        <li>Encryption at rest for files and systems under our control.</li>
        <li>Secure file transfer channels for documents such as EOBs, authorizations and medical records.</li>
        <li>No PHI in personal email, messaging apps or local downloads.</li>
      </ul>
    ),
  },
  {
    id: "monitoring",
    title: "Monitoring & Incident Response",
    content: (
      <ul>
        <li>Activity logging and periodic audit reviews.</li>
        <li>Endpoint protection and managed, up-to-date workstations.</li>
        <li>Documented incident response plan with client notification as defined in the BAA.</li>
      </ul>
    ),
  },
  {
    id: "people",
    title: "People & Training",
    content: (
      <p>
        Every team member completes HIPAA and security awareness training at hire and annually, signs confidentiality
        agreements, and follows clean-desk and acceptable-use policies.
      </p>
    ),
  },
  {
    id: "baa",
    title: "Business Associate Agreement (BAA)",
    content: (
      <>
        <p>
          We sign a HIPAA-compliant BAA with every client <strong>before</strong> any PHI is exchanged. Our standard BAA
          covers:
        </p>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provision</th>
                <th>What it means for your practice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Permitted uses</strong></td>
                <td>PHI is used only to perform the services you engaged us for.</td>
              </tr>
              <tr>
                <td><strong>Safeguards</strong></td>
                <td>Administrative, physical and technical safeguards required by the Security Rule.</td>
              </tr>
              <tr>
                <td><strong>Breach reporting</strong></td>
                <td>Prompt notification of any security incident or breach of unsecured PHI.</td>
              </tr>
              <tr>
                <td><strong>Subcontractors</strong></td>
                <td>Any vendor touching PHI is bound by equivalent BAA terms.</td>
              </tr>
              <tr>
                <td><strong>Patient rights</strong></td>
                <td>Support for access, amendment and accounting-of-disclosure requests.</td>
              </tr>
              <tr>
                <td><strong>Termination</strong></td>
                <td>Return or secure destruction of PHI when the engagement ends.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="legal-callout">
          Already have your own BAA template? We are happy to review and sign your organization&apos;s version.
        </p>
      </>
    ),
  },
  {
    id: "request-baa",
    title: "Request a BAA or Security Review",
    content: (
      <>
        <p>
          For a copy of our BAA, a completed security questionnaire, or to schedule a security review call with our
          compliance team:
        </p>
        <ul>
          <li>Email <a href="mailto:info@gosvizzera.com">info@gosvizzera.com</a> with the subject &ldquo;BAA Request&rdquo;.</li>
          <li>Call <a href="tel:+14694035472">+1 (469) 403-5472</a>.</li>
          <li>Or <Link href="/contact">book a strategy call</Link> and mention security review.</li>
        </ul>
        <p>
          Read more in our <Link href="/hipaa">HIPAA Statement</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      badge="Compliance · Security"
      title={"Security &\nBAA"}
      intro="Enterprise-grade safeguards for every claim, code and authorization — with a signed Business Associate Agreement from day one."
      effectiveDate="November 20, 2026"
      lastUpdated="November 20, 2026"
      currentHref="/security"
      highlights={[
        { label: "BAA", value: "Signed Day One" },
        { label: "Authentication", value: "MFA" },
        { label: "Access", value: "Role-Based" },
        { label: "Framework", value: "SOC 2 Aligned" },
      ]}
      sections={sections}
    />
  );
}
