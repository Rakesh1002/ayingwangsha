import { LucideIcon } from "lucide-react";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  s3Key: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  features: string[];
}
