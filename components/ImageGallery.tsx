"use client"

import type React from "react"

import { useState, useRef, useEffect, type MutableRefObject } from "react"
import Image from "next/image"
import { HiChevronLeft, HiChevronRight, HiSearch, HiX } from "react-icons/hi"
import Loader from "@/components/Loader"

interface ImageGalleryProps {
  images: string[]
  initialIndex?: number
  lineType?: "l-line" | "m-line" | "s-line"
  onColorChange?: (colorSlug: string) => void
}

export default function ImageGallery({
  images,
  initialIndex = 0,
  lineType = "l-line",
  onColorChange,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex)
  const [thumbCanScroll, setThumbCanScroll] = useState<{ left: boolean; right: boolean }>({ left: false, right: false })
  const [loading, setLoading] = useState<boolean>(true)
  const thumbRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(currentIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const updateScroll = () => {
      const el = thumbRef.current
      if (el) {
        setThumbCanScroll({
          left: el.scrollLeft > 0,
          right: el.scrollLeft + el.clientWidth < el.scrollWidth,
        })
      }
    }

    updateScroll()
    thumbRef.current?.addEventListener("scroll", updateScroll)
    window.addEventListener("resize", updateScroll)

    return () => {
      thumbRef.current?.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
    }
  }, [images])

  useEffect(() => {
    setLoading(!imagesLoaded[currentIndex])
  }, [currentIndex, imagesLoaded])

  // useEffect(() => {
  //   const selected = thumbRef.current?.querySelectorAll("img")?.[currentIndex];
  //   selected?.scrollIntoView({ behavior: "smooth", inline: "center" });
  // }, [currentIndex]);

  useEffect(() => {
    const container = thumbRef.current
    const thumbs = container?.querySelectorAll("img")
    const selected = thumbs?.[currentIndex]

    if (container && selected) {
      const containerRect = container.getBoundingClientRect()
      const selectedRect = selected.getBoundingClientRect()

      const offset = selectedRect.left - containerRect.left - container.clientWidth / 2 + selected.clientWidth / 2

      container.scrollBy({ left: offset, behavior: "smooth" })
    }
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        setCurrentIndex((i) => i + 1)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, images.length])

  const scrollThumbs = (direction: "left" | "right") => {
    const el = thumbRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.7
    el.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" })
  }

  const handleSelect = (idx: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (idx === currentIndex) return
    setCurrentIndex(idx)

    // Extract color from the selected image and notify parent
    if (onColorChange) {
      const colorSlug = getColorFromImage(images[idx])
      if (colorSlug) {
        onColorChange(colorSlug)
      }
    }
  }

  const handleImageLoad = (idx: number) => {
    setImagesLoaded((prev) => ({ ...prev, [idx]: true }))
    if (idx === currentIndex) setLoading(false)
  }

  const getImagePath = (filename: string) => `${filename}`

  const getColorFromImage = (filename: string): string | null => {
    // Extract color from filename (assuming format contains lineType-colorSlug)
    const match = filename.match(new RegExp(`${lineType}-(\\w+)`))
    return match ? match[1] : null
  }

  return (
    <div className="space-y-4 relative">
      {/* Main Image */}
      <div className="relative w-full h-[400px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-100">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
            <Loader />
          </div>
        )}
        {/* <Image
          src={getImagePath(images[currentIndex]) || "/placeholder.svg"}
          alt={`Image ${currentIndex + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => handleImageLoad(currentIndex)}
          priority={currentIndex === initialIndex}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        /> */}
        <Image
          src={getImagePath(images[currentIndex]) || "/placeholder.svg"}
          alt={`Image ${currentIndex + 1}`}
          fill
          className={`object-contain transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => handleImageLoad(currentIndex)}
          priority={currentIndex === initialIndex}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />

        <button
          onClick={() => {
            setIsPreviewOpen(true)
            setPreviewIndex(currentIndex)
          }}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition z-20"
          aria-label="Preview image"
        >
          <HiSearch size={20} />
        </button>
        {/* Navigation Buttons */}
        <button
          onClick={() => {
            const newIndex = Math.max(currentIndex - 1, 0)
            setCurrentIndex(newIndex)
            if (onColorChange && newIndex !== currentIndex) {
              const colorSlug = getColorFromImage(images[newIndex])
              if (colorSlug) onColorChange(colorSlug)
            }
          }}
          disabled={currentIndex === 0}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full disabled:opacity-30 hover:bg-opacity-100 transition z-10"
          aria-label="Previous image"
        >
          <HiChevronLeft size={24} />
        </button>
        <button
          onClick={() => {
            const newIndex = Math.min(currentIndex + 1, images.length - 1)
            setCurrentIndex(newIndex)
            if (onColorChange && newIndex !== currentIndex) {
              const colorSlug = getColorFromImage(images[newIndex])
              if (colorSlug) onColorChange(colorSlug)
            }
          }}
          disabled={currentIndex === images.length - 1}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full disabled:opacity-30 hover:bg-opacity-100 transition z-10"
          aria-label="Next image"
        >
          <HiChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        {thumbCanScroll.left && (
          <button
            onClick={() => scrollThumbs("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
            aria-label="Scroll thumbnails left"
          >
            <HiChevronLeft size={20} />
          </button>
        )}
        <div ref={thumbRef} className="flex overflow-x-auto scrollbar-hide space-x-2 py-2 px-1">
          {images.map((filename, idx) => (
            <div
              key={idx}
              onClick={(e) => handleSelect(idx, e)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-transform hover:scale-105 border-2 ${
                idx === currentIndex ? "border-blue-500" : "border-transparent"
              }`}
              role="button"
              aria-selected={idx === currentIndex}
            >
              <div className="relative w-full h-full">
                <Image
                  src={getImagePath(filename) || "/placeholder.svg"}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                  quality={30}
                  onLoad={() => {
                    if (idx !== currentIndex) {
                      const img = new window.Image()
                      img.src = getImagePath(filename)
                      img.onload = () => handleImageLoad(idx)
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {thumbCanScroll.right && (
          <button
            onClick={() => scrollThumbs("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
            aria-label="Scroll thumbnails right"
          >
            <HiChevronRight size={20} />
          </button>
        )}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100"
                aria-label="Close preview"
              >
                <HiX size={24} />
              </button>

              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => {
                    const newIndex = Math.max(previewIndex - 1, 0)
                    setPreviewIndex(newIndex)
                    if (onColorChange && newIndex !== currentIndex) {
                      const colorSlug = getColorFromImage(images[newIndex])
                      if (colorSlug) onColorChange(colorSlug)
                    }
                  }}
                  disabled={previewIndex === 0}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full z-10 disabled:opacity-30"
                  aria-label="Previous image"
                >
                  <HiChevronLeft size={24} />
                </button>

                <Image
                  src={getImagePath(images[previewIndex]) || "/placeholder.svg"}
                  alt={`Preview ${previewIndex + 1}`}
                  width={1200}
                  height={800}
                  className="rounded-lg max-h-[80vh] w-auto object-contain"
                />

                <button
                  onClick={() => {
                    const newIndex = Math.min(previewIndex + 1, images.length - 1)
                    setPreviewIndex(newIndex)
                    if (onColorChange && newIndex !== currentIndex) {
                      const colorSlug = getColorFromImage(images[newIndex])
                      if (colorSlug) onColorChange(colorSlug)
                    }
                  }}
                  disabled={previewIndex === images.length - 1}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full z-10 disabled:opacity-30"
                  aria-label="Next image"
                >
                  <HiChevronRight size={24} />
                </button>
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto max-w-full">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-16 h-16 rounded border-2 cursor-pointer ${
                      idx === previewIndex ? "border-white" : "border-transparent"
                    }`}
                    onClick={() => {
                      setPreviewIndex(idx)
                      if (onColorChange) {
                        const colorSlug = getColorFromImage(images[idx])
                        if (colorSlug) onColorChange(colorSlug)
                      }
                    }}
                  >
                    <Image
                      src={getImagePath(img) || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
