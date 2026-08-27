"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const INTRO_STYLE_ID = "faq1-animations";

export interface FAQItem {
  question: string;
  answer: string;
  meta?: string;
}

export const defaultInsuranceFaqs: FAQItem[] = [
  {
    question: "What information is included in your insurance verification service?",
    answer:
      "We verify active insurance coverage and confirm eligibility for scheduled services. Our team also verifies plan benefits, including copays, deductibles, coinsurance, out-of-pocket maximums, coverage limitations, and any prior authorization requirements when applicable.",
    meta: "Scope",
  },
  {
    question: "Can Svizzera work with our EHR, EMR, or Practice Management System?",
    answer:
      "Yes. Our verification specialists work directly within your existing EHR, EMR, or PM system (such as Epic, Cerner, Athenahealth, eClinicalWorks, Kareo, NextGen, and others) with zero disruption or costly software changes required.",
    meta: "Integration",
  },
  {
    question: "Do you support multiple medical specialties?",
    answer:
      "Yes, we support a comprehensive range of medical specialties — including Cardiology, Orthopedics, Gastroenterology, Oncology, Ambulatory Surgery Centers (ASC), Behavioral Health, and Primary Care, tailoring verification to specialty-specific billing rules.",
    meta: "Specialties",
  },
  {
    question: "Which insurance payers do you verify?",
    answer:
      "We verify all major national and regional payers across the United States, including Medicare, Medicare Advantage, Medicaid MCOs, Commercial carriers (UnitedHealthcare, Aetna, Cigna, Humana, BCBS), Tricare, and regional worker's comp plans.",
    meta: "Payers",
  },
  {
    question: "Can you handle high patient volumes?",
    answer:
      "Absolutely. Whether you have 20 or 2,000 scheduled visits a day, our scalable dedicated team operates across multiple shifts with strict 24–72 hour SLAs to ensure no patient goes unverified.",
    meta: "Capacity",
  },
  {
    question: "What benefit information do you verify?",
    answer:
      "We verify active policy status, co-pays, deductible amounts, deductible met year-to-date, co-insurance percentages, out-of-pocket maximums, covered vs. non-covered services, and network participation status.",
    meta: "Benefits",
  },
  {
    question: "Can you verify primary and secondary insurance coverage?",
    answer:
      "Yes. We perform thorough Coordination of Benefits (COB) checks to verify primary, secondary, and tertiary payer order, ensuring crossover claims process cleanly without denials.",
    meta: "COB",
  },
  {
    question: "What information is required to complete an insurance verification?",
    answer:
      "We typically require the patient's full name, date of birth, insurance payer name, policy ID number, group number, subscriber details (if different), and scheduled procedure/appointment date.",
    meta: "Requirements",
  },
  {
    question: "How do you help reduce eligibility-related claim denials?",
    answer:
      "By systematically confirming coverage 72 hours in advance and performing real-time EDI 270/271 checks, we catch inactive policies, missing authorizations, and out-of-network surprises before the patient arrives, reducing front-end denials by over 90%.",
    meta: "Denials",
  },
  {
    question: "How quickly can Svizzera begin providing insurance verification services?",
    answer:
      "We can typically onboard and begin verifying appointments for your practice within 3 to 5 business days following BAA execution and credential setup.",
    meta: "Onboarding",
  },
];

interface FAQProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  items?: FAQItem[];
}

