// src/app/experiences/[destination]/[category]/[slug]/page.tsx
// SERVER COMPONENT — fetches all data from Supabase

import { notFound } from 'next/navigation'
import ProductDetailPage from '@/components/product/ProductDetailPage'
import { Layout } from '@/components/layout/Layout'

// ─── TYPES ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{
    destination: string
    category: string
    slug: string
  }>
}

// ─── STATIC PARAMS ─────────────────────────────────────────────────────────────
// Pre-builds all 200+ product pages at deploy time for SEO

import { createClient } from '@supabase/supabase-js'

export async function generateStaticParams() {
  // Use a fresh standard client instead of cookie-based one for static generation
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: products } = await supabase
    .from('products')
    .select(`
      slug,
      destination:destinations(slug),
      category:categories(slug)
    `)
    .eq('is_active', true)

  if (!products) return []

  return products
    .filter(p => p.destination && p.category)
    .map(p => ({
      destination: (p.destination as any).slug,
      category: (p.category as any).slug,
      slug: p.slug,
    }))
}

// ─── METADATA ──────────────────────────────────────────────────────────────────

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('products')
    .select('title, subtitle, overview, thumbnail_url, rating, review_count')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Experience Not Found | Flyout Tours' }

  return {
    title: `${data.title} | Flyout Tours`,
    description: data.subtitle || data.overview?.slice(0, 160),
    openGraph: {
      title: data.title,
      description: data.subtitle || data.overview?.slice(0, 160) || '',
      images: data.thumbnail_url ? [{ url: data.thumbnail_url, width: 1200, height: 630 }] : [],
    },
  }
}

// ─── DATA FETCHING ──────────────────────────────────────────────────────────────

async function getProduct(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      slug,
      subtitle,
      rating,
      review_count,
      overview,
      highlights,
      what_to_bring,
      facilities,
      cancellation_policy,
      confirmation_hours,
      mobile_ticket,
      is_refundable,
      badge,
      location,
      thumbnail_url,
      product_type,
      metadata,
      max_people,
      category:categories(id, name, slug),
      destination:destinations(id, name, slug),
      product_images(
        id,
        image_url,
        position
      ),
      product_suppliers(
        id,
        display_title,
        is_active,
        supplier:suppliers(name, code),
        product_pricing(
          id,
          price,
          original_price,
          duration_minutes,
          pax,
          is_active
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    console.error('getProduct error:', error?.message)
    return null
  }

  return data
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default async function ExperiencePage(props: PageProps) {
  const params = await props.params;
  const product = await getProduct(params.slug)

  if (!product) notFound()

  return (
    <Layout>
      <ProductDetailPage product={product as any} />
    </Layout>
  )
}

// ISR — rebuild product pages every 30 minutes
// New products show immediately via on-demand ISR
export const revalidate = 1800
