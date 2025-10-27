import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@tanstack/react-query",
      "@tanstack/react-router",
      "@tanstack/react-table",
      "ky",
    ],
  },
};

export default nextConfig;
