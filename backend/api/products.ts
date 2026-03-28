import { createSupabaseServerClient } from '@backend/lib/supabase/server'
import { Product } from '@backend/types'

// Map page route slugs to database category slugs
const CATEGORY_SLUG_MAP: Record<string, string> = {
  'theme-parks': 'parks',
  'water-parks': 'parks',
  'water-sports': 'water-adventures',
  'water-adventure': 'water-adventures',
  'attractions': 'attraction',
  'desert-safari': 'safari',
  'safari': 'safari',
  'sky-adventures': 'sky-adventure',
  'dinner-cruise': 'dinner-cruise',
  'cruise': 'Cruises',
  'cruises': 'Cruises',
  'yacht': 'yacht',
  'hotels': 'hotel',
  'restaurants': 'restaurant',
  'holiday-packages': 'holiday-package',
  'visa': 'vise-services',
  'car-rental': 'car',
  'city-tours': 'city-tours',
  'limousine': 'car',
  'transfers': 'car',
  'supercars': 'car',
  'adventures': 'adventure',
  'water-adventures': 'water-adventures',
  'shows': 'games',
  'games': 'games',
  'packages': 'holiday-package',
  // Emirate slugs
  'abu-dhabi': 'attraction', // Default to attraction for now
  'ajman': 'attraction',
  'ras-al-khaimah': 'attraction',
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
  confirmation_hours,
  mobile_ticket,
  is_refundable,
  product_type,
  metadata,
  is_active,
  is_featured,
  created_at,
  category:categories(id, name, slug),
  destination:destinations(id, name, slug),
  product_suppliers(
    id,
    price,
    display_title,
    variant_description,
    thumbnail_url,
    location,
    is_active,
    supplier:suppliers(id, name),
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

// One function handles ALL categories
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const supabase = await createSupabaseServerClient()

  // Map the route slug to the database category slug
  const dbCategorySlug = CATEGORY_SLUG_MAP[categorySlug] || categorySlug

  // Try a direct lookup first, then fallback aliases for known variants.
  const categorySlugCandidates = Array.from(
    new Set([
      dbCategorySlug,
      categorySlug,
      categorySlug.replace(/-$/, ''),
      categorySlug.endsWith('s') ? categorySlug.slice(0, -1) : `${categorySlug}s`,
    ])
  )

  let category: { id: string } | null = null
  for (const candidate of categorySlugCandidates) {
    const { data } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle()

    if (data) {
      category = data
      break
    }
  }

  if (!category) {
    console.error(
      `Category not found for slug: ${categorySlug}. Tried: ${categorySlugCandidates.join(', ')}`
    )
    return []
  }

  // Query products by category_id
  let query = supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('category_id', category.id)

  // Special filtering for water parks vs theme parks
  if (categorySlug === 'water-parks') {
    // Water parks: filter for waterpark names
    query = query.or(
      'title.ilike.%water%,title.ilike.%aqua%,title.ilike.%splash%'
    )
  } else if (categorySlug === 'theme-parks') {
    // Theme parks: exclude water parks
    query = query
      .not('title', 'ilike', '%water%')
      .not('title', 'ilike', '%aqua%')
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('getProductsByCategory:', error.message)
    return []
  }
  return (data ?? []) as any
}

// Same select for product detail page
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createSupabaseServerClient()

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
  return data as any
}

// Get products by destination
export async function getProductsByDestination(
  destinationSlug: string
): Promise<Product[]> {
  const supabase = await createSupabaseServerClient()

  // Get destination by slug
  const { data: destination } = await supabase
    .from('destinations')
    .select('id')
    .eq('slug', destinationSlug)
    .maybeSingle()

  if (!destination) {
    console.error(`Destination not found for slug: ${destinationSlug}`)
    return []
  }

  // Query products by destination_id
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('destination_id', destination.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getProductsByDestination:', error.message)
    return []
  }
  return (data ?? []) as any
}

// Same select for homepage sections
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8)

  if (error) return []
  return (data ?? []) as any
}