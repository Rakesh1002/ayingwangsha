"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { S3_KEYS } from "@/lib/constants";

const videos = [
  S3_KEYS.videos.runway5,
  S3_KEYS.videos.runway7,
  S3_KEYS.videos.runway8,
  S3_KEYS.videos.runway9,
  S3_KEYS.videos.runway10,
  S3_KEYS.videos.runway12,
];

export function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playedVideos, setPlayedVideos] = useState<Set<string>>(new Set());

  // Initialize with a random video
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideo(videos[randomIndex]);
    setPlayedVideos(new Set([videos[randomIndex]]));
  }, []);

  const getNextRandomVideo = () => {
    const availableVideos = videos.filter((video) => !playedVideos.has(video));

    // If all videos have been played, reset the played videos set
    if (availableVideos.length === 0) {
      setPlayedVideos(new Set([currentVideo]));
      const remainingVideos = videos.filter((video) => video !== currentVideo);
      const randomIndex = Math.floor(Math.random() * remainingVideos.length);
      return remainingVideos[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    return availableVideos[randomIndex];
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextVideo = getNextRandomVideo();
    setCurrentVideo(nextVideo);
    setPlayedVideos((prev) => new Set([...prev, nextVideo]));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextVideo = getNextRandomVideo();
    setCurrentVideo(nextVideo);
    setPlayedVideos((prev) => new Set([...prev, nextVideo]));
  };

  const handleVideoEnd = () => {
    handleNext();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });

      const handleTransitionEnd = () => {
        setIsTransitioning(false);
      };

      video.addEventListener("canplay", handleTransitionEnd);
      return () => {
        video.removeEventListener("canplay", handleTransitionEnd);
      };
    }
  }, [currentVideo]);

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 to-background flex items-center justify-center">
        <motion.video
          key={currentVideo}
          ref={videoRef}
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${currentVideo}`}
          className="h-full w-auto max-w-none opacity-50 object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          playsInline
          loop={false} // Set to false since we're handling the loop manually
          onEnded={handleVideoEnd}
        />
      </div>

      {/* Content and Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center space-y-6"
      >
        <div className="space-y-2 backdrop-blur-sm bg-background/10 p-6 rounded-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-primary font-light tracking-[0.2em] uppercase text-sm md:text-base"
          >
            Makeup Artist & Beauty Expert
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none"
          >
            Aying
            <br />
            <span className="text-primary font-light italic">Wangsha</span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        <button
          onClick={handlePrevious}
          disabled={isTransitioning}
          className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="p-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 transition-colors disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
