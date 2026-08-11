import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unquest.s3.amazonaws.com",
        port: "",
        pathname: "/aying/**",
      },
    ],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
