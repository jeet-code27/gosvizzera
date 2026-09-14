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
  RotateCcw,
  GitPullRequest,
  RefreshCw,
  FileSearch,
  Stethoscope,
  HelpCircle,
} from "lucide-react";

// 6 Core Features: Why Choose Svizzera for Denial Management
const denialCapabilitiesFeatures: FeatureType[] = [
  {
    metric: "Root-Cause First",
    title: "Root-Cause-First Denial Workflow",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    description:
      "We trace rejections past the surface remark code back to upstream registration, coding, documentation, or authorization breakdowns to fix the underlying issue permanently.",
  },
  {
    metric: "Formal Submissions",
    title: "First-Level Appeal Support",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Eligible denials receive comprehensive appeal packages with clinical documentation, payer medical policy citations, and timely filing proofs rather than generic resubmissions.",
  },
  {
    metric: "Clinical Alignment",
    title: "Peer-to-Peer Coordination",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "When medical necessity is contested, we organize provider schedules, collate encounter records, and prepare peer-to-peer talking points to streamline medical director reviews.",
  },
  {
    metric: "Revenue Recovery",
    title: "Denial-Linked A/R Recovery",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description:
      "Unpaid denied balances do not sit dormant in aging buckets. We prioritize aging denial-related A/R by dollar value and timely filing deadlines to maximize cash collection.",
  },
  {
    metric: "Full Compliance",
    title: "HIPAA-Focused & BAA Support",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description:
      "All medical chart handling, payer appeals, and correspondence follow strict HIPAA guidelines with signed Business Associate Agreements executed prior to onboarding.",
  },
  {
    metric: "End-to-End Loop",
    title: "Upstream Prevention Loop",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description:
      "Recurring denial trends feed directly into front-end registration, coding updates, and claims scrubbing rules so your practice never repeats the same avoidable mistakes.",
  },
];

