"use client";

import { motion } from "motion/react";
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
  Calendar,
  Layers,
  Search,
  Scale,
  DollarSign,
  UserCheck,
  RotateCcw,
  Clock,
  Globe2,
  FileCheck2,
} from "lucide-react";

// 6 Core AR Management Services Features
const arManagementFeatures: FeatureType[] = [
  {
    metric: "0–90+ Day Buckets",
    title: "AR Aging & Bucket Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    description:
      "Your full AR report segmented into 0–30, 31–60, 61–90, and 90+ day buckets and worked on a structured weekly cadence, prioritizing claims with the highest probability of recovery before they age further.",
  },
  {
    metric: "EDI 276/277 Status",
    title: "Insurance Claim Status Follow-Up",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    description:
      "Every pending claim tracked through EDI 276/277 claim status transactions, payer web portals, and direct phone follow-up confirming where a claim sits in adjudication and what action is needed next.",
  },
  {
    metric: "Root-Cause Loop",
    title: "Denial-Linked AR Recovery",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description:
      "When a claim is denied, the root cause is identified, the claim is corrected, and a resubmission or appeal is filed closing the loop between denial management and AR recovery instead of letting denials sit unworked.",
  },
  {
    metric: "Fee Variance Audit",
    title: "Underpayment & Payer Variance Recovery",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Payments are compared against each payer’s contracted fee schedule to flag underpayments. Discrepancies generate a follow-up worklist so contractually owed revenue isn’t quietly written off.",
  },
  {
    metric: "Patient Balances",
    title: "Patient AR & Self-Pay Follow-Up",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "Patient balances co-pays, deductibles, and coinsurance remaining after insurance adjudication are followed up through statements, calls, and payment plan coordination before accounts age past recovery.",
  },
  {
    metric: "Legacy Recovery",
    title: "Aged AR Backlog Cleanup",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    description:
      "For practices with a legacy AR backlog, we run a dedicated cleanup project auditing every claim over 90 days, distinguishing collectible from non-collectible balances, and working the recoverable portion to closure.",
  },
];

// 5 Pinned Flow Steps for the AR Workflow Process
const arWorkflowSteps: Step[] = [
  {
    title: "AR Aging Report Pull & Segmentation",
    description:
      "Full AR report pulled from your EHR or practice management system and segmented into 0–30, 31–60, 61–90, and 90+ day buckets by payer and claim type.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "Claim Status Verification",
    description:
      "Every aging claim checked via EDI 276/277 claim status transactions, payer web portals, and direct phone follow-up — confirming status in adjudication.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "Denial Root Cause Tracing & Resubmission",
    description:
      "Denied claims are traced to a specific root cause, corrected, and resubmitted or appealed within payer timely-filing windows.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "Payer Variance & Underpayment Recovery",
    description:
      "Payments are checked against each payer’s contracted fee schedule. Underpayments generate a dedicated recovery worklist rather than default write-offs.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "Monthly AR Trend Reporting & Aging Reduction Plan",
    description:
      "Monthly reporting shows Days in AR trend, AR distribution by aging bucket, top denial-driving payers, and a prioritized plan to reach MGMA benchmarks.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// 6 Distinct Performance Features for WHY SVIZZERA
const whyArSvizzeraFeatures: FeatureType[] = [
  {
    metric: "Weekly Cadence",
    title: "Weekly Aging Bucket Discipline",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description:
      "Every claim in your 0–30, 31–60, 61–90, and 90+ day buckets is reviewed weekly, not monthly — catching claims before they cross into the 90+ day bucket where recovery odds drop sharply.",
  },
  {
    metric: "Multi-Channel EDI",
    title: "EDI 276/277 & Payer Portal Coverage",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description:
      "We use electronic EDI 276/277 claim status transactions and direct payer web portal access alongside phone follow-up — multiple verification channels instead of relying on a single method per claim.",
  },
  {
    metric: "40+ Protocols",
    title: "40+ Payer Protocols Supported",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "All major commercial payers, Medicare Advantage plans, Medicaid MCOs, and 40+ regional carriers — each with their own claim status workflows, appeal timelines, and follow-up documentation requirements.",
  },
  {
    metric: "100% HIPAA",
    title: "HIPAA-Focused · BAA First",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description:
      "A Business Associate Agreement is signed before any PHI is accessed. All team members are HIPAA-trained. Encrypted communications, role-based access, and audit trail maintenance are standard across all AR follow-up work.",
  },
  {
    metric: "Dedicated Pods",
    title: "Named Dedicated AR Team",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    description:
      "The same AR specialists work your practice’s aging report every week learning your payer mix, your highest-friction payers, and your EHR’s claim documentation conventions for consistent, practice-specific recovery.",
  },
  {
    metric: "MGMA Analytics",
    title: "Monthly AR Trend & Root-Cause Reporting",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description:
      "Monthly reports show Days in AR trend, AR aging distribution, top denial-driving payers, and underpayment recovery totals so leadership sees AR performance moving toward MGMA benchmark levels, not just a balance number.",
  },
];

// FAQs for AR Follow-Up
const arFollowUpFaqs: FAQItem[] = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most healthcare teams are operational within 5 to 10 business days depending on payer complexity and documentation requirements.",
    meta: "Onboarding",
  },
  {
    question: "Do we need to change our EHR system?",
    answer:
      "No. Our AR specialists work directly inside your existing EHR, EMR, and Practice Management software (Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, AdvancedMD, etc.) with zero workflow disruption.",
    meta: "Integration",
  },
  {
    question: "Which payers do you support?",
    answer:
      "We support over 40+ commercial payers, Medicare Advantage plans, Medicaid MCOs, Tricare, and regional carriers nationwide.",
    meta: "Payers",
  },
  {
    question: "Do you handle denial appeals?",
    answer:
      "Yes. Denial root-cause analysis, first-level formal appeals, clinical documentation assembly, and peer-to-peer coordination are fully integrated into our AR follow-up workflow.",
    meta: "Appeals",
  },
  {
    question: "Is Svizzera HIPAA compliant?",
    answer:
      "Yes. We maintain 100% HIPAA compliance, execute a formal Business Associate Agreement (BAA) prior to PHI access, and employ end-to-end encrypted, audit-trailed workflows.",
    meta: "Compliance",
  },
];

