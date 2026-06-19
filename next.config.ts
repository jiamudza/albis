import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: [
    //   "api.dicebear.com",
    //   "avatar.iran.liara.run",
    //   "res.cloudinary.com",
    //   "imgix2.ruangguru.com",
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com'
      },
      {
        protocol: 'https',
        hostname: "avatar.iran.liara.run"
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com"
      },
      {
        protocol: 'https',
        hostname: "imgix2.ruangguru.com"
      },
    ]
  },
};

export default nextConfig;

