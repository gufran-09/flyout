'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import {
  Star, Clock, Check, ShieldCheck, Smartphone,
  Calendar as CalendarIcon, ChevronRight, Minus, Plus,
  MapPin, Car, Anchor, Wind, Waves,
  Utensils, Globe, FileText, Package, Zap, Camera, Home, Plane,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// ─── TYPES ─────────────────────────────────────────────────────────────────────

type ProductImage = { id: string; image_url: string; position: number }

type Pricing = {
  id: string
  price: number
  original_price: number | null
  discount_percent: number | null
  duration_minutes: number | null
  pax: number
  is_active: boolean
  label?: string | null
  passenger_type: 'adult' | 'child' | 'infant' | 'senior' | 'student' | 'group'
  min_age?: number | null
  max_age?: number | null
}

type Product = {
  id: string
  title: string
  slug: string
  subtitle: string | null
  rating: number
  review_count: number
  overview: string | null
  highlights: string[]
  what_to_bring: string[]
  facilities: string[]
  cancellation_policy: string | null
  confirmation_hours: number
  mobile_ticket: boolean
  is_refundable: boolean
  badge: string | null
  location: string | null
  thumbnail_url: string | null
  product_type: string
  metadata: Record<string, any>
  max_people?: number | null
  category: { id: string; name: string; slug: string }
  destination: { id: string; name: string; slug: string }
  product_images: ProductImage[]
  product_suppliers: {
    id: string
    display_title: string | null
    is_active: boolean
    supplier: { name: string; code: string }
    product_pricing: Pricing[]
  }[]
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function formatDuration(minutes: number | null): string {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} Minutes`
  if (m === 0) return `${h} Hour${h > 1 ? 's' : ''}`
  return `${h}h ${m}m`
}

// ─── BREADCRUMB ─────────────────────────────────────────────────────────────────

function Breadcrumb({ product }: { product: Product }) {
  return (
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 text-gray-400 flex-shrink-0" />
          {product.destination && (
            <>
              <Link href={`/${product.destination.slug}`} className="hover:text-primary capitalize transition-colors">
                {product.destination.name}
              </Link>
              <ChevronRight className="w-3 h-3 mx-2 text-gray-400 flex-shrink-0" />
            </>
          )}
          {product.category && (
            <>
              <Link
                href={`/${product.destination?.slug}/${product.category.slug}`}
                className="hover:text-primary capitalize transition-colors"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="w-3 h-3 mx-2 text-gray-400 flex-shrink-0" />
            </>
          )}
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>
    </div>
  )
}

// ─── IMAGE CAROUSEL ─────────────────────────────────────────────────────────────
// Full-width strip showing partial next image — exactly matches file 1 style

function ImageCarousel({ images, thumbnail, title }: {
  images: ProductImage[]; thumbnail: string | null; title: string
}) {
  const sorted = [...images].sort((a, b) => a.position - b.position)
  // Use ALL images from product_images — if none, fall back to thumbnail
  const allImages: string[] = sorted.length > 0
    ? sorted.map(i => i.image_url)
    : thumbnail ? [thumbnail] : []

  if (allImages.length === 0) return (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center">
      <Camera className="w-12 h-12 text-gray-300" />
    </div>
  )

  return (
    <div className="w-full relative">
      {/* Using native img (not next/image) for carousel — matches file 1 exactly.
          next/image in carousel causes quality degradation due to layout=fill inside flex */}
      <Carousel
        opts={{ align: 'start', loop: allImages.length > 3 }}
        className="relative w-full group"
      >
        <CarouselContent className="pointer-events-none">
          {allImages.map((img, index) => (
            <CarouselItem
              key={`${img}-${index}`}
              className="pointer-events-auto md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-[300px] md:h-[400px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* Use native img for carousel to prevent quality degradation */}
                <img
                  src={img}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-neutral-900 hover:text-neutral-900 border-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
        <CarouselNext className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-neutral-900 hover:text-neutral-900 border-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
      </Carousel>
    </div>
  )
}

// ─── CATEGORY METADATA ──────────────────────────────────────────────────────────

function AttractionMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {meta.floor_level && <div className="bg-[#F5F0E8] rounded-xl p-3"><p className="text-xs text-gray-500">Floor Level</p><p className="font-semibold text-[#1A2B47]">{meta.floor_level}th Floor</p></div>}
      {meta.tier && <div className="bg-[#F5F0E8] rounded-xl p-3"><p className="text-xs text-gray-500">Experience Tier</p><p className="font-semibold text-[#1A2B47]">{meta.tier}</p></div>}
      {meta.skip_the_line && <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2"><Zap className="w-4 h-4 text-green-600" /><p className="font-semibold text-green-700 text-sm">Skip The Line</p></div>}
      {meta.views && <div className="bg-[#F5F0E8] rounded-xl p-3 col-span-2"><p className="text-xs text-gray-500 mb-1">Views</p><div className="flex flex-wrap gap-1">{meta.views.map((v: string, i: number) => <span key={i} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-full">{v}</span>)}</div></div>}
    </div>
  )
}

function YachtMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {meta.yacht_length_ft && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-lg font-bold text-[#1A2B47]">{meta.yacht_length_ft}ft</p><p className="text-xs text-gray-500">Length</p></div>}
        {meta.max_capacity && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-lg font-bold text-[#1A2B47]">{meta.max_capacity}</p><p className="text-xs text-gray-500">Max Guests</p></div>}
        {meta.tour_type && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-sm font-bold text-[#1A2B47] capitalize">{meta.tour_type}</p><p className="text-xs text-gray-500">Tour Type</p></div>}
      </div>
      {meta.amenities && <div><p className="text-sm font-medium text-gray-700 mb-2">Amenities</p><div className="flex flex-wrap gap-2">{meta.amenities.map((a: string, i: number) => <span key={i} className="text-xs bg-[#EEF4FB] text-[#1A2B47] px-3 py-1 rounded-full">{a}</span>)}</div></div>}
      {meta.route_options && <div><p className="text-sm font-medium text-gray-700 mb-2">Route Options</p><div className="space-y-1">{meta.route_options.map((r: string, i: number) => <div key={i} className="flex items-center gap-2 text-sm text-gray-600"><Anchor className="w-3 h-3 text-[#D4A853]" />{r}</div>)}</div></div>}
    </div>
  )
}

function SafariMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meta.tour_type && <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-gray-500">Tour Type</p><p className="font-semibold text-amber-800 capitalize">{meta.tour_type}</p></div>}
        {meta.pickup_available && <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /><p className="font-semibold text-green-700 text-sm">Hotel Pickup Included</p></div>}
      </div>
      {meta.activities_included && <div><p className="text-sm font-medium text-gray-700 mb-2">Activities Included</p><div className="grid grid-cols-2 gap-1">{meta.activities_included.map((a: string, i: number) => <div key={i} className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-3 h-3 text-[#D4A853] flex-shrink-0" />{a}</div>)}</div></div>}
      {meta.dress_code && <div className="flex items-start gap-2 bg-orange-50 rounded-xl p-3"><Info className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><div><p className="text-xs font-medium text-orange-700">Dress Code</p><p className="text-sm text-orange-600">{meta.dress_code}</p></div></div>}
    </div>
  )
}

function HotelMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {meta.star_rating && <div className="bg-amber-50 rounded-xl p-3 text-center"><p className="text-lg font-bold text-amber-600">{'★'.repeat(meta.star_rating)}</p><p className="text-xs text-gray-500">{meta.star_rating} Star</p></div>}
        {meta.check_in_time && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-sm font-bold text-[#1A2B47]">{meta.check_in_time}</p><p className="text-xs text-gray-500">Check-in</p></div>}
        {meta.check_out_time && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-sm font-bold text-[#1A2B47]">{meta.check_out_time}</p><p className="text-xs text-gray-500">Check-out</p></div>}
      </div>
      {meta.amenities && <div><p className="text-sm font-medium text-gray-700 mb-2">Amenities</p><div className="flex flex-wrap gap-2">{meta.amenities.map((a: string, i: number) => <span key={i} className="text-xs bg-[#F5F0E8] px-3 py-1 rounded-full text-gray-700">{a}</span>)}</div></div>}
    </div>
  )
}

function CarMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meta.vehicle_class && <div className="bg-[#1A2B47] rounded-xl p-3 text-center"><p className="text-sm font-bold text-[#D4A853] capitalize">{meta.vehicle_class.replace('_',' ')}</p><p className="text-xs text-gray-300">Vehicle Class</p></div>}
        {meta.minimum_age && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-lg font-bold text-[#1A2B47]">{meta.minimum_age}+</p><p className="text-xs text-gray-500">Minimum Age</p></div>}
      </div>
      {meta.license_required && <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3"><FileText className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><div><p className="text-xs font-medium text-blue-700">License Required</p><p className="text-sm text-blue-600">{meta.license_required}</p></div></div>}
    </div>
  )
}

function SkyMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meta.minimum_age && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-lg font-bold text-[#1A2B47]">{meta.minimum_age}+</p><p className="text-xs text-gray-500">Min Age</p></div>}
        {meta.weight_limit_kg && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-lg font-bold text-[#1A2B47]">{meta.weight_limit_kg}kg</p><p className="text-xs text-gray-500">Max Weight</p></div>}
      </div>
      {meta.weather_dependent && <div className="flex items-start gap-2 bg-yellow-50 rounded-xl p-3"><Wind className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" /><div><p className="text-xs font-medium text-yellow-700">Weather Dependent</p><p className="text-xs text-yellow-600">{meta.cancellation_note || 'May be rescheduled due to weather'}</p></div></div>}
      {meta.views && <div><p className="text-sm font-medium text-gray-700 mb-2">What You'll See</p><div className="flex flex-wrap gap-2">{meta.views.map((v: string, i: number) => <span key={i} className="text-xs bg-sky-50 border border-sky-200 text-sky-700 px-2 py-1 rounded-full">{v}</span>)}</div></div>}
    </div>
  )
}

function WaterMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meta.minimum_age && <div className="bg-cyan-50 rounded-xl p-3 text-center"><p className="text-lg font-bold text-cyan-700">{meta.minimum_age}+</p><p className="text-xs text-gray-500">Min Age</p></div>}
        {meta.activity_type && <div className="bg-cyan-50 rounded-xl p-3 text-center"><p className="text-sm font-bold text-cyan-700 capitalize">{meta.activity_type.replace('_',' ')}</p><p className="text-xs text-gray-500">Activity Type</p></div>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {meta.equipment_provided && <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50"><Check className="w-3 h-3 text-green-500" /><span className="text-xs">Equipment Provided</span></div>}
        {meta.instructor_available && <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50"><Check className="w-3 h-3 text-green-500" /><span className="text-xs">Instructor Available</span></div>}
      </div>
      {meta.skill_levels && <div><p className="text-sm font-medium text-gray-700 mb-2">Suitable For</p><div className="flex gap-2 flex-wrap">{meta.skill_levels.map((s: string, i: number) => <span key={i} className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full capitalize">{s}</span>)}</div></div>}
    </div>
  )
}

function DinnerCruiseMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      {meta.route && <div className="flex items-center gap-3 bg-[#EEF4FB] rounded-xl p-3"><Anchor className="w-5 h-5 text-[#1A2B47]" /><div><p className="text-xs text-gray-500">Cruise Route</p><p className="font-semibold text-[#1A2B47]">{meta.route}</p></div></div>}
      {meta.landmark_views && <div><p className="text-sm font-medium text-gray-700 mb-2">Landmark Views</p><div className="flex flex-wrap gap-2">{meta.landmark_views.map((l: string, i: number) => <span key={i} className="text-xs bg-[#F5F0E8] px-2 py-1 rounded-full">{l}</span>)}</div></div>}
      {meta.entertainment_type && <div><p className="text-sm font-medium text-gray-700 mb-2">Entertainment</p><div className="grid grid-cols-2 gap-1">{meta.entertainment_type.map((e: string, i: number) => <div key={i} className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-3 h-3 text-[#D4A853]" />{e}</div>)}</div></div>}
      {meta.dress_code && <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3"><Info className="w-4 h-4 text-gray-400" /><p className="text-sm text-gray-600">Dress Code: <span className="font-medium">{meta.dress_code}</span></p></div>}
    </div>
  )
}

function HolidayPackageMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meta.destination_country && <div className="bg-[#EEF4FB] rounded-xl p-3"><p className="text-xs text-gray-500">Destination</p><p className="font-semibold text-[#1A2B47]">{meta.destination_city || meta.destination_country}</p></div>}
        {(meta.duration_days || meta.duration_nights) && <div className="bg-[#EEF4FB] rounded-xl p-3"><p className="text-xs text-gray-500">Duration</p><p className="font-semibold text-[#1A2B47]">{meta.duration_days && `${meta.duration_days}D`}{meta.duration_nights && `/${meta.duration_nights}N`}</p></div>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {meta.flights_included !== undefined && <div className={`flex items-center gap-2 p-2 rounded-lg ${meta.flights_included ? 'bg-green-50' : 'bg-gray-50'}`}><Plane className={`w-3 h-3 ${meta.flights_included ? 'text-green-500' : 'text-gray-400'}`} /><span className="text-xs text-gray-700">Flights Included</span></div>}
        {meta.hotel_included !== undefined && <div className={`flex items-center gap-2 p-2 rounded-lg ${meta.hotel_included ? 'bg-green-50' : 'bg-gray-50'}`}><Home className={`w-3 h-3 ${meta.hotel_included ? 'text-green-500' : 'text-gray-400'}`} /><span className="text-xs text-gray-700">Hotel Included</span></div>}
      </div>
    </div>
  )
}

function VisaMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {meta.validity_days && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-xl font-bold text-[#1A2B47]">{meta.validity_days}</p><p className="text-xs text-gray-500">Days Valid</p></div>}
        {meta.processing_time_days && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-xl font-bold text-[#1A2B47]">{meta.processing_time_days}</p><p className="text-xs text-gray-500">Processing Days</p></div>}
        {meta.entry_type && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-sm font-bold text-[#1A2B47]">{meta.entry_type}</p><p className="text-xs text-gray-500">Entry Type</p></div>}
      </div>
      {meta.required_documents && <div><p className="text-sm font-medium text-gray-700 mb-2">Required Documents</p><div className="space-y-1">{meta.required_documents.map((d: string, i: number) => <div key={i} className="flex items-start gap-2 text-sm text-gray-600"><FileText className="w-3 h-3 text-[#D4A853] flex-shrink-0 mt-0.5" />{d}</div>)}</div></div>}
    </div>
  )
}

function CruiseMeta({ meta }: { meta: Record<string, any> }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {meta.duration_nights && <div className="bg-[#1A2B47] rounded-xl p-3 text-center"><p className="text-xl font-bold text-white">{meta.duration_nights}</p><p className="text-xs text-gray-300">Nights</p></div>}
        {meta.departure_port && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-xs font-bold text-[#1A2B47]">{meta.departure_port}</p><p className="text-xs text-gray-500">From</p></div>}
        {meta.arrival_port && <div className="bg-[#EEF4FB] rounded-xl p-3 text-center"><p className="text-xs font-bold text-[#1A2B47]">{meta.arrival_port}</p><p className="text-xs text-gray-500">To</p></div>}
      </div>
    </div>
  )
}

function CategoryMetaContent({ product }: { product: Product }) {
  const { metadata, category } = product
  if (!metadata || Object.keys(metadata).length === 0) return null
  const slug = category?.slug
  const map: Record<string, React.ReactNode> = {
    'attraction': <AttractionMeta meta={metadata} />,
    'yacht': <YachtMeta meta={metadata} />,
    'safari': <SafariMeta meta={metadata} />,
    'hotel': <HotelMeta meta={metadata} />,
    'car': <CarMeta meta={metadata} />,
    'sky-adventure': <SkyMeta meta={metadata} />,
    'water-adventures': <WaterMeta meta={metadata} />,
    'dinner-cruise': <DinnerCruiseMeta meta={metadata} />,
    'holiday-package': <HolidayPackageMeta meta={metadata} />,
    'vise-services': <VisaMeta meta={metadata} />,
    'Cruises': <CruiseMeta meta={metadata} />,
  }
  return <>{map[slug || ''] || null}</>
}

// ─── BOOKING CARD ────────────────────────────────────────────────────────────────

function BookingCard({ product }: { product: Product }) {
  const allPricings = product.product_suppliers
    .filter(s => s.is_active)
    .flatMap(s => s.product_pricing.filter(p => p.is_active))

  const durationGroups = allPricings.reduce((acc, p) => {
    const key = p.label || formatDuration(p.duration_minutes) || 'Standard'
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {} as Record<string, Pricing[]>)

  const durationKeys = Object.keys(durationGroups)
  const hasPassengerTypes = allPricings.some(p => p.passenger_type === 'child')

  const [selectedDuration, setSelectedDuration] = useState(durationKeys[0] || '')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const currentPricings = durationGroups[selectedDuration] || []
  const adultPricing = currentPricings.find(p => p.passenger_type === 'adult') || currentPricings[0]
  const childPricing = currentPricings.find(p => p.passenger_type === 'child')
  const infantPricing = currentPricings.find(p => p.passenger_type === 'infant')

  const adultTotal = (adultPricing?.price ?? 0) * adults
  const childTotal = childPricing ? childPricing.price * children : 0
  const grandTotal = adultTotal + childTotal
  const displayPrice = grandTotal > 0 ? grandTotal : (adultPricing?.price ?? 0)

  const adultOriginal = adultPricing?.original_price
  const originalTotal = adultOriginal
    ? adultOriginal * adults + (childPricing?.original_price ?? childPricing?.price ?? 0) * children
    : null

  const discountPercent = adultPricing?.discount_percent
    ?? (adultOriginal && adultPricing?.price && adultOriginal > adultPricing.price
      ? Math.round(((adultOriginal - adultPricing.price) / adultOriginal) * 100)
      : null)

  const supplierCode = product.product_suppliers.find(s => s.is_active)?.supplier?.code
    || product.product_suppliers.find(s => s.is_active)?.display_title || ''

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6 space-y-6">

      {/* Price — matches file 1 exactly */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Price</p>
        <div className="mt-1">
          <span className="text-4xl font-bold text-gray-900">AED {displayPrice.toLocaleString()}</span>
          <div className="flex items-center gap-2 mt-1">
            {originalTotal && originalTotal > displayPrice && (
              <span className="text-sm text-gray-400 line-through">AED {originalTotal.toLocaleString()}</span>
            )}
            {discountPercent && discountPercent > 0 && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">
                {Math.round(discountPercent)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Guest Counter */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900 block">
          {product.max_people ? 'Quantity' : 'Guests / Tickets'}
        </label>

        <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">
              {product.max_people ? 'Number of Packs' : hasPassengerTypes ? 'Adults' : 'Number of People'}
            </span>
            {product.max_people && (
              <span className="text-xs text-muted-foreground">Max {product.max_people} people per pack</span>
            )}
            {adultPricing && !product.max_people && (
              <span className="text-xs text-gray-400">AED {adultPricing.price} per person{adultPricing.min_age ? ` (${adultPricing.min_age}+ yrs)` : ''}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setAdults(a => Math.max(1, a - 1))} disabled={adults <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-40">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">{adults}</span>
            <button onClick={() => setAdults(a => a + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {hasPassengerTypes && childPricing && (
          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Children</span>
              <span className="text-xs text-gray-400">
                AED {childPricing.price} per child
                {childPricing.min_age != null && childPricing.max_age != null ? ` (${childPricing.min_age}–${childPricing.max_age} yrs)` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setChildren(c => Math.max(0, c - 1))} disabled={children <= 0}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-40">
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">{children}</span>
              <button onClick={() => setChildren(c => c + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {hasPassengerTypes && infantPricing && infantPricing.price === 0 && (
          <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2 text-xs text-green-700">
            <Check className="w-3 h-3" />Infants (0–{infantPricing.max_age ?? 2} yrs) admitted free
          </div>
        )}
      </div>

      {/* Date — shadcn Popover calendar matching file 1 */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900 block">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(
              'w-full justify-start text-left font-normal h-12 border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors',
              !selectedDate && 'text-muted-foreground'
            )}>
              <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Duration pills — matches file 1 dark selected style */}
      {durationKeys.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900 block">Select Duration</label>
          <div className="grid grid-cols-2 gap-3">
            {durationKeys.map(key => {
              const pricings = durationGroups[key]
              const adultP = pricings.find(p => p.passenger_type === 'adult') || pricings[0]
              return (
                <button key={key} onClick={() => setSelectedDuration(key)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 text-left',
                    selectedDuration === key
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 active:scale-95'
                  )}
                >
                  <div>{key}</div>
                  {adultP && (
                    <div className={cn('text-xs mt-0.5', selectedDuration === key ? 'text-gray-300' : 'text-gray-400')}>
                      AED {Number(adultP.price).toLocaleString()}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Price breakdown when children selected */}
      {children > 0 && childPricing && (
        <div className="bg-gray-50 rounded-xl p-3 space-y-1 text-sm border border-gray-100">
          <div className="flex justify-between text-gray-600">
            <span>{adults} Adult{adults > 1 ? 's' : ''} × AED {adultPricing?.price ?? 0}</span>
            <span>AED {adultTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{children} Child{children > 1 ? 'ren' : ''} × AED {childPricing.price}</span>
            <span>AED {childTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200">
            <span>Total</span><span>AED {grandTotal.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* CTA — pink button matching file 1 exactly */}
      <div className="pt-2">
        <Button className="w-full h-14 text-lg font-bold bg-[#E91E63] hover:bg-[#D81B60] text-white shadow-lg shadow-[#E91E63]/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
          Add to Cart
        </Button>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Secure Payment via Visa, Mastercard, ApplePay</span>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────────

export default function ProductDetailPage({ product }: { product: Product }) {
  const hasMeta = product.metadata && Object.keys(product.metadata).length > 0
  const supplierCode = product.product_suppliers.find(s => s.is_active)?.supplier?.code
    || product.product_suppliers.find(s => s.is_active)?.display_title || ''

  const metaTitle =
    product.category?.slug === 'hotel' ? 'Hotel Details'
    : product.category?.slug === 'yacht' ? 'Yacht Details'
    : product.category?.slug === 'safari' ? 'Safari Details'
    : product.category?.slug === 'car' ? 'Vehicle Details'
    : product.category?.slug === 'vise-services' ? 'Visa Details'
    : product.category?.slug === 'holiday-package' ? 'Package Details'
    : 'Activity Details'

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* Breadcrumb */}
      <Breadcrumb product={product} />

      {/* Full-width image carousel */}
      <ImageCarousel
        images={product.product_images || []}
        thumbnail={product.thumbnail_url}
        title={product.title}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT — Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>
              {product.subtitle && <p className="text-lg text-gray-600">{product.subtitle}</p>}

              <div className="flex items-center gap-4 flex-wrap">
                {product.rating > 0 && (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" /><span>{product.rating}</span>
                  </div>
                )}
                {product.review_count > 0 && (
                  <span className="text-gray-500 text-sm hover:underline cursor-pointer">{product.review_count.toLocaleString()} Reviews</span>
                )}
                {supplierCode && <><span className="text-gray-300">|</span><span className="text-gray-500 text-sm">Supplier: {supplierCode}</span></>}
                {product.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />{product.location}
                  </div>
                )}
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                {product.confirmation_hours <= 24 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" /><span>{product.confirmation_hours} Hour Confirmation</span>
                  </div>
                )}
                {product.mobile_ticket && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                    <Smartphone className="w-4 h-4 text-gray-500" /><span>Mobile Tickets Accepted</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-gray-500" />
                  <span>{product.is_refundable ? 'Flexible Cancellation' : 'Non-refundable'}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Details & Highlights — shadcn Accordion matching file 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Details & Highlights</h2>

              <Accordion type="single" collapsible className="w-full">

                {product.overview && (
                  <AccordionItem value="overview" className="border-b">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">Overview</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 leading-relaxed text-base pt-2 pb-4">{product.overview}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {hasMeta && (
                  <AccordionItem value="details" className="border-b">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">{metaTitle}</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4"><CategoryMetaContent product={product} /></div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.highlights && product.highlights.length > 0 && (
                  <AccordionItem value="highlights" className="border-b">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">Highlights</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 gap-3 pt-2 pb-4">
                        {product.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-600 text-base">
                            <div className="w-5 h-5 mt-0.5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.what_to_bring && product.what_to_bring.length > 0 && (
                  <AccordionItem value="whatToBring" className="border-b">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">What to Bring</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 text-base pt-2 pb-4">
                        {product.what_to_bring.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.facilities && product.facilities.length > 0 && (
                  <AccordionItem value="facilities" className="border-b">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">Facilities</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2 pb-4">
                        {product.facilities.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 border border-gray-200">{item}</span>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.cancellation_policy && (
                  <AccordionItem value="cancellation" className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">Cancellation Policy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 text-base pt-2 pb-4">{product.cancellation_policy}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

              </Accordion>
            </div>
          </div>

          {/* RIGHT — Booking Card */}
          <div className="w-full lg:w-[380px] shrink-0">
            <BookingCard product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
