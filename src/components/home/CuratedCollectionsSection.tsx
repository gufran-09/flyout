"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// ── Collection card — unchanged styling ───────────────────────
type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description?: string | null;
};

const CollectionCard = ({ item }: { item: CategoryItem }) => {
  const href = `/dubai/${item.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full bg-white rounded-[28px] overflow-hidden
        shadow-md border border-flyout-gold/20 hover:shadow-xl hover:border-black/5
        transition-all duration-500 ease-out hover:-translate-y-1.5"
    >
      {/* Full Bleed Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[28px]">
        <motion.img
          src={item.image_url ?? "/images/placeholder.jpg"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow px-7 py-6">
        {/* Badges Row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
            Collection
          </span>
          <div className="flex items-center gap-1.5 text-flyout-gold">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[11px] font-medium tracking-wide opacity-80 uppercase">
              Curated for you
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[26px] text-neutral-900 mb-2 leading-tight font-medium group-hover:text-flyout-gold transition-colors duration-300">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-neutral-500 mb-8 font-light leading-relaxed line-clamp-2">
          {item.description ??
            `Explore the best ${item.name} experiences in the UAE`}
        </p>

        {/* Footer / Action Row */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-100/80">
          <span className="text-sm font-semibold tracking-wide text-flyout-gold group-hover:text-flyout-gold/80 transition-colors">
            View Collection
          </span>
          <div
            className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center
            text-neutral-400 group-hover:bg-flyout-gold group-hover:border-flyout-gold group-hover:text-white
            transition-all duration-300 shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// ── props ──────────────────────────────────────────────────────
type Props = {
  // accepts real Supabase category rows
  categories: CategoryItem[];
};

export const CuratedCollectionsSection = ({ categories }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="relative pt-0 pb-0 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Curated for Every Traveler"
          label="Explore by Experience"
          description="Browse our hand-picked collections designed to match your travel style and intent."
          onPrev={() => api?.scrollPrev()}
          onNext={() => api?.scrollNext()}
          viewMoreLink="/collections"
        />

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <CollectionCard item={item} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;
