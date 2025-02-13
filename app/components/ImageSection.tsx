"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface ImageSectionProps {
  imageSrc: string
  text: string
}

export default function ImageSection({ imageSrc, text }: ImageSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen snap-start bg-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full md:w-2/3 p-4">
        <div className="relative w-full aspect-[2/3]">
          <Image
            src={`/media/images/${imageSrc}`}
            alt={text}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 p-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">{text}</h2>
      </div>
    </div>
  )
}

