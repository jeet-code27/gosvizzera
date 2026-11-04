"use client";

import { motion } from "motion/react";
import Image from "next/image";
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
  Phone,
  Mail,
  FileSpreadsheet,
  Stethoscope,
  Briefcase,
  FolderSync,
  HeartHandshake,
  Check,
} from "lucide-react";

// 7 Solution Feature Cards (Section 3 from PDF)
const solutionFeatures: FeatureType[] = [
  {
    metric: "Clean Claims",
    title: "Medical Billing Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Structured billing workflows designed to support accurate and timely claim submissions, ensuring complete verification of policy limits and required injury documentation.",
  },
  {
    metric: "AAPC / AHIMA",
    title: "Medical Coding Support",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description:
      "Coding support focused on accurate documentation and appropriate code assignment, including ICD-10 trauma codes, external cause codes, and complex CPT modifiers.",
  },
  {
    metric: "PIP & MedPay",
    title: "Insurance Verification",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "Assistance with verifying insurance information, PIP benefits, MedPay coverage, third-party liability, policy limits, and Letters of Protection (LOP) before treatment progresses.",
  },
  {
    metric: "98%+ First-Pass",
    title: "Claims Management",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    description:
      "End-to-end support with claim preparation, clearinghouse validation, demand package attachment, submission, and adjudication tracking across commercial and auto carriers.",
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
      "Identifying claim denials, analyzing CARC/RARC codes, assembling supporting narrative medical records, and executing timely first-level appeals and disputes.",
  },
  {
    metric: "Aged 30–120+",
    title: "Accounts Receivable Follow-Up",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description:
      "Consistent follow-up on outstanding accounts, lien settlements, and pending adjuster disbursements to prevent claims from aging unnoticed or being written off.",
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
      "Coordinated support across all key stages of the medical billing lifecycle, integrating front-end intake with back-end reconciliation for complete financial clarity.",
  },
];

// 6 Target Specialties We Help (Section 4 from PDF)
const specialtiesWeHelp = [
  {
    title: "Personal Injury Clinics",
    subtitle: "Accident & Injury Care",
    description:
      "Manage dedicated billing workflows for patients receiving multidisciplinary medical care following motor vehicle accidents, workplace injuries, and slip-and-fall incidents.",
    icon: Briefcase,
    highlight: "Lien & Settlement Tracking",
  },
  {
    title: "Chiropractic Practices",
    subtitle: "CMT & Physical Modalities",
    description:
      "Organize billing operations for injury-related chiropractic care, including subluxation documentation, timed modalities, visit caps, and auto-insurance reimbursement.",
    icon: Stethoscope,
    highlight: "Visit-Limit Compliance",
    link: "/services/chiropractic-billing",
  },
  {
    title: "Physical Therapy Clinics",
    subtitle: "Rehabilitation & Recovery",
    description:
      "Support billing and claims processes for acute and chronic rehabilitation services, re-examinations, functional assessments, and therapy caps.",
    icon: Activity,
    highlight: "Timed Code Accuracy",
  },
  {
    title: "Orthopaedic Practices",
    subtitle: "Musculoskeletal & Trauma",
    description:
      "Improve visibility across complex orthopedic billing, surgical care, casting/splinting, fracture care, and third-party liability coordination.",
    icon: BoneIcon,
    highlight: "Surgical Charge Capture",
  },
  {
    title: "Pain Management Clinics",
    subtitle: "Interventional Procedures",
    description:
      "Reduce administrative pressure through structured billing support for epidural injections, nerve blocks, radiofrequency ablations, and ongoing patient monitoring.",
    icon: Zap,
    highlight: "Authorization & Pre-Bill Scrubbing",
  },
  {
    title: "Rehabilitation Centres",
    subtitle: "Multi-Disciplinary Programs",
    description:
      "Streamline billing operations across ongoing treatment programs, multi-provider care teams, and structured medical lien documentation.",
    icon: Building2,
    highlight: "End-to-End Ledger Oversight",
  },
];

function BoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

