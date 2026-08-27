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
  FileCode2,
  Stethoscope,
  Boxes,
  Sliders,
  FileSearch,
  ClipboardCheck,
  Building2,
  FileCheck2,
} from "lucide-react";

// 6 Core Coding Services
const codingServicesFeatures: FeatureType[] = [
  {
    metric: "ICD-10-CM",
    title: "ICD-10-CM Diagnosis Coding",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      "Accurate diagnosis coding, including primary and secondary diagnoses, chronic conditions, and HCC documentation.",
  },
  {
    metric: "CPT Codes",
    title: "CPT Procedure Coding",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description:
      "Precise CPT coding for E&M services, surgeries, diagnostic procedures, preventive care, and other physician services.",
  },
  {
    metric: "HCPCS Level II",
    title: "HCPCS Level II Coding",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    description:
      "Coding for medications, medical supplies, durable medical equipment (DME), and other Medicare and commercial payer requirements.",
  },
  {
    metric: "Modifiers & NCCI",
    title: "Modifier Application & Review",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    description:
      "Correct application of coding modifiers to improve claim accuracy and reduce bundling and edit-related denials.",
  },
  {
    metric: "E&M Optimization",
    title: "E&M Coding Review",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    description:
      "Accurate Evaluation & Management (E&M) level selection based on current coding guidelines and provider documentation.",
  },
  {
    metric: "Quality & Audits",
    title: "Coding Audits & Compliance",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "Routine coding audits to identify documentation gaps, improve coding accuracy, and support regulatory compliance.",
  },
];

// 5 Pinned Flow Steps for the Medical Coding Process
const codingWorkflowSteps: Step[] = [
  {
    title: "Documentation Review",
    description:
      "Provider documentation is reviewed to ensure completeness, accuracy, and coding readiness.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "Code Assignment",
    description:
      "Accurate ICD-10-CM, CPT, and HCPCS Level II codes are assigned based on current coding guidelines.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "Coding Validation",
    description:
      "Modifiers, NCCI edits, bundling rules, and payer-specific requirements are reviewed for compliance.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "Claim Quality Review",
    description:
      "Claims are scrubbed to identify coding errors, documentation gaps, and edit violations before submission.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "Denial Analysis",
    description:
      "Coding-related denials are analysed to identify root causes and support continuous improvement.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

// FAQs for Medical Coding
const medicalCodingFaqs: FAQItem[] = [
  {
    question: "How do certified medical coders improve reimbursement?",
    answer:
      "Svizzera’s CPC-credentialed coding team assigns accurate ICD-10-CM, CPT, and HCPCS Level II codes based on clinical documentation and payer guidelines. Accurate coding helps reduce claim denials, improve first-pass claim acceptance, and maximize reimbursement.",
    meta: "Accuracy",
  },
  {
    question: "What makes Svizzera's coding team different?",
    answer:
      "Every Svizzera coder is CPC/CCS credentialed by AAPC or AHIMA with a minimum of 5 years of specialty experience, maintaining a 98%+ coding accuracy SLA with continuous pre-bill quality audits.",
    meta: "Expertise",
  },
  {
    question: "How quickly can Svizzera start coding for my practice?",
    answer:
      "We can typically onboard your practice and begin processing charts within 5 to 10 business days following EHR credentialing and BAA execution.",
    meta: "Onboarding",
  },
  {
    question: "Can Svizzera support multiple specialties and care settings?",
    answer:
      "Yes. We support 30+ clinical specialties across inpatient, outpatient, ambulatory surgery centers (ASC), emergency care, and physician group practices.",
    meta: "Specialties",
  },
  {
    question: "Does Svizzera provide coding audits and compliance support?",
    answer:
      "Yes. Routine monthly coding audits, documentation gap analyses, and provider education feedback loops are built into our partnership to maintain strict compliance.",
    meta: "Audits",
  },
];

export default function MedicalCodingPage() {
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
              text={"Medical Coding\nOutsourcing Services"}
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
              Accurate Coding. Faster Reimbursements. Fewer Denials.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
              Coding errors are one of the leading causes of claim denials, resulting in delayed payments and lost revenue. Svizzera’s CPC-credentialed coding team delivers accurate, guidelines-based coding across 30+ medical specialties, helping improve claim accuracy and maximize reimbursement while working seamlessly within your existing EHR.
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
            <Button href="#coding-services" variant="outline" size="lg">
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
                <Award className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                CPC-credentialed coders · AAPC / AHIMA
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <FileCode2 className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                ICD-10-CM, CPT, HCPCS Level II code sets
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 flex items-center justify-center flex-shrink-0 border border-teal-200/60 dark:border-teal-800/60">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white font-sans leading-tight">
                Works in your existing EHR · Zero new tools
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

      {/* 2. CODING SERVICES — Complete Coding Services for Every Specialty */}
      <section
        id="coding-services"
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
              CODING SERVICES
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Complete Coding Services <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                for Every Specialty
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Our certified coding team delivers accurate, compliant, and timely coding across all major specialties and care settings to help maximize reimbursement and reduce claim denials.
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
            {codingServicesFeatures.map((feature, idx) => (
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

      {/* 3. HOW IT WORKS — Medical Coding Process */}
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
              Medical Coding <br className="hidden sm:inline" />
              <span className="italic text-brand dark:text-teal-400 font-medium">
                Workflow Process
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
            >
              From clinical documentation review to denial root-cause analysis, every chart undergoes rigorous pre-bill validation.
            </motion.p>
          </div>

          {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
          <HowItWorks features={codingWorkflowSteps} />

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
                  30–40%
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 font-sans leading-snug">
                  reduction in coding-related denial rates reported by organizations leveraging structured, outsourced RCM coding partnerships versus in-house coding models.
                </p>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                Source: Healthcare outsourcing RCM research, industry literature (2024–2025). Outcomes vary by practice type, specialty, payer mix, and service scope.
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

      {/* 4. Major Payers We Submit To — BorderBeam Animated Marquee */}
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

      {/* 5. FAQ Section */}
      <section className="relative py-8 sm:py-12 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
        <FAQSection
          badge="FAQ"
          title="Frequently Asked"
          highlightedTitle="Questions"
          description="What practice administrators and physicians ask before outsourcing medical coding."
          items={medicalCodingFaqs}
        />
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
