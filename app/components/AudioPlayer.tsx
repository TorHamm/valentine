"use client"

import { useEffect, useRef, useState } from "react"

interface AudioPlayerProps {
  audioSrc: string
  duration: number
  fadeOutDuration: number
  shouldPlay: boolean
}

export default function AudioPlayer({ audioSrc, duration, fadeOutDuration, shouldPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(true) // New state

  useEffect(() => {
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    audio.addEventListener("ended", handleAudioEnd)

    return () => {
      audio.removeEventListener("ended", handleAudioEnd)
      audio.pause()
    }
  }, [audioSrc])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && shouldPlay && isPlaying) {
      audio.play().catch((err) => console.error("Audio play failed:", err))
      setTimeout(() => fadeOutAudio(), (duration - fadeOutDuration) * 1000)
    }
  }, [shouldPlay, isPlaying])

  const handleAudioEnd = () => {
    setIsPlaying(false)
  }

  const handlePlayButton = () => {
    setIsPlaying(true)
    setIsButtonVisible(false) // Hide the button after clicking
  }

  const fadeOutAudio = () => {
    const audio = audioRef.current
    if (audio) {
      const fadeOutInterval = 50 // ms
      const fadeOutStep = audio.volume / ((fadeOutDuration * 1000) / fadeOutInterval)

      const fadeOutTimer = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(0, audio.volume - fadeOutStep)
        } else {
          clearInterval(fadeOutTimer)
          audio.pause()
        }
      }, fadeOutInterval)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isButtonVisible && (
        <button
          onClick={handlePlayButton}
          className="px-4 py-2 bg-transparent text-white rounded-lg shadow-md transition"
        >
          กดตรงนี้ก่อนเริ่มนะ
        </button>
      )}
    </div>
  )
}
