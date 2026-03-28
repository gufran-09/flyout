// src/app/page.tsx
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionTitle } from "@/components/home/SectionTitle";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import UaeShowcaseSection from "@/components/home/UaeShowcaseSection";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import LuxuryExperiencesSection from "@/components/home/LuxuryExperiencesSection";
import RomanticLifestyleSection from "@/components/home/RomanticLifestyleSection";
import CuratedCollectionsSection from "@/components/home/CuratedCollectionsSection";
import MostBookedSection from "@/components/home/MostBookedSection";
import EventsEntertainmentSection from "@/components/home/EventsEntertainmentSection";
import TravelEssentialsSection from "@/components/home/TravelEssentialsSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const revalidate = 600;

const CARD_SELECT = `
  id,
  title,
  slug,
  subtitle,
  rating,
  review_count,
  badge,
  location,
  thumbnail_url,
  category:categories(name, slug),
  destination:destinations(name, slug),
  product_suppliers(
    is_active,
    product_pricing(price, original_price, is_active)
  )
`;

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const [
    { data: mostBooked },
    { data: luxury },
    { data: lifestyle },
    { data: events },
    { data: destinations },
    { data: categories },
  ] = await Promise.all([
    supabase.from("products").select(CARD_SELECT).eq("is_most_booked", true).eq("is_active", true).order("review_count", { ascending: false }).limit(8),
    supabase.from("products").select(CARD_SELECT).eq("is_luxury", true).eq("is_active", true).limit(8),
    supabase.from("products").select(CARD_SELECT).eq("is_lifestyle", true).eq("is_active", true).limit(6),
    supabase.from("products").select(CARD_SELECT).eq("is_events", true).eq("is_active", true).limit(6),
    supabase.from("destinations").select("id, name, slug, hero_image, description"),
    supabase.from("categories").select("id, name, slug, image_url").order("name"),
  ]);

  return (
    <Layout>
      <HeroSection />
      <SectionTitle />
      <UaeShowcaseSection destinations={destinations ?? []} />
      <CategoriesCarousel categories={categories ?? []} />
      <MostBookedSection products={mostBooked ?? []} />
      <LuxuryExperiencesSection products={luxury ?? []} />
      <RomanticLifestyleSection products={lifestyle ?? []} />
      <CuratedCollectionsSection categories={categories ?? []} />
      <EventsEntertainmentSection products={events ?? []} />
      <TravelEssentialsSection />
      <TestimonialsSection />
      <BrandStorySection />
    </Layout>
  );
}
