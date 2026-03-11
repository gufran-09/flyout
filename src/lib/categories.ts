
import { supabase } from "@/lib/supabase";
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
    LucideIcon
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
    'attraction': Star,
    'theme-parks': Palmtree,
    'water-parks': Ship,
    'yacht': Ship,
    'luxury': Star,
    'holiday-package': Ticket, // fallback for packages if needed
    'holiday-packages': Ticket,
    'water-adventures': Compass,
    'hotel': Building2,
    'car-rental': Car,
    'dinner-cruise': Utensils,
    'sky-adventures': Plane,
    'visa': Ticket,
    'city-tours': MapPin,
    'adventures': Zap,
    'transfers': Car,
    'safari': Compass,
    'restaurants': Utensils,
    'concert': Music,
    'concerts': Music,
    'nightlife': Moon,
    'relax': Coffee,
    'family': Users,
    'desert': Sun,
};

// Map slugs to descriptions for the carousel
const DESCRIPTION_MAP: Record<string, string> = {
    'attraction': "Visit top-rated tourist spots and landmarks.",
    'theme-parks': "Experience thrill and fun at world-class parks.",
    'water-parks': "Cool off with exciting water slides and pools.",
    'yacht': "Luxury yacht rentals for private cruising.",
    'holiday-packages': "All-inclusive vacation deals for every budget.",
    'water-adventures': "Jet skis, flyboarding, and marine activities.",
    'hotel': "Stay at the finest hotels and resorts.",
    'car-rental': "Premium and economy cars for your journey.",
    'dinner-cruise': "Dine under the stars on a traditional dhow.",
    'sky-adventures': "Helicopter tours, skydiving, and balloon rides.",
    'visa': "Hassle-free visa services for your travel.",
    'city-tours': "Explore the city's heritage and modern marvels.",
    'adventures': "Adrenaline-pumping activities for thrill-seekers.",
    'transfers': "Seamless airport and city transfers.",
    'safari': "Desert safaris with dune bashing and BBQ.",
    'restaurants': "Culinary delights from top-rated restaurants.",
    'concert': "Live music, performances, and cultural shows.",
};

// Map slugs to colors for the carousel
const COLOR_MAP: Record<string, string> = {
    'attraction': "from-amber-600 to-yellow-500",
    'theme-parks': "from-blue-600 to-cyan-500",
    'water-parks': "from-blue-500 to-indigo-500",
    'yacht': "from-emerald-600 to-teal-500",
    'holiday-packages': "from-purple-600 to-pink-500",
    'water-adventures': "from-cyan-600 to-blue-500",
    'hotel': "from-rose-600 to-red-500",
    'car-rental': "from-zinc-600 to-neutral-500",
    'dinner-cruise': "from-orange-600 to-amber-500",
    'sky-adventures': "from-sky-600 to-blue-500",
    'visa': "from-green-600 to-emerald-500",
    'city-tours': "from-amber-700 to-yellow-600",
    'adventures': "from-red-600 to-orange-500",
    'transfers': "from-slate-600 to-gray-500",
    'safari': "from-orange-700 to-red-600",
    'restaurants': "from-rose-500 to-pink-500",
    'concert': "from-violet-600 to-purple-500",
};

// Map DB slugs to Frontend slugs (matching App.tsx routes)
const SLUG_MAPPING: Record<string, string> = {
    'water-adventure': 'water-adventures',
    'attraction': 'attractions',
    'sky-adventure': 'sky-adventures',
    'restaurant': 'restaurants',
    'hotel': 'hotels',
    'adventure': 'adventures',
    'holiday-package': 'packages',
    'holiday-packages': 'packages',
};

import { toast } from "sonner";

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        toast.error("Failed to load categories. Please check connection or API keys.");
        return [];
    }

    return (data || []).map((cat: any) => {
        // Use mapped slug if available, otherwise original
        const appSlug = SLUG_MAPPING[cat.slug] || cat.slug;

        return {
            ...cat,
            slug: appSlug, // Update slug to match app routes
            icon: ICON_MAP[appSlug] || Star, // Use appSlug for lookups
            description: DESCRIPTION_MAP[appSlug] || "Explore our amazing collection.",
            color: COLOR_MAP[appSlug] || "from-blue-600 to-cyan-500",
            link: `/dubai/${appSlug}` // Dynamic link based on appSlug
        };
    });
}