// 5 Pinned Flow Steps for the Root-Cause Denial Management Workflow
const denialWorkflowSteps: Step[] = [
  {
    title: "1. Trace the Denial",
    description:
      "We identify the denial reason, CARC/RARC codes, and review the relevant claim details and remits to understand exactly what went wrong.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "2. Determine the Root Cause",
    description:
      "The focus moves beyond the superficial payer message to the underlying process breakdown — coding, documentation, eligibility, authorization, or claim submission.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "3. Correct the Claim",
    description:
      "Where appropriate, the claim is corrected based on the identified root cause with updated modifiers, diagnosis codes, or demographic data and prepared for resubmission.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "4. Appeal When Appropriate",
    description:
      "Eligible claims move through formal first-level appeals with supporting documentation and clinical evidence, including peer-to-peer coordination when needed.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "5. Close the Prevention Loop",
    description:
      "Recurring denial patterns are fed back to your team with workflow adjustments, payer-specific scrubbing edits, and staff training to prevent future occurrences.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// 10 FAQs for Denial Management
const denialManagementFaqs: FAQItem[] = [
  {
    question: "What is medical claim denial management?",
    answer:
      "Medical claim denial management is the process of identifying why claims are denied, correcting or appealing eligible claims, following them through resolution, and analysing recurring denial causes to help prevent future problems.",
    meta: "Overview",
  },
  {
    question: "What causes medical claim denials?",
    answer:
      "Common causes include eligibility issues, missing authorizations, coding errors, documentation problems, duplicate claims, timely filing issues, incorrect payer information, coordination of benefits problems, and payer-specific requirements.",
    meta: "Root Causes",
  },
  {
    question: "How does denial management differ from A/R follow-up?",
    answer:
      "A/R follow-up focuses on outstanding balances and moving unpaid accounts toward resolution. Denial management focuses specifically on the reasons claims were denied, the appropriate recovery action, and preventing recurring denial causes.",
    meta: "Differentiation",
  },
  {
    question: "Can denied medical claims be appealed?",
    answer:
      "Some denied claims can be appealed depending on the denial reason, payer rules, claim details, and supporting documentation. Svizzera supports first-level appeals and peer-to-peer coordination where appropriate.",
    meta: "Appeals",
  },
  {
    question: "What is a good medical claim denial rate benchmark?",
    answer:
      "There is no single percentage that provides a complete answer because denial rates vary by specialty, payer mix, measurement method, and the types of claims included. Practices should evaluate denial reasons, financial impact, and recurring patterns alongside the overall rate.",
    meta: "Benchmarks",
  },
  {
    question: "How can a practice reduce claim denials?",
    answer:
      "Reducing denials starts with identifying recurring causes and addressing them upstream. Improvements may involve eligibility, authorization, coding, documentation, claim submission, payer-specific workflows, and staff processes.",
    meta: "Prevention",
  },
  {
    question: "Does Svizzera only work on denied claims?",
    answer:
      "No. Denial management can connect with claims management, A/R follow-up, medical billing, and broader revenue cycle management so denial information can be used to improve the wider billing process.",
    meta: "Integration",
  },
  {
    question: "Does Svizzera provide denial prevention services?",
    answer:
      "Yes. The root-cause workflow is designed to identify recurring denial causes and use those findings to support prevention and process improvement.",
    meta: "Prevention Loop",
  },
  {
    question: "Is denial management HIPAA compliant?",
    answer:
      "Medical billing and denial management involve protected health information, so appropriate privacy and security safeguards are essential. Svizzera follows a HIPAA-focused approach and supports a Business Associate Agreement.",
    meta: "Compliance",
  },
  {
    question: "How do I get a denial analysis from Svizzera?",
    answer:
      "Request a Free Denial & Billing Analysis. The review can help identify denial patterns, potential root causes, and areas where your practice may benefit from specialised denial management.",
    meta: "Getting Started",
  },
];

// Common causes list
const commonDenialCauses = [
  "Incorrect or incomplete patient demographic information",
  "Eligibility or insurance coverage lapses",
  "Missing, expired, or invalid prior authorizations",
  "Coding errors, unbundling, or missing modifiers",
  "Insufficient clinical documentation to support medical necessity",
  "Duplicate claim submissions and overlapping dates of service",
  "Timely filing limit expirations (90–365 days)",
  "Incorrect clearinghouse routing or payer ID numbers",
  "Medical necessity disagreements and experimental procedure clauses",
  "Coordination of benefits (COB) primary/secondary conflicts",
  "Services failing to meet payer-specific LCD/NCD coverage policies",
];

// Target audience profiles
const denialTargetAudience = [
  "Practices experiencing rising denial rates across commercial or Medicare payers",
  "Billing teams spending excessive hours researching repeated claim rejections",
  "Practices with growing denial-related accounts receivable aging past 90+ days",
  "Organizations facing frequent medical necessity denials requiring formal appeals",
  "Practices lacking analytics and visibility into root denial triggers",
  "Healthcare providers wanting to eliminate preventable denials upstream",
  "Clinics needing specialized denial recovery and peer-to-peer coordination capacity",
];

// JSON-LD Schema
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Medical Claim Denial Management Services",
      "serviceType": "Medical Claim Denial Management Services",
      "url": "https://gosvizzera.com/services/denial-management",
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
          "name": "Denial Management",
          "item": "https://gosvizzera.com/services/denial-management",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": denialManagementFaqs.map((faq) => ({
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

export default function DenialManagementPage() {
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
            Root-Cause-First • First-Level Appeals • Peer-to-Peer Support
          </motion.div>

          {/* AnimatedText Headline in Bodoni Moda */}
          <div className="pt-2">
            <AnimatedText
              as="h1"
              text={"Denial Management Services\nThat Fix the Root Cause, Not Just the Claim"}
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
            <p className="text-base sm:text-lg font-medium text-rose-600 dark:text-rose-400 font-sans">
              Stop treating the symptom. Eliminate preventable denials at their source.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Repeated medical claim denials can quietly drain a practice&apos;s revenue while consuming hours of staff time. One denied claim may seem manageable. A pattern of denials across payers, procedures, providers, or documentation issues is a much bigger problem.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed">
              Svizzera Healthcare provides medical claim denial management services for U.S. medical practices that need more than basic claim follow-up. Our approach traces denials back to their underlying causes, addresses the individual claim, and feeds what we learn back into the billing process to help prevent repeat denials.
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
              <span>Request Your Free Denial & Billing Analysis</span>
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
            <Button href="#root-cause-workflow" variant="outline" size="lg">
              Explore Denial Workflow
            </Button>
          </motion.div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
            Request a Free Denial & Billing Analysis to identify recurring denial patterns, potential root causes, and areas where your revenue cycle may need attention.
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
                <Search className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Root-cause-first investigation workflow
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <FileCheck2 className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Formal first-level appeals & peer-to-peer
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <RefreshCw className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Continuous prevention loop for staff & EHR
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                HIPAA-focused · BAA provided
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Problem Diagnosis & What Is Medical Claim Denial Management? */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: What Is Denial Management */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                ROOT-CAUSE ANALYSIS
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                What Is Medical Claim <br className="hidden sm:inline" />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Denial Management?
                </span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Medical claim denial management is the process of identifying why claims are denied, correcting issues where possible, resubmitting or appealing eligible claims, and analysing denial patterns to reduce future occurrences.
                </p>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Effective denial management should not stop once an individual claim is corrected.
                </p>
                <p>
                  If ten claims are being denied for the same reason, correcting those ten claims without addressing the underlying process leaves the practice exposed to the same problem again. That is why Svizzera takes a root-cause-first approach. The objective is to recover eligible revenue while also making the billing process less vulnerable to recurring, preventable denials.
                </p>
              </div>

              <div className="pt-2">
                <Button href="/contact" size="sm" shimmer={true}>
                  <span>Get Your Billing & Denial Analysis</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>

            {/* Right: Why Repeated Denials Are a Revenue Cycle Problem */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-9 shadow-xl relative overflow-hidden space-y-5"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/60 dark:border-rose-800/60">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                Why Repeated Denials Are a Revenue Cycle Problem
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Denials create more than a temporary payment delay. Each denial can require staff to investigate the payer&apos;s response, review documentation, correct information, resubmit a claim, prepare an appeal, or communicate with the payer.
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-slate-800 dark:text-slate-200 font-medium">
                  When denials occur repeatedly, administrative costs increase while revenue remains tied up in unresolved accounts. Patterns can indicate problems earlier in the revenue cycle — registration, eligibility, coding, documentation, charge capture, or submission.
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  The sooner those patterns are identified, the easier it becomes to address the source instead of repeatedly treating the symptom.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. COMMON CAUSES OF MEDICAL CLAIM DENIALS */}
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
              DIAGNOSTIC CATEGORIES
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Common Causes of <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Medical Claim Denials
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Denials can happen for many reasons, and the cause is not always located at the point where the denial becomes visible.
            </p>
          </motion.div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonDenialCauses.map((cause, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-teal-300/40 dark:hover:border-teal-500/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 font-sans">
                    {cause}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                <strong className="text-slate-800 dark:text-slate-200 font-medium">The key takeaway:</strong> Categorising denials accurately helps determine which issues are isolated rejections and which represent recurring workflow vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROOT-CAUSE WORKFLOW — 5 Pinned Steps */}
      <section
        id="root-cause-workflow"
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
              CLOSED-LOOP RESOLUTION
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Our Root-Cause <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Denial Management Workflow
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              A continuous 5-stage protocol: trace denial &rarr; isolate root cause &rarr; correct &rarr; appeal &rarr; close the prevention loop.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={denialWorkflowSteps} />

          {/* Callout Banner */}
          <div className="mt-12 text-center">
            <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
              <span>Find the Root Cause of Your Denials</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. SERVICE DIFFERENTIATION & APPEALS CAPABILITY */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              SPECIALIZED FOCUS
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Denial Management vs. A/R Follow-Up: <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                What&apos;s the Difference?
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Denial management and accounts receivable follow-up are connected, but they solve different problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: A/R Follow-Up */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Aged Balances
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Accounts Receivable Follow-Up
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  A/R follow-up focuses on outstanding balances and the actions required to move unpaid accounts toward resolution. An A/R team monitors aging reports (30, 60, 90, 120+ days) and calls payers to identify whether an outstanding claim has been processed or needs attention.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/services/ar-follow-up"
                  className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explore Svizzera A/R Follow-Up Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2: Denial Management */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand/30 dark:border-teal-500/30 p-8 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 text-brand dark:text-teal-300 text-xs font-semibold uppercase tracking-wider font-sans border border-teal-200/50 dark:border-teal-800/50">
                  Root-Cause Triage & Appeals
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Denial Management Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Denial management focuses specifically on <strong className="text-slate-900 dark:text-slate-100 font-medium">why a claim was denied</strong>, what needs to happen to recover eligible reimbursement, and how recurring denial causes can be prevented. It examines remits, medical necessity criteria, appeals, and upstream processes.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-brand dark:text-teal-300">
                  Includes First-Level Appeals & Peer-to-Peer
                </span>
              </div>
            </div>
          </div>

          {/* First-Level Appeals and Peer-to-Peer Coordination Callout */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-sans">
              <FileCheck2 className="w-4 h-4" />
              EVIDENCE-BASED RESOLUTION
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
              First-Level Appeals and Peer-to-Peer Coordination
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Not every denial should be treated the same way. Some claims can be corrected and resubmitted, while others require a formal appeal based on the payer&apos;s clinical decision and available documentation. Svizzera supports formal first-level appeals and peer-to-peer coordination where appropriate. This creates a defined pathway for claims that need more than a basic correction.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              The purpose is to make the appeal process organised and evidence-based rather than allowing eligible revenue to remain unresolved simply because a claim was initially denied.
            </p>
            <div className="pt-2">
              <Link
                href="/blog/medical-claim-denial-appeals-process"
                className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Read our complete Medical Claim Denial Appeals Process guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PREVENTION & BENCHMARKS */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left: Denial Prevention: Stop Repeating the Same Mistakes */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 text-xs font-semibold uppercase tracking-wider font-sans border border-teal-200/60 dark:border-teal-800/60">
                  <RefreshCw className="w-3.5 h-3.5" />
                  LONG-TERM REVENUE PROTECTION
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  Denial Prevention: Stop Repeating the Same Mistakes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Recovery is important, but prevention is where denial management creates long-term value. Suppose a practice repeatedly receives denials because of a specific documentation issue. Working each denial individually may recover some revenue, but the practice will continue spending staff time on the same problem.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  A root-cause approach asks: <strong className="text-slate-900 dark:text-slate-100 font-medium">what needs to change upstream so fewer claims encounter the same issue?</strong> Denial trends are used to identify opportunities for workflow changes, staff education, coding review, payer-specific process adjustments, or front-end improvements.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-300 font-mono">
                Loop: Identify &rarr; Recover &rarr; Understand Cause &rarr; Improve Process &rarr; Monitor Decrease
              </div>
            </div>

            {/* Right: A Denial Rate Is Only One Part of the Picture */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  <Scale className="w-3.5 h-3.5" />
                  BEYOND VANITY METRICS
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  A Denial Rate Is Only One Part of the Picture
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Practice leaders often ask what a good denial rate benchmark should be. The answer depends on how denials are defined, measured, categorised, and reported. A single percentage does not tell you everything. Two practices could report similar denial rates while facing completely different financial and operational problems.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  You need to know which claims are being denied, why they are being denied, which payers are involved, how much revenue is at risk, how quickly denials are resolved, and whether the same causes keep returning.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/blog/why-medical-claims-get-denied"
                  className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Explore Why Medical Claims Get Denied</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SVIZZERA — 6 Verified Capabilities */}
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
              WHY CHOOSE SVIZZERA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Proven Capabilities for <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Denial Management
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              When denials are affecting revenue, you need more than a general billing provider that simply adds rejected claims to a work queue.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            {denialCapabilitiesFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={idx}
                className={
                  idx >= 3
                    ? "lg:border-t lg:border-dashed lg:border-slate-200 dark:lg:border-slate-800"
                    : ""
                }
              />
            ))}
          </div>

          {/* Internal Cross-Sell Pathways */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Complementary Services:
            </span>
            <Link
              href="/services/claims-management"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Claims Management &rarr;
            </Link>
            <Link
              href="/services/ar-follow-up"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              A/R Follow-Up &rarr;
            </Link>
            <Link
              href="/services/medical-billing-services"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Medical Billing Services &rarr;
            </Link>
            <Link
              href="/services/revenue-cycle-management"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Revenue Cycle Management &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 8. WHO NEEDS DENIAL MANAGEMENT & WHAT TO EXPECT */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Who Needs Denial Management */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                TARGET PRACTICES
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Who Needs Medical Claim <br />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Denial Management Services?
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Denial management may be particularly valuable for practices that are seeing a rising denial rate, recurring payer rejections, growing outstanding balances, or increasing staff time spent researching unpaid claims.
              </p>

              <div className="space-y-2.5 pt-1">
                {denialTargetAudience.map((profile, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 font-sans">
                      {profile}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: What You Can Expect From a Denial Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest font-sans">
                  <FileSearch className="w-4 h-4" />
                  TRANSPARENT AUDIT
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  What You Can Expect From a Denial Analysis
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  The first step is understanding what your denial data is telling you. A focused review can help identify recurring reasons, payer patterns, workflow gaps, and areas where denied revenue may be accumulating.
                </p>
                <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/50 space-y-2">
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium font-sans">
                    The objective is not to promise that every denial can be eliminated.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                    Some denials are unavoidable or depend on payer medical policy decisions. The objective is to identify the preventable problems and create a structured response for claims that can be recovered. That distinction matters because good denial management is about both recovery and prevention.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/contact" size="md" shimmer={true} className="w-full sm:w-auto">
                  <span>Schedule Your Denial & Billing Analysis</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Major Payers Marquee */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="PAYER APPEALS & DENIAL RESOLUTION NATIONWIDE"
          items={[
            "UnitedHealthcare",
            "Aetna",
            "Cigna",
            "Humana",
            "BCBS Plans",
            "Medicare Advantage",
            "Medicaid MCO",
            "Molina",
            "Centene / WellCare",
            "Tricare",
            "Regional Carriers",
          ]}
        />
      </section>

      {/* 10. FAQ Section */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="Direct answers on root-cause analysis, appeals, A/R differences, benchmarks, and denial prevention."
          items={denialManagementFaqs}
        />
      </section>

      {/* 11. Bottom Conversion Section */}
      <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 dark:bg-teal-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-teal-600/10 dark:bg-teal-900/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            FREE DENIAL & BILLING ANALYSIS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
            Stop Repeated Denials From <br className="hidden sm:inline" />
            <span className="italic text-teal-400 font-medium">
              Draining Practice Revenue
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            If repeated denials are tying up revenue and consuming your team&apos;s time, do not wait for the problem to become larger.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            A focused denial analysis can help you understand what is happening, where the biggest patterns are, and whether the issue is isolated to individual claims or connected to a broader workflow problem.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
            >
              <span>Request Your Free Denial & Billing Analysis</span>
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
