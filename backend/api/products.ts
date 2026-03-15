import { createSupabaseBrowserClient } from '@backend/lib/supabase/client'
import { Product } from '@backend/types'

async function getServerSupabase() {
  const { createSupabaseServerClient } = await import('@backend/lib/supabase/server')
  return createSupabaseServerClient()
}

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
  original_price,
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
`

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('review_count', { ascending: false })
    .limit(8)

  if (error) {
    console.error('getFeaturedProducts:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}

export async function getMostBookedProducts(): Promise<Product[]> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('review_count', { ascending: false })
    .limit(8)

  if (error) {
    console.error('getMostBookedProducts:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}

export async function getLuxuryProducts(): Promise<Product[]> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('rating', { ascending: false })
    .limit(6)

  if (error) {
    console.error('getLuxuryProducts:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`${PRODUCT_SELECT}, category:categories!inner(id, name, slug, image_url)`)
    .eq('categories.slug', categorySlug)

  if (error) {
    console.error('getProductsByCategory:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}

export async function getProductsByDestination(destinationSlug: string): Promise<Product[]> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`${PRODUCT_SELECT}, destination:destinations!inner(id, name, slug)`)
    .eq('destinations.slug', destinationSlug)

  if (error) {
    console.error('getProductsByDestination:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`
      ${PRODUCT_SELECT},
      product_images(id, image_url, position)
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('getProductBySlug:', error.message)
    return null
  }

  return data as unknown as Product
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = createSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .or(`title.ilike.%${query}%,overview.ilike.%${query}%`)
    .limit(20)

  if (error) {
    console.error('searchProducts:', error.message)
    return []
  }

  return (data as unknown as Product[]) ?? []
}
