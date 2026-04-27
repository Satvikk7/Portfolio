import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 5 + 'px'
      cursor.style.top = mouseY - 5 + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = followerX - 18 + 'px'
      follower.style.top = followerY - 18 + 'px'
      requestAnimationFrame(animate)
    }

    const onEnter = () => cursor.style.transform = 'scale(2.5)'
    const onLeave = () => cursor.style.transform = 'scale(1)'

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
