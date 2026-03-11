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
import { BrandStorySection } from "@/components/home/BrandStorySection"

const Index = () => {
  return (
    <Layout>
      <HeroSection />

      <SectionTitle />
      <UaeShowcaseSection />
      <CategoriesCarousel />
      <MostBookedSection />
      <LuxuryExperiencesSection />
      <RomanticLifestyleSection />
      <CuratedCollectionsSection />
      <EventsEntertainmentSection />
      <TravelEssentialsSection />
      <TestimonialsSection />
      <BrandStorySection />
    </Layout>
  );
};

export default Index;
