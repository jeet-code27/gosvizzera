"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type FeatureType = {
  metric?: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

export type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
  index?: number;
};

// Deterministic pattern arrays so Server & Client produce 100% identical markup with zero hydration warnings
const staticPatterns: number[][][] = [
  [[7, 2], [9, 4], [8, 1], [10, 5], [7, 3]],
  [[8, 3], [7, 5], [10, 2], [9, 1], [8, 4]],
  [[9, 1], [8, 4], [7, 2], [10, 3], [9, 5]],
  [[7, 4], [10, 1], [8, 5], [9, 3], [7, 2]],
  [[10, 2], [9, 5], [7, 1], [8, 3], [10, 4]],
  [[8, 5], [7, 3], [9, 2], [10, 4], [8, 1]],
];

export function FeatureCard({ feature, index = 0, className, ...props }: FeatureCardProps) {
  const p = staticPatterns[index % staticPatterns.length];

  return (
    <div
      className={cn(
        "group relative overflow-hidden p-6 sm:p-8 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Background Decorative Grid Pattern overlay */}
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full opacity-60 dark:opacity-30 [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-brand/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-teal-500/10 stroke-slate-300 dark:stroke-slate-700/50 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>

      {/* Metric Badge if provided */}
      {feature.metric && (
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-brand/5 dark:bg-teal-500/10 border border-brand/15 dark:border-teal-500/20 text-brand dark:text-teal-300 text-[11px] font-bold font-mono uppercase tracking-wider mb-4">
          {feature.metric}
        </div>
      )}

      {/* SVG Icon */}
      <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-brand dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <feature.icon className="w-5 h-5" aria-hidden />
      </div>

      {/* Title in Bodoni / Sans */}
      <h3 className="mt-6 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans transition-colors group-hover:text-brand dark:group-hover:text-teal-300">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="relative z-20 mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans font-light leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sqX, sqY], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sqX * width}
              y={sqY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
