import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowUpRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface PremiumCardProps {
    id: string | number;
    title: string;
    image: string;
    location: string;
    price: number | string;
    originalPrice?: number | string;
    category?: string;
    rating?: number;
    badge?: string;
    subtitle?: string;
    className?: string;
    link?: string;
}

export const PremiumCard = ({
    id,
    title,
    image,
    location,
    price,
    originalPrice,
    category,
    rating,
    badge,
    subtitle,
    className,
    link = "#",
}: PremiumCardProps) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : Number(price);
    const numericOriginalPrice = originalPrice ? (typeof originalPrice === 'string' ? parseFloat(originalPrice.replace(/[^0-9.]/g, '')) : Number(originalPrice)) : 0;
    const hasDiscount = originalPrice && numericOriginalPrice > numericPrice;
    const discountPercentage = hasDiscount ? Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100) : 0;

    const formattedPrice = typeof price === "number" ? price.toLocaleString() : price;
    const formattedOriginalPrice =
        typeof originalPrice === "number" ? originalPrice.toLocaleString() : originalPrice;

    return (
        <Link to={link} className={cn("block group relative h-full ", className)}>
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative h-full min-h-[500px] w-full overflow-hidden rounded-[22px] bg-white shadow-luxury hover:shadow-luxury-hover border border-neutral-100/80 flex flex-col"
            >
                {/* ---------------- IMAGE ---------------- */}
                <div className="relative h-[260px] w-full shrink-0 overflow-hidden">
                    <motion.img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    {/* Badge Container */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
                        {badge && (
                            <span className="px-3 py-1 bg-white/95 backdrop-blur-md shadow-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-[#0A1F44] border border-white/20">
                                {badge}
                            </span>
                        )}


                    </div>

                    {/* Category */}
                    {category && (
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-[#0A1F44]/85 backdrop-blur-md shadow-sm rounded-full text-[10px] font-medium uppercase tracking-widest text-flyout-gold border border-white/10 flex items-center gap-1.5">
                                <Crown className="w-3 h-3 text-flyout-gold" />
                                {category}
                            </span>
                        </div>
                    )}
                </div>

                {/* ---------------- CONTENT ---------------- */}
                <div className="p-5 flex-1 grid grid-rows-[20px_56px_20px_24px_1fr_auto] gap-y-1 min-h-0">

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-neutral-400 overflow-hidden">
                        <MapPin className="w-3.5 h-3.5 text-flyout-gold shrink-0" />
                        <span className="text-xs font-medium uppercase tracking-wide truncate">
                            {location || "Dubai, UAE"}
                        </span>
                    </div>

                    {/* Title – locked to 2 lines */}
                    <div className="flex items-center min-h-0">
                        <h3 className="font-display text-[22px] leading-[28px] max-h-[56px] overflow-hidden line-clamp-2 text-[#0A1F44] group-hover:text-flyout-gold transition-colors">
                            {title}
                        </h3>
                    </div>

                    {/* Subtitle – single row */}
                    <div className="flex items-center min-h-0">
                        {subtitle ? (
                            <p className="text-xs text-neutral-500 font-medium truncate">
                                {subtitle}
                            </p>
                        ) : (
                            <div className="h-[14px]" />
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center min-h-0">
                        {rating ? (
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-flyout-gold text-flyout-gold" />
                                <span className="text-sm font-semibold text-neutral-900">{rating}</span>
                                <span className="text-xs text-neutral-400 ml-1">Premium Experience</span>
                            </div>
                        ) : (
                            <div className="h-4" />
                        )}
                    </div>

                    {/* Spacer */}
                    <div className="min-h-0 overflow-hidden" />

                    {/* Footer */}
                    <div className="flex items-end justify-between pt-2 pb-2 border-t border-neutral-100">

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                Starting from
                            </span>
                            <div className="flex flex-col mt-1">
                                <p className="text-xl font-bold text-[#0A1F44] font-display flex items-center">
                                    <img src="/currency-symbol.png" alt="AED" className="h-4 mr-1" />
                                    {formattedPrice}
                                </p>

                                {formattedOriginalPrice && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-neutral-400 line-through flex items-center">
                                            <img src="/currency-symbol.png" alt="AED" className="h-2.5 mr-0.5 opacity-60 grayscale" />
                                            {formattedOriginalPrice}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-xs font-bold text-emerald-600">
                                                {discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-[#0A1F44] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#0A1F44]/90 transition-all flex items-center gap-2 h-9"
                        >
                            Explore
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};
