"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Plane,
  Hotel,
  ShieldCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── This section links to category pages, not individual products.
// ── It stays static — no Supabase data needed here.
// ── If you want to show real products, use the Signature section instead.

const essentials = [
  {
    id: 1,
    title: "Airport Transfers",
    description: "Seamless pickups & drop-offs worldwide.",
    icon: Car,
    link: "/dubai/transfers",
    color: "text-blue-400",
  },
  {
    id: 2,
    title: "Visa Assistance",
    description: "Hassle-free visa processing for UAE.",
    icon: ShieldCheck,
    link: "/dubai/visa",
    color: "text-emerald-400",
  },
  {
    id: 3,
    title: "Hotel Bookings",
    description: "Best rates on luxury & budget stays.",
    icon: Hotel,
    link: "/dubai/hotels",
    color: "text-rose-400",
  },
  {
    id: 4,
    title: "Chauffeur Services",
    description: "Premium cars with professional drivers.",
    icon: Briefcase,
    link: "/dubai/limousine",
    color: "text-amber-400",
  },
  {
    id: 5,
    title: "Holiday Packages",
    description: "All-inclusive deals for your perfect trip.",
    icon: Plane,
    link: "/dubai/packages",
    color: "text-violet-400",
  },
];

const ServiceCard = ({ item }: { item: (typeof essentials)[0] }) => (
  <Link
    href={item.link}
    className="group relative flex items-center p-4 bg-white border border-neutral-200 rounded-xl
      hover:bg-neutral-50 hover:border-flyout-gold/30 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-flyout-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10 flex items-center gap-4 w-full">
      <div
        className={cn(
          "w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center transition-colors group-hover:bg-white",
          item.color,
        )}
      >
        <item.icon className="w-6 h-6" />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-neutral-900 group-hover:text-flyout-gold transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-500 group-hover:text-neutral-700 transition-colors line-clamp-1">
          {item.description}
        </p>
      </div>

      <div
        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center
        text-neutral-400 group-hover:text-flyout-gold group-hover:border-flyout-gold/30 transition-all"
      >
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </Link>
);

// ── No products prop needed — this section is purely navigational ──
export const TravelEssentialsSection = () => {
  return (
    <section className="py-20 bg-white relative border-t border-neutral-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-flyout-gold font-medium text-sm md:text-base tracking-[0.2em] uppercase mb-4">
              Seamless Journey
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-6">
              Everything You Need for a Perfect Trip
            </h3>
            <p className="text-neutral-600 text-lg font-light">
              We don't just sell activities. We handle the whole journey with
              our premium travel services.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {essentials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                index === essentials.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : "",
              )}
            >
              <ServiceCard item={item} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/categories"
              className="group flex flex-col justify-center items-center p-6 bg-flyout-gold/5
                border border-flyout-gold/20 rounded-xl hover:bg-flyout-gold/10 transition-all text-center h-full"
            >
              <h3 className="font-semibold text-flyout-gold mb-1">
                View All Services
              </h3>
              <p className="text-sm text-flyout-gold/70">
                Explore our full range of travel solutions
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TravelEssentialsSection;
