import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/leetcode-quiz',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
