"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Link from "next/link";
import { getCategories, Category } from "@/lib/categories";
import { cn } from "@/lib/utils";



const CategoryCard = ({ category }: { category: Category }) => {
    const href = category.link || `/dubai/${category.slug}`;
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href} className="block" aria-label={`Explore ${category.name}`}>
            <motion.div
                className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full">
                    <motion.img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                </div>

                {/* Subtle Gradient at Bottom Only - For text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-primary/30 rounded-2xl shadow-[0_0_30px_rgba(255,191,25,0.2)]" />

                {/* Content layout */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center z-10">
                    {/* Glassmorphic Text Container */}
                    <div className="relative overflow-hidden px-6 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors duration-300 w-full">
                        <h3 className="text-white text-lg font-bold uppercase tracking-wider font-serif drop-shadow-md">
                            {category.name}
                        </h3>
                        <motion.div
                            className="h-[2px] bg-primary mt-2 mx-auto w-0 group-hover:w-1/2 transition-all duration-300"
                        />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

/**
 * A single marquee row. 
 * direction: "left" → scrolls left (normal), "right" → scrolls right (reverse).
 * Cards pause the entire row on hover via CSS animation-play-state.
 */
const MarqueeRow = ({
    categories,
    direction = "left",
    duration = 80,
}: {
    categories: Category[];
    direction?: "left" | "right";
    duration?: number;
}) => {
    const [paused, setPaused] = useState(false);

    const animationName = direction === "left" ? "scroll-left" : "scroll-right";

    return (
        <div className="flex w-full overflow-hidden select-none">
            <style>{`
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            <div
                className="flex gap-6 px-4"
                style={{
                    width: "max-content",
                    animation: `${animationName} ${duration}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Render twice for seamless loop */}
                {categories.map((cat, index) => (
                    <CategoryCard key={`r1-${index}`} category={cat} />
                ))}
                {categories.map((cat, index) => (
                    <CategoryCard key={`r2-${index}`} category={cat} />
                ))}
            </div>
        </div>
    );
};

const CategoriesCarousel = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);

    if (categories.length === 0) {
        return null;
    }

    // Split categories into two halves for variety; if you want all in both rows, just pass `categories` to both.
    const half = Math.ceil(categories.length / 2);
    const firstRow = categories;
    const secondRow = [...categories.slice(half), ...categories.slice(0, half)]; // offset for visual variety

    return (
        <section className="w-full py-20 bg-white overflow-hidden relative">
            {/* Decorative Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-[20]" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-[20]" />

            {/* Header */}
            <div className="container mx-auto px-6 mb-12 relative z-20 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-serif text-neutral-900 mb-3 tracking-wide"
                >
                    Curated Categories
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-neutral-500 font-light text-sm md:text-base tracking-[0.2em] uppercase"
                >
                    Discover your perfect experience
                </motion.p>
            </div>

            {/* Row 1 — scrolls LEFT */}
            <div className="mb-6">
                <MarqueeRow categories={firstRow} direction="left" duration={80} />
            </div>

            {/* Row 2 — scrolls RIGHT */}
            <MarqueeRow categories={secondRow} direction="right" duration={90} />
        </section>
    );
};

export default CategoriesCarousel;
