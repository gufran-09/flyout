import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

import {
  Plane,
  Building2,
  Palmtree,
  Ship,
  Compass,
  Ticket,
  Utensils,
  Car,
  Star,
  Zap,
  Users,
  Sun,
  Music,
  Coffee,
  Moon,
  MapPin,
  LucideIcon,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  // Computed properties for UI
  icon?: LucideIcon;
  description?: string;
  color?: string;
  link?: string;
}

// Map slugs to icons
const ICON_MAP: Record<string, LucideIcon> = {
  // Database category slugs
  attraction: Star,
  attractions: Star,
  parks: Palmtree,
  yacht: Ship,
  "holiday-package": Ticket,
  "holiday-packages": Ticket,
  "water-adventures": Compass,
  hotel: Building2,
  hotels: Building2,
  car: Car,
  "car-rental": Car,
  "dinner-cruise": Utensils,
  "sky-adventure": Plane,
  "sky-adventures": Plane,
  "vise-services": Ticket,
  visa: Ticket,
  "city-tours": MapPin,
  adventure: Zap,
  adventures: Zap,
  safari: Sun,
  "desert-safari": Sun,
  restaurant: Utensils,
  restaurants: Utensils,
  games: Music,
  shows: Music,
  Cruises: Ship,
  // Additional mappings
  "theme-parks": Palmtree,
  "water-parks": Ship,
  "water-sports": Compass,
  transfers: Car,
  limousine: Car,
  supercars: Car,
  concert: Music,
  concerts: Music,
  nightlife: Moon,
  relax: Coffee,
  family: Users,
  desert: Sun,
  luxury: Star,
};

// Map slugs to descriptions for the carousel
const DESCRIPTION_MAP: Record<string, string> = {
  attraction: "Visit top-rated tourist spots and landmarks.",
  attractions: "Visit top-rated tourist spots and landmarks.",
  parks: "Experience thrill and fun at world-class parks.",
  "theme-parks": "Experience thrill and fun at world-class parks.",
  "water-parks": "Cool off with exciting water slides and pools.",
  yacht: "Luxury yacht rentals for private cruising.",
  "holiday-package": "All-inclusive vacation deals for every budget.",
  "holiday-packages": "All-inclusive vacation deals for every budget.",
  packages: "All-inclusive vacation deals for every budget.",
  "water-adventures": "Jet skis, flyboarding, and marine activities.",
  hotel: "Stay at the finest hotels and resorts.",
  hotels: "Stay at the finest hotels and resorts.",
  car: "Premium and economy cars for your journey.",
  "car-rental": "Premium and economy cars for your journey.",
  "dinner-cruise": "Dine under the stars on a traditional dhow.",
  "sky-adventure": "Helicopter tours, skydiving, and balloon rides.",
  "sky-adventures": "Helicopter tours, skydiving, and balloon rides.",
  "vise-services": "Hassle-free visa services for your travel.",
  visa: "Hassle-free visa services for your travel.",
  "city-tours": "Explore the city's heritage and modern marvels.",
  adventure: "Adrenaline-pumping activities for thrill-seekers.",
  adventures: "Adrenaline-pumping activities for thrill-seekers.",
  transfers: "Seamless airport and city transfers.",
  safari: "Desert safaris with dune bashing and BBQ.",
  "desert-safari": "Desert safaris with dune bashing and BBQ.",
  restaurant: "Culinary delights from top-rated restaurants.",
  restaurants: "Culinary delights from top-rated restaurants.",
  games: "Live music, performances, and cultural shows.",
  shows: "Live music, performances, and cultural shows.",
  Cruises: "Cruise experiences and maritime adventures.",
  concert: "Live music, performances, and cultural shows.",
  limousine: "Luxury limousine services and transfers.",
  supercars: "Drive exotic supercars and luxury vehicles.",
};

// Map slugs to colors for the carousel
const COLOR_MAP: Record<string, string> = {
  attraction: "from-amber-600 to-yellow-500",
  "theme-parks": "from-blue-600 to-cyan-500",
  "water-parks": "from-blue-500 to-indigo-500",
  yacht: "from-emerald-600 to-teal-500",
  "holiday-packages": "from-purple-600 to-pink-500",
  "water-adventures": "from-cyan-600 to-blue-500",
  hotel: "from-rose-600 to-red-500",
  "car-rental": "from-zinc-600 to-neutral-500",
  "dinner-cruise": "from-orange-600 to-amber-500",
  "sky-adventures": "from-sky-600 to-blue-500",
  visa: "from-green-600 to-emerald-500",
  "city-tours": "from-amber-700 to-yellow-600",
  adventures: "from-red-600 to-orange-500",
  transfers: "from-slate-600 to-gray-500",
  safari: "from-orange-700 to-red-600",
  restaurants: "from-rose-500 to-pink-500",
  concert: "from-violet-600 to-purple-500",
};

// Map DB slugs to Frontend slugs (matching page routes)
const SLUG_MAPPING: Record<string, string> = {
  "water-adventure": "water-adventures",
  attraction: "attractions",
  "sky-adventure": "sky-adventures",
  restaurant: "restaurants",
  hotel: "hotels",
  adventure: "adventures",
  "holiday-package": "packages",
  "vise-services": "visa",
  car: "car-rental",
  "car rental": "car-rental",
  parks: "theme-parks", // Default parks to theme-parks
  games: "shows",
};

import { toast } from "sonner";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    toast.error(
      "Failed to load categories. Please check connection or API keys.",
    );
    return [];
  }

  return (data || []).map((cat: any) => {
    // Use mapped slug if available, otherwise original
    const appSlug = SLUG_MAPPING[cat.slug] || cat.slug;
    const isCarRentalCategory =
      appSlug === "car-rental" ||
      cat.slug === "car rental" ||
      cat.name?.toLowerCase() === "car rental";

    return {
      ...cat,
      slug: appSlug, // Update slug to match app routes
      icon: ICON_MAP[appSlug] || Star, // Use appSlug for lookups
      description:
        DESCRIPTION_MAP[appSlug] || "Explore our amazing collection.",
      color: COLOR_MAP[appSlug] || "from-blue-600 to-cyan-500",
      link: isCarRentalCategory ? "/dubai/car-rental" : `/dubai/${appSlug}`,
    };
  });
}
