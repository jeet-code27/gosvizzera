"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import { FeatureCard, type FeatureType } from "@/components/ui/grid-feature-cards";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";

// Clean SVG Icons for the 6 Why Choose Features (ZERO text emojis)
const HospitalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 9h6M9 13h6M9 17h6" />
    <path d="M12 7v4m-2-2h4" strokeWidth="2.5" />
  </svg>
);

const StethoscopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DedicatedTeamIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Support24Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CleanClaimIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const whyChooseFeatures: FeatureType[] = [
  {
    metric: "5+ Years",
    title: "Industry Experience",
    icon: HospitalIcon,
    description: "Supporting healthcare operations with dedicated back-office expertise and specialized revenue cycle staff.",
  },
  {
    metric: "30+ Specialties",
    title: "Clinical Specialties",
    icon: StethoscopeIcon,
    description: "Deep experience across diverse medical specialties, surgical workflows, and complex coding systems.",
  },
  {
    metric: "100% HIPAA",
    title: "HIPAA Focused & Protected",
    icon: ShieldCheckIcon,
    description: "Secure processes designed around strict healthcare compliance, executed BAAs, and privacy protocols.",
  },
  {
    metric: "1:1 Ratio",
    title: "Dedicated Account Teams",
    icon: DedicatedTeamIcon,
    description: "Work with a consistent, specialized team that understands your practice workflows and communication styles.",
  },
  {
    metric: "24/7 SLA",
    title: "Operational Support",
    icon: Support24Icon,
    description: "Reliable, high-throughput healthcare operations designed to eliminate backlogs and improve collection velocity.",
  },
  {
    metric: "98.7% Rate",
    title: "Clean Claims Accuracy",
    icon: CleanClaimIcon,
    description: "First-pass accuracy ensuring claims are paid faster without recurring denials or payer delays.",
  },
];

// The 6 Core Principles (Zero Emojis, Pure Clean Vector SVGs)
const principlesData = [
  {
    num: "01",
    title: "Clinical Precision",
    desc: "We treat every authorization, every code, and every claim as if a patient’s access to care depends on it — because it does. Accuracy is non-negotiable at every step of our workflow.",
    tag: "Patient-First Accuracy",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "group-hover:border-teal-500/40",
  },
  {
    num: "02",
    title: "Data Security & HIPAA",
    desc: "Protected Health Information is handled with the highest degree of care. BAA provided at onboarding, encrypted systems, role-based access, and documented audit trails across all services.",
    tag: "Enterprise Protection",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    accent: "group-hover:border-cyan-500/40",
  },
  {
    num: "03",
    title: "Dedicated Ownership",
    desc: "You receive a named team, not a help desk ticket. Your account manager and authorization specialists learn your payers, your specialties, and your practice patterns — and own the outcomes.",
    tag: "Named Account Teams",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    accent: "group-hover:border-brand/40",
  },
  {
    num: "04",
    title: "Transparent Reporting",
    desc: "Monthly performance reports. Approval rates, denial rates, appeal outcomes, turnaround times — all reported with your account manager present. No vanity metrics. No hidden numbers.",
    tag: "Zero Vanity Metrics",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: "group-hover:border-emerald-500/40",
  },
  {
    num: "05",
    title: "Operational Speed",
    desc: "Time matters in healthcare operations. Our onboarding takes 5–10 business days. Authorization submissions happen same or next business day. Denial appeals are filed before payer deadlines — every time.",
    tag: "Same-Day SLA",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: "group-hover:border-amber-500/40",
  },
  {
    num: "06",
    title: "Regulatory Currency",
    desc: "Payer policies change. CMS mandates evolve. Our teams receive ongoing training on ICD-10/CPT updates, new payer requirements, and federal mandates including CMS-0057-F to keep your practice protected.",
    tag: "CMS-0057-F Compliant",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    accent: "group-hover:border-teal-400/40",
  },
];

