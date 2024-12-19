"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { PortfolioItem } from "@/lib/types";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface PortfolioProps {
  items: PortfolioItem[];
}

// Dynamic imports with loading fallback
export const Portfolio = dynamic<PortfolioProps>(
  () => import("./Portfolio").then((mod) => mod.default),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

export const Contact = dynamic(
  () =>
    import("./Contact").then((mod) => mod.default) as Promise<ComponentType>,
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);
