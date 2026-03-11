import React, { useState } from "react";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ArrowUpRight, Star, Flame, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";

// Data for Most Booked Experiences
const mostBookedItems = [
    {
        id: 1,
        title: "Desert Safari with BBQ Dinner",
        location: "Dubai Desert Conservation Reserve",
        image: "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?q=80&w=687&auto=format&fit=crop",
        price: "AED 150",
        rating: 4.9,
        reviews: "12.5k",
        booked: "50k+",
        tag: "Best Seller",
        duration: "6 Hours",
        link: "/safari/evening-safari",
        originalPrice: 200
    },
    {
        id: 2,
        title: "Atlantis Aquaventure Waterpark",
        location: "Palm Jumeirah",
        image: "https://images.unsplash.com/photo-1604375318488-4bf6119edb15?q=80&w=1176&auto=format&fit=crop",
        price: "AED 345",
        rating: 4.8,
        reviews: "8.2k",
        booked: "35k+",
        tag: "Trending",
        duration: "Full Day",
        link: "/dubai/water-parks/atlantis",
        originalPrice: 420
    },
    {
        id: 3,
        title: "Marina Dinner Cruise",
        location: "Dubai Marina",
        image: "https://images.unsplash.com/photo-1768367475215-22e0d8ebdadb?q=80&w=1632&auto=format&fit=crop",
        price: "AED 200",
        rating: 4.7,
        reviews: "5.4k",
        booked: "20k+",
        tag: "Must Try",
        duration: "2 Hours",
        link: "/dubai/dinner-cruise/marina",
        originalPrice: 250
    },
    {
        id: 4,
        title: "Burj Khalifa Observation Deck",
        location: "Downtown Dubai",
        image: "https://images.unsplash.com/photo-1590082487384-fc2290e36718?q=80&w=657&auto=format&fit=crop",
        price: "AED 179",
        rating: 4.9,
        reviews: "25k+",
        booked: "60k+",
        tag: "Iconic",
        duration: "1.5 Hours",
        link: "/dubai/attractions/burj-khalifa",
        originalPrice: 220
    },
    {
        id: 5,
        title: "Jet Ski Tour",
        location: "Jumeirah Beach",
        image: "https://images.unsplash.com/photo-1688219040240-df6398321243?q=80&w=1149&auto=format&fit=crop",
        price: "AED 350",
        rating: 4.8,
        reviews: "3.1k",
        booked: "10k+",
        tag: "Thrilling",
        duration: "1 Hour",
        link: "/dubai/water-sports/jet-ski",
        originalPrice: 450
    },
    {
        id: 6,
        title: "Ferrari World Abu Dhabi",
        location: "Yas Island, Abu Dhabi",
        image: "https://images.unsplash.com/photo-1723815264488-a906461c770f?q=80&w=687&auto=format&fit=crop",
        price: "AED 345",
        rating: 4.9,
        reviews: "9.8k",
        booked: "45k+",
        tag: "Popular",
        duration: "Full Day",
        link: "/abu-dhabi/ferrari-world",
        originalPrice: 395
    }
];

// MostBookedCard functionality replaced by shared component ProductCard
import { ProductCard } from "@/components/ui/ProductCard";

export const MostBookedSection = () => {
    const [api, setApi] = useState<CarouselApi>();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-50 via-white to-white pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <SectionHeader
                    title="Most Booked on Flyout"
                    label="Social Proof"
                    description="Join 500,000+ happy travelers and explore our most popular experiences."
                    onPrev={() => api?.scrollPrev()}
                    onNext={() => api?.scrollNext()}
                    viewMoreLink="/popular"
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
                            {mostBookedItems.map((item) => (
                                <CarouselItem key={item.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <ProductCard
                                        id={item.id}
                                        title={item.title}
                                        location={item.location}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                        reviews={item.reviews}
                                        booked={item.booked}
                                        tag={item.tag}
                                        duration={item.duration}
                                        link={item.link}
                                        originalPrice={item.originalPrice}
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

export default MostBookedSection;
