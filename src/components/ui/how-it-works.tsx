"use client";

import React from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "motion/react";

export interface Step {
  title: string;
  description: string;
  image?: string;
  colorTheme?: "teal" | "sky" | "emerald" | "amber" | "indigo";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

interface CardProps {
  number: string;
  title: string;
  description: string;
  image?: string;
  colorTheme?: "teal" | "sky" | "emerald" | "amber" | "indigo";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  image,
  colorTheme = "teal",
  className = "",
  rotate = "",
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    teal: "bg-teal-50/80 dark:bg-teal-950/30",
    sky: "bg-sky-50/80 dark:bg-sky-950/30",
    emerald: "bg-emerald-50/80 dark:bg-emerald-950/30",
    amber: "bg-amber-50/80 dark:bg-amber-950/30",
    indigo: "bg-indigo-50/80 dark:bg-indigo-950/30",
  };
  const defaultTextColors = {
    teal: "text-[#04474E] dark:text-teal-300",
    sky: "text-sky-600 dark:text-sky-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
  };
  const defaultBorderColors = {
    teal: "border-teal-200/80 dark:border-teal-800/50",
    sky: "border-sky-200/80 dark:border-sky-800/50",
    emerald: "border-emerald-200/80 dark:border-emerald-800/50",
    amber: "border-amber-200/80 dark:border-amber-800/50",
    indigo: "border-indigo-200/80 dark:border-indigo-800/50",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      className={`relative w-full md:w-[300px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-[24px] shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-800">
        <Pin className={`w-7 h-7 ${textColor} z-20 mb-2 mx-auto drop-shadow-xs`} />
        
        <div
          className={`${bgColor} border ${borderColor} rounded-[18px] p-4 h-full flex flex-col relative overflow-hidden`}
        >
          {/* Top Row: Step Number & Title */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className={`${textColor} text-xl font-bold font-mono tracking-tight`}>
              {number}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
              Phase {number}
            </span>
          </div>

          {/* Step Image */}
          {image && (
            <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 border border-slate-200/60 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Step Details */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans leading-tight mb-1.5">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-light leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[12%]", rotate: "rotate-3" },
  {
    className: "md:absolute md:top-[160px] md:right-[12%]",
    rotate: "-rotate-3",
  },
  { className: "md:absolute md:top-[520px] md:left-[12%]", rotate: "rotate-2" },
  {
    className: "md:absolute md:top-[680px] md:right-[10%]",
    rotate: "-rotate-2",
  },
  { className: "md:absolute md:top-[1040px] md:left-[14%]", rotate: "rotate-3" },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
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

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1380;
  if (data.length === 1) height = 450;
  else if (data.length === 2) height = 650;
  else if (data.length === 3) height = 980;
  else if (data.length === 4) height = 1180;
  else height = 1380;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative px-4 sm:px-8 max-md:py-8 md:py-16 bg-transparent ${className}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1050px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1050 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 320 180 C 540 180, 580 320, 740 320"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 880 320, 520 420, 320 540"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 320 700, 560 820, 770 820"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 980 820, 540 940, 330 1060"; // 4 -> 5
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-teal-400/40 dark:text-teal-400/30"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140,
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  image={step.image}
                  colorTheme={step.colorTheme || "teal"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
