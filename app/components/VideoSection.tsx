"use client"

import { useState, useRef, useEffect } from "react"

interface VideoSectionProps {
  videoSrc: string
  startDelay: number
}

export default function VideoSection({ videoSrc, startDelay }: VideoSectionProps) {
  const [videoEnded, setVideoEnded] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const texts = ["สุขสันต์วันวาเลนไทน์นะคะ", "รักเธอที่สุดในโลก!", "ตลอดมาและตลอดไป", "จุ๊บๆ" , "❤️"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      if (videoRef.current) {
        videoRef.current.play().catch(console.error)
      }
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (videoEnded) {
      interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      }, 3000) // Change text every 3 seconds
    }
    return () => clearInterval(interval)
  }, [videoEnded])

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  return (
    <div
      className={`relative h-screen w-full overflow-hidden snap-start transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={`/media/videos/${videoSrc}`}
        onEnded={handleVideoEnd}
        playsInline
        muted
      />
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-pink-500 transition-opacity duration-1000 ${
          videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center leWaterWave p-2">
          {texts[currentTextIndex].split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </h2>
      </div>
    </div>
  )
}

