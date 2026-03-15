'use client'

import { useMemo, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { createBooking } from '@backend/api/bookings'
import { Product } from '@backend/types'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'

type BookingCardProps = {
  product: Product
  lowestPrice: number
  originalPrice: number | null
}

export default function BookingCard({ product, lowestPrice, originalPrice }: BookingCardProps) {
  const { addToCart } = useCart()
  const [guests, setGuests] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedSupplier = useMemo(
    () => product.product_suppliers.find((s) => s.is_active) ?? product.product_suppliers[0],
    [product.product_suppliers]
  )
  const selectedPricing = useMemo(
    () =>
      selectedSupplier?.product_pricing.find((p) => p.is_active) ??
      selectedSupplier?.product_pricing[0],
    [selectedSupplier]
  )

  const unitPrice = selectedPricing?.price ?? lowestPrice
  const totalPrice = unitPrice * guests

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.title,
        location: product.location ?? product.destination.name,
        category: product.category.slug,
        price: unitPrice,
        originalPrice: originalPrice ?? undefined,
        rating: product.rating,
        reviewCount: product.review_count,
        duration: selectedPricing ? `${selectedPricing.duration_minutes}m` : 'Flexible',
        image: product.thumbnail_url ?? '/placeholder.jpg',
        badge: product.badge ?? undefined,
        link: `/experiences/${product.destination.slug}/${product.category.slug}/${product.slug}`,
        productSupplierId: selectedSupplier?.id,
        productPricingId: selectedPricing?.id,
      },
      guests,
      date?.toISOString()
    )
    toast.success('Added to cart')
  }

  const handleCreateBooking = async () => {
    if (!selectedSupplier?.id || !selectedPricing?.id || !date) {
      toast.error('Please select a date before booking')
      return
    }

    setIsSubmitting(true)
    try {
      const created = await createBooking({
        product_supplier_id: selectedSupplier.id,
        product_pricing_id: selectedPricing.id,
        booking_date: date.toISOString(),
        guests,
        total_price: totalPrice,
      })

      if (created) {
        toast.success('Booking created successfully')
      } else {
        toast.error('Unable to create booking right now')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Booking failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="sticky top-4 border rounded-2xl p-6 shadow-lg bg-white">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#1A2B47]">AED {unitPrice.toLocaleString()}</span>
        {originalPrice && (
          <span className="text-gray-400 line-through text-sm">AED {originalPrice.toLocaleString()}</span>
        )}
      </div>
      <p className="text-sm text-gray-500">per person</p>

      <div className="mt-4">
        <label className="text-sm font-medium">Booking Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full mt-2 border rounded-lg px-3 py-2 text-left text-sm flex items-center justify-between"
            >
              <span>{date ? date.toLocaleDateString() : 'Pick a date'}</span>
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Guests</label>
        <div className="flex items-center gap-3 mt-1">
          <button
            type="button"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center"
          >
            -
          </button>
          <span className="font-semibold">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests(guests + 1)}
            className="w-8 h-8 rounded-full border flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total</span>
          <span className="font-bold">AED {totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleAddToCart}
        className="w-full mt-4 bg-gradient-to-r from-[#1A2B47] to-[#ad7103] text-white py-3 rounded-full font-bold"
      >
        Add to Cart
      </Button>

      <Button
        type="button"
        onClick={handleCreateBooking}
        disabled={isSubmitting}
        className="w-full mt-3"
        variant="outline"
      >
        {isSubmitting ? 'Creating Booking...' : 'Book Now'}
      </Button>
    </div>
  )
}