export default function ARFollowUpPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
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
            Trusted by Healthcare Teams • 40+ Payers • HIPAA Secure
          </motion.div>

          {/* AnimatedText Headline in Bodoni Moda */}
          <div className="pt-2">
            <AnimatedText
              text={"Accounts Receivable Management\n& AR Follow-Up Services"}
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
              Stop Letting Earned Revenue Age Into a Write-Off
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              The MGMA benchmark for Days in AR is under 40 days, yet an MGMA Stat poll of 519 medical groups found 42% of practices wait 91–120 days before even sending a patient balance to collections. Svizzera works your full AR aging report every week, by bucket, by payer, and by root cause.
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
              <span>Schedule a Free Consultation</span>
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
            <Button href="#ar-services" variant="outline" size="lg">
              See What We Handle
            </Button>
          </motion.div>

          {/* 4 Trust Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
            className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Full AR aging worked weekly · 0–90+ buckets
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                EDI 276/277 + portal + phone follow-up
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <RotateCcw className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Works inside your existing EHR / PM system
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                HIPAA-focused · BAA provided at onboarding
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR AR MANAGEMENT SERVICES — 6 Feature Cards */}
      <section
        id="ar-services"
        className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Section Header in Bodoni Moda & Lato */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-3.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              OUR AR MANAGEMENT SERVICES
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Every Aging Claim We Work <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                for Your Practice
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              A complete accounts receivable workflow — aging buckets worked weekly, denials traced to root cause, and underpayments recovered, all documented in your EHR.
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
            {arManagementFeatures.map((feature, idx) => (
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
        </div>
      </section>

      {/* 3. HOW IT WORKS — Your AR Workflow From Aging Report to Collected Revenue */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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
              Your AR Workflow <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                From Aging Report to Collected Revenue
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              Systematic weekly follow-up ensuring no aging claim is left unresolved or written off prematurely.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={arWorkflowSteps} />

          {/* Industry Insight Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-xl dark:shadow-2xl dark:shadow-black/50 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand dark:text-teal-300 uppercase tracking-widest font-sans">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                INDUSTRY INSIGHT
              </div>
              <div className="flex items-baseline gap-3 flex-wrap justify-center sm:justify-start">
                <span className="font-serif text-4xl sm:text-5xl font-normal text-slate-900 dark:text-white">
                  8–12%
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 font-sans leading-snug">
                  more revenue collected per claim by practices that conduct quarterly payer variance reviews compared with those that don&apos;t.
                </p>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                Source: HFMA 2024 Revenue Cycle Survey. Specific outcomes vary by practice type, payer mix, and current AR condition.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
                <span>Book A Consultation</span>
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. WHY SVIZZERA — Six Reasons Our AR Service Reduces Days in AR */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
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
              WHY SVIZZERA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Six Reasons Our AR Service <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Reduces Days in AR
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Not a once-a-month aging report review. A systematic weekly AR follow-up workflow that treats every aging claim as recoverable revenue until proven otherwise.
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
            {whyArSvizzeraFeatures.map((feature, idx) => (
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

          {/* Consultation CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="text-center pt-2"
          >
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30"
            >
              <span>Schedule A Free Consultation</span>
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
          </motion.div>
        </div>
      </section>

      {/* 5. Major Payers We Submit To — BorderBeam Animated Marquee */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="MAJOR PAYERS WE SUBMIT TO"
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

      {/* 6. FAQ Section */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="Answers to the most common questions healthcare organizations ask before partnering with Svizzera."
          items={arFollowUpFaqs}
        />
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
