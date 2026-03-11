import { burjKhalifaZones } from "@/data/burjKhalifaZones";
import AnimatedContent from "./AnimatedContent";
import ZoneCard from "./ZoneCard";

export default function BurjKhalifaExperience() {
    return (
        <section className="w-full py-32 bg-gradient-to-b from-[#020617] to-black relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_50%)]" />

            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-24 relative z-10">
                Explore Burj Khalifa Vertically
            </h2>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-y-12 lg:gap-y-32 relative z-10">

                {/* CENTER TOWER - Visible only on large screens */}
                <div
                    className="hidden lg:flex col-[2] justify-center sticky top-24 h-[90vh]"
                    style={{ gridRow: `1 / span ${burjKhalifaZones.length}` }}
                >
                    {/* Using the uploaded image. Since it might not be transparent, we style it to look premium. */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src="/src/assets/burj-khalifa.jpg"
                            className="h-full object-cover rounded-[100px] opacity-90 shadow-[0_0_50px_rgba(56,189,248,0.2)] border border-white/5"
                            alt="Burj Khalifa"
                        />
                        {/* Overlay gradients to blend top and bottom */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-black pointer-events-none" />
                    </div>
                </div>

                {/* ZONES */}
                {burjKhalifaZones.map((zone, i) => {
                    const isLeft = i % 2 === 0;
                    // Desktop positioning
                    const desktopClass = isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3 lg:text-left";

                    return (
                        <AnimatedContent
                            key={zone.id}
                            distance={100}
                            direction="vertical"
                            duration={0.8}
                            ease="easeOut"
                            animateOpacity
                            className={`col-span-1 ${desktopClass} px-4 flex flex-col justify-center`}
                        >
                            <ZoneCard zone={zone} side={isLeft ? "left" : "right"} />
                        </AnimatedContent>
                    );
                })}
            </div>
        </section>
    );
}
