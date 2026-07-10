import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Restrict Next.js to a single CPU core to prevent server choking
    cpus: 1,
    workerThreads: false,
    
    serverActions: {
      // Increase the body size limit for Server Actions (default is 1 MB).
      // Uploads go through /api/uploads (a Route Handler) which has no such
      // limit, but raise this as a safety net for any other large actions.
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
