import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Clock, Flame, Users, MapPin, Heart, Crown } from "lucide-react";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    id: string | number;
    title: string;
    image: string;
    price: string | number;
    originalPrice?: string | number;
    rating?: number;
    reviews?: string | number;
    duration?: string;
    location?: string;
    link: string;
    tag?: string;
    booked?: string;
    category?: string;
    variant?: "default" | "luxury";
    subtitle?: string;
    className?: string;
}

export const ProductCard = ({
    id,
    title,
    image,
    price,
    originalPrice,
    rating,
    reviews,
    duration,
    location,
    link,
    tag,
    booked,
    category,
    variant = "default",
    subtitle,
    className
}: ProductCardProps) => {

    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : Number(price);
    const numericOriginalPrice = originalPrice ? (typeof originalPrice === 'string' ? parseFloat(originalPrice.replace(/[^0-9.]/g, '')) : Number(originalPrice)) : 0;
    const hasDiscount = originalPrice && numericOriginalPrice > numericPrice;
    const discountPercentage = hasDiscount ? Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100) : 0;

    return (
        <Link
            to={link}
            className={cn(
                "group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-luxury border border-flyout-gold/20 hover:shadow-luxury-hover hover:border-flyout-gold/30 transition-all duration-500 ease-out hover:-translate-y-1",
                className
            )}
        >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Left Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
                    {tag && (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md shadow-sm rounded-full 
              text-[10px] font-medium uppercase tracking-widest text-flyout-gold ring-1 ring-white/50 flex items-center gap-1.5">
                            {tag === "Best Seller" && <Flame className="w-3 h-3 text-orange-500/80" />}
                            {tag}
                        </span>
                    )}


                </div>

                {/* Category Badge */}
                {category && (
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full 
              text-[10px] font-medium uppercase tracking-widest text-neutral-600 ring-1 ring-white/50">
                            {(category.toLowerCase() === 'water-sports' || category.toLowerCase() === 'water sports' ? 'Water Adventures' : category).replace(/-/g, ' ')}
                        </span>
                    </div>
                )}

                {/* Booked Count / Bottom Badge */}
                {booked && (
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full 
              text-[10px] font-light text-neutral-900 tracking-[0.2em] flex items-center gap-1.5 border border-white/40">
                            {variant === "luxury" ? (
                                <Crown className="w-3 h-3 text-flyout-gold" />
                            ) : (
                                <Users className="w-3 h-3 text-flyout-gold" />
                            )}
                            {booked}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                {/* Rating or Luxury Label */}
                {variant === "luxury" ? (
                    <div className="flex items-center gap-2 mb-3 text-flyout-gold/90">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                            Luxury Collection
                        </span>
                    </div>
                ) : (
                    (rating || reviews) && (
                        <div className="flex items-center gap-2 mb-3 text-flyout-gold/90">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {rating && <span className="text-sm font-bold text-neutral-900">{rating}</span>}
                            {reviews && <span className="text-xs text-neutral-400 font-light">({reviews})</span>}
                        </div>
                    )
                )}

                <h3 className="font-serif text-2xl text-neutral-900 mb-2 leading-tight group-hover:text-flyout-gold transition-colors duration-300 line-clamp-2">
                    {title}
                </h3>

                {subtitle && (
                    <p className="text-sm text-neutral-500 mb-5 line-clamp-2 font-light">{subtitle}</p>
                )}

                {location && !subtitle && (
                    <p className="text-sm text-neutral-500 mb-5 line-clamp-1 font-light">{location}</p>
                )}

                {variant === "luxury" ? (
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-5 font-light tracking-wide">
                        <div className="flex items-center gap-1.5">
                            {/* Use a shield or similar icon here if needed, or just text */}
                            <span>Private access</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span>Curated host</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-5 font-light tracking-wide">
                        {duration && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-flyout-gold/70" />
                                {duration}
                            </div>
                        )}
                        {duration && <span className="w-1 h-1 rounded-full bg-neutral-300" />}
                        <span>Best Price Guarantee</span>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-100/60">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-0.5">From</span>
                        <PriceDisplay price={price} originalPrice={originalPrice} />
                    </div>

                    <div
                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center 
            text-neutral-400 group-hover:border-flyout-gold group-hover:text-flyout-gold transition-all duration-500"
                    >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
