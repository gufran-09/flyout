export type Destination = {
  id: string
  name: string
  slug: string
  hero_image: string | null
  description: string | null
}

export type Category = {
  id: string
  name: string
  slug: string
  image_url: string
}

export type Supplier = {
  id: string
  name: string
  code: string
}

export type ProductPricing = {
  id: string
  price: number
  original_price: number | null
  duration_minutes: number
  pax: number
  is_active: boolean
}

export type ProductSupplier = {
  id: string
  price: number
  display_title: string | null
  variant_description: string | null
  thumbnail_url: string | null
  specific_meeting_point: string | null
  location: string | null
  commission_percent: number
  is_active: boolean
  supplier?: Supplier
  product_pricing: ProductPricing[]
}

export type ProductImage = {
  id: string
  image_url: string
  position: number
}

export type Product = {
  id: string
  title: string
  slug: string
  subtitle: string | null
  rating: number
  review_count: number
  badge: string | null
  thumbnail_url: string | null
  location: string | null
  overview: string
  highlights: string[]
  what_to_bring: string[]
  facilities: string[]
  cancellation_policy: string | null
  is_refundable: boolean
  mobile_ticket: boolean
  confirmation_hours: number
  original_price: number | null
  category: Category
  destination: Destination
  product_suppliers: ProductSupplier[]
  product_images?: ProductImage[]
}

export type Booking = {
  id: string
  user_id: string
  product_supplier_id: string
  product_pricing_id: string | null
  booking_date: string
  guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
}

export type SiteSettings = {
  hero_title: string | null
  hero_subtitle: string | null
  hero_image: string | null
}

export function getLowestPrice(product: Product): number {
  const prices = product.product_suppliers
    .filter((s) => s.is_active)
    .flatMap((s) => s.product_pricing.filter((p) => p.is_active).map((p) => p.price))

  return prices.length > 0 ? Math.min(...prices) : 0
}

export function getOriginalPrice(product: Product): number | null {
  const originals = product.product_suppliers
    .filter((s) => s.is_active)
    .flatMap((s) =>
      s.product_pricing
        .filter((p) => p.is_active && p.original_price != null)
        .map((p) => p.original_price as number)
    )

  return originals.length > 0 ? Math.min(...originals) : null
}

export function getDiscountPercent(product: Product): number | null {
  const lowest = getLowestPrice(product)
  const original = getOriginalPrice(product)

  if (!original || original <= lowest) return null
  return Math.round(((original - lowest) / original) * 100)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}
