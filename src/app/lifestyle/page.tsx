import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";

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

// Standardized using PremiumCard
import { PremiumCard } from "@/components/ui/PremiumCard";

const LifestylePage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4">Lifestyle & Romance</h1>
                        <p className="text-neutral-500 text-lg font-light max-w-2xl">
                            Hand-picked experiences designed for romance, proposals, celebrations and unforgettable memories.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {romanticExperiences.map((item) => (
                            <PremiumCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                originalPrice={item.originalPrice}
                                rating={5.0} // Hardcoded in original
                                badge={item.tag}
                                link={item.link}
                                location="Dubai, UAE" // Defaulting since subtitle is used as subtitle now
                                subtitle={item.subtitle}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default LifestylePage;
