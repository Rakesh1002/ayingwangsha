"use client";

import { Portfolio } from "@/components/sections";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
  return <Portfolio items={items} />;
}
