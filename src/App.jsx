import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import GalaxyBackground from './components/GalaxyBackground'
import { useTheme, THEMES } from './context/ThemeContext'

export default function App() {
  const { theme, isTransitioning, clickCoords } = useTheme()
  const [loading, setLoading] = useState(true)
  const rafRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateBackgroundMotion = () => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = window.scrollY / scrollMax
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4))
      rafRef.current = null
    }

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateBackgroundMotion)
      }
    }

    updateBackgroundMotion()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="noise-bg"
        >
          <div className={`grid-bg min-h-screen pr-0 sm:pr-0 lg:pr-0 transition-all duration-700 ${theme === THEMES.SYSTEM ? 'designer-bg' : 'visual-bg'}`}>
            <GalaxyBackground />
            <ScrollProgress />
            <Navbar />
            
            {/* Multiversal Explosion Transition Overlay */}
            <AnimatePresence>
              {isTransitioning && (
                <motion.div
                  initial={{ 
                    clipPath: `circle(0% at ${clickCoords.x}px ${clickCoords.y}px)`,
                    opacity: 1
                  }}
                  animate={{ 
                    clipPath: `circle(150% at ${clickCoords.x}px ${clickCoords.y}px)`,
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { duration: 0.6, ease: 'easeOut' }
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="fixed inset-0 z-[999] pointer-events-none"
                  style={{
                    background: theme === THEMES.SYSTEM 
                      ? 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(2,6,23,1) 70%)' 
                      : 'radial-gradient(circle, rgba(46,163,176,0.4) 0%, rgba(10,10,11,1) 70%)',
                    backdropFilter: 'blur(20px) saturate(2)',
                  }}
                >
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-scanline" />
                </motion.div>
              )}
            </AnimatePresence>

            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Gallery />
              <Contact />
            </main>
            <Footer />
          </div>
        </motion.div>
      )}
    </>
  )
}
