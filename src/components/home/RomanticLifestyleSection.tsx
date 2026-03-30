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
      (s.product_pricing ?? [])
        .filter((p: any) => p.is_active)
        .map((p: any) => Number(p.price)),
    );
  return prices.length > 0 ? Math.min(...prices) : 0;
}

function getOriginalPrice(product: any): number | null {
  const originals = (product.product_suppliers ?? [])
    .filter((s: any) => s.is_active)
    .flatMap((s: any) =>
      (s.product_pricing ?? [])
        .filter((p: any) => p.is_active && p.original_price)
        .map((p: any) => Number(p.original_price)),
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

export const RomanticLifestyleSection = ({ products }: Props) => {
  const [api, setApi] = useState<CarouselApi>();

  if (!products || products.length === 0) return null;

  return (
    <section className="relative pt-0 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Celebrate Life's Moments"
          label="Lifestyle & Romance"
          description="Hand-picked experiences designed for romance, proposals, celebrations and unforgettable memories."
          onPrev={() => api?.scrollPrev()}
          onNext={() => api?.scrollNext()}
          viewMoreLink="/lifestyle"
        />

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product, index) => {
              const price = getLowestPrice(product);
              const original = getOriginalPrice(product);

              return (
                <CarouselItem
                  key={product.id}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      location={
                        product.subtitle ??
                        product.location ??
                        product.destination?.name ??
                        "Dubai"
                      }
                      image={product.thumbnail_url ?? ""}
                      price={`AED ${price.toLocaleString()}`}
                      originalPrice={original ?? undefined}
                      rating={product.rating ?? 5.0}
                      reviews="Celebration"
                      tag={product.badge ?? "Romantic"}
                      link={buildHref(product)}
                      booked="Romantic"
                    />
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RomanticLifestyleSection;
