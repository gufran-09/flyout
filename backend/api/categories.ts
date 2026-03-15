import { createSupabaseServerClient } from '@backend/lib/supabase/server'
import { Category } from '@backend/types'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, image_url')
    .order('name')

  if (error) {
    console.error('getCategories:', error.message)
    return []
  }

  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single()

  if (error) {
    console.error('getCategoryBySlug:', error.message)
    return null
  }

  return data
}
