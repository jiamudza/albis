import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["api.dicebear.com", "avatar.iran.liara.run", "res.cloudinary.com"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
