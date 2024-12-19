"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { S3Media } from "@/components/ui/S3Media";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioProps {
  items: PortfolioItem[];
}

const categories = [
  "All",
  "Bridal",
  "Celebrity",
  "Editorial",
  "Model",
  "Runway",
] as const;

type Category = (typeof categories)[number];

export default function Portfolio({ items }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1,
    );
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1,
    );
  }, [filteredItems.length]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(handleNext, 3000); // Change image every 3 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, handleNext]);

  const handleItemClick = (item: PortfolioItem) => {
    const index = filteredItems.findIndex((i) => i.s3Key === item.s3Key);
    setCurrentIndex(index);
    setSelectedImage(item.s3Key);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedImage(null);
    setIsPlaying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") {
        setSelectedImage(null);
        setIsPlaying(false);
      }
      if (e.key === " ") {
        e.preventDefault();
        togglePlayback();
      }
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const thumbnailElement = document.getElementById(
        `thumbnail-${currentIndex}`,
      );
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex, selectedImage]);

  return (
    <Section id="portfolio" className="bg-muted/30">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl md:text-5xl">Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing my work in bridal, editorial, celebrity and fashion
              makeup artistry.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors
                  ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                  <S3Media
                    s3Key={item.s3Key}
                    alt={item.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-sm text-primary font-medium">
                        {item.category}
                      </p>
                      <h3 className="text-lg font-display text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Full Screen Gallery */}
      <AnimatePresence>
        {selectedImage && filteredItems[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 flex flex-col"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 h-[60px]">
              <div>
                <h3 className="text-lg font-display">
                  {filteredItems[currentIndex].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {filteredItems[currentIndex].category} • {currentIndex + 1} of{" "}
                  {filteredItems.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayback}
                  className="text-foreground hover:text-primary p-2 rounded-full hover:bg-muted/50 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setIsPlaying(false);
                  }}
                  className="text-foreground hover:text-primary p-2 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 flex items-center justify-center relative px-12 mb-[80px] sm:mb-[70px]">
              <button
                onClick={handlePrevious}
                className="absolute left-4 text-foreground hover:text-primary z-20 p-2 hover:bg-muted/50 rounded-full transition-colors"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="relative w-full h-[calc(100vh-180px)] flex items-center justify-center">
                <div className="relative h-full flex items-center justify-center">
                  <S3Media
                    s3Key={filteredItems[currentIndex].s3Key}
                    alt={filteredItems[currentIndex].title}
                    className="h-full w-auto object-contain"
                    fill={false}
                    width={1200}
                    height={1800}
                    priority
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="absolute right-4 text-foreground hover:text-primary z-20 p-2 hover:bg-muted/50 rounded-full transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="h-[100px] sm:h-[120px] p-2 bg-background/50 backdrop-blur-sm fixed bottom-0 left-0 right-0">
              <div className="flex gap-2 justify-start h-full overflow-x-auto overflow-y-hidden px-4 sm:px-8 no-scrollbar">
                {filteredItems.map((item, index) => (
                  <button
                    id={`thumbnail-${index}`}
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsPlaying(false);
                    }}
                    className={`relative h-full aspect-[3/4] rounded-md overflow-hidden transition-all flex-shrink-0
                      ${currentIndex === index ? "ring-2 ring-primary scale-105" : "opacity-50 hover:opacity-100"}`}
                  >
                    <S3Media
                      s3Key={item.s3Key}
                      alt={item.title}
                      className="object-cover"
                      fill
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
