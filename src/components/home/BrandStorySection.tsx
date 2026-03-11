import { motion } from "framer-motion";

export function BrandStorySection() {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea904ac22ac?auto=format&fit=crop&q=80&w=2000"
                    alt="Dubai Skyline Cinematic"
                    className="w-full h-full object-cover"
                />
                {/* Cinematic Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051025] via-transparent to-[#051025]/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Decorative Divider */}
                    <div className="w-px h-16 bg-gradient-to-b from-transparent to-flyout-gold/60 mx-auto mb-8" />

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight italic tracking-wide">
                        "Flyout curates the finest experiences across the Emirates — from sky to sea, <span className="text-flyout-gold not-italic">desert to skyline</span>."
                    </h2>

                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-3 opacity-80">
                            <div className="h-[1px] w-12 bg-white/30" />
                            <span className="text-sm font-medium tracking-[0.2em] text-white/90 uppercase">The Flyout Standard</span>
                            <div className="h-[1px] w-12 bg-white/30" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
