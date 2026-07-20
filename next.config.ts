import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port:"",
      }
    ],
    // Allow images from the public directory
    unoptimized: false
  }
};

export default nextConfig;