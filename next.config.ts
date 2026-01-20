import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.nip.io", // Allows any IP-based nip.io domain
        port: "", // Leave empty for standard HTTPS (443)
        pathname: "/media/**", // Only allow media path for security
      },
    ],
  },
};

export default nextConfig;
