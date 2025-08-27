import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns:[new URL("https://lh3.googleusercontent.com")]
  },
};

export default nextConfig;
