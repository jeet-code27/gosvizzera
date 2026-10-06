# GoSvizzera.com — Website Pending Tasks & 45-Day Execution Status

This document tracks all **website-specific development, on-page SEO, technical optimizations, and content deployment tasks** extracted from the *45-Day U.S. Market SEO Strategy & Content Blueprint*.

---

## 📊 Summary Status

| Status | Total Tasks |
|---|---|
| ✅ **Completed / Ready** | 5 |
| ⏳ **Pending Website Development Tasks** | 7 |
| 📝 **Pending Content Publishing (Awaiting Writer Drafts)** | 5 |

---

## ✅ Completed Tasks (Done)

- [x] **Day 5: RCM & Billing Pillar Guide Page (2,000+ Words)**
  - *Title:* "The Ultimate Guide to U.S. Healthcare RCM & Medical Billing Outsourcing"
  - *URL:* `/blog/medical-billing-outsourcing-rcm-guide`
  - Integrated complete 2026 financial benchmarks (MGMA), clean claim rates, days in A/R, in-house vs. outsourced cost analysis, 5-layer HIPAA security frameworks, vendor evaluation scorecard, 14 voice/AI search FAQs with `FAQPage` schema, strategic internal links to all 10 service pages, all external citations, and downloadable offline PDF (`Svizzera_Medical_Billing_Benchmarks_2026_guide.pdf`).
  - Added to static sitemap, blog feed, and MongoDB database.
- [x] **Day 1 & Day 24: Sitemap & Robots Canonical Alignment**
  - Updated `sitemap.ts` and `robots.ts` to canonical domain `https://gosvizzera.com`.
  - Removed duplicate alias `/services/prior-and-retro-authorization` from sitemap to prevent Google Search Console canonical warnings.
  - Aligned `/about` canonical URL to `https://gosvizzera.com/about`.
- [x] **Day 1: Google Search Console Verification Tag Setup**
  - Integrated `verification.google` in `src/app/layout.tsx` driven by `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in `.env.local`.
- [x] **Day 26: FAQ Schema (`FAQPage`) Injection Across All Service Pages**
  - Enabled dynamic `FAQPage` schema markup (`<script type="application/ld+json">`) in `src/components/ui/faq-monochrome.tsx`.
  - Covered 10 active service pages with Google-compliant rich snippets.
  - Added `generateSchema={false}` on pages with existing top-level page schemas to prevent duplicate schema warnings.
- [x] **Specialty Service Page: Chiropractic Billing**
  - Created and published `/services/chiropractic-billing` with full SEO metadata, FAQ schema, and navigation integration.
- [x] **UI & Animation Fixes**
  - Resolved character-level text wrapping bug in `AnimatedText` component.
  - Updated Hero copy to client specifications: *"Trusted Health Care Partner"* and *"HealthCare Services"*.

---

## ⏳ Pending Website Tasks (Development & On-Page SEO)

### 1. Technical & Local Schema Markup
- [ ] **Day 3: `LocalBusiness` & `MedicalBusiness` JSON-LD Schema**
  - Inject structured data across Homepage and Core Service Pages.
  - Anchor NAP (Name: Svizzera Healthcare Solutions, Address: Tallahassee, FL, Phone: +1-469-403-5472, Email: info@gosvizzera.com).

### 2. Core Web Vitals & Mobile Optimization
- [ ] **Day 2 & Day 38: Core Web Vitals & Mobile Speed Audit**
  - Run PageSpeed Insights audit on homepage and primary service pages.
  - Optimize Cumulative Layout Shift (CLS), interaction latency (INP), and touch target spacing on mobile devices.

### 3. CRO (Conversion Rate Optimization) & Lead Funnel
- [ ] **Day 16: Sticky Mobile CTAs & Direct Call Triggers**
  - Add sticky "Book a Strategy Call" bottom floating bar on mobile screens.
  - Add direct click-to-call phone trigger (`tel:+14694035472`) for high-intent visitors.
- [ ] **Day 27: Social Proof & Live SLA Telemetry**
  - Integrate live performance metrics (e.g. *First-Pass Clean Rate +4.2%, 0-Hour Prior Auth Turnaround, 100% HIPAA Focused / BAA First*) directly above the fold on Homepage.
- [ ] **Day 31: Consultation Form Friction Reduction**
  - Simplify strategy call / contact form down to 3 core fields (*Name, Practice Size / Specialty, Phone or Email*) to maximize lead conversion velocity.

### 4. New Service Pages to Create
- [ ] **Day 19: Specialty Service Page: Cardiology Billing**
  - *Title:* "Cardiology Procedure Coding & Authorization Support"
  - *Target Keyword:* `cardiology medical billing solutions`
  - *URL:* `/services/cardiology-billing`

### 5. Existing Service Pages On-Page Enhancement
- [ ] **Day 6: Insurance Verification (`/services/insurance-verification`)**
  - Expand content for 72-hour pre-visit verification & EDI 270/271 real-time eligibility checks.
- [ ] **Day 7: Prior Authorization (`/services/prior-authorization`)**
  - Add multi-specialty bottlenecks and zero-delay treatment workflow section.
- [ ] **Day 8: Medical Coding (`/services/medical-coding`)**
  - Emphasize AAPC/AHIMA certified coders (CPC, CCS), ICD-10-CM, CPT, and HCPCS precision.
- [ ] **Day 9: AR Follow-Up (`/services/ar-follow-up`) & Denial Management (`/services/denial-management`)**
  - Highlight 0–90+ day aging bucket recovery and root-cause denial tracing.
- [ ] **Day 41: Medical Coding ICD-10 & CPT Update Section**
  - Add upcoming 2026/2027 code set changes section to `/services/medical-coding`.
- [ ] **Day 43: Denial Management SERP Feature Snippets**
  - Implement comparison tables and definition blocks on `/services/denial-management` targeting Google featured snippets.
- [ ] **Day 17 & Day 37: Contextual Internal Linking Pass**
  - Add contextual keyword anchor links from newly published blog posts to core conversion pages.

---

## 📝 Pending Content Publishing (Awaiting Content Writer Drafts)

As soon as the content writing team delivers these articles, they will be formatted, paired with SEO metadata, and published via the blog system:

1. [ ] **Day 10 (Blog 1):** *"5 Proven Strategies to Reduce Claim Denials in U.S. Medical Practices"*
   - *Target Keyword:* `reduce claim denials medical practice`
2. [ ] **Day 11 (Blog 2):** *"How to Outsource Medical Billing Without Disrupting Your Existing EHR Workflow"*
   - *Target Keyword:* `how to outsource medical billing`
3. [ ] **Day 23 (Blog 3):** *"Navigating Commercial Payer Denials: A Practice Manager's Playbook"*
   - *Target Keyword:* `medical billing denial management`
4. [ ] **Day 29 (Blog 4):** *"Behavioral Health Medical Billing & Verification Best Practices"*
   - *Target Keyword:* `medical billing for behavioral health`
5. [ ] **Day 36 (Case Study):** *"How a Multi-Specialty Clinic Cut AR Days from 75 to 32"*
   - *Target Keyword:* `revenue cycle management USA`

---

## 🚫 External Tasks Handled by Other Teams (Not Website Code)
- **Local SEO Lead:** Google Business Profile (GBP) creation, verification, posts, and review outreach.
- **Link Builder:** 30+ directory citations (Healthgrades, WebMD, YellowPages), guest post outreach, medical provider profile links.
- **PR Lead:** Digital press release creation & distribution to healthcare networks.
- **Social Media Team:** Content distribution and social link hooks.
