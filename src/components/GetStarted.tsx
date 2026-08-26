"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";

export default function GetStarted() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Assessment",
      desc: "We analyze your current billing workflow and denial patterns.",
    },
    {
      num: "02",
      title: "Tailored Strategy",
      desc: "Customized RCM blueprint specifically engineered for your practice.",
    },
    {
      num: "03",
      title: "Seamless Launch",
      desc: "Zero disruption to your daily operations or current EHR systems.",
    },
  ];

  return (
    <section id="get-started" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 dark:bg-teal-500/5 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-200/20 dark:bg-teal-900/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Context, Headline & Simple Steps */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              GET STARTED
            </div>

            {/* Headline in Bodoni Moda Serif */}
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Ready to Strengthen Your{" "}
                <span className="italic text-brand dark:text-teal-400 font-medium">Revenue Cycle?</span>
              </h2>
              <p className="text-base sm:text-lg font-semibold text-slate-700 dark:text-teal-200/90 font-sans tracking-wide">
                Getting Started is Simple.
              </p>
            </div>

            {/* Body Copy in Lato Sans */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl">
              No complicated onboarding, system changes, or long-term contracts. We assess your current revenue cycle, develop a customized plan for your practice, and support you every step of the way.
            </p>

            {/* 3 Step Process List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="p-3.5 sm:p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 shadow-xs hover:border-brand/30 dark:hover:border-teal-500/30 transition-all"
                >
                  <span className="text-xs font-bold text-brand dark:text-teal-400 font-mono">
                    {step.num}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 font-sans">
                    {step.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug font-sans font-light">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-Converting Consultation Card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden">
              {/* Subtle top brand gradient highlight */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-brand to-teal-400" />
              
              <div className="space-y-5">
                {/* Card Header */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                    Free Discovery Session
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white">
                    Schedule Your Consultation
                  </h3>
                </div>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                  Connect with our revenue cycle specialists to discuss your current challenges and discover tailored solutions that improve cash flow, reduce claim denials, and optimize your revenue cycle.
                </p>

                {/* Perks Checklist */}
                <div className="space-y-2 py-2 border-y border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complimentary RCM audit & denial analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customized pricing & implementation timeline</span>
                  </div>
                </div>

                {/* Primary CTA Button with continuous light sweep shine */}
                <div className="pt-1">
                  <Button
                    href="/contact"
                    size="lg"
                    shimmer={true}
                    className="w-full !py-3.5 shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30"
                  >
                    Schedule A Free Consultation
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </div>

                {/* Response Time Guarantee & Phone info */}
                <div className="space-y-2 pt-1 text-center">
                  <div className="inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans">
                    <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Typical response within 1 business hour • Monday–Friday</span>
                  </div>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                    Prefer immediate assistance?{" "}
                    <a
                      href="tel:+14694035472"
                      className="text-brand dark:text-teal-300 font-semibold hover:underline"
                    >
                      Call +1 (469) 403-5472
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
