import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Percent, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const comboDeals = [
  {
    id: "combo-1",
    title: "Dubai Ultimate Experience",
    // description: "Desert Safari + Burj Khalifa + Dubai Frame - 3 Day Package",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    originalPrice: 899,
    discountedPrice: 649,
    rating: 4.9,
    reviews: 1250,
    duration: "3 Days",
    badge: "Best Seller",
  },
  {
    id: "combo-2",
    title: "Water Adventure Bundle",
    // description: "Jet Ski + Flyboarding + Parasailing - Full Day Package",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    originalPrice: 750,
    discountedPrice: 550,
    rating: 4.8,
    reviews: 850,
    duration: "Full Day",
    badge: "Adventure",
  },
  {
    id: "combo-3",
    title: "Luxury Dubai Tour",
    // description: "Yacht Tour + Helicopter Ride + Limousine City Tour",
    image:
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80",
    originalPrice: 2499,
    discountedPrice: 1899,
    rating: 5.0,
    reviews: 420,
    duration: "2 Days",
    badge: "Luxury",
  },
  {
    id: "combo-4",
    title: "Family Fun Pass",
    image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
    originalPrice: 1200,
    discountedPrice: 899,
    rating: 4.7,
    reviews: 2100,
    duration: "Flexible",
    badge: "Family",
  },
  {
    id: "combo-5",
    title: "Cultural Heritage Tour",
    image: "https://images.unsplash.com/photo-1578556795304-30491fae929d?w=800&q=80",
    originalPrice: 450,
    discountedPrice: 299,
    rating: 4.6,
    reviews: 530,
    duration: "5 Hours",
    badge: "Culture",
  },
];

export function ComboDealsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="section-container relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-flyout-gold font-bold tracking-wider text-sm uppercase mb-3">
              <Percent className="h-4 w-4" />
              Limited Time Offers
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-neutral-900">
              Trending Experiences
            </h2>
            <p className="text-neutral-600 text-lg">
              Unlock exclusive savings on our most popular hand-picked tour packages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link to="/deals">
              <Button
                variant="ghost"
                className="group text-primary hover:bg-primary/10 hover:text-primary text-lg font-semibold"
              >
                View All Deals
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-6">
              {comboDeals.map((deal) => (
                <CarouselItem key={deal.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard
                    id={deal.id}
                    title={deal.title}
                    image={deal.image}
                    price={deal.discountedPrice}
                    originalPrice={deal.originalPrice}
                    rating={deal.rating}
                    reviews={deal.reviews}
                    duration={deal.duration}
                    tag={deal.badge}
                    location="Dubai"
                    link={`/tour/${deal.id}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6 h-12 w-12 border-none bg-white/80 backdrop-blur shadow-md hover:bg-white text-primary" />
              <CarouselNext className="-right-6 h-12 w-12 border-none bg-white/80 backdrop-blur shadow-md hover:bg-white text-primary" />
            </div>
          </Carousel>
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden text-center">
          <Link to="/deals">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
            >
              Explore All Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
