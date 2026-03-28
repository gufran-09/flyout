import { Tour } from "@/components/home/ExperienceSection";
import { PRODUCTS, Product } from "@/data/catalog";

function getLowestPrice(product: Product): number {
  if (!product.durationOptions || product.durationOptions.length === 0) {
    return 0;
  }

  return Math.min(...product.durationOptions.map((option) => option.price));
}

function getLowestOriginalPrice(product: Product): number | undefined {
  const originals = product.durationOptions
    .map((option) => option.originalPrice)
    .filter((price): price is number => typeof price === "number");

  if (originals.length === 0) {
    return undefined;
  }

  return Math.min(...originals);
}

function toTour(product: Product): Tour {
  return {
    id: product.id,
    name: product.title,
    subtitle: product.subtitle,
    location: product.location,
    category: product.category,
    price: getLowestPrice(product),
    originalPrice: getLowestOriginalPrice(product),
    rating: product.rating,
    reviewCount: product.reviewCount,
    duration: product.durationOptions[0]?.label || "Flexible",
    image: product.images[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    badge: product.badges[0],
    link: `/experiences/${product.destination}/${product.category}/${product.slug}`,
  };
}

function byCategory(category: string): Tour[] {
  return PRODUCTS.filter((product) => product.category === category).map(toTour);
}

function byDestination(destination: string): Tour[] {
  return PRODUCTS.filter((product) => product.destination === destination).map(toTour);
}

export const dubaiThemeParks = byCategory("theme-parks");
export const dubaiWaterParks = byCategory("water-parks");
export const dubaiAttractions = byCategory("attractions");
export const dubaiWaterSports = byCategory("water-sports");
export const dubaiDinnerCruise = byCategory("dinner-cruise");
export const dubaiYacht = byCategory("yacht");
export const dubaiLimousine = byCategory("limousine");

export const abuDhabiExperiences = byDestination("abu-dhabi");
export const staycations = byCategory("staycations");

export const allDubaiExperiences = byDestination("dubai");
