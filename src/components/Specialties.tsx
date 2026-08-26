"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";

interface Specialty {
  id: string;
  label: string;
  title: string;
  highlight: string;
  desc: string;
  features: string[];
  icon: (active: boolean) => React.ReactNode;
}

const specialtiesData: Specialty[] = [
  {
    id: "cardiology",
    label: "Cardiology",
    title: "Cardiac Care",
    highlight: "Billing Mastered",
    desc: "Our certified coders handle complex cardiac procedure coding, diagnostic imaging authorizations, and cardiology-specific payer requirements with precision.",
    features: [
      "Complex cardiac procedure coding (CPT 93000–93799)",
      "Diagnostic imaging prior authorization",
      "Cardiology payer-specific denial management",
      "Remote cardiac monitoring billing support",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: "primary",
    label: "Primary Care",
    title: "Primary Care",
    highlight: "Revenue Optimized",
    desc: "High-volume practice management with expert E&M coding, preventive care billing, and seamless chronic disease management workflows built for busy practices.",
    features: [
      "E&M level selection and documentation review",
      "Preventive care & wellness billing (G-codes)",
      "Chronic care management (CCM) billing",
      "High-volume encounter processing",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "infusion",
    label: "Infusion",
    title: "Oncology Infusion",
    highlight: "Authorization & Billing",
    desc: "Full-cycle prior authorization and billing support for chemotherapy, immunotherapy, biologics, and specialty infusion drugs — so oncology patients never miss a treatment date due to payer delays.",
    features: [
      "Chemotherapy & immunotherapy J-code billing",
      "Prior authorization for infusion drugs across all major payers",
      "IVIG, monoclonal antibody, and biologic PA management",
      "Denial management, appeals, and peer-to-peer escalation support",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "woundcare",
    label: "Wound Care",
    title: "Wound Care",
    highlight: "Billing Precision",
    desc: "Specialized wound care coding, debridement procedure authorizations, skin substitute billing, and negative pressure therapy workflows handled by experienced wound care billers.",
    features: [
      "Debridement and wound care CPT coding (97597–97610)",
      "Skin substitute and graft billing (Q-codes, C-codes)",
      "Negative pressure wound therapy (NPWT) authorization",
      "Chronic wound documentation and E&M support",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    id: "gastro",
    label: "Gastroenterology",
    title: "GI Billing",
    highlight: "Done Right",
    desc: "Endoscopy authorizations, GI coding guidelines, colonoscopy billing, and encounter processing workflows built specifically for gastroenterology practices.",
    features: [
      "Endoscopy and colonoscopy prior auth",
      "GI procedure CPT coding expertise",
      "Infusion therapy billing support",
      "Encounter processing and claim scrubbing",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Health",
    title: "Behavioral Health",
    highlight: "Billing Support",
    desc: "Mental health authorizations, therapy CPT coding, ABA billing, and session management for behavioral health and psychiatric practices of all sizes.",
    features: [
      "Mental health prior authorization",
      "Therapy session CPT coding (90xxx)",
      "ABA therapy billing and documentation",
      "Parity compliance and appeal support",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "urgent",
    label: "Urgent Care",
    title: "Urgent Care",
    highlight: "High-Throughput",
    desc: "Walk-in scheduling support, rapid prior authorizations, and high-throughput encounter processing designed for the fast-paced urgent care environment.",
    features: [
      "Walk-in scheduling and registration support",
      "Rapid 24hr authorization turnaround",
      "High-volume claim submission and scrubbing",
      "Split/shared visit billing",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "multi",
    label: "Multi-Specialty",
    title: "Multi-Specialty",
    highlight: "Central Command",
    desc: "Cross-specialty RCM workflows, centralized billing operations, and scalable support infrastructure for groups and health systems managing multiple departments.",
    features: [
      "Cross-specialty workflow coordination",
      "Centralized billing and reporting",
      "Scalable staffing model for growth",
      "Unified denial management across specialties",
    ],
    icon: (active) => (
      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

// Orbital coordinates generator around 480x480 SVG canvas with safe proportional radius
const CX = 240;
const CY = 240;
const RADIUS = 156;

function getOrbitalCoords(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CX + RADIUS * Math.cos(angle),
    y: CY + RADIUS * Math.sin(angle),
  };
}

export default function Specialties() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle every 4s unless user manually clicks
  useEffect(() => {
    if (userInteracted) {
      const resumeTimeout = setTimeout(() => {
        setUserInteracted(false);
      }, 7000);
      return () => clearTimeout(resumeTimeout);
    }

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % specialtiesData.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userInteracted]);

  const handleSelect = (idx: number) => {
    setUserInteracted(true);
    setActiveIdx(idx);
  };

  const activeSpecialty = specialtiesData[activeIdx];

  return (
    <section id="specialties" className="relative py-12 sm:py-16 lg:py-24 bg-transparent transition-colors duration-300 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-400/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Clinical Specialties
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Expertise Across the <br className="hidden sm:inline" />
            <span className="italic text-brand dark:text-teal-400">Entire Clinical Spectrum</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
          >
            Our teams are trained in specialty-specific coding guidelines, authorization criteria, and payer nuances so you never need to re-educate a support partner on your specialty.
          </motion.p>
        </div>

        {/* Main Stage: Responsive Orbital Radar (Visible on Mobile & Desktop) + Specialty Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Orbital Radar (Adaptive scaling on mobile and desktop) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[460px] aspect-square select-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 480 480">
                {/* Outer Orbit Track */}
                <circle cx={CX} cy={CY} r={RADIUS} className="stroke-slate-200 dark:stroke-slate-800 fill-none" strokeWidth="1.5" strokeDasharray="5 5" />

                {/* Inner Orbit Track */}
                <circle cx={CX} cy={CY} r={105} className="stroke-teal-500/20 dark:stroke-teal-400/10 fill-none" strokeWidth="1" strokeDasharray="2 4" />

                {/* Rotating Animated Comet Ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={RADIUS}
                  className="stroke-teal-500/50 dark:stroke-teal-400/50 fill-none animate-[spin_24s_linear_infinite]"
                  strokeWidth="2"
                  strokeDasharray="14 160"
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />

                {/* Connector Lines to each node */}
                {specialtiesData.map((_, idx) => {
                  const pos = getOrbitalCoords(idx, specialtiesData.length);
                  const isActive = activeIdx === idx;
                  return (
                    <line
                      key={`conn-${idx}`}
                      x1={CX}
                      y1={CY}
                      x2={pos.x}
                      y2={pos.y}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "stroke-teal-500 dark:stroke-teal-400 stroke-2 opacity-100"
                          : "stroke-slate-200 dark:stroke-slate-800 stroke-1 stroke-dasharray-[2,4] opacity-40"
                      }`}
                    />
                  );
                })}

                {/* Pulsing Central Hub Radar Waves */}
                <circle cx={CX} cy={CY} r={64} className="fill-teal-500/10 dark:fill-teal-400/5 animate-pulse" />
                <circle cx={CX} cy={CY} r={50} className="fill-brand stroke-2 stroke-teal-300/40 shadow-xl" />
              </svg>

              {/* Centered HTML Monogram / Logo Hub (100% pixel-perfect centering on both mobile & desktop) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center text-center pointer-events-none z-10">
                {/* Official Svizzera Emblem Icon */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white/15 flex items-center justify-center mb-0.5 sm:mb-1 text-white shadow-xs">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-extrabold uppercase tracking-widest text-white leading-tight font-sans">
                  SVIZZERA
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] lg:text-[8px] font-bold uppercase tracking-wider text-teal-300 leading-tight font-mono">
                  RCM CORE
                </span>
              </div>

              {/* Interactive DOM Orbit Nodes (Proportionally scaled for mobile & desktop) */}
              {specialtiesData.map((item, idx) => {
                const pos = getOrbitalCoords(idx, specialtiesData.length);
                const isActive = activeIdx === idx;
                const topPct = (pos.y / 480) * 100;
                const leftPct = (pos.x / 480) * 100;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none transition-all duration-300 ${
                      isActive ? "scale-110 z-30" : "scale-95 hover:scale-105 z-20"
                    }`}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                  >
                    {/* Circle Node Icon */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-brand text-white shadow-brand/40 ring-3 sm:ring-4 ring-teal-400/30 scale-105"
                          : "bg-white dark:bg-slate-900 text-brand dark:text-teal-300 border border-slate-200 dark:border-slate-800 hover:border-brand"
                      }`}
                    >
                      {item.icon(isActive)}
                    </div>

                    {/* Node Label underneath */}
                    <span
                      className={`mt-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[7.5px] sm:text-[8.5px] lg:text-[9.5px] font-bold tracking-wide font-sans uppercase whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? "bg-brand text-white font-extrabold shadow-xs"
                          : "text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Specialty Detail Card (Seamless & Fully Responsive) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 lg:p-9 shadow-xl dark:shadow-2xl dark:shadow-black/50 overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-brand to-emerald-400" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecialty.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Specialty Phase Pill */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-300 text-[11px] sm:text-xs font-bold font-sans uppercase tracking-wider border border-teal-200/60 dark:border-teal-800/60">
                      — {activeSpecialty.label}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono">
                      Specialty 0{activeIdx + 1} / 08
                    </span>
                  </div>

                  {/* Title in Bodoni Moda */}
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-white leading-[1.2]">
                    {activeSpecialty.title}{" "}
                    <span className="italic text-brand dark:text-teal-400 font-medium">
                      {activeSpecialty.highlight}
                    </span>
                  </h3>

                  {/* Description in Lato */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed">
                    {activeSpecialty.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-sans">
                      Specialty Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {activeSpecialty.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                        >
                          <div className="w-4 h-4 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 font-sans leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Navigation Dots & Consultation Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3.5">
                <div className="flex items-center gap-1.5">
                  {specialtiesData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      aria-label={`Select specialty ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIdx === idx
                          ? "w-6 bg-brand dark:bg-teal-400"
                          : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <Button href="/contact" size="sm" className="w-full sm:w-auto">
                  Consult with {activeSpecialty.label} Specialists &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
