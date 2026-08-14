import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /api/og is the Open Graph image referenced in metadata, so it stays
// crawlable even though the rest of /api/ is blocked.
const disallow = ["/api/", "/_next/", "/*.json$"];
const allow = ["/", "/api/og"];

// Answer- and generative-engine crawlers. Allowed on purpose: being cited by
// AI search is the point of the FAQ content and structured data.
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow, disallow },
      { userAgent: "Googlebot", allow, disallow: ["/api/", "/_next/"] },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/api/og", "/about.jpg", "/testimonials/"],
        disallow: ["/api/contact"],
      },
      ...aiAgents.map((userAgent) => ({ userAgent, allow, disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
