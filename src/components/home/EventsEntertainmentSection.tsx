import React, { useState } from "react";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ArrowUpRight, Calendar, MapPin, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";
import { ProductCard } from "@/components/ui/ProductCard";

// Data for Events
const events = [
    {
        id: "hero",
        title: "Coldplay: Music of the Spheres",
        date: "JAN 11",
        location: "Zayed Sports City",
        image: "https://images.unsplash.com/photo-1585131201641-2e3a295bf7dd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Live Concert",
        price: "From AED 395",
        tag: "Concert",
        link: "/events/coldplay",
        originalPrice: 650
    },
    {
        id: 2,
        title: "Global Village Season 28",
        date: "NOW OPEN",
        location: "Global Village, Dubai",
        image: "https://plus.unsplash.com/premium_photo-1766749948167-ae63aa5c5294?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Festival",
        price: "AED 30",
        tag: "Cultural",
        link: "/attractions/global-village",
        originalPrice: 500
    },
    {
        id: 3,
        title: "La Perle by Dragone",
        date: "DAILY",
        location: "Al Habtoor City",
        image: "https://images.unsplash.com/photo-1635449677939-8e4e77ecf36a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Live Show",
        price: "From AED 259",
        tag: "Trending",
        link: "/events/la-perle",
        originalPrice: 350
    },
    {
        id: 4,
        title: "Dubai Opera Gala",
        date: "FEB 14",
        location: "Dubai Opera",
        image: "https://images.unsplash.com/photo-1768463852120-9360d0e39912?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Classical",
        price: "From AED 550",
        tag: "Family",
        link: "/events/dubai-opera",
        originalPrice: 25
    },
    {
        id: 5,
        title: "Formula 1 Grand Prix",
        date: "NOV 26",
        location: "Yas Marina Circuit",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800",
        category: "Sports",
        price: "From AED 1,200",
        tag: "Major Event",
        link: "/events/f1-abudhabi"
    }
];

export const EventsEntertainmentSection = () => {
    const [api, setApi] = useState<CarouselApi>();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <SectionHeader
                    title="Events & Entertainment"
                    label="Live the Moment"
                    description="Tickets to the hottest concerts, theme parks, and cultural events happening now."
                    onPrev={() => api?.scrollPrev()}
                    onNext={() => api?.scrollNext()}
                    viewMoreLink="/events"
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
                            {events.map((item) => (
                                <CarouselItem key={item.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <ProductCard
                                        id={item.id}
                                        title={item.title}
                                        location={item.location}
                                        image={item.image}
                                        price={item.price.replace("From", "").trim()}
                                        originalPrice={item.originalPrice}
                                        rating={4.8}
                                        reviews="Active"
                                        tag={item.tag}
                                        link={item.link}
                                        booked="Selling Fast"
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

export default EventsEntertainmentSection;
