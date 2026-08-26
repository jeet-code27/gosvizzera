"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ShieldCheckIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".shield-body",
        { scale: [1, 1.08, 1] },
        { duration: 0.4, ease: "easeOut" }
      );
      animate(
        ".shield-check",
        { pathLength: [0, 1], opacity: [0.4, 1] },
        { duration: 0.45, ease: "easeOut" }
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".shield-body",
        { scale: 1 },
        { duration: 0.25, ease: "easeInOut" }
      );
      animate(
        ".shield-check",
        { pathLength: 1, opacity: 1 },
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
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          className="shield-body origin-center"
        />
        <motion.path
          d="m9 12 2 2 4-4"
          className="shield-check"
          initial={{ pathLength: 1 }}
        />
      </motion.svg>
    );
  }
);

ShieldCheckIcon.displayName = "ShieldCheckIcon";
export default ShieldCheckIcon;
