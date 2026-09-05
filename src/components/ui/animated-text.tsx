"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  duration?: number;
  delay?: number;
  replay?: boolean;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  underlineGradient?: string;
  underlineHeight?: string;
  underlineOffset?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      duration = 0.035,
      delay = 0.04,
      replay = true,
      className,
      textClassName,
      underlineClassName,
      as: Component = "h1",
      underlineGradient = "from-teal-400 via-brand to-emerald-400",
      underlineHeight = "h-1 sm:h-1.5",
      underlineOffset = "-bottom-2 sm:-bottom-3",
      ...props
    },
    ref
  ) => {
    const lines = text.split("\n");
    let globalIndex = 0;

    const container: Variants = {
      hidden: {
        opacity: 0,
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: i * delay,
        },
      }),
    };

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    };

    const totalLetters = text.replace(/\n/g, "").length;

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "50%",
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: Math.min(totalLetters * duration + 0.25, 1.2),
          duration: 0.8,
          ease: "easeOut",
        },
      },
    };

    const MotionComponent = (motion[Component as keyof typeof motion] || motion.h1) as typeof motion.h1;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <div className="relative inline-block">
          <MotionComponent
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            aria-label={text.replace(/\n/g, " ")}
            className={cn(
              "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-center text-slate-900 dark:text-white leading-[1.2] flex flex-col items-center",
              textClassName
            )}
          >
            {lines.map((line, lineIdx) => (
              <span key={lineIdx} className="flex flex-wrap justify-center items-center">
                {Array.from(line).map((letter, letterIdx) => {
                  const currentIndex = globalIndex++;
                  return (
                    <motion.span key={currentIndex} variants={child} className="inline-block">
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </MotionComponent>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-gradient-to-r rounded-full",
              underlineGradient,
              underlineClassName
            )}
          />
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
