import { createSupabaseServerClient } from "@backend/lib/supabase/server";

export async function getSuppliersByProduct(productId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("product_suppliers")
    .select(
      `
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
    `,
    )
    .eq("product_id", productId)
    .eq("is_active", true);

  if (error) {
    console.error("getSuppliersByProduct:", error.message);
    return [];
  }

  return data ?? [];
}
