import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // 🔥 adjust speed here
    }
  }, []);

  return (
    <section className="relative pt-6 lg:pt-4 pb-8 lg:pb-12">
      <div className="section-container">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[21/9]">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/Hero-Section/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 sm:p-12 z-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover UAE's Magic
            </h1>
            <p className="text-lg sm:text-xl text-white/95 mb-8 max-w-xl">
              Curated luxury experiences, crafted for unforgettable journeys.
            </p>

            <Button
              size="lg"
              className="relative bg-[#0A1F44] text-white text-lg px-10 py-7 rounded-full shadow-lg ring-1 ring-white/10 transition-all duration-300 ease-in-outhover:bg-blackhover:ring-[#B88E2F]hover:-translate-y-1active:scale-95overflow-hidden "
            >Explore Dubai</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
