import { createSupabaseBrowserClient } from "@backend/lib/supabase/client";
import { Product } from "@backend/types";

const PRODUCT_SELECT = `
  id,
  title,
  slug,
  subtitle,
  rating,
  review_count,
  badge,
  location,
  thumbnail_url,
  overview,
  highlights,
  what_to_bring,
  facilities,
  cancellation_policy,
  is_refundable,
  mobile_ticket,
  confirmation_hours,
  category:categories(id, name, slug, image_url),
  destination:destinations(id, name, slug, hero_image, description),
  product_suppliers(
    id,
    price,
    display_title,
    variant_description,
    thumbnail_url,
    specific_meeting_point,
    location,
    commission_percent,
    is_active,
    supplier:suppliers(id, name, code),
    product_pricing(
      id,
      price,
      original_price,
      duration_minutes,
      pax,
      is_active
    )
  )
`;

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = createSupabaseBrowserClient();
  // Whitelist-sanitize user input to prevent PostgREST filter injection.
  // Only allow alphanumeric characters, spaces, and hyphens in search queries.
  const sanitizedQuery = query.replace(/[^a-zA-Z0-9 \-]/g, "");
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .or(
      `title.ilike.%${sanitizedQuery}%,overview.ilike.%${sanitizedQuery}%`,
    )
    .limit(20);

  if (error) {
    console.error("searchProducts:", error.message);
    return [];
  }

  return (data as unknown as Product[]) ?? [];
}