export function FAQSection({
  badge = "FAQ",
  title = "Frequently Asked",
  highlightedTitle = "Questions",
  description = "Answers to the most common questions healthcare organizations ask before partnering with Svizzera.",
  items = defaultInsuranceFaqs,
}: FAQProps) {
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq1-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes faq1-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes faq1-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes faq1-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes faq1-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .faq1-intro {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.65rem 1.25rem;
        border-radius: 9999px;
        overflow: hidden;
        border: 1px solid rgba(13, 148, 136, 0.25);
        background: rgba(4, 71, 78, 0.08);
        color: #0d9488;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: 0.7rem;
        font-weight: 600;
        width: 100%;
        max-width: 22rem;
        margin: 0 auto;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(8px);
        transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
      }
      .dark .faq1-intro {
        border-color: rgba(45, 212, 191, 0.3);
        background: rgba(4, 71, 78, 0.2);
        color: #5eead4;
      }
      .faq1-intro--active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      .faq1-intro__beam,
      .faq1-intro__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      .faq1-intro__beam {
        background: conic-gradient(from 160deg, rgba(13, 148, 136, 0.35), transparent 32%, rgba(20, 184, 166, 0.3) 58%, transparent 78%, rgba(13, 148, 136, 0.25));
        animation: faq1-beam-spin 18s linear infinite;
        opacity: 0.65;
      }
      .faq1-intro__pulse {
        border: 1px solid currentColor;
        opacity: 0.25;
        animation: faq1-pulse 3.4s ease-out infinite;
      }
      .faq1-intro__label {
        position: relative;
        z-index: 1;
        font-weight: 700;
        letter-spacing: 0.28em;
      }
      .faq1-intro__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1.5px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        transform-origin: left;
        animation: faq1-meter 5.8s ease-in-out infinite;
        opacity: 0.75;
      }
      .faq1-intro__tick {
        position: relative;
        z-index: 1;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.2);
        animation: faq1-tick 3.2s ease-in-out infinite;
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIntroReady(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleQuestion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent transition-colors duration-300">
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12 px-4 sm:px-6 py-16 sm:py-24 lg:max-w-5xl">
        {/* Animated Signal Pill */}
        <div className={`faq1-intro ${introReady ? "faq1-intro--active" : ""}`}>
          <span className="faq1-intro__beam" aria-hidden="true" />
          <span className="faq1-intro__pulse" aria-hidden="true" />
          <span className="faq1-intro__label">{badge}</span>
          <span className="faq1-intro__meter" aria-hidden="true" />
          <span className="faq1-intro__tick" aria-hidden="true" />
        </div>

        {/* Section Header */}
        <header className="text-center space-y-3.5 sm:space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {title}{" "}
            <span className="italic text-brand dark:text-teal-400 font-medium">
              {highlightedTitle}
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        {/* FAQ Accordion List */}
        <ul className="space-y-3.5 sm:space-y-4">
          {items.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-md hover:shadow-xl dark:shadow-black/40 transition-all duration-300 hover:-translate-y-0.5"
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                {/* Dynamic Mouse Glow Overlay */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(13, 148, 136, 0.12), transparent 70%)",
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-4 sm:gap-6 px-6 sm:px-8 py-5 sm:py-6 text-left transition-colors duration-200 focus-visible:outline-hidden"
                >
                  {/* Plus / Rotate Icon */}
                  <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-teal-200/80 dark:border-teal-800/60 bg-teal-50/60 dark:bg-teal-950/40 text-brand dark:text-teal-300 transition-all duration-300 group-hover:scale-105 group-hover:bg-teal-100/70 dark:group-hover:bg-teal-900/60 mt-0.5">
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border border-teal-400/40 ${
                        open ? "animate-ping opacity-30" : "opacity-0"
                      }`}
                    />
                    <svg
                      className={`relative h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 stroke-[2] ${
                        open ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5v14"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 12h14"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  {/* Question & Answer Content */}
                  <div className="flex flex-1 flex-col gap-2.5 sm:gap-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 justify-between">
                      <h3 className="text-base sm:text-lg font-semibold font-sans leading-snug text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-teal-300 transition-colors">
                        {item.question}
                      </h3>
                      {item.meta && (
                        <span className="inline-flex w-fit items-center rounded-full border border-teal-200/70 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/40 text-brand dark:text-teal-300 px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest sm:flex-shrink-0">
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-xs sm:text-sm font-sans font-light leading-relaxed text-slate-600 dark:text-slate-300 transition-[max-height] duration-300 ease-out ${
                        open ? "max-h-96 opacity-100 pt-1" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="pr-2">{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FAQSection;
