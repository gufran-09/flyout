import { supabase } from "./supabase";

export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from("products")
        .select(`
      title,
      subtitle,
      overview,
      rating,
      review_count,
      highlights,
      what_to_bring,
      facilities,
      product_images (
        image_url,
        position
      ),
      product_pricing (
        duration_minutes,
        price,
        original_price
      )
    `)
        .eq("slug", slug)
        .single();

    if (error) throw error;

    return data;
}
