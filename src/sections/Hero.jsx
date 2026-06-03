import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, THEMES } from '../context/ThemeContext'

const devRoles = ['Software Developer', 'Full Stack Engineer', 'SDE Intern', 'Creative Technologist']
const designRoles = ['Graphic Designer', 'Visual Communicator', 'UI/UX Thinker', 'Creative Lead']

function FlipStat() {
  const { theme } = useTheme()
  const isSystem = theme === THEMES.SYSTEM
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'

  return (
    <div className="text-center relative w-full max-w-[220px] h-12 hidden sm:block">
      <div className="flex flex-col items-center justify-center h-full">
        <p className={`font-outfit font-bold text-[20px] leading-tight whitespace-nowrap transition-all duration-700 ${accentColor}`}>
          {isSystem ? 'Software Engineer' : 'Graphic Designer'}
        </p>
      </div>
    </div>
  )
}

function ProfilePhoto({ isSystem }) {
  return (
    <div className={`relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border overflow-hidden transition-all duration-700 mx-auto lg:mx-0 ${
      isSystem ? 'border-teal/20 glow-teal' : 'border-sky-400/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]'
    }`}>
      {/* Current Persona Image */}
      <motion.img
        key={isSystem ? 'system' : 'visual'}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        src={isSystem ? "/profile-photo.png" : "/profile-photo-studio.png"}
        alt="Satvik Gupta"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div className={`absolute inset-0 bg-gradient-to-b ${isSystem ? 'from-teal/20' : 'from-sky-400/20'} via-transparent to-transparent`} />
    </div>
  )
}

