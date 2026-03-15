import { createSupabaseBrowserClient } from '@backend/lib/supabase/client'
import { Booking } from '@backend/types'

export async function createBooking(booking: {
  product_supplier_id: string
  product_pricing_id: string
  booking_date: string
  guests: number
  total_price: number
}): Promise<Booking | null> {
  const supabase = createSupabaseBrowserClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('User must be logged in to book')

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      ...booking,
      status: 'pending',
      payment_status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('createBooking:', error.message)
    return null
  }

  return data
}

export async function getUserBookings(): Promise<any[]> {
  const supabase = createSupabaseBrowserClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      product_supplier:product_suppliers(
        display_title,
        product:products(title, thumbnail_url, slug)
      ),
      product_pricing:product_pricing(price, duration_minutes)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getUserBookings:', error.message)
    return []
  }

  return data ?? []
}

export async function cancelBooking(bookingId: string): Promise<boolean> {
  const supabase = createSupabaseBrowserClient()
  const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId)

  if (error) {
    console.error('cancelBooking:', error.message)
    return false
  }

  return true
}
