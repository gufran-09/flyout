import { motion } from "framer-motion";

export default function BurjTower() {
    return (
        <div className="sticky top-24 h-[calc(100vh-6rem)] hidden lg:flex flex-col justify-center items-center w-5/12 min-w-[300px]">
            <div className="relative h-full w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/20 bg-black/5">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop"
                    alt="Burj Khalifa"
                    className="object-cover h-full w-full"
                />

                {/* Overlay Gradients for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                {/* Decorative elements */}
                <div className="absolute bottom-10 left-0 right-0 text-center text-white/90">
                    <h3 className="text-3xl font-bold tracking-widest uppercase mb-2 drop-shadow-lg">Burj Khalifa</h3>
                    <p className="text-sm font-light tracking-[0.3em] uppercase opacity-80">The Center of Now</p>
                </div>
            </div>
        </div>
    );
}
