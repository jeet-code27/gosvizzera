"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "prior-auth",
    question: "What is prior authorization and why is it required?",
    answer:
      "Prior authorization (PA) is a requirement from insurance payers that providers must obtain approval before delivering specific services, procedures, or medications. Without an approved PA, claims are often denied — making timely and accurate authorization a critical part of the revenue cycle.",
  },
  {
    id: "retro-auth",
    question: "What is retro authorization and when is it used in medical billing?",
    answer:
      "Retro authorization is sought after a service has already been rendered — typically in emergency situations or when prior auth was missed. Our team manages retro auth requests with thorough clinical documentation to minimize claim denials.",
  },
  {
    id: "hipaa-compliance",
    question: "Is outsourcing healthcare RCM operations HIPAA compliant?",
    answer:
      "Yes. Svizzera operates as a Business Associate under HIPAA and signs a Business Associate Agreement (BAA) with every client. Our teams follow strict data handling, access control, and security protocols to ensure full compliance across all RCM functions.",
  },
  {
    id: "coding-systems",
    question: "What medical coding systems does Svizzera Healthcare Solutions use?",
    answer:
      "Our certified coders work with ICD-10-CM/PCS, CPT, HCPCS Level II, and specialty-specific coding frameworks. We stay current with annual code updates and payer-specific guidelines to ensure maximum accuracy and reimbursement.",
  },
  {
    id: "vma-services",
    question: "What does a virtual medical assistant do for a practice?",
    answer:
      "A Virtual Medical Assistant (VMA) handles administrative tasks remotely — scheduling, insurance verification, patient follow-ups, prior authorization tracking, EHR data entry, and more. VMAs reduce front-desk burden and allow clinical staff to focus entirely on patient care.",
  },
  {
    id: "onboarding-timeline",
    question: "How long does onboarding take with Svizzera Healthcare Solutions?",
    answer:
      "Most practices are fully operational within 3–7 business days. Our structured onboarding covers workflow assessment, team alignment, system integration, and a go-live readiness check — all designed to minimize disruption to your existing operations.",
  },
  {
    id: "specialties-supported",
    question: "Which specialties does Svizzera support?",
    answer:
      "We support Cardiology, Primary Care, Orthopedics, Neurology, Gastroenterology, Behavioral Health, Urgent Care, and Multi-Specialty practices. Each team is trained in specialty-specific coding rules, payer nuances, and authorization requirements.",
  },
  {
    id: "ehr-integration",
    question: "Can Svizzera work with our existing EHR and billing systems?",
    answer:
      "Yes. Our teams are experienced with Epic, Athenahealth, eClinicalWorks, Kareo, DrChrono, AdvancedMD, and more. We adapt to your existing systems rather than requiring you to change platforms — ensuring a seamless transition.",
  },
];

