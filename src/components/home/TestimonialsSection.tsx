import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion";
import { Star, MapPin, Quote, ExternalLink } from "lucide-react";

// Google Maps Link
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/FLYOUT+TOURS+LLC/@25.3461555,55.4210932,17z/data=!4m8!3m7!1s0x3e5f590c2706c7e1:0x7eec8aa0c0001d83!8m2!3d25.3461555!4d55.4210932!9m1!1b1!16s%2Fg%2F11kc2lb57r";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    city: "Dubai",
    rating: 5,
    text: "Reviewing Flyout Tours was the best decision for our Dubai trip! The desert safari was absolutely magical at sunset. Top-tier luxury.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    name: "Marc Dubois",
    city: "Abu Dhabi",
    rating: 5,
    text: "Very professional team. We booked the private yacht tour and it was impeccable. The captain was knowledgeable and views were stunning.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    city: "Sharjah",
    rating: 5,
    text: "An unforgettable experience in Sharjah! The cultural tour was deep and enriching. Flyout made everything seamless and comfortable.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 4,
    name: "James Wilson",
    city: "Dubai",
    rating: 5,
    text: "Luxury at its finest. The Burj Khalifa VIP tickets were handled perfectly. No queues, personal guidance, and excellent support.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 5,
    name: "Anita Patel",
    city: "Dubai",
    rating: 5,
    text: "We loved the Dhow Cruise dinner. The ambiance was perfect and the food was delicious. Thank you Flyout for such a romantic evening.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 6,
    name: "David Kim",
    city: "Dubai",
    rating: 5,
    text: "Exceptional service! They organized our entire family vacation flawlessly. The helicopter tour was the highlight of our trip.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

// Duplicate for infinite loop
const MARQUEE_ITEMS = [...testimonials, ...testimonials, ...testimonials];

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const openGoogleMaps = () => {
    window.open(GOOGLE_MAPS_LINK, "_blank");
  };

  useEffect(() => {
    const startAnimation = async () => {
      // Basic continuous animation
      // We animte x from 0 to -33.33% (one set of items) then reset instantly
      // The list is 3x long so moving 1/3 is seamless if the first and second 1/3 are identical
      if (isPaused) {
        controls.stop();
        return;
      }

      try {
        await controls.start({
          x: "-33.33%",
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }
        });
      } catch (e) {
        // Animation stopped/cancelled
      }
    };

    startAnimation();
  }, [controls, isPaused]);

  return (
    <section className="relative py-24 bg-[#051025] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-flyout-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              Loved by Travelers <span className="text-flyout-gold">Across the UAE</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Hundreds of guests trust Flyout for unforgettable journeys across the Emirates.
            </p>
          </motion.div>

          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 cursor-pointer hover:bg-white/10 transition-colors group mt-6"
            onClick={openGoogleMaps}
          >
            <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 line-height-none">
                <span className="text-white font-bold text-lg leading-none">4.8</span>
                <div className="flex text-flyout-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium group-hover:text-flyout-gold transition-colors">
                See All Reviews
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div
        className="w-full relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-r from-[#051025] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-l from-[#051025] to-transparent" />

        <motion.div
          className="flex gap-6 w-max px-4"
          animate={controls}
          style={{ x }}
        // We use simple animation instead of drag for the infinite effect to simple
        // Drag on infinite loop is complex to handle seamless reset. 
        // We'll trust the requested 'Auto-scroll' as primary interaction.
        >
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[300px] md:w-[400px] bg-[#0A1F44]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 relative group transition-all duration-300 hover:border-flyout-gold/30 hover:bg-[#0A1F44]"
            >
              {/* Google Icon Mini */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="G" />
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full border border-white/10 object-cover" />
                <div>
                  <h4 className="text-white font-medium text-base">{item.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-flyout-gold">{item.city}</span>
                    <span>•</span>
                    <span>Google Review</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#B88E2F" className="text-flyout-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                "{item.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={openGoogleMaps}
          className="text-slate-500 text-sm hover:text-white transition-colors inline-flex items-center gap-2 group"
        >
          View us on Google Maps
          <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
