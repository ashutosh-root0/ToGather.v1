import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "dvnns3igt7.ufs.sh",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;