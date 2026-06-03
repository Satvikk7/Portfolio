import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../context/ThemeContext'

export default function Cursor() {
  const { theme } = useTheme()
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const isSystem = theme === THEMES.SYSTEM

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => {
      cursor.style.width = '24px'
      cursor.style.height = '24px'
      cursor.style.margin = '-8px 0 0 -8px'
      follower.style.opacity = '0.3'
    }

    const onLeave = () => {
      cursor.style.width = '8px'
      cursor.style.height = '8px'
      cursor.style.margin = '0'
      follower.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    
    const updateInteractive = () => {
      document.querySelectorAll('a, button, [data-cursor], .cursor-pointer').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    updateInteractive()
    const observer = new MutationObserver(updateInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-[width,height,margin,background-color] duration-300 hidden md:block ${
          isSystem ? 'bg-teal shadow-[0_0_8px_rgba(46,163,176,0.8)]' : 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] rounded-full'
        }`} 
      />
      <div 
        ref={followerRef} 
        className={`fixed top-0 left-0 w-8 h-8 border pointer-events-none z-[9998] transition-[opacity,border-color,background-color] duration-500 hidden md:block ${
          isSystem ? 'border-teal/30 bg-teal/5' : 'border-sky-400/20 bg-sky-400/5 rounded-full'
        }`} 
      />
    </>
  )
}

