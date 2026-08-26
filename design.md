# gosvizzera — Design System & Guidelines

## 1. Typography

This project pairs an elegant high-contrast serif font (**Bodoni Moda**) with a clean, readable sans-serif font (**Lato**).

### Font Stack & Roles

| Font Name | Classification | Intended Usage | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| **Bodoni Moda** | Serif / Display | Hero titles, section headings, editorial accents, italic highlights | `font-serif`, `font-bodoni` |
| **Lato** | Sans-Serif | Body copy, navigation links, buttons, captions, form inputs | `font-sans`, `font-lato` |

### Integration Details

- **Source**: Google Fonts via `next/font/google` (zero layout shift, preloaded locally by Next.js).
- **Configuration File**: [`src/app/layout.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/app/layout.tsx)
- **Tailwind v4 Theme Mapping**: [`src/app/globals.css`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/app/globals.css)
  - `--font-bodoni` ➔ `font-bodoni` / `font-serif`
  - `--font-lato` ➔ `font-lato` / `font-sans`

### Usage Examples

```tsx
// Hero Title with Bodoni Italic & Lato Subtitle
<h1 className="font-serif italic text-6xl text-brand-yellow">
  Bodoni
</h1>
<p className="font-sans uppercase tracking-widest text-xl text-brand-light">
  LATO
</p>
```

---

## 2. Brand Colors

The official brand color is derived directly from the logo:

| Role | Color Name | Hex Code | RGB | Tailwind Utility | Intended Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Brand** | Alpine Deep Teal / Pine | `#04474E` | `rgb(4, 71, 78)` | `bg-brand`, `text-brand`, `border-brand` | Logo, primary buttons, key header accents, active states, brand highlights |
| **Brand Foreground** | White | `#FFFFFF` | `rgb(255, 255, 255)` | `text-brand-foreground` | High-contrast text on brand background |

### CSS Variables & Integration

Configured in [`src/app/globals.css`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/app/globals.css):

```css
:root {
  --brand: #04474E;
  --brand-foreground: #ffffff;
}

@theme inline {
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
}
```

### Usage Examples

```tsx
// Brand CTA Button
<button className="bg-brand text-white hover:bg-brand/90 font-sans font-medium px-6 py-3 rounded-full transition shadow-md">
  Explore Switzerland
</button>

// Hero Header with Brand Color
<h1 className="font-serif italic text-brand text-6xl">
  gosvizzera
</h1>
```

---

## 3. UI Guidelines

- **Headings**: Use `font-serif` (`Bodoni Moda`) with generous tracking and optional italic styles for a luxury Swiss / travel editorial feel.
- **Hierarchy**: Keep a clear separation between display elements (Bodoni) and functional UI text (Lato).

---

## 4. Header & Navigation Architecture

- **Component**: [`src/components/Navbar.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/Navbar.tsx)
- **Style**: Floating pill layout with `bg-white/95 backdrop-blur-md`, subtle border and drop shadow.
- **Logo**: `/images/gosvizzera-logo.png`
- **Contact Number**: `+1 (469) 403-5472` (`tel:+14694035472`)
- **Primary CTA**: `Book a Strategy Call` (`bg-brand`, `text-brand-foreground`)

### 6 Core Services Menu:
1. **Insurance Verification** (`/services/insurance-verification`) — Real-time eligibility & benefits validation.
2. **Prior Authorization** (`/services/prior-authorization`) — Fast-track pre-approvals & payer coordination.
3. **Medical Coding** (`/services/medical-coding`) — Certified ICD-10, CPT & HCPCS compliant coding.
4. **Revenue Cycle Management** (`/services/revenue-cycle-management`) — End-to-end RCM optimization.
5. **Claims Management** (`/services/claims-management`) — Clean claim submissions & proactive rejection handling.
6. **AR Follow-Up** (`/services/ar-follow-up`) — Aged accounts receivable recovery & cash flow acceleration.

---

## 5. Button System & Guidelines

- **Component**: [`src/components/ui/Button.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ui/Button.tsx)
- **Base Style**: Pill shape (`rounded-full`), smooth hover micro-transitions, clean `font-sans` Lato typography, and active press scale.
- **Continuous Shine (`shimmer={true}`)**: **Reserved exclusively for the Floating Navbar CTA** ("Book a Strategy Call") to act as the primary visual magnet without cluttering the rest of the page.
- **Page Buttons (`shimmer={false}`, Default)**: Clean, solid brand color (`#04474E`) or outline styles for a distraction-free, premium experience.

### Usage:

```tsx
import Button from "@/components/ui/Button";

// Navbar Highlight CTA with continuous shine
<Button href="/contact" size="sm" shimmer={true}>
  Book a Strategy Call
</Button>

// Standard Page Primary CTA (Clean solid brand color)
<Button href="/contact" size="lg">
  Book a Strategy Call &rarr;
</Button>

// Outline Variant
<Button href="/services" variant="outline">
  Explore Services
</Button>
```

---

## 6. Hero Section & Animated Icons (`itshover`)

- **Component**: [`src/components/Hero.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/Hero.tsx)
- **Animated Icon Library**: `motion/react` powered animated SVG micro-interaction icons following the [itshover.com](https://www.itshover.com/icons) architecture (`onHoverStart` / `onHoverEnd` and imperative handles).
- **Icon Directory**: [`src/components/icons/`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/icons)

### Hero Content Hierarchy:
- **Trust Badge**: `Trusted Healthcare Outsourcing Partner`
- **Sub-tag**: `Healthcare Outsourcing Services`
- **Main Heading (Bodoni Moda)**: `Precision in RCM. Excellence in Results.`
- **Body Copy (Lato)**: `Svizzera Healthcare Solutions empowers physician practices, specialty clinics, and healthcare organizations with reliable outsourcing services, including prior authorization, medical coding, insurance verification, charge entry, and revenue cycle management, so providers can focus on delivering exceptional patient care.`
- **Action CTAs**: `[Book a Strategy Call]` (Brand Primary) & `[Explore Our Services]` (Clean Outline)

### 4 Core Value Pillars & Animated Icons:
1. **HIPAA Focused** — *Secure Healthcare Operations* (`ShieldCheckIcon.tsx`)
2. **Fast Turnaround** — *Efficient & Reliable Delivery* (`ZapIcon.tsx`)
3. **Experienced Team** — *Dedicated Healthcare Experts* (`UsersIcon.tsx`)
4. **Quality Driven** — *Accuracy & Compliance First* (`BadgeCheckIcon.tsx`)

---

## 7. Dark & Light Theme System

- **Provider**: [`src/components/ThemeProvider.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ThemeProvider.tsx) (powered by `next-themes` with `attribute="class"`).
- **Toggle Component**: [`src/components/ThemeToggle.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ThemeToggle.tsx) featuring animated Sun/Moon rotation transitions.
- **Theme Variables**: Configured in [`src/app/globals.css`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/app/globals.css) with `@custom-variant dark`.
  - Light background: `#f8fafc` / text: `#0f172a`
  - Dark background: `#080c14` / text: `#f8fafc` / dark cards: `#0f172a`
  - Brand: `#04474E` / Dark brand accents: `#065a63` & teal glows.

## 8. Motion & Subtle On-Scroll Animations

- **Engine**: `motion/react` (Framer Motion).
- **Philosophy**: *Little bit & subtle* — avoiding jarring or aggressive animations.
- **Standard Motion Pattern**:
  - `initial={{ opacity: 0, y: 12 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `transition={{ duration: 0.5, ease: "easeOut" }}`
  - Gentle staggered delays for cards (`delay: index * 0.06s`).

---

## 9. Services Section & Border Beam Panels

- **Section Component**: [`src/components/Services.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/Services.tsx)
- **Card UI Primitive**: [`src/components/ui/border-beam-panel.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ui/border-beam-panel.tsx) (Twin comets orbiting a 2px border ring with sprung velocity & dynamic hover acceleration).
- **Header**:
  - **Tag**: `OUR SERVICES`
  - **Heading (Bodoni Moda)**: `Revenue Cycle Services. One Trusted Partner.`
  - **Subtitle (Lato)**: `End-to-end healthcare revenue cycle support designed to improve operational efficiency, reduce administrative burden, and maximize reimbursements.`

### 6 Core Service Cards:
1. **Insurance Verification** (`/services/insurance-verification`)
2. **Prior Authorization** (`/services/prior-authorization`)
3. **Medical Coding** (`/services/medical-coding`)
4. **Revenue Cycle Management** (`/services/revenue-cycle-management`)
5. **Claims Management** (`/services/claims-management`)
6. **AR Follow-Up** (`/services/ar-follow-up`)

---

## 10. Get Started & Consultation Section

- **Component**: [`src/components/GetStarted.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/GetStarted.tsx)
- **Typography & Structure**:
  - Tag: `GET STARTED`
  - Main Headline (Bodoni Moda): `Ready to Strengthen Your Revenue Cycle?`
  - Subtitle (Lato): `Getting Started is Simple.`
  - Description: `No complicated onboarding, system changes, or long-term contracts. We assess your current revenue cycle, develop a customized plan for your practice, and support you every step of the way.`
  - 3-Step Process: Discovery & Assessment ➔ Tailored Strategy ➔ Seamless Launch.
  - Interactive Consultation Card with `Schedule A Free Consultation` CTA button (`shimmer={true}` continuous shine) and 1-hour response time guarantee.

---

## 11. How We Work / Onboarding Steps Section

- **Wrapper Component**: [`src/components/HowWeWork.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/HowWeWork.tsx)
- **UI Primitive**: [`src/components/ui/how-it-works.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ui/how-it-works.tsx)
- **Typography & Structure**:
  - Tag: `How We Work`
  - Headline (Bodoni Moda): `From First Call to Fully Operational in Days`
  - Paragraph (Lato): `Our proven onboarding process gets your practice running with full RCM operational support in days, not weeks. No disruption. No surprises. No renegotiation mid-process.`
  - **5 Pinned Step Cards with Images**:
    1. `Discovery Call` (`/images/step1.png`)
    2. `Workflow Assessment` (`/images/step2.png`)
    3. `Team Alignment` (`/images/step3.jpeg`)
    4. `Implementation` (`/images/step4.png`)
    5. `Ongoing Support & Optimization` (`/images/step5.jpeg`)
  - Seamless background flow (`bg-transparent`) connected by a continuous flowing dashed SVG curve.

---

## 12. FAQ & Live Performance Metrics Section

- **Component**: [`src/components/FAQ.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/FAQ.tsx)
- **Design Structure**:
  - **Left Side (Sticky Live Metrics)**:
    - Heading: `Everything You Need to Know` (Bodoni Moda)
    - Subtitle: `Frequently Asked Questions`
    - Live Card: Pulsating live status, dynamic animated counter for **98.7% Claims Accuracy** and **24 hr Auth Turnaround**, animated 6-month collection sparkline (peak 96.2%), and HIPAA/SOC 2/BAA trust badges.
  - **Right Side (Interactive Accordion)**:
    - 8 healthcare-specific RCM questions with animated rotate toggle icons and smooth height expansion.

---

## 13. Clinical Specialties Orbital Hub Section

- **Component**: [`src/components/Specialties.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/Specialties.tsx)
- **Typography & Structure**:
  - **Tag**: `Clinical Specialties`
  - **Headline (Bodoni Moda)**: `Expertise Across the Entire Clinical Spectrum`
  - **Subtitle (Lato)**: `Our teams are trained in specialty-specific coding guidelines, authorization criteria, and payer nuances so you never need to re-educate a support partner on your specialty.`
  - **Left Side (Orbital Interactive Hub)**:
    - Center core: `SVIZZERA RCM CORE`
    - 8 orbiting specialty node circles (Cardiology, Primary Care, Infusion, Wound Care, Gastroenterology, Behavioral Health, Urgent Care, Multi-Specialty) with active connector lines, animated orbit comet ring, and auto-rotation (pauses for 7s on user click).
  - **Right Side (Specialty Detail Showcase Card)**:
    - Animated AnimatePresence transition, dynamic specialty title, description, 4 capability feature badges, progress pagination, and direct consultation CTA.

---

## 14. High-Converting Brand Footer

- **Component**: [`src/components/Footer.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/Footer.tsx)
- **Design Elements**:
  - **Top Pre-Footer Action Banner**: Fast-action direct call button (`+1 (469) 403-5472`) and `Book Strategy Call` CTA.
  - **Brand & Identity**: Official logo pill, company overview, 1-hour response SLA pledge.
  - **Navigation Columns**: Core RCM Services (6 services), Clinical Specialties (7 areas), Company & Compliance.
  - **Practice Intelligence Newsletter Box**: Direct email subscription for healthcare billing & payer changes.
  - **Trust Badges**: HIPAA Compliant, SOC 2 Ready, BAA Protected.
  - **Bottom Bar**: Legal copyright, Privacy Policy, Terms of Service, HIPAA statement links.

---

## 15. About Us Page & AnimatedText Component

- **Pages & Components**:
  - [`src/app/about/page.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/app/about/page.tsx)
  - [`src/components/ui/animated-text.tsx`](file:///e:/AAA%20BizBox/18%20-%20gosvizzera/src/components/ui/animated-text.tsx)
- **Typography & Headline**:
  - Main hero displays `<AnimatedText text="About Svizzera Healthcare Solutions" />` with staggered spring character entrance and gradient underline sweep.
- **Sections**:
  - **Hero with Purpose & Tallahassee, FL Headquarters context**.
  - **4 Key Milestones**: 98.7% Clean Claim Rate, <24 Hrs Prior Auth, 3–7 Days Onboarding, 100% HIPAA Compliance.
  - **Mission & Vision Story**: Practitioner-first advocacy, eliminating administrative burnout.
  - **4 Operational Pillars**: Clinical Precision, Rapid SLA Velocity, Uncompromising Compliance, Practitioner-Centric Focus.
  - **Call to Action & Global Footer Integration**.