export default function Hero() {
  const { theme, isTransitioning } = useTheme()
  const isSystem = theme === THEMES.SYSTEM
  const roles = isSystem ? devRoles : designRoles
  
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [glitchText, setGlitchText] = useState('Satvik Gupta')
  const timeoutRef = useRef(null)

  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'

  useEffect(() => {
    setRoleIndex(0)
    setDisplayed('')
    setDeleting(false)
  }, [theme])

  useEffect(() => {
    if (isTransitioning) {
      const chars = '!@#$%^&*()_+NKJASHDJKQWHEJKQW'
      let iteration = 0
      const interval = setInterval(() => {
        setGlitchText(prev => 
          'Satvik Gupta'.split('').map((char, index) => {
            if (index < iteration) return 'Satvik Gupta'[index]
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        if (iteration >= 12) clearInterval(interval)
        iteration += 1/3
      }, 30)
      return () => clearInterval(interval)
    } else {
      setGlitchText('Satvik Gupta')
    }
  }, [isTransitioning])

  useEffect(() => {
    const current = roles[roleIndex]
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, deleting, roleIndex, roles])

  useEffect(() => {
    const chars = '!@#$%^&*()_+NKJASHDJKQWHEJKQW'
    let iteration = 0
    const interval = setInterval(() => {
      setGlitchText(prev => 
        'Satvik Gupta'.split('').map((char, index) => {
          if (index < iteration) return 'Satvik Gupta'[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      if (iteration >= 12) clearInterval(interval)
      iteration += 1/3
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(circle, ${isSystem ? 'rgba(46,163,176,0.06)' : 'rgba(56,189,248,0.06)'} 0%, transparent 70%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-tag mb-6 flex items-center justify-center lg:justify-start gap-3"
            >
              <span className={`w-8 h-px ${accentBg}`} />
              <span className="tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                {isSystem ? 'AVAILABLE FOR SDE ROLES' : 'AVAILABLE FOR CREATIVE PROJECTS'}
              </span>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-2 h-2 rounded-full inline-block ml-1 ${isSystem ? 'bg-green-400' : 'bg-sky-400'}`}
              />
            </motion.div>

            <div className="relative mb-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`font-outfit font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.92] text-white ${isSystem ? '' : 'tracking-tight'}`}
              >
                {glitchText}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`mt-4 font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.18em] sm:tracking-[0.2em] ${accentColor}`}
              >
                {isSystem ? 'Computer Science Undergrad · Software Engineer' : 'Visual Identity Designer · Creative Strategist'}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-2 mb-8"
            >
              <span className="font-mono text-smoke text-sm">&lt;</span>
              <span className={`font-mono text-sm sm:text-base md:text-lg min-w-0 ${accentColor}`}>
                {displayed}
                <span className={`blink ${accentColor}`}>|</span>
              </span>
              <span className="font-mono text-smoke text-sm">/&gt;</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="font-inter text-smoke text-base sm:text-lg leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0"
            >
              {isSystem 
                ? <>Architecting <span className="text-white font-medium italic">scalable applications</span> and data-driven systems — where logic meets performance.</>
                : <>Crafting <span className="text-white font-medium italic">visual identities</span> and immersive experiences — where aesthetics meet strategy.</>
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full sm:w-auto px-8 py-3.5 text-white font-outfit font-bold text-sm tracking-wide transition-all duration-500 ${
                  isSystem ? 'bg-teal hover:bg-teal/80' : 'bg-sky-500 hover:bg-sky-600 rounded-lg shadow-lg shadow-sky-500/20'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSystem ? 'Explore Engineering' : 'Explore Designs'}
              </motion.button>

              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full sm:w-auto px-8 py-3.5 border text-white font-inter text-sm transition-all duration-500 flex items-center justify-center gap-2 ${
                  isSystem ? 'border-ash hover:border-teal/50 hover:text-teal' : 'border-white/10 hover:border-sky-400/50 hover:text-sky-400 rounded-lg'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Collaborate ↗
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap items-start justify-center lg:justify-start gap-6 sm:gap-8 mt-12"
            >
              {[
                { label: isSystem ? 'Engineering' : 'Branding', value: isSystem ? 'MERN' : 'PS/AI' },
                { label: isSystem ? 'Experience' : 'Leadership', value: isSystem ? 'Cognizant' : 'Drishti' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className={`font-outfit font-bold text-2xl sm:text-3xl transition-colors duration-500 ${accentColor}`}>{stat.value}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-smoke mt-1 group-hover:text-white transition-colors">{stat.label}</p>
                </div>
              ))}
              <div className="hidden md:block">
                <FlipStat />
              </div>
            </motion.div>
          </div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="order-1 lg:order-2 flex justify-center items-center mb-8 lg:mb-0"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-0 rounded-full border opacity-30 sm:opacity-100 ${isSystem ? 'border-teal/10' : 'border-sky-400/10'}`}
                style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
              />
              
              <ProfilePhoto isSystem={isSystem} />

              {/* Hover Cards */}
              <div className="hidden sm:block">
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className={`absolute top-0 -left-12 lg:-left-20 backdrop-blur-md border px-3 sm:px-5 py-2 sm:py-3 rounded-lg shadow-xl z-10 transition-all duration-500 ${
                    isSystem ? 'bg-carbon/80 border-teal/30 shadow-void/80' : 'bg-slate-900/80 border-white/10 shadow-black/20'
                  }`}
                >
                  <p className={`font-mono text-[10px] sm:text-xs uppercase ${accentColor}`}>{isSystem ? 'MERN' : 'PS/AI'}</p>
                  <p className="font-inter text-[8px] sm:text-[10px] text-smoke whitespace-nowrap mt-0.5">{isSystem ? 'Full Stack' : 'Creative Suite'}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity }}
                  className={`absolute bottom-6 -left-8 lg:-left-16 backdrop-blur-md border px-3 sm:px-5 py-2 sm:py-3 rounded-lg shadow-xl z-10 transition-all duration-500 ${
                    isSystem ? 'bg-carbon/80 border-teal/30 shadow-void/80' : 'bg-slate-900/80 border-white/10 shadow-black/20'
                  }`}
                >
                  <p className={`font-mono text-[10px] sm:text-xs uppercase ${accentColor}`}>{isSystem ? 'CLOUD' : 'UI/UX'}</p>
                  <p className="font-inter text-[8px] sm:text-[10px] text-smoke whitespace-nowrap mt-0.5">{isSystem ? 'AWS Certified' : 'Figma Pro'}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`absolute top-4 -right-12 lg:-right-20 backdrop-blur-md border px-3 sm:px-5 py-2 sm:py-3 rounded-lg shadow-xl z-10 transition-all duration-500 ${
                    isSystem ? 'bg-carbon/80 border-teal/30 shadow-void/80' : 'bg-slate-900/80 border-white/10 shadow-black/20'
                  }`}
                >
                  <p className={`font-mono text-[10px] sm:text-xs uppercase ${accentColor}`}>{isSystem ? 'DSA' : 'POSTERS'}</p>
                  <p className="font-inter text-[8px] sm:text-[10px] text-smoke whitespace-nowrap mt-0.5">{isSystem ? 'Problem Solver' : 'Visual Story'}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute bottom-2 -right-8 lg:-right-16 backdrop-blur-md border px-3 sm:px-5 py-2 sm:py-3 rounded-lg shadow-xl z-10 transition-all duration-500 ${
                    isSystem ? 'bg-carbon/80 border-teal/30 shadow-void/80' : 'bg-slate-900/80 border-white/10 shadow-black/20'
                  }`}
                >
                  <p className={`font-mono text-[10px] sm:text-xs uppercase ${accentColor}`}>{isSystem ? 'SYSTEMS' : 'BRAND'}</p>
                  <p className="font-inter text-[8px] sm:text-[10px] text-smoke whitespace-nowrap mt-0.5">{isSystem ? 'Scalability' : 'Identity Head'}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-px h-12 bg-gradient-to-b from-${isSystem ? 'teal' : 'sky-400'} to-transparent mx-auto`}
          />
        </motion.div>
      </div>
    </section>
  )
}
