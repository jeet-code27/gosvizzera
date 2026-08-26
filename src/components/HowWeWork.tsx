"use client";

import { motion } from "motion/react";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

const onboardingSteps: Step[] = [
  {
    title: "Discovery Call",
    description:
      "A focused 30-minute consultation with our healthcare operations specialists. We map your goals, surface your current challenges, and identify the fastest path to impact.",
    image: "/images/step1.png",
    colorTheme: "teal",
  },
  {
    title: "Workflow Assessment",
    description:
      "Our operations team evaluates your existing workflows, uncovers bottlenecks, and benchmarks your overall revenue cycle performance to build a clear picture before we act.",
    image: "/images/step2.png",
    colorTheme: "sky",
  },
  {
    title: "Team Alignment",
    description:
      "A dedicated account manager and service team are assigned to your practice. We align on workflows, tools, and communication preferences so everyone starts on the same page.",
    image: "/images/step3.jpeg",
    colorTheme: "emerald",
  },
  {
    title: "Implementation",
    description:
      "Services launch through a structured onboarding process with clear milestones, seamless knowledge transfer, and minimal disruption to your staff and daily operations.",
    image: "/images/step4.png",
    colorTheme: "amber",
  },
  {
    title: "Ongoing Support & Optimization",
    description:
      "Regular performance reviews, transparent reporting, and continuous process improvements help maximize results while ensuring your revenue cycle operations scale effectively.",
    image: "/images/step5.jpeg",
    colorTheme: "indigo",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent transition-colors duration-300">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/5 dark:bg-teal-400/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with requested content and Bodoni / Lato typography */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans"
          >
            How We Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            From First Call to{" "}
            <span className="italic text-brand dark:text-teal-400">Fully Operational in Days</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
          >
            Our proven onboarding process gets your practice running with full RCM operational support in days, not weeks. No disruption. No surprises. No renegotiation mid-process.
          </motion.p>
        </div>

        {/* Dynamic Pinned Step Cards with Animated Flow Curve */}
        <HowItWorks features={onboardingSteps} />
      </div>
    </section>
  );
}