const monthlyTrend = [
  { month: "M1", rate: "91.4%", height: "65%" },
  { month: "M2", rate: "92.8%", height: "72%" },
  { month: "M3", rate: "93.9%", height: "78%" },
  { month: "M4", rate: "94.7%", height: "84%" },
  { month: "M5", rate: "95.5%", height: "90%" },
  { month: "M6", rate: "96.2%", height: "98%", active: true },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("prior-auth");
  const [inView, setInView] = useState(false);
  const [claimsRate, setClaimsRate] = useState(0);
  const [turnaroundHours, setTurnaroundHours] = useState(0);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !inView) {
          setInView(true);

          let start: number | null = null;
          const duration = 1600;

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setClaimsRate(Number((98.7 * ease).toFixed(1)));
            setTurnaroundHours(Math.round(24 * ease));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setClaimsRate(98.7);
              setTurnaroundHours(24);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <section id="faq" className="relative py-14 sm:py-18 lg:py-24 bg-transparent transition-colors duration-300">
      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-400/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Heading & Sticky Modern Telemetry Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-3.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans">
                Frequently Asked Questions
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Everything You Need to{" "}
                <span className="italic text-brand dark:text-teal-400 font-medium">Know</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                Everything healthcare practices need to know before partnering with Svizzera Healthcare Solutions.
              </p>
            </motion.div>

            {/* Redesigned Next-Gen Telemetry & SLA Card */}
            <motion.div
              ref={metricsRef}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xl dark:shadow-2xl dark:shadow-black/50 space-y-5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                    Performance Telemetry
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 text-[10px] font-bold uppercase font-mono">
                  Live SLA
                </span>
              </div>

              {/* 2 Primary Highlight KPI Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* KPI 1: Claims Accuracy */}
                <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      First-Pass Clean Rate
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>+4.2%</span>
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                      {claimsRate}
                    </span>
                    <span className="text-base font-bold text-brand dark:text-teal-400">%</span>
                  </div>
                  {/* Progress Glow Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-brand transition-all duration-1000 ease-out"
                      style={{ width: inView ? "98.7%" : "0%" }}
                    />
                  </div>
                </div>

                {/* KPI 2: Auth Velocity */}
                <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-sans">
                      Prior Auth Turnaround
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-300 font-mono bg-teal-500/10 px-1.5 py-0.5 rounded">
                      <svg className="w-2.5 h-2.5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      <span>Fast-Track</span>
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                      &lt;{turnaroundHours}
                    </span>
                    <span className="text-base font-bold text-brand dark:text-teal-400">Hours</span>
                  </div>
                  {/* Progress Glow Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-1000 ease-out"
                      style={{ width: inView ? "88%" : "0%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Redesigned Modern 6-Month Collection Velocity Pillar Wave */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                      Collection Acceleration Trend
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                      6-Month practice performance benchmark
                    </p>
                  </div>
                  <span className="text-xs font-bold text-brand dark:text-teal-300 font-mono px-2 py-0.5 rounded-md bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20">
                    96.2% Peak
                  </span>
                </div>

                {/* Interactive 6-Month Visualizer Pillars */}
                <div className="pt-2 flex items-end justify-between gap-2 h-24">
                  {monthlyTrend.map((m, idx) => {
                    const isHovered = hoveredMonth === idx;
                    const isActiveMonth = m.active;

                    return (
                      <div
                        key={m.month}
                        onMouseEnter={() => setHoveredMonth(idx)}
                        onMouseLeave={() => setHoveredMonth(null)}
                        className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                      >
                        {/* Hover Tooltip */}
                        <div
                          className={`text-[9px] font-mono font-bold transition-all duration-200 px-1 py-0.5 rounded ${
                            isHovered || isActiveMonth
                              ? "text-brand dark:text-teal-300 opacity-100 translate-y-0"
                              : "text-slate-400 dark:text-slate-500 opacity-70"
                          }`}
                        >
                          {m.rate}
                        </div>

                        {/* Pillar Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700/80 rounded-t-md overflow-hidden h-14 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: inView ? m.height : 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * idx }}
                            className={`w-full rounded-t-md transition-all duration-300 ${
                              isActiveMonth
                                ? "bg-gradient-to-t from-brand via-teal-500 to-emerald-400 shadow-sm shadow-teal-500/30"
                                : "bg-gradient-to-t from-slate-300 to-slate-400 dark:from-slate-700 dark:to-teal-800/80 group-hover:from-teal-600 group-hover:to-teal-400"
                            }`}
                          />
                        </div>

                        {/* Month Tag */}
                        <span
                          className={`text-[10px] font-mono font-semibold transition-colors ${
                            isActiveMonth
                              ? "text-brand dark:text-teal-400 font-bold"
                              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                          }`}
                        >
                          {m.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Trust Seal Pills */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <span>HIPAA Certified</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <svg className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                  <span>BAA Executed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white dark:bg-slate-900 border-teal-400/80 dark:border-teal-500/50 shadow-md shadow-brand/5 dark:shadow-black/40"
                      : "bg-white/90 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-teal-300/60 dark:hover:border-teal-700/60 shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold font-sans transition-colors duration-200 ${
                        isOpen
                          ? "text-brand dark:text-teal-300"
                          : "text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300"
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Animated +/- circle toggle */}
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-brand text-white rotate-45"
                          : "bg-teal-50 dark:bg-slate-800 text-brand dark:text-teal-300 group-hover:bg-brand/10"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="pl-3.5 border-l-2 border-teal-500/70 dark:border-teal-400/70">
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
