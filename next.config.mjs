/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.bathiq.in", "s3.ap-south-1.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
