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
  Users,
  Server,
  Lock,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

// 6 Core Features: What Svizzera Can Manage
const outsourcingFeatures: FeatureType[] = [
  {
    metric: "AAPC / AHIMA",
    title: "Medical Coding",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description:
      "Accurate coding is a foundation of clean claim submission. Svizzera works with AAPC and AHIMA certified coders as part of its billing support to reduce claim rejections and support full clinical documentation compliance.",
  },
  {
    metric: "98%+ Clean Submissions",
    title: "Claims Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Claims need to be submitted correctly and monitored after submission. A structured claims process helps your practice maintain visibility and address issues before they become long-running A/R problems.",
  },
  {
    metric: "Weekly Follow-Up",
    title: "Accounts Receivable Follow-Up",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description:
      "Outstanding balances require consistent attention. Svizzera provides weekly A/R follow-up to help keep unpaid claims visible, prioritize aged balances, and keep revenue moving through the collection process.",
  },
  {
    metric: "Root-Cause Resolution",
    title: "Denial Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description:
      "Denials should be analysed, corrected or appealed when appropriate, and tracked through resolution. The objective is not only to work individual denials but to identify recurring problems that may be affecting your revenue cycle.",
  },
  {
    metric: "Daily Reconciliation",
    title: "Payment Posting",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Accurate payment posting helps your practice understand what has been collected, what remains outstanding, and where discrepancies may require attention, giving leadership complete financial clarity.",
  },
  {
    metric: "End-to-End Synergy",
    title: "Revenue Cycle Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description:
      "If your needs extend beyond billing, Svizzera can support a broader revenue cycle management model covering multiple stages of the financial lifecycle from pre-registration to executive analytics.",
  },
];

