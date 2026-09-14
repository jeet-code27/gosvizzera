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
} from "lucide-react";

// 8 Full-Service Medical Billing Approach Cards
const fullServiceFeatures: FeatureType[] = [
  {
    metric: "Front-End",
    title: "Patient Registration & Insurance Verification",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "Billing performance starts before a claim is created. Accurate patient demographics and insurance information can help reduce avoidable claim problems later in the cycle. Our billing workflow can support the front end of the revenue cycle so that essential information is captured and reviewed as part of the overall process.",
  },
  {
    metric: "AAPC / AHIMA",
    title: "Medical Coding and Charge Capture",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description:
      "Accurate coding and complete charge capture are essential to clean claim submission. Svizzera works with AAPC and AHIMA certified coders, helping practices maintain a coding process focused on accuracy, documentation, and appropriate reimbursement.",
  },
  {
    metric: "98%+ Clean",
    title: "Claims Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Claims need to be submitted accurately and monitored after submission. Our claims management support is designed to help practices reduce avoidable delays and maintain visibility into claim status throughout payer adjudication.",
  },
  {
    metric: "Daily EOBs",
    title: "Payment Posting and Reconciliation",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Accurate payment posting helps your practice understand what has been paid, what remains outstanding, and where discrepancies may need attention. Consistent posting also gives your team a clearer picture of revenue cycle performance.",
  },
  {
    metric: "Root-Cause",
    title: "Denial Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description:
      "A denied claim should not simply disappear into an A/R report. It needs to be reviewed, categorised, corrected or appealed when appropriate, and tracked through resolution. Svizzera's denial management services address denials systematically and identify recurring issues.",
  },
  {
    metric: "Aging 30-120+",
    title: "Accounts Receivable Follow-Up",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description:
      "Outstanding A/R represents revenue your practice has earned but has not yet collected. Our A/R follow-up services focus on keeping outstanding balances visible, prioritising follow-up, and supporting a more consistent collections process.",
  },
  {
    metric: "End-to-End",
    title: "Revenue Cycle Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description:
      "If you need broader support across the billing lifecycle, Svizzera can provide revenue cycle management designed to connect the different stages of your financial workflow into one unified ecosystem.",
  },
  {
    metric: "Full Team",
    title: "Medical Billing Outsourcing",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "Some practices need more than individual billing services. They need an external team that can take responsibility for the day-to-day billing function, reducing internal administrative pressure while accessing specialised billing expertise.",
  },
];

