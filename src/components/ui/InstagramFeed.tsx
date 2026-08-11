"use client";

import { useEffect } from "react";

// lucide-react dropped brand icons in v1, so the glyph is inlined here
function Instagram({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Add type declaration for Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

export function InstagramFeed() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Reinitialize Instagram embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl">Instagram</h3>
        <a
          href="https://instagram.com/makeupandhairbyaying"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:opacity-80"
        >
          <Instagram size={20} />
          <span>@makeupandhairbyaying</span>
        </a>
      </div>

      <div className="relative overflow-hidden pb-[460px] bg-background rounded-xl border border-border">
        <iframe
          src="https://www.instagram.com/makeupandhairbyaying/embed/?theme=dark"
          className="absolute top-0 left-0 w-full h-full border-none bg-background"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <style jsx global>{`
        /* Force dark theme on Instagram embed */
        iframe.instagram-media,
        iframe.instagram-media-rendered {
          background-color: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.5rem !important;
          color-scheme: dark !important;
        }

        /* Target the Instagram embed content */
        iframe.instagram-media-rendered {
          filter: invert(1) hue-rotate(180deg) !important;
        }

        /* Reverse the invert for actual images and videos */
        iframe.instagram-media-rendered img,
        iframe.instagram-media-rendered video {
          filter: invert(1) hue-rotate(180deg) !important;
        }

        /* Style the header section */
        iframe.instagram-media-rendered header {
          background-color: hsl(var(--background)) !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
        }

        /* Style text elements */
        iframe.instagram-media-rendered,
        iframe.instagram-media-rendered * {
          color: hsl(var(--foreground)) !important;
        }

        /* Style links */
        iframe.instagram-media-rendered a {
          color: hsl(var(--primary)) !important;
        }

        /* Hide Instagram's default border when focused */
        iframe.instagram-media:focus-visible {
          outline: 2px solid hsl(var(--primary)) !important;
          outline-offset: 2px !important;
        }

        /* Force dark scrollbar */
        iframe.instagram-media-rendered::-webkit-scrollbar {
          width: 8px;
          background-color: hsl(var(--background)) !important;
        }

        iframe.instagram-media-rendered::-webkit-scrollbar-thumb {
          background-color: hsl(var(--primary)) !important;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
