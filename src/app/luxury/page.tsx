import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CurrencySymbol } from "@/components/ui/CurrencySymbol";
import { PremiumCard } from "@/components/ui/PremiumCard";

// Data
const luxuryExperiences = [
    {
        id: 1,
        title: "Royal Desert Safari",
        subtitle: "with Butler Service",
        image: "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 1,500",
        tag: "Signature",
        link: "/safari/royal-desert-safari",
        originalPrice: 1800
    },
    {
        id: 2,
        title: "Burj Khalifa VIP",
        subtitle: "Private Sky Lounge Experience",
        image: "https://images.unsplash.com/photo-1635857161777-2383f2e4a82d?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 2,800",
        tag: "Exclusive",
        link: "/dubai/burj-khalifa-vip",
        originalPrice: 3200
    },
    {
        id: 3,
        title: "Sunset Yacht Party",
        subtitle: "with Live DJ",
        image: "https://images.unsplash.com/photo-1628029338883-61644ec68475?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 350",
        tag: "Trending",
        link: "/yacht/sunset-party",
        originalPrice: 450
    },
    {
        id: 4,
        title: "Helicopter Tour",
        subtitle: "+ Atlantis Lunch",
        image: "https://images.unsplash.com/photo-1713843956211-1e5569ab4d48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: "AED 1,200",
        tag: "Best Seller",
        link: "/sky-adventures/helicopter",
        originalPrice: 1500
    },
    {
        id: 5,
        title: "VIP Ferrari World",
        subtitle: "+ Yas Marina Drive",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200",
        price: "AED 950",
        tag: "Thrilling",
        link: "/parks/ferrari-world-vip",
        originalPrice: 1100
    },
    {
        id: 6,
        title: "Private Limousine",
        subtitle: "City Tour Experience",
        image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200",
        price: "AED 600",
        tag: "Luxury",
        link: "/transfers/limousine",
        originalPrice: 750
    },
];

const LuxuryPage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-4">Luxury Collection</h1>
                        <p className="text-neutral-500 text-lg font-light max-w-2xl">
                            Indulge in aspirational journeys crafted for discerning travelers. From private yachts to royal desert retreats.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {luxuryExperiences.map((item) => (
                            <PremiumCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                location="Dubai, UAE"
                                price={typeof item.price === 'string' ? parseInt(item.price.replace(/[^0-9]/g, '')) : item.price}
                                originalPrice={item.originalPrice}
                                badge={item.tag}
                                category="VIP Access"
                                rating={5.0}
                                subtitle={item.subtitle}
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

export default LuxuryPage;
