"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { FeatureCard, FeatureType } from "@/components/ui/grid-feature-cards";
import { LogoCloud } from "@/components/ui/logo-cloud-15";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import FAQSection from "@/components/ui/faq-monochrome";
import { ShieldCheck, Zap, Award, CheckCircle2 } from "lucide-react";

const verificationWorkflowSteps: Step[] = [
  {
    title: "Appointment Review",
    description:
      "Patient appointments are pulled from your EHR or practice management system, and each scheduled patient is queued for verification up to 72 hours before the visit.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "Insurance Verification",
    description:
      "Eligibility and benefits are verified using EDI 270/271 transactions and payer portals.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "EHR Documentation",
    description:
      "Verified insurance details and benefits are accurately documented in the patient’s EHR.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "Re-verification (When Needed)",
    description:
      "High-risk cases, such as recent insurance changes or Medicare/Medicaid plans, are re-verified before the appointment.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "Denial Resolution",
    description:
      "If an eligibility-related denial occurs, we identify the root cause, update the verification details, and support claim correction and resubmission.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

const whatWeDoFeatures: FeatureType[] = [
  {
    metric: "72-Hour SLA",
    title: "Pre-Visit Eligibility Verification",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description: "Systematic verification of every scheduled patient’s insurance coverage 72 hours before their appointment — active status, plan details, and all key benefit components confirmed and documented.",
  },
  {
    metric: "EDI 270/271",
    title: "Real-Time Benefits Verification",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: "Live benefits checks via EDI 270/271 transactions and payer web portals — returning copay, deductible, coinsurance, and out-of-pocket data for accurate patient estimates and upfront collections.",
  },
  {
    metric: "Cost Breakdown",
    title: "Coverage & Deductible Confirmation",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    description: "Deductible amount, amount met year-to-date, coinsurance percentage, and out-of-pocket maximum all confirmed and entered into the patient record prior to every visit.",
  },
  {
    metric: "COB Rules",
    title: "Coordination of Benefits (COB) Checks",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    description: "When patients carry primary and secondary insurance, coordination of benefits is verified — primary vs. secondary payer order confirmed, preventing claim crossover errors and delayed reimbursement.",
  },
  {
    metric: "Split-Billing Protection",
    title: "Secondary Insurance Verification",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    description: "Secondary and tertiary payer coverage verified separately — benefit limits, coverage order, and billing requirements documented before any service is rendered to prevent split-billing errors.",
  },
  {
    metric: "Denial Recovery",
    title: "Eligibility Reverification on Denial",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description: "When a claim is denied with an eligibility-related code, we reverify current coverage, identify what changed, update the patient record, and prepare corrected claim resubmission documentation.",
  },
];

export default function InsuranceVerificationPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* 1. Hero Section — Designed with About Us Page Spring Effects */}
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
            Healthcare RCM & Front-End Operations
          </motion.div>

          {/* AnimatedText Headline */}
          <div className="pt-2">
            <AnimatedText
              as="h1"
              text={"Insurance Verification\n& Eligibility Services"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          {/* Hero Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto pt-2"
          >
            Eliminate front-end claim rejections and coverage surprises. We verify patient eligibility, co-pays, deductibles, and prior-authorization requirements before appointments take place.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
            className="pt-3 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Button href="/contact" size="lg" shimmer={true} className="shadow-md shadow-brand/20">
              <span>Book a Strategy Call</span>
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

          {/* Trust Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
            className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left"
          >
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans">Same-Day Validation</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">24–48 hrs prior to DOS</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans">99.4% Accuracy</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Zero eligibility denials</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans">100% HIPAA Secured</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">BAA & Encrypted Workflows</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stop Revenue Loss before It Starts */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headline, Narrative & Consultation CTA */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Section Subtitle Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                Front-End Revenue Protection
              </div>

              {/* Main Headline in Bodoni Moda */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                Stop Revenue Loss before It{" "}
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Starts
                </span>
              </h2>

              {/* Subheading in Lato */}
              <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 font-sans leading-snug">
                Accurate insurance verification before every appointment to help reduce denials, speed up payments, and maximize collections.
              </p>

              {/* Narrative Content */}
              <div className="space-y-3.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  Around <strong className="text-slate-900 dark:text-white font-medium">27% of claim denials</strong> occur because insurance eligibility was not properly verified before the patient&apos;s visit. Since each denied claim can cost <strong className="text-slate-900 dark:text-white font-medium">$25 to $181</strong> to correct and resubmit, eligibility verification is one of the most expensive yet most preventable issues in the revenue cycle.
                </p>
                <p>
                  Every unverified patient increases financial risk, while timely insurance verification reduces denials and protects your revenue.
                </p>
              </div>

              {/* Primary Consultation Action Button */}
              <div className="pt-2">
                <Button
                  href="/contact"
                  size="lg"
                  shimmer={true}
                  className="shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30"
                >
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
              </div>
            </motion.div>

            {/* Right Column: Pre-Service Verification Card with 4 Key Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden space-y-6">
                {/* Top Accent Gradient Border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

                {/* Shield / Protection Icon */}
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                {/* Card Title & Highlight Description */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                    Reliability Standard
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-[1.2]">
                    Pre-Service <span className="italic text-brand dark:text-teal-400 font-medium">Verification</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                    Complete benefits breakdown delivered directly into your EHR before the patient arrives in the waiting room.
                  </p>
                </div>

                {/* 4 Checkmark Pillars (Zero Emojis, Pure Clean SVGs) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  {[
                    "Verified 72 hours before every scheduled appointment",
                    "EDI 270/271 + payer portal real-time verification",
                    "Works inside your existing EHR — no system changes",
                    "HIPAA-focused · BAA provided at onboarding",
                  ].map((pillar) => (
                    <div key={pillar} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                      <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. What We Do - Every Insurance Check We Handle for Your Practice (Exact About-page style 6-Grid Feature Cards) */}
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
              WHAT WE DO
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Every Insurance Check We Handle <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                for Your Practice
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              A complete insurance verification workflow managed by your dedicated team, documented in your EHR, before every patient arrives.
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
            {whatWeDoFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={idx}
                className={idx >= 3 ? "lg:border-t lg:border-dashed lg:border-slate-200 dark:lg:border-slate-800" : ""}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS — Your Verification Workflow From Roster to Appointment */}
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
              Your Verification Workflow <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">From Roster to Appointment</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              A proactive, end-to-end verification process designed to secure patient coverage and eliminate administrative delays before check-in.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={verificationWorkflowSteps} />

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

      {/* 5. Major Payers We Submit To — BorderBeam Animated Marquee */}
      <section className="relative py-14 sm:py-20 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <LogoCloud
          title="MAJOR PAYERS WE SUBMIT TO"
          items={[
            "Regional Carriers",
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

      {/* 6. FAQ Section — Interactive Monochrome Style with Signal Header */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="Answers to the most common questions healthcare organizations ask before partnering with Svizzera."
        />
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