// 5 Pinned Steps for How Our Medical Billing Process Works
const billingProcessSteps: Step[] = [
  {
    title: "1. Request Your Free Billing & Revenue Cycle Review",
    description:
      "Tell us about your practice, current billing setup, and the specific challenges you want to solve. We begin with a collaborative discovery discussion.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "2. Review Your Current Revenue Cycle",
    description:
      "We look at the key areas that may be affecting claim quality, collections, denials, A/R aging, and internal administrative workload.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "3. Identify the Right Service Scope",
    description:
      "You may need full-service billing, broader RCM, or targeted support for claims, denials, or A/R. We tailor the scope to your operational goals.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "4. Build the Transition Plan",
    description:
      "If you are moving from an internal team or another billing company, the transition is organized around continuity, data integrity, open claims, and outstanding A/R.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "5. Manage and Measure the Billing Cycle",
    description:
      "Once live, billing activity is managed through defined processes, transparent SLA targets, and regular performance visibility reporting.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// 10 FAQs for Medical Billing Services
const medicalBillingFaqs: FAQItem[] = [
  {
    question: "What is included in medical billing services?",
    answer:
      "Medical billing services can include insurance verification, charge entry, coding, claim submission, claim monitoring, payment posting, denial management, accounts receivable follow-up, patient billing, and revenue cycle reporting. The exact scope depends on the practice and service agreement.",
    meta: "Scope",
  },
  {
    question: "How much do medical billing services cost?",
    answer:
      "Medical billing costs vary based on factors such as specialty, claim volume, services required, practice size, and pricing structure. A billing review is the best way to determine the appropriate scope and evaluate the potential value for your practice.",
    meta: "Pricing",
  },
  {
    question: "What's the difference between medical billing and RCM?",
    answer:
      "Medical billing generally covers the processes involved in preparing, submitting, processing, and collecting claims and balances. Revenue cycle management is broader and can include front-end processes, billing, claims, denials, A/R, reporting, and performance improvement.",
    meta: "Comparison",
  },
  {
    question: "Why should a practice outsource medical billing?",
    answer:
      "Outsourcing can give a practice access to specialised billing and coding expertise while reducing the internal administrative burden of managing billing staff, processes, technology, and follow-up.",
    meta: "Outsourcing",
  },
  {
    question: "Can Svizzera handle our existing accounts receivable?",
    answer:
      "Yes. Accounts receivable follow-up can be part of the billing scope. During the initial review, the existing A/R position can be evaluated so the service plan reflects the practice's outstanding revenue needs.",
    meta: "A/R Recovery",
  },
  {
    question: "Does Svizzera provide a BAA?",
    answer:
      "Yes. Svizzera provides a Business Associate Agreement and takes a HIPAA-focused approach to its medical billing services.",
    meta: "Compliance",
  },
  {
    question: "How quickly does Svizzera respond to billing questions?",
    answer:
      "Svizzera states a response commitment within one business hour.",
    meta: "Support SLA",
  },
  {
    question: "What is Svizzera's first-pass clean claim rate?",
    answer:
      "Svizzera reports a 98%+ first-pass clean claim rate.",
    meta: "Clean Claims",
  },
  {
    question: "Does Svizzera work with physician practices across the U.S.?",
    answer:
      "The service is positioned for U.S. physician practices nationally. The appropriate service scope can be determined through a billing and revenue cycle review.",
    meta: "National Reach",
  },
  {
    question: "How do we get started with Svizzera?",
    answer:
      "Start by requesting a Free Billing & Revenue Cycle Review. The review provides an opportunity to discuss your current billing workflow, identify potential issues, and determine which Svizzera services best fit your practice.",
    meta: "Onboarding",
  },
];

// Scope Checklist Items
const scopeChecklist = [
  "Patient registration and insurance verification",
  "Charge capture and charge entry",
  "Medical coding support (AAPC & AHIMA certified)",
  "Claim creation and submission",
  "Claim status monitoring & clearinghouse tracking",
  "Payment posting and reconciliation",
  "Denial management and appeals support",
  "Accounts receivable follow-up (30–120+ days)",
  "Patient billing support & clear statements",
  "Revenue cycle reporting & analytics",
  "Ongoing workflow review and optimisation",
];

// Signs it may be time to review billing
const reviewSigns = [
  "Your accounts receivable is growing without a clear explanation.",
  "Denials are recurring and the same issues keep appearing.",
  "Your internal staff spend too much time chasing claims.",
  "You do not have timely, useful billing reports.",
  "Your practice has difficulty keeping up with billing as it grows.",
  "Providers or office managers are regularly pulled into billing issues.",
  "Your current billing company is slow to respond.",
  "You are unsure where revenue is being delayed or lost.",
];

// JSON-LD Schema
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Medical Billing Services",
      "serviceType": "Medical Billing Services",
      "url": "https://gosvizzera.com/services/medical-billing-services",
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
          "name": "Medical Billing Services",
          "item": "https://gosvizzera.com/services/medical-billing-services",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": medicalBillingFaqs.map((faq) => ({
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

export default function MedicalBillingServicesPage() {
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
            Trusted by U.S. Practices • 98%+ Clean Claims • HIPAA Secure
          </motion.div>

          {/* AnimatedText Headline in Bodoni Moda */}
          <div className="pt-2">
            <AnimatedText
              as="h1"
              text={"Medical Billing Services\nThat Get You Paid Faster"}
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
            className="space-y-3 max-w-2xl mx-auto pt-2"
          >
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 font-sans">
              Clean claims. Faster reimbursement. Fewer avoidable denials.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Your practice should not have to chase claims, troubleshoot denials, or spend hours trying to understand where revenue is getting stuck. Svizzera Healthcare provides full-service medical billing for U.S. physician practices, helping you manage the billing lifecycle with a focus on cleaner claims, faster reimbursement, and fewer avoidable denials.
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
              <span>Request a Free Billing & Revenue Cycle Review</span>
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
            <Button href="#what-we-manage" variant="outline" size="lg">
              Explore Our Billing Lifecycle
            </Button>
          </motion.div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
            We review your current billing workflow, identify potential revenue cycle gaps, and help you understand where your practice may be losing time or money.
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
                <Award className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                98%+ first-pass clean claim rate
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <FileCheck2 className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                AAPC & AHIMA certified coders
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

      {/* 2. Connected System & Problem Section */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Medical Billing That Works as Part of Your Practice */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                A CONNECTED SYSTEM
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Medical Billing That Works <br className="hidden sm:inline" />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  as Part of Your Practice
                </span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Medical billing is more than submitting claims. Every stage of the revenue cycle can affect whether your practice gets paid accurately and on time. Patient registration, insurance verification, coding, charge entry, claim submission, payment posting, denial follow-up, and accounts receivable all need to work together.
                </p>
                <p>
                  Svizzera provides medical billing services designed to manage that process as a connected system. Instead of treating individual billing tasks in isolation, we help practices create a more consistent workflow from the patient encounter through reimbursement.
                </p>
                <p>
                  Whether you are looking for a complete billing partner or need help with a specific revenue cycle bottleneck, our services can be aligned with the needs of your practice.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/services/revenue-cycle-management"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:underline"
                >
                  <span>Explore full Revenue Cycle Management</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: What Are Medical Billing Services? Spotlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 sm:p-9 shadow-xl relative overflow-hidden space-y-5"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                What Are Medical Billing Services?
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Medical billing services cover the administrative and financial processes required to turn completed patient care into accurate claims and collected revenue. Depending on your practice&apos;s needs, this can include front-end revenue cycle support, coding, charge entry, claims management, payment posting, denial management, accounts receivable follow-up, and reporting.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-medium">
                  For a practice owner or CFO, the value is not simply having someone submit claims. The value is having a process that gives your team better control over outstanding revenue and reduces the administrative burden associated with getting paid.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE MANAGE — Our Full-Service Medical Billing Approach */}
      <section
        id="what-we-manage"
        className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              WHAT WE MANAGE
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Our Full-Service <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Medical Billing Approach
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              From front-end patient registration through claims adjudication, denial appeals, and collections, we provide integrated operational support across each stage.
            </p>
          </motion.div>

          {/* Grid Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs"
          >
            {fullServiceFeatures.map((feature, idx) => (
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
          </motion.div>

          {/* Service Pathways Navigation Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Dedicated Pathways:
            </span>
            <Link
              href="/services/revenue-cycle-management"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Revenue Cycle Management &rarr;
            </Link>
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
              href="/services/medical-coding"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Medical Coding &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY SVIZZERA — Why Practices Choose Svizzera */}
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
              WHY SVIZZERA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Why Practices <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Choose Svizzera
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Choosing a medical billing company is a financial decision, not simply an administrative one. Your billing partner affects cash flow, staff workload, claim performance, and visibility into your revenue cycle.
            </p>
          </motion.div>

          {/* 4 Differentiator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans">
                A 98%+ First-Pass Clean Claim Rate
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Clean claims are an important part of a healthy revenue cycle. Svizzera reports a 98%+ first-pass clean claim rate, helping reduce avoidable rework and giving practices a stronger foundation for timely reimbursement.
              </p>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans">
                Certified Coding Expertise
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Coding accuracy matters because errors at the coding stage can create downstream claim issues. Svizzera works with AAPC and AHIMA certified coders as part of its billing and coding support.
              </p>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans">
                HIPAA-Focused and BAA Provided
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Medical billing involves sensitive patient information. Svizzera takes a HIPAA-focused approach and provides a Business Associate Agreement, giving practices an important contractual framework when working with an external billing partner.
              </p>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans">
                Responsive Support (1-Hour Response)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Billing issues should not sit unanswered. Svizzera&apos;s stated response commitment is within one business hour, helping practices get timely attention when questions or billing issues need to be addressed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SCOPE CHECKLIST — What Is Included in Medical Billing Services? */}
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
              SERVICE SCOPE
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              What Is Included in <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Medical Billing Services?
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              The exact scope can be tailored to your practice, but full-service medical billing may include all core lifecycle components to create one connected billing workflow rather than a collection of disconnected tasks.
            </p>
          </motion.div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {scopeChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-teal-300/40 dark:hover:border-teal-500/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 font-sans">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                <strong className="text-slate-800 dark:text-slate-200 font-medium">The goal:</strong> Create one connected, accountable billing workflow rather than a collection of disconnected administrative tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON: Medical Billing Services vs Revenue Cycle Management */}
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
              SERVICE COMPARISON
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Medical Billing Services <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                vs. Revenue Cycle Management
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Medical billing and revenue cycle management are closely related, but they are not always used to describe exactly the same scope of work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Medical Billing Box */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider font-sans">
                  Focused Approach
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Medical Billing Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Medical billing generally focuses on the core administrative processes involved in submitting, processing, and collecting claims and patient balances. If your practice already has clinical operations and front desk scheduling dialed in, but needs precision execution on coding, claim scrubbing, payment reconciliation, and denial follow-up, a dedicated medical billing service is the perfect fit.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/contact" variant="outline" size="sm" className="w-full">
                  Discuss Billing Scope
                </Button>
              </div>
            </div>

            {/* Revenue Cycle Management Box */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand/30 dark:border-teal-500/30 p-8 space-y-4 shadow-md relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 text-brand dark:text-teal-300 text-xs font-semibold uppercase tracking-wider font-sans border border-teal-200/50 dark:border-teal-800/50">
                  Comprehensive Ecosystem
                </div>
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                  Revenue Cycle Management (RCM)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Revenue cycle management takes a broader view of the financial lifecycle, spanning front-end processes (eligibility, authorizations), mid-cycle coding and charge entry, back-end billing, claims adjudication, denial management, accounts receivable follow-up, executive financial reporting, and ongoing performance improvement.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button href="/services/revenue-cycle-management" size="sm" shimmer={true} className="w-full">
                  <span>Explore Full RCM Model</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUDIENCE & WARNING SIGNS */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Who Can Benefit */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                TARGET AUDIENCE
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Who Can Benefit From <br />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Our Medical Billing Services?
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Svizzera&apos;s medical billing services are designed for U.S. physician practices and healthcare organisations that want reliable billing support without having to manage every revenue cycle function internally.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white font-sans">
                    Independent & Specialty Practices
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-light mt-1">
                    Solo practitioners and group clinics looking to lower administrative overhead and boost clean claims.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white font-sans">
                    Growing & Multi-Provider Groups
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-light mt-1">
                    Practices scaling encounter volumes that need an elastic, certified billing infrastructure.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white font-sans">
                    Practices Transitioning from In-House or Other Billing Teams
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans font-light mt-1">
                    Organizations looking for structured continuity, documented SLAs, and faster responsiveness.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans italic pt-1">
                The starting point is not practice size alone. It is whether your current billing process is delivering the visibility, consistency, and financial performance your organisation expects.
              </p>
            </motion.div>

            {/* Warning Signs */}
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
                  DIAGNOSTIC INDICATORS
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  Signs It May Be Time to Review Your Billing
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans font-light">
                  If your practice is experiencing any of these common friction points, an objective review can uncover immediate revenue opportunities:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {reviewSigns.map((sign, idx) => (
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

              <div className="pt-2">
                <Button href="/contact" size="md" shimmer={true} className="w-full sm:w-auto">
                  <span>Schedule Your Billing Health Check</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. HOW OUR PROCESS WORKS — Pinned Flow Steps */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans"
            >
              HOW IT WORKS
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              How Our Medical Billing <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Process Works
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              A smooth transition organized around operational continuity, data protection, and transparent SLAs.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={billingProcessSteps} />

          {/* Decision Guidance Card: What Makes a Medical Billing Company Worth Choosing? */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl dark:shadow-black/50 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand dark:text-teal-300 uppercase tracking-widest font-sans">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                EXECUTIVE DECISION GUIDE
              </div>
              <h3 className="font-serif text-2xl text-slate-900 dark:text-white font-normal">
                What Makes a Medical Billing Company Worth Choosing?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                A billing company should be judged by more than its fee. Look for clear service scope, specialty and coding expertise, measurable billing performance, transparent reporting, responsive communication, appropriate data protection practices, and a transition process that protects continuity. Svizzera&apos;s approach is built around these practical considerations to make billing easier to manage and leadership visibility complete.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
                <span>Request Review</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Major Payers Marquee */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="MAJOR PAYERS WE SUBMIT TO NATIONWIDE"
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
          description="Detailed answers to common questions practice administrators and physicians ask regarding Svizzera's medical billing services."
          items={medicalBillingFaqs}
        />
      </section>

      {/* 11. Bottom-of-Page Conversion Section */}
      <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 dark:bg-teal-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-teal-600/10 dark:bg-teal-900/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            FREE BILLING & REVENUE CYCLE REVIEW
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
            Ready for a Medical Billing Partner <br className="hidden sm:inline" />
            <span className="italic text-teal-400 font-medium">
              That Gets You Paid Faster?
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            You do not need to know exactly which billing service you need before contacting Svizzera. That is what the review is for.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            If you are dealing with billing backlogs, denials, growing A/R, slow reimbursement, staffing limitations, or simply want a clearer view of your revenue cycle, tell us what is happening. We can help identify where your billing process needs attention and whether full-service medical billing, targeted support, or broader RCM is the right fit.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
            >
              <span>Request Your Free Billing & Revenue Cycle Review</span>
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
