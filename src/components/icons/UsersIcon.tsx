"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const UsersIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".user-primary",
        { y: [0, -3, 0] },
        { duration: 0.35, ease: "easeOut" }
      );
      animate(
        ".user-secondary",
        { x: [0, 3, 0], y: [0, -2, 0] },
        { duration: 0.45, ease: "easeOut", delay: 0.05 }
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".user-primary, .user-secondary",
        { x: 0, y: 0 },
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
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          className="user-primary"
        />
        <motion.circle cx="9" cy="7" r="4" className="user-primary" />
        <motion.path
          d="M22 21v-2a4 4 0 0 0-3-3.87"
          className="user-secondary"
        />
        <motion.path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          className="user-secondary"
        />
      </motion.svg>
    );
  }
);

UsersIcon.displayName = "UsersIcon";
export default UsersIcon;
