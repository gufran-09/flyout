// src/types/index.ts

export type Destination = {
  id: string;
  name: string;
  slug: string;
  hero_image: string | null;
  description: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
};

export type ProductPricing = {
  id: string;
  price: number;
  original_price: number | null;
  duration_minutes: number;
  pax: number;
  is_active: boolean;
};

export type ProductSupplier = {
  id: string;
  price: number;
  display_title: string | null;
  variant_description: string | null;
  thumbnail_url: string | null;
  specific_meeting_point: string | null;
  location: string | null;
  is_active: boolean;
  supplier?: {
    id: string;
    name: string;
    code: string;
  };
  product_pricing: ProductPricing[];
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  rating: number;
  review_count: number;
  badge: string | null;
  thumbnail_url: string | null;
  location: string | null;
  overview: string;
  highlights: string[];
  what_to_bring: string[];
  facilities: string[];
  cancellation_policy: string | null;
  is_refundable: boolean;
  mobile_ticket: boolean;
  category: Category;
  destination: Destination;
  product_suppliers: ProductSupplier[];
  product_images?: { id: string; image_url: string; position: number }[];
};

// Helper — get the lowest price across all active suppliers
export function getLowestPrice(product: Product): number {
  const prices = product.product_suppliers
    .filter((s) => s.is_active)
    .flatMap((s) =>
      s.product_pricing.filter((p) => p.is_active).map((p) => p.price),
    );
  return prices.length > 0 ? Math.min(...prices) : 0;
}

// Helper — get the original price for discount display
export function getOriginalPrice(product: Product): number | null {
  const originals = product.product_suppliers
    .filter((s) => s.is_active)
    .flatMap((s) =>
      s.product_pricing
        .filter((p) => p.is_active && p.original_price)
        .map((p) => p.original_price as number),
    );
  return originals.length > 0 ? Math.min(...originals) : null;
}
