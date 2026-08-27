"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import Button from "@/components/ui/Button";

export default function BlogHero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 bg-transparent text-center">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          Industry Knowledge & Insights
        </motion.div>

        {/* AnimatedText Headline with Responsive Line Breaks */}
        <div className="pt-2">
          {/* Mobile view (3 lines) */}
          <div className="block sm:hidden">
            <AnimatedText
              text={"Healthcare Insights\n& Expert\nPerspectives"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1"
              underlineOffset="-bottom-2"
            />
          </div>

          {/* Desktop & Tablet view (2 lines) */}
          <div className="hidden sm:block">
            <AnimatedText
              text={"Healthcare Insights\n& Expert Perspectives"}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto"
        >
          Practical strategies, regulatory updates, and benchmark analyses to help healthcare leaders optimize clinical cash flow and eliminate preventable denials.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button href="/contact" size="md" shimmer={true}>
            Schedule Free Consultation &rarr;
          </Button>
          <Button href="/#services" variant="outline" size="md">
            Explore Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
