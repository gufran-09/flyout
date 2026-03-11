import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    label?: string;
    title: string;
    description?: string;
    viewMoreLink?: string;
    viewMoreLabel?: string;
    onPrev?: () => void;
    onNext?: () => void;
    className?: string;
    canScrollPrev?: boolean;
    canScrollNext?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    label,
    title,
    description,
    viewMoreLink,
    viewMoreLabel = "Explore All",
    onPrev,
    onNext,
    className,
    canScrollPrev = true,
    canScrollNext = true,
}) => {
    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6", className)}>
            {/* Left: Content */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                {label && (
                    <h2 className="text-flyout-gold font-medium text-sm md:text-base tracking-[0.2em] uppercase mb-3">
                        {label}
                    </h2>
                )}
                <h3 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-tight mb-4">
                    {title}
                </h3>
                {description && (
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-xl">
                        {description}
                    </p>
                )}
            </motion.div>

            {/* Right: Actions */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-6"
            >
                {/* View More Link */}
                {viewMoreLink && (
                    <Link
                        to={viewMoreLink}
                        className="flex items-center gap-2 group text-sm font-medium text-neutral-900 hover:text-flyout-gold transition-colors uppercase tracking-wider"
                    >
                        {viewMoreLabel}
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-flyout-gold group-hover:text-white transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </Link>
                )}

                {/* Separator */}
                {(onPrev || onNext) && viewMoreLink && (
                    <div className="block w-px h-8 bg-neutral-200" />
                )}

                {/* Arrow Controls */}
                {(onPrev || onNext) && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onPrev}
                            disabled={!canScrollPrev}
                            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-flyout-gold hover:text-flyout-gold hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onNext}
                            disabled={!canScrollNext}
                            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-flyout-gold hover:text-flyout-gold hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