function AnimatedContainer({ className, delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* 1. About Us Hero Section - 100% Pure & Clean */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 bg-transparent">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Healthcare Outsourcing Partner
          </motion.div>

          {/* AnimatedText Headline with Line Break after About */}
          <div className="pt-2">
            <AnimatedText
              text={"About\nSvizzera Healthcare Solutions"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Button href="/contact" size="md" shimmer={true}>
              Schedule Free Consultation &rarr;
            </Button>
            <Button href="/#services" variant="outline" size="md">
              Explore Our Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. The Team Behind Your Revenue Cycle Section - 100% Pure & Clean */}
      <section className="relative py-14 sm:py-20 bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Story, Headline & Consultation CTA */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Section Subtitle Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                Operational Excellence
              </div>

              {/* Main Headline in Bodoni Moda */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                The Team Behind Your{" "}
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Revenue Cycle
                </span>
              </h2>

              {/* Body Content in Lato */}
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl">
                Svizzera Healthcare Solutions helps healthcare organizations streamline prior authorization, medical coding, revenue cycle operations, patient scheduling, and administrative workflows through dedicated healthcare specialists.
              </p>

              {/* Primary Consultation Action Button */}
              <div className="pt-2">
                <Button
                  href="/contact"
                  size="lg"
                  shimmer={true}
                  className="shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30"
                >
                  <span>Schedule a Consultation</span>
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

            {/* Right Column: Precision-First Operations Card */}
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

                {/* Target / Precision Icon */}
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                {/* Card Title & Highlight Description */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                    Quality Guarantee
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-[1.2]">
                    Precision-First <span className="italic text-brand dark:text-teal-400 font-medium">Operations</span>
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                    Every authorization, coding decision, and claim is handled with clinical and regulatory accuracy — not speed at the expense of quality.
                  </p>
                </div>

                {/* Micro-Features Checklist */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                    <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Clinical & regulatory accuracy benchmarks</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                    <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Dedicated certified healthcare specialists</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Why Healthcare Providers Choose Svizzera (Grid Feature Cards - 100% Pure & Clean) */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Section Header in Bodoni Moda & Lato */}
          <AnimatedContainer className="max-w-3xl mx-auto text-center space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              WHY HEALTHCARE PROVIDERS CHOOSE SVIZZERA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Built on Trust, Security & <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Operational Excellence
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Our infrastructure is engineered specifically for healthcare providers seeking dependable, compliant, and high-velocity revenue cycle performance.
            </p>
          </AnimatedContainer>

          {/* Grid Feature Cards with Dashed Dividers */}
          <AnimatedContainer
            delay={0.25}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 lg:divide-y-0 sm:divide-x lg:divide-x divide-dashed divide-slate-200 dark:divide-slate-800 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs"
          >
            {whyChooseFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={idx}
                className={idx >= 3 ? "lg:border-t lg:border-dashed lg:border-slate-200 dark:lg:border-slate-800" : ""}
              />
            ))}
          </AnimatedContainer>
        </div>
      </section>

      {/* 4. Driven by Purpose — Built for Better Healthcare Operations Section */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Purpose & Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                Driven by Purpose
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.18]">
                Built for Better <br className="hidden sm:inline" />
                <span className="italic text-brand dark:text-teal-400 font-medium">
                  Healthcare Operations.
                </span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                <p>
                  At <strong className="text-slate-900 dark:text-white font-medium">Svizzera Healthcare Solutions</strong>, we believe healthcare professionals should spend more time caring for patients and less time managing administrative complexity.
                </p>
                <p>
                  Our team partners with healthcare providers to streamline prior authorization, medical coding, patient scheduling, revenue cycle management, and other operational workflows with accuracy, accountability, and consistency.
                </p>
                <p>
                  We combine healthcare expertise, secure processes, and dedicated support teams to help practices improve efficiency, reduce administrative burden, and strengthen the overall patient experience.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Mission Card with 4 Key Pillars */}
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

                {/* Target Icon (Zero Emojis, Pure SVG) */}
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                    Core Commitment
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-[1.2]">
                    Our <span className="italic text-brand dark:text-teal-400 font-medium">Mission</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1">
                    To empower healthcare organizations with dependable operational support that improves efficiency, protects compliance, and enables providers to focus on delivering exceptional patient care.
                  </p>
                </div>

                {/* 4 Checkmark Pillars (Zero Emojis, Pure SVG) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  {[
                    "Patient-Centered Approach",
                    "Operational Excellence",
                    "HIPAA-Focused Workflows",
                    "Long-Term Healthcare Partnerships",
                  ].map((pillar) => (
                    <div key={pillar} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-sans font-medium">
                      <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. What Drives Us — The Principles We Never Compromise On (Interactive 6-Card Matrix placed last) */}
      <section className="relative py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Section Header */}
          <AnimatedContainer className="max-w-3xl mx-auto text-center space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              What Drives Us
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              The Principles We <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Never Compromise On
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Six core values that govern every client relationship, every workflow, and every hire at Svizzera Healthcare Solutions.
            </p>
          </AnimatedContainer>

          {/* 6 Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {principlesData.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className={`group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between space-y-5 ${item.accent}`}
              >
                {/* Top Number & Tag Header */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/60 shadow-xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    {item.num}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans group-hover:text-brand dark:group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tag Pill */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/60 text-[10px] sm:text-[11px] font-semibold text-slate-600 dark:text-slate-400 font-sans tracking-wide">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
