"use client";

import { useState } from "react";
import Image from "next/image";
import { useS3Media } from "@/lib/hooks/useS3Media";
import { cn } from "@/lib/utils";

interface S3MediaProps {
  s3Key: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  fill?: boolean;
  onError?: (error: Error) => void;
}

export function S3Media({
  s3Key,
  alt = "",
  className,
  width = 1200,
  height = 800,
  priority = false,
  onLoad,
  fill = true,
  onError,
}: S3MediaProps) {
  const { url, isLoading, error } = useS3Media(s3Key);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (error) {
    console.error("S3Media error:", error);
    onError?.(error);
    return null;
  }

  if (isLoading || !s3Key) {
    return (
      <div
        className={cn("bg-muted animate-pulse rounded-md", className)}
        style={{ width, height }}
      />
    );
  }

  if (!url) return null;

  // Handle video files
  if (s3Key.endsWith(".mp4") || s3Key.endsWith(".webm")) {
    return (
      <video
        src={url}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={onLoad}
      />
    );
  }

  // Handle images
  return (
    <div className={cn("relative", className, fill ? "w-full h-full" : "")}>
      <Image
        src={url}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={fill ? "(max-width: 768px) 100vw, 50vw" : undefined}
        quality={90}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isImageLoading ? "opacity-0" : "opacity-100",
          fill ? "object-cover" : "w-full h-auto",
        )}
        onLoad={() => {
          setIsImageLoading(false);
          onLoad?.();
        }}
      />
      {isImageLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-md",
            fill ? "w-full h-full" : "",
          )}
        />
      )}
    </div>
  );
}
