import React, { useState } from "react";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ArrowUpRight, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

// Data
const romanticExperiences = [
    {
        id: 1,
        title: "Marina  Dinner Cruise",
        subtitle: "Romantic Dining on the Water",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800",
        price: "AED 350",
        tag: "Romantic",
        link: "/dinner-cruise/marina-sunset",
        originalPrice: 420
    },
    {
        id: 2,
        title: "Rooftop Fine-Dining",
        subtitle: "Sky-High Gourmet Experience",
        image: "https://images.unsplash.com/photo-1695606453510-dc0cf8377836?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 800",
        tag: "Lifestyle",
        link: "/restaurants/rooftop-dining",
        originalPrice: 950
    },
    {
        id: 3,
        title: "Proposal on a Private Yacht",
        subtitle: "Unforgettable Moments at Sea",
        image: "https://images.unsplash.com/photo-1764148775844-52fd5216e77b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 3,500",
        tag: "Exclusive",
        link: "/yacht/proposal-package",
        originalPrice: 4200
    },
    {
        id: 4,
        title: "Hot Air Balloon",
        subtitle: "+ Champagne Breakfast",
        image: "https://images.unsplash.com/photo-1507608443039-bfde4fbcd142?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 1,100",
        tag: "Bucket List",
        link: "/sky-adventures/hot-air-balloon",
        originalPrice: 1350
    },

];


// ✅ Romantic card aligned to Luxury / MostBooked system
// ProductCard integration
import { ProductCard } from "@/components/ui/ProductCard";

export const RomanticLifestyleSection = () => {
    const [api, setApi] = useState<CarouselApi>();

    return (
        <section className="relative pt-0 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <SectionHeader
                    title="Celebrate Life’s Moments"
                    label="Lifestyle & Romance"
                    description="Hand-picked experiences designed for romance, proposals, celebrations and unforgettable memories."
                    onPrev={() => api?.scrollPrev()}
                    onNext={() => api?.scrollNext()}
                    viewMoreLink="/lifestyle"
                />

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {romanticExperiences.map((item, index) => (
                            <CarouselItem key={item.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard
                                        id={item.id}
                                        title={item.title}
                                        location={item.subtitle /* using subtitle */}
                                        image={item.image}
                                        price={item.price}
                                        originalPrice={item.originalPrice}
                                        rating={5.0} // Mock
                                        reviews="Celebration"
                                        tag={item.tag}
                                        link={item.link}
                                        booked="Romantic"
                                    />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

            </div>
        </section>
    );
};

export default RomanticLifestyleSection;
