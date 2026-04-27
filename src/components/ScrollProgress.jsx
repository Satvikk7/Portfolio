import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [rotateDeg, setRotateDeg] = useState(-45)
  const [showFlame, setShowFlame] = useState(false)
  const sidebarRef = useRef(null)
  const lastYRef = useRef(0)

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const getMaxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

  const updateFromScroll = () => {
    const y = window.scrollY
    const max = getMaxScroll()
    const next = clamp(y / max, 0, 1)

    const scrollingDown = y > lastYRef.current
    const scrollingUp = y < lastYRef.current
    lastYRef.current = y

    if (!isDragging) {
      setProgress(next)
    }

    // Top parked state near navbar.
    if (next <= 0.01) {
      setRotateDeg(-45)
      setShowFlame(false)
      return
    }

    // Scroll down: launch from top, then descend, then land tail-first near bottom.
    if (scrollingDown) {
      const topLaunchRange = 0.14
      const bottomLandingStart = 0.82

      if (next < topLaunchRange) {
        const t = clamp(next / topLaunchRange, 0, 1)
        setRotateDeg(-45 + t * 180)
        setShowFlame(true)
        return
      }

      if (next > bottomLandingStart) {
        const t = clamp((next - bottomLandingStart) / (1 - bottomLandingStart), 0, 1)
        setRotateDeg(135 + t * -180)
        setShowFlame(false)
        return
      }

      setRotateDeg(135)
      setShowFlame(false)
      return
    }

    // Scroll up: once landed facing up, keep facing up while traveling to top.
    if (scrollingUp) {
      setRotateDeg(-45)
      setShowFlame(false)
      return
    }

    setShowFlame(false)
  }

  const updateFromPointer = (clientY) => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const rect = sidebar.getBoundingClientRect()
    const relative = clamp((clientY - rect.top) / rect.height, 0, 1)
    setProgress(relative)
    window.scrollTo({ top: relative * getMaxScroll(), behavior: 'auto' })
  }

  useEffect(() => {
    const onScroll = () => updateFromScroll()
    const onResize = () => updateFromScroll()
    const onPointerMove = (e) => {
      if (!isDragging) return
      updateFromPointer(e.clientY)
    }
    const onPointerUp = () => setIsDragging(false)

    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [isDragging])

  const visualProgress = 0.03 + progress * 0.94

  return (
    <div className="fixed top-0 bottom-0 right-1 sm:right-2 w-10 sm:w-12 lg:w-14 z-30 pointer-events-none">
      <div
        ref={sidebarRef}
        className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[1.5px] sm:w-[2px] rounded-full bg-teal-DEFAULT/25 pointer-events-auto"
        onPointerDown={(e) => {
          setIsDragging(true)
          updateFromPointer(e.clientY)
        }}
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-DEFAULT drop-shadow-[0_0_10px_#2ea3b0] pointer-events-auto cursor-grab active:cursor-grabbing"
        style={{ top: `${visualProgress * 100}%`, transformOrigin: '50% 85%' }}
        animate={{ rotate: rotateDeg, scale: isDragging ? 1.08 : 1 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        onPointerDown={(e) => {
          e.preventDefault()
          setIsDragging(true)
          updateFromPointer(e.clientY)
        }}
      >
        {showFlame && (
          <motion.div
            className="absolute left-1/2 top-[82%] -translate-x-1/2 w-1.5 sm:w-2 h-3 sm:h-4 rounded-full bg-gradient-to-b from-teal-DEFAULT to-transparent"
            animate={{ opacity: [0.4, 0.9, 0.4], scaleY: [0.9, 1.2, 0.9] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="h-6 w-6 sm:h-7 sm:w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      </motion.div>
    </div>
  )
}
