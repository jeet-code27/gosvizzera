"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { LogoCloud } from "@/components/ui/logo-cloud-15";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import FAQSection, { type FAQItem } from "@/components/ui/faq-monochrome";
import {
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  FileCheck2,
  RotateCcw,
  Scale,
  Clock,
  Globe2,
  Lock,
  Cpu,
} from "lucide-react";

// 5 Pinned Flow Steps for the Authorization Lifecycle
const authorizationWorkflowSteps: Step[] = [
  {
    title: "Eligibility & Requirements Check",
    description:
      "We verify active coverage and confirm whether authorization is required before submission.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "Payer Submission",
    description:
      "We prepare and submit all required documents through payer portals, fax, or approved channels.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "Status Tracking & Follow-Up",
    description:
      "We proactively follow up with payers until an approval, denial, or additional request is received.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "Denial Appeals",
    description:
      "When payers deny requests, we prepare and submit first-level appeals with supporting documentation.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "Billing Handoff",
    description:
      "Approved authorizations are documented and handed back to your billing team.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// FAQs for Prior & Retro Authorization
const priorAuthFaqs: FAQItem[] = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most healthcare teams are operational within 5 to 10 business days depending on payer complexity and documentation requirements.",
    meta: "Onboarding",
  },
  {
    question: "Do we need to change our EHR system?",
    answer:
      "No. Our specialists work directly inside your existing EHR, EMR, or PM platforms (such as Epic, Cerner, Athenahealth, eClinicalWorks, NextGen, and others) with zero workflow disruption or costly software migration required.",
    meta: "Integration",
  },
  {
    question: "Which payers do you support?",
    answer:
      "We support over 40+ payer protocols nationwide, including UnitedHealthcare, Aetna, Cigna, Humana, BCBS Plans, Medicare Advantage, Medicaid MCOs, Tricare, and regional commercial plans.",
    meta: "Payers",
  },
  {
    question: "Do you handle denial appeals?",
    answer:
      "Yes. Comprehensive first-level clinical appeals, clinical documentation assembly, and peer-to-peer review coordination are fully included in our core authorization service, never billed as an add-on.",
    meta: "Appeals",
  },
  {
    question: "Is Svizzera HIPAA compliant?",
    answer:
      "100% HIPAA compliant. We sign a formal Business Associate Agreement (BAA) at onboarding and execute all tasks under end-to-end encrypted, audit-trailed workflows.",
    meta: "Compliance",
  },
];

export default function PriorAuthorizationPage() {
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
              text={"Prior & Retro Authorization\nOutsourcing Services"}
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
              Stop Losing Revenue to Authorization Delays
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Your team belongs at the bedside, not on hold with payers. Svizzera manages your complete prior and retro authorization lifecycle: submission, payer follow-up, denial appeals, and retrospective authorization for emergency and unplanned care.
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
            <Button href="/about" variant="outline" size="lg">
              About Our Team
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
                <Globe2 className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                All major commercial & government payers
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Scale className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                First-level appeals included, not an add-on
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

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                No EHR changes · 5–10 business days launch
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR AUTHORIZATION SERVICES — 3 Integrated Services */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
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
              OUR AUTHORIZATION SERVICES
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Everything We Handle <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                For You
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Three integrated services managed by the same dedicated team, inside your existing EHR, with no workflow disruption.
            </p>
          </motion.div>

          {/* 3 Detailed Authorization Service Pillar Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Card 1: Prior Authorization */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/40 overflow-hidden flex flex-col justify-between space-y-6 group hover:border-brand/40 dark:hover:border-teal-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 font-sans">
                    Pre-Service Approval
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-tight mt-1">
                    Prior <span className="italic text-brand dark:text-teal-400 font-medium">Authorization</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-2">
                    Advance payer approval managed end-to-end so your clinical team never touches a portal, fax, or payer hold queue.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                {[
                  "Eligibility & benefit verification",
                  "Payer portal, fax & phone submissions",
                  "Real-time status tracking",
                  "Letters of medical necessity support",
                  "Re-authorization monitoring",
                  "Approval documentation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                    <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Retro Authorization */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/40 overflow-hidden flex flex-col justify-between space-y-6 group hover:border-brand/40 dark:hover:border-teal-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-teal-500 to-indigo-400" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center border border-sky-200/60 dark:border-sky-800/60 shadow-xs">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 font-sans">
                    Post-Service Recovery
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-tight mt-1">
                    Retro <span className="italic text-sky-600 dark:text-sky-400 font-medium">Authorization</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-2">
                    Post-service authorization for emergency care, urgent procedures, or oversight cases with deadline-driven rapid response.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                {[
                  "Rapid case identification",
                  "Clinical documentation assembly",
                  "Retro authorization submission",
                  "Payer review tracking",
                  "Emergency care support",
                  "Outcome documentation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                    <div className="w-4 h-4 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Denial Management */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/40 overflow-hidden flex flex-col justify-between space-y-6 group hover:border-brand/40 dark:hover:border-teal-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/60 shadow-xs">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
                    Appeals & Resolution
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-tight mt-1">
                    Denial <span className="italic text-amber-600 dark:text-amber-400 font-medium">Management</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-2">
                    When payers deny, we fight with clinical documentation, formal appeals and peer-to-peer coordination.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                {[
                  "Denial reason analysis",
                  "First-level appeal submission",
                  "Clinical documentation support",
                  "Peer-to-peer review coordination",
                  "Appeal deadline management",
                  "Denial reporting",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                    <div className="w-4 h-4 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS — The Authorization Lifecycle We Own From End to End */}
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
              The Authorization Lifecycle <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">We Own From End to End</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              From eligibility check through payer follow-up to billing handoff, our team guarantees proactive tracking every step of the way.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={authorizationWorkflowSteps} />

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
                  80%
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 font-sans leading-snug">
                  of appealed denials can be overturned with proper documentation and timely submission.
                </p>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                Source: Becker&apos;s ASC Review industry benchmark.
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

      {/* 4. WHY SVIZZERA — Why Healthcare Teams Choose Svizzera */}
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
              Why Healthcare Teams <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Choose Svizzera
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Built for healthcare organizations that need faster authorizations without increasing administrative burden.
            </p>
          </motion.div>

          {/* 4 Metric Highlight Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Metric 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-black/40 transition-all duration-300 space-y-3 group hover:border-brand/40 dark:hover:border-teal-500/50">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white block">
                  5-10 Days
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  Operational Onboarding
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                  Most teams are operational within 5 to 10 business days.
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-black/40 transition-all duration-300 space-y-3 group hover:border-brand/40 dark:hover:border-teal-500/50">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white block">
                  40+
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  Payer Protocols Supported
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                  Commercial, Medicare Advantage and regional payer workflows.
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-black/40 transition-all duration-300 space-y-3 group hover:border-brand/40 dark:hover:border-teal-500/50">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white block">
                  HIPAA
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  BAA Provided
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                  Security and compliance documentation provided during onboarding.
                </p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-black/40 transition-all duration-300 space-y-3 group hover:border-brand/40 dark:hover:border-teal-500/50">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white block">
                  No EHR Changes
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-sans">
                  Works Inside Existing Systems
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                  No major implementation or software migration required.
                </p>
              </div>
            </div>
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
          items={priorAuthFaqs}
        />
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