// 6 Why Choose Svizzera Differentiators (Section 5 from PDF)
const whyChooseSvizzera = [
  {
    title: "Healthcare-Focused Expertise",
    description:
      "Specialized support built strictly around the unique administrative, legal, and financial requirements of US healthcare providers managing personal injury claims.",
    icon: Award,
  },
  {
    title: "Structured Billing Processes",
    description:
      "Rigorous, documented workflows designed to support accurate billing, robust documentation assembly, and prompt clearinghouse claims management.",
    icon: Layers,
  },
  {
    title: "Reduced Administrative Workload",
    description:
      "Give your clinical and front-office staff hours back each day to focus on patient recovery, scheduling, and core clinical operations.",
    icon: UserCheck,
  },
  {
    title: "Revenue Cycle Visibility",
    description:
      "Real-time transparency over submitted claims, pending adjusters, aging lien balances, and collected practice revenue with customized reports.",
    icon: TrendingUp,
  },
  {
    title: "Scalable Support",
    description:
      "Elastic billing capacity that effortlessly adapts whether you handle 20 or 500+ injury cases per month across single or multi-location facilities.",
    icon: Sparkles,
  },
  {
    title: "Consistent Communication",
    description:
      "A collaborative, accessible team with a 1-hour response SLA commitment, keeping your practice in sync on every open account and settlement.",
    icon: Clock,
  },
];

