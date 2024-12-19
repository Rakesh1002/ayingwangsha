"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  className?: string;
  children: React.ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("py-20 md:py-32", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
