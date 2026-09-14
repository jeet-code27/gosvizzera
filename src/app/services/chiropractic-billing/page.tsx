"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { FeatureCard, FeatureType } from "@/components/ui/grid-feature-cards";
import { LogoCloud } from "@/components/ui/logo-cloud-15";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import FAQSection, { type FAQItem } from "@/components/ui/faq-monochrome";
import {
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  AlertTriangle,
  Layers,
  Scale,
  DollarSign,
  Search,
  Activity,
  UserCheck,
  Building2,
  Sparkles,
  Calendar,
  FileText,
  HelpCircle,
  Stethoscope,
  RotateCcw,
} from "lucide-react";

// 4 Core Specialty Feature Pillars
const chiropracticFeatures: FeatureType[] = [
  {
    metric: "Benefit Caps",
    title: "Visit-Limit & Benefit Tracking",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description:
      "We identify visit-limit risks early by monitoring payer-specific annual, monthly, or condition-based benefit caps to prevent surprise post-limit rejections and patient balance disputes.",
  },
  {
    metric: "CMS Compliance",
    title: "Medicare & ABN Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Strict Advance Beneficiary Notice (ABN) documentation oversight and modifier compliance (GA, GX, GY, GZ) for non-covered Medicare maintenance and active treatment adjustments.",
  },
  {
    metric: "Root-Cause First",
    title: "Denial Prevention & Appeals",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description:
      "Denials are traced to root causes, corrected, and appealed with supporting clinical notes. We prepare formal first-level appeals and coordinate peer-to-peer discussions when medical necessity is challenged.",
  },
  {
    metric: "Dedicated Pods",
    title: "Dedicated Chiropractic Billing Support",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "Experienced billing teams that understand subluxation documentation requirements, CPT CMT codes (98940–98943), modalities, and prompt communication directly with your clinic.",
  },
];

