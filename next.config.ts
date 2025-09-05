import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async redirects() {
    return [
      {
        source: "/",
        destination: "/feed",
        permanent: true,
        
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accept images from any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
