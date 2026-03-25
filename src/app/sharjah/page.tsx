'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { PremiumCard } from '@/components/ui/PremiumCard'

type ProductSearchResult = {
  id: string
  title: string
  slug: string
  thumbnail_url: string | null
  rating: number | null
  review_count: number | null
  badge: string | null
  category: { name: string; slug: string }[]
  destination: { name: string; slug: string }[]
  product_suppliers: Array<{
    is_active: boolean
    product_pricing: Array<{
      price: number
      is_active: boolean
      original_price: number | null
    }>
  }>
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [results, setResults] = useState<ProductSearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    
    async function fetch() {
      setLoading(true)
      const supabase = createSupabaseBrowserClient()
      const { data } = await supabase
        .from('products')
        .select('id, title, slug, thumbnail_url, rating, review_count, badge, category:categories(name,slug), destination:destinations(name,slug), product_suppliers(price, is_active, product_pricing(price,original_price,is_active))')
        .ilike('title', `%${query}%`)
        .limit(20)
      setResults(data ?? [])
      setLoading(false)
    }
    
    fetch()
  }, [query])

  if (loading) return <div>Searching...</div>
  if (!results.length) return <div>No results for "{query}"</div>

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {results.map(product => (
        <PremiumCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.thumbnail_url ?? '/placeholder.jpg'}
          location={product.destination?.[0]?.name ?? 'Sharjah, UAE'}
          price={
            product.product_suppliers
              .filter((s) => s.is_active)
              .flatMap((s) => s.product_pricing.filter((p) => p.is_active).map((p) => p.price))
              .sort((a, b) => a - b)[0] ?? 0
          }
          category={product.category?.[0]?.name}
          rating={product.rating ?? undefined}
          badge={product.badge ?? undefined}
          link={`/experiences/${product.destination?.[0]?.slug ?? 'dubai'}/${product.category?.[0]?.slug ?? 'experiences'}/${product.slug}`}
        />
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}