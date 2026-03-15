'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@backend/types'

type ProductGalleryProps = {
  images: ProductImage[]
  thumbnail: string | null
}

export default function ProductGallery({ images, thumbnail }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const sorted = [...images].sort((a, b) => a.position - b.position)
    if (sorted.length === 0 && thumbnail) {
      return [{ id: 'thumb-fallback', image_url: thumbnail, position: 0 }]
    }
    return sorted
  }, [images, thumbnail])

  const [activeIndex, setActiveIndex] = useState(0)

  if (galleryImages.length === 0) {
    return (
      <div className="relative w-full h-[380px] mt-6 rounded-xl overflow-hidden bg-gray-100">
        <Image src="/placeholder.jpg" alt="Product image placeholder" fill className="object-cover" />
      </div>
    )
  }

  const activeImage = galleryImages[Math.min(activeIndex, galleryImages.length - 1)]

  return (
    <div className="mt-6">
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden bg-gray-100">
        <Image src={activeImage.image_url} alt="Product image" fill className="object-cover" />
      </div>

      {galleryImages.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative min-w-24 h-16 rounded-lg overflow-hidden border-2 transition ${
                idx === activeIndex ? 'border-[#dea318]' : 'border-transparent'
              }`}
            >
              <Image src={img.image_url} alt={`Product thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
