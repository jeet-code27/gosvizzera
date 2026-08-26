"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BorderBeamPanel } from "@/components/ui/border-beam-panel";

interface ServiceCardData {
  id: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  features: string[];
  icon: React.ReactNode;
}

const servicesData: ServiceCardData[] = [
  {
    id: "insurance-verification",
    tag: "Eligibility & Benefits",
    title: "Insurance Verification",
    description:
      "Real-time insurance coverage validation, co-pay calculation, and proactive eligibility verification to eliminate front-end denials.",
    href: "/services/insurance-verification",
    features: ["Real-time Payer Validation", "Co-Pay & Deductible Checks", "Denial Prevention Matrix"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "prior-authorization",
    tag: "Pre-Approval & Approvals",
    title: "Prior Authorization",
    description:
      "Rapid pre-authorization coordination across all medical specialties with zero treatment delays and automated documentation tracking.",
    href: "/services/prior-authorization",
    features: ["Fast-Track Turnaround", "Payer Criteria Compliance", "Multi-Specialty Support"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "medical-coding",
    tag: "Certified Accuracy",
    title: "Medical Coding",
    description:
      "Certified AAPC & AHIMA coders providing accurate ICD-10-CM, CPT, and HCPCS coding to ensure full compliance and maximized payouts.",
    href: "/services/medical-coding",
    features: ["99%+ Coding Accuracy", "AAPC / AHIMA Certified", "Specialty-Specific Guidelines"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "revenue-cycle-management",
    tag: "Full-Scale RCM",
    title: "Revenue Cycle Management",
    description:
      "Complete end-to-end billing and financial workflow management designed to optimize cash flow and minimize collection cycles.",
    href: "/services/revenue-cycle-management",
    features: ["Full Lifecycle RCM", "Financial KPIs & Analytics", "Accelerated Cash Flow"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "claims-management",
    tag: "Submissions & Scrubbing",
    title: "Claims Management",
    description:
      "Robust claim scrubbing, error-free electronic submissions, and instantaneous rejection resolution for rapid reimbursement.",
    href: "/services/claims-management",
    features: ["98%+ First-Pass Clean Rate", "Automated Claim Scrubbing", "Rapid Rejection Fixes"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "ar-follow-up",
    tag: "Aging & Denial Recovery",
    title: "AR Follow-Up",
    description:
      "Aggressive aged accounts receivable tracking, denial management, and appeal handling to recover stuck revenue and shorten DSO.",
    href: "/services/ar-follow-up",
    features: ["Aging 30-120+ Recovery", "Payer Escalation Matrix", "Root-Cause Denial Fix"],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 bg-transparent">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/5 dark:bg-teal-400/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with requested content */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans"
          >
            OUR SERVICES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Revenue Cycle Services.{" "}
            <span className="italic text-brand dark:text-teal-400">One Trusted Partner.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
          >
            End-to-end healthcare revenue cycle support designed to improve operational efficiency, reduce administrative burden, and maximize reimbursements.
          </motion.p>
        </div>

        {/* 6 Services Grid with 21dev BorderBeamPanel */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 * index }}
              className="flex"
            >
              <BorderBeamPanel
                beams={2}
                thickness={2}
                radius={20}
                seed={index + 1}
                glow={true}
                className="flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 dark:bg-teal-400/10 text-brand dark:text-teal-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors font-sans">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light font-sans">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Checklist Pills */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-slate-800">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-sans font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    0{index + 1}
                  </span>
                </div>
              </BorderBeamPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
