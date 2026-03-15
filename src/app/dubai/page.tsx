"use client";
import { Layout } from "@/components/layout/Layout";
import BurjTower from "@/components/dubai/BurjTower";
import ZoneSection from "@/components/dubai/ZoneSection";
import { burjKhalifaZones } from "@/data/burjKhalifaZones";

export default function DubaiPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-[#08111f] text-white">
                <section className="section-container py-12 lg:py-16">
                    <div className="max-w-3xl mb-10 lg:mb-14">
                        <p className="text-flyout-gold text-sm font-semibold uppercase tracking-[0.3em] mb-4">
                            Dubai Landmark Guide
                        </p>
                        <h1 className="text-4xl md:text-5xl font-display mb-4">
                            Explore Burj Khalifa From Base To Sky
                        </h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Browse the tower zone by zone, from hotel and residences to the public observation decks and premium lounge experiences.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        <BurjTower />

                        <div className="flex-1 w-full">
                            {burjKhalifaZones.map((zone) => (
                                <ZoneSection key={zone.id} zone={zone} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
