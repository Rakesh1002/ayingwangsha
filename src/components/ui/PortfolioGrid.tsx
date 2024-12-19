import { motion } from "framer-motion";
import { S3Media } from "./S3Media";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioGridProps {
  items: PortfolioItem[];
  onItemClick: (item: PortfolioItem) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((portfolioItem) => (
        <motion.div
          key={portfolioItem.id}
          variants={item}
          className="group cursor-pointer"
          onClick={() => onItemClick(portfolioItem)}
        >
          <div className="relative aspect-[3/4] bg-muted overflow-hidden">
            <S3Media
              s3Key={portfolioItem.s3Key}
              alt={portfolioItem.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm text-primary font-medium">
                  {portfolioItem.category}
                </p>
                <h3 className="text-lg font-display text-foreground">
                  {portfolioItem.title}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
