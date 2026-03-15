import { createSupabaseServerClient } from '@backend/lib/supabase/server'
import { Destination } from '@backend/types'

export async function getDestinations(): Promise<Destination[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('destinations')
    .select('id, name, slug, description, hero_image')
    .order('name')

  if (error) {
    console.error('getDestinations:', error.message)
    return []
  }

  return data ?? []
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('destinations').select('*').eq('slug', slug).single()

  if (error) {
    console.error('getDestinationBySlug:', error.message)
    return null
  }

  return data
}
