import React from 'react'
import { Banner, type BannerImage } from '@/components/ui/banner'

interface BannerSectionProps {
  images: BannerImage[]
  className?: string
}

export default function BannerSection({ images, className }: BannerSectionProps) {
  return (
    <div className={className}>
      <Banner 
        images={images}
        autoplaySpeed={6000}
        className="w-full mb-12"
        showIndicators={true}
      />
    </div>
  )
}