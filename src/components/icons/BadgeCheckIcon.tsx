"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BadgeCheckIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".badge-shape",
        { rotate: [0, 15, -15, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
      animate(
        ".badge-check",
        { scale: [1, 1.25, 1] },
        { duration: 0.35, ease: "easeOut" }
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".badge-shape",
        { rotate: 0 },
        { duration: 0.25, ease: "easeInOut" }
      );
      animate(
        ".badge-check",
        { scale: 1 },
        { duration: 0.25, ease: "easeInOut" }
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <motion.path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
          className="badge-shape origin-center"
        />
        <motion.path
          d="m9 12 2 2 4-4"
          className="badge-check origin-center"
        />
      </motion.svg>
    );
  }
);

BadgeCheckIcon.displayName = "BadgeCheckIcon";
export default BadgeCheckIcon;
