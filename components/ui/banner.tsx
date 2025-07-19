'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface BannerImage {
  src: string
  alt: string
}

interface BannerProps {
  images: BannerImage[]
  autoplaySpeed?: number
  className?: string
  showIndicators?: boolean
  aspectRatio?: "auto" | "square" | "video" | "wide"
}

export function Banner({
  images,
  autoplaySpeed = 5000,
  className,
  showIndicators = true,
  aspectRatio = "wide",
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  React.useEffect(() => {
    if (!images || images.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoplaySpeed)
    
    return () => clearInterval(interval)
  }, [images, autoplaySpeed])

  const aspectRatioClass = 
    aspectRatio === "square" ? "aspect-square" : 
    aspectRatio === "video" ? "aspect-video" : 
    aspectRatio === "wide" ? "aspect-[16/9] md:aspect-[21/9]" : 
    ""

  if (!images || images.length === 0) return null
  
  return (
    <div className={cn("relative overflow-hidden rounded-lg", aspectRatioClass, className)}>
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            // className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className='flex flex-col md:items-start items-center justify-center mx-16 absolute inset-0 z-20 bg-black/50'>
      <p className='text-white text-[clamp(1rem,5vw,2.5rem)] '>WALL SLATS</p>
        <h1 className='text-white text-[clamp(1.5rem,5vw,5rem)] font-semibold '>LINERIO</h1>
      </div>
      
      {/* {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  )
}