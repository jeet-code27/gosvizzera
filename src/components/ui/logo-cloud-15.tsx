"use client";

import { useAnimationFrame } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/ui/logo-cloud-15-utils/marquee";
import { BorderBeam } from "@/components/ui/logo-cloud-15-utils/border-beam";

const BEAM_DURATION = 8; // must match BorderBeam duration prop
const BEAM_SIZE = 220; // must match BorderBeam size prop

const payersList = [
  "Regional Carriers",
  "UnitedHealthcare",
  "Aetna",
  "Cigna",
  "Humana",
  "BCBS Plans",
  "Medicare Advantage",
  "Medicaid MCO",
  "Molina",
  "Centene / WellCare",
  "Tricare",
  "Regional Carriers",
];

export const LogoCloud = ({
  title = "MAJOR PAYERS WE SUBMIT TO",
  items = payersList,
}: {
  title?: string;
  items?: string[];
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const waveSpanRef = useRef<HTMLSpanElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (!(cardRef.current && textRef.current && waveSpanRef.current)) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    // Beam progress: 0–100 along the perimeter, linear
    const elapsed = ((time - startTimeRef.current) / 1000) % BEAM_DURATION;
    const beamOffset = (elapsed / BEAM_DURATION) * 100;

    // Direct synchronous frame-lock on the beam position
    if (beamRef.current) {
      beamRef.current.style.offsetDistance = `${beamOffset}%`;
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const W = cardRect.width;
    const H = cardRect.height;
    const perimeter = 2 * (W + H);

    // Text horizontal bounds on the top edge, relative to card left
    const textLeft = Math.max(0, textRect.left - cardRect.left);
    const textRight = Math.min(W, textRect.right - cardRect.left);

    // Convert pixel positions to perimeter percentages
    const textStartPercent = (textLeft / perimeter) * 100;
    const textEndPercent = (textRight / perimeter) * 100;

    const span = waveSpanRef.current;

    if (beamOffset >= textStartPercent && beamOffset <= textEndPercent) {
      // Beam is directly behind the text — sweep the gradient in perfect sync
      const t =
        (beamOffset - textStartPercent) / (textEndPercent - textStartPercent);
      span.style.backgroundPosition = `${95 - t * 90}% center`;
    } else if (beamOffset < textStartPercent) {
      span.style.backgroundPosition = "0% center";
    } else {
      span.style.backgroundPosition = "100% center";
    }
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
      {/* Outer Card */}
      <div
        className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs shadow-xl dark:shadow-2xl dark:shadow-black/50"
        ref={cardRef}
      >
        <BorderBeam
          ref={beamRef}
          className="isolate -z-1"
          duration={BEAM_DURATION}
          size={BEAM_SIZE}
          borderWidth={3.5}
          colorFrom="#ffaa40"
          colorTo="#9c40ff"
        />

        {/* Top Floating Badge with Synchronized Wave Highlight */}
        <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center px-4 sm:px-10 z-30 pointer-events-none">
          <p
            className="bg-background px-5 sm:px-7 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-center font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-800 dark:text-slate-100 shadow-md pointer-events-auto select-none"
            ref={textRef}
          >
            <span
              ref={waveSpanRef}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, currentColor 0%, currentColor 45%, #ffaa40 47%, #9c40ff 50%, #ffaa40 53%, currentColor 55%, currentColor 100%)",
                backgroundSize: "250% 100%",
                backgroundRepeat: "no-repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundPosition: "0% center",
              }}
            >
              {title}
            </span>
          </p>
        </div>

        {/* Inner Marquee Container */}
        <div className="rounded-3xl overflow-hidden py-10 sm:py-12 px-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee
            className="[--duration:26s] [--gap:1.25rem] sm:[--gap:1.75rem]"
            pauseOnHover
          >
            {items.map((payer, idx) => (
              <div
                key={`${payer}-${idx}`}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-brand/40 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 cursor-default select-none flex-shrink-0"
              >
                <span className="text-xs sm:text-sm md:text-base font-semibold font-sans text-slate-800 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-teal-300 transition-colors whitespace-nowrap">
                  {payer}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
