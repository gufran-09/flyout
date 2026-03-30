import { createSupabaseServerClient } from "@backend/lib/supabase/server";
import { SiteSettings } from "@backend/types";

export async function getHeroContent(): Promise<SiteSettings> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("hero_title, hero_subtitle, hero_image")
    .single();

  if (error || !data) {
    return {
      hero_title: "Discover UAE's Magic",
      hero_subtitle: "Book unforgettable experiences across the Emirates",
      hero_image: null,
    };
  }

  return data;
}

export async function getSeoMeta(pageSlug: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("seo_meta")
    .select("meta_title, meta_description")
    .eq("page_slug", pageSlug)
    .single();

  return data ?? null;
}
