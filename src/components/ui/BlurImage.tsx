"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Loading } from "./Loading";
import { getImagePlaceholder } from "@/lib/image";

interface BlurImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function BlurImage({
  src,
  alt,
  fill,
  width = 1200,
  height = 800,
  className,
  sizes,
  priority,
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative", className)}>
      {isLoading && <Loading />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={getImagePlaceholder(width, height)}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100",
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
