import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/cruise", destination: "/dubai/cruise", permanent: true },
      { source: "/cruises", destination: "/dubai/cruise", permanent: true },
      { source: "/dubai/cruises", destination: "/dubai/cruise", permanent: true },
      { source: "/safari", destination: "/dubai/desert-safari", permanent: true },
      { source: "/water-adventure", destination: "/dubai/water-adventures", permanent: true },
      { source: "/water-adventures", destination: "/dubai/water-adventures", permanent: true },
      { source: "/dubai/safari", destination: "/dubai/desert-safari", permanent: true },
      { source: "/dubai/water-adventure", destination: "/dubai/water-adventures", permanent: true },
    ];
  },
};

export default nextConfig;
