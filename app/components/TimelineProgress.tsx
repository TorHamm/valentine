interface TimelineProgressProps {
  progress: number
}

export default function TimelineProgress({ progress }: TimelineProgressProps) {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-pink-200">
      <div
        className="bg-pink-600 h-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
    </div>
  )
}

