import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface Tour {
  id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  badge?: string;
  subtitle?: string;
  link?: string;
}

interface ExperienceSectionProps {
  title: string;
  subtitle?: string;
  tours: Tour[];
  viewMoreLink: string;
  className?: string;
}

export function ExperienceSection({
  title,
  subtitle,
  tours,
  viewMoreLink,
  className,
}: ExperienceSectionProps) {
  return (
    <section className={cn("py-16 overflow-hidden bg-white", className)}>
      <div className="section-container relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight text-neutral-900">{title}</h2>
            {subtitle && (
              <p className="text-neutral-500 text-lg">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link to={viewMoreLink}>
              <Button
                variant="ghost"
                className="group text-flyout-gold hover:bg-flyout-gold/10 hover:text-flyout-gold text-base font-medium"
              >
                View More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-6">
              {tours.map((tour) => (
                <CarouselItem key={tour.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard
                    id={tour.id}
                    title={tour.name}
                    image={tour.image}
                    price={tour.price}
                    originalPrice={tour.originalPrice}
                    rating={tour.rating}
                    reviews={tour.reviewCount}
                    duration={tour.duration}
                    tag={tour.badge}
                    location={tour.location}
                    link={tour.link || `/tour/${tour.id}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6 h-10 w-10 border-none bg-white/80 backdrop-blur shadow-md hover:bg-white text-neutral-900" />
              <CarouselNext className="-right-6 h-10 w-10 border-none bg-white/80 backdrop-blur shadow-md hover:bg-white text-neutral-900" />
            </div>
          </Carousel>
        </motion.div>

        {/* Mobile View More Button */}
        <div className="mt-8 md:hidden text-center px-4">
          <Link to={viewMoreLink}>
            <Button
              variant="outline"
              className="w-full border-neutral-200 text-neutral-900 hover:bg-neutral-50"
            >
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
