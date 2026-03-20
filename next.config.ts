import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.bathiq.in", "s3.ap-south-1.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
