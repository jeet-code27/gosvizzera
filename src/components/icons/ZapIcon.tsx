"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ZapIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".zap-path",
        {
          scale: [1, 1.2, 0.95, 1.1, 1],
          rotate: [0, -8, 8, -4, 0],
        },
        { duration: 0.5, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".zap-path",
        { scale: 1, rotate: 0 },
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
        <motion.polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          className="zap-path origin-center"
        />
      </motion.svg>
    );
  }
);

ZapIcon.displayName = "ZapIcon";
export default ZapIcon;
