import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
