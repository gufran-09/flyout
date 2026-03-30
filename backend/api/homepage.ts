// backend/api/homepage.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";

const CARD_SELECT = `
  id, title, slug, subtitle, rating, review_count,
  badge, location, thumbnail_url,
  category:categories(name, slug),
  destination:destinations(name, slug),
  product_suppliers(
    is_active,
    product_pricing(price, original_price, is_active)
  )
`;

export async function getMostBooked() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_most_booked", true)
    .limit(8);
  return data ?? [];
}

export async function getLuxuryProducts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_luxury", true)
    .limit(8);
  return data ?? [];
}

export async function getLifestyleProducts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_lifestyle", true)
    .limit(6);
  return data ?? [];
}

export async function getExploreProducts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_explore", true)
    .limit(8);
  return data ?? [];
}

export async function getEventsProducts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_events", true)
    .limit(6);
  return data ?? [];
}

export async function getSignatureProducts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select(CARD_SELECT)
    .eq("is_signature", true)
    .limit(6);
  return data ?? [];
}
