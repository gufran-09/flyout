import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Star, Flame, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";

// Data
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
        booked: "100k+",
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

// Standardized using PremiumCard
import { PremiumCard } from "@/components/ui/PremiumCard";

const PopularPage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4">Most Popular</h1>
                        <p className="text-neutral-500 text-lg font-light max-w-2xl">
                            Discover our most loved experiences, rated highly by thousands of travelers.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mostBookedItems.map((item) => (
                            <PremiumCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                location={item.location}
                                price={item.price.replace("AED ", "").replace(",", "")}
                                originalPrice={item.originalPrice}
                                rating={item.rating}
                                badge={item.tag}
                                category="Trending"
                                subtitle={item.duration}
                                link={item.link}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PopularPage;
