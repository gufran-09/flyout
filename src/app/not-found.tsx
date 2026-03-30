"use client";

import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0A1F44] to-[#020617] px-6">
      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-[#C5A059]/20 blur-[120px] rounded-full"></div>

      {/* Glass Card */}
      <div className="relative z-10 max-w-xl w-full text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#f5d27a] shadow-lg">
            <Compass className="w-8 h-8 text-[#0A1F44]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-semibold text-white tracking-wide">404</h1>

        <h2 className="mt-3 text-xl text-[#F5E6C8] font-medium">
          Lost in the Emirates
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          The destination you're looking for doesn’t exist or has been moved.
          But don’t worry — we’ll guide you to something unforgettable.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary Button */}
          <Link href="/">
            <button
              className="
              h-11 px-6 rounded-full
              text-sm font-semibold
              bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059]
              text-[#0A1F44]
              hover:shadow-[0_0_20px_rgba(184,142,47,0.6)]
              transition-all duration-300
            "
            >
              <Home className="inline mr-2 h-4 w-4" />
              Back to Home
            </button>
          </Link>

          {/* Secondary Button */}
          <Link href="/search">
            <button
              className="
              h-11 px-6 rounded-full
              border border-[#C5A059]
              text-sm font-semibold text-white
              bg-gradient-to-r from-[#0A1F44] via-[#16376D] to-[#0A1F44]
              hover:from-[#C5A059] hover:via-[#D4AF37] hover:to-[#C5A059]
              hover:text-[#0A1F44]
              transition-all duration-300
            "
            >
              <Search className="inline mr-2 h-4 w-4" />
              Explore Tours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
