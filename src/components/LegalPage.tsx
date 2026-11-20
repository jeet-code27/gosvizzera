"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AnimatedText } from "@/components/ui/animated-text";
import Footer from "@/components/Footer";

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type LegalHighlight = {
  label: string;
  value: string;
};

type LegalPageProps = {
  badge: string;
  title: string;
  intro: string;
  effectiveDate: string;
  lastUpdated: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
  currentHref: string;
};

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "HIPAA Statement", href: "/hipaa" },
  { name: "Security & BAA", href: "/security" },
];

export default function LegalPage({
  badge,
  title,
  intro,
  effectiveDate,
  lastUpdated,
  highlights,
  sections,
  currentHref,
}: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="min-h-screen bg-transparent flex flex-col">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[280px] bg-brand/10 dark:bg-teal-500/10 blur-3xl rounded-full" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-xs font-semibold tracking-wider uppercase font-sans shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            {badge}
          </motion.div>

          <div className="pt-1">
            <AnimatedText
              as="h1"
              text={title}
              duration={0.035}
              delay={0.04}
              underlineGradient="from-teal-400 via-brand to-emerald-400"
              underlineHeight="h-1 sm:h-1.5"
              underlineOffset="-bottom-2.5 sm:-bottom-3.5"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed"
          >
            {intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-sans"
          >
            <span>
              <span className="uppercase tracking-wider font-mono text-[10px] mr-1.5">Effective</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{effectiveDate}</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>
              <span className="uppercase tracking-wider font-mono text-[10px] mr-1.5">Last Updated</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{lastUpdated}</span>
            </span>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-sm p-4 text-left shadow-xs"
            >
              <span className="block text-[10px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                {h.label}
              </span>
              <span className="block mt-1 font-serif text-lg sm:text-xl text-brand dark:text-teal-300">
                {h.value}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Body */}
      <section className="relative pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-28 space-y-6">
              <nav
                aria-label="On this page"
                className="rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 shadow-xs"
              >
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-brand dark:text-teal-300 font-mono mb-3">
                  On This Page
                </h2>
                <ol className="space-y-1 text-sm font-sans">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`flex gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors ${
                          activeId === s.id
                            ? "bg-brand/5 dark:bg-teal-500/10 text-brand dark:text-teal-300 font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-teal-300"
                        }`}
                      >
                        <span className="font-mono text-[11px] pt-0.5 opacity-60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-brand dark:text-teal-300 font-mono mb-3">
                  Legal & Compliance
                </h2>
                <ul className="space-y-1 text-sm font-sans">
                  {legalLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={l.href === currentHref ? "page" : undefined}
                        className={`block px-2.5 py-1.5 rounded-lg transition-colors ${
                          l.href === currentHref
                            ? "bg-brand text-white dark:bg-teal-500 dark:text-slate-950 font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-teal-300"
                        }`}
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="rounded-3xl bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono text-xs text-teal-600 dark:text-teal-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white">
                      {s.title}
                    </h2>
                  </div>
                  <div className="legal-prose">{s.content}</div>
                </section>
              ))}
            </div>

            {/* Contact card */}
            <div className="mt-8 relative overflow-hidden rounded-3xl bg-brand dark:bg-slate-900 border border-brand dark:border-teal-500/20 p-6 sm:p-10 text-white">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-400/20 blur-3xl rounded-full pointer-events-none" />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl">Questions about this policy?</h2>
                  <p className="text-sm text-teal-50/80 font-sans font-light max-w-lg">
                    Our Privacy & Compliance Officer responds to policy, privacy and BAA requests within two business days.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:info@gosvizzera.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand font-semibold text-sm hover:bg-teal-50 transition-colors"
                  >
                    info@gosvizzera.com
                  </a>
                  <a
                    href="tel:+14694035472"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    +1 (469) 403-5472
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
