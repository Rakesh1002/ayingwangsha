"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640 || "ontouchstart" in window);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.remove("custom-cursor");
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor");

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if the target is clickable
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[tabindex]") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable as boolean);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Main cursor dot - moves instantly with cursor */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden sm:block"
        style={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isPointer ? 1.5 : 1,
        }}
      />
      {/* Trailing circle */}
      <motion.div
        className="fixed w-6 h-6 border border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference hidden sm:block"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
      <style jsx global>{`
        html.custom-cursor,
        html.custom-cursor * {
          cursor: none !important;
        }
        @media (hover: none) and (pointer: coarse) {
          html.custom-cursor,
          html.custom-cursor * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