// 4 Steps for Getting Started (Section 6 from PDF)
const onboardingSteps: Step[] = [
  {
    title: "1. Tell Us About Your Practice",
    description:
      "Share your medical specialty, current personal injury case volume, billing friction points, and operational requirements.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "2. Review Your Billing Workflow",
    description:
      "Our RCM team analyzes your existing claims process, payer mix, outstanding accounts receivable, and identifies immediate revenue opportunities.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "3. Build Your Support Plan",
    description:
      "We outline a customized billing support roadmap tailored to your practice's needs, EHR system, and agreed service scope.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "4. Start Streamlining Your Billing",
    description:
      "Work seamlessly with your dedicated Svizzera pod to implement workflows, scrub claims, track aging A/R, and accelerate collections.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
];

// 8 FAQs (Section 8 from PDF + High-Intent Search Queries)
const personalInjuryFaqs: FAQItem[] = [
  {
    question: "What is personal injury medical billing?",
    answer:
      "Personal injury medical billing involves managing billing, claim submissions, and payment processes for healthcare services rendered to patients who have sustained injuries in motor vehicle accidents, workplace incidents, or slip-and-fall events. It requires coordinating with multiple entities, including auto insurers (PIP/MedPay), commercial health plans, third-party liability carriers, and attorneys.",
    meta: "Definition",
  },
  {
    question: "How is personal injury medical billing different from regular medical billing?",
    answer:
      "Unlike standard medical billing which submits claims primarily to commercial health insurers or government programs, personal injury billing frequently involves complex documentation, Letters of Protection (LOPs), medical liens, third-party liability investigations, and delayed settlements. Accurate coding of trauma causes and persistent accounts receivable follow-up are critical to securing full reimbursement.",
    meta: "Comparison",
  },
  {
    question: "Which healthcare providers need personal injury billing support?",
    answer:
      "Personal injury clinics, chiropractic practices, physical therapy centers, orthopedic surgeons, interventional pain management specialists, diagnostic imaging centers, and multidisciplinary rehabilitation facilities regularly benefit from specialized personal injury medical billing support.",
    meta: "Specialties",
  },
  {
    question: "Can outsourcing medical billing reduce administrative workload?",
    answer:
      "Yes. Outsourcing personal injury billing activities removes the heavy burden of requesting police reports, tracking PIP/MedPay exhaustions, verifying third-party claim numbers, and following up with adjusters. This allows practice staff to dedicate their time to patient care and clinical operations.",
    meta: "Outsourcing Benefits",
  },
  {
    question: "Does Svizzera provide medical billing and revenue cycle management?",
    answer:
      "Yes. Svizzera Healthcare Solutions offers complete medical billing and end-to-end revenue cycle management services, including insurance verification, certified coding, claims scrubbing and submission, denial management, and accounts receivable follow-up.",
    meta: "Full-Service RCM",
  },
  {
    question: "How do you handle Letters of Protection (LOP) and medical liens?",
    answer:
      "Svizzera tracks all lien accounts and Letters of Protection systematically. We verify patient representation, log case numbers and adjuster details, confirm settlement progress at regular intervals, and maintain complete audit-ready itemized ledgers so your practice receives timely disbursement upon case resolution.",
    meta: "Lien Tracking",
  },
  {
    question: "Do we need to replace or switch our current EHR software?",
    answer:
      "No. Our billing specialists integrate directly within your existing EHR or Practice Management platform (such as ChiroTouch, Jane, Athenahealth, eClinicalWorks, AdvancedMD, Kareo, WebPT, etc.) with zero disruption to your daily operations.",
    meta: "EHR Integration",
  },
  {
    question: "How can I get started with Svizzera?",
    answer:
      "Getting started is simple. Contact our team to request a Free Billing Review. We will discuss your practice, analyze your current injury billing workflow, and outline a tailored service plan to optimize your collections.",
    meta: "Getting Started",
  },
];

// Structured Schema Data
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Personal Injury Medical Billing Services",
      "serviceType": "Personal Injury Medical Billing",
      "url": "https://gosvizzera.com/personal-injury-medical-billing",
      "description":
        "Personal injury medical billing support for US healthcare practices. Get help with claims, coding, denials and A/R. Request a free billing review.",
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "provider": {
        "@type": "Organization",
        "name": "Svizzera Healthcare Solutions",
        "url": "https://gosvizzera.com/",
        "telephone": "+1-469-403-5472",
        "email": "info@gosvizzera.com",
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
          "item": "https://gosvizzera.com/services/medical-billing-services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Personal Injury Medical Billing",
          "item": "https://gosvizzera.com/personal-injury-medical-billing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": personalInjuryFaqs.map((faq) => ({
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

export default function PersonalInjuryBillingPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-transparent overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headline, Copy, Action CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Eyebrow Badge Pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                PERSONAL INJURY BILLING SUPPORT FOR US PROVIDERS
              </motion.div>

              {/* Main Headline in Bodoni Moda */}
              <div className="pt-1">
                <AnimatedText
                  as="h1"
                  text={"Personal Injury Medical Billing That Helps Your Practice Stay Financially on Track"}
                  duration={0.03}
                  delay={0.04}
                  underlineGradient="from-teal-400 via-brand to-emerald-400"
                  underlineHeight="h-1 sm:h-1.5"
                  underlineOffset="-bottom-2 sm:-bottom-3"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal tracking-tight text-slate-900 dark:text-white leading-[1.18]"
                />
              </div>

              {/* Subtitle / Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
                className="space-y-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                <p>
                  Managing injury-related medical billing can be complicated. From insurance claims and documentation to payment follow-ups and outstanding accounts, every step requires attention.
                </p>
                <p>
                  Svizzera Healthcare Solutions helps medical practices simplify their personal injury billing workflows, improve revenue cycle visibility and spend less time managing administrative tasks.
                </p>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Get billing support that works around your practice&apos;s needs.
                </p>
              </motion.div>

              {/* Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
                className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
              >
                <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
                  <span>Request a Free Billing Review</span>
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

                <a
                  href="tel:+14694035472"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-800 transition-all shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Call +1 (469) 403-5472</span>
                </a>
              </motion.div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans italic pt-1">
                Prefer to speak directly with our injury billing specialists? We respond within one business hour.
              </p>
            </div>

            {/* Right Column: Hero Visual with Interactive Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full">
                  <Image
                    src="/images/personal-injury/hero-personal-injury.png"
                    alt="Personal Injury Medical Billing Services - Svizzera Healthcare"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Overlay Trust Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs backdrop-blur-md bg-slate-950/60 p-2.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-medium">Active PI Claim Oversight</span>
                    </div>
                    <span className="font-mono text-teal-300 font-semibold">98%+ Clean Submissions</span>
                  </div>
                </div>

                {/* Floating Metric Badge 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="hidden sm:flex absolute -top-4 -left-4 items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl backdrop-blur-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                    <FileCheck2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Documentation</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-sans">Lien & PIP Scrubbed</p>
                  </div>
                </motion.div>

                {/* Floating Metric Badge 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="hidden sm:flex absolute -bottom-4 -right-4 items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl backdrop-blur-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Compliance</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-sans">100% HIPAA Secured</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 4 Trust Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
            className="pt-12 sm:pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left"
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
                <Scale className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                PIP, MedPay & Letter of Protection mastery
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

      {/* =========================================================================
          SECTION 2: THE PROBLEM (from PDF)
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: The Challenges Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold tracking-wider uppercase font-sans">
                THE CHALLENGES OF INJURY-RELATED BILLING
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Personal Injury Billing Comes With Challenges <br className="hidden sm:inline" />
                <span className="italic text-rose-600 dark:text-rose-400 font-medium">
                  Your Practice Cannot Ignore
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Personal injury cases often involve more than routine medical billing. Multiple parties, different payment arrangements and extensive documentation can make the revenue cycle difficult to manage.
              </p>

              {/* 6 Challenges Grid */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Your team may be dealing with:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Complex injury-related claim documentation.",
                    "Delayed insurance responses and payments.",
                    "Claim rejections and billing discrepancies.",
                    "Time-consuming accounts receivable follow-ups.",
                    "Incomplete patient and insurance information.",
                    "Administrative pressure on your in-house billing team.",
                  ].map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3 hover:border-rose-400/50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 font-sans">
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Callout */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                <strong className="text-rose-700 dark:text-rose-300 font-semibold">The Financial Impact:</strong> These challenges can affect cash flow, increase administrative workload and take valuable time away from patient care.
              </div>

              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 font-sans">
                Your practice deserves a billing process that is organised, consistent and easier to manage.
              </p>
            </motion.div>

            {/* Right: Problem Visual Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-xl relative overflow-hidden space-y-5">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-amber-400 to-teal-400" />

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full">
                  <Image
                    src="/images/personal-injury/pi-workflow-analytics.png"
                    alt="Resolving Personal Injury Billing Roadblocks"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs backdrop-blur-md bg-slate-950/70 p-3 rounded-xl border border-white/10">
                    <p className="font-semibold text-white font-sans text-xs">Transforming Bottlenecks Into Clean Cash Flow</p>
                    <p className="text-[11px] text-slate-300 font-light mt-0.5">
                      Proactive lien, PIP and adjuster management avoids aged settlement write-offs.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  <p>
                    Unlike standard commercial billing, personal injury accounts require continuous communication with claims adjusters, tracking PIP/MedPay exhaustion, and validating legal documentation before balances age out.
                  </p>
                  <Button href="/contact" size="sm" shimmer={true} className="w-full">
                    <span>Audit Your Personal Injury A/R</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR SOLUTION (from PDF)
          ========================================================================= */}
      <section
        id="our-solution"
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
              OUR SOLUTION
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Personal Injury Medical Billing Support <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Built Around Your Practice
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              At Svizzera Healthcare Solutions, we understand that medical billing requires accuracy, consistency and proper follow-through. Our medical billing and revenue cycle management solutions help healthcare providers manage essential billing operations while maintaining better visibility over their revenue cycle.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans italic">
              Whether you operate an independent clinic or a growing healthcare organisation, we can help streamline your billing processes.
            </p>
          </motion.div>

          {/* Grid Feature Cards with Dashed Dividers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs"
          >
            {solutionFeatures.map((feature, idx) => (
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

          {/* Service Pathways Quick Navigation */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Explore Related Solutions:
            </span>
            <Link
              href="/services/medical-billing-services"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Medical Billing Services &rarr;
            </Link>
            <Link
              href="/services/chiropractic-billing"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              Chiropractic Billing &rarr;
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

      {/* =========================================================================
          SECTION 4: WHO WE HELP (from PDF)
          ========================================================================= */}
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
              WHO WE HELP
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Personal Injury Billing Solutions <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                for Different Healthcare Specialties
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              We support healthcare providers looking to simplify their billing operations and manage the administrative demands of injury-related treatment.
            </p>
          </motion.div>

          {/* 6 Specialties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtiesWeHelp.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200/50 dark:border-teal-800/50">
                        {item.highlight}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                        {item.subtitle}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white font-sans mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.link ? (
                    <div className="pt-2">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand dark:text-teal-300 hover:underline"
                      >
                        <span>View dedicated specialty service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Specialties Spotlight & Bottom CTA Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl bg-slate-950 text-white border border-slate-800 p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Running a different type of healthcare practice?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed">
                Whether you run an imaging facility, ambulatory surgery center, or multi-specialty trauma group, let&apos;s discuss your billing requirements.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button
                href="/contact"
                size="lg"
                shimmer={true}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
              >
                <span>Discuss Your Practice&apos;s Needs</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHY CHOOSE SVIZZERA? (from PDF)
          ========================================================================= */}
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
              WHY CHOOSE SVIZZERA?
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              A Medical Billing Partner Focused on <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Your Practice&apos;s Financial Operations
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Choosing a medical billing partner is about more than outsourcing administrative tasks. You need a team that understands the importance of accurate information, consistent follow-ups and organised processes.
            </p>
          </motion.div>

          {/* 6 Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseSvizzera.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Middle Highlight Visual with specialties-care.png */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-lg relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] w-full">
                <Image
                  src="/images/personal-injury/specialties-care.png"
                  alt="Personal Injury Patient Care & Claims Management"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand dark:text-teal-300 uppercase tracking-widest font-sans">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  PRACTICE-CENTERED RECOVERY
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                  Protecting Your Bottom Line While You Focus on Healing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Treating accident patients requires immense clinical dedication. When documentation lapses or adjuster delays threaten reimbursement, Svizzera steps in as an accountable operational extension of your practice. We protect every dollar your clinical team has earned.
                </p>
                <div className="pt-2">
                  <Button href="/contact" size="md" shimmer={true}>
                    <span>Schedule an Introductory Discussion</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW IT WORKS (from PDF)
          ========================================================================= */}
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
              Getting Started With Svizzera <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Is Simple
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              A seamless, zero-friction transition organized around your practice&apos;s current workflow, EHR platform, and operational scope.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={onboardingSteps} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FINAL CONVERSION CTA (from PDF)
          ========================================================================= */}
      <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 dark:bg-teal-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-teal-600/10 dark:bg-teal-900/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            PARTNER WITH SVIZZERA HEALTHCARE SOLUTIONS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
            Spend Less Time Managing Billing. <br className="hidden sm:inline" />
            <span className="italic text-teal-400 font-medium">
              Spend More Time Growing Your Practice.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Personal injury-related medical billing can put additional pressure on your administrative team. You don&apos;t have to manage every part of the revenue cycle alone.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Partner with Svizzera Healthcare Solutions for medical billing and revenue cycle management support designed around your practice. Let&apos;s discuss how we can support your billing operations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              shimmer={true}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
            >
              <span>Request Your Free Billing Review</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <a
              href="tel:+14694035472"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call +1 (469) 403-5472</span>
            </a>

            <a
              href="mailto:info@gosvizzera.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
            >
              <Mail className="w-4 h-4 text-teal-300" />
              <span>info@gosvizzera.com</span>
            </a>
          </div>

          <p className="text-xs text-teal-300/80 font-mono tracking-wide pt-2">
            Response within one business hour is our stated service commitment.
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAJOR PAYERS & CARRIERS MARQUEE
          ========================================================================= */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="AUTO, PIP & COMMERCIAL PAYERS WE BILL NATIONWIDE"
          items={[
            "State Farm",
            "GEICO",
            "Progressive",
            "Allstate",
            "Travelers",
            "Liberty Mutual",
            "Nationwide",
            "USAA",
            "UnitedHealthcare",
            "Aetna",
            "Cigna",
            "BCBS Plans",
          ]}
        />
      </section>

      {/* =========================================================================
          SECTION 8: FREQUENTLY ASKED QUESTIONS (from PDF)
          ========================================================================= */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="Detailed answers to common questions healthcare providers ask regarding Svizzera's personal injury medical billing services."
          items={personalInjuryFaqs}
          generateSchema={false}
        />
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

