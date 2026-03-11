import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/ui/ProductCard";

// ---------------- DATA ----------------

const luxuryExperiences = [
    {
        id: 1,
        title: "Royal Desert Safari",
        subtitle: "with Butler Service",
        image:
            "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 1,500",
        tag: "Signature",
        link: "/safari/royal-desert-safari",
        originalPrice: 1800,
    },
    {
        id: 2,
        title: "Burj Khalifa VIP",
        subtitle: "Private Sky Lounge Experience",
        image:
            "https://images.unsplash.com/photo-1635857161777-2383f2e4a82d?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 2,800",
        tag: "Exclusive",
        link: "/dubai/burj-khalifa-vip",
        originalPrice: 3200,
    },
    {
        id: 3,
        title: "Sunset Yacht Party",
        subtitle: "with Live DJ",
        image:
            "https://images.unsplash.com/photo-1628029338883-61644ec68475?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 350",
        tag: "Trending",
        link: "/yacht/sunset-party",
        originalPrice: 450,
    },
    {
        id: 4,
        title: "Helicopter Tour",
        subtitle: "+ Atlantis Lunch",
        image:
            "https://images.unsplash.com/photo-1713843956211-1e5569ab4d48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 1,200",
        tag: "Best Seller",
        link: "/sky-adventures/helicopter",
        originalPrice: 1500,
    },
    {
        id: 5,
        title: "VIP Ferrari World",
        subtitle: "+ Yas Marina Drive",
        image:
            "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200",
        price: "AED 950",
        tag: "Thrilling",
        link: "/parks/ferrari-world-vip",
        originalPrice: 1100,
    },
    {
        id: 6,
        title: "Private Limousine",
        subtitle: "City Tour Experience",
        image:
            "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200",
        price: "AED 600",
        tag: "Luxury",
        link: "/transfers/limousine",
        originalPrice: 750,
    },
];

// ---------------- COMPONENT ----------------

export const LuxuryExperiencesSection = () => {
    const [api, setApi] = useState<CarouselApi>();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <SectionHeader
                    title="Luxury & VIP Collections"
                    label="Exclusive"
                    description="Curated high-end experiences for the discerning traveler. Private jets, yachts, and premium desert escapes."
                    onPrev={() => api?.scrollPrev()}
                    onNext={() => api?.scrollNext()}
                    viewMoreLink="/luxury"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 py-4">
                            {luxuryExperiences.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <ProductCard
                                        id={item.id}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                        image={item.image}
                                        price={item.price}
                                        originalPrice={item.originalPrice}
                                        tag={item.tag}
                                        link={item.link}
                                        variant="luxury"
                                        booked="PREMIUM"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
};

export default LuxuryExperiencesSection;
