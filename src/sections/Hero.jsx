import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const roles = ['Software Developer', 'Graphic Designer', 'UI/UX Thinker', 'Creative Technologist']

function FlipStat() {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="text-center relative w-[220px] h-12 cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="font-outfit font-bold text-[20px] text-teal leading-none whitespace-nowrap">Graphic Designer</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        >
          <p className="font-outfit font-bold text-[20px] text-teal leading-tight whitespace-nowrap">Software Development<br/>Engineer</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef(null)

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
  }, [displayed, deleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)' }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <motion.circle
            cx="900" cy="200" r="2" fill="#2ea3b0"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="100" cy="600" r="1.5" fill="#2ea3b0"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="600" cy="100" r="1" fill="#2ea3b0"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="300" cy="300" r="1.5" fill="#2ea3b0"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
          <motion.circle
            cx="1100" cy="500" r="2" fill="#2ea3b0"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-tag mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-teal" />
              Available for opportunities
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400 inline-block ml-1"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="font-outfit font-bold text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-white mb-4"
            >
              Satvik Gupta
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2 mt-6 mb-8"
            >
              <span className="font-mono text-smoke text-sm">&lt;</span>
              <span className="font-mono text-teal text-lg min-w-[280px]">
                {displayed}
                <span className="blink text-teal">|</span>
              </span>
              <span className="font-mono text-smoke text-sm">/&gt;</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-inter text-smoke text-lg leading-relaxed max-w-md mb-10"
            >
              CS undergrad at <span className="text-white">GLA University</span> crafting full-stack products 
              and visual experiences — where clean code meets compelling design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-teal text-white font-outfit font-bold text-sm tracking-wide hover:bg-teal-dim transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Work
              </motion.button>

              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 border border-ash text-white font-inter text-sm hover:border-teal/50 hover:text-teal transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me ↗
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-6 mt-12"
            >
              {[
                { label: 'Projects', value: '6+' },
                { label: 'Internships', value: '2' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-outfit font-bold text-2xl text-teal">{stat.value}</p>
                  <p className="font-mono text-xs text-smoke mt-1">{stat.label}</p>
                </div>
              ))}
              <FlipStat />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-teal/10"
                style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-teal/5"
                style={{ width: '140%', height: '140%', top: '-20%', left: '-20%' }}
              />

              <div className="w-80 h-80 rounded-full border border-teal/20 overflow-hidden relative glow-teal">
                <img
                  src="/profile-photo.png"
                  alt="Satvik Gupta"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-teal/20 via-transparent to-transparent" />
              </div>

              {/* Hover Cards */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-8 -left-20 bg-carbon/80 backdrop-blur-md border border-teal/30 px-5 py-3 rounded-lg shadow-xl shadow-void/80 z-10"
              >
                <p className="font-mono text-xs text-teal">MERN</p>
                <p className="font-inter text-xs text-smoke whitespace-nowrap">Full Stack</p>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute bottom-12 -left-16 bg-carbon/80 backdrop-blur-md border border-teal/30 px-5 py-3 rounded-lg shadow-xl shadow-void/80 z-10"
              >
                <p className="font-mono text-xs text-teal">DEV</p>
                <p className="font-inter text-xs text-smoke whitespace-nowrap">Programmer Analyst</p>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-12 -right-20 bg-carbon/80 backdrop-blur-md border border-teal/30 px-5 py-3 rounded-lg shadow-xl shadow-void/80 z-10"
              >
                <p className="font-mono text-xs text-teal">AWS</p>
                <p className="font-inter text-xs text-smoke whitespace-nowrap">Cloud Computing</p>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-6 -right-16 bg-carbon/80 backdrop-blur-md border border-teal/30 px-5 py-3 rounded-lg shadow-xl shadow-void/80 z-10"
              >
                <p className="font-mono text-xs text-teal">DESIGN</p>
                <p className="font-inter text-xs text-smoke whitespace-nowrap">Graphic Designer</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-teal to-transparent mx-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}
