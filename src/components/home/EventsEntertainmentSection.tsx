"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

function getLowestPrice(product: any): number {
  const prices = (product.product_suppliers ?? [])
    .filter((s: any) => s.is_active)
    .flatMap((s: any) =>
      (s.product_pricing ?? []).filter((p: any) => p.is_active).map((p: any) => Number(p.price))
    );
  return prices.length > 0 ? Math.min(...prices) : 0;
}

function getOriginalPrice(product: any): number | null {
  const originals = (product.product_suppliers ?? [])
    .filter((s: any) => s.is_active)
    .flatMap((s: any) =>
      (s.product_pricing ?? [])
        .filter((p: any) => p.is_active && p.original_price)
        .map((p: any) => Number(p.original_price))
    );
  return originals.length > 0 ? Math.min(...originals) : null;
}

function buildHref(product: any): string {
  const dest = product.destination?.slug ?? "dubai";
  const cat = product.category?.slug ?? "experience";
  return `/experiences/${dest}/${cat}/${product.slug}`;
}

type Props = {
  products: any[];
};

export const EventsEntertainmentSection = ({ products }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  if (!products || products.length === 0) return null;

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
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-4">
              {products.map((product) => {
                const price = getLowestPrice(product);
                const original = getOriginalPrice(product);

                return (
                  <CarouselItem
                    key={product.id}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      location={product.location ?? product.destination?.name ?? "Dubai"}
                      image={product.thumbnail_url ?? ""}
                      price={`AED ${price.toLocaleString()}`}
                      originalPrice={original ?? undefined}
                      rating={product.rating ?? 4.8}
                      reviews={product.review_count?.toLocaleString() ?? "Active"}
                      tag={product.badge ?? "Event"}
                      link={buildHref(product)}
                      booked="Selling Fast"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsEntertainmentSection;
