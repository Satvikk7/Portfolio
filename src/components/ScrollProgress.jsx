import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(y / max)

      if (y > lastScrollY.current + 2) {
        setDirection('down')
      } else if (y < lastScrollY.current - 2) {
        setDirection('up')
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rocket rotation: -45deg = nose pointing up (launching), 135deg = nose pointing down (landing)
  const rocketRotation = direction === 'down' ? 135 : -45

  // Keep rocket within the track with some padding
  const topPercent = 2 + progress * 96

  return (
    <div className="fixed top-0 right-3 md:right-6 h-full w-10 z-50 pointer-events-none py-16">
      <div className="relative w-full h-full flex justify-center">
        {/* Track line */}
        <div className="absolute top-0 w-px h-full bg-ash/15 rounded-full" />

        {/* Glowing progress fill (from top) */}
        <motion.div
          className="absolute top-0 w-[2px] rounded-full bg-teal shadow-[0_0_8px_#2ea3b0]"
          style={{ height: `${topPercent}%` }}
        />

        {/* Rocket */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: `${topPercent}%` }}
          animate={{ rotate: rocketRotation }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Flame trail */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 rounded-full bg-gradient-to-b from-teal/80 to-transparent pointer-events-none"
            style={{
              top: direction === 'down' ? '-12px' : 'auto',
              bottom: direction === 'up' ? '-12px' : 'auto',
              transformOrigin: direction === 'down' ? 'bottom' : 'top',
            }}
            animate={{
              height: [8, 14, 8],
              opacity: progress > 0.005 ? [0.5, 1, 0.5] : 0,
            }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />

          {/* Rocket SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2ea3b0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_10px_#2ea3b0]"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