// 5 Pinned Steps for How Medical Billing Outsourcing Works
const outsourcingWorkflowSteps: Step[] = [
  {
    title: "1. Request a Free RCM Assessment",
    description:
      "Start with a complimentary billing audit. Tell us about your practice, current billing model, technology, and the problems you want to solve.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "2. Review Your Current Workflow",
    description:
      "We evaluate the existing revenue cycle and identify areas that may need attention, including claims, A/R, denials, coding, and administrative workload.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "3. Define the Right Scope",
    description:
      "Not every practice needs the same level of outsourcing. We identify which billing functions should be managed externally and where your internal team should remain involved.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "4. Complete the Onboarding",
    description:
      "The transition is organized around your existing workflow and technology, with BAA-first onboarding and a stated 5 to 10 business day timeframe.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "5. Manage and Measure",
    description:
      "Once the service is live, billing activity is managed through defined workflows and ongoing visibility into revenue cycle performance.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// 10 FAQs for Medical Billing Outsourcing
const outsourcingFaqs: FAQItem[] = [
  {
    question: "Is it worth outsourcing medical billing?",
    answer:
      "It can be worth outsourcing when the practice needs specialised billing capacity, wants to reduce administrative workload, is struggling with A/R or denials, or is growing beyond the capacity of its internal team. The decision should be based on your current costs, performance, staffing, and revenue cycle needs.",
    meta: "ROI & Fit",
  },
  {
    question: "What does a medical billing outsourcing company do?",
    answer:
      "An outsourced billing company can manage functions such as coding, charge entry, claims submission, payment posting, denial management, accounts receivable follow-up, and revenue cycle reporting. The exact scope depends on the practice's needs.",
    meta: "Responsibilities",
  },
  {
    question: "Is outsourcing medical billing HIPAA compliant?",
    answer:
      "Medical billing outsourcing involves protected health information, so appropriate privacy and security safeguards are essential. Svizzera follows a HIPAA-focused approach and uses BAA-first onboarding.",
    meta: "Compliance",
  },
  {
    question: "How much does it cost to outsource medical billing?",
    answer:
      "There is no single cost. Pricing can depend on claim volume, specialty, services included, complexity, and the provider's pricing model. A billing assessment can help determine the appropriate scope.",
    meta: "Cost Analysis",
  },
  {
    question: "Will I lose control of my billing if I outsource?",
    answer:
      "Outsourcing changes who performs the billing work, but it does not have to remove your visibility or oversight. Reporting, defined responsibilities, communication, and clear performance measures can help practices maintain control.",
    meta: "Control",
  },
  {
    question: "Will outsourcing require us to change our EHR?",
    answer:
      "Not necessarily. Svizzera's verified compatibility includes Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, and AdvancedMD. The onboarding process is designed around the practice's existing technology and workflow.",
    meta: "EHR Systems",
  },
  {
    question: "How long does medical billing outsourcing onboarding take?",
    answer:
      "Svizzera's stated onboarding timeframe is 5 to 10 business days, depending on the practice and transition requirements.",
    meta: "Onboarding Timeline",
  },
  {
    question: "Can I outsource only certain parts of my medical billing?",
    answer:
      "Yes. Outsourcing can be structured around the functions your practice needs most, such as claims, A/R, denials, coding, or broader revenue cycle management.",
    meta: "Flexible Scope",
  },
  {
    question: "How often is A/R followed up?",
    answer:
      "Svizzera provides weekly A/R follow-up as part of its medical billing outsourcing support.",
    meta: "A/R Cadence",
  },
  {
    question: "How do I get started with Svizzera?",
    answer:
      "Request a Free RCM Assessment or complimentary billing audit. This provides an opportunity to review your current billing setup and determine whether outsourcing and which service scope are appropriate for your practice.",
    meta: "Getting Started",
  },
];

// Target Audience Profiles
const targetProfiles = [
  "Independent physician practices looking to lower fixed operating costs",
  "Growing multi-provider practices with surging encounter volumes",
  "Practices experiencing recurring billing staff shortages and turnover",
  "Practices with increasing accounts receivable (30-120+ days aging)",
  "Practices dealing with recurring claim denials and edit rejections",
  "Practices that want more specialised coding and compliance oversight",
  "Practices evaluating whether to replace an underperforming billing company",
];

// Signs You Should Consider Outsourcing
const outsourcingSigns = [
  "Your billing staff are consistently overloaded.",
  "Claims are not being submitted as quickly as they should be.",
  "Denials are increasing or remaining unresolved.",
  "Accounts receivable is ageing without consistent follow-up.",
  "Your practice struggles to recruit experienced billers or coders.",
  "Providers or administrators are spending too much time on billing issues.",
  "You do not receive clear or timely billing reports.",
  "Your current billing company is not responsive.",
  "Your practice is growing faster than your internal billing operation can support.",
];

// Supported EHR Platforms
const supportedEhrs = [
  "Epic",
  "Cerner (Oracle Health)",
  "Athenahealth",
  "eClinicalWorks",
  "NextGen Healthcare",
  "AdvancedMD",
  "Kareo / Tebra",
  "DrChrono",
];

// JSON-LD Schema
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Medical Billing Outsourcing",
      "serviceType": "Medical Billing Outsourcing",
      "url": "https://gosvizzera.com/services/medical-billing-outsourcing",
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
          "name": "Medical Billing Outsourcing",
          "item": "https://gosvizzera.com/services/medical-billing-outsourcing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": outsourcingFaqs.map((faq) => ({
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

export default function MedicalBillingOutsourcingPage() {
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
            BAA-First Onboarding • Zero EHR Disruption • 5–10 Day Setup
          </motion.div>

          {/* AnimatedText Headline in Bodoni Moda */}
          <div className="pt-2">
            <AnimatedText
              as="h1"
              text={"Medical Billing Outsourcing\nBuilt Around Your Existing Workflow"}
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
              Outsource medical billing without disrupting your EHR, staff, or control.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Outsourcing your medical billing shouldn&apos;t mean changing your entire practice. Svizzera works with your existing workflow, staff, and technology, providing specialized billing and revenue cycle expertise to improve efficiency, accuracy, and collections.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed">
              If you are considering outsourcing your medical billing, the decision should be based on three key factors: the effectiveness of your current billing process, your internal team&apos;s capacity, and whether an experienced billing partner can enhance revenue cycle performance while maintaining transparency, accuracy, and control.
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
              <span>Request Your Free RCM Assessment</span>
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
            <Button href="#how-it-works" variant="outline" size="lg">
              See How Outsourcing Works
            </Button>
          </motion.div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
            Get a complimentary billing audit to review your current revenue cycle, identify potential bottlenecks, and determine whether outsourcing is a practical fit for your practice.
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
                <Clock className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                5–10 business day onboarding timeframe
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
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                HIPAA-focused · BAA-first onboarding
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Response within 1 business hour
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Control & Decision Proof Section */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Outsource Without Losing Control */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                PARTNERSHIP, NOT BLACK BOX
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Outsource Medical Billing <br className="hidden sm:inline" />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Without Losing Control
                </span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  One of the biggest concerns practices have about outsourcing is control. Handing billing to an external company can feel like handing away visibility into one of the most important financial functions of the practice.
                </p>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  That should not be the model.
                </p>
                <p>
                  Effective medical billing outsourcing creates a defined partnership. Your practice should know what is being handled, how claims are progressing, what is happening with outstanding accounts, and which issues require attention. Outsourcing changes who performs the work. It does not have to change your ability to understand the results.
                </p>
                <p>
                  Svizzera&apos;s approach is built around working within your existing operational environment rather than forcing your practice into an entirely new workflow.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog/in-house-vs-outsourced-medical-billing"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline"
                >
                  <span>Read our In-House vs Outsourced Medical Billing guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Is Medical Billing Outsourcing Right for Your Practice? */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-9 shadow-xl relative overflow-hidden space-y-5"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Scale className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                Is Outsourcing Right for You?
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Outsourcing may be worth considering when billing has become difficult to manage internally, when staffing limitations are affecting performance, or when practice leadership wants to reduce the administrative burden associated with claims, A/R, and denials.
                </p>
                <p>
                  It can also make sense when a practice is growing. Adding providers or increasing patient volume can quickly increase billing workload. Hiring another employee every time volume increases may not be the most practical long-term solution.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-medium">
                  The right question is not whether outsourcing is automatically better than in-house billing. It is whether the current model gives your practice the capacity, expertise, visibility, and consistency it needs.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. WHAT DOES AN OUTSOURCING COMPANY DO & WHAT SVIZZERA CAN MANAGE */}
      <section
        id="service-scope"
        className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              FULL OPERATIONAL SCOPE
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              What Svizzera <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Can Manage For You
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              A medical billing outsourcing company can take responsibility for some or all of the administrative work required to move a patient encounter through the revenue cycle and toward payment.
            </p>
          </motion.div>

          {/* Grid Feature Cards with Dashed Dividers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs"
          >
            {outsourcingFeatures.map((feature, idx) => (
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
          </motion.div>

          {/* Internal Service Pathways Navigation Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Explore Related Services:
            </span>
            <Link
              href="/services/medical-billing-services"
              className="px-4 py-2 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Explore Svizzera Medical Billing Services &rarr;
            </Link>
            <Link
              href="/services/revenue-cycle-management"
              className="px-4 py-2 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Explore Svizzera Revenue Cycle Management &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. EHR COMPATIBILITY & BAA-FIRST ONBOARDING */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: EHR Compatibility */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                ZERO SOFTWARE MIGRATIONS
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Your EHR Does Not <br />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Have to Change
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Technology disruption is another major concern when practices consider outsourcing. Your team already knows its electronic health record and practice management environment. Replacing or rebuilding that infrastructure just to outsource billing can create unnecessary friction.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Svizzera&apos;s verified compatibility includes major EHR and practice management platforms such as <strong className="text-slate-800 dark:text-slate-200 font-medium">Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, and AdvancedMD</strong>.
              </p>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                Before onboarding, the workflow, system access, responsibilities, and data requirements should be clearly established so your team knows what will change and what will stay the same.
              </p>

              {/* Supported EHR tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {supportedEhrs.map((ehr) => (
                  <span
                    key={ehr}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                  >
                    {ehr}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: BAA-First Onboarding Card */}
            <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Lock className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                BAA-First Onboarding With a Clear Transition Process
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Medical billing involves sensitive patient and healthcare information, so outsourcing requires more than operational planning. The relationship should also have an appropriate privacy and security framework.
                </p>
                <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/50 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300 font-sans">
                    <ShieldCheck className="w-4 h-4" />
                    BAA-FIRST PROTOCOL
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                    Svizzera follows a BAA-first onboarding approach. A Business Associate Agreement provides an important contractual framework for handling protected health information when working with an external billing partner.
                  </p>
                </div>
                <p>
                  The onboarding timeline is designed to be practical. Svizzera&apos;s stated onboarding timeframe is approximately <strong className="text-slate-900 dark:text-slate-100 font-medium">5 to 10 business days</strong>, depending on the practice and transition requirements. The goal is to make the transition organised and controlled, not disruptive.
                </p>
              </div>

              <div className="pt-2">
                <Button href="/contact" size="md" shimmer={true} className="w-full sm:w-auto">
                  <span>Start Your 5–10 Day Onboarding</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS — 5 Pinned Workflow Steps */}
      <section
        id="how-it-works"
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
              STEP-BY-STEP TRANSITION
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              How Medical Billing <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Outsourcing Works With Svizzera
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              A straightforward 5-stage transition from complimentary assessment through live management in your existing EHR.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={outsourcingWorkflowSteps} />
        </div>
      </section>

      {/* 6. DECISION SUPPORT & IN-DEPTH COMPARISONS */}
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
              DECISION SUPPORT
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Evaluating the <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Outsourcing Decision
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Objective guidance for practice owners, CFOs, and administrators weighing internal hiring, operational costs, staff impact, and vendor switching.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: In-House vs Outsourced */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Hiring vs Partnering
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Outsourcing vs Hiring an In-House Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  For practices deciding between outsourcing and expanding an internal billing department, the comparison should go beyond employee salaries. An in-house team requires recruitment, compensation, benefits, training, management, software, coverage for employee absences, and ongoing attention to billing and coding changes. It also means the practice carries operational risk when staffing changes.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Outsourcing replaces much of that internal management responsibility with an external service relationship. The practice can access specialised resources without having to recruit and maintain every billing role itself.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/blog/in-house-vs-outsourced-medical-billing"
                  className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read our In-House vs Outsourced Medical Billing article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2: Total Cost of Ownership */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Cost & Value
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  How Much Does It Cost to Outsource?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  There is no universal price for medical billing outsourcing. Fees can vary according to claim volume, specialty, service scope, complexity, payer mix, and the pricing structure offered by the provider.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  The more useful calculation is the total cost of your current billing operation compared with the cost and expected value of outsourcing. Include employee compensation and benefits, software, training, management time, recruitment, turnover, and the potential cost of delayed or missed revenue.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/blog/medical-billing-outsourcing-cost"
                  className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>See our Medical Billing Outsourcing Cost guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 3: Will Outsourcing Disrupt Staff? */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Staff Continuity
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Will Outsourcing Disrupt Your Staff?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  A well-managed transition should reduce disruption rather than create it. Your staff should understand which responsibilities are moving to the outsourced team, who remains responsible for front-end tasks, where billing questions should go, and how issues will be escalated.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  The objective is not to remove your internal team&apos;s visibility. It is to reduce the amount of billing work they have to perform manually so they can focus on patient-facing and practice-management responsibilities.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Clear role division • Zero operational confusion
                </span>
              </div>
            </div>

            {/* Box 4: What If You Already Have a Billing Company? */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Vendor Transition
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  What If You Already Have a Billing Company?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Outsourcing does not have to mean outsourcing for the first time. A practice may already work with a billing company and still decide that the relationship is not delivering the expected level of service.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  If communication is poor, A/R is growing, denials are not being worked effectively, or your practice does not have sufficient visibility into billing performance, changing providers may be worth considering.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/blog/how-to-switch-medical-billing-companies-without-disrupting-cash-flow"
                  className="text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read How to Switch Medical Billing Companies Without Disrupting Cash Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SVIZZERA — 8 Verified Differentiators */}
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
              PROVEN CREDENTIALS
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Why Choose Svizzera for <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Medical Billing Outsourcing?
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              The right outsourcing partner should make your billing operation easier to manage, not simply move the workload to another company. Svizzera combines specialised billing support with a workflow designed around your existing environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                HIPAA-Focused Approach
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                BAA-first onboarding protocol before accessing any PHI or EHR records.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <Award className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                AAPC & AHIMA Certified Coders
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Credentialed coders for rigorous ICD-10, CPT, and HCPCS accuracy.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <FileCheck2 className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                98%+ Clean Claim Rate
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Reported first-pass clean claim submission across national commercial & government payers.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <TrendingUp className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                Weekly A/R Follow-Up
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Weekly follow-up cycle keeping aged accounts receivable moving toward collection.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <RefreshCw className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                Denial Recovery & Appeals
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Systematic denial triage, documentation corrections, and formal appeals.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <Server className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                Full EHR Compatibility
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Direct integration with Epic, Cerner, Athenahealth, eCW, NextGen, and AdvancedMD.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <Clock className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                5–10 Day Onboarding
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Realistic, structured transition timeframe to protect practice cash flow.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <Zap className="w-6 h-6 text-brand dark:text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white font-sans">
                1-Hour Response Time
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Stated response commitment within one business hour for fast resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AUDIENCE & 9 SIGNS YOU SHOULD CONSIDER OUTSOURCING */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Who Is It Best For? */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                WHO WE SERVE
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Who Is Medical Billing <br />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Outsourcing Best For?
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Medical billing outsourcing can be a strong option for practices that want to reduce administrative workload without building a larger internal billing department.
              </p>

              <div className="space-y-2.5 pt-1">
                {targetProfiles.map((profile, idx) => (
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

              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans italic pt-1">
                The right starting point is an assessment of your existing revenue cycle rather than a one-size-fits-all outsourcing package.
              </p>
            </motion.div>

            {/* Right: 9 Signs You Should Consider Outsourcing */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-sans">
                  <AlertTriangle className="w-4 h-4" />
                  PRACTICE HEALTH CHECK
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  Signs You Should Consider Outsourcing Your Medical Billing
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                  If your organization checks more than two of these boxes, an external billing partnership could recover lost revenue and relieve staff burnout:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {outsourcingSigns.map((sign, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {sign}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Button href="/contact" size="md" shimmer={true} className="w-full sm:w-auto">
                  <span>Schedule Your Complimentary Billing Audit</span>
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
          title="WE SUBMIT AND APPEAL TO MAJOR PAYERS NATIONWIDE"
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
          description="Straightforward answers regarding control, EHR compatibility, HIPAA compliance, onboarding timelines, and costs."
          items={outsourcingFaqs}
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
            COMPLIMENTARY BILLING AUDIT
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
            Ready to See Whether Outsourcing <br className="hidden sm:inline" />
            <span className="italic text-teal-400 font-medium">
              Makes Sense for Your Practice?
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            You do not need to decide on a billing model before you talk to Svizzera.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Start with your current numbers, workflow, staffing, claims, denials, and A/R. A complimentary assessment can help identify where your revenue cycle needs attention and whether outsourcing is the right next step.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
            >
              <span>Request Your Free RCM Assessment</span>
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
