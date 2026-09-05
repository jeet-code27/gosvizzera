"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import StrategyCallForm from "@/components/StrategyCallForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* 1. Hero Section with AnimatedText Effect */}
      <section className="relative pt-28 sm:pt-36 pb-8 sm:pb-12 bg-transparent">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Healthcare Operations Consultation
          </motion.div>

          {/* AnimatedText Headline with Spring Effect & Underline */}
          <div className="pt-1">
            <AnimatedText
              as="h1"
              text={"Book a Healthcare RCM\nStrategy Call"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed"
          >
            Speak directly with our healthcare revenue cycle specialists. We’ll analyze your practice’s current denial rate, authorization turnaround, and staffing requirements — with zero obligation.
          </motion.p>

          {/* 4 Mini Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans"
          >
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>100% HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Dedicated 1:1 Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>&lt; 24-Hour SLA Delivery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Strategy Call Form Section */}
      <section className="relative pb-20 sm:pb-28 bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StrategyCallForm />
        </div>
      </section>

      {/* Global Brand Footer */}
      <Footer />
    </main>
  );
}
