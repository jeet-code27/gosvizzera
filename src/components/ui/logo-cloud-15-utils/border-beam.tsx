"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      className,
      size = 200,
      duration = 8,
      anchor = 50,
      borderWidth = 3,
      colorFrom = "#ffaa40",
      colorTo = "#9c40ff",
      delay = 0,
    },
    ref,
  ) => {
    return (
      <div
        style={
          {
            "--size": `${size}px`,
            "--duration": `${duration}s`,
            "--border-width": `${borderWidth}px`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute -inset-[var(--border-width)] rounded-[inherit] border-[length:var(--border-width)] border-transparent",
          "[mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
          className,
        )}
      >
        <div
          ref={ref}
          className="absolute aspect-square w-[var(--size)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:50%_50%] [offset-path:rect(0_100%_100%_0_round_24px)] filter drop-shadow-[0_0_10px_var(--color-from)] drop-shadow-[0_0_15px_var(--color-to)]"
          style={{
            offsetDistance: "0%",
          }}
        />
      </div>
    );
  },
);

BorderBeam.displayName = "BorderBeam";
