"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import Button from "@/components/ui/Button";
import ShieldCheckIcon from "@/components/icons/ShieldCheckIcon";
import ZapIcon from "@/components/icons/ZapIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import BadgeCheckIcon from "@/components/icons/BadgeCheckIcon";
import type { AnimatedIconHandle } from "@/components/icons/types";

export default function Hero() {
  const shieldRef = useRef<AnimatedIconHandle>(null);
  const zapRef = useRef<AnimatedIconHandle>(null);
  const usersRef = useRef<AnimatedIconHandle>(null);
  const badgeRef = useRef<AnimatedIconHandle>(null);

  const valueProps = [
    {
      id: "hipaa",
      title: "HIPAA Focused",
      subtitle: "Secure Healthcare Operations",
      ref: shieldRef,
      icon: (
        <ShieldCheckIcon
          ref={shieldRef}
          size={22}
          className="text-brand dark:text-teal-300 group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors"
        />
      ),
      accentBg: "bg-teal-50 dark:bg-teal-950/40 group-hover:bg-brand/10 dark:group-hover:bg-teal-900/30",
      glowBorder: "hover:border-teal-500/30 dark:hover:border-teal-500/40",
    },
    {
      id: "turnaround",
      title: "Fast Turnaround",
      subtitle: "Efficient & Reliable Delivery",
      ref: zapRef,
      icon: (
        <ZapIcon
          ref={zapRef}
          size={22}
          className="text-brand dark:text-teal-300 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors"
        />
      ),
      accentBg: "bg-amber-50 dark:bg-amber-950/30 group-hover:bg-amber-100/50 dark:group-hover:bg-amber-900/30",
      glowBorder: "hover:border-amber-500/30 dark:hover:border-amber-500/40",
    },
    {
      id: "team",
      title: "Experienced Team",
      subtitle: "Dedicated Healthcare Experts",
      ref: usersRef,
      icon: (
        <UsersIcon
          ref={usersRef}
          size={22}
          className="text-brand dark:text-teal-300 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors"
        />
      ),
      accentBg: "bg-sky-50 dark:bg-sky-950/30 group-hover:bg-sky-100/50 dark:group-hover:bg-sky-900/30",
      glowBorder: "hover:border-sky-500/30 dark:hover:border-sky-500/40",
    },
    {
      id: "quality",
      title: "Quality Driven",
      subtitle: "Accuracy & Compliance First",
      ref: badgeRef,
      icon: (
        <BadgeCheckIcon
          ref={badgeRef}
          size={22}
          className="text-brand dark:text-teal-300 group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors"
        />
      ),
      accentBg: "bg-emerald-50 dark:bg-emerald-950/30 group-hover:bg-emerald-100/50 dark:group-hover:bg-emerald-900/30",
      glowBorder: "hover:border-teal-500/30 dark:hover:border-teal-500/40",
    },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden bg-transparent">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-teal-100/50 via-brand/5 to-transparent dark:from-teal-900/20 dark:via-teal-950/20 blur-3xl rounded-full" />
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-brand/5 dark:bg-teal-800/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content Box with subtle staggered motion entry */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 shadow-xs"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-600 dark:bg-teal-400" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide font-sans uppercase">
              Trusted Healthcare Outsourcing Partner
            </span>
          </motion.div>

          {/* Subtitle tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-sans"
          >
            Healthcare Outsourcing Services
          </motion.div>

          {/* Main Animated Headline */}
          <div className="pt-1">
            <AnimatedText
              text={"Precision in RCM.\nExcellence in Results."}
              duration={0.03}
              delay={0.035}
              textClassName="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight leading-[1.18]"
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          {/* Body Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
            className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed pt-1"
          >
            <strong className="text-slate-900 dark:text-white font-medium">Svizzera Healthcare Solutions</strong> empowers physician practices, specialty clinics, and healthcare organizations with reliable outsourcing services, including prior authorization, medical coding, insurance verification, charge entry, and revenue cycle management, so providers can focus on delivering exceptional patient care.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
            className="pt-2 flex flex-row items-center justify-center gap-3"
          >
            <Button
              href="/contact"
              size="md"
              className="shadow-sm hover:shadow-md"
            >
              Book a Strategy Call
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <Button
              href="/services"
              variant="outline"
              size="md"
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-brand dark:hover:border-teal-400 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Explore Services
            </Button>
          </motion.div>
        </div>

        {/* 4 Pillars / Value Propositions Grid with subtle on-scroll stagger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mt-8 sm:mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {valueProps.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 + index * 0.06 }}
                onMouseEnter={() => item.ref.current?.startAnimation()}
                onMouseLeave={() => item.ref.current?.stopAnimation()}
                className={`group relative p-4 rounded-xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 ${item.glowBorder}`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Animated itshover Icon */}
                  <div
                    className={`p-2.5 rounded-lg ${item.accentBg} transition-colors duration-200 flex-shrink-0 flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors font-sans truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-sans font-normal leading-snug truncate sm:whitespace-normal">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