// 5 Pinned Steps: How the Billing Process Works
const chiropracticWorkflowSteps: Step[] = [
  {
    title: "1. Review Workflow & Payer Mix",
    description:
      "Review the practice's current billing workflow, payer mix, outstanding accounts receivable, and specific historical claim friction points.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "2. Identify Payer Rules & Visit Limits",
    description:
      "Identify payer-specific requirements, documentation expectations, authorization policies, and potential visit-limit or coverage issues before claims leave your desk.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "3. Submit & Monitor Claims",
    description:
      "Submit scrubbed, verified chiropractic claims with accurate CMT, therapy, and modality coding, tracking clearinghouse adjudication continuously.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "4. Track Balances & File Appeals",
    description:
      "Track unpaid and denied claims, correct technical errors promptly, and pursue formal first-level appeals with supporting SOAP notes when appropriate.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "5. Prevent Recurring Denials",
    description:
      "Review recurring denial causes to implement upstream preventative edits, providing practice leadership with transparent billing visibility and reporting.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// FAQs for Chiropractic Billing
const chiropracticFaqs: FAQItem[] = [
  {
    question: "Who provides medical billing for chiropractic practices?",
    answer:
      "A specialized medical billing company can provide billing, claims follow-up, denial management, and revenue cycle support for chiropractic practices. Practices should ensure the partner understands chiropractic-specific payer rules, modality bundling, and documentation requirements.",
    meta: "Provider Fit",
  },
  {
    question: "What billing codes are used in chiropractic care?",
    answer:
      "Chiropractic billing commonly involves Chiropractic Manipulative Treatment (CMT) CPT codes (98940 for 1-2 regions, 98941 for 3-4 regions, 98942 for 5 regions, and 98943 for extra-spinal regions), paired with physical medicine modalities (97010–97140), E&M evaluation codes, and precise neuromusculoskeletal ICD-10 diagnosis codes.",
    meta: "Coding",
  },
  {
    question: "Why do chiropractic claims get denied?",
    answer:
      "Common causes include exceeding payer-specific visit or benefit limits, lack of medical necessity documentation, missing pre-authorizations, incorrect modifier usage (such as -25, -59, or -GP), unbundling edits, and Medicare non-coverage issues.",
    meta: "Denials",
  },
  {
    question: "Does Medicare cover chiropractic visits?",
    answer:
      "Medicare Part B covers only active, medically necessary manual manipulation of the spine to correct a subluxation. Medicare does not cover maintenance therapy, x-rays, physical modalities, or extra-spinal adjustments. When services are non-covered or deemed maintenance, proper Advance Beneficiary Notice (ABN) documentation and modifiers are essential.",
    meta: "Medicare",
  },
  {
    question: "How does visit-limit tracking prevent write-offs?",
    answer:
      "Many commercial insurance and HMO plans cap chiropractic coverage at 12 to 30 visits per benefit year. By tracking cumulative encounters before visits occur, practices can secure timely re-authorizations, notify patients in advance, or transition to private-pay fee schedules without unexpected denials.",
    meta: "Visit Limits",
  },
  {
    question: "Can denied chiropractic claims be appealed?",
    answer:
      "Yes. When payers deny claims citing lack of medical necessity or maintenance care, a structured appeal with objective functional outcome assessments, treatment goals, and progress notes can overturn the denial and recover earned revenue.",
    meta: "Appeals",
  },
  {
    question: "Does Svizzera work within our existing EHR and clearinghouse?",
    answer:
      "Yes. Svizzera integrates directly within your existing chiropractic software (e.g., ChiroTouch, Jane, Kareo, Athenahealth, AdvancedMD, etc.) without requiring costly migrations or workflow disruptions.",
    meta: "EHR Compatibility",
  },
  {
    question: "How do we get started with a chiropractic billing analysis?",
    answer:
      "You can request a Free Billing & Denial Analysis. We will review your recent remits, aged accounts receivable, and denial patterns to uncover where your practice is leaking revenue and how our workflow can support you.",
    meta: "Getting Started",
  },
];

// Common Chiropractic Denial Triggers
const chiropracticDenialTriggers = [
  "Payer annual visit-limit caps reached without prior notification or re-authorization",
  "Medicare claims submitted without primary subluxation diagnosis or spinal region specificity",
  "Failure to execute a compliant Advance Beneficiary Notice (ABN) for maintenance adjustments",
  "Missing modifier -25 when billing a significant, separately identifiable E&M visit with CMT",
  "Modality bundling denials (e.g., therapeutic exercise 97110 unbundled with manipulation)",
  "Payer LCD/NCD non-coverage clauses for physical medicine services performed by DCs",
  "Lack of documented objective functional improvements in regular re-examination notes",
  "Timely filing expirations on complex secondary and tertiary payer cross-overs",
];

// JSON-LD Schema
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Chiropractic Billing Services",
      "serviceType": "Chiropractic Billing Services",
      "url": "https://gosvizzera.com/services/chiropractic-billing",
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "provider": {
        "@type": "Organization",
        "name": "Svizzera Healthcare",
        "url": "https://gosvizzera.com/",
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://gosvizzera.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://gosvizzera.com/services/",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Chiropractic Billing",
          "item": "https://gosvizzera.com/services/chiropractic-billing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": chiropracticFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ],
};

export default function ChiropracticBillingPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-transparent">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Specialty Billing • Visit-Limit Tracking • Medicare ABN Compliance
          </motion.div>

          {/* AnimatedText Headline in Bodoni Moda */}
          <div className="pt-2">
            <AnimatedText
              as="h1"
              text={"Chiropractic Billing Services\nBuilt Around Payer Visit Limits"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          {/* Hero Subtitle / Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className="space-y-3.5 max-w-2xl mx-auto pt-2"
          >
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 font-sans">
              Stop losing revenue to benefit caps, documentation edits, and Medicare write-offs.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Chiropractic billing can become difficult when payer-specific visit limits, medical-necessity requirements, authorisation rules, documentation expectations, and timely filing requirements affect whether a claim is paid. A billing process that does not monitor these requirements can leave a practice dealing with avoidable denials, delayed reimbursement, and growing accounts receivable.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed">
              Svizzera Healthcare provides structured medical billing and revenue cycle management built to navigate complex chiropractic payer rules, eliminate visit-cap rejections, and protect practice cash flow.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
            className="pt-3 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
              <span>Get Your Billing & Denial Analysis</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button href="#chiropractic-workflow" variant="outline" size="lg">
              Explore Our Workflow
            </Button>
          </motion.div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
            Request your Free Billing & Denial Analysis to understand the billing issues affecting your revenue cycle and the opportunities for improvement.
          </p>

          {/* 4 Trust Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
            className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Payer visit-limit & benefit tracking
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Medicare ABN compliance protocols
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Award className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                98%+ first-pass clean claim rate
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Response within 1 business hour
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Core Specialty Approach & Workflow */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Workflow Designed Around Payer Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                SPECIALTY-AWARE REVENUE CYCLE
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                A Chiropractic Billing Workflow <br className="hidden sm:inline" />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Designed Around Payer Requirements
                </span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  For a chiropractic practice, billing is not simply about submitting a claim after a visit. Payer requirements can influence whether services are covered, whether additional documentation is needed, and whether the patient&apos;s benefit or visit limit has been reached. A specialty-aware workflow should identify these requirements before they become payment problems.
                </p>
                <p>
                  The Svizzera service positioning is built around monitoring payer rules, identifying potential visit-limit issues, supporting appropriate documentation and billing workflows, and following unpaid or denied claims through resolution.
                </p>
                <p>
                  Our certified teams handle the front-to-back lifecycle — so your clinic can focus on adjustments and patient wellness while your revenue remains protected.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/services/medical-billing-services"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline"
                >
                  <span>Explore full Medical Billing Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services/denial-management"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline"
                >
                  <span>See Denial Management</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Practice Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-9 shadow-xl relative overflow-hidden space-y-5"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Stethoscope className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                Chiropractic Billing Company Support
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Choosing a chiropractic medical billing company should involve more than comparing billing fees. Practice owners should understand whether the billing partner has actual experience with chiropractic payer requirements, how it handles denials, how it follows up on outstanding accounts, how it communicates with the practice, and how its systems fit the existing workflow.
                </p>
                <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/50 text-slate-800 dark:text-slate-200 font-medium">
                  Svizzera provides structured medical billing with HIPAA-focused operations, BAA execution, AAPC/AHIMA certified coders, a verified 98%+ first-pass clean claim rate, and responsive support within one business hour.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE SPECIALTY PILLARS */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              SPECIALIZED CAPABILITIES
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Addressing Chiropractic&apos;s <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Biggest Billing Challenges
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              From managing payer benefit caps and Medicare ABN forms to rigorous first-level appeals for challenged medical necessity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            {chiropracticFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={idx}
                className={
                  idx >= 4
                    ? "lg:border-t lg:border-dashed lg:border-slate-200 dark:lg:border-slate-800"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMMON DENIAL TRIGGERS IN CHIROPRACTIC */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-3.5 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              DENIAL PREVENTION
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Common Causes of <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Chiropractic Claim Denials
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              When chiropractic claims are denied, the reason matters. Identifying the root trigger upstream prevents repeat revenue loss.
            </p>
          </motion.div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chiropracticDenialTriggers.map((trigger, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-teal-300/40 dark:hover:border-teal-500/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 font-sans">
                    {trigger}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                <strong className="text-slate-800 dark:text-slate-200 font-medium">Proactive Oversight:</strong> Svizzera tracks denials to their underlying cause, corrects claims, pursues formal first-level appeals, and coordinates peer-to-peer processes when applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW THE BILLING PROCESS WORKS */}
      <section
        id="chiropractic-workflow"
        className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans"
            >
              STRUCTURED REVENUE CYCLE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              How Our Chiropractic <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Billing Process Works
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              From practice discovery and visit-limit auditing through clean claim submission, appeals, and prevention.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={chiropracticWorkflowSteps} />
        </div>
      </section>

      {/* 6. WHY CHOOSE SVIZZERA HEALTHCARE */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-3.5 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              STANDARDS & ACCURACY
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Why Choose <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Svizzera Healthcare
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Svizzera Healthcare takes a structured approach to medical billing and revenue cycle management, with a HIPAA-focused approach and BAA provided.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                HIPAA-Focused & BAA Provided
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                Full compliance protocols and contractual safeguards for protected patient information.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <Award className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                AAPC/AHIMA Certified Coders
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                Experienced coding professionals versed in physical medicine, CMT, and modifier rules.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <FileCheck2 className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                98%+ Clean Claim Rate
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                Rigorous pre-submission scrubbing to minimize avoidable clearinghouse and payer rejections.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <Clock className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                1-Hour Response SLA
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                Prompt, transparent communication directly with your clinic administrator and front desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Major Payers Marquee */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="PAYERS WE SUBMIT AND APPEAL TO NATIONWIDE"
          items={[
            "UnitedHealthcare",
            "Aetna",
            "Cigna",
            "Humana",
            "BCBS Plans",
            "Medicare Part B",
            "Medicare Advantage",
            "Medicaid MCO",
            "Optum Health / Optum Physical Health",
            "ASH (American Specialty Health)",
            "ChiroHealthUSA",
          ]}
        />
      </section>

      {/* 8. FAQ Section */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="Essential questions regarding chiropractic billing codes, Medicare coverage, visit limits, and denials."
          items={chiropracticFaqs}
        />
      </section>

      {/* 9. Bottom Conversion Section */}
      <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 dark:bg-teal-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-teal-600/10 dark:bg-teal-900/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            FREE BILLING & DENIAL ANALYSIS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
            Get Your Chiropractic <br className="hidden sm:inline" />
            <span className="italic text-teal-400 font-medium">
              Billing & Denial Analysis
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            If you are reviewing your practice&apos;s billing performance, a billing and denial analysis can help identify where claims are being delayed, denied, or left unresolved.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Request your Free Billing & Denial Analysis to understand the billing issues affecting your revenue cycle and the opportunities for improvement.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
            >
              <span>Request Your Free Billing & Denial Analysis</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <a
              href="tel:+14694035472"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Call +1 (469) 403-5472</span>
            </a>
          </div>

          <p className="text-xs text-teal-300/80 font-mono tracking-wide pt-2">
            Response within one business hour is the stated service commitment.
          </p>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
