/**
 * Type adapters to convert backend Product types to frontend Tour types
 * This allows gradual migration from hardcoded data to Supabase without breaking existing components
 */

import { Product as BackendProduct } from "@backend/types";
import { Tour } from "@/components/home/ExperienceSection";

/**
 * Convert a backend Product to a frontend Tour
 * Maps Supabase product structure to the simpler Tour interface used by UI components
 */
export function productToTour(product: BackendProduct): Tour {
  // Get the first (cheapest) pricing option if available
  const firstSupplier = product.product_suppliers?.[0];
  const firstPricing = firstSupplier?.product_pricing?.[0];

  const price = firstPricing?.price ?? firstSupplier?.price ?? 0;
  const originalPrice = firstPricing?.original_price ?? undefined;

  // Format duration from minutes to readable string
  const duration = firstPricing?.duration_minutes
    ? formatDuration(firstPricing.duration_minutes)
    : "Flexible";

  return {
    id: product.id,
    name: product.title,
    location: product.location || product.destination?.name || "Dubai",
    category: product.category?.name || "Experience",
    price: price,
    originalPrice: originalPrice ?? undefined,
    rating: product.rating,
    reviewCount: product.review_count,
    duration: duration,
    image:
      product.thumbnail_url || product.product_images?.[0]?.image_url || "",
    badge: product.badge || undefined,
    link: `/tour/${product.slug}`,
  };
}

/**
 * Convert an array of backend Products to frontend Tours
 */
export function productsToTours(products: BackendProduct[]): Tour[] {
  return products.map(productToTour);
}

/**
 * Format duration in minutes to a human-readable string
 */
function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else if (minutes === 60) {
    return "1 Hour";
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours} Hours`;
    }
    return `${hours}h ${mins}m`;
  } else {
    const days = Math.floor(minutes / 1440);
    return days === 1 ? "Full Day" : `${days} Days`;
  }
}

/**
 * Get the minimum price from a product's pricing options
 */
export function getProductMinPrice(product: BackendProduct): number {
  const prices: number[] = [];

  product.product_suppliers?.forEach((supplier) => {
    if (supplier.price) prices.push(supplier.price);
    supplier.product_pricing?.forEach((pricing) => {
      if (pricing.price) prices.push(pricing.price);
    });
  });

  return prices.length > 0 ? Math.min(...prices) : 0;
}

/**
 * Get price range string for a product (e.g., "AED 299" or "From AED 199")
 */
export function getProductPriceDisplay(product: BackendProduct): string {
  const minPrice = getProductMinPrice(product);
  const maxPrice = Math.max(
    ...(product.product_suppliers
      ?.flatMap((s) => [
        s.price,
        ...(s.product_pricing?.map((p) => p.price) || []),
      ])
      .filter(Boolean) || [0]),
  );

  if (minPrice === 0) return "Price on request";
  if (minPrice === maxPrice || maxPrice === 0) return `AED ${minPrice}`;
  return `From AED ${minPrice}`;
}
