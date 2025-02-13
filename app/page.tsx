"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Header from "./components/Header"
import TimelineProgress from "./components/TimelineProgress"
import ImageSection from "./components/ImageSection"
import VideoSection from "./components/VideoSection"
import AudioPlayer from "./components/AudioPlayer"

const imageSections = [
  { imageSrc: "first-date.jpg", text: "เดทแรก" },
  { imageSrc: "First-Selfie.jpg", text: "เซลฟี่แรกของเรา" },
  { imageSrc: "first-kiss.jpg", text: "จุ๊บๆ ครั้งแรก" },
  { imageSrc: "first-gift.jpg", text: "ของขวัญชิ้นแรก" },
  { imageSrc: "first-doll.jpg", text: "ตุ๊กตาตัวแรก" },
  { imageSrc: "first-flower.jpg", text: "ดอกไม้ช่อแรก" },
  { imageSrc: "Vid-1.jpg", text: "ตอนคอลกัน" },
  { imageSrc: "Vid-3.jpg", text: "ตอนคอลกันอีกละ" },
  { imageSrc: "Vid-2.jpg", text: "ตอนคอลกันอีกแล้ว!" },
  { imageSrc: "School-Trip.jpg", text: "วันทัศนศึกษา" },
  { imageSrc: "Sport-day.jpg", text: "วันกีฬาสี" },
  { imageSrc: "Selfie.jpg", text: "เซลฟี่น่ารักๆ" }
]

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isHeaderPassed, setIsHeaderPassed] = useState(false)
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isHeaderPassed) {
      const totalDuration = 35000 // 35 seconds for all image sections
      const intervalDuration = totalDuration / imageSections.length

      const interval = setInterval(() => {
        setCurrentSection((prev) => {
          if (prev < imageSections.length) {
            return prev + 1
          } else {
            clearInterval(interval)
            return prev
          }
        })
      }, intervalDuration)

      return () => clearInterval(interval)
    }
  }, [isHeaderPassed])

  const handleScroll = useCallback(() => {
    if (mainRef.current) {
      const { scrollTop } = mainRef.current
      const scrollThreshold = 50 // Scroll at least 50px before triggering
  
      if (scrollTop > scrollThreshold && !isHeaderPassed) {
        setIsHeaderPassed(true)
        setShouldPlayAudio(true)
        mainRef.current.style.overflowY = "hidden"
      }
    }
  }, [isHeaderPassed])
  
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout
    const mainElement = mainRef.current
  
    const debouncedHandleScroll = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        handleScroll()
      }, 100) // Adjust debounce timing as needed
    }
  
    if (mainElement) {
      mainElement.addEventListener("scroll", debouncedHandleScroll)
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", debouncedHandleScroll)
      }
      clearTimeout(debounceTimer)
    }
  }, [handleScroll])
  

  return (
    <main ref={mainRef} className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      <AudioPlayer
        audioSrc="/media/audio/background-music.mp3"
        duration={69}
        fadeOutDuration={5}
        shouldPlay={shouldPlayAudio}
      />
      <TimelineProgress progress={(currentSection / (imageSections.length + 1)) * 100} />
      <Header />
      {imageSections.map((section, index) => (
        <div key={index} style={{ display: currentSection === index ? "block" : "none" }}>
          <ImageSection imageSrc={section.imageSrc} text={section.text} />
        </div>
      ))}
      {currentSection === imageSections.length && <VideoSection videoSrc="valentine-video.mp4" startDelay={0} />}
    </main>
  )
}

